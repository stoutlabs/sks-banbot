# SourKoolAidShow - Ban Run Bot

[![nodejs](https://img.shields.io/badge/node.js-8.5.0-brightgreen.svg?style=flat-square)](https://nodejs.org/en/)
[![Donate](https://img.shields.io/badge/paypal-donate-yellow.svg?style=flat-square)](https://paypal.me/stoutlabs/5.00)

A Twitch chat bot to help automate the "ban runs" in the SourKoolAidShow's Souls/Borne games. **_STRENGTH AND HONOR._**

### Requirements

1.  Node.js (version 8.5.0 or higher) installed on your computer. [Get Node.js Here](https://nodejs.org/en/download/)
2.  [A twitch account for your new bot.](https://twitch.tv/)
3.  The twitch oauth token for your bot's account. [Get one here](https://twitchapps.com/tmi/)

### Installation Instructions (Hosting on your machine)

1.  Install Node.js on your machine, if not installed already. (It's small and lightweight, it'll run on a potato!)
2.  Clone this git repo into a directory of your choice
3.  Open the 'sample.env' file, and edit the values for your bot.
4.  Rename the 'sample.env' file to just '.env'
5.  Open a command prompt in the directory (In Windows, right click and select "open command prompt here")
6.  At the prompt, type: npm install (This installs all the necessary packages)
7.  Your bot is now ready to be run! (Note: You only have to do these steps once.)

### Installation Instructions (Hosted Server)

(Contact me for help. I will charge a small hourly rate for this service and/or host it for you.)

### Usage

* Running the bot is easy! Open a command prompt from the directory your bot's file are in, and type: npm start
* To start a new "banned users" file, type !newsession
* To add a new ban, type: !execute (username) (reason message here) (example: !execute a_big_sandwich Sandwich was moldy.)
* To free everyone, type: !freedom
* To display these commands in chat, type: !bot-help
* Note: To disable the message when connecting to the channel, just edit the options.js file under announce.connect. (Set to false)

### Special Thanks

* This was made SO much easier thanks to the folks that made the [tmi.js](https://github.com/tmijs/tmi.js) package.
