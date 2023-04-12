const newsRoutes = require("./news");
const meRoutes = require("./me");
const coursesRoutes = require("./courses");
const siteRoutes = require("./site");
function route(app) {
  app.use("/news", newsRoutes);
  app.use("/courses", coursesRoutes);
  app.use("/me", meRoutes);
  app.use("/", siteRoutes);

}

module.exports = route;
