import { Router } from "express";
import { createTask, getTasks, getUserTasks, updateTaskStatus } from "../controllers/taskController";


const router = Router();

// router for GET the Data
router.get("/", getTasks);

// router to create tasks 
router.post("/", createTask);

// router to Update tasks 
router.patch("/:taskId/status", updateTaskStatus);

// -- router to get users

router.get("/user/:userId", getUserTasks)
export default router;
