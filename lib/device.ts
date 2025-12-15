export function getDeviceId(userAgent: string) {
  return Buffer.from(userAgent).toString("base64");
}
