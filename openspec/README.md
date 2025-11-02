# Camino Project OpenSpec

This directory contains spec-driven development proposals for all Linear issues.

## Structure

```
openspec/
├── changes/              # Active work (proposals being implemented)
│   └── HOW-XXX-name/
│       ├── proposal.md   # Main specification
│       ├── tasks.md      # Implementation tasks
│       └── design.md     # Design decisions (optional)
├── specs/                # Archived completed changes (source of truth)
└── .openspec/            # Configuration
```

## Workflow

For each Linear issue (HOW-XXX):

### 1. Create Change Proposal
```bash
cd openspec/changes
mkdir HOW-XXX-short-name
cd HOW-XXX-short-name
touch proposal.md tasks.md
```

### 2. Write Proposal
Fill in `proposal.md` with:
- Linear issue reference
- Context and problem statement
- Current vs desired state
- Technical approach
- Task breakdown
- Testing requirements (6 dimensions)
- Acceptance criteria
- Dependencies
- Files changed
- Risks & mitigations

### 3. Update Linear Issue
Add proposal content/link to Linear issue description.

### 4. Implement
- Follow tasks in `tasks.md`
- Check off as completed
- Keep Linear status in sync

### 5. Archive
When complete and approved:
```bash
mv openspec/changes/HOW-XXX-name openspec/specs/
```

## Testing Requirements

Every proposal must include:
1. **Unit Tests:** Component/function testing
2. **Integration Tests:** API and service integration
3. **E2E Tests:** Full user journeys (Playwright)
4. **Accessibility:** WCAG AAA compliance
5. **Performance:** Core Web Vitals targets
6. **Security:** OWASP Top 10 checks

## Branch Naming

All feature branches: `feature/HOW-XXX-short-description`

## Commit Format

```
feat(HOW-XXX): Brief description

- Task 1 complete
- Task 2 complete
- All tests passing

Linear: HOW-XXX
OpenSpec: archived
```

## Links

- **Linear Workspace:** https://linear.app/howdycarter
- **Obsidian Project Docs:** /Users/howdycarter/Documents/obsidian-vaults/howdycarter/01_PROJECTS/Camino/
- **Project Workflow:** .claude/WORKFLOW.md

---

Last updated: 2025-11-02
