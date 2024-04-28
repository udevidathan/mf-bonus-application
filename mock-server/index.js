const bodyParser = require("body-parser");
const express = require("express");
const depositJSON = require("./data/deposit.json");
const validRoutingNumber = require("./data/validRouteNum.json");
const RolesJson = require("./data/roles.json");
const errorJSON = require("./data/errorList.json");
const CandidateJson = require("./data/candidate.json");
const ClientListJson = require("./data/clientsList.json");
const DeeplinkJSON = require("./data/deeplink.json");
const featureFlagJson = require("./data/featureFlag.json");
const emergencyContact = require("./data/emergencyContact.json");
const cors = require("cors");
const app = express();

const temp = {
  employeeId: "13968276661056",
  name: "Robert Kappes",
  bankName: "BANK OF AMERICA N.A.",
  bankDepositAccountNumber: "13968276661055",
  routingNumber: "111000024",
};

// Allow all requests from all domains & localhost
app.all("/*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "POST, GET");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.get("/user/account/bankDetails", function (req, res) {
  res.json(depositJSON.data);
  // res.json(errorJSON);
});
app.post("/account/bankDetails/validate", function (req, res) {
  res.json(validRoutingNumber);
});
app.put("/user/account/bankDetails", function (req, res) {
  res.json({
    data: {
      isUpdated: true,
    },
    errors: [],
    correlationId: "",
  });
});

app.get("/user/account/emergencyContact", function (req, res) {
  res.json(emergencyContact.data);
});

app.post("/user/account/emergencyContact", function (req, res) {
  res.json({
    data: {
      isUpdated: true,
    },
    errors: [],
    correlationId: "",
  });
});

app.get("/getProjectLinks", function (req, res) {
  res.json(DeeplinkJSON.data);
});

app.get("/suppliers/companies", (req, res) => {
  res.json(ClientListJson);
});

app.get("/user/roles", (req, res) => {
  res.json(RolesJson.data);
});

app.get("/user/companies", (req, res) => {
  res.json(RolesJson.data);
});

app.get("/user/candidate", (req, res) => {
  res.json(CandidateJson);
});

app.get("/ui-navigation", (req, res) => {
  res.json(featureFlagJson);
});

app.listen(6075);
