import { readFileSync } from "node:fs";
import path from "node:path";

/**
 * Reads width/height from a PNG's IHDR chunk (bytes 16-23) without
 * decoding the image. `publicPath` is the URL path under /public
 * (e.g. "/fiches/cm2/mathematiques/foo/f1.png").
 */
export function readPngDimensions(publicPath: string): {
  width: number;
  height: number;
} {
  const filePath = path.join(process.cwd(), "public", publicPath);
  const buffer = readFileSync(filePath);
  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20),
  };
}
