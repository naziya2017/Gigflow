import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function CreateGig() {
  const [form, setForm] = useState({ title: "", description: "", budget: "" });
  const navigate = useNavigate();

  const submit = async e => {
    e.preventDefault();
    await api.post("/gigs", form);
    navigate("/");
  };

  return (
    <form onSubmit={submit} className="max-w-md mx-auto mt-10 space-y-3">
      <input className="border p-2 w-full" placeholder="Title"
        onChange={e => setForm({ ...form, title: e.target.value })} />
      <textarea className="border p-2 w-full" placeholder="Description"
        onChange={e => setForm({ ...form, description: e.target.value })} />
      <input className="border p-2 w-full" placeholder="Budget"
        onChange={e => setForm({ ...form, budget: e.target.value })} />
      <button className="bg-black text-white w-full py-2">Create</button>
    </form>
  );
}
