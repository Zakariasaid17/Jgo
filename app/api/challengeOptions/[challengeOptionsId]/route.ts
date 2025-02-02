import db from "@/db/drizzle";
import { challengeOptions } from "@/db/schema";
import { isAdmin } from "@/lib/admin";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

interface ChallengeOption {
  id: number;
  text: string;
  challengeId: number;
  isArabic: boolean;
  correct: boolean;
  imageSrc: string | null;
  audioSrc: string | null;
}

const serializeObject = (obj: Partial<ChallengeOption> | null) => {
  if (!obj) return null;
  
  const sanitized: Partial<ChallengeOption> = {
    id: obj.id,
    text: obj.text,
    challengeId: obj.challengeId,
    isArabic: obj.isArabic,
    correct: obj.correct,
    imageSrc: obj.imageSrc,
    audioSrc: obj.audioSrc
  };

  return Object.fromEntries(
    Object.entries(sanitized).filter(([_, value]) => value !== undefined)
  );
};

export async function GET(
  req: Request,
  { params }: { params: { challengeOptionsId: string } }
) {
  if (!isAdmin()) {
    return new NextResponse('Unauthorized', { status: 403 });
  }

  try {
    const data = await db.query.challengeOptions.findFirst({
      where: eq(challengeOptions.id, parseInt(params.challengeOptionsId, 10)),
    });

    if (!data) {
      return NextResponse.json({ error: 'Challenge option not found' }, { status: 404 });
    }

    return NextResponse.json(serializeObject(data));
  } catch (error) {
    console.error('Error fetching challenge option:', error);
    return NextResponse.json(
      { error: 'Failed to fetch challenge option' },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { challengeOptionsId: string } }
) {
  if (!isAdmin()) {
    return new NextResponse('Unauthorized', { status: 403 });
  }

  try {
    const body = await req.json();
    
    const data = await db
      .update(challengeOptions)
      .set({
        text: body.text,
        challengeId: body.challengeId,
        isArabic: body.isArabic,
        correct: body.correct,
        imageSrc: body.imageSrc,
        audioSrc: body.audioSrc
      })
      .where(eq(challengeOptions.id, parseInt(params.challengeOptionsId, 10)))
      .returning();

    if (!data.length) {
      return NextResponse.json({ error: 'Challenge option not found' }, { status: 404 });
    }

    return NextResponse.json(serializeObject(data[0]));
  } catch (error) {
    console.error('Error updating challenge option:', error);
    return NextResponse.json(
      { error: 'Failed to update challenge option' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { challengeOptionsId: string } }
) {
  if (!isAdmin()) {
    return new NextResponse('Unauthorized', { status: 403 });
  }

  try {
    const data = await db
      .delete(challengeOptions)
      .where(eq(challengeOptions.id, parseInt(params.challengeOptionsId, 10)))
      .returning();

    if (!data.length) {
      return NextResponse.json({ error: 'Challenge option not found' }, { status: 404 });
    }

    return NextResponse.json(serializeObject(data[0]));
  } catch (error) {
    console.error('Error deleting challenge option:', error);
    return NextResponse.json(
      { error: 'Failed to delete challenge option' },
      { status: 500 }
    );
  }
}