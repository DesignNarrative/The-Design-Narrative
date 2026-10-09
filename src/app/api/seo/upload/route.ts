import { promises as fs } from 'fs';
import path from 'path';
import { fail, guard, json } from '@/lib/seo/api';

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'assets', 'seo');

export async function POST(req: Request) {
  const blocked = await guard(req);
  if (blocked) return blocked;

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return fail('No file uploaded.');
    }

    // Validate mime type
    const validMimes = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml', 'image/gif'];
    if (!validMimes.includes(file.type)) {
      return fail('Invalid file type. Please upload a JPG, PNG, WebP, or SVG image.');
    }

    // Max 10MB
    if (file.size > 10 * 1024 * 1024) {
      return fail('Image size exceeds 10MB limit.');
    }

    await fs.mkdir(UPLOAD_DIR, { recursive: true });

    // Clean filename
    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_').toLowerCase();
    const ext = path.extname(originalName) || '.jpg';
    const baseName = path.basename(originalName, ext);
    const fileName = `${baseName}-${Date.now()}${ext}`;
    const filePath = path.join(UPLOAD_DIR, fileName);

    const buffer = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(filePath, buffer);

    const publicUrl = `/assets/seo/${fileName}`;
    return json({ ok: true, url: publicUrl, fileName });
  } catch (e) {
    return fail(e instanceof Error ? e.message : 'File upload failed.', 500);
  }
}
