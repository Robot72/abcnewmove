<?php
//ОСТРОЖНО!!! ДАЛЕЕ ГОВНОКОД!!!
include_once('wp-content/themes/abcnewmoving/app/application.php');

if (isset($_POST['product_id'])) {
    $product_id = $_POST['product_id'];
    $app = Application::getInstance();
    //MAIN CONTENT about product(title, description)
    $query = "SELECT * "
        . "FROM 6mdwiG_posts "
        . "WHERE ID = $product_id; ";
    $product = $app->query($query);
    $product_info = $product->fetch();
    //PHOTOS of the product
    $product_photos = $app->query("SELECT * "
            . "FROM 6mdwiG_posts "
            . "WHERE post_parent = $product_id AND post_type = \"attachment\"; ");
    $src = $product_photos->fetch();
    $items_product = $app->query("SELECT * "
            . "FROM 6mdwiG_posts "
            . "WHERE post_parent = $product_id AND post_type = \"wpsc-product\"; ");
    $item_product = $items_product->fetch();
    
    if(isset($item_product)) {
        $id = $item_product['ID'];
        if(isset($id)) {
            $product_photos2 = $app->query("SELECT * "
                    . "FROM 6mdwiG_posts "
                    . "WHERE post_parent = $id; ");
            $src2 = $product_photos2->fetch();
        }
    }
    $meta_query = "SELECT * "
            . "FROM 6mdwiG_postmeta "
            . "WHERE post_id = $product_id; ";
    $meta_query2 = "SELECT * "
            . "FROM 6mdwiG_postmeta "
            . "WHERE post_id = $id; ";
    
    //Second and next photos of the product
    $all_photos = array();
    $all_texts = array();
    $all_ids = array();
    if(FALSE) {
        if(empty($src['guid'])) {
            $all_photos[] = $src2['guid'];
            $all_texts[] = $src2['post_excerpt'];
            $all_ids[] = $src2['ID'];
        } else {
            $all_photos[] = $src['guid'];
            $all_texts[] = $src['post_excerpt'];
            $all_ids[] = $src['ID'];
        }
        
        while($photo = $product_photos2->fetch()) {
            $all_photos[] = $photo['guid'];
            $all_texts[] = $photo['post_excerpt'];
            $all_ids[] = $photo['ID'];
            //echo '<pre>'; var_dump($photo); echo '</pre>';die();
        }        
    } else {
        $all_photos[] = $src['guid'];
        $all_texts[] = $src['post_excerpt'];
        $all_ids[] = $src['ID'];
        while($photo = $product_photos->fetch()) {
            $all_photos[] = $photo['guid'];
            $all_texts[] = $photo['post_excerpt'];
            $all_ids[] = $photo['ID'];
        }
    }
    //Get all metainformation about the product.
    $meta_info = [];
    $meta = $app->query($meta_query);
    $_wpsc_price = true;
    $f1 = true;
    while($m = $meta->fetch()) {
        if( $_wpsc_price == true && strcmp($m['meta_key'], '_wpsc_price') == 0 ) { 
            $value = $m['meta_value'];
            $key = '_wpsc_price';
            $_wpsc_price = false;
            $f1 = false;
        }
        if( !strcmp($m['meta_key'], 'size_name1') ) { 
            $value = $m['meta_value'];
            $key = 'size_name1';
        }
        if( !strcmp($m['meta_key'], 'size_name2') ) { 
            $value = $m['meta_value'];
            $key = 'size_name2';
        }
        if( !strcmp($m['meta_key'], 'size_name3') ) { 
            $value = $m['meta_value'];
            $key = 'size_name3';
        }
        if( !strcmp($m['meta_key'], 'size_name4') ) { 
            $value = $m['meta_value'];
            $key = 'size_name4';
        }
        if( !strcmp($m['meta_key'], 'size_price1') ) { 
            $value = $m['meta_value'];
            $key = 'size_price1';
        }
        if( !strcmp($m['meta_key'], 'size_price2') ) { 
            $value = $m['meta_value'];
            $key = 'size_price2';
        }
        if( !strcmp($m['meta_key'], 'size_price3') ) { 
            $value = $m['meta_value'];
            $key = 'size_price3';
        }
        if( !strcmp($m['meta_key'], 'size_price4') ) { 
            $value = $m['meta_value'];
            $key = 'size_price4';
        }
        if( !strcmp($m['meta_key'], 'type_name') ) { 
            $value = $m['meta_value'];
            $key = 'type_name';
        }
        if(isset($key) && isset($value)) {
            $meta_info[$key] = $value;      
        }                
    }
    if(count($meta_info) == 0) {
        $meta2 = $app->query($meta_query2); while ($m2 = $meta2->fetch()) {
            if( strcmp($m2['meta_key'], '_wpsc_price') == 0 ) { 
                $value = $m2['meta_value'];
                $key = '_wpsc_price';
                $meta_info[$key] = $value; 
            }               
        }        
    }
    
    if(isset($src)) {
        $title_photo = $src['guid'];
    }
    if(!isset($src) && isset($src2)) {
        $title_photo = $src2['guid'];
    }
    $response = array(
        'id' => $product_info['ID'],
        'post_title' => $product_info['post_title'],
        'post_content' => $product_info['post_content'],
        'title_photo' => $title_photo,
        'photos' => $all_photos,
        'texts' => $all_texts,
        'ids' => $all_ids,
        'meta_info' => $meta_info,
        //'debug' =>var_dump($product_photos),
        //'debug1' =>$meta_query
    );
    
    echo json_encode($response);
}
