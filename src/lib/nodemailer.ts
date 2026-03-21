import nodemailer from "nodemailer";

export const sendEnquiryEmail = async ({
  name,
  email,
  phone,
  productId,
  productName,
}: {
  name: string;
  email: string;
  phone?: string;
  productId: string;
  productName: string;
}) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: Number(process.env.EMAIL_SERVER_PORT) || 587,
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_FROM || "noreply@najmiindustrial.com",
    to: process.env.ADMIN_EMAIL || "admin@najmiindustrial.com",
    subject: `New Product Enquiry: ${productName}`,
    text: `
      You have received a new product enquiry from the website.
      
      Customer Name: ${name}
      Customer Email: ${email}
      Customer Phone: ${phone || "Not provided"}
      
      Product Enquired: ${productName} (ID: ${productId})
      Link: ${process.env.NEXTAUTH_URL}/products/${productId}
    `,
    html: `
      <h2>New Product Enquiry</h2>
      <p>You have received a new product enquiry from the website.</p>
      <ul>
        <li><strong>Customer Name:</strong> ${name}</li>
        <li><strong>Customer Email:</strong> ${email}</li>
        <li><strong>Customer Phone:</strong> ${phone || "Not provided"}</li>
      </ul>
      <hr />
      <h3>Product Details</h3>
      <p><strong>Product:</strong> ${productName}</p>
      <p><strong>Link:</strong> <a href="${process.env.NEXTAUTH_URL}/products/${productId}">View Product</a></p>
    `,
  };

  const info = await transporter.sendMail(mailOptions);
  return info;
};
