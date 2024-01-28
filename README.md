# Raspberry Pi Time-Lapse
This code enables a Raspberry Pi circuit board (with a Raspberry Pi Cam attached) to take a picture each minute robotics practice is going on at the New Buffalo STEAM building.  By using the Raspberry Pi's local IPv4 address on port `8000`, you can access any photos that have been taken and even watch a video of any day's time-lapse.

## Setup

To set up this code to run on any Raspberry Pi with a Raspberry Pi Cam, simply follow the following steps:
1. **INSTALL/ENABLE NECESSARY SOFTWARE**<br> Enter the following into the Raspberry Pi's terminal, one line at a time:
   ```
   sudo apt-get update
   sudo apt-get dist-upgrade
   curl -sL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt-get install -y nodejs
   npm install shelljs
   git clone https://github.com/Bionic-Bison-5535/Raspberry-Pi-Time-Lapse.git
   sudo raspi-config nonint do_legacy 0
   ```
   This will install node.js, shell.js, and this repository on your Pi.  It will also enable your Raspberry Pi Cam.
2. **GET IPv4 ADDRESS**<br> Enter `ifconfig` into the terminal and look for your IPv4 address in the mess of numbers.  It should be after `inet` in the `wlan0:` category.  It will look something like `192.168.1.82` and will probably start with `192.168.` if you are using a home network and `10.10.` if you are using public wifi.  Write down your IPv4 address somewhere (or memorise it).  Note that before performing this step it is absolutely necessary that you connect your Pi to wifi.
3. **CRONTAB AUTOSTART**<br> Type `crontab -e` into the terminal and press enter.  If you are prompted to choose an editor, choose nano.  At the bottom of the document that will open, make a new line and type:
   ```
   @reboot node /home/pi/Raspberry-Pi-Time-Lapse/server.js
   ```
   Please notice that if your username is not "pi" you should replace the "pi" in "/home/pi" with your username.
   Press `CTRL+o` and then `Enter` to save, and then `CTRL+x` to exit the nano editor.  Now the time-lapse software will automatically start whenever your Pi turns on.
4. **SET USERNAME**<br> Open `server.js` from the folder `/home/pi/Raspberry-Pi-Time-Lapse/` with Text Editor and change "BisonPi" in [line 5](https://github.com/Bionic-Bison-5535/Raspberry-Pi-Time-Lapse/blob/main/server.js#L5) to whatever your username is.  Unless you have changed it, it should be the default "pi".  Save the file with `CTRL+s`; then reboot your Pi by going back the the terminal and entering `sudo reboot`.
5. **ACCESS USER INTERFACE**<br> When your Pi finishes turning on, open a web browser such as Chrome in a device connected to the same wifi network and enter in the URL bar your IPv4 address and then an immediate `:8000/home`.  So, the URL should look something like this:
   ```
   http://192.168.1.82:8000/home
   ```
   The timelapse page should now load.
   If something isn't working, try making sure that you correctly followed each of the five steps.  If you are unable to figure out what went wrong, please head to the [Help](https://github.com/Bionic-Bison-5535/Raspberry-Pi-Time-Lapse/discussions/2) discussion page in this repository to ask any questions you may have or simply mention what is going wrong.  I will be glad to help.

## Documentation

### To Get a Live Camera View
When you go to the home page at `yourip:8000/home`, the image that loads after approximately five seconds will be a single snapshot that was taken as soon as you accessed the website.  Alternatively, you may go to `yourip:8000/live.jpg` to access the image itself, without the surrounding website.  This image will not be saved.

### To Save a Live Camera View
If you want to save a picture of the current view to access later on, simply add a `?pic` to the end of a URL.  You can access this image later with the "Retrieve Single Image" section on the homepage.

### To Change the Time-Lapse Recording Times
To change when a time-lapse is recorded and/or on what days of the week, simply edit [lines 9-22](https://github.com/Bionic-Bison-5535/Raspberry-Pi-Time-Lapse/discussions/2) in `server.js` in the folder `/home/pi/Raspberry-Pi-Time-Lapse` on the Pi.  Then save it with `CTRL+s` and reboot the Pi.

### To Stop the Time-Lapse Recorder
Add a `?stop` to the end of the URL.  This is useful in our situation if, for example, the robotics season is over until next year and we don't want a bunch of pictures of the vacant STEAM building over the summer.  We can still access previously taken pictures, but more pictures will not be taken until the day we add `?start` to the end of the URL.

### To Wirelessly Reboot the Pi
Add a `?reboot` to the end of the URL.  Be sure to close out of this page immediately or you will get stuck in a reboot loop.  When you go to the URL with `?reboot` at the end, you will recieve no response, so your web browser will keep trying to reload the page.  As soon as the Pi has turned back on, if the page is still open, the web browser's attempts to reload will be sucessful and the Pi will reboot again.  Don't do this.

### To Wirelessly Shut Down the Pi
Add a `?shutdown` to the end of the URL.  If you don't want anyone on the wifi network besides yourself to be able to do this, add a password to line 109 in `server.js` on the Pi and use your password in the URL command.  For example, if your password is "hello1234", add `?shutdownhello1234` to the end of the URL to shut down the Pi.  Note that you will not be able to access any timelapses while the Pi is shut down.  Shutting down the Pi should be exclusively used only before unplugging it.  If you unplug the Pi while it is running, you may damage the SD card and ruin everything on your Pi, so **always shut down the Pi before cutting the power to it**.  (Believe me, I already had to reformat an SD card and loose everything on a Pi after simply unplugging it).

### To Get an Image From a Certain Time on a Certain Day
Go to the home page (`yourip:8000/home`) and choose a date and time from the menu in the "Retrieve Single Image" section.  Then click the "Load Image" button and wait approximately two seconds for the 4K image to load.<br><br>
<img width="457" src="https://github.com/Bionic-Bison-5535/Raspberry-Pi-Time-Lapse/assets/71152561/09eda4f5-6a5d-4d07-9030-ce558a7e9672">  
<img width="512" src="https://github.com/Bionic-Bison-5535/Raspberry-Pi-Time-Lapse/assets/71152561/36f9d860-e501-4c2e-a294-dd3b413b4851">

### To Watch a Timelapse Video
Go to the home page (`yourip:8000/home`) and choose a date, a start time, and an end time from the menu in the "Retrieve Time-lapse Video" section.  Then click the "Load Time-lapse" button.  You will see a loading bar in the lower-right corner of the screen.  The website must retrieve and store all of the images in order to allow the video to play back at a reasonable speed.  By default, the video will play at a rate of 5 minutes per second.  You can use the pause/play button and the video progress slider at the bottom of the screen to control playback, or you can go through the images one at a time with the back/next buttons.<br><br>
<img width="916" alt="Screenshot 2024-01-28 at 2 44 52 PM" src="https://github.com/Bionic-Bison-5535/Raspberry-Pi-Time-Lapse/assets/71152561/cb5e088d-e4ca-4897-90eb-bbfb304dafbe">
