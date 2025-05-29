///api/upload.ts
import { NextRequest, NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";

// import { IncomingForm } from "formidable";
// const form = new IncomingForm();

export const config = {
  api: {
    bodyParser: false,
  },
};
export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File;
  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  console.log(buffer, "this is buffer");
  // var require:NodejsRequestData

  const uploadDir = path.join(process.cwd(), "/public");
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const fileName = `${Date.now()}-${file.name}`;
  const filePath = path.join(uploadDir, fileName);
  fs.writeFileSync(filePath, buffer);

  return NextResponse.json({ url: `${fileName}` });
  // console.log(file, "this is file");
}
