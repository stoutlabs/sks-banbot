require("dotenv").config();
const tmi = require("tmi.js");
const axios = require("axios");
const path = require("path");

const utils = require("./utils");

const options = require("./options");
const datafile = path.join(__dirname, "banlist.json");
const helpMessage =
  "Commands list:  !newsession initializes a new banlist file. !execute <username> <reason> to ban a user and add to the list. !freedom will unban everyone on the list.";

const client = new tmi.client(options);
client.connect();

//connection message/setup
client.on("connected", (address, port) => {
  if (options.announce.connect) {
    client
      .action(options.channels[0], "SKS_Executioner v1.0 ::: Now Online")
      .then(utils.sleeper(2000))
      .then(() => {
        client.action(options.channels[0], "Mods can type !bot-help to get commands.");
      })
      .catch(e => {
        console.log("error: ", e);
      });
  }
});
//---- end connection message ----

//handle chat interactions
client.on("chat", (channel, user, message, self) => {
  //ignore self here?

  //get broadcaster name here by removing # from the channel name, since they aren't usually listed as mods
  const channelName = channel.replace(/^#/, "");

  //convert to lowercase and split line into array (for parameter usage)
  const msgArray = message.toLowerCase().split(" ");

  //moderator commands list
  if (user.mod || user.username === channelName) {
    switch (msgArray[0]) {
      case "!bot-help":
        client.action(channelName, helpMessage);
        break;

      case "!newsession":
        utils
          .initializeFile(datafile)
          .then(() => {
            client.action(channelName, "Ban list created. Ready to go!");
          })
          .catch(e => {
            console.log("error initializing file: ", e);
          });
        break;

      case "!execute":
        const reason = msgArray.slice(2).join(" ");
        const user = msgArray[1];
        utils
          .addBannedUser(user, datafile)
          .then(() => {
            client.action(channelName, `@${user} has been banned. Reason: ${reason}`);
          })
          .then(() => {
            client.ban(channelName, user, reason);
          })
          .catch(e => {
            console.log("error banning user: ", e);
          });
        break;

      case "!freedom":
        utils
          .unbanEveryone(datafile, client, channelName)
          .then(() => {
            client.action(channelName, "All bans are lifted... freedom!");
          })
          .then(() => {
            utils.initializeFile(datafile);
          })
          .catch(e => {
            console.log("error unbanning everyone: ", e);
          });
        break;
    }
  }
});
