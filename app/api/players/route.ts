import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

const GET = async (request: Request) => {
    const players = await prisma.player.findMany();
    return NextResponse.json(players)
}

const POST = async (request: Request) => {
    const { name } = await request.json();
    await prisma.player.create({
        data: { name }
    })
    const players = await prisma.player.findMany();
    return NextResponse.json(players)
}
export { GET, POST }