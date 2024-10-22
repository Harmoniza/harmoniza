const express = require("express");
const bodyParser = require("body-parser");
const paypal = require("paypal-rest-sdk");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

paypal.configure({
  mode: "live", // Change to 'live' when ready
  client_id:
    "AdWzjV6vhlZIvNGgU_vGoUFm5ST2wLh_Hvw1Dcj5RxZ3b-huW7XlENWnCtK84DcK7KgRGhXOW_2WEkxV",
  client_secret:
    "EDwie8LOInsSJ6vNTA3fhJQ4w33_2mPtVD4im1mw-PobrxfTRivitcGTyuc3IrKo_dDeSDeX-zGH07ST",
});

// Function to create payment JSON
const createPaymentJson = (name, sku, price, description) => {
  return {
    intent: "sale",
    payer: {
      payment_method: "paypal",
    },
    redirect_urls: {
      return_url: "https://harmoniza.github.io/harmoniza/success",
      cancel_url: "https://harmoniza.github.io/harmoniza/cancel",
    },
    transactions: [
      {
        item_list: {
          items: [
            {
              name: name,
              sku: sku,
              price: price,
              currency: "USD",
              quantity: 1,
            },
          ],
        },
        amount: {
          currency: "USD",
          total: price,
        },
        description: description,
      },
    ],
  };
};

app.post("/pay", (req, res) => {
  const paymentJson = createPaymentJson(
    "Shadows in the Forest (Commercial License)",
    "001",
    "3.00",
    "Download link for Shadows in the Forest - Commercial License."
  );

  paypal.payment.create(paymentJson, (error, payment) => {
    if (error) {
      throw error;
    } else {
      for (let i = 0; i < payment.links.length; i++) {
        if (payment.links[i].rel === "approval_url") {
          res.redirect(payment.links[i].href);
        }
      }
    }
  });
});

app.post("/pay/extended", (req, res) => {
  const paymentJson = createPaymentJson(
    "Shadows in the Forest (Extended License)",
    "002",
    "15.00",
    "Download link for Shadows in the Forest - Extended License."
  );

  paypal.payment.create(paymentJson, (error, payment) => {
    if (error) {
      throw error;
    } else {
      for (let i = 0; i < payment.links.length; i++) {
        if (payment.links[i].rel === "approval_url") {
          res.redirect(payment.links[i].href);
        }
      }
    }
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
