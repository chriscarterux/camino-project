# Camino API Documentation
## AI-Powered Reflection Platform API

---

## Base URL
```
Production: https://api.camino.to/v1
Staging: https://staging-api.camino.to/v1
Development: http://localhost:3000/api/v1
```

## Authentication
All API requests require authentication using JWT Bearer tokens:
```bash
Authorization: Bearer YOUR_JWT_TOKEN
```

### Getting a Token
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "secure_password"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user_123",
    "email": "user@example.com",
    "name": "Sarah Designer",
    "tier": "free"
  }
}
```

---

## Common Response Codes
| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Invalid or missing token |
| 403 | Forbidden - Tier limit exceeded |
| 404 | Not Found |
| 429 | Too Many Requests - Rate limit exceeded |
| 500 | Internal Server Error |

---

## Core Endpoints

### 1. User Management

#### Create Account
```http
POST /auth/register
Content-Type: application/json

{
  "email": "newuser@example.com",
  "name": "Marcus Entrepreneur",
  "password": "secure_password"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user_456",
    "email": "newuser@example.com",
    "name": "Marcus Entrepreneur",
    "tier": "free",
    "created_at": "2025-01-15T10:00:00Z"
  }
}
```

#### Get Current User
```http
GET /users/me
Authorization: Bearer YOUR_JWT_TOKEN
```

**Response:**
```json
{
  "id": "user_123",
  "email": "user@example.com",
  "name": "Sarah Designer",
  "tier": "transformation",
  "life_lens": {
    "values": ["creativity", "growth", "impact"],
    "goals": ["build consistent practice", "career clarity"],
    "focus_areas": ["relationships", "work-life balance"]
  },
  "stats": {
    "reflection_streak": 14,
    "total_reflections": 42,
    "insights_captured": 18,
    "member_since": "2025-01-01T00:00:00Z"
  }
}
```

---

### 2. Life Lens (Onboarding)

#### Create Life Lens
```http
POST /life-lens
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "values": ["creativity", "growth", "impact", "connection"],
  "goals": ["build reflection practice", "find career clarity"],
  "struggles": ["staying consistent", "feeling scattered"],
  "preferences": {
    "reflection_time": "evening",
    "frequency": "daily"
  }
}
```

**Response:**
```json
{
  "id": "lens_789",
  "user_id": "user_123",
  "values": ["creativity", "growth", "impact", "connection"],
  "goals": ["build reflection practice", "find career clarity"],
  "ai_analysis": {
    "primary_theme": "seeking alignment between work and values",
    "recommended_practices": [
      "morning intention setting",
      "weekly value check-ins"
    ],
    "initial_reflection_prompt": "What does 'growth' mean to you right now?"
  },
  "created_at": "2025-01-15T10:00:00Z"
}
```

#### Get Life Lens
```http
GET /life-lens
Authorization: Bearer YOUR_JWT_TOKEN
```

---

### 3. Reflections

#### Get Daily Reflection Prompt
```http
GET /reflections/prompt
Authorization: Bearer YOUR_JWT_TOKEN
```

**Response:**
```json
{
  "prompt_id": "prompt_456",
  "questions": [
    "What mattered most to you today?",
    "Where did you feel most aligned with your values?",
    "What's one insight you want to remember?"
  ],
  "ai_context": "Based on your recent entries, I'm curious about how you're balancing creativity and impact.",
  "estimated_time": "5-10 minutes",
  "expires_at": "2025-01-15T23:59:59Z"
}
```

#### Submit Reflection
```http
POST /reflections
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "prompt_id": "prompt_456",
  "responses": [
    {
      "question": "What mattered most to you today?",
      "answer": "Had a breakthrough conversation with my team about our values. Finally feel aligned."
    },
    {
      "question": "Where did you feel most aligned with your values?",
      "answer": "During the design workshop. I realized I'm at my best when facilitating creative collaboration."
    }
  ],
  "mood": "inspired",
  "energy_level": 8
}
```

**Response:**
```json
{
  "id": "reflection_789",
  "created_at": "2025-01-15T18:30:00Z",
  "ai_insight": {
    "pattern_detected": "You've mentioned 'collaboration' and 'alignment' in your last 4 reflections. This seems to be a growing theme.",
    "follow_up_question": "What would it look like to design more collaborative moments into your week?",
    "tags": ["collaboration", "values-alignment", "leadership"]
  },
  "streak_updated": {
    "current_streak": 15,
    "milestone_reached": false
  }
}
```

#### Get Reflection History
```http
GET /reflections?limit=20&offset=0
Authorization: Bearer YOUR_JWT_TOKEN
```

**Query Parameters:**
- `limit` (optional): Number of results (default: 10, max: 50)
- `offset` (optional): Pagination offset
- `tag` (optional): Filter by AI-detected tag
- `date_from` (optional): ISO 8601 date
- `date_to` (optional): ISO 8601 date

---

### 4. Insights

#### Capture Insight
```http
POST /insights
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "content": "From 'Atomic Habits': Environment design is more powerful than willpower.",
  "source": "book",
  "source_title": "Atomic Habits by James Clear",
  "tags": ["habits", "environment-design"]
}
```

**Response:**
```json
{
  "id": "insight_123",
  "content": "From 'Atomic Habits': Environment design is more powerful than willpower.",
  "source": "book",
  "source_title": "Atomic Habits by James Clear",
  "ai_analysis": {
    "suggested_tags": ["habits", "environment-design", "behavior-change"],
    "related_reflections": ["reflection_789", "reflection_654"],
    "actionable_next_step": "Design one small change to your workspace that supports your creativity goal"
  },
  "created_at": "2025-01-15T19:00:00Z"
}
```

#### Get All Insights
```http
GET /insights?tag=habits&limit=20
Authorization: Bearer YOUR_JWT_TOKEN
```

#### Search Insights
```http
GET /insights/search?q=environment&limit=10
Authorization: Bearer YOUR_JWT_TOKEN
```

---

### 5. AI Pattern Detection

#### Get Detected Patterns
```http
GET /ai/patterns
Authorization: Bearer YOUR_JWT_TOKEN
```

**Response:**
```json
{
  "patterns": [
    {
      "id": "pattern_001",
      "theme": "control_in_uncertainty",
      "description": "You frequently mention wanting 'control' when discussing work stress and career decisions.",
      "first_detected": "2025-01-10T00:00:00Z",
      "occurrences": 7,
      "related_reflections": ["reflection_789", "reflection_654", "reflection_543"],
      "ai_insight": "This pattern suggests a core tension between your desire for autonomy and external uncertainties. Consider: What aspects *can* you control?",
      "suggested_practices": [
        "Circle of Control exercise",
        "Stoic reflection on acceptance"
      ]
    }
  ],
  "summary": "3 patterns detected in the last 30 days"
}
```

#### Get AI Mirror (Weekly Summary)
```http
GET /ai/mirror?week=2025-W03
Authorization: Bearer YOUR_JWT_TOKEN
```

**Response:**
```json
{
  "week": "2025-W03",
  "summary": "This week, you explored themes of collaboration, control, and creativity. Your energy was highest during facilitation moments.",
  "key_insights": [
    "Collaboration emerged as a core value",
    "You struggle with control in uncertain situations",
    "Creative work energizes you most"
  ],
  "progress_highlights": {
    "reflections_completed": 5,
    "insights_captured": 3,
    "new_patterns_detected": 1
  },
  "ai_reflection": "You're in a discovery phase, Sarah. Notice how 'alignment' keeps appearing? That's your compass right now.",
  "next_week_focus": "Explore: What does creative leadership look like for you?"
}
```

---

### 6. Learning Paths

#### Get Recommended Learning Path
```http
GET /learning-paths/recommended
Authorization: Bearer YOUR_JWT_TOKEN
```

**Response:**
```json
{
  "path_id": "path_creative_leadership",
  "title": "Creative Leadership Journey",
  "duration_weeks": 8,
  "ai_rationale": "Based on your patterns around collaboration, creativity, and impact, this path will help you integrate these themes.",
  "modules": [
    {
      "week": 1,
      "title": "Defining Your Creative Values",
      "practices": [
        "Values hierarchy exercise",
        "Creative leadership reflection"
      ],
      "readings": [
        "Chapter 1: What is Creative Leadership?"
      ]
    }
  ],
  "tier_required": "transformation"
}
```

#### Enroll in Learning Path
```http
POST /learning-paths/path_creative_leadership/enroll
Authorization: Bearer YOUR_JWT_TOKEN
```

---

### 7. Subscription & Billing

#### Get Current Subscription
```http
GET /subscription
Authorization: Bearer YOUR_JWT_TOKEN
```

**Response:**
```json
{
  "tier": "transformation",
  "status": "active",
  "billing_cycle": "monthly",
  "amount": 19.95,
  "next_billing_date": "2025-02-15",
  "features": {
    "unlimited_reflections": true,
    "ai_insights": true,
    "learning_paths": true,
    "weekly_summaries": true,
    "community_access": true
  }
}
```

#### Upgrade Subscription
```http
POST /subscription/upgrade
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "tier": "transformation",
  "payment_method": "pm_1234567890"
}
```

---

## Rate Limiting

### Free Tier
- **AI Reflections:** 10 per month
- **Insights:** 20 total
- **API Requests:** 100 per hour

### Transformation Tier
- **AI Reflections:** Unlimited
- **Insights:** Unlimited
- **API Requests:** 1,000 per hour

### Mastery Tier
- **Everything unlimited**
- **Priority API access**

**Rate Limit Headers:**
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 87
X-RateLimit-Reset: 1642262400
```

---

## Webhooks (Future)

For premium coaching tier:
- `reflection.completed`
- `pattern.detected`
- `milestone.reached`

---

## Error Responses

All error responses follow this format:
```json
{
  "error": {
    "code": "TIER_LIMIT_EXCEEDED",
    "message": "You've reached your monthly reflection limit. Upgrade to Transformation tier for unlimited reflections.",
    "details": {
      "current_tier": "free",
      "limit": 10,
      "used": 10,
      "upgrade_url": "https://camino.to/pricing"
    }
  }
}
```

### Common Error Codes
- `INVALID_TOKEN` - JWT expired or invalid
- `TIER_LIMIT_EXCEEDED` - Free tier limits reached
- `PATTERN_NOT_FOUND` - Requested pattern doesn't exist
- `AI_SERVICE_UNAVAILABLE` - Temporary AI service issue
- `RATE_LIMIT_EXCEEDED` - Too many requests

---

## SDKs & Libraries

### JavaScript/TypeScript
```bash
npm install @camino/sdk
```

```typescript
import { CaminoClient } from '@camino/sdk';

const camino = new CaminoClient({
  apiKey: process.env.CAMINO_API_KEY
});

const prompt = await camino.reflections.getPrompt();
const reflection = await camino.reflections.submit({
  promptId: prompt.id,
  responses: [...]
});
```

### Python
```bash
pip install camino-sdk
```

```python
from camino import CaminoClient

client = CaminoClient(api_key=os.getenv('CAMINO_API_KEY'))

prompt = client.reflections.get_prompt()
reflection = client.reflections.submit(
    prompt_id=prompt.id,
    responses=[...]
)
```

---

## Changelog

### v1.0.0 (2025-10-09)
- Initial API release
- Core reflection and insight endpoints
- AI pattern detection
- Life Lens onboarding
- JWT authentication

### Planned (v1.1.0)
- Community conversations endpoints
- Voice journaling support
- Integration APIs (Notion, Readwise)
- Enhanced AI analysis

---

## Support

- **API Status:** https://status.camino.to
- **Documentation:** https://docs.camino.to
- **Support Email:** api-support@camino.to
- **Developer Discord:** https://discord.gg/camino-dev

---

*Built with intention for those who seek clarity in a noisy world.*
