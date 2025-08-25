import type { APIRoute } from 'astro';
import { google } from 'googleapis';
import dotenv from "dotenv";

dotenv.config();

function toDirectDriveUrl(url: string): string {
  // Accepts formats:
  // - https://drive.google.com/file/d/FILE_ID/view?usp=sharing
  // - https://drive.google.com/open?id=FILE_ID
  // - https://drive.google.com/uc?id=FILE_ID
  // - Already-direct or non-drive => return as-is
  try {
    const fileIdMatch =
      url.match(/\/d\/([a-zA-Z0-9_-]+)/)?.[1] ||
      url.match(/[?&]id=([a-zA-Z0-9_-]+)/)?.[1];

    if (fileIdMatch) {
      //return `https://drive.google.com/uc?id=${fileIdMatch}`;
      return ""
    }
    // If it's already a uc?id= link or a normal image URL, pass through
    return url;
  } catch {
    return url;
  }
}

export const GET: APIRoute = async () => {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(import.meta.env.GOOGLE_SERVICE_ACCOUNT_JSON as string),
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = import.meta.env.GOOGLE_SHEET_ID as string;

    // Read the full first sheet; header row required
    const range = 'Sheet1';
    const resp = await sheets.spreadsheets.values.get({ spreadsheetId, range });

    const rows = resp.data.values ?? [];
    if (rows.length === 0) {
      return new Response(JSON.stringify([]), {
        headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
      });
    }

    const headers = rows[0].map((h: string) => h.trim());
    const idx = {
      id: headers.indexOf('id'),
      title: headers.indexOf('title'),
      description: headers.indexOf('description'),
      priceRange: headers.indexOf('priceRange'),
      images: headers.indexOf('images'),
    };

    const dresses = rows.slice(1).map((r) => {
      const imagesRaw = (idx.images >= 0 && r[idx.images]) ? String(r[idx.images]) : '';
      const images = imagesRaw
        .split(',')
        .map(s => s.trim())
        .filter(Boolean)
        .map(toDirectDriveUrl);

      return {
        id: idx.id >= 0 ? String(r[idx.id] ?? '') : crypto.randomUUID(),
        title: idx.title >= 0 ? String(r[idx.title] ?? '') : '',
        description: idx.description >= 0 ? String(r[idx.description] ?? '') : '',
        priceRange: idx.priceRange >= 0 ? String(r[idx.priceRange] ?? '') : '',
        images,
      };
    });

    return new Response(JSON.stringify(dresses), {
      headers: {
        'Content-Type': 'application/json',
        // Keep it live. If you want tiny caching, change to e.g. max-age=60
        'Cache-Control': 'no-store',
      },
    });
  } catch (err) {
    console.error('Sheets API error:', err);
    return new Response(JSON.stringify({ error: 'Failed to load dresses' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
    });
  }
};

