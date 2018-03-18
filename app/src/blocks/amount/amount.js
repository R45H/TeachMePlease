var defaults = {
	maxCount: 100
};

var methods = {
	init: function(options) {

		var config = $.extend({}, defaults, options);

		return this.each(function() {
			var
				$block = $(this),
				$plus = $block.find('.amount__btn_plus'),
				$minus = $block.find('.amount__btn_minus'),
				$input = $block.find('.amount__input');

			/* Обработка ввода с клавиатуры */
			$input.on('input', function() {
				var val = modValue($(this).val());
				$input.val(val);
				$input.trigger('changed.amount');
			});
			/* ============================ */

			/* Обработка клика на плюс */
			$plus.on('click', function() {
				var val = modValue(+$input.val() + 1);
				$input.val(val);
				$input.trigger('changed.amount');
			});
			/* ======================= */

			/* Обработка клика на минус */
			$minus.on('click', function() {
				var val = modValue($input.val() - 1);
				$input.val(val);
				$input.trigger('changed.amount');
			});
			/* ======================== */

			function modValue(val) {
				val = String(val);

				// Если пусто или меньше нуля, то 0
				if (val === '' || val <= 1) {
					val = 1;
					return val;
				}

				// Ввод только цифр
				if (val.match(/[^0-9]/g)) {
					val = val.replace(/[^0-9]/g, '');
				}

				//	Не больше указанного числа
				if (val > config.maxCount) {
					val = config.maxCount;
				}

				return val;
			}
		});
	}
};

$.fn.amount = function(method) {

	if (this.length) {
		return methods.init.apply(this, arguments);
	}
};