import express from "express";
import { createGig, getGigs,getGigById } from "../controllers/gigController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createGig);
router.get("/", getGigs);
router.get("/:gigId", getGigById);

export default router;
