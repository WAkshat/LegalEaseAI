#!/bin/bash

# LegalClarify Git Setup Script
# Run this to configure git with your information

echo "🔧 Setting up Git for LegalClarify..."

# Configure git with your information
git config user.name "Deepanshi Goyal"
git config user.email "your-email@example.com"  # Replace with your actual email

# Optional: Set these globally for all repos
# git config --global user.name "Deepanshi Goyal"
# git config --global user.email "your-email@example.com"

echo "✅ Git configured successfully!"
echo "📧 Remember to replace 'your-email@example.com' with your actual email"

# Show current configuration
echo "📋 Current Git Configuration:"
git config user.name
git config user.email
