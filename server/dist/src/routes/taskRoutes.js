"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const taskController_1 = require("../controllers/taskController");
const router = (0, express_1.Router)();
// router for GET the Data
router.get("/", taskController_1.getTasks);
// router to create tasks 
router.post("/", taskController_1.createTask);
// router to Update tasks 
router.patch("/:taskId/status", taskController_1.updateTaskStatus);
// -- router to get users
router.get("/user/:userId", taskController_1.getUserTasks);
exports.default = router;
