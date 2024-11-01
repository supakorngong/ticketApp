import Ticket from "@/app/(model)/ticket";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const id = (await params).id;
    const res = await Ticket.findOne({ _id: id });
    return NextResponse.json({ tickets: res }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const id = (await params).id;
    if (!id) {
      return NextResponse.json({ message: "ID is required" }, { status: 400 });
    }
    await Ticket.findByIdAndDelete(id);
    return NextResponse.json({ message: "Ticket Delete" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const id = (await params).id;
    if (!id) {
      return NextResponse.json({ message: "ID is required" }, { status: 400 });
    }
    const data = await req.json();

    await Ticket.findByIdAndUpdate(id, { ...data });
    return NextResponse.json({ message: "Ticket update" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
