"""
Antigravity Multi-PC Cloud Workspace Sync Utility
=================================================
Synchronizes all 14 private Antigravity project repositories across any computer
without requiring your main PC to remain powered on.

Usage:
  1. On a new/secondary PC (or to pull latest changes on any PC):
       python sync_all_projects.py --pull
     (Automatically installs MinGit if missing, prompts once for tokens if needed,
      clones any missing project folders, and pulls the latest updates.)

  2. When finishing work on any PC (commits & pushes all modified projects):
       python sync_all_projects.py --push "Optional commit message"

  3. Full bidirectional sync (pull --rebase then push):
       python sync_all_projects.py
"""

import os
import sys
import json
import shutil
import zipfile
import subprocess
import urllib.request
from datetime import datetime

PROJECTS = [
    # --- Account: charlesyoung52-cloud ---
    {
        "name": "Personal Workspace & Multi-PC Sync Hub",
        "account": "charlesyoung52-cloud",
        "repo": "personal-workspace",
        "win_path": r"D:\Personal",
        "fallback_rel": "Personal",
    },
    {
        "name": "Platforms Online Course (Active)",
        "account": "charlesyoung52-cloud",
        "repo": "platforms-online-course",
        "win_path": os.path.expanduser(r"~\OneDrive\Desktop\Platforms Desktop\Antigravity\Online Course"),
        "fallback_rel": "Platforms-Online-Course",
    },
    {
        "name": "Basketball Apps - Hoop Pulse",
        "account": "charlesyoung52-cloud",
        "repo": "hoop-pulse",
        "win_path": r"D:\Basketball Apps\hoop-pulse",
        "fallback_rel": r"Basketball Apps\hoop-pulse",
    },
    {
        "name": "Modern Vistas Workspace",
        "account": "charlesyoung52-cloud",
        "repo": "modern-vistas-workspace",
        "win_path": r"D:\Modern Vistas",
        "fallback_rel": "Modern Vistas",
    },
    {
        "name": "Online Course (D: Drive Legacy)",
        "account": "charlesyoung52-cloud",
        "repo": "online-course-legacy",
        "win_path": r"D:\Online Course",
        "fallback_rel": "Online Course Legacy",
    },
    {
        "name": "Platforms Website - Github",
        "account": "charlesyoung52-cloud",
        "repo": "platforms-website-workspace",
        "win_path": r"D:\Platforms Website - Github",
        "fallback_rel": "Platforms Website - Github",
    },
    {
        "name": "TCG Workspace",
        "account": "charlesyoung52-cloud",
        "repo": "tcg-workspace",
        "win_path": r"D:\TCG",
        "fallback_rel": "TCG",
    },
    {
        "name": "Army AAR & Evaluation Deck",
        "account": "charlesyoung52-cloud",
        "repo": "army-aar-evaluation-deck",
        "win_path": os.path.expanduser(r"~\Documents\antigravity\radiant-bohr"),
        "fallback_rel": "army-aar-evaluation-deck",
    },
    # --- Account: acbcharles ---
    {
        "name": "ACB Corporate Workspace (Root)",
        "account": "acbcharles",
        "repo": "acb-corporate-workspace",
        "win_path": r"D:\ACB",
        "fallback_rel": "ACB",
    },
    {
        "name": "ACB Website & Tidewaiter Portal",
        "account": "acbcharles",
        "repo": "acb-website-workspace",
        "win_path": r"D:\ACB\Website",
        "fallback_rel": r"ACB\Website",
    },
    {
        "name": "ACB Tidewaiter Desktop",
        "account": "acbcharles",
        "repo": "acb-tidewaiter-desktop",
        "win_path": r"D:\ACB\Tidewaiter_Desktop",
        "fallback_rel": r"ACB\Tidewaiter_Desktop",
    },
    {
        "name": "ACB Customs Orchestration",
        "account": "acbcharles",
        "repo": "acb-customs-orchestration",
        "win_path": r"D:\Customs Orchestration",
        "fallback_rel": "Customs Orchestration",
    },
    {
        "name": "DPS2 - MX Queue Extractor",
        "account": "acbcharles",
        "repo": "dps2-mx-queue-extractor",
        "win_path": r"D:\DPS2\mx-queue-extractor",
        "fallback_rel": r"DPS2\mx-queue-extractor",
    },
    {
        "name": "ACB Help Desk",
        "account": "acbcharles",
        "repo": "acb-help-desk",
        "win_path": r"D:\Help Desk",
        "fallback_rel": "Help Desk",
    },
]


def find_or_install_git():
    git_cmd = shutil.which("git")
    if git_cmd:
        return git_cmd
    candidates = [
        os.path.expanduser(r"~\AppData\Local\Programs\MinGit\cmd\git.exe"),
        r"C:\Program Files\Git\cmd\git.exe",
    ]
    for c in candidates:
        if os.path.exists(c):
            return c

    print("[SETUP] Git not found. Automatically downloading portable MinGit...")
    git_dir = os.path.expanduser(r"~\AppData\Local\Programs\MinGit")
    os.makedirs(git_dir, exist_ok=True)
    req = urllib.request.Request(
        "https://api.github.com/repos/git-for-windows/git/releases/latest",
        headers={"User-Agent": "AntigravitySync"},
    )
    rel = json.loads(urllib.request.urlopen(req).read().decode())
    asset_url = None
    for a in rel.get("assets", []):
        if a["name"].startswith("MinGit-") and a["name"].endswith("-64-bit.zip") and "busybox" not in a["name"]:
            asset_url = a["browser_download_url"]
            break
    if not asset_url:
        raise RuntimeError("Could not find MinGit download URL. Please install Git manually.")
    zip_path = os.path.join(git_dir, "mingit.zip")
    urllib.request.urlretrieve(asset_url, zip_path)
    with zipfile.ZipFile(zip_path, "r") as z:
        z.extractall(git_dir)
    os.remove(zip_path)
    git_exe = os.path.join(git_dir, "cmd", "git.exe")
    subprocess.run([git_exe, "config", "--global", "user.name", "Charles Young"], check=False)
    subprocess.run([git_exe, "config", "--global", "user.email", "charlesyoung52@gmail.com"], check=False)
    subprocess.run([git_exe, "config", "--global", "http.postBuffer", "524288000"], check=False)
    print(f"[SETUP] Installed MinGit at {git_exe}")
    return git_exe


def resolve_target_path(proj):
    win_p = proj["win_path"]
    drive = os.path.splitdrive(win_p)[0]
    if drive and os.path.exists(drive + "\\"):
        return win_p
    base = os.path.expanduser(r"~\AntigravityProjects")
    return os.path.join(base, proj["fallback_rel"])


def load_tokens():
    token_store = os.path.expanduser(r"~\.gemini\antigravity_sync_tokens.json")
    tokens = {
        "charlesyoung52-cloud": os.environ.get("GITHUB_TOKEN_CHARLES") or os.environ.get("GITHUB_PERSONAL_ACCESS_TOKEN") or "",
        "acbcharles": os.environ.get("GITHUB_TOKEN_ACB") or os.environ.get("GITHUB_TOKEN") or "",
    }
    if os.path.exists(token_store):
        try:
            with open(token_store, "r", encoding="utf-8") as f:
                saved = json.load(f)
                for k in tokens:
                    if not tokens[k] and saved.get(k):
                        tokens[k] = saved[k]
        except Exception:
            pass

    mcp_cfg = os.path.expanduser(r"~/.gemini/config/mcp_config.json")
    if not tokens["charlesyoung52-cloud"] and os.path.exists(mcp_cfg):
        try:
            with open(mcp_cfg, "r", encoding="utf-8") as f:
                tokens["charlesyoung52-cloud"] = (
                    json.load(f).get("mcpServers", {}).get("github", {}).get("env", {}).get("GITHUB_PERSONAL_ACCESS_TOKEN", "")
                )
        except Exception:
            pass

    for env_cand in [r"D:\ACB\Website\.env", os.path.expanduser(r"~\AntigravityProjects\ACB\Website\.env")]:
        if not tokens["acbcharles"] and os.path.exists(env_cand):
            try:
                with open(env_cand, "r", encoding="utf-8", errors="ignore") as f:
                    for line in f:
                        if line.strip().startswith("GITHUB_TOKEN="):
                            tokens["acbcharles"] = line.strip().split("=", 1)[1].strip().strip('"').strip("'")
            except Exception:
                pass

    updated = False
    for acct in ("charlesyoung52-cloud", "acbcharles"):
        if not tokens[acct] and sys.stdin and sys.stdin.isatty():
            try:
                val = input(f"Enter GitHub Personal Access Token for '{acct}' (saved locally for future runs): ").strip()
                if val:
                    tokens[acct] = val
                    updated = True
            except EOFError:
                pass

    if updated:
        try:
            os.makedirs(os.path.dirname(token_store), exist_ok=True)
            with open(token_store, "w", encoding="utf-8") as f:
                json.dump(tokens, f, indent=2)
            print(f"[SETUP] Saved tokens to {token_store}")
        except Exception:
            pass

    return tokens


def run_git(git_exe, args, cwd=None):
    return subprocess.run([git_exe] + args, cwd=cwd, capture_output=True, text=True)



def restore_secrets_if_available():
    candidates = [
        os.path.expanduser(r"~\OneDrive\Antigravity_Secrets_Backup"),
        os.path.expanduser(r"~\OneDrive - Personal\Antigravity_Secrets_Backup"),
    ]
    backup_dir = None
    for c in candidates:
        if os.path.exists(c):
            backup_dir = c
            break
    if not backup_dir:
        return

    mapping = [
        ("ACB_Website.env", [r"D:\ACB\Website\.env", os.path.expanduser(r"~\AntigravityProjects\ACB\Website\.env")]),
        ("ACB_Tidewaiter_Desktop.env", [r"D:\ACB\Tidewaiter_Desktop\.env", os.path.expanduser(r"~\AntigravityProjects\ACB\Tidewaiter_Desktop\.env")]),
        ("Customs_Orchestration.env", [r"D:\Customs Orchestration\.env", os.path.expanduser(r"~\AntigravityProjects\Customs Orchestration\.env")]),
        ("Online_Course_env.env", [
            os.path.expanduser(r"~\OneDrive\Desktop\Platforms Desktop\Antigravity\Online Course\env\.env"),
            os.path.expanduser(r"~\AntigravityProjects\Platforms-Online-Course\env\.env"),
        ]),
    ]
    restored = 0
    for src_file, targets in mapping:
        src_path = os.path.join(backup_dir, src_file)
        if os.path.exists(src_path):
            for t in targets:
                parent = os.path.dirname(t)
                if os.path.exists(parent) and not os.path.exists(t):
                    try:
                        shutil.copyfile(src_path, t)
                        restored += 1
                    except Exception:
                        pass
    if restored > 0:
        print(f"   [AUTO-CONFIG] Automatically restored {restored} .env secret files from OneDrive backup.")


def sync_all(mode="both", commit_msg=None):
    git_exe = find_or_install_git()
    tokens = load_tokens()
    if not commit_msg:
        commit_msg = f"Antigravity workspace sync ({datetime.now().strftime('%Y-%m-%d %H:%M')})"

    print("=" * 75)
    print(f"ANTIGRAVITY MULTI-PC CLOUD SYNC | Mode: {mode.upper()}")
    print("=" * 75)

    for proj in PROJECTS:
        name = proj["name"]
        owner = proj["account"]
        repo = proj["repo"]
        target = resolve_target_path(proj)
        token = tokens.get(owner, "")
        remote_url = (
            f"https://{owner}:{token}@github.com/{owner}/{repo}.git"
            if token
            else f"https://github.com/{owner}/{repo}.git"
        )

        print(f"\n-> [{owner}/{repo}] {name}")
        print(f"   Local path: {target}")

        git_dir = os.path.join(target, ".git")
        if not os.path.exists(git_dir):
            if mode in ("pull", "both"):
                os.makedirs(os.path.dirname(target), exist_ok=True)
                if os.path.exists(target) and os.listdir(target):
                    print(f"   [INIT] Non-empty folder exists (e.g., OneDrive); linking to {owner}/{repo}...")
                    run_git(git_exe, ["init", "-b", "main"], cwd=target)
                    run_git(git_exe, ["remote", "add", "origin", remote_url], cwd=target)
                    fetch_res = run_git(git_exe, ["fetch", "origin", "main"], cwd=target)
                    if fetch_res.returncode == 0:
                        run_git(git_exe, ["checkout", "-B", "main", "origin/main"], cwd=target)
                        print("   [OK] Linked and synced existing folder.")
                    else:
                        print(f"   [WARN] Fetch failed: {fetch_res.stderr.strip()}")
                else:
                    print(f"   [CLONE] Cloning private repository into {target}...")
                    res = run_git(git_exe, ["clone", remote_url, target])
                    if res.returncode == 0:
                        print("   [OK] Cloned successfully.")
                    else:
                        print(f"   [WARN] Clone failed: {res.stderr.strip()}")
            else:
                print("   [SKIP] Folder not initialized locally yet (run with --pull first).")
            continue

        # Ensure origin URL is up to date if token is available
        if token:
            run_git(git_exe, ["remote", "set-url", "origin", remote_url], cwd=target)

        if mode in ("pull", "both"):
            res = run_git(git_exe, ["pull", "--rebase", "--autostash", "origin", "main"], cwd=target)
            if res.returncode == 0:
                print("   [PULL OK] Up to date with remote origin/main.")
            else:
                print(f"   [PULL WARN] {res.stderr.strip()}")

        if mode in ("push", "both"):
            run_git(git_exe, ["add", "-A"], cwd=target)
            st = run_git(git_exe, ["status", "--porcelain"], cwd=target)
            if st.stdout.strip():
                run_git(git_exe, ["commit", "-m", commit_msg], cwd=target)
                push_res = run_git(git_exe, ["push", "-u", "origin", "main"], cwd=target)
                if push_res.returncode == 0:
                    print("   [PUSH OK] Committed and pushed local changes to GitHub.")
                else:
                    print(f"   [PUSH ERROR] {push_res.stderr.strip()}")
            else:
                ahead = run_git(git_exe, ["status", "-sb"], cwd=target)
                if "ahead" in ahead.stdout:
                    push_res = run_git(git_exe, ["push", "-u", "origin", "main"], cwd=target)
                    if push_res.returncode == 0:
                        print("   [PUSH OK] Pushed unpushed commits to GitHub.")
                else:
                    print("   [CLEAN] No local changes to push.")

    restore_secrets_if_available()
    print("\n" + "=" * 75)
    print("Sync complete!")
    print("=" * 75)


if __name__ == "__main__":
    args = sys.argv[1:]
    mode = "both"
    msg_parts = []
    for a in args:
        if a == "--pull":
            mode = "pull"
        elif a == "--push":
            mode = "push"
        else:
            msg_parts.append(a)
    custom_msg = " ".join(msg_parts).strip() or None
    sync_all(mode=mode, commit_msg=custom_msg)
