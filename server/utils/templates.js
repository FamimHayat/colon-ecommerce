const EmailVerifyOtpTemplate = ({ otp, brandName = "colon-fashion" }) => {
  const year = new Date().getFullYear();

  return `
  <!DOCTYPE html>
  <html>
  <body style="margin:0; padding:0; background-color:#0f0f0f; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;">
    
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="padding:40px 15px;">
      <tr>
        <td align="center">

          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:520px; background:#161616; border:1px solid #222;">
            
            <!-- Brand -->
            <tr>
              <td align="center" style="padding:30px 20px 10px;">
                <h1 style="margin:0; font-size:28px; font-weight:600; color:#ffffff; letter-spacing:1px;">
                  ${brandName}
                </h1>
              </td>
            </tr>

            <!-- Title -->
            <tr>
              <td align="center" style="padding:10px 30px 0;">
                <h2 style="margin:0; font-size:22px; font-weight:600; color:#ffffff;">
                  Verify Your Email
                </h2>
              </td>
            </tr>

            <!-- Description -->
            <tr>
              <td align="center" style="padding:15px 30px 0;">
                <p style="margin:0; font-size:14px; line-height:1.6; color:#bdbdbd;">
                  Use the one-time password below to confirm your email address.
                </p>
              </td>
            </tr>

            <!-- OTP Section -->
            <tr>
              <td align="center" style="padding:30px;">
                
                <table cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    
                    <!-- OTP Box -->
                    <td style="background:#ffffff; padding:16px 30px;;">
                      <span style="font-size:26px; font-weight:700; letter-spacing:6px; color:#000000; user-select:all;">
                        ${String(otp)}
                      </span>
                    </td>

                    <!-- Copy Button (UI only) -->
                    <td style="background:#2a2a2a; padding:16px 18px;">
                      <span style="font-size:13px; font-weight:600; color:#ffffff;">
                        COPY
                      </span>
                    </td>

                  </tr>
                </table>

                <p style="margin-top:10px; font-size:12px; color:#888;">
                  Tap and hold the code to copy.
                </p>

              </td>
            </tr>

            <!-- Expiry -->
            <tr>
              <td align="center" style="padding:0 30px 20px;">
                <p style="margin:0; font-size:12px; color:#9a9a9a; line-height:1.6;">
                  This code will expire shortly. If you didn’t request this, you can safely ignore this email.
                </p>
              </td>
            </tr>

            <!-- Divider -->
            <tr>
              <td style="padding:10px 30px;">
                <hr style="border:none; border-top:1px solid #2a2a2a;">
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td align="center" style="padding:10px 20px 30px;">
                <p style="margin:0; font-size:11px; color:#666666;">
                  © ${year} ${brandName}. All rights reserved.
                </p>
              </td>
            </tr>

          </table>

        </td>
      </tr>
    </table>

  </body>
  </html>
  `;
};

const forgetPasswordTemplate = ({ links, brandName = "69e-commerce" }) => {
  const year = new Date().getFullYear();

  return `
<div style="
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
    background:#0c0c0c;
    padding:20px 20px 40px;
    color:#ffffff;
  ">
 <h1 style="
  text-align:center;
  margin:0 0 12px;
  font-size:38px;
  font-weight:600;
  letter-spacing:0.4px;
  color:#ffffff;
  text-shadow:
    0 0 10px rgba(245, 239, 230, 0.6),
    0 0 20px rgba(245, 239, 230, 0.5),
    0 0 40px rgba(245, 239, 230, 0.4);
">
colon
</h1>

    <div style="
      max-width:520px;
      margin:auto;
      background:#0c0c0c;
      border:1px solid rgba(255,255,255,0.08);
      border-radius:3px;
      padding:32px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.6);
    ">
    
        <h2 style="
        text-align:center;
        margin:0 0 12px;
        font-size:28px;
        font-weight:600;
        letter-spacing:0.4px;
      ">
        Reset your Password
      </h2>

      <p style="
        text-align:center;
        font-size:14px;
        line-height:1.6;
        color:rgba(255,255,255,0.75);
        margin:0 0 28px;
      ">
        We received a request to reset your password. Click the button below to continue.
      </p>

      <div style="
        text-align:center;
        margin:30px 0;
      ">
        <a href="${links}" style="
          display:inline-block;
          background:#ffffff;
          color:#0c0c0c;
          padding:16px 36px;
          font-size:16px;
          letter-spacing:1px;
          border-radius:2px;
          font-weight:700;
          text-decoration:none;
        ">
          RESET PASSWORD
        </a>
      </div>

      <p style="
        text-align:center;
        font-size:12px;
        color:rgba(255,255,255,0.6);
        margin:30px 0 0;
      ">
        This link will expire shortly. If you didn’t request a password reset, you can safely ignore this email.
      </p>

      <div style="
        border-top:1px solid rgba(255,255,255,0.08);
        margin:32px 0 16px;
      "></div>

      <p style="
        text-align:center;
        font-size:11px;
        color:rgba(255,255,255,0.45);
        margin:0;
      ">
        © ${year} ${brandName}
      </p>
    </div>
  </div>
  `;
};

module.exports = { EmailVerifyOtpTemplate, forgetPasswordTemplate };
