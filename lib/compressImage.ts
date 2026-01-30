import imageCompression, { Options } from "browser-image-compression";

export async function compressImage(file: File): Promise<File> {
  const options: Options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1600,
    useWebWorker: true,
    initialQuality: 0.75,
  };

  return await imageCompression(file, options);
}
