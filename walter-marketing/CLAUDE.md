# Walter Marketing - Claude Code Instructions

## Default Workflow for All Issues

### ✅ Automated Testing Requirement

**For every issue/story you work on:**

1. **Implement the feature/fix**
2. **Create automated tests** to verify the work is complete
3. **Run the tests** and ensure they pass
4. **Document test results** in the commit message

### Testing Tools Available

- **Playwright MCP Server** - Use for E2E browser testing
- **Jest/Vitest** - Use for unit/component testing
- **Custom verification scripts** - When appropriate

### Test Coverage Requirements

All user stories must include tests that verify:
- ✅ The feature works as described
- ✅ The feature appears on all relevant pages
- ✅ No console errors or warnings
- ✅ No regression in existing functionality

### Example

**Story**: "As a customer I want to see the Camino logo"

**Tests Must Verify**:
- Logo file exists
- Logo appears in navigation on all pages
- Logo appears in footer on all marketing pages
- Logo is clickable and links to homepage
- Logo dimensions are consistent
- No errors when rendering logo

## DO NOT Require Manual Verification

Claude should:
- ✅ Use MCP servers and agents to automate verification
- ✅ Run tests programmatically
- ✅ Use browser automation to verify UI changes
- ✅ Provide test results in the output
- ❌ Do NOT ask user to manually check pages
- ❌ Do NOT require human verification for things that can be automated

## Project-Specific Notes

- This is a Next.js 15 application
- Uses Supabase for authentication
- Deployed to camino.to (port 3003 on server)
- Uses Tailwind CSS for styling
