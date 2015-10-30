"use strict";
let router = require("express").Router();
let ctrls = require("./controllers/");

router.get("/", (req, res) => res.render("index"));
router.post("/login", ctrls.authenticationCtrl.login);

router.get("/users", ctrls.authenticationCtrl.authorize, ctrls.usersCtrl.list);
router.post("/users", ctrls.authenticationCtrl.authorize, ctrls.usersCtrl.create);

router.get("/maps",  ctrls.authenticationCtrl.authorize, ctrls.mapsCtrl.list);
router.post("/maps", ctrls.authenticationCtrl.authorize, ctrls.mapsCtrl.create);

module.exports = router;