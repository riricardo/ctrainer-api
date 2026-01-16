const { buildContainer } = require("./app/container");
const { createHttpApp } = require("./app/http");

const container = buildContainer();
const app = createHttpApp(container);

module.exports = app;
