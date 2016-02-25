<?php
include_once('app/application.php');
/*
  Template Name: page_for_content_template
 */
//ОСТОРОЖНО, далее говнокод:
$id = get_the_ID();
$app = Application::getInstance();
//Query for get content from db for the page.
$query = "SELECT * "
    . "FROM 6mdwiG_posts "
    . "WHERE ID = $id; ";
$product = $app->query($query);
$product_info = $product->fetch();
// Конец говнокода
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
    <head>
        <meta http-equiv="Content-type" content="text/html; charset=<?php bloginfo('charset'); ?>"/>
        <meta http-equiv="X-UA-Compatible" content="IE=Edge"/>
        <meta name="Keywords" content="vancouver movers, vancouver moving, burnaby movers, burnaby moving, richmond  movers, richmond moving, new west movers, new west moving, new westminister movers, new westminster moving, coquitlam movers, coquitlam moving, langley movers, langley moving, vancouver island movers, whistler movers, coquitlam moves, coquitlam movers, coquitlam moving, port coquitlam movers, port coquitlam moving, delta movers, delta moving, maple ridge movers, maple ridge moving, surrey movers, surrey moving, north van movers, north vancouver movers, north vancouver moving, north van moving, north shore movers, north shore moving, west van movers, west vancouver movers, west vancouver moving, vancouver moving companies, vancouver moving company, delivering services, delivery service, residential movers, residential moves,residential moving vancouver, residential movers vancouver, residential moving west vancouver, residential movers west vacnouver, residenial moving north vancouver, residential movers north vancouver, residential moving coquitlam, residential movers Coquitlam, commercial movers,commercial moves, commercial moving vancouver, commercial movers vancouver, residential deliveries, residential delivery, commercial deliveries, commercial delivery, home movers, business movers, local movers, professional movers, experienced movers, affordable movers, lower mainland movers, greater vancouver movers, greater vancouver moving, piano movers, piano movers vancouver, white rock movers, white rock moving, chilliwack movers, chilliwack moving, abbotsford movers, abbotsford moving, movers, moving, best movers vancouver, best moving company vancouver, laborers, moving company, reliable movers, hardwood deliveries, hardwood delivery, kitchen cabinet deliveries, kitchen cabinet delivery, kitchen cabinetry delivery, furniture deliveries, furniture delivery, appliance deliveries, appliance delivery, short notice moves, last minute moves, urgent movers,urgent moves, bc movers, west coast movers, last minute movers, short notice movers, social services quotes, social services movers, yaletown movers, kitsilano movers, kits movers, moving services, furniture assembly, craigslist movers, craigslist delivery services, order supplies online vancouver, order supplies online, moving supplies order online vancouver, moving supplies order online, moving supplies, rent plastic box vancouver, rent strong box vancouver">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title><?php wp_title('«', true, 'right'); ?> <?php bloginfo('name'); ?></title>
<?php wp_head(); ?>
        <link href='https://fonts.googleapis.com/css?family=Architects+Daughter' rel='stylesheet' type='text/css'>
        <link rel="stylesheet" id="abcnewmoving-css" href="http://www.abcnewmoving.com/wp-content/themes/abcnewmoving/buy-supplies.css" type="text/css" media="all">
        <link rel="stylesheet" id="abcnewmovingc-css" href="http://www.abcnewmoving.com/wp-content/themes/abcnewmoving/rent.css" type="text/css" media="all">
    </head>
    <body <?php body_class(); ?>>


        <header class="header">
            <div class="container">
                <div class="cart">
                    <div class="label">Your shopping cart is empty</div>
                    <a href="#" class="btn">Shop now</a>

                </div>
                <div class="contacts">
                    <div class="label">Сall us for free estimate</div>
                    <a href="tel:6047272210" class="phone">604 - 727 - 2210</a>
                    <a href="#" class="btn">or contact us</a>
                </div>
                <a class="logo" href="/"></a>
                <div class="clear"></div>
            </div>

        </header>
        <nav class="menu">
            <div class="container">
                <? wp_nav_menu(array('menu' => 'top-menu', 'menu_class' => 'top-menu')); ?>
            </div>
        </nav>
        <div class="map demo-2">

            <div class="title <?php the_ID(); ?>">
                <?php the_title('<h1 class="entry-title">', '</h1>'); ?>
                <?php echo $product_info['post_content'] ?>
            </div>


        </div>

        <!--content-->

<?php get_footer() ?>