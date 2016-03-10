<?php
//!!!ATTENTION!!! BELOW IS SHIT CODE.
//start_session();

if( isset($_POST['product']) ) {
    $product = $_POST['product'];
    echo'<pre>';print_r($product);echo'</pre>';die();
    /*if( !isset($_SESSION['cart'])) {
        $_SESSION['cart'] = [];
    } else {
        $_SESSION['cart'][] = [1];
    }*/
} else {
    echo 'empty';
}