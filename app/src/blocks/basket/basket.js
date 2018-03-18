var defaults = {
	removeDelay: 500
};

var methods = {
	init: function(options) {

		var config = $.extend({}, defaults, options);

		var
			$block = this,
			$items = $block.find('.basket__item'),
			$coupon = $block.find('.basket__coupon');

		$items.each(function() {
			var
				$item = $(this),
				$removeBtn = $item.find('.basket__remove'),
				$amount = $item.find('.amount__input');

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

			/* Обновление цен у карточки при изменении количества */
			$amount.on('changed.amount', function() {
				refreshItemPrice($item);
			});
			/* ================================================== */
		});

		/* Заносим скидку в карточки */
		$coupon.on('activated.coupon', function() {
			var
				$this = $(this),
				discount = $this.attr('data-discount');

			$items.each(function() {
				var $this = $(this);

				$this.find('.basket__discount').text(discount);
				$this.trigger('refresheddiscount.basket');
			});
		});
		/* ========================= */

		/* Обновление цен у карточки при добавлении скидки */
		$items.on('refresheddiscount.basket', function() {
			refreshItemPrice($(this));
		});
		/* =============================================== */

		/* Функция обновления цен у карточки */
		function refreshItemPrice($item, callback) {
			callback = callback || function(){};

			var
				amount = $item.find('.basket__amount').val(), // Количество
				price = $item.attr('data-price'), // Цена за штуку
				discount = $item.find('.basket__discount').text(), // Скидка
				$price = $item.find('.basket__price'), // Ячейка с ценой
				$discountPrice = $item.find('.basket__discount-price'); // Ячейка с ценой со скидкой

			$price.text(price * amount);
			$discountPrice.text(Math.round(price * amount / 100 * (100 - discount)));

			$item.trigger('refreshedprice.basket');

			callback();
		}
		/* ========================= */

		return this;
	}
};

$.fn.basket = function(method) {

	if (this.length) {
		return methods.init.apply(this, arguments);
	}
};