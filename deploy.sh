#!/bin/bash

# Deployment script for Portnox Total Cost Analyzer
# Usage: ./deploy.sh [environment]

# Default to development environment
ENVIRONMENT=${1:-development}

echo "Deploying Portnox Total Cost Analyzer to $ENVIRONMENT environment..."

# Create output directory
OUTPUT_DIR="./dist"
mkdir -p $OUTPUT_DIR

# Clean existing files
rm -rf $OUTPUT_DIR/*

# Copy HTML files
cp *.html $OUTPUT_DIR/

# Copy CSS files
mkdir -p $OUTPUT_DIR/css/themes
cp -r ./css/themes/* $OUTPUT_DIR/css/themes/

# Copy JavaScript files
mkdir -p $OUTPUT_DIR/js/core
mkdir -p $OUTPUT_DIR/js/charts
mkdir -p $OUTPUT_DIR/js/components
mkdir -p $OUTPUT_DIR/js/views
mkdir -p $OUTPUT_DIR/js/utils

cp -r ./js/core/* $OUTPUT_DIR/js/core/
cp -r ./js/charts/* $OUTPUT_DIR/js/charts/
cp -r ./js/components/* $OUTPUT_DIR/js/components/
cp -r ./js/views/* $OUTPUT_DIR/js/views/
cp -r ./js/utils/* $OUTPUT_DIR/js/utils/

# Copy images
mkdir -p $OUTPUT_DIR/img/vendors
mkdir -p $OUTPUT_DIR/img/logos
cp -r ./img/vendors/* $OUTPUT_DIR/img/vendors/
cp -r ./img/logos/* $OUTPUT_DIR/img/logos/

# Environment-specific configurations
if [ "$ENVIRONMENT" = "production" ]; then
  # Minify JavaScript files
  echo "Minifying JavaScript files..."
  for file in $(find $OUTPUT_DIR/js -name "*.js"); do
    # Use uglifyjs if available, otherwise skip minification
    if command -v uglifyjs &> /dev/null; then
      uglifyjs $file -o $file.min
      mv $file.min $file
    else
      echo "Warning: uglifyjs not found, skipping minification for $file"
    fi
  done
  
  # Minify CSS files
  echo "Minifying CSS files..."
  for file in $(find $OUTPUT_DIR/css -name "*.css"); do
    # Use cssnano if available, otherwise skip minification
    if command -v cssnano &> /dev/null; then
      cssnano $file $file.min
      mv $file.min $file
    else
      echo "Warning: cssnano not found, skipping minification for $file"
    fi
  done
fi

echo "Deployment complete! Files are in the $OUTPUT_DIR directory."
