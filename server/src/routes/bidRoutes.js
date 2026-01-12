import express from "express";
import { submitBid,getBidsForGig,hireBid,getMyBids } from "../controllers/bidController.js";
import authMiddleware from "../middleware/authMiddleware.js";
const router = express.Router();

// Freelancer submits bid
router.post("/", authMiddleware, submitBid);
// Freelancer sees its bids
router.get("/", authMiddleware, getMyBids);

// Gig owner views bids
router.get("/:gigId", authMiddleware, getBidsForGig);

router.patch("/:bidId/hire",authMiddleware,hireBid);
export default router;
