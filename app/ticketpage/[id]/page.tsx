"use client";
import TicketForm, { existingTicket } from "@/app/(component)/TicketForm";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function TicketPage() {
  const { id } = useParams();

  const ticketData: existingTicket = {
    title: "",
    description: "",
    priority: 1,
    progress: 0,
    status: "not started",
    category: "Hardware Problem",
    _id: "",
    updatedAt: "",
    createdAt: "",
  };

  const isEditMode = id === "new" ? false : true;

  const [ticketInfo, setTicketInfo] = useState(ticketData);

  const getTicketById = async (id: string | string[] | undefined) => {
    try {
      return await axios.get(`/api/ticket/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async () => {
    if (isEditMode) {
      const res = await getTicketById(id);
      setTicketInfo(res?.data.tickets);
    } else {
      setTicketInfo((prev) => ({ ...prev, _id: "new" }));
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <div>
      <TicketForm ticket={ticketInfo} />
    </div>
  );
}

export default TicketPage;
