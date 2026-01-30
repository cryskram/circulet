function getPublicIdFromUrl(url: string) {
  const uploadIndex = url.indexOf("/upload/");
  if (uploadIndex === -1) return null;

  const path = url.substring(uploadIndex + 8);
  const withoutVersion = path.replace(/^v\d+\//, "");
  const withoutExtension = withoutVersion.replace(/\.[^/.]+$/, "");

  return withoutExtension;
}
