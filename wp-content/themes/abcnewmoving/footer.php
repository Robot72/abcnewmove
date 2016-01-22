<div class="contact-form">
	<div class="container">
		<div class="feedback">
			<h3>Find out the cost of your move!</h3>
			<?php echo do_shortcode('[contact-form-7 id="4" title="Contact form 1"]') ?>
		</div>
	</div>
</div>

<footer class="footer">
	<div class="container">
		<div class="footer-block footer-block-menu">
			<? wp_nav_menu(array('menu' => 'footer-menu', 'menu_class' => 'footer-menu')); ?>
		</div>
		<div class="footer-block footer-block-contacts">
			<div class="footer-block-contacts-item address">
				<span class="label">
					<i class="icon icon-map"></i>
				</span>
				<p>Address: 103 - 15 Braid street New Westminster, BC, V3L 5N7</p>
			</div>
			<div class="footer-block-contacts-item phone">
				<span class="label">
					<i class="icon icon-phone"></i>
				</span>
				<p>Phone: (604) 727-2210</p>
			</div>
			<div class="footer-block-contacts-item fax">
				<span class="label">
					<i class="icon icon-fax"></i>
				</span>
				<p>Fax: (604) 524-3334</p>
			</div>
			<div class="footer-block-contacts-item email">
				<span class="label">
					<i class="icon icon-email"></i>
				</span>
				<p>Email: <br /> <a href="mailto:contact@abcnewmoving.com">contact@abcnewmoving.com</a></p>
			</div>
		</div>
		<div class="footer-block footer-block-last footer-block-information">
			<p>ABC NEW MOVE Ltd. <br />
			© <?php echo date("Y"); ?> All Rights Reserved
			</p>
			Follow us:
			<div class="social-btns">
				<a class="social-btn" href="#">
					<i class="fa fa-facebook"></i>
				</a><!--
			 --><a class="social-btn" href="#">
					<i class="fa fa-twitter"></i>
				</a><!--
			 --><a class="social-btn social-btn-last" href="#">
					<i class="fa fa-instagram"></i>
				</a>
			</div>
			<div class="credits">
				<img src="<?php echo bloginfo('template_url'); ?>/img/credit-visa.png" alt="Visa" title="Visa">
				<img src="<?php echo bloginfo('template_url'); ?>/img/credit-mastercard.png" alt="Mastercard" title="Mastercard">
				<img src="<?php echo bloginfo('template_url'); ?>/img/credit-amex.png" alt="American Express" title="American Express">
				<img src="<?php echo bloginfo('template_url'); ?>/img/credit-discover.png" alt="Discover Network" title="Discover Network">
			</div>
		</div>
	</div>
</footer>

<?php //require_once( "/wp-content/themes/abcnewmoving/cart.php" ) ?>
<?php wp_footer(); ?>
<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCIQYAqbSs3UOJZ_SM_vVelyu6C_tJgR7s&amp;callback=initMap"></script>
</body>
</html>