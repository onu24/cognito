import { randomUUID } from "crypto";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const allowedTypes = new Map([
  ["image/jpeg", "jpg"],
  ["image/png", "png"],
  ["image/webp", "webp"],
  ["image/gif", "gif"],
]);

const bucket = "cognito-inc-54999.firebasestorage.app";

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get("Authorization") || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.substring(7) : "";

    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "No image file provided." }, { status: 400 });
    }

    const extension = allowedTypes.get(file.type);
    if (!extension) {
      return NextResponse.json({ error: "Only JPG, PNG, WebP, and GIF images are allowed." }, { status: 400 });
    }

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json({ error: "Image must be 5MB or smaller." }, { status: 400 });
    }

    const filename = `${Date.now()}-${randomUUID()}.${extension}`;
    const path = `uploads/${filename}`;

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket}/o?name=${encodeURIComponent(path)}`;

    const headers: HeadersInit = {
      "Content-Type": file.type,
    };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const storageResponse = await fetch(uploadUrl, {
      method: "POST",
      headers,
      body: buffer,
    });

    const text = await storageResponse.text();
    let resData: any = {};
    try {
      if (text.trim()) {
        resData = JSON.parse(text);
      }
    } catch (e) {
      throw new Error(`Firebase API returned non-JSON response (Status: ${storageResponse.status}). Details: ${text.substring(0, 100)}`);
    }

    if (!storageResponse.ok) {
      throw new Error(resData.error?.message || `Firebase Storage rejected upload with status ${storageResponse.status}`);
    }

    const downloadToken = resData.downloadTokens;
    const downloadURL = `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${encodeURIComponent(path)}?alt=media${downloadToken ? `&token=${downloadToken}` : ""}`;

    return NextResponse.json({ path: downloadURL });
  } catch (error: any) {
    console.error("Error in upload API route:", error);
    return NextResponse.json({ error: error.message || "Failed to process/upload file." }, { status: 500 });
  }
}
