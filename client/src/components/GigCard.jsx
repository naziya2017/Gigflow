import { Link } from "react-router-dom";

export default function GigCard({ gig }) {
  return (
    <div className="border p-4 rounded">
      <h2 className="text-xl font-bold">{gig.title}</h2>
      <p>{gig.description}</p>
      <p className="text-sm text-gray-600">Budget: ₹{gig.budget}</p>
      <Link
        to={`/gigs/${gig._id}`}
        className="text-blue-600 underline mt-2 inline-block"
      >
        View Details
      </Link>
    </div>
  );
}
