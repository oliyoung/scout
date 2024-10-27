import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const GET = async (request: Request) => {
    const { userId, getToken } = await auth()

    if (!userId) {
        return new Response('User is not signed in.', { status: 401 })
    }
    const token = getToken()
    console.log({ userId, token })
    return NextResponse.json([])
    // const reports = await prisma.report.findMany({
    //     where: { userId }
    // });
    // return NextResponse.json([reports])
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
