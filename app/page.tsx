"use client";
import axios from "axios";
import TicketCard from "./(component)/TicketCard";
import { useEffect, useState } from "react";

export interface Ticket {
  title: string;
  _id: string;
  priority: number;
  description: string;
  createdAt: string;
  updatedAt: string;
  progress: number;
  status: string;
  category?: string;
  fetchTicket: () => Promise<void>;
}

export default function DashBoard() {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  const fetchTickets = async () => {
    try {
      const res = await axios.get("/api/ticket");
      const allTicket = res.data.tickets;
      setTickets(allTicket);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const uniqueCategory = [...new Set(tickets?.map(({ category }) => category))];

  return (
    <div className="p-5">
      <div>
        {tickets &&
          uniqueCategory?.map((category, categoryIndex) => (
            <div className="mb-3" key={categoryIndex}>
              <h3>{category}</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {tickets
                  .filter((el) => el.category == category)
                  .map((items, index) => {
                    return (
                      <TicketCard
                        key={items?._id || index}
                        priority={items?.priority}
                        description={items?.description}
                        title={items?.title}
                        updatedAt={items?.updatedAt}
                        createdAt={items?.createdAt}
                        progress={items?.progress}
                        status={items?.status}
                        _id={items?._id}
                        fetchTicket={fetchTickets}
                      />
                    );
                  })}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
