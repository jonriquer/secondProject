document.addEventListener('DOMContentLoaded', () => {
  
  var strength = {
    0: "Worst",
    1: "Bad",
    2: "Weak",
    3: "Good",
    4: "Strong"
  }

  var password = document.getElementById('password');
  // var meter = document.getElementById('strengthMeter');
  var text = document.getElementById('password-text');

  password.addEventListener('input', function() {
    var val = password.value;
    var result = zxcvbn(val);

    // Update the password strength meter
    //meter.value = result.score;
    let colors = [ 
      { background: 'rgba(0, 0, 0, 0.1)'},
      { background: 'red' },
      { background: 'orange' },
      { background: 'yellow' },
      { background: 'green' }
    ]
    // console.log(result.score)
    $('#strengthMeter').css({width:(Number(result.score)*25)  + '%', 
    backgroundColor:colors[result.score].background})

    // Update the text indicator
    if (val !== "") {
      text.innerHTML = "Strength: " + strength[result.score]; 
    } else {
      text.innerHTML = "";
    }
  });

}, false);
