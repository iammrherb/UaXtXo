#!/bin/bash
# Create placeholder vendor logos
echo "Creating vendor logo placeholders..."

# You should replace these with actual vendor logos
vendors=("portnox" "cisco" "aruba" "forescout" "extreme" "arista" "juniper" "fortinet" "microsoft" "packetfence" "foxpass" "securew2" "cloudradius")

for vendor in "${vendors[@]}"; do
    echo "Add ${vendor}.png logo to img/vendors/"
done
