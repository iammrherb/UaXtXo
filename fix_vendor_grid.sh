#!/bin/bash

# Fix line 2567 and complete the method
sed -i '2567c\            const isPortnox = vendorId === "portnox";\
            return `\
                <div class="vendor-select-card ${isSelected ? "selected" : ""}" data-vendor="${vendorId}">\
                    <img src="${vendor.logo}" alt="${vendor.name}" class="vendor-logo-sm">\
                    <div class="vendor-name-sm">${vendor.shortName}</div>\
                    ${isPortnox ? "<span class=\"recommended-badge\">Recommended</span>" : ""}\
                </div>\
            `;\
        }).join("");\
    }' js/views/zero-trust-executive-platform.js
