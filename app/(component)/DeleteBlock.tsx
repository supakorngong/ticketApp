"use client";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

import React from "react";

function DeleteBlock({ id, fetchTicket }: { id: string; fetchTicket: () => Promise<void> }) {
  const deleteTicket = async (id: string) => {
    try {
      if (id) {
        const res = await axios.delete(`/api/ticket/${id}`);
        if (res.status === 200) {
          fetchTicket();
        }
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  return <FontAwesomeIcon onClick={() => deleteTicket(id)} icon={faX} className="text-red-500 hover:text-red-200 hover:cursor-pointer" />;
}

export default DeleteBlock;
