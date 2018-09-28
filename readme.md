# SourKoolAidShow - Ban Run Bot

[![nodejs](https://img.shields.io/badge/node.js-8.5.0-brightgreen.svg?style=flat-square)](https://nodejs.org/en/)
[![Donate](https://img.shields.io/badge/paypal-donate-yellow.svg?style=flat-square)](https://paypal.me/stoutlabs/5.00)

A Twitch chat bot to help automate the "ban runs" in the SourKoolAidShow's Souls/Borne games. **_STRENGTH AND HONOR._**

### Requirements

1.  Node.js (version 8.5.0 or higher) installed on your computer. [Get Node.js Here](https://nodejs.org/en/download/)
2.  [A twitch account for your new bot.](https://twitch.tv/) - (Or use an existing Twitch account, of course.)
3.  A twitch oauth token for the account above. Login with that account in a browser, and then [get one here in 5 seconds](https://twitchapps.com/tmi/)
    (Note: this will look like "oauth:" followed by a bunch of letters and numbers. Copy the entire value, including the `oauth:` part.)

### Installation Instructions (Hosting on your machine)

1.  Install Node.js on your machine, if not installed already. (It's small and lightweight, it'll run on a potato!)
2.  Open a command prompt window in a directory where you want to install this bot. (In Windows, right click in the directory and choose `open command prompt here`)
3.  Clone/Download this git repo into a directory of your choice, e.g. in Windows type:
    ```
    git clone git@github.com:stoutlabs/sks-banbot.git banbot-folder-name
    ```
4.  Open the `sample.env` file in your favorite text editor, and edit the values for your bot. (Using the oauth token, channel name, and the bot's twitch account name)
5.  When you're done, save and rename this `sample.env` file to just `.env`
6.  Back at the command prompt, type: `npm install` (This installs all the necessary packages)
7.  Your bot is now ready to be run! (Note: You only have to do these steps once.)

### Usage (Running on Your Machine)

- Running the bot is easy! Open a command prompt from the directory your bot's file are in, and type: `npm start`
- To start a blank "banned users" file, type `!newsession` in the Twitch chat. (_Only do this if you already unbanned everyone from the last time! This allows you to keep the same list in case you have to reboot your PC/lose power/lose connection to Twitch/etc._)
- To add a new ban, type: `!cut (username) (reason message here)` (example: !cut a_big_sandwich Sandwich was moldy.)
- To free everyone, type: `!freedom`
- To display these commands in chat, type: `!banbot-help`
- Note: To disable the message when connecting to the channel, just edit the `options.js` file at this line:
  ```
  announce: {
    connect: true // set to 'false' to hide message
  }
  ```

### Installation Instructions (Hosted Server)

This is super easy to run on your own machine, but it's also super easy to run on a server! The advantage to hosting it on a server is that the 'ban file' will be centralized... and the bot will always be running.

(Contact me if you need help setting this up. I can easily host it for you, or help you get it hosted somewhere for cheap.)

### Special Thanks

- This was made SO much easier thanks to the folks that made the [tmi.js](https://github.com/tmijs/tmi.js) package.
