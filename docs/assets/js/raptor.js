(function ($) {
	$.fn.raptorize = function (options) {
		var defaults = {
			enterOn: 'click',
			delayTime: 5000
		};
		//Extend those options
		var options = $.extend(defaults, options);
		return this.each(function () {
			var _this = $(this);
			//Raptor Vars
			var raptorImageMarkup = '<img id="elRaptor" style="display: none" src="https://ibreak.systems/assets/raptor/raptor.png" />'
			var raptorAudioMarkup = '<audio id="elRaptorShriek" preload="auto"><source src="https://ibreak.systems/assets/raptor/raptor-sound.mp3" /><source src="https://ibreak.systems/assets/raptor/raptor-sound.ogg" /></audio>';
			var locked = false;
			//Append Raptor and Style
			$('body').append(raptorImageMarkup);
			$('body').append(raptorAudioMarkup); 
			var raptor = $('#elRaptor').css({
				"position": "fixed",
				"bottom": "-700px",
				"right": "0",
				"display": "block"
			})

			// Animating Code
			function init() {
				locked = true;

				//Sound Hilarity
				function playSound() {
					document.getElementById('elRaptorShriek').play();
				}
				playSound();

				// Movement Hilarity	
				raptor.animate({
					"bottom": "0"
				}, function () {
					$(this).animate({
						"bottom": "-130px"
					}, 100, function () {
						var offset = (($(this).position().left) + 400);
						$(this).delay(300).animate({
							"right": offset
						}, 2200, function () {
							raptor = $('#elRaptor').css({
								"bottom": "-700px",
								"right": "0"
							})
							locked = false;
						})
					});
				});
			}

			_this.bind('click', function (e) {
				e.preventDefault();
				if (!locked) {
					init();
				}
			})
		});
	}
})(jQuery);
