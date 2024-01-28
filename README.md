# Raspberry Pi Time-Lapse
This code enables a Raspberry Pi circuit board (with a Raspberry Pi Cam attached) to take a picture each minute robotics practice is going on at the New Buffalo STEAM building.  By using the Raspberry Pi's local IPv4 address on port `8000`, you can access any photos that have been taken and even watch a video of any day's time-lapse.

## Setup

To set up this code to run on any Raspberry Pi with a Raspberry Pi Cam, simply follow the following steps:
1. Enter the following into the Raspberry Pi's terminal, one line at a time:
   ```
   sudo apt-get update
   sudo apt-get dist-upgrade
   curl -sL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt-get install -y nodejs
   npm install shelljs
   ```
   This will install node.js and shell.js, which are both absolutely necessary sofwares for this time-lapse system to function.
2. Now enable your camera by entering:
   ```
   sudo raspi-config
   ```
   And then selecting `Interfacing Options` with the up/down arrow keys and the enter key.  You will see an option that says something about a camera, which may differ depending on what OS version you are using.  Select the camera-related option and ensure that the camera is enabled.  When you are prompted to reboot the Pi, select "Yes".  If you are not prompted to reboot the Pi, reboot the Pi anyway.
3. When your Pi turns back on, open the terminal again and enter:
   ```
   git clone https://github.com/Bionic-Bison-5535/Raspberry-Pi-Time-Lapse.git
   ```
   This will download this repository to your Pi.
4. Enter `ifconfig` into the terminal and look for your IPv4 address in the mess of numbers.  It will look something like `192.168.1.82` and will probably start with `192.168` if you are using a home network and `10.10` if you are using public wifi.  Write down your IPv4 address somewhere (or memorise it).  Note that before performing this step it is absolutely necessary that you connect your Pi to wifi or ethernet.
5. Type `crontab -e` and press enter.  If you are prompted to choose an editor, choose nano.  At the bottom of the document that will open, make a new line and type:
   ```
   @reboot node /home/pi/Raspberry-Pi-Time-Lapse/server.js
   ```
   Please notice that if your username is not "pi" you should replace the "pi" in "/home/pi" with your username.
   Press `CTRL+o` and then `Enter` and then `CTRL+x`.  This will save the crontab programming, which will run your time-lapse system whenever you turn your Pi on.
6. Open `server.js` with Text Editor and change "BisonPi" in [line 5](https://github.com/Bionic-Bison-5535/Raspberry-Pi-Time-Lapse/blob/main/server.js#L5) to whatever your username is.  It is, by default, `pi`, unless you have changed it.  Save the file with `CTRL+s`; then reboot your Pi again.
7. When your Pi finishes turning on, open a web browser such as Chrome in a device connected to the same wifi network and enter in the URL bar your IPv4 address and then an immediate `:8000`.  So, the URL should be something like this:
   ```
   http://192.168.1.82:8000
   ```
   The timelapse page should now load.
