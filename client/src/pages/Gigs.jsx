import { useEffect, useState } from "react";
import api from "../api/axios";
import GigCard from "../components/GigCard";

export default function Gigs() {
  const [gigs, setGigs] = useState([]);

  useEffect(() => {
    api.get("/gigs").then(res => setGigs(res.data));
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-6 space-y-4">
      {gigs.map(g => <GigCard key={g._id} gig={g} />)}
    </div>
  );
}
