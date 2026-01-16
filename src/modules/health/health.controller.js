const { getDbHealth } = require("../../infrastructure/db/mongoose");
const httpStatus = require("../../shared/http/http-status");

const buildHealthController = () => ({
  health: (req, res) => {
    const db = getDbHealth();
    const isHealthOk = db.isDbUp;

    const status = isHealthOk ? "ok" : "degraded";
    const code = isHealthOk ? httpStatus.ok : httpStatus.serviceUnavailable;

    res.status(code).json({ status, db });
  },
});

module.exports = buildHealthController;
