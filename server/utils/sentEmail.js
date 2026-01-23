import dotenv from 'dotenv';
dotenv.config();
import nodemailer from 'nodemailer';



const transporter = nodemailer.createTransport({
  service: "gmail",  //Gmail
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,  //App Password (NOT Gmail login password)
  },
});

export const sendEmail = async (to, subject, otp) => {
  try {
// console.log("Email:", process.env.EMAIL);
// console.log("Pass:", process.env.EMAIL_PASS);


    const info = await transporter.sendMail({
      from: process.env.EMAIL,
      to,
      subject,
      html: `<body style="margin:0;padding:0;background:#f5f7fa;font-family:Arial,Helvetica,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f7fa;padding:40px 0;">
    <tr>
      <td align="center">

        <table width="500" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;box-shadow:0 4px 25px rgba(0,0,0,0.1);overflow:hidden;">

          <!-- Header -->
          <tr>
            <td style="background:#111827;padding:24px;text-align:center;">
              <h1 style="color:#ffffff;margin:0;font-size:22px;font-weight:700;">Vybe – OTP Verification</h1>
            </td>
          </tr>

          <!-- Message -->
          <tr>
            <td style="padding:30px 25px;">
              <p style="font-size:16px;color:#374151;margin:0 0 15px;">
                Hi there 👋,
              </p>

              <p style="font-size:15px;color:#4b5563;line-height:1.6;margin:0 0 20px;">
                Thank you for choosing <strong>Vybe</strong>!  
                To complete your verification, please use the OTP code below.  
                This code is valid for <strong>5 minutes</strong>.  
                Do not share this code with anyone.
              </p>

             
              <div style="text-align:center;margin:25px 0;">
                <div style="
                  display:inline-block;
                  background:#111827;
                  color:#ffffff;
                  padding:15px 25px;
                  font-size:32px;
                  letter-spacing:6px;
                  font-weight:700;
                  border-radius:10px;
                ">
                  ${otp}
                </div>
              </div>

              <p style="font-size:14px;color:#6b7280;line-height:1.6;margin:20px 0 0;">
                If you didn’t request this, just ignore this message —  
                your account is safe with us.
              </p>

              <p style="font-size:14px;color:#6b7280;line-height:1.6;margin:20px 0 0;">
                Regards,<br/>
                <strong>The Vybe Team</strong>
              </p>
            </td>
          </tr>

         
          <tr>
            <td style="background:#f3f4f6;padding:15px;text-align:center;">
              <p style="margin:0;color:#9ca3af;font-size:12px;">
                © 2025 Vybe. All rights reserved.
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
`
    });

    console.log("Message sent:", info.messageId);

  } catch (error) {
    console.log("Email Error:", error.message);
  }
};
