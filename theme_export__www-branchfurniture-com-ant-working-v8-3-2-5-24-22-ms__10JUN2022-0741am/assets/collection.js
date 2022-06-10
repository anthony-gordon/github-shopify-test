(function($) {
  function categoryFilter() {
    function closeDropdowns() {
      $('.goto').find('.links').slideUp();
      $('.goto .trigger').removeClass('open');      
    }
    
    $(document).on('click', '.goto .trigger', function() {
      if ($(this).hasClass('open')) {
        closeDropdowns();
      }
      else {
        closeDropdowns();
        $(this).siblings('.links').slideToggle();
        $(this).toggleClass('open');
      }
    });
    
    $(document).on('click', function(e) {
      var isDropdown = $(e.target).closest('.trigger').length;
      if (!isDropdown) {
        closeDropdowns();
      }
    });    
  }
  
  function faqAccordion() {
    var timer_faq, timer_progress;
    var time_per_faq = 5000;
    
    var faq_index = 1;
    var total_faq = $('.faq-item').length;
    
    timer_faq = setInterval(function() {
      $('.faq-item').removeClass('active');
      document.querySelector('.faq-item[data-index="' + faq_index + '"]').classList.add('active');
      
      faq_index++;
      if (faq_index > total_faq) {
        faq_index = 1;
      }      
    }, time_per_faq);
    
    $(document).on('click', '.faq-item', function(e) {   
      e.preventDefault();
      
      clearInterval(timer_faq);
      clearInterval(timer_progress);
      
      $(e.currentTarget).closest('.faq-list').find('.faq-item').removeClass('active');
      $(e.currentTarget).closest('.faq-item').addClass('active manually-active');
      
      $(e.currentTarget).closest('.faq-item').find('.faq-item-progress').css('height', '100%');

      
    });    
  }
  
  function pressCarousels() {
    // quotes
    var quotes_slick_options = {
      arrows: false,
      asNavFor: '.press-quotes .press-logos',
      adaptiveHeight: true
    };
    $('.press-quotes .quotes').slick(quotes_slick_options);
    
    // press logos
    var presslogos_slick_options = {
      slidesToShow: 3,
      arrows: false,
      asNavFor: '.press-quotes .quotes',
      adaptiveHeight: true
    };
    $('.press-quotes .press-logos').slick(presslogos_slick_options);
    
    // logo on click
    $(document).on('click', '.press-quotes .logo-wrap', function(e) {
      var index = $(e.currentTarget).data('index');
      $('.press-quotes .quotes').slick('slickGoTo', index);
    });
  }
  
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Begin Collections page product variant select image swap
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
  function variantSelection() {
    $(document).on('click', '.swatch-element', function(e) {
      $(e.currentTarget).closest('.variants-wrap').find('.swatch-element').removeClass('selected');
      $(e.currentTarget).addClass('selected');
      
      var $product = $(e.currentTarget).closest('.swatches-shop-now');

      var product_handle = $product.data('product-handle'); //ex. 'standing-desk'
      
      var options = $product.find('.swatch-element.selected').map(function() {return $(this).data('value')}).toArray();
      
      if (!products) {
        return;
      }
      var product = products.find(function(p) {return p.handle == product_handle});    
    
      let selected_variant = undefined;
      
      for (let i = 0; i < product.variants.length; i++){
        let variant = product.variants[i];
        console.log('variant: ', variant);
        
          for (let j = 0; j < variant.options.length; j++){
            if (options.length == 1){
              console.log('options.length == 1');
              if (variant.options[j].includes(options[0])){
                console.log('selected_variant = variant: ', variant);
                selected_variant = variant;
              }
            } else {
              console.log('else');
              if (variant.options[j] == options[0] && variant.options[j + 1] == options[1]) {
                console.log('selected_variant = variant: ', variant);
                selected_variant = variant;
                break;
              } else {
                console.log('unhandled else');
              }
            }
          }
      }
      
      if (selected_variant) {
        var $btn = $product.find('.btn');
        var href = $btn.data('href');
        $btn.attr('href', (href + '?variant=' + selected_variant.id));      
          
            product.selected_variant = selected_variant;

            let categoryString = selected_variant.name
            let selectedCategory = stripCategory(categoryString);
            let selectionSiblings = document.querySelectorAll('.product-image');

            let filteredSiblings = [];

            let selectedNode = selectDomNode(selectionSiblings, filteredSiblings, selectedCategory, selected_variant);


            filteredSiblings.map(sibling => {
              sibling.classList.remove("shown");
            });

            selectedNode.classList.add("shown");       
          
        }        

      // Linked options (only relevant for chair collection)
      $product.find('.swatch.frame .swatch-element').each(function() {
        var $swatch = $(this);

        var seat_color = $product.find('.swatch:first-of-type .selected').data('value');
        var color = $swatch.data('value');
        var matching_variants = product.variants.filter(function(v) {
          return v.options.indexOf(seat_color) !== -1 && v.options.indexOf(color) !== -1;
        });
        
        $swatch[matching_variants.length == 0 ? 'addClass' : 'removeClass']('hide');
        
        if ($swatch.hasClass('selected hide')) {
          $swatch.closest('.swatch').find('.swatch-element').not('.hide').first().click();
        }
      });
    });
   }
  
  
  function stripCategory(categoryString) {
    let splitString = categoryString.split(" ");
    let splitIndex = splitString.indexOf('-');
    
    let selectedCategory = "";
    for (let i = 0; i < splitIndex; i++) {
      selectedCategory += splitString[i] + " ";
    }
    
    return selectedCategory;
  }
  
  
  function selectDomNode(selectionSiblings, filteredSiblings, selectedCategory, selected_variant) {
    
    for (let i = 0; i < selectionSiblings.length; i++){
          if (selectionSiblings[i].dataset.title == selectedCategory.trim()) {
            filteredSiblings.push(selectionSiblings[i]);
          } else {
            continue;
          }
        }
  
        let selectedNode = "";
        let selectedImgUrl = selected_variant.featured_image.src;
       
        for (let i = 0; i < filteredSiblings.length; i++) {
          if (filteredSiblings[i].firstChild.nextSibling.dataset.bgset.includes(selectedImgUrl.replace("https:", ""))){
            selectedNode = filteredSiblings[i];
          }
        }
        
        return selectedNode;
 }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // End Collections page product variant select image swap
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
  function initCollection() {
    categoryFilter();
    faqAccordion();
    pressCarousels();
    variantSelection();    
  }
  
  $(document).ready(function() {
    initCollection();
  });
  
  document.addEventListener('shopify:section:load', function (event) {
    initCollection();
  });

  document.addEventListener('shopify:section:unload', function (event) {
    initCollection();
  });  
})(jQuery);