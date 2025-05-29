// pages/api/upload.ts
import { NextRequest, NextResponse } from "next/server";
import { IncomingForm } from "formidable";
const form = new IncomingForm();
import fs from "fs";
import path from "path";

export const config = {
  api: {
    bodyParser: false,
  },
};
export async function POST(req: NextRequest) {
  return new Promise((resolve) => {
    const form = new IncomingForm();
    const uploadDir = path.join(process.cwd(), "/public/uploads");
    form.uploadDir = uploadDir;
    form.keepExtensions = true;

    form.parse(req as NextRequest, (err, fields, files) => {
      if (err) {
        resolve(NextResponse.json({ error: err.message }, { status: 500 }));
        return;
      }

      const file = files.file;
      if (!file || Array.isArray(file)) {
        resolve(
          NextResponse.json({ error: "No file uploaded" }, { status: 400 })
        );
        return;
      }

      const newFilePath = path.join(uploadDir, file.newFilename);
      fs.renameSync(file.filepath, newFilePath);

      resolve(NextResponse.json({ url: `/uploads/${file.newFilename}` }));
    });
  });
}
