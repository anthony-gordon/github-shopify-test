// Shopify option_selection.js
function floatToString(t,e){var o=t.toFixed(e).toString();return o.match(/^\.\d+/)?"0"+o:o}"undefined"==typeof window.Shopify&&(window.Shopify={}),Shopify.each=function(t,e){for(var o=0;o<t.length;o++)e(t[o],o)},Shopify.map=function(t,e){for(var o=[],i=0;i<t.length;i++)o.push(e(t[i],i));return o},Shopify.arrayIncludes=function(t,e){for(var o=0;o<t.length;o++)if(t[o]==e)return!0;return!1},Shopify.uniq=function(t){for(var e=[],o=0;o<t.length;o++)Shopify.arrayIncludes(e,t[o])||e.push(t[o]);return e},Shopify.isDefined=function(t){return void 0!==t},Shopify.getClass=function(t){return Object.prototype.toString.call(t).slice(8,-1)},Shopify.extend=function(t,e){function o(){}o.prototype=e.prototype,t.prototype=new o,t.prototype.constructor=t,t.baseConstructor=e,t.superClass=e.prototype},Shopify.locationSearch=function(){return window.location.search},Shopify.locationHash=function(){return window.location.hash},Shopify.replaceState=function(t){window.history.replaceState({},document.title,t)},Shopify.urlParam=function(t){var e=RegExp("[?&]"+t+"=([^&#]*)").exec(Shopify.locationSearch());return e&&decodeURIComponent(e[1].replace(/\+/g," "))},Shopify.newState=function(t,e){return(Shopify.urlParam(t)?Shopify.locationSearch().replace(RegExp("("+t+"=)[^&#]+"),"$1"+e):""===Shopify.locationSearch()?"?"+t+"="+e:Shopify.locationSearch()+"&"+t+"="+e)+Shopify.locationHash()},Shopify.setParam=function(t,e){Shopify.replaceState(Shopify.newState(t,e))},Shopify.Product=function(t){Shopify.isDefined(t)&&this.update(t)},Shopify.Product.prototype.update=function(t){for(property in t)this[property]=t[property]},Shopify.Product.prototype.optionNames=function(){return"Array"==Shopify.getClass(this.options)?this.options:[]},Shopify.Product.prototype.optionValues=function(t){if(!Shopify.isDefined(this.variants))return null;var e=Shopify.map(this.variants,function(e){var o="option"+(t+1);return e[o]==undefined?null:e[o]});return null==e[0]?null:Shopify.uniq(e)},Shopify.Product.prototype.getVariant=function(t){var e=null;return t.length!=this.options.length?e:(Shopify.each(this.variants,function(o){for(var i=!0,r=0;r<t.length;r++){o["option"+(r+1)]!=t[r]&&(i=!1)}if(1==i)return void(e=o)}),e)},Shopify.Product.prototype.getVariantById=function(t){for(var e=0;e<this.variants.length;e++){var o=this.variants[e];if(t==o.id)return o}return null},Shopify.money_format="$",Shopify.formatMoney=function(t,e){function o(t,e){return void 0===t?e:t}function i(t,e,i,r){if(e=o(e,2),i=o(i,","),r=o(r,"."),isNaN(t)||null==t)return 0;t=(t/100).toFixed(e);var n=t.split(".");return n[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g,"$1"+i)+(n[1]?r+n[1]:"")}"string"==typeof t&&(t=t.replace(".",""));var r="",n=/\{\{\s*(\w+)\s*\}\}/,a=e||this.money_format;switch(a.match(n)[1]){case"amount":r=i(t,2);break;case"amount_no_decimals":r=i(t,0);break;case"amount_with_comma_separator":r=i(t,2,".",",");break;case"amount_with_space_separator":r=i(t,2," ",",");break;case"amount_with_period_and_space_separator":r=i(t,2," ",".");break;case"amount_no_decimals_with_comma_separator":r=i(t,0,".",",");break;case"amount_no_decimals_with_space_separator":r=i(t,0," ");break;case"amount_with_apostrophe_separator":r=i(t,2,"'",".")}return a.replace(n,r)},Shopify.OptionSelectors=function(t,e){return this.selectorDivClass="selector-wrapper",this.selectorClass="single-option-selector",this.variantIdFieldIdSuffix="-variant-id",this.variantIdField=null,this.historyState=null,this.selectors=[],this.domIdPrefix=t,this.product=new Shopify.Product(e.product),this.onVariantSelected=Shopify.isDefined(e.onVariantSelected)?e.onVariantSelected:function(){},this.replaceSelector(t),this.initDropdown(),e.enableHistoryState&&(this.historyState=new Shopify.OptionSelectors.HistoryState(this)),!0},Shopify.OptionSelectors.prototype.initDropdown=function(){var t={initialLoad:!0};if(!this.selectVariantFromDropdown(t)){var e=this;setTimeout(function(){e.selectVariantFromParams(t)})}},Shopify.OptionSelectors.prototype.fireOnChangeForFirstDropdown=function(t){this.selectors[0].element.onchange(t)},Shopify.OptionSelectors.prototype.selectVariantFromParamsOrDropdown=function(t){this.selectVariantFromParams(t)||this.selectVariantFromDropdown(t)},Shopify.OptionSelectors.prototype.replaceSelector=function(t){var e=document.getElementById(t),o=e.parentNode;Shopify.each(this.buildSelectors(),function(t){o.insertBefore(t,e)}),e.style.display="none",this.variantIdField=e},Shopify.OptionSelectors.prototype.selectVariantFromDropdown=function(t){var e=document.getElementById(this.domIdPrefix).querySelector("[selected]");if(e||(e=document.getElementById(this.domIdPrefix).querySelector('[selected="selected"]')),!e)return!1;var o=e.value;return this.selectVariant(o,t)},Shopify.OptionSelectors.prototype.selectVariantFromParams=function(t){var e=Shopify.urlParam("variant");return this.selectVariant(e,t)},Shopify.OptionSelectors.prototype.selectVariant=function(t,e){var o=this.product.getVariantById(t);if(null==o)return!1;for(var i=0;i<this.selectors.length;i++){var r=this.selectors[i].element,n=r.getAttribute("data-option"),a=o[n];null!=a&&this.optionExistInSelect(r,a)&&(r.value=a)}return"undefined"!=typeof jQuery?jQuery(this.selectors[0].element).trigger("change",e):this.selectors[0].element.onchange(e),!0},Shopify.OptionSelectors.prototype.optionExistInSelect=function(t,e){for(var o=0;o<t.options.length;o++)if(t.options[o].value==e)return!0},Shopify.OptionSelectors.prototype.insertSelectors=function(t,e){Shopify.isDefined(e)&&this.setMessageElement(e),this.domIdPrefix="product-"+this.product.id+"-variant-selector";var o=document.getElementById(t);Shopify.each(this.buildSelectors(),function(t){o.appendChild(t)})},Shopify.OptionSelectors.prototype.buildSelectors=function(){for(var t=0;t<this.product.optionNames().length;t++){var e=new Shopify.SingleOptionSelector(this,t,this.product.optionNames()[t],this.product.optionValues(t));e.element.disabled=!1,this.selectors.push(e)}var o=this.selectorDivClass,i=this.product.optionNames();return Shopify.map(this.selectors,function(t){var e=document.createElement("div");if(e.setAttribute("class",o),i.length>1){var r=document.createElement("label");r.htmlFor=t.element.id,r.innerHTML=t.name,e.appendChild(r)}return e.appendChild(t.element),e})},Shopify.OptionSelectors.prototype.selectedValues=function(){for(var t=[],e=0;e<this.selectors.length;e++){var o=this.selectors[e].element.value;t.push(o)}return t},Shopify.OptionSelectors.prototype.updateSelectors=function(t,e){var o=this.selectedValues(),i=this.product.getVariant(o);i?(this.variantIdField.disabled=!1,this.variantIdField.value=i.id):this.variantIdField.disabled=!0,this.onVariantSelected(i,this,e),null!=this.historyState&&this.historyState.onVariantChange(i,this,e)},Shopify.OptionSelectorsFromDOM=function(t,e){var o=e.optionNames||[],i=e.priceFieldExists||!0,r=e.delimiter||"/",n=this.createProductFromSelector(t,o,i,r);e.product=n,Shopify.OptionSelectorsFromDOM.baseConstructor.call(this,t,e)},Shopify.extend(Shopify.OptionSelectorsFromDOM,Shopify.OptionSelectors),Shopify.OptionSelectorsFromDOM.prototype.createProductFromSelector=function(t,e,o,i){if(!Shopify.isDefined(o))var o=!0;if(!Shopify.isDefined(i))var i="/";var r=document.getElementById(t),n=r.childNodes,a=(r.parentNode,e.length),s=[];Shopify.each(n,function(t){if(1==t.nodeType&&"option"==t.tagName.toLowerCase()){var r=t.innerHTML.split(new RegExp("\\s*\\"+i+"\\s*"));0==e.length&&(a=r.length-(o?1:0));var n=r.slice(0,a),p=o?r[a]:"",l=(t.getAttribute("value"),{available:!t.disabled,id:parseFloat(t.value),price:p,option1:n[0],option2:n[1],option3:n[2]});s.push(l)}});var p={variants:s};if(0==e.length){p.options=[];for(var l=0;l<a;l++)p.options[l]="option "+(l+1)}else p.options=e;return p},Shopify.SingleOptionSelector=function(t,e,o,i){this.multiSelector=t,this.values=i,this.index=e,this.name=o,this.element=document.createElement("select");for(var r=0;r<i.length;r++){var n=document.createElement("option");n.value=i[r],n.innerHTML=i[r],this.element.appendChild(n)}return this.element.setAttribute("class",this.multiSelector.selectorClass),this.element.setAttribute("data-option","option"+(e+1)),this.element.id=t.domIdPrefix+"-option-"+e,this.element.onchange=function(o,i){i=i||{},t.updateSelectors(e,i)},!0},Shopify.Image={preload:function(t,e){for(var o=0;o<t.length;o++){var i=t[o];this.loadImage(this.getSizedImageUrl(i,e))}},loadImage:function(t){(new Image).src=t},switchImage:function(t,e,o){if(t&&e){var i=this.imageSize(e.src),r=this.getSizedImageUrl(t.src,i);o?o(r,t,e):e.src=r}},imageSize:function(t){var e=t.match(/.+_((?:pico|icon|thumb|small|compact|medium|large|grande)|\d{1,4}x\d{0,4}|x\d{1,4})[_\.@]/);return null!==e?e[1]:null},getSizedImageUrl:function(t,e){if(null==e)return t;if("master"==e)return this.removeProtocol(t);var o=t.match(/\.(jpg|jpeg|gif|png|bmp|bitmap|tiff|tif)(\?v=\d+)?$/i);if(null!=o){var i=t.split(o[0]),r=o[0];return this.removeProtocol(i[0]+"_"+e+r)}return null},removeProtocol:function(t){return t.replace(/http(s)?:/,"")}},Shopify.OptionSelectors.HistoryState=function(t){this.browserSupports()&&this.register(t)},Shopify.OptionSelectors.HistoryState.prototype.register=function(t){window.addEventListener("popstate",function(){t.selectVariantFromParamsOrDropdown({popStateCall:!0})})},Shopify.OptionSelectors.HistoryState.prototype.onVariantChange=function(t,e,o){this.browserSupports()&&(!t||o.initialLoad||o.popStateCall||Shopify.setParam("variant",t.id))},Shopify.OptionSelectors.HistoryState.prototype.browserSupports=function(){return window.history&&window.history.replaceState};

var ProductJsNew = function( item, product, isQuickView ) {
    var optionsMap = {};
    var optionsMapAll = {};
    var productJs = this;
    var stickyATC = $('#stickyATC');
    var mobileStickyAtc = $('#sticky-atc');
	var productOptions = product.options.map(function(e){return e.toLowerCase()});
    productJs.config = {
      gallery:{
        galleryGroupByOptions: 'fabric color,top color, seat color, frame color, desk color, leg color, chair color, stand color, cord color, color, orientation'.split(',').map(function(s) { return s.trim() }).filter(function(v){return v!=='' && productOptions.indexOf(v)>-1}),
        galleryGroupMatchMode: 4, //1 Match Everything, 2 Match Any, 4 Exclusive OR
        slickMainOptions: {
          slidesToShow: 1,
          slidesToScroll: 1,
          speed: 700,
          waitForAnimate: false,
          dots: (isQuickView) ? true : false,
          prevArrow: '<svg aria-hidden="true" focusable="false" role="presentation" class="icon icon-arrow-left left-arrow" viewBox="0 0 32 32"><path fill="#314438" d="M24.333 28.205l-1.797 1.684L7.666 16l14.87-13.889 1.797 1.675L11.269 16z"/></svg>',
          nextArrow: '<svg aria-hidden="true" focusable="false" role="presentation" class="icon icon-arrow-right right-arrow" viewBox="0 0 32 32"><path fill="#314438" d="M7.667 3.795l1.797-1.684L24.334 16 9.464 29.889l-1.797-1.675L20.731 16z"/></svg>',
          responsive: [
            {
              breakpoint: 900,
              settings: {
        		dots: true
              }
            }
          ]
        },
        slickThumbsOptions: {
          autoplay: false,
          speed: 700,
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: false,prevArrow: '<svg aria-hidden="true" focusable="false" role="presentation" class="icon icon-arrow-left left-arrow" viewBox="0 0 32 32"><path fill="#314438" d="M24.333 28.205l-1.797 1.684L7.666 16l14.87-13.889 1.797 1.675L11.269 16z"/></svg>',
            nextArrow: '<svg aria-hidden="true" focusable="false" role="presentation" class="icon icon-arrow-right right-arrow" viewBox="0 0 32 32"><path fill="#314438" d="M7.667 3.795l1.797-1.684L24.334 16 9.464 29.889l-1.797-1.675L20.731 16z"/></svg>',responsive: [
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                vertical: false,
                verticalSwiping: false,
                prevArrow: '<svg aria-hidden="true" focusable="false" role="presentation" class="icon icon-arrow-left left-arrow" viewBox="0 0 32 32"><path fill="#314438" d="M24.333 28.205l-1.797 1.684L7.666 16l14.87-13.889 1.797 1.675L11.269 16z"/></svg>',
                nextArrow: '<svg aria-hidden="true" focusable="false" role="presentation" class="icon icon-arrow-right right-arrow" viewBox="0 0 32 32"><path fill="#314438" d="M7.667 3.795l1.797-1.684L24.334 16 9.464 29.889l-1.797-1.675L20.731 16z"/></svg>'
              }
            },
            {
              breakpoint: 900,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                vertical: false,
                verticalSwiping: false,
                prevArrow: '<svg aria-hidden="true" focusable="false" role="presentation" class="icon icon-arrow-left left-arrow" viewBox="0 0 32 32"><path fill="#314438" d="M24.333 28.205l-1.797 1.684L7.666 16l14.87-13.889 1.797 1.675L11.269 16z"/></svg>',
                nextArrow: '<svg aria-hidden="true" focusable="false" role="presentation" class="icon icon-arrow-right right-arrow" viewBox="0 0 32 32"><path fill="#314438" d="M7.667 3.795l1.797-1.684L24.334 16 9.464 29.889l-1.797-1.675L20.731 16z"/></svg>'
              }
            }
          ]
        }
      }
    };

    var init = function() {
      if(!item.hasClass('initialized')) {
        item.data('productjs', productJs);
        initVariantStatus();
        initializeVariantSelector();
        
        item.on('galleryLoaded', function(){
        	item.data('fullLoaded', true);
          	item.trigger('productLoaded');
        });
        initGallery();

        item.addClass('initialized');
      }
    };

    var initVariantStatus = function() {
      $.each(product.variants, function(key, variant){
        //AVAILABLE
        if(variant.available) {
          variant.status = 'available';
        } else {
          //SOLDOUT
          variant.status = 'soldout';
        }
      });
    };

    productJs.slickFilterThumbs = function(slickOptions, objectOptions, optionsContainer, gallery) {
      //Example reference:
      //slickOptions: ...
      //objectOptions: product.options
      //optionsContainer: variant;
      //gallery: jQuery object of the gallery, ex. $('.thumbs'), $('.main-images'), etc.

      var galleryOptions = productJs.config.gallery;
      var groupOptionProperties = [];
      $(galleryOptions.galleryGroupByOptions).each(function (ix, e){
        $(objectOptions).each(function(ix2,e2){
          if (Simplistic.handleize(e) == Simplistic.handleize(e2))
            groupOptionProperties.push('option'+(1+ix2))
        })
      })
      
      if(groupOptionProperties.length>0) {
        if(gallery.hasClass('slick-slider')) gallery.slick('slickUnfilter');
        gallery.find('.slideVisible').removeClass('slideVisible');

        var slideSelector = '';
        
        $(groupOptionProperties).each(function(ix,e){
          var part1Selector = '';
          var part2Selector = '';
          if(slideSelector=='' || galleryOptions.galleryGroupMatchMode>=2)
            part1Selector += ' .gallery-item';

          part1Selector += '[data-'+Simplistic.handleize(galleryOptions.galleryGroupByOptions[ix])+'*="_'+Simplistic.handleize(optionsContainer[e])+'_"]';
          if (galleryOptions.galleryGroupMatchMode==4) {
            part2Selector = ', ' +part1Selector;
            $(groupOptionProperties).each(function(ix2,e2){
              if (e2!=e) {
                part1Selector += ':not([data-'+Simplistic.handleize(galleryOptions.galleryGroupByOptions[ix2])+'])';
                part2Selector += '[data-'+Simplistic.handleize(galleryOptions.galleryGroupByOptions[ix2])+'*="_'+Simplistic.handleize(optionsContainer[e2])+'_"]';
              }
            });
          }
          slideSelector += (slideSelector=='' || galleryOptions.galleryGroupMatchMode==1 ? '' : ', ') + part1Selector + part2Selector;
        });

        //Show the images that don't have any of the galleryGroupByOptions
        var withoutAltSelector = ' .gallery-item';
        $(galleryOptions.galleryGroupByOptions).each(function(){
          withoutAltSelector += ':not([data-'+Simplistic.handleize(this)+'])';
        });
        slideSelector += ', ' + withoutAltSelector;

        var sortCompare = function(a,b){
            akey = parseInt($(a).attr("data-index"));
            bkey = parseInt($(b).attr("data-index"));
            if (akey == bkey) return 0;
            if (akey < bkey) return -1;
            if (akey > bkey) return 1;
        };
        
        gallery.find(slideSelector).sortDomElements(sortCompare).addClass('slideVisible');
        /*gallery.slick('slickFilter', '.slideVisible');
        gallery.slick('slickGoTo', 0, true);*/
      }else{
        gallery.find('.gallery-item').addClass('slideVisible');
      }
      
      if(gallery.hasClass('slick-slider')) {
        gallery.slick('slickFilter', '.slideVisible');
        gallery.slick('slickGoTo', 0, true);
      } else {
        gallery.find('.slideVisible').each(function(key, object){
          $(this).removeClass('whole half');
          if(gallery.find('.slideVisible').size() <=3 || $(this).hasClass('is-video')){
            $(this).addClass('whole');
          }else{
            
            if(key%3 == 0){
              $(this).addClass('whole');
            }else{
              $(this).addClass('half');
            }
          }
        });
        if(gallery.find('.slideVisible:last').hasClass('half') && gallery.find('.slideVisible:last').prevAll('.slideVisible:first').hasClass('whole')){
           gallery.find('.slideVisible:last').removeClass('half').addClass('whole');
        }
      }

    }

    var initializeVariantSelector = function() {
      var variantSelectorId = "product-select-"+product.id;
      var selectCallback = onVariantSelected();

      new Shopify.OptionSelectors(variantSelectorId, { product: product, onVariantSelected: selectCallback });

      if(product.options.length > 1) {
        if(product.variants.length > 1) {
          linkOptionSelectors(product);
        }

        // Add label if only one product option and it isn't 'Title'.
        if(product.options.length == 1 && product.options[0] != 'Title') {
          item.find('.selector-wrapper:eq(0)').prepend('<label>'+product.options[0]+'</label>');
        }

        item.find('.selector-wrapper label').append(':');
      } else {
        if(product.variants.length > 1) {
          item.find('.select-variant').change(function(){
            var variantSelected = false;
            $.each(product.variants, function(key, variant){
              if(variant.id==item.find('.select-variant').val()) {
                variantSelected = variant;
                return;
              }
            });
            selectCallback(variantSelected, null);
          });
        }
      }item.find('.swatch :radio').change(function() {
          var optionIndex = $(this).closest('.swatch').attr('data-option-index');
          var optionValue = $(this).val();
          $(this).closest('form').find('.single-option-selector').eq(optionIndex).val(optionValue).trigger('change');
        });
        stickyATC.find('.swatch :radio').change(function() {
          var optionIndex = $(this).closest('.swatch').attr('data-option-index');
          var optionValue = $(this).val();
          
          item.find('form').find('.single-option-selector').eq(optionIndex).val(optionValue).trigger('change');
        });if(product.variants.length==1) {
        selectCallback(product.variants[0], null);
      } else {productJs.setVariant(productJs.getFirstAvailableVariant());}
    };

    productJs.getFirstAvailableVariant = function() {
      for(var i=0; i < product.variants.length; i++){ 
        if(product.variants[i].available)
          return product.variants[i];
      }    
    };
  
    productJs.getVariantBySku = function(sku) {
      for(var i=0; i < product.variants.length; i++){ 
        if(product.variants[i].sku == sku)
          return product.variants[i];
      }    
    };

    productJs.getVariantById = function(id) {
      for(var i=0; i < product.variants.length; i++){ 
        if(product.variants[i].id == id) {
          return product.variants[i];
        }
      }
    };

    productJs.getCurrentVariant = function() {
      var variantId = item.find('[name="id[]"]').val();
        if(variantId!="") {
          return productJs.getVariantById(variantId);
        } else {
          return false;
        }
    };

    productJs.getProduct = function() {
      return product;
    };

	productJs.getCurrentVariantOption = function(option) {
      var value = '';
      $.each(product.options, function(key, val){
        if(val.toUpperCase()==option.toUpperCase()) {
          value = productJs.getCurrentVariant()[('option'+(key+1))];
        }
      });
      return value;
    };

    productJs.setVariant = function(variant){
      if(variant) {
        if(!isNaN(variant)) {
          variant = productJs.getVariantById(variant);
        }
        item.find('.single-option-selector').each(function(){
          var selector = this;
          var option = $(selector).data('option');
          $(selector).find('option').each(function(){
            if(this.value == variant[option]){
              $(selector).val(this.value).trigger('change');
              return;
            }
          });
        });
      }
    };
  
    var onVariantSelected = function() {
      return function(variant, selector) {
        if(variant && variant.id) {const bundleProduct = product.tags && product.tags.includes("bundle") ? true : false;

              if(!bundleProduct){
                window.Plus.product.fillAvailableElement(window.Plus.product.generateDateProcessingObject(variant.id),  variant.available);      
              }//Swatches code
            var form = item.find('form');
            
            for(var i=0,length=variant.options.length; i<length; i++) {
              var radioButton = form.find('.swatch[data-option-index="' + i + '"] :radio[value="' + variant.options[i] +'"]');
              var radioButtonSticky = stickyATC.find('.swatch[data-option-index="' + i + '"] :radio[value="' + variant.options[i] +'"]');
              if(radioButton.length > 0) {
                radioButton.get(0).checked = true;
                radioButtonSticky.get(0).checked = true;
              }
            }//Update the price
          item.find('[data-price="deal"]').html(Shopify.formatMoney(variant.price, Simplistic.formatMoney).replace('.00', '').replace(' ',''));
          if(variant.compare_at_price != null){
            var retailPrice = Shopify.formatMoney(variant.compare_at_price, Simplistic.formatMoney).replace('.00', '').replace(' ','');
            var percentDiscount = Math.round( (((variant.compare_at_price - variant.price) * 100 ) / variant.compare_at_price) );
            var moneyDiscount = Shopify.formatMoney((variant.compare_at_price - variant.price), Simplistic.formatMoney).replace('.00', '').replace(' ','');
            item.find('[data-price="retail"]').html(retailPrice);
            item.find('[data-price="off-percent"]').html(percentDiscount+'%');
            item.find('[data-price="off-amount"]').html(moneyDiscount);
          }else{
          	item.find('[data-price="retail"]').html('');
            item.find('[data-price="off-percent"]').html('');
            item.find('[data-price="off-amount"]').html('');
          }

          //Filter The images by variant
          filterImages(variant);

          //Update the variant value to add to cart
          item.find('#product-'+product.id+'-variant').val(variant.id);

        } else {
          item.find('#product-'+product.id+'-variant').val("");
        }
        updateButtons(variant);

        $(item).trigger("variantChange", [variant]);
      }
    };

    var filterImages = function(variant, notSwitchImg) {
      if(variant) {
        
        //Main image in product page
        //if(item.find('.main-images .slick-track').length>0) {
          productJs.slickFilterThumbs(productJs.config.gallery.slickMainOptions, product.options, variant, item.find('.main-images'));
          /*if(variant.featured_media&& !notSwitchImg && item.data('fullLoaded')) {
            switchMainImage(variant.featured_media.id);
          }*/
        //}

      }
    };
    
    var updateButtons = function(variant) {
      var status;
      if(product.available) {
        status = variant ? variant.status : 'available';
      } else {
        status = 'soldout';
      }

      item.find('.buttons-wrapper .add-button, .buttons-wrapper .sold-out-button, .soldout-product-message').hide(); //Grid
      item.find('.content-available, .content-soldout').hide(); //Product page
      stickyATC.find('.content-available, .content-soldout').hide(); //Sticky
      mobileStickyAtc.find('.content-available, .content-soldout').hide(); //Mobile Sticky
      item.find('.quantity-box').removeClass('disabled'); //Product page
      if ($('.chat-with-sales-button').length) {
        switch(status) {
          case "available":
            item.find('.content-available').show(); //Product page
            stickyATC.find('.content-available').show(); //Sticky
            mobileStickyAtc.find('.content-available').show(); //Mobile Sticky
            item.find('.quantity-box').show(); //Product page
            break;
          case "soldout":
            item.find('.buttons-wrapper .add-button').prop("disabled",true);
            item.find('.soldout-product-message').show(); //Grid
            item.find('.quantity-box').hide(); //Product page
            stickyATC.find('.content-soldout').show(); //Sticky
            mobileStickyAtc.find('.content-soldout').show(); //Mobile Sticky
            break;
        }
      }
      else {
        switch(status) {
          case "available":
            item.find('.buttons-wrapper .add-button').show(); //Grid
            item.find('.content-available').show(); //Product page
            stickyATC.find('.content-available').show(); //Sticky
            mobileStickyAtc.find('.content-available').show(); //Mobile Sticky
            item.find('.quantity-box').removeClass('disabled'); //Product page
            break;
          case "soldout":
            item.find('.buttons-wrapper .sold-out-button').show(); //Grid
            item.find('.soldout-product-message').show(); //Grid
            item.find('.quantity-box').addClass('disabled'); //Product page
            item.find('.content-soldout').show(); //Product page
            stickyATC.find('.content-soldout').show(); //Sticky
            mobileStickyAtc.find('.content-soldout').show(); //Mobile Sticky
            break;
        }
      }
    };

  	var switchMainImage = function(mediaId){
        if(item.find('.main-images .slick-track').length>0) {
          var index = item.find('.main-images .slide:not(.slick-cloned)[data-media-id="'+mediaId+'"]').data('slick-index');
          item.find('.main-images').slick('goTo', index);
        }
    };

    var initGallery = function(){
      var mainGalleryLoaded = false;

      var refreshSlick = function(){
        if(window.innerWidth<=900) {
          	if(!item.find('.main-images').hasClass('slick-slider') && !isQuickView) {
              item.find('.main-images').slick(productJs.config.gallery.slickMainOptions);
            }
        } else {
          if(item.find('.main-images').hasClass('slick-slider')) {
          	item.find('.main-images').slick('slickUnfilter');
            item.find('.main-images').slick('unslick');
          }
        }
      };

      $(window).resize($.throttle(15, function(){
        refreshSlick();
      }));
      
      refreshSlick();

      item.find('.main-images').on('beforeChange', function(event, slick, currentSlide, nextSlide){
        item.find('.thumbs.switch .slide').removeClass('active');
        item.find('.thumbs.switch .slide:not(.slick-cloned):eq('+nextSlide+')').addClass('active');
        
        var slidesToShow = item.find('.thumbs.switch').slick('slickGetOption', 'slidesToShow');
        if(slidesToShow==1) {
        	item.find('.thumbs.switch').slick('slickGoTo', nextSlide);
        } else {
        	if(nextSlide==item.find('.thumbs.switch .slide:not(.slick-cloned)').length-1) {
                item.find('.thumbs.switch').slick('slickGoTo', (nextSlide-slidesToShow)+1);
            } else {
                item.find('.thumbs.switch').slick('slickGoTo', (nextSlide-1));
            }
        }
      });
      Simplistic.onImagesLoaded(item.find('.main-images img'), function(){
        if(isQuickView) item.find('.main-images').slick(productJs.config.gallery.slickMainOptions);
        
        filterImages(productJs.getCurrentVariant(), true);
        mainGalleryLoaded = true;
        if(mainGalleryLoaded) {
        	item.trigger('galleryLoaded');
        }
      });

      //Initialize thumbs on main product page
      item.find('.thumbs.switch a.gallery').on('click', function(e) {
        e.preventDefault();
        switchMainImage($(this).data('media-id'));

        var variantId = $(this).attr('variant-id');
        if(variantId && variantId!='') {
          if(product.options.length <= 1) {
            productJs.setVariant(variantId);
          }
        }
      });
    

      //Initialize zoom on main product image
      if(item.find('.product-gallery').hasClass('zoom-in') && !isMobile.any) {
        item.find('.active-wrapper img').each(function(){
          var mainProductImage = $(this);
          if(mainProductImage.length > 0) {
            var zoomedSrc = $(this).attr('src').replace('_large', '');
            $(this).wrap('<span style="display:block"></span>').css('display', 'block').parent().zoom({
              url: zoomedSrc, 
              callback: function(){
                item.find('#active-wrapper img.zoomImg').prop('alt', '');
              } 
            });
          }
        });
      }

      //Initialize photoswipe on main product image
      if($('.active-wrapper a.productImage').length > 0) {
        item.find('.active-wrapper a.productImage').photoSwipe();
      }

      //Custom video play button for local videos only for desktop
      if ($('.product-gallery .video-wrap .custom-video-play').length > -1) {
          $('.product-gallery .video-wrap.local-video .custom-video-play').on('click',function(){
            $(this).siblings('video')[0].play();
            $(this).siblings('video').attr('controls', true);
            $(this).fadeOut();
          });
      }
      $('.product-gallery .video-wrap.local-video video').on("pause", function (e) {
          $(this)[0].pause();            
          $(this).removeAttr('controls');       
          $(this).siblings('.custom-video-play').fadeIn();
      });
      $('.product-gallery .video-wrap.local-video video').on("click", function () {
        if(!$(this)[0].paused){
          $(this)[0].pause();            
          $(this).removeAttr('controls');       
          $(this).siblings('.custom-video-play').fadeIn();                             
        }
      });

      //Custom youtube play button only for desktop
      if ($('.product-gallery .video-wrap.external-video .custom-video-play').length > -1) {
          $('.product-gallery .video-wrap.external-video .custom-video-play').on('click',function(){
            var self = $(this);
            // $(this).siblings('iframe')[0].src += "&autoplay=1";
            $(this).siblings('iframe').find('.ytp-large-play-button').click();
            setTimeout(function(){
              self.remove();
            },700);
          });
      }
            
      var updateMobileSlideControlDot = function(){
        $('.slick-slide').each(function() {
          // turn slick slide control dot into play icon for mobile for video slide
          if ($(this).find('.video-wrap').length) {
            var described = $(this).attr('id')
            if (described) {
              described = described.replace('slick-slide', 'slick-slide-control')
              $(`#${described}`).addClass('play-button')
            }
          }
        });
      };
      
      updateMobileSlideControlDot()
      setTimeout(function(){
        updateMobileSlideControlDot()
      }, 200);

    }

    var updateOptionsInSelector=function(selectorIndex){switch(selectorIndex){case 0:var key="root";var selector=item.find(".single-option-selector:eq(0)");break;case 1:var key=item.find(".single-option-selector:eq(0)").val();var selector=item.find(".single-option-selector:eq(1)");break;case 2:var key=item.find(".single-option-selector:eq(0)").val();key+=" / "+item.find(".single-option-selector:eq(1)").val();var selector=item.find(".single-option-selector:eq(2)")}
    var initialValue=selector.val();selector.empty();var options=optionsMapAll[key];if(options){for(var i=0;i<options.length;i++){var option=options[i];var newOption=jQuery("<option></option>").val(option).html(option);selector.append(newOption)}}
    var availableOptions=optionsMap[key];var existingOptions=optionsMapAll[key];item.find('.swatch[data-option-index="'+selectorIndex+'"] .swatch-element').each(function(){if(jQuery.inArray($(this).attr("data-value"),existingOptions)!==-1){if(jQuery.inArray($(this).attr("data-value"),availableOptions)!==-1){$(this).removeClass("soldout").find(":radio").removeAttr("checked")}else{$(this).addClass("soldout").find(":radio").removeAttr("checked")}
    $(this).show()}else{$(this).hide()}});stickyATC.find('.swatch[data-option-index="'+selectorIndex+'"] .swatch-element').each(function(){if(jQuery.inArray($(this).attr("data-value"),existingOptions)!==-1){if(jQuery.inArray($(this).attr("data-value"),availableOptions)!==-1){$(this).removeClass("soldout").find(":radio").removeAttr("checked")}else{$(this).addClass("soldout").find(":radio").removeAttr("checked")}
    $(this).show()}else{$(this).hide()}});if(jQuery.inArray(initialValue,availableOptions)!==-1){selector.val(initialValue)}
    selector.trigger("change")};var linkOptionSelectors=function(product){for(var i=0;i<product.variants.length;i++){var variant=product.variants[i];optionsMapAll.root=optionsMapAll.root||[];optionsMapAll.root.push(variant.option1);optionsMapAll.root=Shopify.uniq(optionsMapAll.root);if(product.options.length>1){var key=variant.option1;optionsMapAll[key]=optionsMapAll[key]||[];optionsMapAll[key].push(variant.option2);optionsMapAll[key]=Shopify.uniq(optionsMapAll[key])}
    if(product.options.length===3){var key=variant.option1+" / "+variant.option2;optionsMapAll[key]=optionsMapAll[key]||[];optionsMapAll[key].push(variant.option3);optionsMapAll[key]=Shopify.uniq(optionsMapAll[key])}
    if(variant.available){optionsMap.root=optionsMap.root||[];optionsMap.root.push(variant.option1);optionsMap.root=Shopify.uniq(optionsMap.root);if(product.options.length>1){var key=variant.option1;optionsMap[key]=optionsMap[key]||[];optionsMap[key].push(variant.option2);optionsMap[key]=Shopify.uniq(optionsMap[key])}
    if(product.options.length===3){var key=variant.option1+" / "+variant.option2;optionsMap[key]=optionsMap[key]||[];optionsMap[key].push(variant.option3);optionsMap[key]=Shopify.uniq(optionsMap[key])}}}
updateOptionsInSelector(0);if(product.options.length>1)updateOptionsInSelector(1);if(product.options.length===3)updateOptionsInSelector(2);item.find(".single-option-selector:eq(0)").change(function(){updateOptionsInSelector(1);if(product.options.length===3)updateOptionsInSelector(2);return!0});item.find(".single-option-selector:eq(1)").change(function(){if(product.options.length===3)updateOptionsInSelector(2);return!0})}

    return init();
};