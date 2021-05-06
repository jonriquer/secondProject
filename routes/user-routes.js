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
      `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${req.query.stockTicker}&apikey=JJX67CM4VKESBNLG`
    )
    .then(theApiInfo => {
      Stock.find({ user: req.session.currentUser._id }).then(myStocks => {
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
          user: req.session.currentUser,
          myStocks:myStocks
        };
        // console.log("the close prices in the dataArray >>>>>>>>>>>>>> ", data.theData);

        res.render("userHome", data);
    
        // res.render("userHome", data);
      })
      .catch(err => { next(err) })
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





//  ---------------------- EDIT -----------------------------------------------
router.get("/editTrade", isLoggedIn, (req, res, next) => {
  console.log('/editTrade GET is being called!!!');
  console.log("THIS IS REQ.SESSION.CURRENT USER====>>>>>",req.session.currentUser, req.query, req.params, req.body)
  res.render("editTrade", {
    stock: req.query,
    user: req.session.currentUser
  });
});

router.post("/editTrade", isLoggedIn, (req, res, next) => {
  console.log(req.body);
  console.log("THIS IS REQ.SESSION.CURRENT USER==saDasd==>>>>>",req.session.currentUser, req.body, req.query, req.params)
  let stock = req.body; 
  console.log(stock, req.body.identification)
  Stock.findByIdAndUpdate(req.body.identification,  stock )
  .then( resFromDB => {
    res.redirect('/userHome')
  })
  .catch( err => console.error(err) );
});

// Delete 
router.post('/stock/delete/:stockId', (req,res,next) => {
  // console.log("running delete stock route <<<<<<<<<")
  let stock = req.body;
  stock.user = req.session.currentUser._id
  Stock.findByIdAndDelete(req.params.stockId)
  .then(()=> {
    res.redirect('/userHome')
  })
  .catch(err => {next(err)})
})

router.get("/logout", (req, res, next) => {
  req.session.destroy((err) => {
    // can't access session here
    res.redirect("/");
  });
});

module.exports = router;
