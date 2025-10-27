#!/bin/bash

# Step 1: Add all changes
git add .

# Step 2: Commit with a message (using current date/time for uniqueness)
git commit -m "Auto commit: $(date '+%Y-%m-%d %H:%M:%S')"

# Step 3: Push to remote repository (default: origin main)
git push origin main
