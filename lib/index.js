const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { request } = require("express");
const { Configuration, PlaidApi, PlaidEnvironments, TransferCreditFundsSource } = require("plaid");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const config = new Configuration({
    basePath: PlaidEnvironments.sandbox,
    baseOptions: {
      headers: {
        "PLAID-CLIENT-ID": process.env.PLAID_CLIENT_ID,
        "PLAID-SECRET": process.env.PLAID_SECRET,
      },
    },
});

const plaidClient = new PlaidApi(config)

app.post('/create_link_token', async function (req, res) {
    const plaidRequest = {
      user: {
        client_user_id: 'user',
      },
      client_name: 'Plaid Test App',
      products: ['auth'],
      language: 'en',
      redirect_uri: process.env.PLAID_SANDBOX_REDIRECT_URI,
      country_codes: ['CA'],
    };
    try {
      const createTokenResponse = await plaidClient.linkTokenCreate(plaidRequest);
      res.json(createTokenResponse.data);
    } catch (error) {
        res.status(500).send("failure")
    }
  });

app.post('/exchange_public_token', async function (
    req,
    res,
    next,
    ) {
    const publicToken = req.body.public_token;
    try {
        const plaidResponse = await plaidClient.itemPublicTokenExchange({
        public_token: publicToken,
        });

        // These values should be saved to a persistent database and
        // associated with the currently signed-in user
        const accessToken = plaidResponse.data.access_token;

        res.json({accessToken});
    } catch (error) {
        res.status(500).send("failure")
    }
});

app.post('/auth', async function(req, res, next){
    try{
        const access_token = req.body.access_token;
        const plaidRequest = {
            access_token: access_token,
        };
        const plaidResponse = await plaidClient.authGet(plaidRequest);
        res.json(plaidResponse.data);
    } catch (error) {
        res.status(500).send("failure")
    }
});

app.post('/transactions', async function(req, res, next){
    try{
        const access_token = req.body.access_token;
        const plaidRequest = {
            access_token: access_token,
            count: 50,

        };
        const plaidResponse = await plaidClient.transactionsSync(plaidRequest);
        res.json(plaidResponse.data);
    } catch (error) {
        res.status(500).send("failure")
    }
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
  });

module.exports = app