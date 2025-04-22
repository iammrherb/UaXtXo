#!/bin/bash
#!/bin/bash
# Script to download vendor logos

echo "Downloading vendor logos..."
mkdir -p img

# Try to download vendor logos - using curl to fetch them from well-known sources
echo "Downloading Cisco logo..."
curl -s -o img/cisco-logo.png "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Cisco_logo_blue_2016.svg/1200px-Cisco_logo_blue_2016.svg.png" || \
curl -s -o img/cisco-logo.png "https://cdn.worldvectorlogo.com/logos/cisco-2.svg" || \
echo "Failed to download Cisco logo"

echo "Downloading Aruba logo..."
curl -s -o img/aruba-logo.png "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Aruba_networks_logo.svg/1200px-Aruba_networks_logo.svg.png" || \
curl -s -o img/aruba-logo.png "https://cdn.worldvectorlogo.com/logos/aruba-networks.svg" || \
echo "Failed to download Aruba logo"

echo "Downloading Forescout logo..."
curl -s -o img/forescout-logo.png "https://www.forescout.com/wp-content/uploads/2022/06/Forescout-Horizontal-Full-Color-Logo-with-Safe-Area@3x-e1644255614559.png" || \
curl -s -o img/forescout-logo.png "https://cdn.worldvectorlogo.com/logos/forescout.svg" || \
echo "Failed to download Forescout logo"

echo "Downloading Microsoft logo..."
curl -s -o img/microsoft-logo.png "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2048px-Microsoft_logo.svg.png" || \
curl -s -o img/microsoft-logo.png "https://cdn.worldvectorlogo.com/logos/microsoft-5.svg" || \
echo "Failed to download Microsoft logo"

echo "Downloading Portnox logo..."
curl -s -o img/portnox-logo.png "https://www.portnox.com/wp-content/uploads/2022/06/Portnox-Logo-Horizontal-2-1024x137.png" || \
curl -s -o img/portnox-logo.png "https://cdn.worldvectorlogo.com/logos/portnox.svg" || \
echo "Failed to download Portnox logo"

# Create placeholder logos if downloads failed
for vendor in cisco aruba forescout microsoft portnox; do
  if [ ! -s "img/${vendor}-logo.png" ]; then
    echo "Creating placeholder for ${vendor} logo..."
    # Create a simple placeholder image with the vendor name
    convert -size 200x50 -background white -fill black -gravity center label:"${vendor^}" "img/${vendor}-logo.png" 2>/dev/null || \
    echo "ERROR: Could not create placeholder logo. Please make sure ImageMagick is installed or manually add logo images to the img/ directory."
  fi
done

echo "Vendor logos processing completed."
