/*
	Project data and gallery.
	To publish a repository link, replace the empty codeUrl value with its GitHub URL.
*/
(function($) {
	'use strict';

	var projects = [
		{
			title: 'Landing Page para Festival de Música Electrónica',
			image: 'images/image-poryect1.png',
			width: 1875,
			height: 826,
			summary: 'Landing page responsiva para presentar artistas, galería y precios de entradas de un festival.',
			description: [
				'Sitio web responsivo inspirado en el Ultra Music Festival. Incluye secciones de artistas, galería y precios de entradas.',
				'Fue desarrollado con HTML, CSS, JavaScript y Sass, con tareas de desarrollo automatizadas mediante Gulp.'
			],
			technologies: ['HTML5', 'CSS3', 'JavaScript', 'Sass', 'Gulp'],
			demoUrl: 'https://empiremusicfestival.netlify.app/',
			codeUrl: ''
		},
		{
			title: 'Blog de Café',
			image: 'images/image-proyect2.png',
			width: 1897,
			height: 789,
			summary: 'Blog sobre café con navegación clara, diseño responsivo y una presentación enfocada en el contenido.',
			description: [
				'Página tipo blog enfocada en consejos y cursos sobre café. Contiene una navegación moderna y un diseño limpio para facilitar la lectura.',
				'La interfaz fue maquetada con HTML5 y CSS3 puro y se adapta a distintos tamaños de pantalla.'
			],
			technologies: ['HTML5', 'CSS3'],
			demoUrl: 'https://blogdecafe-codeteam.netlify.app/',
			codeUrl: ''
		},
		{
			title: 'GuitarSite',
			image: 'images/image-proyect3.png',
			width: 1893,
			height: 811,
			summary: 'Tienda de guitarras creada con React, componentes reutilizables y un carrito de compras persistente.',
			description: [
				'Proyecto de tienda en línea creado con React y manejo de estado mediante Hooks.',
				'Incluye un carrito de compras que guarda la selección en localStorage y simula una experiencia de comercio electrónico mediante componentes reutilizables.'
			],
			technologies: ['React', 'JavaScript', 'CSS3', 'localStorage'],
			demoUrl: 'https://guitarsite.netlify.app/',
			codeUrl: ''
		},
		{
			title: 'Invernadero IoT',
			image: 'images/image-proyect4.png',
			width: 1594,
			height: 831,
			summary: 'Plataforma para monitorear sensores y controlar actuadores de un invernadero inteligente.',
			description: [
				'Plataforma web para monitoreo y control de un invernadero inteligente, desarrollada con HTML, CSS y JavaScript puro.',
				'La interfaz consume rutas HTTP desde un ESP32 que funciona como servidor local, entrega datos de sensores en tiempo real y permite activar los actuadores conectados.',
				'Una API en Express.js, desplegada con Docker y Nginx, almacena datos históricos en PostgreSQL e incorpora funciones de autenticación que continúan en desarrollo.'
			],
			technologies: ['JavaScript', 'ESP32', 'Express.js', 'Docker', 'Nginx', 'PostgreSQL'],
			demoUrl: 'https://invernaderoapp.netlify.app/',
			codeUrl: ''
		}
	];

	var batchSize = 4,
		visibleProjects = 0,
		lastDialogTrigger = null,
		$grid = $('#projects-grid'),
		$showMore = $('#show-more-projects'),
		$status = $('#projects-status'),
		$dialog = $('#project-dialog'),
		dialog = $dialog.get(0);

	function fillTechnologyList($list, technologies) {
		$list.empty();
		$.each(technologies, function(_, technology) {
			$('<li>').text(technology).appendTo($list);
		});
	}

	function createCodeAction(project) {
		var attributes = {
			class: 'button small icon brands fa-github',
			text: 'Ver código'
		};

		if (project.codeUrl) {
			return $('<a>', $.extend(attributes, {
				href: project.codeUrl,
				target: '_blank',
				rel: 'noopener noreferrer',
				'aria-label': 'Ver código de ' + project.title + ' en GitHub (abre en otra pestaña)'
			}));
		}

		return $('<span>', $.extend(attributes, {
			class: attributes.class + ' is-disabled',
			'aria-disabled': 'true',
			title: 'Enlace de código pendiente'
		}));
	}

	function createProjectCard(project, index) {
		var $card = $('<article>', { class: 'project-card' }),
			$image = $('<img>', {
				src: project.image,
				alt: 'Vista previa de ' + project.title,
				width: project.width,
				height: project.height,
				loading: 'lazy',
				decoding: 'async'
			}),
			$content = $('<div>', { class: 'project-card-content' }),
			$actions = $('<div>', { class: 'project-actions' });

		$('<div>', { class: 'project-card-image' }).append($image).appendTo($card);
		$('<h4>').text(project.title).appendTo($content);
		$('<p>', { class: 'project-summary' }).text(project.summary).appendTo($content);
		fillTechnologyList($('<ul>', {
			class: 'project-tech-list',
			'aria-label': 'Tecnologías utilizadas'
		}).appendTo($content), project.technologies);

		$('<a>', {
			class: 'button primary small icon solid fa-external-link-alt',
			href: project.demoUrl,
			target: '_blank',
			rel: 'noopener noreferrer',
			'aria-label': 'Ver demo de ' + project.title + ' (abre en otra pestaña)',
			text: 'Ver demo'
		}).appendTo($actions);
		createCodeAction(project).appendTo($actions);
		$('<button>', {
			type: 'button',
			class: 'button small project-details-button',
			'data-project-index': index,
			text: 'Ver detalles'
		}).appendTo($actions);

		$content.append($actions).appendTo($card);
		return $card;
	}

	function updateShowMoreButton() {
		var hasMoreProjects = visibleProjects < projects.length;
		$showMore.prop('hidden', !hasMoreProjects).toggle(hasMoreProjects);
	}

	function renderNextBatch(announce) {
		var nextLimit = Math.min(visibleProjects + batchSize, projects.length),
			previousCount = visibleProjects;

		for (; visibleProjects < nextLimit; visibleProjects += 1)
			$grid.append(createProjectCard(projects[visibleProjects], visibleProjects));

		updateShowMoreButton();
		if (announce)
			$status.text('Se mostraron ' + (visibleProjects - previousCount) + ' proyectos adicionales.');
	}

	function updateDialogCodeAction(project) {
		var $code = $('#project-dialog-code');

		if (project.codeUrl) {
			$code.attr({
				href: project.codeUrl,
				target: '_blank',
				rel: 'noopener noreferrer',
				'aria-label': 'Ver código de ' + project.title + ' en GitHub (abre en otra pestaña)'
			}).removeAttr('aria-disabled title').removeClass('is-disabled');
		} else {
			$code.removeAttr('href target rel aria-label')
				.attr({ 'aria-disabled': 'true', title: 'Enlace de código pendiente' })
				.addClass('is-disabled');
		}
	}

	function openProjectDialog(project, trigger) {
		lastDialogTrigger = trigger;
		$('#project-dialog-title').text(project.title);
		$('#project-dialog-image').attr({
			src: project.image,
			alt: 'Vista previa de ' + project.title,
			width: project.width,
			height: project.height
		});
		fillTechnologyList($('#project-dialog-technologies'), project.technologies);

		var $description = $('#project-dialog-description').empty();
		$.each(project.description, function(_, paragraph) {
			$('<p>').text(paragraph).appendTo($description);
		});

		$('#project-dialog-demo').attr({
			href: project.demoUrl,
			'aria-label': 'Ver demo de ' + project.title + ' (abre en otra pestaña)'
		});
		updateDialogCodeAction(project);

		if (dialog && typeof dialog.showModal === 'function')
			dialog.showModal();
		else
			$dialog.attr('open', '');
	}

	function closeProjectDialog() {
		if (!dialog)
			return;

		if (typeof dialog.close === 'function' && dialog.open)
			dialog.close();
		else
			$dialog.removeAttr('open');

		if (lastDialogTrigger)
			lastDialogTrigger.focus();
	}

	$grid.on('click', '.project-details-button', function() {
		openProjectDialog(projects[Number($(this).attr('data-project-index'))], this);
	});
	$showMore.on('click', function() {
		renderNextBatch(true);
	});
	$('#project-dialog-close').on('click', closeProjectDialog);
	$dialog.on('click', function(event) {
		if (event.target === dialog)
			closeProjectDialog();
	}).on('close', function() {
		if (lastDialogTrigger)
			lastDialogTrigger.focus();
	});

	renderNextBatch(false);

})(jQuery);
