var defaults = {
	removeDelay: 500
};

var methods = {
	init: function(options) {

		var config = $.extend({}, defaults, options);

		var
			$block = this,
			$items = $block.find('.basket__item');

		$items.each(function() {
			var
				$item = $(this),
				$removeBtn = $item.find('.basket__remove');

			/* Обработка нажатия на кнопку «Удалить» */
			$removeBtn.on('click', function() {
				$item
					.fadeOut(config.removeDelay, function() {
						$(this)
							.trigger('itemremoved.basket')
							.remove();
					});
			});
			/* ===================================== */
		});

		return this;
	}
};

$.fn.basket = function(method) {

	if (this.length) {
		return methods.init.apply(this, arguments);
	}
};