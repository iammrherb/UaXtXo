#!/bin/bash

echo "=== Deploying NAC Architecture Designer Pro Fixes ==="

# Run the install script
./install-nac-fixes.sh

# If .git directory exists, offer to commit changes
if [ -d ".git" ]; then
    echo ""
    echo "Git repository detected."
    read -p "Do you want to commit the changes? (y/n): " commit_changes
    
    if [ "$commit_changes" = "y" ] || [ "$commit_changes" = "Y" ]; then
        git add js/fixes/
        git add test-fixes.html
        git add index.html
        git commit -m "Add NAC Architecture Designer Pro fixes to resolve initialization errors"
        
        read -p "Do you want to push the changes? (y/n): " push_changes
        if [ "$push_changes" = "y" ] || [ "$push_changes" = "Y" ]; then
            git push
            echo "Changes pushed to repository."
        else
            echo "Changes committed but not pushed."
        fi
    else
        echo "Changes not committed."
    fi
fi

echo ""
echo "Deployment complete!"
echo "Open test-fixes.html in your browser to test the fixes."
