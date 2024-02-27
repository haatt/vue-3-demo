module.exports = {
  devServer: {
    allowedHosts: "all",
    client: {
      webSocketURL: {
        port: 443,
        protocol: "wss",
      },
    },
  },
  pages: {
    index: {
      entry: "src/main.ts",
      template: "public/index.html",
      filename: "index.html",
    },
  },
};
