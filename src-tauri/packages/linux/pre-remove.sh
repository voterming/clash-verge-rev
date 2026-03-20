#!/bin/bash
<<<<<<< HEAD
/usr/bin/clash-verge-service-uninstall

. /etc/os-release

if [ "$ID" = "deepin" ]; then
    if [ -f "/usr/share/applications/clash-verge.desktop" ]; then
        echo "Removing deepin desktop file"
        rm -vf "/usr/share/applications/clash-verge.desktop"
    fi
fi

=======
/usr/bin/uninstall-service
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
