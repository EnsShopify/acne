/*
* Broadcast Theme
*
* Use this file to add custom Javascript to Broadcast.  Keeping your custom
* Javascript in this fill will make it easier to update Broadcast. In order
* to use this file you will need to open layout/theme.liquid and uncomment
* the custom.js script import line near the bottom of the file.
*/

(function() {
  $('body').on('click', '.cart-item__remove, .cart__quantity button', function(){
    $('button.cart__checkout').css('pointer-events','none');
    
    setTimeout(function(){
      $('button.cart__checkout').css('pointer-events','painted');
    },3000);
  });
  // Add custom code below this line

  if( $(window).width() <= 748){
    $('.product-grid--mobile-slider').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      dots: true,
      autoplay: false
    });
  }
  $('body').on('click','.QuizstartBtn',function (e) {
    if( $(this).parents('.mainquizeintroBtmSlid').find('input').val() ){
      return true;
    }else{
      $(this).parents('.mainquizeintroBtmSlid').find('input').css('border-color','#ff0000');
      return false;
    }
  });
  $('.quizIntroInput').keyup(function(){
    $(this).css('border-color','#ccc');
  });
  $('body').on('click','.checkout__top',function(){
    $('button[name="checkout"]').click();
  });
  $('.payment_details').click(function(){
  $('.payment_inner').slideToggle();
  $(this).toggleClass('active_arrow');
  });
  $('.description_read_mr_btn').click(function(){
    $('html, body').animate({
      scrollTop: $(`[element-name="${$(this).attr('target-element')}"]`).offset().top - 80 }, 100);
  });

  $('body').on('click','.shop-by-stage-of-acne .navlink--grandchild, .shop-by-stage-of-acne .sub-menu-nav', function(e){
    e.preventDefault();
    var _href = $(this).attr('href');
    sessionStorage.setItem('pageDataUrl', null);
    sessionStorage.setItem('pageDataIndex', null);
    location.href = _href;
  });

  $('body').on('click','.faq_tabs_button', function(){
    $('.faq_tabs_button').not(this).removeClass('active');
    $(this).addClass('active');
    var dataClass = $(this).data('class');
    $('.faqs_all').css('display','none');
    $('.'+dataClass).css('display','block');
  });
if($(window).width() > 768){
  $('body').on('click','[data-quantity-plus]', function(){
    var qty = parseInt($(this).parent().find('.quantity__input').val());
      qty = qty + 1;
    $(this).parent().find('.quantity__input').val(qty);
  });
  $('body').on('click','[data-quantity-minus]', function(){
    var qty = parseInt($(this).parent().find('.quantity__input').val());
      qty = qty - 1;
    if(qty > 0){
    $(this).parent().find('.quantity__input').val(qty);
      }
  });
}
  if($(window).width() < 767){
    $('.sliderow_main_button').click(function(params) {
      $(this).parent().find('.mobile__menu__dropdown_11').slideToggle();
    });
  }
  $('body').on('click','.cart__checkout', function(e) {
    $('.loaderChekout').css('display','block');
    $('.loaderChekout-overlay').css('display','block');
    var tprice = $('[data-cart-total]').attr('sub-total');
    // console.log('tprice',tprice);
    // $.getJSON('/cart', function(cart){
      if(tprice < 150000){
        $.ajax({
         type: 'POST',
         url: '/cart/update.js',
         data: {
           updates:{
            "43324853485805":1,
            "43324857975021":0
            }
          },
          dataType: 'json',
          async:false,  
          success: function(params) {
            location.href = '/checkout';
          }
        });
      }else{
        $.ajax({
         type: 'POST',
         url: '/cart/update.js',
         data: {
           updates:{
            "43324853485805":1,
            "43324857975021":1
          }
         },
        dataType: 'json',
        async:false,  
          success: function(params) {
            location.href = '/checkout';
          }
      });
    }
  // });
  //   // For Gtag begin_checkout event
  //   let gtag_items_count = $(this).parents('#cart-dropdown').find('#cart_item_count').val();  
  //   let gtag_atc_price = $(this).parents('.cart__foot-inner').find('.cart__total [data-cart-total]').text().replace('₹','').trim();  
  //   gtag_begin_checkout(gtag_items_count,gtag_atc_price);
  });
  //   // function for Gtag Event 22/09/2022
  //    function gtag_add_to_cart(item_id,price) {
  //         gtag('event', 'add_to_cart', {
  //           'send_to': 'G-C1KL70NW4X',
  //           'value': price,
  //           'item_id': item_id,
  //           'currency': 'INR'
  //         });
  //       }
  //    function gtag_begin_checkout(items,price) {
  //       gtag('event', 'begin_checkout', {
  //         'send_to': 'G-C1KL70NW4X',
  //         'value': price,
  //         'item_count': items,
  //         'currency': 'INR'
  //       });
  //     }
  //    function gtag_view_item(item_id,price) {
  //       gtag('event', 'view_item', {
  //         'send_to': 'G-C1KL70NW4X',
  //         'value': price,
  //         'item_id': item_id,
  //         'currency': 'INR'
  //       });
  //     }
  //    function gtag_remove_from_cart(item_id,price) {
  //       gtag('event', 'remove_from_cart', {
  //         'send_to': 'G-C1KL70NW4X',
  //         'value': price,
  //         'item_id': item_id,
  //         'currency': 'INR'
  //       });
  //     }
  // $('body').on('click','[data-quick-add-button]', function(){
  //   // For gtag ATC >> 22/09/2022
  //   // console.log("add_to_cart");
  //   let gtag_atc_vid = $(this).attr('variant_id');  
  //   let gtag_atc_price = $(this).attr('product_price').replace('₹','').trim();  
  //   gtag_add_to_cart(gtag_atc_vid,gtag_atc_price);
  // });
  // $('body').on('click','.product__submit__item [data-add-to-cart]', function(){
  //   // console.log("add_to_cart");
  //   let gtag_atc_vid = $(this).attr('variant_id');  
  //   let gtag_atc_price = $(this).attr('product_price');  
  //   gtag_add_to_cart(gtag_atc_vid,gtag_atc_price);
  // });
  // $('body').on('click','.product-item__image .product-link,.mainHomeNewFlxTTLPRice .product-link,.product_title-price .cstmcollTlLink', function(){
  //     let prod_id = $(this).attr('product_id');
  //     let prod_price = $(this).attr('product_price');
  //     gtag_view_item(prod_id,prod_price);
  // });  
  // $('body').on('click','.cart-item__remove,.cart__quantity-minus', function(){
  //   let gtag_prodId = $(this).attr('product_id');  
  //   let gtag_prodPrice = $(this).parents('.cart-item__content').find('.cart__price').text().replace('₹','').trim();  
  //   gtag_remove_from_cart(gtag_prodId,gtag_prodPrice);
  // });
  $('body').on('click','.quizeintonxtback .QuizstartBtn', function(){
    let quizUsername = $('.quizIntroInput').val();
    if(quizUsername.trim() !== ''){
      gtag('event', 'Quiz Start', {
        'send_to': 'AW-10987954470/8wxFCLfbjIAYEKbCu_co'
      });
    }
  });
  $('body').on('click','.mainQuesQuizBtnSubMitBtn', function(){
    gtag('event', 'Quiz Submit', {
      'send_to': 'AW-10987954470/zVkYCMTZjIAYEKbCu_co'
    });
  });
//  _________________________ MAX LIMIT ________________________________________ 
  if(window.theme.showMaxLimit){
    $('.quantity__plus').click(function(){
      var max_limit = parseInt(window.theme.MaxLimit);
      var Val = $(this).parent().find('input[name=quantity]').val();
      if(Val >= max_limit){ 
        $(this).parent().find('input[name=quantity]').val(max_limit - 1);
        $(this).closest('form').parent().find('.dis_error-msg').html(window.theme.error_MaxLimit);
      }else{
        $(this).closest('form').parent().find('.dis_error-msg').html(" ");
      }
    });
    $('.quantity__minus').click(function(){
      $(this).closest('form').parent().find('.dis_error-msg').html(" ");
    });
  }
})();

