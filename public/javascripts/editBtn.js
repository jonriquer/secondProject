$('.editBtn').click(function(e){

  let identification = $(this).parent().parent().find('.identification').text()
  // console.log(identification);
  $('#identification').val(identification)

  let shares = $(this).parent().parent().find('.shares').text()
  // console.log(shares)
  $('#shares').val(shares)

  let ticker = $(this).parent().parent().find('.ticker').text()
  // console.log(ticker)
  $('#ticker').val(ticker)

  let price = $(this).parent().parent().find('.price').text()
  // console.log(price)
  $('#price').val(price)
})
// console.log('adfsda')