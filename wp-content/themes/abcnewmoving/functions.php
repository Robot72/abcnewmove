<?php

function enqueue_styles() {
	wp_register_style('normalize', get_template_directory_uri() . '/css/normalize.css'  );
	wp_enqueue_style('normalize');

	wp_register_style('font-awesome', get_template_directory_uri() . '/css/font-awesome.min.css'  );
	wp_enqueue_style('font-awesome');

	wp_register_style('font-Montserrat', 'https://fonts.googleapis.com/css?family=Montserrat:400,700'  );
	wp_enqueue_style('font-Montserrat');

	wp_register_style('font-PTSans', 'https://fonts.googleapis.com/css?family=PT+Sans:400,700,400italic,700italic'  );
	wp_enqueue_style('font-PTSans');

	wp_register_style('font-Josefin', 'https://fonts.googleapis.com/css?family=Josefin+Sans:400,600'  );
	wp_enqueue_style('font-Josefin');

	wp_register_style('font-Dansing', 'https://fonts.googleapis.com/css?family=Dancing+Script:400,700'  );
	wp_enqueue_style('font-Dansing');

	wp_enqueue_style( 'abcnewmoving', get_stylesheet_uri());

	wp_register_style('modal', get_template_directory_uri() . '/css/modal.css' );
	wp_enqueue_style('modal');

	wp_register_style('mCustomScrollbar', get_template_directory_uri() . '/css/jquery.mCustomScrollbar.min.css' );
	wp_enqueue_style('mCustomScrollbar');

}
add_action('wp_enqueue_scripts', 'enqueue_styles');

function enqueue_scripts() {
	wp_register_script('mCustomScrollbar-js', get_template_directory_uri() . '/js/jquery.mCustomScrollbar.concat.min.js' );
	wp_enqueue_script('mCustomScrollbar-js');

	wp_register_script('main-scripts', get_template_directory_uri() . '/js/scripts.js' , array('jquery'), '', true);
	wp_enqueue_script('main-scripts');
}
add_action('wp_enqueue_scripts', 'enqueue_scripts');

if (preg_match('/(?i)msie [2-8]/',$_SERVER['HTTP_USER_AGENT'])) {
	wp_register_script('html5-shim', 'http://html5shim.googlecode.com/svn/trunk/html5.js');
	wp_enqueue_script('html5-shim');
}

if (function_exists('add_theme_support')) {
	add_theme_support('menus');
	add_theme_support('post-thumbnails');
}

add_post_type_support( 'page', 'excerpt' );

function content($limit) {
	$search = array(	'@<script[^>]*?>.*?</script>@si', 	// Strip out javascript
						'@<style[^>]*?>(.*?)</style>@siU',	// Strip style tags properly
						'@<style>(.*?)</style>@siU',    	// Strip style tags properly
						'@<[\/\!]*?[^<>]*?>@si',            // Strip out HTML tags
						'@<![\s\S]*?--[ \t\n\r]*>@'         // Strip multi-line comments including CDATA
						);
	$content = preg_replace($search, '', get_the_content());
	$content = explode(' ', $content, $limit);
	if (count($content) >= $limit) {
		array_pop($content);
		$content = implode(" ",$content).'...' . '<a href="'. get_permalink($post-->ID) . '" >' . 'читать далее' . '</a>';
	} else {
		$content = implode(" ",$content);
	}
	return $content;
}


function codes_validate( $result, $tag ) {
    $tag = new WPCF7_Shortcode( $tag );
    if ( 'moving-from' == $tag->name ) {
        $moving_from = isset( $_POST['moving-from'] ) ? trim( $_POST['moving-from'] ) : '';
        if ( $moving_from == " " ) {
          $result->invalidate( $tag, "Specify your start address" );
        } 
    }
    if ( 'moving-to' == $tag->name ) {
        $moving_to = isset( $_POST['moving-to'] ) ? trim( $_POST['moving-to'] ) : '';
        if ( $moving_to == " " ) {
          $result->invalidate( $tag, "Specify your destination address" );
        }
    }
    return $result;
}
add_filter( 'wpcf7_validate_text*', 'codes_validate', 20, 2 );

?>