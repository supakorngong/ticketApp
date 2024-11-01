import Ticket from "@/app/(model)/ticket";
import { connectDb } from "@/app/lib/mongoDb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDb();
    const body = await req.json();
    await Ticket.create(body);
    return NextResponse.json({ message: "Ticket Created" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDb();
    const res = await Ticket.find();
    return NextResponse.json({ tickets: res }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
