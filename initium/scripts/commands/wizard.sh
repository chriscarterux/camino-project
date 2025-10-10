#!/bin/bash
# Interactive Project Setup Wizard

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
source "$SCRIPT_DIR/scripts/utils/colors.sh"

print_header "Initium Project Setup Wizard"
echo ""

# Project type selection
echo "What type of project would you like to create?"
echo ""
echo "1) Web Application (React, Vue, Next.js)"
echo "2) Mobile Application (React Native, Flutter)"
echo "3) Backend Service (Node.js, Python, Go)"
echo "4) AI/ML Project (Python, TensorFlow, PyTorch)"
echo "5) Game (Unity, Godot, Web)"
echo ""

read -p "Select project type (1-5): " PROJECT_TYPE

case $PROJECT_TYPE in
    1)
        PROJECT_CATEGORY="web-apps"
        echo ""
        echo "Select framework:"
        echo "1) React with TypeScript"
        echo "2) Next.js Full-Stack"
        echo "3) Vue 3 Composition API"
        read -p "Choice (1-3): " FRAMEWORK_CHOICE
        ;;
    2)
        PROJECT_CATEGORY="mobile-apps"
        echo ""
        echo "Select framework:"
        echo "1) React Native"
        echo "2) Flutter"
        echo "3) Expo"
        read -p "Choice (1-3): " FRAMEWORK_CHOICE
        ;;
    3)
        PROJECT_CATEGORY="backend"
        echo ""
        echo "Select framework:"
        echo "1) Node.js Express"
        echo "2) Python FastAPI"
        echo "3) Go Gin"
        read -p "Choice (1-3): " FRAMEWORK_CHOICE
        ;;
    4)
        PROJECT_CATEGORY="ai-ml"
        echo ""
        echo "Select type:"
        echo "1) Data Science Project"
        echo "2) Machine Learning"
        echo "3) AI Chat Application"
        read -p "Choice (1-3): " FRAMEWORK_CHOICE
        ;;
    5)
        PROJECT_CATEGORY="games"
        echo ""
        echo "Select engine:"
        echo "1) Unity 3D"
        echo "2) Godot"
        echo "3) Web Game (HTML5)"
        read -p "Choice (1-3): " FRAMEWORK_CHOICE
        ;;
esac

echo ""
read -p "Enter project name: " PROJECT_NAME
read -p "Enter project description: " PROJECT_DESC

# Documentation generation
echo ""
print_step "Documentation Setup"
echo "Which documentation would you like to generate?"
echo ""
echo "1) Complete documentation package (all templates)"
echo "2) Product Requirements Document (PRD)"
echo "3) Technical Requirements Document (TRD)"
echo "4) API Specification"
echo "5) Custom selection"
echo ""
read -p "Choice (1-5): " DOC_CHOICE

# AI Features
echo ""
print_step "AI Integration"
if read -p "Enable AI development agents? (y/n): " -n 1 -r; then
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        ENABLE_AI="true"
        echo "✓ AI agents will be configured"
    fi
fi

echo ""
if read -p "Enable Claude Flow integration? (y/n): " -n 1 -r; then
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        ENABLE_CLAUDE_FLOW="true"
        echo "✓ Claude Flow will be integrated"
    fi
fi

# Summary
echo ""
print_header "Project Configuration Summary"
echo ""
echo "Project Name: $PROJECT_NAME"
echo "Description: $PROJECT_DESC"
echo "Category: $PROJECT_CATEGORY"
echo "AI Agents: ${ENABLE_AI:-false}"
echo "Claude Flow: ${ENABLE_CLAUDE_FLOW:-false}"
echo ""

if read -p "Proceed with project creation? (y/n): " -n 1 -r; then
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        print_status "Creating project..."

        # Create project directory
        PROJECT_DIR="$SCRIPT_DIR/generated-projects/$PROJECT_NAME"
        mkdir -p "$PROJECT_DIR"
        cd "$PROJECT_DIR"

        # Initialize based on project type
        case $PROJECT_CATEGORY in
            "web-apps")
                case $FRAMEWORK_CHOICE in
                    1) # React with TypeScript
                        print_status "Setting up React with TypeScript..."
                        npx --yes create-vite@latest . -- --template react-ts
                        ;;
                    2) # Next.js
                        print_status "Setting up Next.js..."
                        npx --yes create-next-app@latest . --typescript --tailwind --app --no-src-dir
                        ;;
                    3) # Vue 3
                        print_status "Setting up Vue 3..."
                        npx --yes create-vite@latest . -- --template vue-ts
                        ;;
                esac
                ;;
            "backend")
                case $FRAMEWORK_CHOICE in
                    1) # Node.js Express
                        print_status "Setting up Express backend..."
                        npm init -y
                        npm install express typescript @types/express @types/node ts-node nodemon
                        ;;
                    2) # Python FastAPI
                        print_status "Setting up FastAPI..."
                        cat > requirements.txt << EOF
fastapi==0.104.1
uvicorn[standard]==0.24.0
pydantic==2.5.0
EOF
                        ;;
                esac
                ;;
        esac

        # Create README
        cat > README.md << EOF
# $PROJECT_NAME

$PROJECT_DESC

## Project Type
- Category: $PROJECT_CATEGORY
- Framework: Choice $FRAMEWORK_CHOICE

## Features
- AI Agents: ${ENABLE_AI:-false}
- Claude Flow: ${ENABLE_CLAUDE_FLOW:-false}

## Getting Started

\`\`\`bash
npm install
npm run dev
\`\`\`

## Documentation
Run \`../initium docs all\` to generate complete documentation.

---
Generated by Initium
EOF

        print_success "Project created successfully!"
        echo ""
        echo "Next steps:"
        echo "  cd generated-projects/$PROJECT_NAME"
        echo "  npm install           # Install dependencies"
        echo "  npm run dev           # Start development"
        echo ""
        echo "Or generate documentation:"
        echo "  cd generated-projects/$PROJECT_NAME"
        echo "  ../../initium docs all"
    fi
fi
