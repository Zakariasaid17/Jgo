import db from "@/db/drizzle";
import { challenges } from "@/db/schema";
import { isAdmin } from "@/lib/admin";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

const serializeObject = (obj: any) => {
  try {
    return JSON.parse(JSON.stringify(obj));
  } catch (error) {
    console.error('Serialization error:', error);
    throw new Error('Data is not serializable');
  }
};

export const GET = async (
  req: Request,
  { params }: { params: { challengeId: number } }
) => {
  if (!isAdmin()) {
    return new NextResponse('Unauthorized', { status: 403 });
  }

  try {
    const data = await db.query.challenges.findFirst({
      where: eq(challenges.id, params.challengeId),
    });

    const serializedData = serializeObject(data);
    return NextResponse.json(serializedData);
  } catch (error) {
    console.error('Error fetching challenge:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
};

export const PUT = async (
  req: Request,
  { params }: { params: { challengeId: number } }
) => {
  if (!isAdmin()) {
    return new NextResponse('Unauthorized', { status: 403 });
  }

  try {
    const body = await req.json();

    const data = await db.update(challenges).set({
      ...body,
    }).where(eq(challenges.id, params.challengeId)).returning();

    const serializedData = serializeObject(data[0]);
    return NextResponse.json(serializedData);
  } catch (error) {
    console.error('Error updating challenge:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { challengeId: number } }
) => {
  if (!isAdmin()) {
    return new NextResponse('Unauthorized', { status: 403 });
  }

  try {
    const data = await db.delete(challenges).where(eq(challenges.id, params.challengeId)).returning();

    const serializedData = serializeObject(data[0]);
    return NextResponse.json(serializedData);
  } catch (error) {
    console.error('Error deleting challenge:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
};
