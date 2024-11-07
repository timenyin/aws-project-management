import { Router } from "express";
import { getUsers } from "../controllers/userController";


const router = Router();

// router for GET the Data
router.get("/", getUsers);

export default router;