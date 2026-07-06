const express = require("express");
const router = express.Router();
const userController = require("../../controllers/user");
const authentication = require("../../middlewares/authentication");

router.get("/", authentication, userController.getUser);
router.post("/create", userController.createUser);

module.exports = router;
