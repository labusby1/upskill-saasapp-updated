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
    submitBtn.val("Processing").prop('disable', true);
    
    //Collect credit card fields
    var ccNum = $('#card_number').val(),
        cvcNum = $('#card_code').val(),
        expMonth = $('#card_month').val(),
        expYear = $('#card_year').val();
        
    //Use js library to check for card errors
    var error = false;
    
    //validate card number
    if(!Stripe.card.validateCardNumber(ccNum)){
      error = true;
      alert('The credit card number seems to be invalid.')
    }
    
    //validate cvc 
    if(!Stripe.card.validateCVC(cvcNum)){
      error = true;
      alert('The CVC number seems to be invalid.')
    }
    
    //validate experiation date 
    if(!Stripe.card.validateExpiry(expMonth, expYear)){
      error = true;
      alert('The card experiation date seems to be invalid.')
    }
    
        
    if (error) {
      submitBtn.prop('diable', false).val("Sign Up");
      //don't send to stripe
    } else {
      Stripe.createToken({
        number: ccNum,
        cvc: cvcNum,
        exp_month: expMonth,
        exp_year: expYear
        
        }, stripeResponseHandler);
    }
    //Send credit card fiekds to Stripe
    
    return false;
  });
  
  //Stripe returns a card token
  function stripeResponseHandler(status, response) {
    //Get the token from the response
    var token = response.id;
    
    //Inject card token as hidden field in form
    theForm.append($('<input type = "hidden" name = "user[stripe_card_token]">').val(token));
    
    //Then we continue with form submition
    theForm.get(0).submit();
  }
});