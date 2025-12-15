import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function sendOTPEmail(to: string, otp: string) {
  await transporter.sendMail({
    from: `"Netflix Security" <${process.env.GMAIL_USER}>`,
    to,
    subject: "Your Netflix verification code",
    html: `
      <div style="font-family: Arial;">
        <h2>Verify your sign-in</h2>
        <p>Your Netflix verification code is:</p>
        <h1 style="letter-spacing: 4px;">${otp}</h1>
        <p>This code expires in 5 minutes.</p>
      </div>
    `,
  });
}
