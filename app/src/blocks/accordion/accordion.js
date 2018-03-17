var defaults = {
	delay: 300, // Скорость анимации
	mobilePoint: 576 // Брейкпоинт мобильной версии
};

var methods = {
	init: function(options) {

		var config = $.extend({}, defaults, options);

		var
			classBlock = this.attr('class').split(' ')[0], //
			classTitle = classBlock + '__title',
			classTitleActive = classTitle + '_opened',
			classBody = classBlock + '__body';

		return this.each(function() {
			var
				$accordion = $(this),
				$panels = $accordion.find('.' + classBlock + '__panel'),
				$allTitles = $accordion.find('.' + classTitle);

			$panels.each(function() {
				var $title = $(this).find('.' + classTitle);

				$title.on('click', function() {
					if (window.innerWidth >= config.mobilePoint) return;

					var $this = $(this);

					if ($this.hasClass(classTitleActive)) {
						togglePanel($this, 'close');
					} else {
						togglePanel($allTitles, 'close');
						togglePanel($this);
					}
				});
			});
		});

		function togglePanel($title, action) {

			if (action === 'close') {
				$title
					.removeClass(classTitleActive)
					.parent()
					.find('.' + classBody)
					.slideUp(config.delay, function() {
						$(this).css('display', '');
					});
			} else {
				$title
					.addClass(classTitleActive)
					.parent()
					.find('.' + classBody)
					.slideDown(config.delay);
			}
		}
	}
};

$.fn.accordion = function(method) {

	if (this.length) {
		return methods.init.apply(this, arguments);
	}
};