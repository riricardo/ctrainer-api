const asyncHandler = require("../../shared/utils/asyncHandler");
const httpStatus = require("../../shared/http/http-status");

const buildAuthController = () => ({
  me: asyncHandler(async (req, res) => {
    res.status(httpStatus.ok).json({ data: req.auth || null });
  }),
});

module.exports = buildAuthController;
