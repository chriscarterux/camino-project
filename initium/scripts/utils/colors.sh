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
