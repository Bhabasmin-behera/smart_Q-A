const router = require("express").Router();
const askController = require("../controller/askController");
const auth = require("../middleWare/authMiddleware");
const limiter = require("../middleWare/rateLimiter");

router.post("/", auth, limiter, askController.ask);

module.exports = router;