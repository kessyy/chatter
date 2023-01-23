(function($) {
	'use strict';

	// TODO: Check if still needed here, after moving to app.component
	// START MENU JS
	/*$(window).on('scroll', function() {
		if ($(this).scrollTop() > 50) {
			$('.main-nav').addClass('menu-shrink');
		} else {
			$('.main-nav').removeClass('menu-shrink');
		}
	});

    // Mean Menu
	jQuery('.mean-menu').meanmenu({
		meanScreenWidth: "991"
	});*/

	// Sorting Portfolio JS
	$('#container').mixItUp();

	// Nice Select JS
	$('select').niceSelect();

	// Companies Slider JS
	$('.companies-slider').owlCarousel({
		loop:true,
		margin: 0,
		nav: false,
		dots: true,
		smartSpeed: 1000,
		autoplay:true,
		autoplayTimeout:4000,
		autoplayHoverPause:true,
		responsive:{
			0:{
				items:1,
			},
			600:{
				items:2,
			},
			1000:{
				items:4,
			}
		}
	});

  // TODO: Check if still needed here, after moving to home.component
	// Profile Slider JS
	/*$('.profile-slider').owlCarousel({
		loop:true,
		margin: 0,
		nav: false,
		dots: true,
		smartSpeed: 1000,
		autoplay:true,
		autoplayTimeout:4000,
		autoplayHoverPause:true,
		responsive:{
			0:{
				items:1,
			},
			600:{
				items:2,
			},
			1000:{
				items:4,
			}
		}
	});*/

	// Wow JS
	new WOW().init();

	// Back to top
	$('body').append('<div id="toTop" class="back-to-top-btn"><i class="icofont-dotted-up"></i></div>');
	$(window).scroll(function () {
		if ($(this).scrollTop() != 0) {
			$('#toTop').fadeIn();
		} else {
			$('#toTop').fadeOut();
		}
	});
	$('#toTop').on('click', function(){
		$("html, body").animate({ scrollTop: 0 }, 900);
		return false;
	});

})(jQuery);
