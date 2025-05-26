#!/usr/bin/env python3
"""
Fix syntax error in zero-trust-executive-platform.js
Specifically targeting: Unexpected token ')' at line 1
"""

import re
import sys
import os

def diagnose_and_fix(filename):
    """Diagnose and fix syntax errors in the JavaScript file."""
    
    print(f"🔍 Analyzing {filename}...")
    
    try:
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()
    except FileNotFoundError:
        print(f"❌ File not found: {filename}")
        return False
    
    # Backup the original
    backup_name = f"{filename}.backup"
    with open(backup_name, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"📦 Created backup: {backup_name}")
    
    # Check for BOM
    if content.startswith('\ufeff'):
        print("⚠️  Found BOM (Byte Order Mark) - removing...")
        content = content[1:]
    
    # Split into lines for analysis
    lines = content.split('\n')
    
    # Check first line for syntax issues
    print(f"\n📄 First line of file: '{lines[0][:100]}...'")
    
    # Look for stray closing parenthesis at the beginning
    if lines[0].strip().startswith(')'):
        print("❌ Found stray closing parenthesis at line 1!")
        lines[0] = lines[0].lstrip(')')
        print("🔧 Removed stray parenthesis")
    
    # Check for incomplete createComplianceSelector method
    print("\n🔍 Looking for incomplete createComplianceSelector method...")
    
    fixed = False
    for i, line in enumerate(lines):
        if 'createComplianceSelector()' in line and i + 1 < len(lines):
            # Check if the next line is incomplete
            next_line = lines[i + 1].strip()
            if next_line == 'return Object.entries(this.complianceData' or \
               next_line.endswith('return Object.entries(this.complianceData'):
                print(f"❌ Found incomplete method at line {i + 2}")
                
                # Replace with complete method
                complete_method = '''        return Object.entries(this.complianceData).map(([key, compliance]) => `
            <div class="compliance-item">
                <label class="checkbox-wrapper">
                    <input type="checkbox" class="compliance-checkbox" value="${key}" 
                           ${this.config.complianceFrameworks.includes(key) ? 'checked' : ''}>
                    <span class="checkbox-custom"></span>
                    <span class="compliance-info">
                        <span class="compliance-name">${compliance.name}</span>
                        <span class="compliance-priority priority-${compliance.priority.toLowerCase()}">${compliance.priority}</span>
                    </span>
                </label>
            </div>
        `).join('');
    }'''
                
                # Find the end of the method and replace
                lines[i + 1] = complete_method
                
                # Remove any incomplete lines that follow
                j = i + 2
                while j < len(lines) and not lines[j].strip().startswith('}'):
                    if lines[j].strip() == '':
                        j += 1
                        continue
                    lines[j] = ''
                    j += 1
                
                fixed = True
                print("✅ Fixed incomplete method")
                break
    
    # Check for mismatched braces/parentheses
    print("\n📊 Checking bracket balance...")
    
    open_braces = content.count('{')
    close_braces = content.count('}')
    open_parens = content.count('(')
    close_parens = content.count(')')
    open_brackets = content.count('[')
    close_brackets = content.count(']')
    
    print(f"  Braces: {open_braces} open, {close_braces} close")
    print(f"  Parentheses: {open_parens} open, {close_parens} close")
    print(f"  Brackets: {open_brackets} open, {close_brackets} close")
    
    # Fix mismatched braces
    if open_braces > close_braces:
        missing = open_braces - close_braces
        print(f"⚠️  Missing {missing} closing brace(s)")
        # Add missing braces at the end
        for _ in range(missing):
            lines.append('}')
        print(f"🔧 Added {missing} closing brace(s)")
    
    # Look for other common syntax errors
    print("\n🔍 Checking for other syntax issues...")
    
    # Pattern to find incomplete template literals
    for i, line in enumerate(lines):
        # Check for unclosed template literals
        backticks = line.count('`')
        if backticks % 2 != 0:
            print(f"⚠️  Line {i+1}: Unclosed template literal")
    
    # Save the fixed content
    fixed_content = '\n'.join(lines)
    
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(fixed_content)
    
    print(f"\n✅ Saved fixed file: {filename}")
    
    # Verify the fix with a simple check
    print("\n🔍 Verifying fix...")
    try:
        # Basic syntax validation
        # Count quotes and backticks to ensure they're balanced
        single_quotes = fixed_content.count("'") - fixed_content.count("\\'")
        double_quotes = fixed_content.count('"') - fixed_content.count('\\"')
        backticks = fixed_content.count('`')
        
        issues = []
        if single_quotes % 2 != 0:
            issues.append("unmatched single quotes")
        if double_quotes % 2 != 0:
            issues.append("unmatched double quotes")
        if backticks % 2 != 0:
            issues.append("unmatched backticks")
        
        if issues:
            print(f"⚠️  Potential issues found: {', '.join(issues)}")
        else:
            print("✅ Basic syntax validation passed")
            
    except Exception as e:
        print(f"❌ Verification error: {e}")
    
    return True

if __name__ == "__main__":
    file_path = "js/views/zero-trust-executive-platform.js"
    
    if len(sys.argv) > 1:
        file_path = sys.argv[1]
    
    if diagnose_and_fix(file_path):
        print("\n🎉 Fix completed!")
        print("📝 Next steps:")
        print("1. Test the application in the browser")
        print("2. Check browser console for any remaining errors")
        print("3. If issues persist, check the backup file")
        print(f"\n💡 To restore backup: cp {file_path}.backup {file_path}")
    else:
        print("\n❌ Fix failed!")
        sys.exit(1)