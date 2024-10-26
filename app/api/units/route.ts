import { NextResponse } from "next/server";
import db from "@/db/drizzle";
import { units } from "@/db/schema";
import { isAdmin } from "@/lib/admin";

// Serialization helper function
const serializeObject = (obj: any) => {
  try {
    return JSON.parse(JSON.stringify(obj));
  } catch (error) {
    console.error('Serialization error:', error);
    throw new Error('Data is not serializable');
  }
};

export const GET = async () => {
  if (!isAdmin()) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const data = await db.query.units.findMany();
    // Serialize the data before returning
    const serializedData = serializeObject(data);
    return NextResponse.json(serializedData);
  } catch (error) {
    // Log the error and return a 500 response
    console.error('Error fetching units:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
};

export const POST = async (req: Request) => {
  if (!isAdmin()) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const body = await req.json();
    const data = await db.insert(units).values({
      ...body,
    }).returning();

    // Serialize the data before returning
    const serializedData = serializeObject(data[0]);
    return NextResponse.json(serializedData);
  } catch (error) {
    // Log the error and return a 500 response
    console.error('Error inserting unit:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
};
