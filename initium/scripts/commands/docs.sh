#!/bin/bash
# Documentation Generator

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
source "$SCRIPT_DIR/scripts/utils/colors.sh"

show_usage() {
    echo "📚 Initium Documentation Generator"
    echo "=================================="
    echo ""
    echo "Usage: ./initium docs [type] [project-path]"
    echo ""
    echo "Types:"
    echo "  prd         - Product Requirements Document"
    echo "  trd         - Technical Requirements Document"
    echo "  api         - API Documentation"
    echo "  arch        - Architecture Documentation"
    echo "  user        - User Guide"
    echo "  deploy      - Deployment Guide"
    echo "  contrib     - Contributing Guide"
    echo "  test        - Testing Documentation"
    echo "  all         - Generate all documentation"
    echo ""
    echo "Examples:"
    echo "  ./initium docs prd ./my-project"
    echo "  ./initium docs all ./generated-projects/walter-web-app"
    echo ""
}

generate_prd() {
    local project_dir="$1"
    local project_name=$(basename "$project_dir")

    print_status "Generating Product Requirements Document..."

    cat > "$project_dir/docs/PRD.md" << 'EOF'
# Product Requirements Document (PRD)

## 1. Product Overview
### What are you building?
- **Product Name:** [Your product name]
- **Description:** [One-line description]
- **Category:** [Web app/Mobile app/Game/etc.]
- **Platform:** [Target platforms]

### Mission Statement
We believe that [target audience] should be able to [core capability] because [problem we're solving].

### Success Metrics
- **Primary Metric:** [Key success measure]
- **Secondary Metrics:** [Supporting metrics]
- **User Engagement:** [How to measure user satisfaction]

## 2. Target Audience
### Primary Users
- **Demographics:** [Age, location, profession]
- **Psychographics:** [Interests, values, lifestyle]
- **Technical Proficiency:** [Tech-savvy level]
- **Current Solutions:** [What they use today]

### User Personas
#### Persona 1: [Name]
- **Role:** [Their job/position]
- **Goals:** [What they want to achieve]
- **Pain Points:** [Current frustrations]
- **Quote:** "[Something they might say]"

## 3. Core Features & Requirements
### Must-Have Features (V1)
1. **[Feature 1]** - [Why essential]
2. **[Feature 2]** - [Why essential]
3. **[Feature 3]** - [Why essential]

### Should-Have Features (V2)
1. **[Feature 4]** - [Nice to have]
2. **[Feature 5]** - [Nice to have]

### Could-Have Features (Future)
1. **[Feature 6]** - [Future consideration]
2. **[Feature 7]** - [Future consideration]

## 4. User Experience Goals
### Core User Journey
1. **Discovery:** [How users find you]
2. **Onboarding:** [First experience]
3. **Core Value:** [The "aha!" moment]
4. **Habit Formation:** [Becoming regular users]
5. **Growth:** [How they help you grow]

## 5. Business Requirements
### Monetization Strategy
- **Revenue Model:** [How you'll make money]
- **Pricing Strategy:** [Free/Freemium/Paid]
- **Customer Acquisition Cost:** [Target CAC]
- **Lifetime Value:** [Expected LTV]

## 6. Launch Strategy
### MVP Definition
What's the smallest version that provides value?
- [Core feature 1]
- [Core feature 2]
- [Core feature 3]

### Go-to-Market Plan
1. **Pre-Launch:** [Building awareness]
2. **Launch:** [Launch strategy]
3. **Post-Launch:** [Growth tactics]

## 7. Risks & Mitigation
### Technical Risks
- **Risk:** [What could go wrong]
- **Likelihood:** [High/Medium/Low]
- **Impact:** [High/Medium/Low]
- **Mitigation:** [How to prevent/handle]

## 8. Timeline & Resources
### Development Phases
- **Phase 1 (Weeks 1-4):** [Core functionality]
- **Phase 2 (Weeks 5-8):** [Polish and testing]
- **Phase 3 (Weeks 9-12):** [Launch preparation]

---
*This PRD is a living document that evolves with your product.*
EOF

    print_success "PRD generated at $project_dir/docs/PRD.md"
}

generate_trd() {
    local project_dir="$1"

    print_status "Generating Technical Requirements Document..."

    cat > "$project_dir/docs/TRD.md" << 'EOF'
# Technical Requirements Document (TRD)

## 1. System Architecture

### High-Level Architecture
- **Architecture Pattern:** [MVC, Microservices, Serverless, etc.]
- **Technology Stack:**
  - Frontend: [React, Vue, Angular, etc.]
  - Backend: [Node.js, Python, Go, etc.]
  - Database: [PostgreSQL, MongoDB, etc.]
  - Infrastructure: [AWS, GCP, Azure, etc.]

### System Components
```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Frontend  │────▶│   Backend   │────▶│  Database   │
└─────────────┘     └─────────────┘     └─────────────┘
```

## 2. Technical Stack

### Frontend
- **Framework:** [Specific version]
- **State Management:** [Redux, Zustand, etc.]
- **Styling:** [Tailwind, CSS-in-JS, etc.]
- **Build Tools:** [Vite, Webpack, etc.]

### Backend
- **Runtime:** [Node.js, Python, etc.]
- **Framework:** [Express, FastAPI, etc.]
- **API Style:** [REST, GraphQL, gRPC]
- **Authentication:** [JWT, OAuth2, etc.]

### Database
- **Primary Database:** [Type and version]
- **Caching Layer:** [Redis, Memcached]
- **Search:** [Elasticsearch, Algolia]

### Infrastructure
- **Hosting:** [Platform details]
- **CDN:** [Cloudflare, AWS CloudFront]
- **Monitoring:** [Datadog, Sentry, etc.]
- **CI/CD:** [GitHub Actions, Jenkins, etc.]

## 3. API Design

### Endpoints
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | /api/users | Get users | Yes |
| POST | /api/users | Create user | Yes |

### Request/Response Examples
```json
// POST /api/users
{
  "name": "John Doe",
  "email": "john@example.com"
}

// Response
{
  "id": "123",
  "name": "John Doe",
  "email": "john@example.com",
  "created_at": "2024-01-01T00:00:00Z"
}
```

## 4. Data Models

### User Schema
```typescript
interface User {
  id: string;
  email: string;
  name: string;
  created_at: Date;
  updated_at: Date;
}
```

## 5. Security Requirements

### Authentication & Authorization
- **Method:** [JWT, OAuth2, etc.]
- **Password Policy:** [Requirements]
- **Session Management:** [Strategy]

### Data Protection
- **Encryption at Rest:** [Method]
- **Encryption in Transit:** [TLS 1.3]
- **PII Handling:** [GDPR compliance]

### Security Best Practices
- Input validation
- SQL injection prevention
- XSS protection
- CSRF tokens
- Rate limiting

## 6. Performance Requirements

### Response Times
- **API Endpoints:** < 200ms (p95)
- **Page Load:** < 2s (p95)
- **Time to Interactive:** < 3s

### Scalability
- **Concurrent Users:** [Target number]
- **Requests per Second:** [Target RPS]
- **Database Connections:** [Pool size]

## 7. Development Guidelines

### Code Standards
- **Linting:** ESLint, Prettier
- **Testing:** 80% code coverage minimum
- **Documentation:** JSDoc/TSDoc

### Git Workflow
- **Branching Strategy:** [GitFlow, trunk-based]
- **Commit Convention:** [Conventional Commits]
- **Code Review:** Required for all PRs

## 8. Deployment Strategy

### Environments
- **Development:** Local development
- **Staging:** Pre-production testing
- **Production:** Live environment

### Deployment Process
1. Run tests
2. Build artifacts
3. Deploy to staging
4. Run smoke tests
5. Deploy to production
6. Monitor metrics

## 9. Monitoring & Logging

### Metrics to Track
- Request latency
- Error rates
- Database query performance
- User engagement

### Logging Strategy
- **Log Level:** Info, Warn, Error
- **Log Aggregation:** [ELK, CloudWatch]
- **Retention:** 30 days

## 10. Dependencies

### Third-Party Services
- **Payment Processing:** [Stripe, PayPal]
- **Email Service:** [SendGrid, AWS SES]
- **Analytics:** [Google Analytics, Mixpanel]

---
*Technical specifications subject to change based on requirements.*
EOF

    print_success "TRD generated at $project_dir/docs/TRD.md"
}

generate_api_docs() {
    local project_dir="$1"

    print_status "Generating API Documentation..."

    cat > "$project_dir/docs/API.md" << 'EOF'
# API Documentation

## Base URL
```
Production: https://api.example.com/v1
Staging: https://staging-api.example.com/v1
Development: http://localhost:3000/v1
```

## Authentication
All API requests require authentication using a Bearer token:
```bash
Authorization: Bearer YOUR_API_TOKEN
```

## Common Response Codes
| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 500 | Internal Server Error |

## Endpoints

### Users

#### Get All Users
```http
GET /api/users
```

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)

**Response:**
```json
{
  "data": [
    {
      "id": "user_123",
      "email": "user@example.com",
      "name": "John Doe",
      "created_at": "2024-01-01T00:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100
  }
}
```

#### Create User
```http
POST /api/users
```

**Request Body:**
```json
{
  "email": "newuser@example.com",
  "name": "Jane Doe",
  "password": "secure_password"
}
```

**Response:**
```json
{
  "id": "user_456",
  "email": "newuser@example.com",
  "name": "Jane Doe",
  "created_at": "2024-01-01T00:00:00Z"
}
```

## Error Responses

All error responses follow this format:
```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable error message",
    "details": {}
  }
}
```

## Rate Limiting
- **Limit:** 100 requests per minute per API key
- **Headers:**
  - `X-RateLimit-Limit`: Request limit
  - `X-RateLimit-Remaining`: Remaining requests
  - `X-RateLimit-Reset`: Reset time (Unix timestamp)

---
*For support, contact: api-support@example.com*
EOF

    print_success "API Documentation generated at $project_dir/docs/API.md"
}

generate_all_docs() {
    local project_dir="$1"

    print_header "Generating All Documentation"

    # Create docs directory
    mkdir -p "$project_dir/docs"

    # Generate all document types
    generate_prd "$project_dir"
    generate_trd "$project_dir"
    generate_api_docs "$project_dir"

    # Create index
    cat > "$project_dir/docs/README.md" << EOF
# Documentation Index

Welcome to the documentation for $(basename "$project_dir").

## Available Documentation

1. [Product Requirements Document (PRD)](./PRD.md) - Product vision and requirements
2. [Technical Requirements Document (TRD)](./TRD.md) - Technical architecture and stack
3. [API Documentation](./API.md) - API endpoints and usage

## Quick Links

- [Getting Started](../README.md)
- [Contributing](./CONTRIBUTING.md)
- [Deployment Guide](./DEPLOYMENT.md)

---
Generated by Initium on $(date)
EOF

    print_success "All documentation generated in $project_dir/docs/"
    echo ""
    echo "Documents created:"
    echo "  - docs/README.md"
    echo "  - docs/PRD.md"
    echo "  - docs/TRD.md"
    echo "  - docs/API.md"
}

# Main execution
main() {
    local doc_type="${1:-help}"
    local project_path="${2:-.}"

    # Convert to absolute path
    project_path="$(cd "$project_path" 2>/dev/null && pwd)" || {
        print_error "Project path not found: $2"
        exit 1
    }

    case "$doc_type" in
        "prd")
            mkdir -p "$project_path/docs"
            generate_prd "$project_path"
            ;;
        "trd")
            mkdir -p "$project_path/docs"
            generate_trd "$project_path"
            ;;
        "api")
            mkdir -p "$project_path/docs"
            generate_api_docs "$project_path"
            ;;
        "all")
            generate_all_docs "$project_path"
            ;;
        *)
            show_usage
            ;;
    esac
}

if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    main "$@"
fi
