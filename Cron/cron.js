const cron = require("node-cron");

module.exports = () => {
  // const authHeader = req.get("Authorization");
  console.log("Setting Cron");

  cron.schedule("* * * * *", function () {
    console.log("Running Cron Job Middleware");
  });
};
