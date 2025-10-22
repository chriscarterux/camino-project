# HOW-57 Test Plan: Camino Logo Visibility

## Story
As a customer, I want to see the Camino logo throughout the site

## Acceptance Criteria
- [ ] Logo appears in navigation header on all public pages
- [ ] Logo appears in footer on all marketing pages
- [ ] Logo appears in app dashboard sidebar
- [ ] Logo appears in admin dashboard sidebar
- [ ] Logo is consistent in size and styling

## Manual Test Steps

### 1. Homepage (/)
**URL**: http://localhost:3001/

- [ ] Navigate to homepage
- [ ] Verify Camino logo appears in top navigation bar (left side)
- [ ] Scroll to bottom of page
- [ ] Verify Camino logo appears in footer (brand section, left column)
- [ ] Take screenshot for verification

### 2. How It Works (/how-it-works)
**URL**: http://localhost:3001/how-it-works

- [ ] Navigate to /how-it-works
- [ ] Verify logo in navigation header
- [ ] Scroll to footer
- [ ] Verify logo in footer
- [ ] Take screenshot

### 3. Pricing (/pricing)
**URL**: http://localhost:3001/pricing

- [ ] Navigate to /pricing
- [ ] Verify logo in navigation header
- [ ] Scroll to footer
- [ ] Verify logo in footer
- [ ] Take screenshot

### 4. Coaching (/coaching)
**URL**: http://localhost:3001/coaching

- [ ] Navigate to /coaching
- [ ] Verify logo in navigation header
- [ ] Scroll to footer
- [ ] Verify logo in footer
- [ ] Take screenshot

### 5. About (/about)
**URL**: http://localhost:3001/about

- [ ] Navigate to /about
- [ ] Verify logo in navigation header
- [ ] Scroll to footer
- [ ] Verify logo in footer
- [ ] Take screenshot

### 6. Essays (/essays)
**URL**: http://localhost:3001/essays

- [ ] Navigate to /essays
- [ ] Verify logo in navigation header
- [ ] Scroll to footer
- [ ] Verify logo in footer (if page has footer)
- [ ] Take screenshot

### 7. App Dashboard (/app)
**URL**: http://localhost:3001/app

- [ ] Login to app (if needed)
- [ ] Navigate to /app
- [ ] Verify logo appears in left sidebar (top)
- [ ] Logo should be above "Your reflection space" text
- [ ] Take screenshot

### 8. Admin Dashboard (/admin)
**URL**: http://localhost:3001/admin

- [ ] Login as admin (if needed)
- [ ] Navigate to /admin
- [ ] Verify logo appears in left sidebar (top)
- [ ] Logo should be above "Admin Dashboard" text
- [ ] Take screenshot

## Logo Specifications

### Navigation Logo
- Width: 120px
- Height: 40px
- File: `/camino-logo.svg`
- Priority loading: Yes

### Footer/Sidebar Logo
- Width: 100px
- Height: 32px
- File: `/camino-logo.svg`

## Code Verification Checklist

- [x] Logo file exists at `public/camino-logo.svg`
- [x] All pages import Next.js `Image` component
- [x] Navigation uses `<Image src="/camino-logo.svg" ... />`
- [x] Footer uses `<Image src="/camino-logo.svg" ... />`
- [x] All pages compile without errors
- [x] No console errors in browser

## Test Results

| Page | Nav Logo | Footer Logo | Status |
|------|----------|-------------|--------|
| Homepage | ⏳ Pending | ⏳ Pending | 🟡 Not Tested |
| How It Works | ⏳ Pending | ⏳ Pending | 🟡 Not Tested |
| Pricing | ⏳ Pending | ⏳ Pending | 🟡 Not Tested |
| Coaching | ⏳ Pending | ⏳ Pending | 🟡 Not Tested |
| About | ⏳ Pending | ⏳ Pending | 🟡 Not Tested |
| Essays | ⏳ Pending | ⏳ Pending | 🟡 Not Tested |
| App Dashboard | ⏳ Pending | N/A | 🟡 Not Tested |
| Admin Dashboard | ⏳ Pending | N/A | 🟡 Not Tested |

## Test Environment
- **Dev Server**: http://localhost:3001
- **Branch**: howdycarter/how-57-as-a-customer-i-want-to-see-the-camino-logo
- **Date**: 2025-10-22

## Sign-off

- [ ] Developer verified (code review)
- [ ] Visual QA verified (manual testing)
- [ ] Product owner approved
- [ ] Ready to deploy

---

**Next Steps After Testing:**
1. If all tests pass → Push branch and create PR
2. If tests fail → Document failures and fix issues
3. Deploy to production after PR merge
