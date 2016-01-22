<?php 

/*
Template Name: Home_template
*/

get_header() ?>

<section class="services container" id="services">
	<h2>Select a service</h2>
	<div class="services-block">
		<a class="services-item" href="#">
			<div class="services-item-in">
				<div class="img">
					<img src="<?php echo bloginfo('template_url'); ?>/img/residential-service2.jpg" width="250" height="144" alt="RESIDENTIAL MOVING">
					<div class="shadow"></div>
					<div class="caption">
						<h4>RESIDENTIAL MOVING</h4>
						<p>Bring our track to you on time</p>
					</div>
				</div>
			</div>
		</a>
		<a class="services-item" href="#">
			<div class="services-item-in">
				<div class="img">
					<img src="<?php echo bloginfo('template_url'); ?>/img/commercial-service.jpg" width="250" height="144" alt="COMMERCIAL MOVING">		
					<div class="shadow"></div>
					<div class="caption">
						<h4>COMMERCIAL MOVING</h4>
						<p>Supply you wrapping materials</p>
					</div>
				</div>
			</div>
		</a>
		<a class="services-item" href="#">
			<div class="services-item-in">
				<div class="img">
					<img src="<?php echo bloginfo('template_url'); ?>/img/service-delivery.jpg" width="250" height="144" alt="Delivery">
					<div class="shadow"></div>
					<div class="caption">
						<h4>Delivery</h4>
						<p>Provide special packing materials</p>
					</div>
				</div>
			</div>
		</a>
		<a class="services-item" href="#">
			<div class="services-item-in">
				<div class="img">
					<img src="<?php echo bloginfo('template_url'); ?>/img/urgent-service.jpg" width="250" height="144" alt="URGENT MOVING">					
					<div class="shadow"></div>
					<div class="caption">
						<h4>URGENT MOVING</h4>
						<p>We drive - you save</p>
					</div>
				</div>
			</div>
		</a>
	</div>
</section>

<?php get_footer() ?>