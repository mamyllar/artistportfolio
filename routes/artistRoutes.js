"use strict";

const router = require("express").Router(),
  artistsController = require("../controllers/artistsController");

router.get("/", artistsController.index, artistsController.indexView);
router.get("/new", artistsController.new);
router.post(
  "/create",
  artistsController.validate,
  artistsController.create,
  artistsController.redirectView
);
router.get("/login", artistsController.login);
router.post("/login", artistsController.authenticate);
router.get("/logout", artistsController.logout, artistsController.redirectView);
router.get("/:id/edit", artistsController.edit);
router.put("/:id/update", artistsController.update, artistsController.redirectView);
router.get("/:id", artistsController.show, artistsController.showView);
router.delete("/:id/delete", artistsController.delete, artistsController.redirectView);

module.exports = router;