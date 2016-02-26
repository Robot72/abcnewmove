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

    $(".cart-block .top-line .close").click(function () {
        $(".cart-block").css("display", "none");
    });
    $(".cart .btn").click(function () {
        $(".cart-block").css("display", "block");
    });
    
    $(".cart-block .content .item .remove").click(function () {
        $(this).closest(".item").remove();
    });


    $(".cart-block .content").mCustomScrollbar();

});


//D is description of the product.
var D = {}
/**
 * Append markup for table within description
 * @param {type} typeSize
 * @param {type} sizeName
 * @param {type} sizePrice
 * @returns {String}
 */
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
    for (var i in resp.all_photos) {
        photos += '<div class="mini-img"><img src="';
        photos += resp.all_photos[i];
        photos += '></div>';
    }
    photos = '<div class="clear"></div>';
    jQuery('.miniatures').html(photos);

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

    jQuery('.buy-open').modal();
}
D.priceTotal = function () {
    var totalPrice = 0;
    for (var i in Cart.oneProduct) {
        var price = Cart.oneProduct[i].price;
        var quantity = Cart.oneProduct[i].quantity;
        totalPrice += price * quantity;
    }
    jQuery('.price-total-buy').text('$' + totalPrice);
}
D.clearProduct = function () {
    Cart.oneProduct = [];
    Cart.updateCartLabel();
    return false;
}
//C is cart
var Cart = {};
Cart.allProducts = [];
Cart.oneProduct = [];
Cart.idOpeningProduct = 0;
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
    D.clearProduct();
}
Cart.openCart = function () {
    jQuery('cart-opened').html('');
    for (var i in Cart.allProducts) {
        var div = '<div class="item"><div class="remove"></div><div class="img"><img src="' + Cart.allProducts[i].photo + '"></div><div class="description"><input type="hidden" class="pr-id" value="' + Cart.allProducts[i].id + '"><input type="hidden" class="pr-size" value="' + Cart.allProducts[i].size + '">';
        div += '<div class="title">' + Cart.allProducts[i].title + '</div><div class="quantity">';
        div += 'Quantity: <span class="minus"></span> <input type="text" value="' + Cart.allProducts[i].quantity + '" maxlength="2"> <span class="plus"></span>';
        div += '</div><div class="price">$<span>' + Cart.allProducts[i].quantity * Cart.allProducts[i].price + '</span></div></div></div>';
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
    jQuery(this).parent().parent().find('.price span').text(kolvo * s);
    Cart.updateTotalAmount();
    return false;
}
Cart.updateTotalAmount = function () {
    var prices = jQuery('.description .price span');
    var totalSumm = 0;
    for (var i in prices) {
        var price = prices[i].innerText;
        price = parseFloat(price);
        if(isNaN(price)) {
            totalSumm += 0;
        } else {
            totalSumm += price;
        }
    }
    totalSumm = Math.round(totalSumm * 100) / 100;
    jQuery('.finish .total span').text('$' + totalSumm);
}
Cart.popCart = function () {
    var id = jQuery(this).parent().find('.description .pr-id').val();
    var size = jQuery(this).parent().find('.description .pr-size').val();
    for(var i in Cart.allProducts) {
        if(id == Cart.allProducts[i].id && size == Cart.allProducts[i].size) {
            Cart.allProducts.slice(i, 1);
        }
    }
    jQuery(this).parent().remove();
    Cart.updateTotalAmount();
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

    jQuery(document).on('click', '.plus-small', function () {
        var q = parseInt(jQuery('.input-small').val()) + 1;
        jQuery('.input-small').val(q);
        var price = jQuery('.price-small').text();
        var title = jQuery('.buy-title').text();
        var photo = jQuery('#big-buy').attr('src');
        Cart.pushInProduct(Cart.idOpeningProduct, jQuery('.left-line').text(), q, parseFloat(price), title, photo);
    });

    jQuery(".plus-medium").click(function () {
        jQuery('.input-medium').val(parseInt(jQuery('.input-medium').val()) + 1);
    });

    jQuery(".plus-large").click(function () {
        jQuery('.input-large').val(parseInt(jQuery('.input-large').val()) + 1);
    });

    jQuery(".plus-extra").click(function () {
        jQuery('.input-extra').val(parseInt(jQuery('.input-extra').val()) + 1);
    });

    jQuery(document).on('click', ".minus-small", function () {
        if (jQuery('.input-small').val() != 0) {
            var q = parseInt(jQuery('.input-small').val()) - 1;
            jQuery('.input-small').val(q);
            var price = jQuery('.price-small').text();
            var title = jQuery('.buy-title').text();
            var photo = jQuery('#big-buy').attr('src');
            Cart.pushInProduct(Cart.idOpeningProduct, jQuery('.left-line').text(), q, parseFloat(price), title, photo);
        }
    });

    jQuery(".minus-medium").click(function () {
        if (jQuery('.input-medium').val() != 0) {
            jQuery('.input-medium').val(parseInt(jQuery('.input-medium').val()) - 1);
        }
    });

    jQuery(".minus-large").click(function () {
        if (jQuery('.input-large').val() != 0) {
            jQuery('.input-large').val(parseInt(jQuery('.input-large').val()) - 1);
        }
    });

    jQuery(".minus-extra").click(function () {
        if (jQuery('.input-extra').val() != 0) {
            jQuery('.input-extra').val(parseInt(jQuery('.input-extra').val()) - 1);
        }
    });

    jQuery('.mini-img').click(function () {
        jQuery('.mini-img').removeClass("active");
        jQuery('#big-buy').attr("src", jQuery(this).children('img').attr("src"));
        jQuery(this).addClass("active");
    });
    
    
});

