const options = {
  options: {
    debug: false
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
  announce: {
    connect: true
  }
};

module.exports = options;
