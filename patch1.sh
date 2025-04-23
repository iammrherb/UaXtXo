#!/bin/bash

# File to patch
CSS_FILE="css/styles.css"

# Backup the original
cp "$CSS_FILE" "${CSS_FILE}.bak"

# Check and append if not present
if ! grep -q '.tab-pane.active' "$CSS_FILE"; then
  echo -e "\n/* Tab visibility enhancements */" >> "$CSS_FILE"
  echo '.tab-pane, .sub-tab-pane { display: none; opacity: 0; transition: opacity 0.3s ease; }' >> "$CSS_FILE"
  echo '.tab-pane.active, .sub-tab-pane.active { display: block; opacity: 1; }' >> "$CSS_FILE"
  echo '.hidden { display: none !important; }' >> "$CSS_FILE"
  echo "[+] Tab enhancements successfully appended to $CSS_FILE"
else
  echo "[?] Tab styles already present. No changes made."
fi
