#!/bin/bash
# Rollback script for Zero Trust Platform enhancements

echo "🔄 Rolling back to previous version..."

if [ -d "/home/iamrad/Projects/github/UaXtXo/backup_20250525_195621" ]; then
    cp -r "/home/iamrad/Projects/github/UaXtXo/backup_20250525_195621/js_backup/"* "/home/iamrad/Projects/github/UaXtXo/js/" 2>/dev/null || true
    cp -r "/home/iamrad/Projects/github/UaXtXo/backup_20250525_195621/css_backup/"* "/home/iamrad/Projects/github/UaXtXo/css/" 2>/dev/null || true
    cp "/home/iamrad/Projects/github/UaXtXo/backup_20250525_195621/index.html.backup" "/home/iamrad/Projects/github/UaXtXo/index.html" 2>/dev/null || true
    echo "✅ Rollback completed successfully"
else
    echo "❌ Backup directory not found: /home/iamrad/Projects/github/UaXtXo/backup_20250525_195621"
    exit 1
fi
