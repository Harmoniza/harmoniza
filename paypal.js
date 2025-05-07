const express = require("express");
const bodyParser = require("body-parser");
const paypal = require("paypal-rest-sdk");
require("dotenv").config(); // Load .env variables

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

paypal.configure({
  mode: "sandbox", // Change to 'live' when ready
  client_id: process.env.PAYPAL_CLIENT_ID,
  client_secret: process.env.PAYPAL_CLIENT_SECRET,
});

const BASE_URL = "https://harmoniza-server.onrender.com"; // Replace with your deployed server URL
const SITE_URL = "https://harmoniza.github.io/harmoniza";

const createPaymentJson = (name, sku, price, description) => ({
  intent: "sale",
  payer: { payment_method: "paypal" },
  redirect_urls: {
    return_url: `${BASE_URL}/success`,
    cancel_url: `${SITE_URL}/donation_canceled.html`,
  },
  transactions: [
    {
      item_list: {
        items: [{ name, sku, price, currency: "USD", quantity: 1 }],
      },
      amount: { currency: "USD", total: price },
      description,
    },
  ],
});

// Commercial license route
app.post("/pay", (req, res) => {
  const paymentJson = createPaymentJson(
    "Shadows in the Forest (Commercial License)",
    "001",
    "3.00",
    "Download link for Shadows in the Forest - Commercial License."
  );

  paypal.payment.create(paymentJson, (error, payment) => {
    if (error) {
      console.error(error);
      res.status(500).send("Error creating payment.");
    } else {
      const approvalUrl = payment.links.find(
        (link) => link.rel === "approval_url"
      ).href;
      res.redirect(approvalUrl);
    }
  });
});

// Extended license route
app.post("/pay/extended", (req, res) => {
  const paymentJson = createPaymentJson(
    "Shadows in the Forest (Extended License)",
    "002",
    "15.00",
    "Download link for Shadows in the Forest - Extended License."
  );

  paypal.payment.create(paymentJson, (error, payment) => {
    if (error) {
      console.error(error);
      res.status(500).send("Error creating payment.");
    } else {
      const approvalUrl = payment.links.find(
        (link) => link.rel === "approval_url"
      ).href;
      res.redirect(approvalUrl);
    }
  });
});

// Payment success handler
app.get("/success", (req, res) => {
  const paymentId = req.query.paymentId;
  const payerId = { payer_id: req.query.PayerID };

  paypal.payment.execute(paymentId, payerId, (error, payment) => {
    if (error) {
      console.error(error.response);
      res.redirect(`${SITE_URL}/donation_canceled.html`);
    } else {
      const sku = payment.transactions[0].item_list.items[0].sku;
      let downloadPage = "/donation_success.html";

      if (sku === "001") {
        downloadPage = "/commercial_download.html";
      } else if (sku === "002") {
        downloadPage = "/extended_download.html";
      }

      res.redirect(`${SITE_URL}${downloadPage}`);
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
