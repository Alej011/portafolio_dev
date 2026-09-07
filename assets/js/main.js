/*
	Read Only by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var $window = $(window),
		$body = $('body'),
		$header = $('#header'),
		$titleBar = null,
		$nav = $('#nav'),
		$wrapper = $('#wrapper');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '1025px',  '1280px' ],
			medium:   [ '737px',   '1024px' ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ null,      '480px'  ],
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Tweaks/fixes.

		// Polyfill: Object fit.
			if (!browser.canUse('object-fit')) {

				$('.image[data-position]').each(function() {

					var $this = $(this),
						$img = $this.children('img');

					// Apply img as background.
						$this
							.css('background-image', 'url("' + $img.attr('src') + '")')
							.css('background-position', $this.data('position'))
							.css('background-size', 'cover')
							.css('background-repeat', 'no-repeat');

					// Hide img.
						$img
							.css('opacity', '0');

				});

			}

	// Header Panel.

		// Nav.
			var $nav_a = $nav.find('a');

			$nav_a
				.addClass('scrolly')
				.on('click', function() {

					var $this = $(this);

					// External link? Bail.
						if ($this.attr('href').charAt(0) != '#')
							return;

					// Deactivate all links.
						$nav_a.removeClass('active').removeAttr('aria-current');

					// Activate link *and* lock it (so Scrollex doesn't try to activate other links as we're scrolling to this one's section).
						$this
							.addClass('active')
							.attr('aria-current', 'location')
							.addClass('active-locked');

					// Move keyboard navigation to the selected section without interrupting scrolling.
						var $destination = $($this.attr('href'));
						if ($destination.length)
							$destination.attr('tabindex', '-1')[0].focus({ preventScroll: true });

				})
				.each(function() {

					var	$this = $(this),
						id = $this.attr('href'),
						$section = $(id);

					// No section for this link? Bail.
						if ($section.length < 1)
							return;

					// Scrollex.
						$section.scrollex({
							mode: 'middle',
							top: '5vh',
							bottom: '5vh',
							initialize: function() {

								// Deactivate section.
									$section.addClass('inactive');

							},
							enter: function() {

								// Activate section.
									$section.removeClass('inactive');

								// No locked links? Deactivate all links and activate this section's one.
									if ($nav_a.filter('.active-locked').length == 0) {

										$nav_a.removeClass('active').removeAttr('aria-current');
										$this.addClass('active').attr('aria-current', 'location');

									}

								// Otherwise, if this section's link is the one that's locked, unlock it.
									else if ($this.hasClass('active-locked'))
										$this.removeClass('active-locked');

							}
						});

				});

		// Title Bar.
			$titleBar = $(
				'<div id="titleBar">' +
					'<a href="#header" class="toggle" role="button" aria-label="Abrir menú" aria-controls="header" aria-expanded="false"></a>' +
					'<span class="title">' + $('#logo').html() + '</span>' +
				'</div>'
			)
				.appendTo($body);

		// Panel.
			$header
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnEscape: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'right',
					target: $body,
					visibleClass: 'header-visible'
				});

		// Keep the mobile disclosure and keyboard focus in sync on every close path.
			var $toggle = $titleBar.find('.toggle');
			function syncPanel() {
				var mobile = breakpoints.active('<=medium'),
					open = mobile && $body.hasClass('header-visible');

				if (!mobile)
					$body.removeClass('header-visible');

				$toggle.attr('aria-expanded', String(open))
					.attr('aria-label', open ? 'Cerrar menú' : 'Abrir menú');

				if (mobile && !open) {
					if ($header[0].contains(document.activeElement))
						$toggle[0].focus({ preventScroll: true });
					$header.attr('inert', '').attr('aria-hidden', 'true');
				} else {
					$header.removeAttr('inert aria-hidden');
					if (document.activeElement === $toggle[0])
						$nav_a[0].focus({ preventScroll: true });
				}
			}

			$header.on('panelchange', syncPanel);
			breakpoints.on('<=medium', syncPanel);
			breakpoints.on('>medium', syncPanel);
			$toggle.on('keydown', function(event) {
				if (event.key === ' ') {
					event.preventDefault();
					$(this).trigger('click');
				}
			});
			$(document).on('focusin', function(event) {
				if (breakpoints.active('<=medium') && $body.hasClass('header-visible')
					&& !$header[0].contains(event.target) && event.target !== $toggle[0])
					$header._hide();
			});

	// Scrolly.
		$('.scrolly').scrolly({
			speed: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 1000,
			offset: function() {

				if (breakpoints.active('<=medium'))
					return $titleBar.height();

				return 0;

			}
		});

})(jQuery);
