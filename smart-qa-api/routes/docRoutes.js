const router = require("express").Router();
const { getDocs } = require("../controller/docController");

router.get("/", getDocs);

module.exports = router;