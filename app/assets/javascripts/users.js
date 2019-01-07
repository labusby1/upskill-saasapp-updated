/* global $, Stripe */
//Document ready 
$(document).on('turbolinks:load', function(){
  var theForm = $('#pro_form');
  var submitBtn = $('#form-submit-btn');
  
  //Set Stripe public key
  Stripe.setPublishableKey( $('meta[name="stripe-key"]').attr('content') );
  
  //When user clicks form submit button we will prevent default behaviour
  submitBtn.click(function(event){
    event.preventDefault();
    
    //Collect credit card fields
    var ccNum = $('#card_number').val(),
        cvcNum = $('#card_code').val(),
        expMonth = $('#card_month').val(),
        expYear = $('#card_year').val();
        
    //Send credit card fiekds to Stripe
    Stripe.createToken({
      number: ccNum,
      cvc: cvcNum,
      exp_month: expMonth,
      exp_year: expYear
      
    }, stripeResponseHandler);
  });
  
  
  //Stripe returns a card token
  //Inject card token as hidden field in form
  //Then we continue with form submition

});