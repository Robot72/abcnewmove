<?php 

include_once('app/application.php');
/*
Template Name: shop-all-products_template
*/
//ОСТРОЖНО!!! ДАЛЕЕ ГОВНОКОД!!!
$app = Application::getInstance();
//*-------------------- QUERIES ----------------------------------//
$stmt = $app->query("SELECT 6mdwiG_terms.name, 6mdwiG_terms.name, 6mdwiG_posts.post_title "
        . "FROM 6mdwiG_posts join 6mdwiG_term_relationships "
        . "on 6mdwiG_posts.id = 6mdwiG_term_relationships.object_id "
        . "join 6mdwiG_term_taxonomy "
        . "on 6mdwiG_term_taxonomy.term_taxonomy_id = 6mdwiG_term_relationships.term_taxonomy_id "
        . "join 6mdwiG_terms "
        . "on 6mdwiG_terms.term_id = 6mdwiG_term_relationships.term_taxonomy_id "
        . "where 6mdwiG_term_taxonomy.taxonomy = \"wpsc_product_category\" ;");

$categories = $app->query("SELECT 6mdwiG_terms.name, 6mdwiG_terms.slug, 6mdwiG_terms.term_id, 6mdwiG_term_taxonomy.term_taxonomy_id "
        . "FROM 6mdwiG_terms join 6mdwiG_term_taxonomy "
        . "ON 6mdwiG_terms.term_id = 6mdwiG_term_taxonomy.term_id "
        . "WHERE "
        . "6mdwiG_term_taxonomy.taxonomy = \"wpsc_product_category\" AND "
        . "6mdwiG_term_taxonomy.count > 0 "
        . "ORDER BY 6mdwiG_term_taxonomy.description ; ");

//*------------------ VIEWS and LOGIC -------------------------------*/
get_header() ?>

<div class="content-buy">
    <?php while($row = $categories->fetch()) { ?>
    <div class="cat-name">
        <?php  echo $row['name']; ?>
    </div>
    <?php 
        $term_taxonomy_id = $row['term_taxonomy_id'];
        $products = $app->query("SELECT * "
                . "FROM 6mdwiG_term_taxonomy JOIN 6mdwiG_term_relationships "
                . "ON 6mdwiG_term_taxonomy.term_taxonomy_id = 6mdwiG_term_relationships.term_taxonomy_id "
                . "JOIN 6mdwiG_posts "
                . "ON 6mdwiG_term_relationships.object_id = 6mdwiG_posts.ID "
                . "WHERE 6mdwiG_term_taxonomy.term_taxonomy_id = $term_taxonomy_id AND "
                . "6mdwiG_posts.post_status IN ( 'publish', 'inherit' ) "
                . "ORDER BY post_date ; ");
        $flag = true;
        while($row = $products->fetch()) { 
            $product_id = $row['ID'];
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

            ?>
    
                <div class="items-buy">
                    <a class="item-buy<?php echo $flag == true ? ' defaultDOMWindow' : '' ?>">
                        <input type="hidden" class="product-id" value="<?php echo $row['ID'] ?>">
                        <div class="buy-img">
                            <img src="<?php 
                            
                            if(empty($src['guid'])) { 
                                if(empty($src2['guid']))
                                    echo 'http://www.m2.by/img/emptyobject/resulttable.jpeg';
                                else 
                                    echo $src2['guid'];
                            } else { 
                                echo $src['guid'];                             
                            } 
                            ?>">
                        </div>
                        <div class="sizes"><?php 
                            //Get types_available
                            $mm = $app->query($meta_query); $flag1 = true; while($m = $mm->fetch()) { 
                                if( !strcmp($m['meta_key'], 'types_available') ) { 
                                    echo $m['meta_value'];
                                    $flag1 = false;
                                }          
                            } 
                            //Define sizes available
                            $countSizes = 0;
                            $mm = $app->query($meta_query); while($m = $mm->fetch()) { 
                                if( !strncmp($m['meta_key'], 'size_', 5) ) { 
                                    $countSizes++;
                                }          
                            }                             
                            if($flag1 == true) {
                                if($countSizes == 0)
                                    echo 1;
                                else 
                                    echo round ($countSizes / 2);
                            } ?>
                            
                             <?php
                            //Get name_type ..
                             $mm = $app->query($meta_query); $flag0 = true; while($m = $mm->fetch()) { 
                                if( !strcmp($m['meta_key'], 'type_name') ) { 
                                    echo strtolower($m['meta_value']); 
                                    $flag0 = false;
                                }                            
                            }; 
                            if($flag0 == true)
                                 echo 'sizes';
                            ?> available</div>
                        <div class="mini-info">
                            <div class="buy-name"><?php echo $row['post_title'] ?></div>
                            <div class="buy-price">Price: <span>$<?php $meta = $app->query($meta_query); $f1 = true; while($m = $meta->fetch()) { 
                                if( !strcmp($m['meta_key'], '_wpsc_price') ) { 
                                    echo $m['meta_value'];
                                    $f1 = false;
                                }             
                            } 
                            if($f1) {
                                $meta2 = $app->query($meta_query2); while ($m2 = $meta2->fetch()) {
                                    if( !strcmp($m2['meta_key'], '_wpsc_price') ) { 
                                        echo $m2['meta_value'];                                    
                                    }   
                                }
                            } 
?></span></div>
                        </div>
                    </a>        
                </div>
            <?php $flag = false;  
        } ?>
    <div class="clear"></div>
<?php } ?>

    <div class="buy-open">
        <div class="overflowed">
            <div class="big-buy-open">
                <img id="big-buy" src="http://www.abcnewmoving.com/wp-content/themes/abcnewmoving/img/big-1.jpg">
                <div class="miniatures">
                    <div class="mini-img active">
                        <img src="http://www.abcnewmoving.com/wp-content/themes/abcnewmoving/img/big-1.jpg">
                    </div>
                    <div class="mini-img">
                        <img src="http://www.abcnewmoving.com/wp-content/themes/abcnewmoving/img/big-2.jpg">
                    </div>
                    <div class="clear"></div>
                </div>
            </div>
            <div class="buy-open-descr">
                <div class="buy-title"></div>
                <div class="buy-descr">
                    
                </div>
                <table class="prices">
                    <!--
                    <tr class="thed">
                        <td class="left-line">Size</td>
                        <td class="center-line">Quantity</td>
                        <td>Price</td>
                    </tr>
                    
                    <tr>
                        <td class="left-line">Small</td>
                        <td class="center-line">
                            <a class="minus-small"></a>
                            <input class="input-small" value="0"><a class="plus-small"></a></td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td class="left-line">Medium</td>
                        <td class="center-line"><a class="minus-medium"></a><input class="input-medium" value="0"><a class="plus-medium"></a></td>
                        <td>$5.97</td>
                    </tr>
                    <tr>
                        <td class="left-line">Large</td>
                        <td class="center-line"><a class="minus-large"></a><input class="input-large" value="0"><a class="plus-large"></a></td>
                        <td>$5.98</td>
                    </tr>
                    <tr>
                        <td class="left-line">Extra Large</td>
                        <td class="center-line"><a class="minus-extra"></a><input class="input-extra" value="0"><a class="plus-extra"></a></td>
                        <td>-</td>
                    </tr>-->
                </table>
                <div class="total">
                    TOTAL: <span class="price-total-buy">$0.00</span>
                </div>
                <a class="btn add-to-cart modalClose">
                    ADD TO CART
                </a>
            </div>
            <div class="clear"></div>
        </div>
    </div>
</div>
<!--form action="https://secure.paylane.com/order/cart.html" method="post">
    <input type="hidden" id="amount" name="amount" value="" />
    <input type="hidden" id="currency" name="currency" value="USD" />
    <input type="hidden" id="merchant_id" name="merchant_id" value="abcnewmove" />
    <input type="hidden" id="description" name="description" value="" />
    <input type="hidden" id="transaction_description" name="transaction_description" value="" />
    <input type="hidden" id="transaction_type" name="transaction_type" value="S" />
    <input type="hidden" id="back_url" name="back_url" value="http://www.abcnewmoving.com/buy-supplies/" />
    <input type="hidden" id="language" name="language" value="en" />
    <input type="hidden" id="hash" name="hash" value="" />
    
    <button id="paylane-submit" style="display: none;" type="submit">Pay with PayLane</button>
</form-->
<form action='https://www.2checkout.com/checkout/purchase' method='post'>
  <input type='hidden' id="sid" name='sid' value='102844141' />
  <input type='hidden' id="mode" name='mode' value='2CO' />
  <input type='hidden' id="currency_code" name='currency_code' value='USD' />
  <input type='hidden' id="li_0_type" name='li_0_type' value='product' />
  <input type='hidden' id="li_0_name" name='li_0_name' value='Product' />
  <input type='hidden' id="li_0_price" name='li_0_price' value='' />
  <input type='hidden' id="li_0_quantity" name='li_0_quantity' value='' />
  <input type='hidden' id="li_0_tangible" name='li_0_tangible' value='N' />
  <input type='hidden' name='demo' value='Y'>
  <input id="submit-2checkout" name='submit' type='submit' value='Checkout' style="display: none;"/>
</form>
<style>
.featured, .map{
    display: none;
}
</style>
<script type="text/javascript" src="http://www.abcnewmoving.com/wp-content/themes/abcnewmoving/js/jquery.simplemodal-1.1.1.js"></script>
<script type="text/javascript" src="http://www.abcnewmoving.com/wp-content/themes/abcnewmoving/js/buing.js"></script>
<?php get_footer() ?>