# Walter LMS Integration

This directory contains integration templates for adding Walter app navigation to the Frappe LMS.

## Overview

The Walter platform consists of:
- **Marketing Site** (`walter-marketing/`) - Public-facing Next.js application
- **App** (`walter-marketing/app/app/`) - Main application with Dashboard, Insights, Journal, etc.
- **LMS** (this directory) - Frappe-based Learning Management System for courses

## Integration Options

### Option 1: HTML Template for Frappe LMS

Use `lms-wrapper-template.html` as a base template in your Frappe application.

**Setup Steps:**

1. **In your Frappe app**, create a new web template:
   ```bash
   # Navigate to your Frappe bench
   cd frappe-bench/apps/your-lms-app
   ```

2. **Create a new Jinja template** at `templates/lms_base.html`:
   ```jinja
   {# Copy contents from lms-wrapper-template.html #}
   <!DOCTYPE html>
   <html lang="en">
   <head>
     <!-- Head content from template -->
   </head>
   <body class="bg-gray-50">
     <div class="flex h-screen overflow-hidden">
       <!-- Sidebar from template -->

       <div class="flex flex-1 flex-col overflow-hidden">
         <!-- Header from template -->

         <main class="flex-1 overflow-y-auto bg-gray-50 p-6">
           {% block content %}{% endblock %}
         </main>
       </div>
     </div>
   </body>
   </html>
   ```

3. **Use the template** in your course pages:
   ```jinja
   {% extends "lms_base.html" %}

   {% block content %}
     <!-- Your course listing or detail content -->
     {{ frappe.render_template("courses.html", context) }}
   {% endblock %}
   ```

4. **Update navigation URLs** to match your domain:
   - Replace `/app/dashboard` with your actual app URL
   - Example: `https://app.walter.com/dashboard`
   - Or use relative URLs if LMS is on same domain

### Option 2: Next.js LMS Wrapper (React Component)

If you're building a Next.js-based LMS interface, use the React components:

1. **Use the AppSidebar component**:
   ```tsx
   import { AppSidebar } from "@/components/app-sidebar";
   import { AppHeader } from "@/components/app-header";

   export default function LMSLayout({ children }) {
     return (
       <div className="flex h-screen overflow-hidden">
         <AppSidebar />
         <div className="flex flex-1 flex-col overflow-hidden">
           <AppHeader />
           <main className="flex-1 overflow-y-auto bg-muted/30 p-6">
             {children}
           </main>
         </div>
       </div>
     );
   }
   ```

2. **Create LMS pages** under `walter-marketing/app/lms/`:
   ```
   walter-marketing/app/lms/
   ├── layout.tsx (uses LMSLayout)
   ├── courses/page.tsx
   ├── courses/[id]/page.tsx
   └── ...
   ```

### Option 3: Iframe Integration (Quick Solution)

For quick integration without modifying Frappe:

1. **Create a wrapper page** in Next.js at `/app/lms-viewer/page.tsx`:
   ```tsx
   export default function LMSViewer() {
     return (
       <div className="w-full h-full">
         <iframe
           src={process.env.NEXT_PUBLIC_LMS_URL}
           className="w-full h-full border-0"
           title="Walter LMS"
         />
       </div>
     );
   }
   ```

2. **Update the Courses page** link to point to `/app/lms-viewer`

## Navigation Structure

The navigation includes these sections:

**Main Navigation:**
- Dashboard → `/app/dashboard`
- Reflection → `/app/journal`
- Insights → `/app/insights`
- **Courses → `/app/courses` (highlights available courses, links to full LMS)**
- Learning Paths → `/app/learning-paths`
- Weekly Summaries → `/app/summaries`

**Secondary Navigation:**
- Profile → `/app/profile`
- Settings → `/app/settings`

## Environment Variables

Ensure these are set in `.env`:

```bash
# LMS API Configuration
LMS_API_URL=http://lms.localhost:8000
LMS_API_KEY=your_frappe_api_key
LMS_API_SECRET=your_frappe_api_secret

# Public LMS URL (for frontend links)
NEXT_PUBLIC_LMS_URL=http://lms.localhost:8000/lms
```

## User Flow

1. **User signs in** from marketing site → Lands on `/app/dashboard`
2. **User clicks "Courses"** in sidebar → Goes to `/app/courses`
3. **Courses page** shows featured courses with "Open Course Library" button
4. **User clicks "Open Course Library"** → Goes to full LMS
5. **In LMS**, user sees same sidebar navigation → Can return to app features

## Customization

### Styling

The wrapper uses Tailwind CSS and matches the Walter design system:
- Font: Geist (sans-serif)
- Colors: Neutral grays with black primary
- Sidebar background: `rgb(250 250 250)`
- Active states: `bg-gray-100`

### Active States

The template includes JavaScript to highlight the active navigation item based on current URL.

### Search Functionality

The header includes a search bar - you'll need to implement search functionality:

```javascript
document.querySelector('input[placeholder*="Search"]').addEventListener('input', (e) => {
  const query = e.target.value;
  // Implement your search logic
});
```

## Production Deployment

When deploying to production:

1. **Update all URLs** to use production domains
2. **Set environment variables** for production LMS URL
3. **Configure authentication** to work across app and LMS
4. **Enable CORS** if app and LMS are on different domains
5. **Test navigation flow** thoroughly

## Support

For issues or questions about integration:
- Check the main README in project root
- Review existing components in `walter-marketing/components/`
- Refer to Next.js App Router documentation

## Next Steps

- [ ] Set up Frappe LMS instance
- [ ] Install and configure Frappe
- [ ] Implement the wrapper template
- [ ] Test navigation between app and LMS
- [ ] Configure authentication/SSO
- [ ] Deploy to production
