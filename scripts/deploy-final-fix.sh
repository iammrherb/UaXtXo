#!/bin/bash

echo "=== Deploying NAC Architecture Designer Pro Final Fix ==="

# Run the install script
./install-final-fix.sh

# If .git directory exists, offer to commit changes
if [ -d ".git" ]; then
    echo ""
    echo "Git repository detected."
    read -p "Do you want to commit the changes? (y/n): " commit_changes
    
    if [ "$commit_changes" = "y" ] || [ "$commit_changes" = "Y" ]; then
        echo "Committing changes to git repository..."
        git add js/fixes/
        git add index.html
        git add install-final-fix.sh
        git commit -m "Add NAC Architecture Designer Pro final fixes"
        
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
echo "Final fix deployment complete!"
echo "This should resolve all remaining issues in the application."
