$('.items-buy').click(function(){
    $('.buy-open').modal();
});

$(".plus-small").click(function(){
    $('.input-small').val(parseInt($('.input-small').val())+1) ;
});

$(".plus-medium").click(function(){
    $('.input-medium').val(parseInt($('.input-medium').val())+1) ;
});

$(".plus-large").click(function(){
    $('.input-large').val(parseInt($('.input-large').val())+1) ;
});

$(".plus-extra").click(function(){
    $('.input-extra').val(parseInt($('.input-extra').val())+1) ;
});

$(".minus-small").click(function(){
    if ($('.input-small').val() != 0){
        $('.input-small').val(parseInt($('.input-small').val())-1) ;
    }
});

$(".minus-medium").click(function(){
    if ($('.input-medium').val() != 0){
        $('.input-medium').val(parseInt($('.input-medium').val())-1) ;
    }
});

$(".minus-large").click(function(){
    if ($('.input-large').val() != 0){
        $('.input-large').val(parseInt($('.input-large').val())-1) ;
    }
});

$(".minus-extra").click(function(){
    if ($('.input-extra').val() != 0){
        $('.input-extra').val(parseInt($('.input-extra').val())-1) ;
    }
});

$('.mini-img').click(function(){
    $('.mini-img').removeClass("active");
    $('#big-buy').attr("src",$(this).children('img').attr("src"));
    $(this).addClass("active");
});