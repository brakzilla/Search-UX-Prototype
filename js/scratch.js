$(document).ready(function() {

	$('.cta a.flirt').click(function() {
		$(this).addClass('pressed');
		$(this).html('<span></span>Flirted');
	});
	
	$('.cta a.hotlist').click(function() {
		$(this).addClass('pressed');
		$(this).html('<span></span>Hotlisted');
	});
});