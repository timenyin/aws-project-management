import { Router } from "express";
import { createProject, getProjects } from "../controllers/projectController";

const router = Router();

// router for GET the Data
router.get("/", getProjects);

// router for POST the Data
router.post("/", createProject);

export default router;