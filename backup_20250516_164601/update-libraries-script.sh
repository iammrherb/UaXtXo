#!/bin/bash

# Library Update Script for Portnox Total Cost Analyzer
# This script updates all JavaScript and CSS libraries to support the new features

set -e  # Exit on any error

# Color definitions
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}=================================================${NC}"
echo -e "${BLUE}   Updating Libraries for TCO Multi-Vendor Analyzer   ${NC}"
echo -e "${BLUE}=================================================${NC}"

# Create directories if they don't exist
mkdir -p libs/js
mkdir -p libs/css
mkdir -p libs/fonts

# List of JavaScript libraries to update/add
js_libraries=(
  "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js"
  "https://cdnjs.cloudflare.com/ajax/libs/chart.js/4.4.0/chart.umd.min.js"
  "https://cdnjs.cloudflare.com/ajax/libs/chartjs-plugin-datalabels/2.2.0/chartjs-plugin-datalabels.min.js"
  "https://cdnjs.cloudflare.com/ajax/libs/d3/7.8.5/d3.min.js"
  "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.3/gsap.min.js"
  "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.3/ScrollTrigger.min.js"
  "https://cdnjs.cloudflare.com/ajax/libs/countup.js/2.8.0/countUp.min.js"
  "https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.js"
  "https://cdnjs.cloudflare.com/ajax/libs/particles.js/2.0.0/particles.min.js"
  "https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.21/lodash.min.js"
  "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"
  "https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.8.0/jspdf.plugin.autotable.min.js"
  "https://cdnjs.cloudflare.com/ajax/libs/apexcharts/3.44.0/apexcharts.min.js"
  "https://cdnjs.cloudflare.com/ajax/libs/tippy.js/6.3.7/tippy.umd.min.js"
  "https://cdnjs.cloudflare.com/ajax/libs/popper.js/2.11.8/umd/popper.min.js"
  "https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js"
)

# List of CSS libraries to update/add
css_libraries=(
  "https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css"
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
  "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
  "https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.css"
  "https://cdnjs.cloudflare.com/ajax/libs/hover.css/2.3.1/css/hover-min.css"
  "https://cdnjs.cloudflare.com/ajax/libs/tippy.js/6.3.7/tippy.css"
)

# Function to download a file
download_file() {
  url=$1
  destination=$2
  filename=$(basename "$url")
  
  echo -e "${YELLOW}Downloading ${filename}...${NC}"
  
  if command -v curl &> /dev/null; then
    curl -s -o "$destination" "$url"
  elif command -v wget &> /dev/null; then
    wget -q -O "$destination" "$url"
  else
    echo -e "${RED}Error: Neither curl nor wget is available. Please install one of them and try again.${NC}"
    exit 1
  fi
  
  if [ $? -eq 0 ]; then
    echo -e "${GREEN}Successfully downloaded ${filename}${NC}"
  else
    echo -e "${RED}Failed to download ${filename}${NC}"
    exit 1
  fi
}

# Download JavaScript libraries
echo -e "${BLUE}Downloading JavaScript libraries...${NC}"
for lib_url in "${js_libraries[@]}"; do
  filename=$(basename "$lib_url")
  download_file "$lib_url" "libs/js/$filename"
done

# Download CSS libraries
echo -e "${BLUE}Downloading CSS libraries...${NC}"
for lib_url in "${css_libraries[@]}"; do
  filename=$(basename "$lib_url")
  download_file "$lib_url" "libs/css/$filename"
done

# Download Font Awesome fonts
echo -e "${BLUE}Downloading Font Awesome Fonts...${NC}"
font_awesome_url="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/webfonts/fa-solid-900.woff2"
download_file "$font_awesome_url" "libs/fonts/fa-solid-900.woff2"

font_awesome_url="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/webfonts/fa-brands-400.woff2"
download_file "$font_awesome_url" "libs/fonts/fa-brands-400.woff2"

font_awesome_url="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/webfonts/fa-regular-400.woff2"
download_file "$font_awesome_url" "libs/fonts/fa-regular-400.woff2"

# Create a custom CSS file to fix font loading
echo -e "${BLUE}Creating custom Font Awesome CSS file...${NC}"
cat > "css/fontawesome-local.css" << EOL
@font-face {
  font-family: 'Font Awesome 6 Free';
  font-style: normal;
  font-weight: 900;
  src: url("../libs/fonts/fa-solid-900.woff2") format("woff2");
}

@font-face {
  font-family: 'Font Awesome 6 Brands';
  font-style: normal;
  font-weight: 400;
  src: url("../libs/fonts/fa-brands-400.woff2") format("woff2");
}

@font-face {
  font-family: 'Font Awesome 6 Free';
  font-style: normal;
  font-weight: 400;
  src: url("../libs/fonts/fa-regular-400.woff2") format("woff2");
}
EOL

# Create a custom particles.js configuration
echo -e "${BLUE}Creating particles.js configuration...${NC}"
mkdir -p js/config
cat > "js/config/particles-config.js" << EOL
// Particles.js configuration for the background effect
particlesJS('particles-js', {
  "particles": {
    "number": {
      "value": 80,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": "#0078d4"
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
      "polygon": {
        "nb_sides": 5
      }
    },
    "opacity": {
      "value": 0.5,
      "random": false,
      "anim": {
        "enable": false,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 3,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 40,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": "#0078d4",
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 2,
      "direction": "none",
      "random": false,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "repulse"
      },
      "onclick": {
        "enable": true,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 400,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 400,
        "size": 40,
        "duration": 2,
        "opacity": 8,
        "speed": 3
      },
      "repulse": {
        "distance": 100,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
});
EOL

# Update the index.html file to include the new libraries
echo -e "${BLUE}Updating index.html to include new libraries...${NC}"
sed -i.bak 's|<script src="libs/js/chart.min.js"></script>|<script src="libs/js/chart.umd.min.js"></script>|g' index.html
sed -i.bak 's|<script src="libs/js/d3.min.js"></script>|<script src="libs/js/d3.min.js"></script>\n    <script src="libs/js/apexcharts.min.js"></script>|g' index.html
sed -i.bak 's|<script src="libs/js/particles.min.js"></script>|<script src="libs/js/particles.min.js"></script>\n    <script src="js/config/particles-config.js"></script>|g' index.html
sed -i.bak 's|<script src="libs/js/countUp.min.js"></script>|<script src="libs/js/countUp.min.js"></script>\n    <script src="libs/js/anime.min.js"></script>\n    <script src="libs/js/tippy.umd.min.js"></script>\n    <script src="libs/js/popper.min.js"></script>|g' index.html

# Add jQuery if it's not already included
if ! grep -q 'jquery.min.js' index.html; then
  sed -i.bak 's|<script src="libs/js/particles.min.js"></script>|<script src="libs/js/jquery.min.js"></script>\n    <script src="libs/js/particles.min.js"></script>|g' index.html
fi

# Create directory for new components
mkdir -p js/components/multi-vendor
mkdir -p js/data/vendors
mkdir -p js/visualizations
mkdir -p css/components

echo -e "${GREEN}Library update completed successfully!${NC}"
