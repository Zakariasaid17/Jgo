import db from "@/db/drizzle";
import { courses } from "@/db/schema";
import { isAdmin } from "@/lib/admin";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

// Serialization helper function
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
  { params }: { params: { courseId: number } }
) => {
  if (!isAdmin()) {
    return new NextResponse('Unauthorized', { status: 403 });
  }

  try {
    const data = await db.query.courses.findFirst({
      where: eq(courses.id, params.courseId),
    });

    // Serialize the data before returning
    const serializedData = serializeObject(data);
    return NextResponse.json(serializedData);
  } catch (error) {
    // Log the error and return a 500 response
    console.error('Error fetching course:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
};

export const PUT = async (
  req: Request,
  { params }: { params: { courseId: number } }
) => {
  if (!isAdmin()) {
    return new NextResponse('Unauthorized', { status: 403 });
  }

  try {
    const body = await req.json();

    const data = await db.update(courses).set({
      ...body,
    }).where(eq(courses.id, params.courseId)).returning();

    // Serialize the data before returning
    const serializedData = serializeObject(data[0]);
    return NextResponse.json(serializedData);
  } catch (error) {
    // Log the error and return a 500 response
    console.error('Error updating course:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { courseId: number } }
) => {
  if (!isAdmin()) {
    return new NextResponse('Unauthorized', { status: 403 });
  }

  try {
    const data = await db.delete(courses).where(eq(courses.id, params.courseId)).returning();

    // Serialize the data before returning
    const serializedData = serializeObject(data[0]);
    return NextResponse.json(serializedData);
  } catch (error) {
    // Log the error and return a 500 response
    console.error('Error deleting course:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
};
