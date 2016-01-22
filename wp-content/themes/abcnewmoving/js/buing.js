jQuery(document).ready(function(){
    jQuery('.items-buy').click(function(){
        jQuery('.buy-open').modal();
    });

    jQuery(".plus-small").click(function(){
        jQuery('.input-small').val(parseInt(jQuery('.input-small').val())+1) ;
    });

    jQuery(".plus-medium").click(function(){
        jQuery('.input-medium').val(parseInt(jQuery('.input-medium').val())+1) ;
    });

    jQuery(".plus-large").click(function(){
        jQuery('.input-large').val(parseInt(jQuery('.input-large').val())+1) ;
    });

    jQuery(".plus-extra").click(function(){
        jQuery('.input-extra').val(parseInt(jQuery('.input-extra').val())+1) ;
    });

    jQuery(".minus-small").click(function(){
        if (jQuery('.input-small').val() != 0){
            jQuery('.input-small').val(parseInt(jQuery('.input-small').val())-1) ;
        }
    });

    jQuery(".minus-medium").click(function(){
        if (jQuery('.input-medium').val() != 0){
            jQuery('.input-medium').val(parseInt(jQuery('.input-medium').val())-1) ;
        }
    });

    jQuery(".minus-large").click(function(){
        if (jQuery('.input-large').val() != 0){
            jQuery('.input-large').val(parseInt(jQuery('.input-large').val())-1) ;
        }
    });

    jQuery(".minus-extra").click(function(){
        if (jQuery('.input-extra').val() != 0){
            jQuery('.input-extra').val(parseInt(jQuery('.input-extra').val())-1) ;
        }
    });

    jQuery('.mini-img').click(function(){
        jQuery('.mini-img').removeClass("active");
        jQuery('#big-buy').attr("src",jQuery(this).children('img').attr("src"));
        jQuery(this).addClass("active");
    });
});

