import api from "../api/axios";

export default function BidCard({ bid }) {
  const hire = async () => {
    await api.patch(`/bids/${bid._id}/hire`);
    window.location.reload();
  };

  return (
    <div className="border p-3 rounded flex justify-between items-center">
      <div>
        <p className="font-semibold">{bid.freelancerId.name}</p>
        <p>{bid.message}</p>
        <p>₹{bid.price}</p>
        <p>Status: {bid.status}</p>
      </div>

      {bid.status === "pending" && (
        <button
          onClick={hire}
          className="bg-green-600 text-white px-3 py-1"
        >
          Hire
        </button>
      )}
    </div>
  );
}
