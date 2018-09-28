const fs = require("fs");
const tmi = require("tmi.js");

// ----------------------
// Util functions
// ----------------------

// custom promise-based delay function :)
const sleeper = ms => {
  return x => new Promise(resolve => setTimeout(() => resolve(x), ms));
};

// initialize a blank JSON file, we'll use it for tracking banned users
const initializeFile = datafile => {
  return new Promise((resolve, reject) => {
    const newData = {
      users: []
    };
    fs.writeFileSync(datafile, JSON.stringify(newData));
    resolve(newData);
  });
};

const addBannedUser = (user, datafile) => {
  const curUsersRaw = fs.readFileSync(datafile);
  const curUsers = JSON.parse(curUsersRaw);
  let duplicates = curUsers.users.filter(el => el === user);

  return new Promise((resolve, reject) => {
    if (duplicates.length === 0) {
      curUsers.users.push(user);
      fs.writeFileSync(datafile, JSON.stringify(curUsers));
      resolve("saved!");
    } else {
      reject("Already in ban list.");
    }
  });
};

const unbanEveryone = (datafile, client, channelName) => {
  return new Promise((resolve, reject) => {
    const curUsersRaw = fs.readFileSync(datafile);
    const curUsers = JSON.parse(curUsersRaw);
    let unbannedCount = 0;

    //strip duplicates, in case there are any in the list
    let uniqueUsers = [...new Set(curUsers.users)];

    //calling unban with a 1250ms delay, so we don't flood the Twitch API
    uniqueUsers.forEach((user, index) => {
      setTimeout(() => {
        client
          .unban(channelName, user)
          .then(() => {
            unbannedCount++;
            console.log("unbanned " + user);

            //resolve promise when we're on the last user (so we can finally go to the next .then() in index.js)
            if (unbannedCount === curUsers.users.length) {
              resolve("success!");
            }
          })
          .catch(e => {
            console.log("unbanning error: ", e);
          });
      }, 1250 * index);
    });
  });
};

module.exports = { sleeper, initializeFile, addBannedUser, unbanEveryone };
