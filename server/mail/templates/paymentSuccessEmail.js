export const  paymentSuccessEmail = (
  studentName,
  amount,
  orderId,
  paymentId
) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8" />
      <title>Payment Successful</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          padding: 20px;
          margin: 0;
        }
        .container {
          max-width: 600px;
          margin: auto;
          background: #ffffff;
          border-radius: 10px;
          padding: 30px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .header {
          text-align: center;
          color: #16a34a;
        }
        .details {
          margin-top: 20px;
          line-height: 1.8;
        }
        .footer {
          margin-top: 30px;
          font-size: 14px;
          color: #666;
          text-align: center;
        }
        .highlight {
          font-weight: bold;
          color: #111827;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h2 class="header">✅ Payment Successful</h2>

        <p>Hi <span class="highlight">${studentName}</span>,</p>

        <p>
          Your payment has been successfully processed. Thank you for your enrollment!
        </p>

        <div class="details">
          <p><strong>Amount Paid:</strong> ₹${amount}</p>
          <p><strong>Order ID:</strong> ${orderId}</p>
          <p><strong>Payment ID:</strong> ${paymentId}</p>
        </div>

        <p>
          You can now access your enrolled course/dashboard.
        </p>

        <div class="footer">
          <p>Thank you for choosing us ❤️</p>
        </div>
      </div>
    </body>
    </html>
  `;
};