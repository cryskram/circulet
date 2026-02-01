import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const html = `
      <div style="font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; color: #0f172a; background: #ffffff; padding: 24px;">
        <h2 style="margin: 0 0 12px; font-size: 20px;">
          New Feature Request
        </h2>

        <p style="margin: 0 0 24px; color: #475569; font-size: 14px;">
          A user has submitted a new feature request on Circulet.
        </p>

        <div style="border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; margin-bottom: 24px;">
          <p style="margin: 0 0 8px; font-size: 14px;">
            <strong>Name:</strong> ${name}
          </p>
          <p style="margin: 0 0 8px; font-size: 14px;">
            <strong>Email:</strong> ${email}
          </p>
          <p style="margin: 0; font-size: 14px;">
            <strong>Submitted at:</strong> ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}
          </p>
        </div>

        <div>
          <p style="margin: 0 0 8px; font-size: 14px; font-weight: 600;">
            Feature idea
          </p>
          <div style="border-left: 4px solid #0f172a; padding-left: 12px; color: #334155; font-size: 14px; white-space: pre-line;">
            ${message}
          </div>
        </div>

        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 32px 0;" />

        <p style="margin: 0; font-size: 12px; color: #64748b;">
          Circulet • Feature Request System
        </p>
      </div>
    `;

    await transporter.sendMail({
      from: `"Circulet" <${process.env.SMTP_USER}>`,
      to: process.env.FEATURE_REQUEST_TO,
      replyTo: email,
      subject: "[Circulet] New Feature Request",
      html,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Feature request email error:", error);
    return NextResponse.json(
      { error: "Failed to send feature request" },
      { status: 500 }
    );
  }
}
