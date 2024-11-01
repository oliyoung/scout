import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

const GET = async (
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) => {

    const { id } = await params
    const reports = await prisma.report.findFirstOrThrow({
        where: { userId, id: Number(id) }
    })
    return NextResponse.json(reports)
}

export { GET }