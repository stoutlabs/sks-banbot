const options = {
  options: {
    debug: true
  },
  connection: {
    cluster: "aws",
    reconnect: true
  },
  identity: {
    username: process.env.MB_TWITCH_USERNAME,
    password: process.env.MB_TWITCH_AUTH
  },
  channels: [process.env.MB_TWITCH_CHANNEL],
  client_id: process.env.MB_TWITCH_CLIENTID,
  announce: {
    connect: true
  }
};

module.exports = options;
