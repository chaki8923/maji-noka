import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(
  req: Request, res: Response
) {
  const { subject, email, name, message } = await req.json();

  if (req.method === "POST") {
    try {

      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        auth: {
          user: process.env.MAJIUSER,
          pass: process.env.MAJIPASSWORD,
        },
      });

      const mailOptions1 = {
        from: `田中本気農家<${process.env.GMAILUSER}>`,
        to: email,
        subject: subject,
        text: `${name}様\n\nお問い合わせありがとうございました。\n\n返信までしばらくお待ちください。\n\nお問い合わせ内容\n\n
        =================================================
        ${message}
        =================================================
        `,
      };

      const mailOptions2 = {
        from: `田中本気農家<${process.env.GMAILUSER}>`, //　送信元メールアドレス
        to: process.env.GMAILUSER, //　送信先メールアドレス
        subject: 'お問合せがあります',
        text: `下記アドレスよりお問合せがあります。\n\n${email} \nお問合せ内容\n${message}`,
      }
      // Promise.all([mailer.sendMail(mailOptions1), mailer.sendMail(mailOptions2)])
      Promise.all([transporter.sendMail(mailOptions1), transporter.sendMail(mailOptions2)])
      .then((respose) => {
        console.log("Email sent: " + respose)
      })
      .catch((error) => {
        console.log("Email sent Error: " + error)
        return NextResponse.json({
          error_message: "メール送信失敗",
        });
      });
      return NextResponse.json({
        success_message: "メール送信成功",
      });
    } catch (error) {
      console.error(error);
      return NextResponse.json({
        error_message: "メール送信失敗",
      });
    }
  }
}

