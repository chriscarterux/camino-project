# Claude Code Instructions for Camino Project

**⚠️ READ THIS FIRST - CRITICAL WORKFLOW RULES**

This file contains permanent instructions for Claude Code when working on the Camino project. These rules MUST be followed for every session, even if context is compressed or cleared.

---

## 🚨 CRITICAL RULES (Never Break These)

1. **NO COMMITS** without explicit human approval
2. **NO MERGES** without explicit human approval
3. **NO PR CREATION** without explicit human approval
4. **ALWAYS** create OpenSpec proposal BEFORE implementing
5. **ALWAYS** update Linear issue with OpenSpec plan before coding
6. **ALWAYS** run all 6 test dimensions before requesting approval
7. **ONE BRANCH** per Linear issue (feature/HOW-XXX-name)
8. **STOP and ASK** before committing - never assume approval

---

## 📖 Complete Workflow Documentation

**Primary Reference:** `.claude/WORKFLOW.md`

Read this file at the start of every session to understand the complete development workflow.

---

## 🔄 Standard Workflow (Every Linear Issue)

### 1. Create Feature Branch
```bash
git checkout main && git pull origin main
git checkout -b feature/HOW-XXX-short-description
```

### 2. Create OpenSpec Proposal
```bash
cd openspec/changes
mkdir HOW-XXX-name
cd HOW-XXX-name
# Create proposal.md and tasks.md
```

### 3. Update Linear Issue
Add OpenSpec proposal link and implementation status to Linear HOW-XXX description.

### 4. Implement
Follow OpenSpec proposal tasks, check off as completed, write tests alongside code.

### 5. Pre-Commit Checkpoint ⚠️ STOP HERE
- Run ALL tests (unit, integration, E2E, a11y, perf, security)
- Verify all OpenSpec tasks complete
- Generate change summary
- **REQUEST APPROVAL** - Do NOT proceed without explicit permission

### 6. After Approval Only
- Commit with conventional format
- Push feature branch
- Create PR with OpenSpec proposal as body
- Archive OpenSpec change to specs/

---

## 🧪 Testing Requirements (All 6 Dimensions Required)

Every issue must have:

1. **Unit Tests** (Jest + RTL) - 80%+ coverage
2. **Integration Tests** - API, service, data flow
3. **E2E Tests** (Playwright) - Chrome, Firefox, Safari, Mobile
4. **Accessibility Tests** - WCAG AAA, keyboard nav, screen reader
5. **Performance Tests** - LCP <2.5s, FID <100ms, CLS <0.1
6. **Security Tests** - OWASP Top 10, XSS, CSRF, input sanitization

---

## 📊 Issue Prioritization

**🔴 URGENT (8 issues)** - Do first, blockers:
- HOW-117: Value Proposition (blocks 9 issues)
- HOW-119: Testing Infrastructure (blocks 4 issues)
- HOW-135: Analytics (blocks 3 issues)
- HOW-118, 111, 127, 138, 151

**🟡 HIGH (23 issues)** - Critical path, do soon

**🟢 MEDIUM (9 issues)** - Important, can wait

**⚪ LOW (2 issues)** - Post-launch

---

## 📝 Commit Message Format

```
<type>(HOW-XXX): <subject>

<body>

Linear: HOW-XXX
OpenSpec: archived
Reviewed-by: [Name]
```

**Types:** feat, fix, docs, style, refactor, test, chore

---

## 🔗 Key Links

- **Linear Workspace:** https://linear.app/howdycarter
- **Team ID:** c3997b49-d6a3-45a3-93ab-605db58b7434
- **Obsidian Docs:** `{OBSIDIAN_VAULT}/01_PROJECTS/Camino/` (configure locally - see Setup section)
- **OpenSpec Directory:** `{PROJECT_ROOT}/openspec/`
- **Workflow Documentation:** `{PROJECT_ROOT}/.claude/WORKFLOW.md`

> **Note:** Paths use placeholders for portability. See the "Local Setup" section in README.md for configuration instructions.

---

## 🎯 Session Start Checklist

At the beginning of every session:

- [ ] Read .claude/WORKFLOW.md for full workflow
- [ ] Check Linear for current issue priorities
- [ ] Verify which issue to work on (ask human if unclear)
- [ ] Ensure OpenSpec proposal exists before implementing
- [ ] Never commit without explicit approval

---

## ⛔ What NOT to Do

- ❌ Start coding before creating OpenSpec proposal
- ❌ Commit without running all 6 test dimensions
- ❌ Create PR without human approval
- ❌ Work on multiple issues in one branch
- ❌ Skip testing requirements
- ❌ Update Linear issue priority without asking
- ❌ Make architectural decisions without OpenSpec proposal

---

## ✅ What TO Do

- ✅ Always read WORKFLOW.md at session start
- ✅ Create OpenSpec proposal before implementation
- ✅ Update Linear issue with proposal
- ✅ Run all 6 test types before requesting approval
- ✅ Keep Linear status current
- ✅ Use conventional commit format
- ✅ Archive OpenSpec changes when complete

---

**Remember:** This workflow ensures quality, traceability, and systematic progress. Follow it religiously!

*Last updated: 2025-11-02*
