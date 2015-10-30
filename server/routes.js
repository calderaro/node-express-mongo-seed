"use strict";
let router = require("express").Router();
let ctrls = require("./controllers/");

router.get("/", (req, res) => res.render("index"));
router.get("/traders", ctrls.tradersCtrl.list);
router.post("/traders", ctrls.tradersCtrl.create);
router.put("/traders/:id", ctrls.tradersCtrl.edit);
router.delete("/traders/:id", ctrls.tradersCtrl.delete);

router.post("/users", ctrls.usersCtrl.create);
module.exports = router;