import Bid from "../models/Bid.js";
import Gig from "../models/Gig.js";
import mongoose from "mongoose";

export const submitBid = async (req, res) => {
  try {
    const { gigId, message, price } = req.body;

    if (!gigId || !message || !price) {
      return res.status(400).json({ message: "All fields required" });
    }

    const gig = await Gig.findById(gigId);
    if (!gig || gig.status !== "open") {
      return res.status(400).json({ message: "Gig not open for bidding" });
    }

    if (gig.ownerId.toString() === req.user.id) {
      return res.status(403).json({ message: "Cannot bid on your own gig" });
    }

    const bid = await Bid.create({
      gigId,
      freelancerId: req.user.id,
      message,
      price,
    });

    res.status(201).json(bid);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: "Already bid on this gig" });
    }
    res.status(500).json({ message: "Server error" });
  }
};
export const getBidsForGig = async (req, res) => {
  try {
    const { gigId } = req.params;

    const gig = await Gig.findById(gigId);
    if (!gig) {
      return res.status(404).json({ message: "Gig not found" });
    }

    if (gig.ownerId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const bids = await Bid.find({ gigId }).populate(
      "freelancerId",
      "name email"
    );

    res.json(bids);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
export const getMyBids = async (req, res) => {
  try {
    const bids = await Bid.find({ freelancerId: req.user.id })
      .populate("gigId", "title");

    res.json(bids);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const hireBid = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { bidId } = req.params;

    // 1. Fetch bid
    const bid = await Bid.findById(bidId).session(session);
    if (!bid) {
      throw new Error("Bid not found");
    }

    // 2. Fetch gig
    const gig = await Gig.findById(bid.gigId).session(session);
    if (!gig) {
      throw new Error("Gig not found");
    }

    // 3. Authorization: only owner can hire
    if (gig.ownerId.toString() !== req.user.id) {
      throw new Error("Not authorized to hire");
    }

    // 4. Prevent double hiring
    if (gig.status !== "open") {
      throw new Error("Gig already assigned");
    }

    // 5. Assign gig
    gig.status = "assigned";
    await gig.save({ session });

    // 6. Hire selected bid
    bid.status = "hired";
    await bid.save({ session });

    // 7. Reject all other bids
    await Bid.updateMany(
      { gigId: gig._id, _id: { $ne: bid._id } },
      { status: "rejected" },
      { session }
    );

    // 8. Commit
    await session.commitTransaction();
    session.endSession();

    res.json({ message: "Freelancer hired successfully" });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();

    res.status(400).json({ message: err.message });
  }
};
