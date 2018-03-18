var defaults = {
	coupons: [
		{
			"coupon": "abcd1234",
			"discount": 15
		}
	]
};

var methods = {
	init: function(options) {

		var config = $.extend({}, defaults, options);

		var
			$block = this,
			$input = $block.find('.coupon__input'),
			$btn = $block.find('.coupon__btn');

		/* Обработка ввода купона */
		$btn.on('click', function() {
			if ($btn.hasClass('coupon__btn_disabled')) return;

			var text = $input.val();

			$.each(config.coupons, function(i, val) {

				if (text == val.coupon) {
					$input.attr('readonly', 'readonly');
					$btn
						.addClass('coupon__btn_disabled')
						.val('купон активирован')
						.attr('data-discount', val.discount)
						.trigger('activated.coupon');
				}
			});

		});
		/* ====================== */

		return this;
	}
};

$.fn.coupon = function(method) {

	if (this.length) {
		return methods.init.apply(this, arguments);
	}
};