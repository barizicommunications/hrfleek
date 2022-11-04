const express =require("express");
const router =express.Router();
const request = require("request");
const firebase = require("../firebase");
const parse = require("./parse");
// get access token
router.use((req, res, next) => {
  const endpoint =
    "https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";
  const consumer_key = "opkSUqD8CnTrWrRA6bi33JRGzd9Fqf5z";
  const consumer_secret = "hLArzEhANCJt2etJ";
  auth =
    "Basic " +
    Buffer.from(consumer_key + ":" + consumer_secret).toString("base64");
  request(
    {
      url: endpoint,
      headers: {
        Authorization: auth,
      },
    },
    function (error, response, body) {
      if (error) {
        return next(error);
      }
      req.access_token = JSON.parse(body).access_token;
      next();
    }
  );
});

// STK PUSH
router.get("/pay/:amount/:phone_number", (req, res, next) => {
    const endpoint =
      "https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest";
    let token = req.access_token;
    let auth = `Bearer ${token}`;
    let timestamp = require("./timestamp").timestamp;
    let bs_short_code = "4103269";
    let passkey =
      "c18a1072218c13f02d68b5b5e4d1f7ce8a1594387f4dc90ea5229700e2226dc9";
  
    let password = new Buffer.from(
      `${bs_short_code}${passkey}${timestamp}`
    ).toString("base64");
    request(
      {
        uri: endpoint,
        method: "POST",
        headers: {
          Authorization: auth,
        },
        json: {
          BusinessShortCode: bs_short_code,
          Password: password,
          Timestamp: timestamp,
          TransactionType: "CustomerPayBillOnline",
          Amount: req.params.amount,
          PartyA: req.params.phone_number,
          PartyB: "4103269",
          PhoneNumber: req.params.phone_number,
          CallBackURL:
            "https://us-central1-scanpal-f74da.cloudfunctions.net/mpesa/payments/callback",
          AccountReference: "Ace Litigator",
          TransactionDesc: "Package subscription",
        },
      },
      function (error, response, body) {
        if (error) {
          return next(error);
        }
        res.status(200).json(body);
      }
    );
  });
  //WITHDRAW FROM PAYBILL
  router.get("/withdraw", (req, res, next) => {
    const endpoint =
      "https://sandbox.safaricom.co.ke/mpesa/b2c/v1/paymentrequest";
    let token = req.access_token;
    let auth = `Bearer ${token}`;
    let timestamp = require("./timestamp").timestamp;
    let bs_short_code = "4103269";
    let passkey =
      "c18a1072218c13f02d68b5b5e4d1f7ce8a1594387f4dc90ea5229700e2226dc9";
  
    let password = new Buffer.from(
      `${bs_short_code}${passkey}${timestamp}`
    ).toString("base64");
    request(
      {
        uri: endpoint,
        method: "POST",
        headers: {
          Authorization: auth,
        },
        json: {
          InitiatorName: "testapi",
          SecurityCredential:
            "bPZbvdFLMbkX3LBnJKiaAt+m/YS++TgQvBBA7m35ZQsy2ASO/LhY1gyk9SZA9H2RPBxJEG7gCmY119CQcPALw/JiqE0Nu6/vQh7QwsJ8mbikBSrOtDh50ahPvXohZPpEwjhAFyAGORgUqLNTDnrOJ/PB/WEW4PfATp61eP7BxzxDr6nxRAzz7FOGcbeDHHptIghs60pvE9/jojhnY7zTh0rv0Tt71Df0YtF4QDAv9ImkVtnryz4GtMVJL5pEAvdb2JetaVm5uQFzVrYtb+KvXEQdQZtw9tcwH/fveYEuVOlFx0UmVZzd2Tvr4gdM9jlSUC/uRosIhjr5Srq9K2BsjA==",
          CommandID: "BusinessPayment",
          Amount: 1,
          PartyA: 4103269,
          PartyB: 254705122230,
          Remarks: "Test remarks",
          QueueTimeOutURL: "https://mydomain.com/b2c/queue",
          ResultURL: "https://mydomain.com/b2c/result",
          Occassion: "",
        },
      },
      function (error, response, body) {
        if (error) {
          return next(error);
        }
        res.status(200).json(body);
      }
    );
  });

  //CALLBACK URL
  router.post("/callback", async (req, res) => {
  //Get the transaction description
  const callbackData = req.body.Body.stkCallback;
  const parsedData = parse(callbackData);
    console.log(parsedData)
  let lmnoResponse = firebase.db
    .collection("mpesa_responses")
    .doc("/" + parsedData.checkoutRequestID + "/");
  let transaction = firebase.db
    .collection("transactions")
    .doc("/" + parsedData.checkoutRequestID + "/");

  if ((await lmnoResponse.get()).exists) {
    await lmnoResponse.update(parsedData);
  } else {
    await lmnoResponse.set(parsedData);
  }
  if ((await transaction.get()).exists) {
    await transaction.update({
      amount: parsedData.amount,
      confirmed: true,
    });
  } else {
    await transaction.set({
      moneyType: "money",
      type: "deposit",
      amount: parsedData.amount,
      confirmed: true,
    });
  }

  res.send("Completed");
});

module.exports = router