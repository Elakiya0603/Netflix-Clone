// Replace single user with an array
export const REGISTERED_USERS: Array<{ email: string; password: string }> = [
  { email: "elakiya.varshini.dev@gmail.com", password: "123456" },
  // Add more users here if needed
];

export const trustedDevices: Record<string, boolean> = {};
export const otpStore: Record<string, { otp: string; expiresAt: number }> = {};
