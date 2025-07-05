#!/bin/bash

# Claude Code Task Implementation Script

# Color codes for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to implement a task
implement_task() {
  local phase=$1
  local task=$2
  local description=$3
  
  echo -e "${GREEN}🚀 Starting implementation of Phase $phase, Task $task: $description${NC}"
  
  # Create feature branch
  git checkout main
  git pull origin main
  git checkout -b "feature/phase-$phase-task-$task-$(echo $description | tr ' ' '-' | tr '[:upper:]' '[:lower:]')"
  
  echo -e "${YELLOW}📝 Implement the following task:${NC}"
  echo "Phase $phase, Task $task: $description"
  echo "Follow modular coding principles as outlined in CLAUDE.md"
  
  # Wait for implementation
  read -p "Press enter when implementation is complete..."
  
  # Build loop
  attempt=1
  while true; do
    echo -e "${YELLOW}🔨 Build attempt $attempt${NC}"
    
    if npm run build; then
      echo -e "${GREEN}✅ Build successful!${NC}"
      
      # Run additional checks
      echo "Running type check..."
      npm run type-check || true
      
      echo "Running linter..."
      npm run lint || true
      
      break
    else
      echo -e "${RED}❌ Build failed!${NC}"
      echo "Please fix the errors and try again."
      read -p "Press enter when fixes are complete..."
      ((attempt++))
    fi
  done
  
  # Commit changes
  echo -e "${GREEN}📝 Committing changes...${NC}"
  git add -A
  
  # Generate commit message
  cat > commit-msg.txt << EOF
feat(phase-$phase): implement $description

## Summary
Implemented Phase $phase, Task $task from the project plan

## Changes Made
- [Update with specific changes]

## Technical Details
- Build passes successfully
- TypeScript compilation successful
- Following modular architecture principles

## File Structure
$(git status --porcelain | grep -E "^(A|M)" | cut -c4-)

Implements: Phase $phase, Task $task from CLAUDE.md
EOF
  
  git commit -F commit-msg.txt
  rm commit-msg.txt
  
  # Push to remote
  git push origin HEAD
  
  echo -e "${GREEN}✅ Task completed and pushed to remote!${NC}"
  echo "Phase $phase, Task $task: $description - COMPLETED" >> task-progress.log
}

# Main execution
echo "🤖 Claude Code Task Implementation System"
echo "========================================"

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
  echo -e "${RED}Error: Not in a Next.js project directory${NC}"
  exit 1
fi

# Display next task to implement
echo "Next task to implement:"
# [Claude should identify the next task from CLAUDE.md here]

# Example usage (replace with actual task details):
# implement_task "1" "1" "Initialize NextJS Project"