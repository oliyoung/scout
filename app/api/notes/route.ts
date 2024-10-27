import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

const GET = async () => {
    const notes = await prisma.note.findMany();
    return NextResponse.json(notes)
}

const POST = async (request: Request) => {
    const { playerId, reportId, body } = await request.json();
    await prisma.note.create({
        data: { playerId, reportId, body }
    })
    const notes = await prisma.note.findMany();
    return NextResponse.json(notes)
}

export { GET, POST }