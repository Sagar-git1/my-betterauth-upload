import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { randomUUID } from "crypto";

import { auth } from "@/lib/auth";
import { r2, R2_BUCKET } from "@/lib/r2";

import { PutObjectCommand } from "@aws-sdk/client-s3";

export const runtime = "nodejs";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_MIME_TYPES = [
  "image/png",
  "image/jpeg",
  "image/webp",
  "application/pdf",
];

export async function POST(req: Request) {
  // 1️⃣ Auth check
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 2️⃣ Parse form data
  const formData = await req.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "File is required" }, { status: 400 });
  }

  // 3️⃣ Validate file
  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json(
      { error: "File too large (max 5MB)" },
      { status: 400 }
    );
  }

  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    return NextResponse.json(
      { error: "Unsupported file type" },
      { status: 400 }
    );
  }

  // 4️⃣ Generate object key
  const extension = file.name.split(".").pop();
  const objectKey = `uploads/${session.user.id}/${randomUUID()}.${extension}`;

  // 5️⃣ Upload to R2
  const buffer = Buffer.from(await file.arrayBuffer());

  await r2.send(
    new PutObjectCommand({
      Bucket: R2_BUCKET,
      Key: objectKey,
      Body: buffer,
      ContentType: file.type,
    })
  );

  // 6️⃣ Respond with metadata
  return NextResponse.json({
    key: objectKey,
    name: file.name,
    size: file.size,
    type: file.type,
  });
}
