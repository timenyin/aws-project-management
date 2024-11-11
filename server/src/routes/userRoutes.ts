import { Router } from "express";
import { getUsers, getUser, postUser } from "../controllers/userController";


const router = Router();

// router for GET the Data
router.get("/", getUsers);
router.post("/", postUser);
router.get("/:cognitoId", getUser)

export default router;