import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import BidCard from "../components/BidCard";
import { useAuth } from "../context/AuthContext";

export default function GigDetails() {
  const { gigId } = useParams();
  const { user } = useAuth();

  const [gig, setGig] = useState(null);
  const [bids, setBids] = useState([]);
  const [message, setMessage] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
   api.get(`/gigs/${gigId}`).then(res => setGig(res.data));


    api.get(`/bids/${gigId}`)
      .then(res => setBids(res.data))
      .catch(() => {});
  }, [gigId]);

  const submitBid = async () => {
    await api.post("/bids", { gigId, message, price });
    window.location.reload();
  };

  if (!gig) return null;

const isOwner = user?.id === gig.ownerId.toString();

  return (
    <div className="max-w-3xl mx-auto mt-10 space-y-6">
      <h1 className="text-2xl font-bold">{gig.title}</h1>
      <p>{gig.description}</p>

      {!isOwner && gig.status === "open" && (
        <div className="space-y-2">
          <input
            className="border p-2 w-full"
            placeholder="Message"
            onChange={e => setMessage(e.target.value)}
          />
          <input
            className="border p-2 w-full"
            placeholder="Price"
            onChange={e => setPrice(e.target.value)}
          />
          <button
            onClick={submitBid}
            className="bg-black text-white px-4 py-2"
          >
            Submit Bid
          </button>
        </div>
      )}

      {isOwner && (
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Bids</h2>
          {bids.map(bid => (
            <BidCard key={bid._id} bid={bid} />
          ))}
        </div>
      )}
    </div>
  );
}
