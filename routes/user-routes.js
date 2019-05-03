const express = require('express');
const router  = express.Router();
const axios = require('axios');

// Prevents access to User Home Page when logged out
function isLoggedIn(req, res, next){
  if (req.session.currentUser) {   // <== if there's user in the session (user is logged in)
    next();
  } 
    else {                         
      res.redirect("/login");        
    } 
}


router.get('/userHome', isLoggedIn, (req, res, next) => {
  data = {
    financeData: false
  }

  res.render('userHome', data)
});


router.get("/userHome/query", isLoggedIn, (req, res, next) => {

  axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${req.query.stockTicker}&apikey=JJX67CM4VKESBNLG`)
  .then(theApiInfo => {
    console.log("info from API =========== Symbol => ", theApiInfo.data["Meta Data"]["2. Symbol"]);
    data = {
      financeData: true,
      apiInfo:theApiInfo.data["Time Series (Daily)"]
    }
    res.render('userHome', data);
  })
  
  .catch(err => {
    console.log("Error occurred", err)
    //next(err);
  });
});

module.exports = router;