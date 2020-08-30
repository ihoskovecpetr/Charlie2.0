const { google } = require("googleapis");
const nodemailer = require("nodemailer");

const getSmtpTransport = () => {
  // const authHeader = req.get("Authorization");
  const OAuth2 = google.auth.OAuth2;

  const oauth2Client = new OAuth2(
    "240102983847-4rl6l3igfraucda0hf4onpesq4ns8hjr.apps.googleusercontent.com", // ClientID
    "w6myevje4fX4ule3Lnr7_zBI", // Client Secret
    "https://developers.google.com/oauthplayground" // Redirect URL
  );

  oauth2Client.setCredentials({
    refresh_token:
      "1//04hOsAJbgaDOgCgYIARAAGAQSNwF-L9IrhdZywiV91vSsjiwrJ1mPSBxqzoiTZ6Kg-mMWIPTeB2jZc9qr_dvuG0pwvpdGkdk5Ma4",
  });

  const accessToken = oauth2Client.getAccessToken();

  const smtpTransport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: "charliehouseparty@gmail.com",
      clientId:
        "240102983847-4rl6l3igfraucda0hf4onpesq4ns8hjr.apps.googleusercontent.com",
      clientSecret: "w6myevje4fX4ule3Lnr7_zBI",
      refreshToken:
        "1//04hOsAJbgaDOgCgYIARAAGAQSNwF-L9IrhdZywiV91vSsjiwrJ1mPSBxqzoiTZ6Kg-mMWIPTeB2jZc9qr_dvuG0pwvpdGkdk5Ma4",
      accessToken: accessToken,
    },
  });

  return smtpTransport;
};

exports.getSmtpTransport = getSmtpTransport;
