/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();
  const [myGigs, setMyGigs] = useState([]);
  const [myBids, setMyBids] = useState([]);

  useEffect(() => {
    api.get("/gigs?mine=true").then((res) => setMyGigs(res.data));
    api.get("/bids?mine=true").then((res) => setMyBids(res.data));
  }, []);

  return (
    <div className="max-w-5xl mx-auto mt-6 space-y-6">
      <h2 className="text-xl font-bold">My Gigs</h2>

      {myGigs.map((g) => (
        <p key={g._id}>
          <a href={`/gigs/${g._id}`} className="text-blue-600 underline">
            {g.title}
          </a>
        </p>
      ))}

      <h2 className="text-xl font-bold">My Bids</h2>
      {myBids.map(b => (
  <p key={b._id}>
    {b.gigId ? b.gigId.title : "Gig no longer available"} – {b.status}
  </p>
))}

    </div>
  );
}
