  var styleArray = [
    {
      featureType: "all",
      stylers: [
       { saturation: -100 }
      ]
    },{
      featureType: "road.arterial",
      elementType: "geometry",
      stylers: [
        { hue: "#000" },
        { saturation: 0 }
      ]
    },{
      featureType: "poi",
      elementType: "labels",
      stylers: [
        { visibility: "off" }
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
  
  google.maps.event.addListener(beachMarker, 'mouseover', function() {
    beachMarker.setIcon(image1);
});
google.maps.event.addListener(beachMarker, 'mouseout', function() {
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

  beachMarker.addListener('click', function() {
    if (!if_zoom) {
      if_zoom = true;
      map.setZoom(16);
      map.setCenter(position_of_center_with_marker);
      map_subtitle.innerHTML="New Westminster, Braid st. 103 - 15";
    } else {
      if_zoom = false;
      map.setZoom(11);
      map.setCenter(center_of_map);
      map_subtitle.innerHTML="We operate all around greater Vancouver";
    }
  });

  map.addListener('click', function() {
    if (if_zoom) {
      if_zoom = false;
      map.setZoom(11);
      map.setCenter(center_of_map);
      map_subtitle.innerHTML="We operate all around greater Vancouver";
    }
  });

}


jQuery(document).ready(function($) {

  // alert($("otherclass").html());

  $('a[href^="#"]').on('click', function(event) {

      var target = $( $(this).attr('href') );

      if( target.length ) {
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

  $(".cart-block .top-line .close").click(function(){
    $(".cart-block").css("display","none");
  });
  $(".cart .btn").click(function(){
    $(".cart-block").css("display","block");
  });
  $(".cart-block .content .item .description .quantity .minus").click(function(){
    var kolvo = $(this).next("input").val();
    if (kolvo == 0) {
      kolvo = 0;
    } else {
      kolvo--;
    }
    $(this).next("input").val(kolvo);
  });
  $(".cart-block .content .item .description .quantity .plus").click(function(){
    var kolvo = $(this).prev("input").val();
    if (kolvo == 99) {
      kolvo = 99;
    } else {
      kolvo++;
    }
    $(this).prev("input").val(kolvo);
  });
  $(".cart-block .content .item .remove").click(function(){
    $(this).closest(".item").remove();
  });
  

  $(".cart-block .content").mCustomScrollbar();
  


})

