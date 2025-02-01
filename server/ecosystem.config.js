const { env } = require("process");

module.exports = {
  apps: [
    {
      name: "Project Manager",
      script: "npm",
      args: "run dev",
      env: {
        NODE_ENV: "development",
      },
    },
  ],
};
