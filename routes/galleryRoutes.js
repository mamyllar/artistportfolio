"use strict";

const router = require("express").Router(),
  galleriesController = require("../controllers/galleriesController");

router.get("", galleriesController.index, galleriesController.indexView);
router.get("/new", galleriesController.new);
router.post("/create", galleriesController.create, galleriesController.redirectView);
router.get("/:id/edit", galleriesController.edit);
router.put("/:id/update", galleriesController.update, galleriesController.redirectView);
router.get("/:id", galleriesController.show, galleriesController.showView);
router.delete("/:id/delete", galleriesController.delete, galleriesController.redirectView);

module.exports = router;