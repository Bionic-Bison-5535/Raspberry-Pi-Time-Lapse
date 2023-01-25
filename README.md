# Raspberry Pi Time-Lapse
This code enables a raspberry pi (with a Raspberry Pi Camera attached) to take a picture every 30 seconds while robotics practice is going on at the New Buffalo Steam building.  This code enables a raspberry pi (with a Raspberry Pi Camera attached) to take a picture every 30 seconds while robotics practice is going on at the New Buffalo Steam building.  Videos are generated from pictures after they are recorded and can be accessed wirelessly by using the Raspberry Pi's IP address.  There is no need for Ethernet, SSH, or even a monitor after the code has been installed in the raspberry pi.

To use, follow these steps:
 - Download index.html and server.js to the directory `/home/pi`.
 - Install node.js on your raspberry pi.
 - Paste the code from `crontab.txt` into your raspberry pi's crontab.
 - Ensure that your camera is connected to the camera port on the pi.
 - Reboot your Pi.

More detailed instructions on how to use this repository will be provided later on.  :)
