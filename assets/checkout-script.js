(function ($){
  $(document).on("page:load page:change", function() {
    $('[data-step-footer] .step__footer__previous-link').remove(); //removed return to cart link
    $('.address-fields [data-address-field="last_name"]').removeClass('field--half');
    if( $('.breadcrumb .breadcrumb__item').length == 4 ){
      $('.breadcrumb').addClass('breadcrumb_count_4');
    }
    if( $('.breadcrumb .breadcrumb__item').length == 3 ){
      $('.breadcrumb').addClass('breadcrumb_count_3');
    }
    if (Shopify.Checkout.step === "contact_information") {
      $("#continue_button span").html("Proceed to pay");
      $('[data-address-field="first_name"]').remove();
      $('[data-address-field="address2"]').remove();
      var _zipInput = $('[data-address-field="zip"]').remove();
      $('[data-address-field="country"]').before(_zipInput);
      $('.address-fields [data-address-field="city"]').removeClass('field--third').addClass('field--half');
      $('.address-fields [data-address-field="province"]').removeClass('field--third').addClass('field--half');
      $('.address-fields [data-address-field="zip"]').removeClass('field--third');

      $('body').on('keyup', '#checkout_shipping_address_zip', function(){
        var _t = $(this);
        var _pincode = _t.val();
        autofillCity(_pincode);
        if(_pincode.length == 6){
          _t.parent().parent().find('.checkout_error').html('');
        }
      });
      function autofillCity(pincode){
        $.get("https://maps.googleapis.com/maps/api/geocode/json?address="+pincode+"&sensor=true&key=AIzaSyBZVtLb8Om9gjbNV-SptZhk5iAtnGCjdNA", function(data, status){
          var data_pincodes = data.results[0].address_components;
          var data_pincodes_length = data_pincodes.length;
          var city_new = data_pincodes[data_pincodes_length - 3].long_name;
          var state_new = data_pincodes[data_pincodes_length - 2].long_name;
          var country_new = data_pincodes[data_pincodes_length - 1].long_name;
          var match_state_new;
          $("#checkout_shipping_address_province option").each(function(){
            var select_val = $(this).text();  
            if(select_val == state_new ) {
              match_state_new = $(this).val();
              return;
            }          
          });
          $('#checkout_shipping_address_province').val(match_state_new).change();            
          $('#checkout_shipping_address_city').val(city_new);
        });
      }

      // checkout field validation
      $("input").attr("autocomplete","none");
      $('.field').prepend('<p class="checkout_error"></p>'); 
          $('.step__sections .field__input-wrapper input').keyup(function(){
            field_validate($(this));
            validateContinue();
          });
          validateContinue();
          function validateContinue(){
            var checkInputField = true;
            $('.step__sections .field__input-wrapper input').each(function(){
              var inputVal = $(this).val();
              var inputPlace = $(this).attr('placeholder');
                if(inputVal == '' ){
                  checkInputField = false;
                }
            });
            if(checkInputField == false){
              $('#continue_button').addClass('disabled_checkout');
            }
            if(checkInputField == true){
              $('#continue_button').removeClass('disabled_checkout');
            }
            console.log(checkInputField);
          }
          
          $('.field__input').focusout(function(){
            $('.field__message--error').hide();
            $(this).attr('type', 'text');
            field_validate($(this));
          });

          function field_validate(field){
            $('#checkout_shipping_address_id').parents('.field--show-floating-label').find('.checkout_error').css('display','none');
            if(field.val() == ""){
              var label = field.parent().find('label').text();
              field.css({"border":"1px solid #fb1818"});
              field.parent().parent().find('.checkout_error').html('<i class="fa fa-exclamation-circle"></i> Please enter your '+label);
            }else{
              /*-----------validate input fields--------*/
              var email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
              var phone_regex = /^[6789][0-9]{4}([ ]?)[0-9]{5}$/;
              var pin_regex = /^[1-9][0-9]{5}$/;
              var name_regex = /^[ A-Za-z0-9_@./#&+-,-]*$/;
              var field_id = field.attr('id');
              if(field_id == 'checkout_shipping_address_phone' && !phone_regex.test(field.val().replace(/\s/g,''))){
                $('#continue_button').addClass('disabled_checout-new');
                field.parent().parent().find('.checkout_error').html('<i class="fa fa-exclamation-circle"></i> Enter 10 digits valid phone number');
              }else if(field_id == 'checkout_email_or_phone' && !email_regex.test(field.val())){
                $('#continue_button').addClass('disabled_checout-new');
                field.parent().parent().find('.checkout_error').html('<i class="fa fa-exclamation-circle"></i> Please enter valid email address');
              }else if(field_id == 'checkout_shipping_address_first_name' && !name_regex.test(field.val())){
                field.val("");
                field.parent().parent().find('.checkout_error').html('<i class="fa fa-exclamation-circle"></i> Please enter valid Alphabet');
              } else if(field_id == 'checkout_shipping_address_last_name' && !name_regex.test(field.val())){
                field.val("");
                field.parent().parent().find('.checkout_error').html('<i class="fa fa-exclamation-circle"></i> Please enter valid Alphabet');
              }else if(field_id == 'checkout_shipping_address_address1' && !name_regex.test(field.val())){
                field.val("");
                field.parent().parent().find('.checkout_error').html('<i class="fa fa-exclamation-circle"></i> Please enter valid Alphabet');
              }else if(field_id == 'checkout_shipping_address_city' && !name_regex.test(field.val())){
                field.val("");
                field.parent().parent().find('.checkout_error').html('<i class="fa fa-exclamation-circle"></i> Please enter valid Alphabet');
              }else{
                $('#continue_button').removeClass('disabled_checout-new');
                field.css({"border-color":"#d9d9d9"});
                var this_div_attr = ($(field.parent().parent()).attr('data-address-field'));
                if(this_div_attr == 'zip'){
                }else{
                  field.parent().parent().find('.checkout_error').html('');
                }
              }
            }
            $('#checkout_shipping_address_id').css({"border":"1px solid #d9d9d9"});
          }
    }
        if (Shopify.Checkout.step === "shipping_method") {
          $(".loaderChekout").show();
          $(".loaderChekout-overlay").show();
          $('.section--shipping-method input').first().trigger("click");
          $('.step__footer__continue-btn').trigger('click');
        }
       if (Shopify.Checkout.step === "payment_method") {
          $(".loaderChekout").hide();
          $(".loaderChekout-overlay").hide();
       }
  });
})(Checkout.$)