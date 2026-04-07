---
description: Deploy the application by pushing to the main branch
---

// turbo-all

1. **Stage and Commit Locally**
   Check for any uncommitted changes, stage them, and perform a commit with a timestamped message.
   - Run: `if [ -n "$(git status --porcelain)" ]; then git add . && git commit -m "Deployment: $(date '+%Y-%m-%d %H:%M:%S')"; else echo "No local changes to commit."; fi`

2. **Push Current Branch**
   Push the latest commits of the current active branch to its remote counterpart.
   - Run: `CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD); git push origin "$CURRENT_BRANCH"`

3. **Deploy to Main Branch**
   If the active branch is not `main`, push its state to the remote `main` branch to trigger the production deployment.
   - Run: `CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD); if [ "$CURRENT_BRANCH" != "main" ]; then echo "Pushing $CURRENT_BRANCH to remote main..."; git push origin "$CURRENT_BRANCH":main; else echo "Deployment on main branch updated."; fi`
