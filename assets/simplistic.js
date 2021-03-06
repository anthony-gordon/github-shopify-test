function handleFirstTab(e) {
    if (e.keyCode === 9) { // tab
        document.body.classList.add('user-is-tabbing');
        window.removeEventListener('keydown', handleFirstTab);
    }
}
window.addEventListener('keydown', handleFirstTab);

$(function() {
  	/* Reduced motion: Replace slideToggle(), slideDown(), slideUp() with toggle(), show(), hide() */
  	var oSlideToggle = jQuery.fn.slideToggle;
    jQuery.fn.slideToggle = function() {
      if(Simplistic.reducedMotion()){
       	return jQuery.fn.toggle.apply(this, arguments); 
      }else{
      	return oSlideToggle.apply(this, arguments);
      }
    };
    var oSlideDown = jQuery.fn.slideDown;
    jQuery.fn.slideDown = function() {
      if(Simplistic.reducedMotion()){
       	return jQuery.fn.show.apply(this, arguments); 
      }else{
      	return oSlideDown.apply(this, arguments);
      }
    };
    var oSlideUp = jQuery.fn.slideUp;
    jQuery.fn.slideUp = function() {
      if(Simplistic.reducedMotion()){
       	return jQuery.fn.hide.apply(this, arguments); 
      }else{
      	return oSlideUp.apply(this, arguments);
      }
    };
  	/* End of Reduced Motion */
  
  	jQuery.fn.sortDomElements = (function() {
        return function(comparator) {
            return Array.prototype.sort.call(this, comparator).each(function(i) {
                  this.parentNode.appendChild(this);
            });
        };
    })();
  
  	if(!isMobile.any) {
      $('body').addClass('isNotMobile'); 
    }

  	$(document).on("click", ".quantity-box .minus", function(e) {
      	e.preventDefault();
      	var wrapper = $(this).parent();
    	try {
          wrapper.find('input[type=number]').get(0).stepDown();
          wrapper.find('input[type=number]').change();
        } catch(e) {
          var value = (parseInt(wrapper.find('input[type=number]').val())-1);
          wrapper.find('input[type=number]').val((value>=0 ? value : 0));
          wrapper.find('input[type=number]').change();
        }
  	});
  	$(document).on("click", ".quantity-box .plus", function(e) {
      e.preventDefault();
      	var wrapper = $(this).parent();
    	try {
          wrapper.find('input[type=number]').get(0).stepUp();
          wrapper.find('input[type=number]').change();
        } catch(e) {
          var value = (parseInt(wrapper.find('input[type=number]').val())+1);
          wrapper.find('input[type=number]').val(value);
          wrapper.find('input[type=number]').change();
        }
  	});
  
    $(document).on('click', '.chat-trigger', function(e){
      e.preventDefault();
      GorgiasChat.open();
      return false;
    });

    $(document).on('click', '.hover-tooltip', function(e){
      if(isMobile.any || window.innerWidth < 900){
        e.preventDefault();
        $(this).toggleClass('active');
      }
    });
  
    $(document).on('keydown', '.hover-tooltip:focus', function(e){
      if (e.which == 32) { //Spacebar
        $(this).toggleClass('active');
      }
      if (e.which == 13) { //Enter
        $(this).toggleClass('active');
      }
    });
  
   var arrayVariantsOption0=[];
  var targetIdOption0 = [];

    console.log(arrayVariantsOption0);

  
        $('input[type=radio][name=option-0]').change(function(e) {
            let target0 = e.target;
          
            switch (target0.id) {
                case target0.id:
                while( arrayVariantsOption0.length > 0) {
     arrayVariantsOption0.pop();
}
                
                while( targetIdOption0.length > 0) {
     targetIdOption0.pop();
}
                     arrayVariantsOption0.push(target0.value);
                targetIdOption0.push(target0.id);
                if(document.querySelector('.product-wrap .addons')){
                  document.querySelector('.product-wrap .addons').style.display="block";
                }
                
                if(target0.value == 'Light Blue'){
                  if(document.querySelector('.product-wrap .addons')){
                    document.querySelector('.product-wrap .addons').style.display="none";
                  }
                }
                    break;
            
            }
          
        });
  
  
  var arrayVariantsOption1=[];
  var targetIdOption1 = [];

  console.log(arrayVariantsOption1);
  
        $('input[type=radio][name=option-1]').change(function(e_one) {
            let target1 = e_one.target;
          
            switch (target1.id) {
                case target1.id:
                while( arrayVariantsOption1.length > 0) {
     arrayVariantsOption1.pop();
}
                
                while( targetIdOption1.length > 0) {
     targetIdOption1.pop();
}
                     arrayVariantsOption1.push(target1.value);
                targetIdOption1.push(target1.id);
                if(document.querySelector('.product-wrap .addons')){
                 document.querySelector('.product-wrap .addons').style.display="block";
                }
                
                if(target1.value == 'Light Blue'){
                  if(document.querySelector('.product-wrap .addons')){
                     document.querySelector('.product-wrap .addons').style.display="none";
                  }

                }
                    break;
            
            }
          
        });
  

  	/********* QUICK VIEW *********/
    var quickView = function(element, trigger) {
      
      var url = element.data('url');
      $('#loading-overlay').show();

      $.ajax({
        url: url,
        cache: false
      }).success(function(data){
        $('#loading-overlay').hide();
        Simplistic.openModal(data, 'quick-view');
        
        if (trigger === "quick-view-link") {
          // as of now only used for the addon quick view
          var addonId = element.data('addon-id');
          var addonPrice = element.data('addon-price');
          var soldOutButton = `<div class="content-soldout hide" style="width:100%"><span class="btn" disabled>NOT AVAILABLE</span></div>`;
          var instockButton = `<div class="content-available" style="width:100%"><span onclick="document.getElementById('addon-${addonId}').checked = true;$('#addon-${addonId}').trigger('change');var variantId = document.getElementById('product-${addonId}-variant').value;if (document.getElementById('addonvariant-'+variantId)){document.getElementById('addonvariant-'+variantId).checked = true;$('#addonvariant-'+variantId).trigger('change');}modal.close();" class="btn">ADD TO CART +${Shopify.formatMoney(addonPrice, Simplistic.formatMoney).replace('.00', '').replace(' ','')}</span></div>`;
		  $('.quick-view .qty-btn-wrap').removeClass( "flex flex-wrap" ).hide();
          $('.quick-view .addon-add-btn').html(soldOutButton + instockButton)
          $('.quick-view .product-clyde-quick-view').hide();
          
           if(arrayVariantsOption0[0]=='Gray'){
          
            document.querySelector('input#swatch-4808981479459-0-gray-').click();
          }
          
            if(arrayVariantsOption0[0]=='Black'){
          
            document.querySelector('input#swatch-4808981479459-0-black-').click();
          
          }
          
           if(arrayVariantsOption1[0]=='White'){
          
            document.querySelector('input#swatch-4808981479459-1-white-').click();
          }
          
          
        }
        else {
          var variant_id = $('.quick-view .product-clyde-quick-view').data('variant-id');
          Clyde.setActiveProduct(variant_id);
          loadClydeContractQuickview(variant_id);
          $('.quick-view .product-clyde-quick-view .clyde-pdp').on('click', function(e){
              showClydeModal(false);
          });

          $('.quick-view #add-to-cart-button').on('click', function(e){
          if (!Clyde.getActiveProduct() || Clyde.getActiveProduct().contracts.length === 0) {
              return true; 
            }
            // Coverall solution to prevent this site's other ATC behavior while we perform the contract adds or modal actions.
            e.preventDefault();
            e.stopPropagation();
              showClydeModal(true);
          });
        }
      });
      return false;
    }
  	$(document).on('click', '.product-item .quick-view-btn', function(){
      quickView($(this))
    });
    $(document).on('click', '.addons:not(.new) .quick-view-link', function(){
      quickView($(this), "quick-view-link")
    });

    //for new template
    
    $(document).on('click', '.addons.new .item .quick-view-link', function(e){
      e.preventDefault();
      var scope = $(this);
      var input = $('#addon-'+scope.data('addon-id'));
      if(!input.is(':checked')){
        quickView($(this), "quick-view-link")
      }else{
        input.prop('checked', false).trigger('change');
      }
    
  });

  	if($('#side-cart').length > 0) {
    	initSideCart();
  	}$('body').delegate('.add-to-cart-form', 'submit', function(){
            if(validateAddCart($(this))) {
              console.log("THIS: ", $(this));
              addToCart($(this));
            }
            return false;
        });$(window).scroll($.throttle(15, function(){
      if($(this).scrollTop()<=200) {
        $('.scrollup').fadeOut();
      } else {
        $('.scrollup').fadeIn();
      }if( $(this).scrollTop()>=80 ) {
          $('.header-drop').addClass('scroll');
        } else {
          $('.header-drop').removeClass('scroll');
        }}));

    $('.header-drop .main-menu').html($('#header .main-menu').html());
    $('.header-drop .main-menu a').attr({'focusable':'false','tabindex':'-1','aria-hidden':'true'});
  	setupDropdownMenus();
  
    if($(window).width() < 601){
      $('.responsive-table-wrapper').scroll(function(){
        if($(this).scrollLeft() > 20){
          $('.responsive-table-shadow').addClass('middle');
        }else{
          $('.responsive-table-shadow').removeClass('middle');
        }
        if($(this).scrollLeft() > (500 - $(window).width())){
          $('.responsive-table-shadow').addClass('end');
        }else{
          $('.responsive-table-shadow').removeClass('end');
        }
      });
    }
});

function setupDropdownMenus(){
  var config = {
    over: function () {
      $(this).find('.submenu:first').slideDown();
    }, 
    timeout: 400, 
    out: function () {
      $(this).find('.submenu:first').slideUp();
    }
  };
  $('.main-menu .has-dropdown').hoverIntent(config);

  $(document).on('keydown', '.main-menu .has-dropdown a:focus', function(e){
    if (e.which == 32) { //Spacebar
      e.preventDefault();
      $(this).next().slideToggle();
    }
    if (e.which == 40) { //Arrow Down
      e.preventDefault();
      $(this).next().slideDown();
    }
    if (e.which == 38) { //Arrow Up
      e.preventDefault();
      $(this).next().slideUp();
    }
  });
  $(document).on('keydown', '.main-menu .has-dropdown .has-dropdown a:focus', function(e){
    if (e.which == 39) { //Arrow Right
      e.preventDefault();
      $(this).next().slideDown();
    }
    if (e.which == 37) { //Arrow Left
      e.preventDefault();
      $(this).next().slideUp();
    }
  });
}

function validateAddCart(form) {
  if(form.find('input[name=id]').val()=='') {
        var allOptionsSelected;
      	if(form.find('.single-option-selector').length > 0) {
            allOptionsSelected = true;
            form.find('.single-option-selector').each(function(){
                if($(this).val()=="") {
                    allOptionsSelected = false;
                    return false;
                }
            });
        } else {
          	allOptionsSelected = false;
        }
      	
      	if(allOptionsSelected) {
          	var errorMsg = form.find('.validation-msg').text();
          	if(errorMsg) {
          		alert(errorMsg);
            } else {
            	alert("The selected variant is sold out.");
            }
        } else {
        	var labels = [];
            form.find('.options label').each(function(key, obj){
                labels.push($(obj).text().replace(':', '').trim());
            });
            alert("You must select a "+labels.join('/')+".");
        }
      	return false;
    }
  	return true;
}

function initSideCart() {
	$('.header .cart-wrap').click(function(e){
      e.stopPropagation();
      setupClydeCartPrompts();
      showSideCart(true);
      return false;
    });

    $(document).click(function(event){
      if(!$(event.target).closest('#side-cart').length && $(event.target).attr('id')!="loading-overlay" && $('#side-cart').hasClass('open')) {
        hideSideCart();
      }
    });
}

// Old Cart

function addToCartQuickView(form, callback){
	$('#loading-overlay').show();
  	if(modal) modal.close();

  	var productJs = form.closest('.initialized').data('productjs');
  	if(productJs) {
    	$(document).trigger("addToCart", [productJs.getProduct(), productJs.getCurrentVariant(), form]);
    } else {
    	$(document).trigger("addToCart", [form]);
    }

	$.ajax({
		type: 'POST',
		url: '/cart/add.js',
		data: form.serialize(),
		dataType: 'json',
		error: addToCartFail,
      	success: function(){
          if(productJs) {
            $(document).trigger("addToCartSuccess", [productJs.getProduct(), productJs.getCurrentVariant(), form]);
          } else {
            $(document).trigger("addToCartSuccess", [form]);
          }
          	if(callback) {
          		callback();
            } else {
                addToCartSuccess();
            }
        },
		cache: false

	});
}

function addToCart (form) {
  var btn = document.getElementById("add-to-cart-button");
  var variants = [];
  var variantId = $(form).find('[name^=id]').val();
  var bundleVariants = $(form).find('input.bundle-products');
  var addonVariants = $('#addon-products-for-atc');
  var quantityCount = $(form).find(`input[name~='quantity']`).val() || 1;

  if (addonVariants.length) {
    var addons = JSON.parse(addonVariants.val() || '[]');
    addons.forEach(function(v){
      variants.push({variantId: v.variantId, quantity: 1, shipping: v.shipping})
    });
  }
  
  if (bundleVariants.length) {
    var bundles = JSON.parse(bundleVariants.val() || '[]');
    var bundleVariantsShipping = $(form).find('input.bundle-products-shipping');
    if (bundleVariantsShipping.length) {
      var shippingByVariantId = JSON.parse(bundleVariantsShipping.val() || '{}');
      bundles.forEach(function(v){
      	v.shipping = shippingByVariantId[v.variantId];
      })
    }
    bundles.forEach(function(v){
      variants.push({variantId: v.variantId, quantity: 1, shipping: v.shipping})
    }); 
  } else if (variantId)  {var shipping = document.querySelector('#plus-variant-shipping-processing-message').value;variants.push({variantId: variantId, quantity: 1, shipping: shipping});
  }

  if(variants.length > 0) {
    $('#loading-overlay').show();

    if(modal) modal.close();

    var queue = [];

    for (let i = 0; i < quantityCount; i++) {
      $.each(variants, function() {
        var child = this;
        
        queue.push({
          variantId: child.variantId,
          quantity: child.quantity,
          shippingMessage: child.shipping || ""
        });
      });
    }
    
    var errors = '';
    var addItem = function() {
      if(queue.length > 0) {
        var item = queue.shift();
        
        $.ajax({
          type: 'POST',
          url: '/cart/add.js',
          data: {id: item.variantId, quantity: item.quantity, properties: {'Ship date': item.shippingMessage}},
          dataType: 'json',
        }).error(function(jqXHR, textStatus, errorThrown){
          var response = $.parseJSON(jqXHR.responseText);
          errors += response.description + '<br />';
        }).always(function(){
          addItem();
        });
      } else {
        if (errors!='') { //mobile doesn't have a close button
          $('#loading-overlay').hide();
          modal = new tingle.modal({
              closeMethods: ['overlay', 'button', 'escape'],
              closeLabel: "Close",
              cssClass: ['message'],
              //onClose: event currently broken
              beforeClose: function(){
                $('#loading-overlay').show();
                addToCartSuccess();
                return true;
              }
            });
          modal.setContent('<div class="error-itemincart"><i class="close animation lnr lnr-cross-circle" onclick="modal.close();"></i>'+errors+'</div>');
          modal.open();
        } else {
          addToCartSuccess();
        }
      }
    }
    addItem();
  } else if (variantId) {var shipping = document.querySelector('#plus-variant-shipping-processing-message').value;var serializedArray = form.serializeArray();
    serializedArray.push({
      "name": "properties[Ship date]",
      "value": shipping || ""
    });
    $('#loading-overlay').show();
      if(modal) modal.close();
    $.ajax({
      type: 'POST',
      url: '/cart/add.js',
      data: serializedArray,
      dataType: 'json',
      error: addToCartFail,
      success: addToCartSuccess,
      cache: false
    });

  }
}

function addToCartSuccess(jqXHR, textStatus, errorThrown){
	updateCartDesc(true);
}

function addToCartFail(jqXHR, textStatus, errorThrown){
  	var response = $.parseJSON(jqXHR.responseText);
  	$('#loading-overlay').hide();
  	Simplistic.openModal('<div class="error-itemincart">'+response.description+'</div>', 'message');
}

function updateCartDesc(openSideC){
  	$.ajax({
		type: 'GET',
		url: '/cart?view=side-cart',
		cache: false,
      	success: function(data){
          $('#loading-overlay').hide();

          var animate = true;
          if($('#side-cart').width()>0 && $('#side-cart').hasClass('open')) {
            animate = false;
          }
          $('#side-cart').remove();
          $('#page').append(data);
          if(modal) modal.close();
          setupClydeCartPrompts();
          if(openSideC){
            showSideCart(animate);
          }
      	}
	});
}

function showSideCart(animate) {
  $('body, html').css({overflow: 'hidden'});
  $('#page').addClass('mode-overlay');
  if(animate) {
    setTimeout(function(){$('#side-cart').addClass('open')}, 100);
  } else {
    $('#side-cart').removeClass('ease-animation-slow');
  	$('#side-cart').addClass('open');
    setTimeout(function(){$('#side-cart').addClass('ease-animation-slow')}, 200);
  }
  Simplistic.trapFocus({
    $container: $('#side-cart'), 
    namespace: 'side-cart'
  });
}

function hideSideCart() {
  $('#side-cart').removeClass('open');
  $('#page').removeClass('mode-overlay');
  $('body, html').css({overflow: ''});
  Simplistic.removeTrapFocus({
    $container: $('#side-cart'), 
    namespace: 'side-cart'
  });
}

function setupClydeCartPrompts() {
  if (!window.Clyde.checkReady()) {
    return;
  }
  var clydeVariants = [];
  var clydeVariantIds = [];
  
  var cartRows = $('.clyde-cart-prompt-container');
  
  $.each(cartRows, function(index, itemRow) {
    if($(itemRow).data('item-type') == 'product'){
      var itemVariantId = $(itemRow).data('item-variant-id');
      var itemQty = $(itemRow).data('item-quantity');
      var productName = $(itemRow).data('item-title').replace(' - ',' ').trim();
      clydeVariants.push({
        id: itemVariantId,
        qty : itemQty,
        name: productName
      });
      
      clydeVariantIds.push(itemVariantId);
    }
    
  });
  window.Clyde.loadContractsForProductList(clydeVariantIds);
  
  clydeVariants.forEach(function(variant) {
    var promptSelector = '.clyde-cart-prompt-container-' + variant.id;
    var productName = variant.name;
    var countContractInCart = 0;
    $.each($('[data-cart-clyde-contract]'), function(index, contractItem) {
      var contractName = $(contractItem).data('item-title').trim();
          if(contractName.includes(productName)){
            countContractInCart = 1; 
            return false;
          }
    });
    
    if (countContractInCart == 0) {
      
      $(promptSelector).html('');
      window.Clyde.appendToSelectorWithSku(variant.id, promptSelector, function() { closeModalCb(variant.qty) });
    }
    
      
    
  });
  
  function closeModalCb(qty) {
        var contract = window.Clyde.getSelectedContract();
        if (contract) {
          $.ajax({
            type: 'POST',
            url: '/cart/add.js',
            data: {
              id: contract.shopifyVariantId,
              quantity: qty
            },
            dataType: 'json',
            success: function(){
              if($('#side-cart').length > 0) {
              	updateCartDesc(true);
              }else{
               window.location.reload();
              }
              	//showSideCart(true);
            	//window.location.reload();
            },
            error: function(){
             	updateCartDesc(true);
              
            }
          });
        }
      };
  
}
function removeClydeCart(evt){
  	if ( $(evt.currentTarget).is( "button" ) 
        || $(evt.currentTarget).is( "input" ) 
       || $(evt.currentTarget).is( "a" ) ) {
      var $remove = $(evt.currentTarget);
      var productName = $remove.data('item-title').replace(' - ',' ').trim();
      var itemVariantId = $remove.data('item-variant-id');
      var removeItems = {};
      removeItems[itemVariantId] = 0;
      
      if($remove.data('item-type') != 'contract'){
        
        $.each($('[data-cart-remove-contract]'), function(index, contractItem) {
          var contractName = $(contractItem).data('item-title').trim();
          if(contractName.includes(productName)){
            var contractVariantId = $(contractItem).data('item-variant-id');
            removeItems[contractVariantId] = 0;
            $('#updates_' + contractVariantId).val(0);
          }
        });
        
      }
/*
      $.post('/cart/update.js', {updates: removeItems},'json').done(function() {
          //location.reload();
      }).fail(function() {
          //location.reload();
      }); 
      */
    }
  	
}
function updateClydeCart(evt){
  if ($(evt.currentTarget).is( "input" ) ) {
    var $input = $(evt.target);
      var itemIndex = $input.data('quantity-item');
      var item_qty = $input.val();
      var itemVariantId = $input.data('item-variant-id');
      var updateItems = {};
      var needUpdate = false;

      //updateItems[itemVariantId] = item_qty;
      
      if($input.data('item-type') != 'contract'){
        var productName = $input.data('item-title').trim().replace(' - ',' ').trim();
        $.each($('[data-quantity-input-contract]'), function(index, contractItem) {
          
          var contractName = $(contractItem).data('item-title').trim();
          if(contractName.includes(productName)){
			var contractQty = $(contractItem).val();
            var contractVariantId = $(contractItem).data('item-variant-id');
            if(contractQty > item_qty){
              $(contractItem).val(item_qty);
              return false;
            }
          }
        })
        
      }else{
        
        var contractName = $input.data('item-title').trim();
        $.each($('[data-quantity-input-product]'), function(index, productItem) {
          var productName = $(productItem).data('item-title').trim().replace(' - ',' ').trim();
          if(contractName.includes(productName)){
            var productQty = $(productItem).val();
            if(item_qty > productQty){
              $input.val(productQty);
              return false;
            }
            
            return false;
          }
        });
        
      }
    
  }
  	  return;
}

window.SimplisticJS = function (){
  this.formatMoney = "$ \{\{amount\}\}";
  this.beforeTrapFocus = false;
  
  /**
   * Traps the focus in a particular container
   *
   * @param {object} options - Options to be used
   * @param {jQuery} options.$container - Container to trap focus within
   * @param {jQuery} options.$elementToFocus - Element to be focused when focus leaves container
   * @param {string} options.namespace - Namespace used for new focus event handler
   */
  this.trapFocus = function(options) {
    this.beforeTrapFocus = $(':focus');
    var eventName = options.namespace
      ? 'focusin.' + options.namespace
      : 'focusin';

    if (!options.$elementToFocus) {
      options.$elementToFocus = options.$container;
    }

    options.$container.attr('tabindex', '-1');
    options.$elementToFocus.focus();

    $(document).on(eventName, function(evt) {
      if (
        options.$container[0] !== evt.target &&
        !options.$container.has(evt.target).length
      ) {
        options.$container.focus();
      }
    });
  },

  /**
   * Removes the trap of focus in a particular container
   *
   * @param {object} options - Options to be used
   * @param {jQuery} options.$container - Container to trap focus within
   * @param {string} options.namespace - Namespace used for new focus event handler
   */
  this.removeTrapFocus = function(options) {
    var eventName = options.namespace
      ? 'focusin.' + options.namespace
      : 'focusin';

    if (options.$container && options.$container.length) {
      options.$container.removeAttr('tabindex');
    }
    if(this.beforeTrapFocus) {
    	this.beforeTrapFocus.focus();
      	this.beforeTrapFocus = false;
    }

    $(document).off(eventName);
  }
  
  this.handleize = function (str) {
    //source https://gist.github.com/dlindenkreuz/a439ec4b939f0561d6d9
    return str.toLowerCase().replace(/[^\w\u00C0-\u024f]+/g, "-").replace(/^-+|-+$/g, "");
  };
  
  this.reducedMotion = function() {
  	return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  };

  this.getQueryParam = function(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

  this.randomstring = function(L){
    var s= '';
    var randomchar=function(){
      var n= Math.floor(Math.random()*62);
      if(n<10) return n; //1-10
      if(n<36) return String.fromCharCode(n+55); //A-Z
      return String.fromCharCode(n+61); //a-z
    }
    while(s.length< L) s+= randomchar();
    return s;
  }

  this.validateEmail = function(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
  }

  this.openModal = function(content, css) {
    modal = new tingle.modal({
      closeMethods: ['overlay', 'button', 'escape'],
      closeLabel: "Close",
      cssClass: [css]
    });
    modal.setContent(content);
    modal.open();
  }

  this.onImagesLoaded = function(images, callback){
    var imagesLoaded = 0;
    var loadFunction = function() {
      imagesLoaded++;
      if(imagesLoaded==images.length) {
        callback();
      }
    };
    images.each(function(){
      var img = new Image();
      img.onload = loadFunction;
      img.onerror = loadFunction;
      img.src = $(this).attr('src');
    });
  };
};
window.Simplistic = new SimplisticJS();

!function(i){"use strict";i.fn.equalHeight=function(){var t=[];return i.each(this,function(e,n){var r,s=i(n);r="border-box"===s.css("box-sizing")||"border-box"===s.css("-moz-box-sizing")?s.innerHeight():s.height(),t.push(r)}),this.css("height",Math.max.apply(window,t)+"px"),this},i.fn.equalHeightGrid=function(t){var e=this.filter(":visible");e.css("height","auto");for(var n=0;n<e.length;n++)if(n%t==0){for(var r=i(e[n]),s=1;s<t;s++)r=r.add(e[n+s]);r.equalHeight()}return this},i.fn.detectGridColumns=function(){var t=0,e=0;return this.filter(":visible").each(function(n,r){var s=i(r).offset().top;if(0!==t&&s!==t)return!1;e++,t=s}),e};var t=0;i.fn.responsiveEqualHeightGrid=function(){var e=this,n=".grids_"+t;function r(){var i=e.detectGridColumns();e.equalHeightGrid(i)}return e.data("grids-event-namespace",n),i(window).bind("resize"+n+" load"+n,r),r(),t++,this},i.fn.responsiveEqualHeightGridDestroy=function(){return this.css("height","auto"),i(window).unbind(this.data("grids-event-namespace")),this}}(window.jQuery);

$('.c-fcp-section .c-fcp-slider .c-fcp-vendor').equalHeight();
// $('.c-t-flex-item .c-t-flex-item-2 .c-t-flex-item-2-content').equalHeight();
// $('.c-lwt-flex-container .c-lwt-flex-item .c-lwt-img-container').equalHeight();