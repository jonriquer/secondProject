document.addEventListener('DOMContentLoaded', () => {
  console.log('Now on SignUp Page')

  var strength = {
    0: "Worst",
    1: "Bad",
    2: "Weak",
    3: "Good",
    4: "Strong"
  }

  var password = document.getElementById('password');
  var strengthText = document.getElementById('strengthText');

  password.addEventListener('input', function() {
    var val = password.value;
    var result = zxcvbn(val);

    // Update the password strength meter
    let colors = [ 
      { background: 'rgba(0, 0, 0, 0.1)'},
      { background: 'red' },
      { background: 'orange' },
      { background: 'yellow' },
      { background: 'green' }
    ]
    
    $('#strengthMeter').css({width:(Number(result.score)*25)  + '%', 
    backgroundColor:colors[result.score].background})

    // Update the text indicator
    if (val !== "") {
      strengthText.innerHTML = "Strength: " + strength[result.score]; 
    } 
  });

}, false);
