const express = require("express");
const router = express.Router();
const axios = require("axios");
const hbs = require("hbs");
const Stock = require("../models/Stock");

hbs.registerHelper("capitalize", function(context) {
  return context.toUpperCase();
});

// Prevents access to User Home Page when logged out
function isLoggedIn(req, res, next) {
  if (req.session.currentUser) {
    // <== if there's user in the session (user is logged in)
    next();
  } else {
    res.redirect("/login");
  }
}

router.get("/userHome", isLoggedIn, (req, res, next) => {
  ///find all the stocks that are yours only
  Stock.find({ user: req.session.currentUser._id }).then(myStocks => {
    // data = {
    //   financeData: false
    // };

    res.render("userHome", { user: req.session.currentUser,  myStocks:myStocks});
  });
});

router.get("/userHome/query", isLoggedIn, (req, res, next) => {
  axios
    .get(
      `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${
        req.query.stockTicker
      }&apikey=JJX67CM4VKESBNLG`
    )
    .then(theApiInfo => {
      // console.log("info from API =========== Symbol => ", theApiInfo.data["Meta Data"]["2. Symbol"]);
      let dataArray = [];
      let datesArray = [];
      // console.log("= = = = = = = = = = = = = == = =", theApiInfo.data["Meta Data"]["2. Symbol"].toUpperCase());

      for (key in theApiInfo.data["Time Series (Daily)"]) {
        // console.log("--------------------------------------", theApiInfo.data["Time Series (Daily)"], key)

        dataArray.push(theApiInfo.data["Time Series (Daily)"][key]["4. close"]);
        datesArray.push(key);
      }
      data = {
        financeData: true,
        apiInfo: theApiInfo.data["Time Series (Daily)"],
        theData: dataArray,
        theDates: datesArray.reverse(),
        theLabel: theApiInfo.data["Meta Data"]["2. Symbol"].toUpperCase(),
        stockTicker: req.query.stockTicker,
        user: req.session.currentUser
      };
      // console.log("the close prices in the dataArray >>>>>>>>>>>>>> ", data.theData);

      res.render("userHome", data);
    })

    .catch(err => {
      console.log("Error occurred", err);
      //next(err);
    });
});

router.get("/stock", isLoggedIn, (req, res, next) => {
  res.render("stock", {
    stockTicker: req.query.stockTicker,
    user: req.session.currentUser
  });
});

router.post("/stock", isLoggedIn, (req, res, next) => {
  let stock = req.body;
  stock.user = req.session.currentUser._id; //adding user to the stock and then  save it
  let newStock = new Stock(stock);
  newStock
    .save()
    .then(stock => {})
    .catch(error => {});
  res.redirect("/userHome");
});

module.exports = router;
