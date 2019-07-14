require("dotenv").config();
const tmi = require("tmi.js");
const axios = require("axios");
const path = require("path");

const datafile = path.join(__dirname, "banlist.json");
const options = require("./options");
const utils = require("./utils");

const helpMessage =
  "Commands list:  !newsession initializes a new banlist file. !cut <username> <reason> to ban a user and add to the list. !freedom will unban everyone on the list.";

const client = new tmi.client(options);
client.connect();

// connection message/setup
client.on("connected", (address, port) => {
  if (options.announce.connect) {
    client
      .action(options.channels[0], "SKS_BanBot v1.0 ::: Now Online")
      .then(utils.sleeper(3000))
      .then(() => {
        client.action(options.channels[0], "Mods can type !banbot-help to get commands.");
      })
      .catch(e => {
        console.log("error: ", e);
      });
  }
});
//---- end connection message ----

// handle chat interactions
client.on("chat", (channel, user, message, self) => {
  // get broadcaster name here by removing # from the channel name, since they aren't usually listed as mods
  const channelName = channel.replace(/^#/, "");

  // convert to lowercase and split line into array (for parameter usage)
  const msgArray = message.toLowerCase().split(" ");

  // moderator commands list
  // (some dirty promise solutions, but they work. will probably clean up eventually.)
  if (user.mod || user.username === channelName) {
    switch (msgArray[0]) {
      case "!banbot-help":
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

      case "!cut":
        let reason = msgArray.slice(2).join(" ");
        const user = msgArray[1];
        utils
          .addBannedUser(user, datafile)
          .then(
            () => {
              const reasonMsg = reason === "" ? "(no reason)" : reason;
              client.action(channelName, `@${user} is OUT! Reason: ${reasonMsg}`);
            },
            e => {
              console.log("Rejected promise:", e);
              client.action(channelName, `@${user} is already on the ban list.`);
            }
          )
          .then(
            () => {
              client.ban(channelName, user, reason);
            },
            e => console.log("Caught error here:", e)
          )
          .catch(e => {
            console.log("Error banning user: ", e);
          });
        break;

      case "!freedom":
        utils
          .unbanEveryone(datafile, client, channelName)
          .then(() => {
            client.action(channelName, "All bans are lifted... FREEDOM!");
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
