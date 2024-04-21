import nodemailer from "nodemailer";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function POST(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("apiメール");
  
  if (req.method === "POST") {
    try {
      const { name, email, message } = req.body;

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.MAIL_ACCOUNT,
          pass: process.env.MAIL_PASSWORD,
        },
      });

      const mailOptions = {
        from: process.env.MAIL_ACCOUNT,
        to: email,
        text: `${name}様\n\nお問い合わせありがとうございました。\n\n返信までしばらくお待ちください。\n\nお問い合わせ内容\n\n${message}`,
      };

      const info = await transporter.sendMail(mailOptions);
      console.log("Email sent: " + info.response);
      return NextResponse.json({
        success_message: "メール送信成功",
      });
      // res.status(200).json({ message: "メールが送信されました。" });
    } catch (error) {
      console.error(error);
      return NextResponse.json({
        error_message: "メール送信失敗",
      });
      // res.status(500).json({ error: "メールの送信中にエラーが発生しました。" });
    }
  } else {
    // res.status(405).json({ error: "POSTメソッドを使用してください。" });
  }
}

