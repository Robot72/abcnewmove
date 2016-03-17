var styleArray = [
    {
        featureType: "all",
        stylers: [
            {saturation: -100}
        ]
    }, {
        featureType: "road.arterial",
        elementType: "geometry",
        stylers: [
            {hue: "#000"},
            {saturation: 0}
        ]
    }, {
        featureType: "poi",
        elementType: "labels",
        stylers: [
            {visibility: "off"}
        ]
    }
];

function initMap() {
    var center_of_map = {lat: 49.238199, lng: -122.844628};

    var map = new google.maps.Map(document.getElementById('map'), {
        center: center_of_map,
        scrollwheel: false,
        styles: styleArray,
        zoom: 11,
        disableDoubleClickZoom: true,
        draggable: false,
        clickableLabels: false,
        disableDefaultUI: true
    });

    var position_of_marker = {lat: 49.230161, lng: -122.878943};
    var position_of_center_with_marker = {lat: 49.231387, lng: -122.880536};
    var image = 'wp-content/themes/abcnewmoving/img/map-marker.png';
    var image1 = 'wp-content/themes/abcnewmoving/img/marker-hover.png';
    var beachMarker = new google.maps.Marker({
        position: position_of_marker,
        map: map,
        icon: image,
        title: 'Click to zoom'
    });

    google.maps.event.addListener(beachMarker, 'mouseover', function () {
        beachMarker.setIcon(image1);
    });
    google.maps.event.addListener(beachMarker, 'mouseout', function () {
        beachMarker.setIcon(image);
    });

    var if_zoom = false;
    var map_subtitle = document.getElementById('map-subtitle');
    // map.addListener('center_changed', function() {
    //   // 3 seconds after the center of the map has changed, pan back to the
    //   // marker.
    //   window.setTimeout(function() {
    //     map.panTo(beachMarker.getPosition());
    //   }, 6000);

    //  if (!if_zoom) {
    //    window.setTimeout(function() {
    //      map.panTo(position_of_marker);
    //    }, 6000);
    //  } else {
    //    window.setTimeout(function() {
    //      map.panTo(center_of_map);
    //    }, 6000);
    //  }

    // });

    beachMarker.addListener('click', function () {
        if (!if_zoom) {
            if_zoom = true;
            map.setZoom(16);
            map.setCenter(position_of_center_with_marker);
            map_subtitle.innerHTML = "New Westminster, Braid st. 103 - 15";
        } else {
            if_zoom = false;
            map.setZoom(11);
            map.setCenter(center_of_map);
            map_subtitle.innerHTML = "We operate all around greater Vancouver";
        }
    });

    map.addListener('click', function () {
        if (if_zoom) {
            if_zoom = false;
            map.setZoom(11);
            map.setCenter(center_of_map);
            map_subtitle.innerHTML = "We operate all around greater Vancouver";
        }
    });

}


jQuery(document).ready(function ($) {

    function show_modal() {
      $('#overlay').fadeIn(500, function(){
        $('#modal_form')
          .css('display', 'block')
          .animate({opacity: 1, top: '100px'}, 200);
      });
     }

    function close_modal() {
      $('#modal_form').animate({opacity: 0, top: '100px'}, 200, function(){
        $(this).css('display', 'none');
        $('#overlay').fadeOut(500);
      });
    }

    $('.rent-order').click(function() {
      $('#modal_form article').hide();
      var id = '#modal1';
    $('#modal_form article').find(".breadcrumbs").find("li").eq(1).removeClass("active");
    $('#modal_form article').find(".breadcrumbs").find("li").eq(0).addClass("active");
    $('#modal_form article').find(".step").removeClass("active");
    $('#modal_form article').find(".step").eq(0).addClass("active");
      var count = $(this).prev("div").children(".pricing-weeks").find("div").length;
      var string = "";
      for (var i = 1; i <= count; i++) {
        string = string + "<tr>";
          string = string + "<td>";
          var first = $(this).prev("div").children(".pricing-weeks").find("div").eq(i-1).text();
          string = string + first;
          string = string + "</td>";
          string = string + "<td>";
          var second = $(this).prev("div").children(".pricing-dollars").find("div").eq(i-1).text();
          string = string + second;
          string = string + "</td>";
          string = string + '<td width="123">';
          var third = '<a href="#" class="order-in-modal">Order</a>';
          string = string + third;
          string = string + "</td>";
        string = string + "</tr>";
      }
      $('#modal_form article').find(".title").empty().html( $(this).parent("div").children(".pricing-title").text() );
      $('#modal_form article').find("table").empty().html( string );
      $('#modal_form').find(id).show();
      show_modal();
    });

    $( "body" ).on( "click", ".order-in-modal", function(e) {
        e.preventDefault();
        $('#modal_form article').find(".breadcrumbs").find("li").eq(1).addClass("active");
        $('#modal_form article').find(".step").removeClass("active");
        $('#modal_form article').find(".step").eq(1).addClass("active");
    });

    $('#modal_form .fa-times, #overlay').click(function(){ // ловим клик по крестику или подложке
      close_modal();
    });

    // alert($("otherclass").html());

    $('a[href^="#"]').on('click', function (event) {

        var target = $($(this).attr('href'));

        if (target.length) {
            event.preventDefault();
            $('html, body').animate({
                scrollTop: target.offset().top
            }, 1000);
        }

    });

    // if (!if_zoom) {
    //   $(".map .featured h4.subtitle").text("New Westminster, Braid st. 103-15");
    // } else {
    //   $(".map .featured h4.subtitle").text("We operate all around greater Vancouver");
    // }

    $(".cart-block .top-line .close").click(function () { $(".cart-block").css("display", "none"); });
    $(".cart .btn").click(function () { $(".cart-block").css("display", "block"); });
    /*$(".cart-block .content .item .remove").click(function () { $(this).closest(".item").remove(); });*/


    $(".cart-block .content").mCustomScrollbar();

    if (!$("body").hasClass("page-id-2")) {

        $("#menu-item-32 a").click(function(e){
            e.preventDefault();
            $(".moving-sub").stop().slideToggle(600,"linear", function () {});
        });
        
    }

    $(".dropdown-block .dropdown-item .title").click(function(){
        if ( $(this).hasClass("active")) {
            $(this).removeClass("active");
        } else {
            $(this).addClass("active");
        }
        $(this).next("div").stop().slideToggle(600,"linear", function () {});
    });

    var index_of_box_img = 2;
    setInterval(function(){
        $(".things-bin-img-bg .things-bin-img").attr("style", "background-image: url(/wp-content/themes/abcnewmoving/img/rentabox-wired-bin-content-0"+index_of_box_img+".png) ");
        if (index_of_box_img == 3) {
            index_of_box_img = 1;
        } else {
            index_of_box_img++;
        }
    },3000);

});


//D is description of the product.
var D = {};
/**
 * Append markup for table within description
 * @param {type} typeSize
 * @param {type} sizeName
 * @param {type} sizePrice
 * @returns {String}
 */
D.isOnePhotos = true;
D.priceTr = function (typeSize, sizeName, sizePrice) {
    var tr = '<tr><td class="left-line">' + sizeName + '</td>' +
            '<td class="center-line"><a class="minus-' + typeSize + '"></a>' +
            '<input class="input-' + typeSize + '" value="0">' +
            '<a class="plus-' + typeSize + '"></a></td>' +
            '<td class="price-' + typeSize + '">' + sizePrice + '$</td>' +
            '</tr>';
    jQuery('.prices').append(tr);
    return tr;
};
D.getProduct = function (productId) {
    jQuery.ajax({
        url: '/desc_handler.php',
        type: 'POST',
        data: {
            product_id: productId
        },
        dataType: 'json',
        success: D.successGetProduct,
        error: D.errorGetProduct
    });
}
D.successGetProduct = function (resp) {
    Cart.idOpeningProduct = resp.id;
    jQuery('.buy-title').text(resp.post_title);
    if (resp.post_content != null) {
        jQuery('.buy-descr').text(resp.post_content);
    }
    jQuery('#big-buy').attr('src', resp.title_photo);

    var photos = '';
    var flag = false;
    for (var i in resp.photos) {
        if(resp.photos[i] == resp.title_photo) {
            flag = true;
        }
    }
    if(flag == false) {
        photos += '<div class="mini-img pctr active"><img src="';
        photos += resp.title_photo;
        photos += '"></div>';        
    }
    for (var i in resp.photos) {
        if(resp.photos[i] == resp.title_photo) {
            photos += '<div class="mini-img pctr' + i + ' active"><img src="';
        } else {
            photos += '<div class="mini-img pctr' + i + '"><img src="';
        }
        photos += resp.photos[i];
        photos += '"></div>';
    }
    photos += '<div class="clear"></div>';
    if(resp.photos.length > 1) {
        jQuery('.miniatures').html(photos);        
    } else {
        jQuery('.miniatures').html('');
    }

    jQuery('.prices').html('<tr class="thed"><td class="left-line">Size</td><td class="center-line">Quantity</td><td>Price</td></tr>');
    var metaInfo = resp.meta_info;
    var commonPrice = true;
    if (typeof (metaInfo.size_name1) != 'undefined' && typeof (metaInfo.size_price1) != 'undefined') {
        commonPrice = false;
        D.priceTr('small', metaInfo.size_name1, metaInfo.size_price1);
    }
    if (typeof (metaInfo.size_name2) != 'undefined' && typeof (metaInfo.size_price2) != 'undefined') {
        commonPrice = false;
        D.priceTr('medium', metaInfo.size_name2, metaInfo.size_price2);
    }
    if (typeof (metaInfo.size_name3) != 'undefined' && typeof (metaInfo.size_price3) != 'undefined') {
        commonPrice = false;
        D.priceTr('large', metaInfo.size_name3, metaInfo.size_price3);
    }
    if (typeof (metaInfo.size_name4) != 'undefined' && typeof (metaInfo.size_price4) != 'undefined') {
        commonPrice = false;
        D.priceTr('extra', metaInfo.size_name4, metaInfo.size_price4);
    }
    if (typeof (metaInfo._wpsc_price) != 'undefined' && commonPrice) {
        D.priceTr('small', ' - ', metaInfo._wpsc_price);
    }
    if (typeof (metaInfo.type_name) != 'undefined') {
        jQuery('.thed .left-line').text(metaInfo.type_name);
    }
    
    var texts = '';
    for(var i in resp.texts) {
        if(resp.texts[i] == null) {
            texts += '<p id="text' + i + '"></p>';
        } else {
            texts += '<p id="text' + i + '">' + resp.texts[i] + '</p>';
        }
    }
    jQuery('.buy-descr').html(texts);
    jQuery('#text1').css('display', 'none');
    jQuery('#text2').css('display', 'none');
    jQuery('#text3').css('display', 'none');
    jQuery('#text4').css('display', 'none');

    jQuery('.buy-open').modal();
}
D.priceTotal = function () {
    var totalPrice = 0;
    for (var i in Cart.oneProduct) {
        var price = Cart.oneProduct[i].price;
        var quantity = Cart.oneProduct[i].quantity;
        totalPrice += price * quantity;
    }
    jQuery('.price-total-buy').text('$' + Cart.round(totalPrice));
}
D.clearProduct = function () {
    Cart.oneProduct = [];
    Cart.updateCartLabel();
    return false;
}
D.minusQuantity = function (selectorInput, selectorPrice) {
    if (jQuery(selectorInput).val() != 0) {
        var q = parseInt(jQuery(selectorInput).val()) - 1;
        jQuery(selectorInput).val(q);
        var price = jQuery(selectorPrice).text();
        var title = jQuery('.buy-title').text();
        var photo = jQuery('#big-buy').attr('src');
        Cart.pushInProduct(Cart.idOpeningProduct, jQuery(selectorInput).parent().parent().find('.left-line').text(), q, parseFloat(price), title, photo);
    }
}
D.plusQuantity = function (selectorInput, selectorPrice) {
    var q = parseInt(jQuery(selectorInput).val()) + 1;
    jQuery(selectorInput).val(q);
    var price = jQuery(selectorPrice).text();
    var title = jQuery('.buy-title').text();
    var photo = jQuery('#big-buy').attr('src');
    Cart.pushInProduct(Cart.idOpeningProduct, jQuery(selectorInput).parent().parent().find('.left-line').text(), q, parseFloat(price), title, photo);
}
//C is cart
var Cart = {};
Cart.allProducts = [];
Cart.oneProduct = [];
Cart.idOpeningProduct = 0;
Cart.round = function (summ) {
    return Math.round(parseFloat(summ) * 100) / 100;
}
Cart.pushInProduct = function (id, size, quantity, price, title, photo) {
    var isNotAdded = true;
    for (var i in Cart.oneProduct) {
        if (size == Cart.oneProduct[i].size) {
            Cart.oneProduct[i].quantity = quantity;
            isNotAdded = false;
        }
    }
    price = Math.round(price * 100) / 100;
    var product = {
        id: id,
        size: size,
        quantity: quantity,
        price: price,
        title: title,
        photo: photo,
    };
    if (isNotAdded) {
        Cart.oneProduct.push(product);
    }
    D.priceTotal();
}
Cart.addToCart = function () {
    Cart.fillCartFromStorage();
    
    var idAdded = false;
    var length = Cart.oneProduct.length;
    var lengthCount = 0;
    if (Cart.allProducts.length > 0) {
        for (var i in Cart.allProducts) {
            for (var i2 in Cart.oneProduct) {
                if (Cart.allProducts[i].price == Cart.oneProduct[i2].price && Cart.allProducts[i].id == Cart.oneProduct[i2].id && Cart.allProducts[i].size == Cart.oneProduct[i2].size) {
                    Cart.allProducts[i].quantity = Cart.oneProduct[i2].quantity;
                    Cart.allProducts[i].title = Cart.oneProduct[i2].title;
                    lengthCount += 1;
                    Cart.oneProduct.splice(i2, 1);
                }
            }
        }
    }
    if (lengthCount < length) {
        for(var i in Cart.oneProduct) {
            Cart.allProducts.push(Cart.oneProduct[i]);
        }
    }
    //add within session
    D.clearProduct();
    if(typeof(Storage) !== 'undefined') {
        localStorage.cart = JSON.stringify(Cart.allProducts);
    }
    console.log(localStorage.cart);
    
    /*jQuery.ajax({
        url: '/cart.php',
        type: 'post',
        dataType: 'json',
        data: {
            products: Cart.allProducts
        },
        success: function (resp) {
            console.log(resp)//
        },
        error: function (resp) {
            console.log(resp)
        }
    });*/
}
Cart.openCart = function () {
    Cart.fillCartFromStorage();
    jQuery('.cart-opened').html('');
    for (var i in Cart.allProducts) {
        var div = '<div class="item"><div class="remove"></div><div class="img"><img src="' + Cart.allProducts[i].photo + '"></div><div class="description"><input type="hidden" class="pr-id" value="' + Cart.allProducts[i].id + '"><input type="hidden" class="pr-size" value="' + Cart.allProducts[i].size + '">';
        div += '<div class="title">' + Cart.allProducts[i].title + '</div><div class="quantity">';
        div += 'Quantity: <span class="minus"></span> <input type="text" class="input-quantity-cart" value="' + Cart.allProducts[i].quantity + '" maxlength="2"> <span class="plus"></span>';
        div += '</div><div class="price">$<span>' + Math.round(Cart.allProducts[i].quantity * Cart.allProducts[i].price * 100) / 100 + '</span></div></div></div>';
        jQuery('.cart-opened').append(div);
    }
    Cart.updateTotalAmount();
}
Cart.updateCartLabel = function () {
    if (Cart.allProducts.length == 0) {
        jQuery('.cart .label').text('Your shopping cart is empty');
    }
    if (Cart.allProducts.length == 1) {
        jQuery('.cart .label').text('Your shopping cart is one product');
    }
    if (Cart.allProducts.length > 1) {
        jQuery('.cart .label').text('Your shopping cart is ' + Cart.allProducts.length + ' products');
    }
}
Cart.plusQuantity = function () {
    var input = jQuery(this).parent().find('input');
    var kolvo = input.val();
    if (kolvo == 99) {
        kolvo = 99;
    } else {
        kolvo++;
    }
    input.val(kolvo);
    //update the product in the cart
    var id = jQuery(this).parent().parent().find('.pr-id').val();
    var size = jQuery(this).parent().parent().find('.pr-size').val();
    var price = 0;
    for(var i in Cart.allProducts) {
        if(id == Cart.allProducts[i].id && size == Cart.allProducts[i].size) {
            Cart.allProducts[i].quantity = kolvo;
            price = Cart.allProducts[i].price;
        }
    }
    var s = Math.round(kolvo * price * 100) / 100;
    jQuery(this).parent().parent().find('.price span').text(s);
    Cart.updateTotalAmount();
    Cart.fillStorageFromCart();
    return false;
}
Cart.minusQuantity = function () {
    var kolvo = jQuery(this).next("input").val();
    if (kolvo == 0) {
        kolvo = 0;
    } else {
        kolvo--;
    }
    jQuery(this).next("input").val(kolvo);
    //update the product in the cart
    var id = jQuery(this).parent().parent().find('.pr-id').val();
    var size = jQuery(this).parent().parent().find('.pr-size').val();
    var price = 0;
    for(var i in Cart.allProducts) {
        if(id == Cart.allProducts[i].id && size == Cart.allProducts[i].size) {
            Cart.allProducts[i].quantity = kolvo;
            price = Cart.allProducts[i].price;
        }
    }
    var s = Math.round(kolvo * price * 100) / 100;
    jQuery(this).parent().parent().find('.price span').text(s);
    Cart.updateTotalAmount();
    Cart.fillStorageFromCart();
    return false;
}
Cart.updateTotalAmount = function () {
    var prices = jQuery('.description .price span');
    var totalSumm = 0;
    for (var i in prices) {
        var price = prices[i].innerHTML;
        price = parseFloat(price);
        if(isNaN(price)) {
            totalSumm += 0;
        } else {
            totalSumm += price;
        }
    }
    totalSumm = Math.round(totalSumm * 100) / 100;
    jQuery('.finish .total span').text('$' + totalSumm);
    Cart.updateCartLabel();
}
Cart.popCart = function () {
    var id = jQuery(this).parent().find('.description .pr-id').val();
    var size = jQuery(this).parent().find('.description .pr-size').val();
    for(var i in Cart.allProducts) {
        console.log(id == Cart.allProducts[i].id && size == Cart.allProducts[i].size)
        
        if(id == Cart.allProducts[i].id && size == Cart.allProducts[i].size) {
            Cart.allProducts.splice(i, 1);
        }
    }
    jQuery(this).parent().remove();
    Cart.updateTotalAmount();
}
Cart.checkout = function () {
    var price = jQuery('.finish .total span').text();
    price = price.substr(1);
    var desc = '';
    for(var i in Cart.allProducts) {
        desc += Cart.allProducts[i].title + ' (' + Cart.allProducts[i].id + ') ';
        desc += Cart.allProducts[i].size + ', ';
    }
    Cart.tranDesc = desc;
    /*jQuery.ajax({
        url: '/pay.php',
        data: {
            amount: price,
            desc: price
        },
        dataType: 'json',
        type: 'post',
        success: Cart.successGenerateHash,
        error: function (resp) {
            console.log(resp);
        }
    });*/
    localStorage.cart = '[]';    
    jQuery('#li_0_price').val(price);
    //jQuery('#li_0_name').val(Cart.tranDesc);
    jQuery('#li_0_quantity').val(Cart.allProducts.length);
    jQuery('#submit-2checkout').trigger('click');

    return false;
}
/*Cart.successGenerateHash = function (resp) {
    if(typeof(resp) != 'undefined') {
        jQuery('#amount').val(resp.amount);
        jQuery('#description').val('DESC');
        jQuery('#transaction_description').val(Cart.tranDesc);
        jQuery('#hash').val(resp.hash);
        jQuery('#paylane-submit').trigger('click');
        /*jQuery.ajax({
            url: 'https://secure.paylane.com/order/cart.html',
            data: {
                amount: resp.amount,
                currency: 'USD',
                merchant_id: 'abcnewmove',
                description: resp.desc,
                transaction_description: resp.desc,
                transaction_type: 'S',
                back_url: 'http://www.abcnewmoving.com/buy-supplies/',
                language: 'en',
                hash: resp.hash
                
            },
            dataType: 'json',
            type: 'post',
            success: function (resp) {
                console.log(resp);
            },
            error: function (resp) {
                console.log(resp);
            }
        });
        return false;
    }    
}*/
Cart.fillCartFromStorage = function () {
    if(typeof(localStorage.cart) != 'undefined' && localStorage.cart.length > 10) {
        Cart.allProducts = JSON.parse(localStorage.cart);
    }
}
Cart.fillStorageFromCart = function () {
    if(typeof(Storage) !== 'undefined') {
        localStorage.cart = JSON.stringify(Cart.allProducts);
    }
}
jQuery(document).ready(function ($) {
    jQuery(document).on('click', '.clear-product', D.clearProduct);
    jQuery(document).on('click', 'a.add-to-cart', Cart.addToCart);
    jQuery(document).on('click', '.cart .btn', Cart.openCart);
    jQuery(document).on('click', '.plus', Cart.plusQuantity);
    jQuery(document).on('click', '.minus', Cart.minusQuantity);
    jQuery(document).on('click', '.item .remove', Cart.popCart);

    $('.items-buy').click(function () {
        var productId = jQuery(this).find('a input.product-id').val();
        D.getProduct(productId);
    });

    jQuery(document).on('click', '.plus-small', function () { D.plusQuantity('.input-small', '.price-small') });
    jQuery(document).on('click', '.plus-medium', function () { D.plusQuantity('.input-medium', '.price-medium') });
    jQuery(document).on('click', '.plus-large', function () { D.plusQuantity('.input-large', '.price-large') });
    jQuery(document).on('click', '.plus-extra', function () { D.plusQuantity('.input-extra', '.price-extra') });

    jQuery(document).on('click', ".minus-small", function () { D.minusQuantity('.input-small', '.price-small'); });
    jQuery(document).on('click', ".minus-medium", function () { D.minusQuantity('.input-medium', '.price-medium'); });
    jQuery(document).on('click', ".minus-large", function () { D.minusQuantity('.input-large', '.price-large'); });
    jQuery(document).on('click', ".minus-extra", function () { D.minusQuantity('.input-extra', '.price-extra'); });

    jQuery('.mini-img').click(function () {
        jQuery('.mini-img').removeClass("active");
        jQuery('#big-buy').attr("src", jQuery(this).children('img').attr("src"));
        jQuery(this).addClass("active");
    });
    
    jQuery(document).on('click', '#checkout', Cart.checkout);
    
    jQuery('.input-small').keyup(function (e) {
        console.log('input')
    })
    
    jQuery(document).on('click', '.pctr0 img', function () {
        jQuery('#text0').css('display', 'block');
        jQuery('#text1').css('display', 'none');
        jQuery('#text2').css('display', 'none');
        jQuery('#text3').css('display', 'none');
        jQuery('#text4').css('display', 'none');
    });
    jQuery(document).on('click', '.pctr1 img', function () {
        jQuery('#text0').css('display', 'none');
        jQuery('#text1').css('display', 'block');
        jQuery('#text2').css('display', 'none');
        jQuery('#text3').css('display', 'none');
        jQuery('#text4').css('display', 'none');
    });
    jQuery(document).on('click', '.pctr2 img', function () {
        jQuery('#text0').css('display', 'none');
        jQuery('#text1').css('display', 'none');
        jQuery('#text2').css('display', 'block');
        jQuery('#text3').css('display', 'none');
        jQuery('#text4').css('display', 'none');
    });
    jQuery(document).on('click', '.pctr3 img', function () {
        jQuery('#text0').css('display', 'none');
        jQuery('#text1').css('display', 'none');
        jQuery('#text2').css('display', 'none');
        jQuery('#text3').css('display', 'block');
        jQuery('#text4').css('display', 'none');
    });
    jQuery(document).on('click', '.pctr4 img', function () {
        jQuery('#text0').css('display', 'none');
        jQuery('#text1').css('display', 'none');
        jQuery('#text2').css('display', 'none');
        jQuery('#text3').css('display', 'none');
        jQuery('#text4').css('display', 'block');
    });
});

jQuery(document).keyup(function (e) {
    var className = e.currentTarget.activeElement.className;
    if(className == 'input-small' || className == 'input-large' || className == 'input-medium' || className == 'input-extra') {
        var q = parseInt(jQuery(e.target).val());
        var price = jQuery(e.target).parent().parent().find('td').eq(2).text();
        var title = jQuery('.buy-title').text();
        var photo = jQuery('#big-buy').attr('src');
        Cart.pushInProduct(Cart.idOpeningProduct, jQuery(e.target).parent().parent().find('.left-line').text(), q, parseFloat(price), title, photo);
    }
    if(className == 'input-quantity-cart') {
        var input = jQuery(e.target);
        var kolvo = input.val();
        if (kolvo == 99) {
            kolvo = 99;
        } 
        if (kolvo < 0) {
            kolvo = kolvo * (-1);
        }
        input.val(kolvo);
        //update the product in the cart
        var id = jQuery(e.target).parent().parent().find('.pr-id').val();
        var size = jQuery(e.target).parent().parent().find('.pr-size').val();
        var price = 0;
        for(var i in Cart.allProducts) {
            if(id == Cart.allProducts[i].id && size == Cart.allProducts[i].size) {
                Cart.allProducts[i].quantity = kolvo;
                price = Cart.allProducts[i].price;
            }
        }
        var s = Math.round(kolvo * price * 100) / 100;
        jQuery(e.target).parent().parent().find('.price span').text(s);
        Cart.updateTotalAmount();
        return false;
    }
});
Cart.fillCartFromStorage();

jQuery(document).ready(function($) {
    jQuery(".big-buy-open").each(function(){
        //alert(jQuery(this).find(".miniatures").find('.mini-img').length());
    });
})