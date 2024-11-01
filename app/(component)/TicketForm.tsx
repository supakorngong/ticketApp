"use client";
import axios from "axios";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

export interface existingTicket {
  title: string;
  _id: string;
  priority: number;
  description: string;
  createdAt: string;
  updatedAt: string;
  progress: number;
  status: string;
  category: string;
}

function TicketForm({ ticket }: { ticket: existingTicket }) {
  const router = useRouter();

  const startingTicketData = {
    title: "",
    description: "",
    priority: 1,
    progress: 0,
    status: "not started",
    category: "Hardware Problem",
  };

  const [formData, setFormData] = useState(startingTicketData);

  const isEditMode = ticket._id === "new" ? false : true;

  useEffect(() => {
    if (isEditMode && ticket._id) {
      setFormData(ticket); // Set form data only once when ticket is available
    }
  }, [ticket, isEditMode]); // Only update when `ticket` or `isEditMode` changes

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = !isEditMode ? await axios.post("/api/ticket", formData) : await axios.patch(`/api/ticket/${ticket._id}`, formData);
      setFormData(startingTicketData);
      router.push("/");
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    ticket._id && (
      <div className="flex justify-center">
        <form className="flex flex-col gap-3 w-1/2" onSubmit={handleSubmit}>
          <h3>{isEditMode ? "Edit Your Ticket" : "Create New Ticket"}</h3>
          <label htmlFor="title">Title</label>
          <input type="text" name="title" id="title" onChange={handleChange} required={true} value={formData.title} />
          <label htmlFor="description">Description</label>
          <textarea name="description" id="description" onChange={handleChange} required={true} value={formData.description} rows={5} />
          <label>Category</label>
          <select name="category" value={formData.category} onChange={handleChange}>
            <option value="hardware pb">hardware pb</option>
            <option value="software pb">software pb</option>
            <option value="pj">pj</option>
          </select>
          <label>Priority</label>
          <div>
            <input type="radio" name="priority" id="priority-1" value={1} onChange={handleChange} checked={formData.priority == 1} />
            <label>1</label>
            <input type="radio" name="priority" id="priority-2" value={2} onChange={handleChange} checked={formData.priority == 2} />
            <label>2</label>
            <input type="radio" name="priority" id="priority-3" value={3} onChange={handleChange} checked={formData.priority == 3} />
            <label>3</label>
            <input type="radio" name="priority" id="priority-4" value={4} onChange={handleChange} checked={formData.priority == 4} />
            <label>4</label>
            <input type="radio" name="priority" id="priority-5" value={5} onChange={handleChange} checked={formData.priority == 5} />
            <label>5</label>
          </div>
          <label>Progress</label>
          <input type="range" name="progress" id="progress" max={100} min={0} onChange={handleChange} value={formData.progress} />
          <label>status</label>
          <select name="status" id="status" onChange={handleChange}>
            <option value="Not Started">Not Started</option>
            <option value="Started">Started</option>
            <option value="Done">Done</option>
          </select>
          <input type="submit" className="btn " value={isEditMode ? "Save Change" : "Create Ticket"} />
        </form>
      </div>
    )
  );
}

export default TicketForm;
