# PR Review & Fix Workflow

## Overview
This document defines the automated workflow for reviewing pull requests, analyzing CodeRabbit feedback, and coordinating fixes across the team.

## Workflow Process

### Phase 1: PR Review Analysis
**Trigger:** After any code is committed and a pull request is created

**Steps:**
1. **List Open PRs**
   ```bash
   gh pr list --state open
   ```

2. **Analyze CodeRabbit Comments**
   - For each PR, fetch review comments
   - Categorize feedback:
     - 🔴 **Critical:** Must fix before merge (blocking issues, test failures, security)
     - 🟡 **Important:** Should fix (maintainability, best practices)
     - ⚪ **Nice-to-Have:** Optional improvements

3. **Create Fix Plan**
   - Prioritize by impact and urgency
   - Estimate effort for each issue
   - Determine merge order

### Phase 2: Coordinate Fixes

**For each PR with issues:**

1. **Create Worktree for Fixes**
   ```bash
   git worktree add worktrees/HOW-XXX-fixes feature/HOW-XXX-branch-name
   ```

2. **Deploy Specialized Agents**
   - **test-writer-fixer:** For test-related issues
   - **security-auditor:** For security concerns
   - **frontend-developer:** For UI/component issues
   - **backend-architect:** For API/server issues

3. **Agent Responsibilities**
   - Check out branch in dedicated worktree
   - Fix assigned issues
   - Run relevant tests to verify
   - Commit with clear reference to CodeRabbit feedback
   - Push to existing branch (updates PR automatically)

### Phase 3: Verification & Merge

1. **CodeRabbit Re-Review**
   - Wait for CodeRabbit to re-analyze updated PR
   - Verify all critical issues resolved

2. **Final Testing**
   - All unit tests pass
   - All E2E tests pass
   - No accessibility violations
   - Performance benchmarks met

3. **Merge Strategy**
   - Merge PRs in dependency order
   - Delete worktree after successful merge:
     ```bash
     git worktree remove worktrees/HOW-XXX-fixes
     ```

## Issue Categorization Guide

### 🔴 Critical (Block Merge)
- Test failures
- Build errors
- Security vulnerabilities
- Breaking API changes
- Accessibility violations (WCAG AA/AAA)
- Performance regressions (>20% slower)

### 🟡 Important (Should Fix)
- Code quality issues (linting, formatting)
- Missing error handling
- Incomplete test coverage
- Documentation gaps
- Maintainability concerns
- Best practice violations

### ⚪ Nice-to-Have (Optional)
- Refactoring suggestions
- Formatting preferences
- Variable naming improvements
- Additional test scenarios
- Documentation enhancements

## Agent Deployment Matrix

| Issue Type | Primary Agent | Secondary Agent |
|------------|---------------|-----------------|
| Test failures | test-writer-fixer | - |
| Security issues | security-auditor | - |
| UI/Component bugs | frontend-developer | ui-designer |
| API/Backend issues | backend-architect | - |
| Accessibility | frontend-developer | - |
| Performance | performance-benchmarker | - |
| Documentation | - | (manual review) |

## Worktree Management

### Creating Fix Worktrees
```bash
# General pattern
git worktree add worktrees/HOW-{issue-number}-fixes feature/{branch-name}

# Example
git worktree add worktrees/HOW-153-fixes feature/HOW-153-homepage-hero
```

### Listing Active Worktrees
```bash
git worktree list
```

### Removing Completed Worktrees
```bash
# After PR is merged
git worktree remove worktrees/HOW-XXX-fixes
```

### Cleanup All Merged Worktrees
```bash
# Remove all worktrees for merged PRs
for dir in worktrees/*/; do
  branch=$(git -C "$dir" branch --show-current)
  if ! git show-ref --verify --quiet "refs/heads/$branch"; then
    echo "Removing merged worktree: $dir"
    git worktree remove "$dir"
  fi
done
```

## Commit Message Format

When fixing CodeRabbit feedback:

```
fix: address CodeRabbit feedback for PR #{number}

- Fix {issue description}
- Update {component/test} to {change}
- Add {missing element}

Resolves CodeRabbit review comments:
- {link to comment 1}
- {link to comment 2}

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

## Parallel Fix Strategy

For PRs with multiple unrelated issues:

1. **Create separate worktrees** for each category of fix
2. **Deploy multiple agents in parallel** to work simultaneously
3. **Merge fixes back to PR branch** as they complete
4. **Avoid conflicts** by assigning non-overlapping files to each agent

Example:
```bash
# Agent 1: Fix Playwright config
worktrees/HOW-153-playwright-fix/

# Agent 2: Fix unit tests
worktrees/HOW-153-unit-tests-fix/

# Agent 3: Fix E2E tests
worktrees/HOW-153-e2e-fix/
```

## Automation Triggers

### When to Run This Workflow

1. **After every PR creation** - Immediate review
2. **After CodeRabbit posts comments** - Coordinate fixes
3. **Before scheduled merges** - Final verification
4. **On demand** - User requests "review and fix PRs"

### Example Invocation

```
User: "All code gets committed and pull requests, have an agent go
through the pull requests and look at CodeRabbit's comments, decide
on a plan on how to tackle them, let me know and then send more
agents to check out those branches in a working tree and fix the issues."
```

**Response:**
1. Deploy `general-purpose` agent to analyze all PRs and CodeRabbit feedback
2. Receive prioritized fix plan
3. Deploy specialized agents (test-writer-fixer, frontend-developer, etc.) to fix issues in parallel worktrees
4. Report progress and results

## Success Metrics

- **Time to Fix:** Critical issues resolved within 2 hours
- **Merge Rate:** >90% of PRs merge within 24 hours of creation
- **Quality:** Zero critical issues make it to production
- **Efficiency:** Average 3-5 PRs handled simultaneously via worktrees

## Edge Cases

### PR Has Merge Conflicts
1. Agent reports conflict
2. Manual resolution required
3. Agent resumes fixes after conflict resolution

### CodeRabbit Disagrees with Fix
1. Review CodeRabbit's new comments
2. Iterate fix based on feedback
3. Document decision if override is necessary

### Tests Pass Locally But Fail in CI
1. Agent investigates CI environment differences
2. Update tests or CI config as needed
3. Re-run CI pipeline

## Related Documentation

- [Testing Requirements](../TESTING_REQUIREMENTS.md)
- [Git Workflow](../GIT_WORKFLOW.md)
- [Worktree Setup](../WORKTREE_SETUP.md)

---

**Last Updated:** 2025-11-03
**Version:** 1.0
**Owner:** Development Team
