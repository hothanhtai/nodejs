const express = require("express");
const router = express.Router();

const courseController = require("../app/controllers/CoursesController");

//courseController.show
router.get("/create", courseController.create);
router.post("/store", courseController.store);
router.get("/checkout/:slug", courseController.checkout);
router.get("/:slug", courseController.show);
router.post("/handle-form-actions",courseController.handleFormActions)
router.post("/handle-form-restore-actions",courseController.handleFormRestoreActions)
router.put("/:id", courseController.update);
router.patch("/:id/restore", courseController.restore);
router.delete("/:id", courseController.delete);
router.delete("/:id/force", courseController.forceDelete);
router.get("/:id/edit", courseController.edit);

module.exports = router;
