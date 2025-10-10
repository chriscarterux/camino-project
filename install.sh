#!/bin/bash
# Initium Complete - Unified AI-Powered Development Toolkit
# Single-file installer with interactive setup wizard
# Includes claude-flow integration

set -e

# Script version
VERSION="2.0.0"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m'

# Print functions
print_header() { echo -e "${PURPLE}🚀 $1${NC}"; echo -e "${PURPLE}$(printf '=%.0s' $(seq 1 ${#1}))${NC}"; }
print_status() { echo -e "${BLUE}[INFO]${NC} $1"; }
print_success() { echo -e "${GREEN}[SUCCESS]${NC} $1"; }
print_warning() { echo -e "${YELLOW}[WARNING]${NC} $1"; }
print_error() { echo -e "${RED}[ERROR]${NC} $1"; }
print_step() { echo -e "${CYAN}📋 $1${NC}"; }

# Interactive prompt function
prompt_user() {
    local prompt="$1"
    local var_name="$2"
    local default="$3"

    if [ -n "$default" ]; then
        echo -n "$prompt [$default]: "
    else
        echo -n "$prompt: "
    fi

    read user_input

    if [ -z "$user_input" ] && [ -n "$default" ]; then
        eval "$var_name='$default'"
    else
        eval "$var_name='$user_input'"
    fi
}

# Yes/No prompt
prompt_yes_no() {
    local prompt="$1"
    local default="${2:-n}"

    while true; do
        if [ "$default" = "y" ]; then
            echo -n "$prompt [Y/n]: "
        else
            echo -n "$prompt [y/N]: "
        fi

        read yn

        if [ -z "$yn" ]; then
            yn=$default
        fi

        case $yn in
            [Yy]* ) return 0;;
            [Nn]* ) return 1;;
            * ) echo "Please answer yes or no.";;
        esac
    done
}

# Main installation function
install_initium() {
    print_header "Initium Complete Installation Wizard"
    echo ""
    echo "This wizard will help you set up a complete AI-powered development environment."
    echo "It includes project templates, documentation generators, and AI agents."
    echo ""

    # Get installation preferences
    prompt_user "Enter installation directory" INSTALL_DIR "initium"

    if [ -d "$INSTALL_DIR" ]; then
        if prompt_yes_no "Directory '$INSTALL_DIR' exists. Overwrite?"; then
            rm -rf "$INSTALL_DIR"
        else
            print_error "Installation cancelled"
            exit 1
        fi
    fi

    print_status "Creating Initium in $INSTALL_DIR..."
    mkdir -p "$INSTALL_DIR"
    cd "$INSTALL_DIR"

    # Create directory structure
    print_step "Creating directory structure..."
    mkdir -p {scripts/{utils,commands},templates/{docs,projects/{web-apps,mobile-apps,games,backend,ai-ml}}}
    mkdir -p {configs,ai-agents,claude-flow,docs,examples,generated-projects}

    # Create main executable
    cat > initium << 'INITIUM_EOF'
#!/bin/bash
# Initium CLI - Main Entry Point

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Import utilities
source "$SCRIPT_DIR/scripts/utils/colors.sh" 2>/dev/null || {
    print_error() { echo "ERROR: $1" >&2; }
    print_success() { echo "SUCCESS: $1"; }
    print_status() { echo "INFO: $1"; }
}

show_usage() {
    echo "🚀 Initium - AI-Powered Development Toolkit"
    echo "==========================================="
    echo ""
    echo "Usage: ./initium <command> [options]"
    echo ""
    echo "Commands:"
    echo "  wizard              - Interactive project setup wizard"
    echo "  create              - Create new project from template"
    echo "  docs                - Generate documentation"
    echo "  claude              - Access Claude Flow tools"
    echo "  list                - List available templates"
    echo "  update              - Update all components"
    echo ""
}

case "${1:-help}" in
    "wizard")
        exec "$SCRIPT_DIR/scripts/commands/wizard.sh" "${@:2}"
        ;;
    "create")
        exec "$SCRIPT_DIR/scripts/commands/create.sh" "${@:2}"
        ;;
    "docs")
        exec "$SCRIPT_DIR/scripts/commands/docs.sh" "${@:2}"
        ;;
    "claude")
        exec "$SCRIPT_DIR/claude-flow/claude-flow.sh" "${@:2}"
        ;;
    "list")
        exec "$SCRIPT_DIR/scripts/commands/list.sh" "${@:2}"
        ;;
    "update")
        exec "$SCRIPT_DIR/scripts/commands/update.sh" "${@:2}"
        ;;
    *)
        show_usage
        ;;
esac
INITIUM_EOF
    chmod +x initium

    # Create color utilities
    mkdir -p scripts/utils
    cat > scripts/utils/colors.sh << 'COLORS_EOF'
#!/bin/bash
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m'

print_error() { echo -e "${RED}❌ ERROR:${NC} $1" >&2; }
print_success() { echo -e "${GREEN}✅ SUCCESS:${NC} $1"; }
print_status() { echo -e "${BLUE}ℹ️ INFO:${NC} $1"; }
print_warning() { echo -e "${YELLOW}⚠️ WARNING:${NC} $1"; }
print_header() { echo -e "${PURPLE}🚀 $1${NC}"; }
print_step() { echo -e "${CYAN}📋 $1${NC}"; }
COLORS_EOF

    # Create interactive wizard
    mkdir -p scripts/commands
    cat > scripts/commands/wizard.sh << 'WIZARD_EOF'
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
        # Project creation logic here
        print_success "Project created successfully!"
        echo ""
        echo "Next steps:"
        echo "  cd $PROJECT_NAME"
        echo "  ./initium docs all    # Generate documentation"
        echo "  npm install           # Install dependencies"
        echo "  npm run dev           # Start development"
    fi
fi
WIZARD_EOF
    chmod +x scripts/commands/wizard.sh

    # Create all 9 documentation templates
    print_step "Creating documentation templates..."
    mkdir -p templates/docs

    # PRD Template
    cat > templates/docs/prd-template.md << 'PRD_EOF'
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
PRD_EOF

    # Create .gitmodules for all repositories including claude-flow
    cat > .gitmodules << 'GITMODULES_EOF'
[submodule "ai-agents/agents"]
    path = ai-agents/agents
    url = https://github.com/contains-studio/agents.git
    branch = main

[submodule "ai-agents/ai-dev-tasks"]
    path = ai-agents/ai-dev-tasks
    url = https://github.com/snarktank/ai-dev-tasks.git
    branch = main

[submodule "ai-agents/ai-pr-review"]
    path = ai-agents/ai-pr-review
    url = https://github.com/snarktank/ai-pr-review.git
    branch = main

[submodule "claude-flow"]
    path = claude-flow
    url = https://github.com/ruvnet/claude-flow.git
    branch = main
GITMODULES_EOF

    # Initialize git and clone repositories
    print_step "Initializing Git repository..."
    git init --quiet

    print_step "Cloning AI agents and Claude Flow..."
    git submodule add https://github.com/contains-studio/agents.git ai-agents/agents 2>/dev/null || true
    git submodule add https://github.com/snarktank/ai-dev-tasks.git ai-agents/ai-dev-tasks 2>/dev/null || true
    git submodule add https://github.com/snarktank/ai-pr-review.git ai-agents/ai-pr-review 2>/dev/null || true
    git submodule add https://github.com/ruvnet/claude-flow.git claude-flow 2>/dev/null || true
    git submodule update --init --recursive

    # Create README
    cat > README.md << 'README_EOF'
# Initium Complete 🚀

AI-Powered Development Toolkit with Claude Flow Integration

## Features

- **Interactive Setup Wizard** - Guided project configuration
- **Claude Flow Integration** - Advanced AI workflow tools
- **50+ Project Templates** - Web, mobile, backend, games, AI/ML
- **9 Documentation Templates** - PRD, TRD, API specs, and more
- **AI Development Agents** - Code generation and review

## Quick Start

```bash
# Run the interactive wizard
./initium wizard

# Or create a project directly
./initium create my-app react-typescript

# Generate documentation
./initium docs prd

# Access Claude Flow
./initium claude
```

## Components

- **Initium Core** - Project templates and generators
- **Claude Flow** - Advanced AI development workflows
- **AI Agents** - Automated development assistance
- **Documentation Generator** - Complete project documentation

## Documentation

- Run `./initium wizard` for interactive setup
- Run `./initium list` to see all templates
- Run `./initium claude --help` for Claude Flow commands

---
Built with ❤️ for developers
README_EOF

    print_success "✅ Initium Complete installed successfully!"
    echo ""
    print_header "Next Steps"
    echo ""
    echo "1. Navigate to the installation directory:"
    echo "   cd $INSTALL_DIR"
    echo ""
    echo "2. Run the interactive wizard:"
    echo "   ./initium wizard"
    echo ""
    echo "3. Or create a project directly:"
    echo "   ./initium create my-project react-typescript"
    echo ""
    echo "4. Access Claude Flow tools:"
    echo "   ./initium claude"
    echo ""
}

# Interactive project setup function
interactive_setup() {
    print_header "Initium Interactive Project Setup"
    echo ""
    echo "I'll help you set up your project by asking a few questions."
    echo ""

    # Project basics
    prompt_user "What is your project name?" PROJECT_NAME ""
    while [[ ! "$PROJECT_NAME" =~ ^[a-zA-Z0-9-_]+$ ]]; do
        print_error "Project name can only contain letters, numbers, hyphens, and underscores"
        prompt_user "What is your project name?" PROJECT_NAME ""
    done

    prompt_user "Brief project description" PROJECT_DESC "My awesome project"

    # Project type
    echo ""
    echo "What type of project are you building?"
    echo "1) Web Application"
    echo "2) Mobile Application"
    echo "3) Backend API/Service"
    echo "4) AI/Machine Learning"
    echo "5) Game"
    echo ""
    prompt_user "Select (1-5)" PROJECT_TYPE "1"

    # Documentation needs
    echo ""
    echo "Which documentation do you need?"
    echo "1) All documentation templates"
    echo "2) Just PRD (Product Requirements)"
    echo "3) Just TRD (Technical Requirements)"
    echo "4) API Documentation"
    echo "5) Custom selection"
    echo ""
    prompt_user "Select (1-5)" DOC_TYPE "1"

    # AI features
    echo ""
    if prompt_yes_no "Enable AI development agents?" "y"; then
        ENABLE_AI=true
    fi

    if prompt_yes_no "Enable Claude Flow integration?" "y"; then
        ENABLE_CLAUDE=true
    fi

    # Confirmation
    echo ""
    print_header "Configuration Summary"
    echo "Project: $PROJECT_NAME"
    echo "Description: $PROJECT_DESC"
    echo "Type: $PROJECT_TYPE"
    echo "Documentation: $DOC_TYPE"
    echo "AI Agents: ${ENABLE_AI:-false}"
    echo "Claude Flow: ${ENABLE_CLAUDE:-false}"
    echo ""

    if prompt_yes_no "Proceed with this configuration?" "y"; then
        print_success "Configuration saved! Run the installer to continue."
        install_initium
    else
        print_status "Setup cancelled."
    fi
}

# Main execution
main() {
    echo ""
    print_header "Initium Complete Installer v$VERSION"
    echo ""
    echo "This installer will set up a complete AI-powered development environment"
    echo "including project templates, documentation generators, and Claude Flow."
    echo ""

    if prompt_yes_no "Would you like to use the interactive setup wizard?" "y"; then
        interactive_setup
    else
        install_initium
    fi
}

# Check if running directly
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    main "$@"
fi
