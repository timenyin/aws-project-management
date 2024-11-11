import { Router } from "express";
import { getUsers, postUser } from "../controllers/userController";


const router = Router();

// router for GET the Data
router.get("/", getUsers);
router.post("/", postUser)

export default router;