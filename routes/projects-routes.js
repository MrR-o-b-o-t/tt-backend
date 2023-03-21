const express = require("express");
const { check } = require("express-validator");

const projectsControllers = require("../controllers/projects-controllers");

const router = express.Router();

router.get("/:pid", projectsControllers.getProjectById);

router.get("/user/:uid", projectsControllers.getProjectsByUserId);

router.post(
  "/",
  projectsControllers.createProject
);

router.patch(
  "/:pid",
  [check("title").not().isEmpty(), check("description").isLength({ min: 5 })],
  projectsControllers.updateProject
);

router.delete("/:pid", projectsControllers.deleteProject);

module.exports = router;
