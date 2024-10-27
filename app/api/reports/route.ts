import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

const GET = async (request: Request) => {
    const userId = Number(request.headers.get('x-user-id'))
    const reports = await prisma.report.findMany({
        where: { userId }
    });
    return NextResponse.json(reports)
}

const POST = async (request: Request) => {
    const { type, userId, reportAt } = await request.json();
    await prisma.report.create({
        data: { type, userId, reportAt }
    })
    const notes = await prisma.report.findMany();
    return NextResponse.json(notes)
}

export { GET, POST }
