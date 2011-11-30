$(function(){
	$.fn.shuffle = function() {
 
        var allElems = this.get(),
            getRandom = function(max) {
                return Math.floor(Math.random() * max);
            },
            shuffled = $.map(allElems, function(){
                var random = getRandom(allElems.length),
                    randEl = $(allElems[random]).clone(true)[0];
                allElems.splice(random, 1);
                return randEl;
           });
 
        this.each(function(i){
            $(this).replaceWith($(shuffled[i]));
        });
 
        return $(shuffled);
 
    };

	$.fn.render = function() {
		var xml = $(this);
		var pic;
		var city;
		var state;
		var country;
		
		var no_pic;
		var gender;
		
		var count = 0;
		var row = 1;
		
		//$(xml).find('member').shuffle();
		
		$(xml).find('member').shuffle().each(function(){
			var divcount = $('.result').length;
			var name = $(this).find('name').text();
			var divname = name + '_' + divcount;
			var type = $(this).find('type').text();
			var sex = $(this).find('sex').text();
			var age = $(this).find('age').text();
			
			//block string from extending too far out
			var displayName = name.substring(0, 10) + '...';

			
			$(this).find('photo').each(function(){
				switch(sex) {
					case '1':
						no_pic = 'http://graphics.pop6.com/images/common/no_photo/96x96/male.gif';
						gender = 'M';
						break;
					case '2':
						no_pic = 'http://graphics.pop6.com/images/common/no_photo/96x96/female.gif';
						gender = 'F';
						break;
					case '3':
						no_pic = 'http://graphics.pop6.com/images/common/no_photo/96x96/couple.gif';
						gender = 'C';
						break;
					case '5':
						no_pic = 'http://graphics.pop6.com/images/common/no_photo/96x96/couple.gif';
						gender = 'C'
						break;
					case '6':
						no_pic = 'http://graphics.pop6.com/images/common/no_photo/96x96/couple.gif';
						gender = 'C';
						break;
					case '4':
						no_pic = 'http://graphics.pop6.com/images/common/no_photo/96x96/group.gif';
						gender = 'G';
						break;					
					case '7':
						no_pic = 'http://graphics.pop6.com/images/common/no_photo/96x96/tstvtg.gif';
						gender = 'T';
						break;					
					default: 
						no_pic = 'http://graphics.pop6.com/images/common/no_photo/96x96/female.gif';
						gender = '?';
						break;
				}
			
				pic = $(this).find('url').text();
				if(pic == ''){
					pic = no_pic;
				} else {
					pic = pic.replace('gallery', 'square');
				}
			});		
			
			$(this).find('location').each(function(){					
				city = $(this).find('city').text();
				state = $(this).find('state').text();
				country = $(this).find('country').text();
			});	
			
			//parse mid from pic
			var urlparts = pic.split('.');
			var mid = urlparts[2].replace('com/photo-ffadult-r20-s' + sex + '-', '');
			
			$('<div class="result" id="result_' + divname + '"></div>').appendTo('#results');			
			$('<div class="pic"></div>').html('<a href="http://adultfriendfinder.com/p/member.cgi?mid=' + mid + '">' + '<img src="' + pic + '" />' + '</a>').appendTo('#result_' + divname);				
			$('<div class="name"></div>').html('<a href="http://adultfriendfinder.com/p/member.cgi?mid=' + mid + '">' + displayName + '</a>' +age + '/' + gender).appendTo('#result_' + divname);
			$('<div class="location"></div>').html(city + ', '+ state).appendTo('#result_' + divname);
			$('<div class="cta-bar"></div>').html('<div class="cta"></div><div class="cta"></div><div class="cta"></div><div class="cta"></div>').appendTo('#result_' + divname);
			count++;
			
			if(count%6 != 0) {
				$('<div class="gut"></div>').appendTo('#results');
			}		
		});

		$('<div class="vpage-container"></div>').appendTo('#results');
		
		$('#load-more').fadeIn('slow');
		
		
		
		var options = $.extend({
			callback: function() {}
		}, arguments[0] || {});    
		options.callback.call(this);
	};

	$.fn.results = function() {	
		//Create query string from the params
		var qstr = jQuery.param($.params);
		
		$('#loading').show();
		$.ajax({
			type: 'GET',
			url: '/search/g1211990?xml_req=1&' + qstr,
			dataType: 'xml',
			success: function(xml) { 
				$(xml).render({
					callback: function() {
						$('#loading').fadeOut(500);
						if($('.result').length > 25) {
							var summary = $('#summary').height() + 70;
							$('html, body').animate({ 
								scrollTop: $('#scrollDown').offset().top - summary
								} , 500,
								function() {
									$('.vpage').fadeIn(500);
								});
							
						} else {
							$('html, body').animate({scrollTop:0});
						}
					}
				});
			}
		});
	};
	
	$.fn.sticky = function() {
	  var header = $(this),
		  origTop = header.offset().top,
		  content = header.add('#main');

	  $(window).scroll(function(e) {
		if ($(this).scrollTop() > origTop) {
		  content.addClass('sticky');
		} else if ($(this).scrollTop() < origTop) {
		  content.removeClass('sticky');
		}
	  });
	};

	
	$.fn.determine = function(p,w) {	
		$.params[p] = [];
	
		$('#' + w + ' input:checked').each(function() {
			$.params[p].push( $(this).val() );
		});
		$.params[p] = $.params[p].toString();
		
		if( $('#' + w + ' input:checked').length < 1 ) {
			delete($.params[p]);
		}
	};
	
	$.fn.loadmore = function() {
		$('#scrollDown').remove();
		$('#load-more').hide();
		$('#loading').fadeIn(500);
		
		//Increment start number for next page of results
		$.params.start += 24;
		$.params.page++;
		window.location.hash = 'page' + $.params.page;
		
		//+$('<div class="vpage-container"></div>').appendTo('#results');
		$('<div class="vpage">Page ' + $.params.page + ' &bull; <a href="#top">Back to top<a/>  <a name="page' + $.params.page + '"></a></div>').appendTo( $(".vpage-container").last() );
		$('<div id="scrollDown"></div>').appendTo('#results');		
		
		$('#results').results();
	};
});



$(function(){

	var mouseOverActiveElement = false;

	$('#search-options').toggle(function(){
		$(this).toggleClass('options-active');
		$('.widget-link').removeClass('selected-widget');
		$('.widget-box').hide();		
		$('#searchform').animate({height:200},200);
		$('#advanced').fadeToggle(200);
		},function(){
		$(this).toggleClass('options-active');
		$('.widget-link').removeClass('selected-widget');
		$('.widget-box').hide();
		$('#advanced').fadeToggle(200);
		$('#searchform').animate({height:60},200);
	});
	
	$('#location-list li').click(function() {
		$('#location-widget').hide();
		$('#location-widget-link').removeClass('selected-widget');
		
		//take the get name selected location id
		$('#geo-label').html( $(this).attr('data-geoname') );		
		
		//launch the query, simulate clicking on find...
		$('#find-button').click();
	});
	
	$('.widget-link').click(function(){	
		$('.widget-box').not( $(this).next('.widget-box') ).hide();
		$('.widget-link').not( $(this) ).removeClass('selected-widget');
		$('active-widget-box').not( $(this).next('.widget-box') ).removeClass('active-widget-box');		
		
	
		$(this).toggleClass('selected-widget');		
		$(this).next('.widget-box').fadeToggle(200);
		$(this).next('.widget-box').addClass('active-widget-box');
	});
	

	$('.active-widget-box,.widget-link').live('mouseenter', function(){
		mouseOverActiveElement = true; 
	}).live('mouseleave', function(){ 
		mouseOverActiveElement = false; 
	});	
	
	$('html').live('click', function(){ 
		if (!mouseOverActiveElement) {
			$('.selected-widget').toggleClass('selected-widget');	
			$('.active-widget-box').removeClass('active-widget-box').hide();
		}
	});

	

	$('#load-more').click(function() {		
		$(this).loadmore();
	});
	
	$('.sort-links').click(function() {
		$('.active-sort').removeClass('active-sort');
		$(this).addClass('active-sort');
	});

	$('#distance-choices li').click(function() {
		$('.active-distance').removeClass('active-distance');
		$(this).addClass('active-distance');	
		$('#distance-label').html( $(this).text() );
	});
	
	$('#find-button').click(function() {
	
		//geo or zip value...
		var isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test( $('#geo-label').text() );
		if (isValidZip) {
			$.params.zip = $('#geo-label').text();
			$.params.geo = '';
		} else {
			$.params.geo = $('#geo-label').text();
			$.params.zip = '';
		}
			
		//set default vars based off form
		$.params.dist_max_value = $('#distance-label').text();			
		$.params.find_sex = $('#find-widget').val();
		$.params.age = $('#min-age-input').val() + '-' + $('#max-age-input').val();
		
		
		//determine if vars are set by checking each form widget and mapping it to form parametesr
		//$(this).determine(aff parameter form name, widget selector);
		
		$(this).determine('body_type', 'body-type-widget');
		$(this).determine('race', 'race-widget');
		$(this).determine('lang_spoken', 'languages-spoken-widget');
		$(this).determine('sex_orient', 'sexual-orientation-widget');
		$(this).determine('looking_for_what', 'interest-widget');
		$(this).determine('eye_color', 'eye-color-widget');
		$(this).determine('brasize', 'bra-size-widget');
		$(this).determine('hair_color', 'hair-type-widget.hair-color');
		$(this).determine('hair_length', 'hair-type-widget.hair-length');
		
		/*
		$.params.body_type = [];
		$('#body-type-widget input:checked').each(function() {
			$.params.body_type.push( $(this).val() );
		});
		$.params.body_type = $.params.body_type.toString();		
		if( $('#body-type-widget input:checked').length < 1 ) {
			delete($.params.body_type);
		}
		
		$.params.race = [];
		$('#race-widget input:checked').each(function() {
			$.params.race.push( $(this).val() );
		});
		$.params.race = $.params.race.toString();
		if( $('#race-widget input:checked').length < 1 ) {
			delete($.params.race);
		}
		
		$.params.lang_spoken = [];
		$('#languages-spoken-widget input:checked').each(function() {
			$.params.lang_spoken.push( $(this).val() );
		});
		$.params.lang_spoken = $.params.lang_spoken.toString();
		if( $('#languages-spoken-widget input:checked').length < 1 ) {
			delete($.params.lang_spoken);
		}		
		
		$.params.sex_orient = [];
		$('#orientation-widget input:checked').each(function() {
			$.params.sex_orient.push( $(this).val() );
		});
		$.params.sex_orient = $.params.sex_orient.toString();
		if( $('#orientation-widget input:checked').length < 1 ) {
			delete($.params.sex_orient);
		}
		
		$.params.marital = [];
		$('#marital-status-widget input:checked').each(function() {
			$.params.marital.push( $(this).val() );
		});
		$.params.marital = $.params.marital.toString();
		if( $('#marital-status-widget input:checked').length < 1 ) {
			delete($.params.marital);
		}
		
		$.params.looking_for_what = [];
		$('#interest-widget input:checked').each(function() {
			$.params.looking_for_what.push( $(this).val() );
		});
		$.params.looking_for_what = $.params.looking_for_what.toString();
		if( $('#interest-widget input:checked').length < 1 ) {
			delete($.params.looking_for_what);
		}

		$.params.eye_color = [];
		$('#eye-color-widget input:checked').each(function() {
			$.params.eye_color.push( $(this).val() );
		});
		$.params.eye_color = $.params.eye_color.toString();
		if( $('#eye-color-widget input:checked').length < 1 ) {
			delete($.params.eye_color);
		}
			
		$.params.brasize = [];
		$('#bra-size-widget input:checked').each(function() {
			$.params.brasize.push( $(this).val() );
		});
		$.params.brasize = $.params.brasize.toString();
		if( $('#bra-size-widget input:checked').length < 1 ) {
			delete($.params.brasize);
		}
		*/
		
		//Create query string from the params
		var qstr = jQuery.param($.params);		
		window.location.href = 'http://dev9.adultfriendfinder.com:7757/s/search.html?' + qstr
	});
	
	
	$('.filter-val').live('click', function() {
		$('input[name="' + $(this).attr('data-param') + '"][value="' + $(this).attr('data-val') + '"]').attr("checked",false).change();
		$('#find-button').click();
	});
	
	
	$('#location-finder-done').click(function() {
		$('#location-widget').hide();
		$('#location-widget-link').removeClass('selected-widget');		
		
		var zip =  $('#geo').val();
		if (zip) {
			$('#geo-label').html(zip);
		}
		$('#find-button').click();
	});
	
	
	$('.widget-box input').not("#location-widget input").change(function() {
		$(this).parent().parent().parent().prev('.widget-link').html( $(this).parent().parent().parent().prev('.widget-link').attr('data-label') + ': ' + $(this).parent().parent().parent('.widget-box').find('input:checkbox:checked').length + ' selected');		
		$('.selected-widget').next('.widget-box').find('.apply-button').fadeIn('fast');
		//$('.selected-widget').html( $('.selected-widget').attr('data-label') + ': ' + $('.selected-widget').next('.widget-box').find('input:checkbox:checked').length + ' selected');
		//$('.selected-widget').next('.widget-box').find('.apply-button').fadeIn('fast');
	});
	
	$('.apply-button').click(function() {
		$(this).parent().parent().hide();
		$(this).hide();
		$('html.open-widget').removeClass('open-widget');
		$('.selected-widget').removeClass('selected-widget');
	});
	
	//Set default params vars just in case...
	$.params = { 		
		geo : 'San Diego',	
		find_sex : '2',
		age : '24-40',		
		start : 0, 
		dist_max_value: 50,
		page : 1	
	};
	
	var urlParams = {};
	(function () {
		var e,
			a = /\+/g,  // Regex for replacing addition symbol with a space
			r = /([^&=]+)=?([^&]*)/g,
			d = function (s) { return decodeURIComponent(s.replace(a, ' ')); },
			q = window.location.search.substring(1);

		while (e = r.exec(q))
		   urlParams[d(e[1])] = d(e[2]);
	})();
	
	if(urlParams['dist_max_value']){
		$.params.dist_max_value = urlParams['dist_max_value'];
		$('#distance-label').html(urlParams['dist_max_value']);
	}
	
	if(urlParams['geo']){
		$.params.geo = urlParams['geo'];
		$('#geo-label').html(urlParams['geo']);
		$('.active-location').removeClass('active-location');
		
		if($('#location-list').find('li[data-geoname="' + urlParams['geo'] + '"]').length == 0 ){
			$('#location-list ul').prepend('<li class="active-location">' + $.params.geo + '</li>');
		} else {
			$('#location-list').find('li[data-geoname="' + urlParams['geo'] + '"]').addClass('active-location');
		}
	}
	
	if(urlParams['zip']){
		$.params.zip = urlParams['zip'];
		$('#geo-label').html(urlParams['zip']);
		$('.active-location').removeClass('active-location');
		$('#location-list ul').prepend('<li class="active-location">Zip code: ' + $.params.zip + '</li>');
	}
	
	if(urlParams['find_sex']){
		$.params.find_sex = urlParams['find_sex'];		
		$('#find-widget').val(urlParams['find_sex']);		
	}
	
	if(urlParams['body_type']) {
		$.params.body_type = unescape(urlParams['body_type']);		
		var b = $.params.body_type.split(',');
		if(b) {
		$('#filters').show();
		$('<span class="filter-label">Body type:</div>' ).appendTo('#filters')
		$.each(b, function(i, val) { 
			$('#body-type-widget input[value='+val+']').change().attr('checked', true);
			var valname = $('#body-type-widget input[value='+val+']').next('label').text();
			$('<span class="filter-val" data-param="body_type" data-val="' + val + '">' + valname + '</div>' ).appendTo('#filters')
		});	
		$('#body-type-widget input').change();
		}
	}

	
	if(urlParams['race']) {
		$.params.race = unescape(urlParams['race']);		
		var b = $.params.race.split(',');
		if(b) {
		$('#filters').show();
		$('<span class="filter-label">Race:</div>' ).appendTo('#filters')
		$.each(b, function(i, val) { 
			$('#race-widget input[value='+val+']').change().attr('checked', true);
			var valname = $('#race-widget input[value='+val+']').next('label').text();
			$('<span class="filter-val" data-param="race" data-val="' + val + '">' + valname + '</div>' ).appendTo('#filters')
		});	
		$('#race-widget input').change();
		}
	}	
	
	if(urlParams['lang_spoken']) {
		$.params.lang_spoken = unescape(urlParams['lang_spoken']);		
		var b = $.params.lang_spoken.split(',');
		if(b) {
		$('#filters').show();
		$('<span class="filter-label">Languages:</div>' ).appendTo('#filters')
		$.each(b, function(i, val) { 
			$('#languages-spoken-widget input[value='+val+']').change().attr('checked', true);
			var valname = $('#languages-spoken-widget input[value='+val+']').next('label').text();
			$('<span class="filter-val" data-param="lang_spoken" data-val="' + val + '">' + valname + '</div>' ).appendTo('#filters')
		});	
		$('#languages-spoken-widget input').change();
		}
	}

	if(urlParams['sex_orient']) {
		$.params.sex_orient = unescape(urlParams['sex_orient']);		
		var b = $.params.sex_orient.split(',');
		if(b) {
		$('#filters').show();
		$('<span class="filter-label">Sexual orientation:</div>' ).appendTo('#filters')
		$.each(b, function(i, val) { 
			$('#orientation-widget input[value='+val+']').change().attr('checked', true);
			var valname = $('#orientation-widget input[value='+val+']').next('label').text();
			$('<span class="filter-val" data-param="sex_orient" data-val="' + val + '">' + valname + '</div>' ).appendTo('#filters')
		});	
		$('#orientation-widget input').change();
		}
	}

	if(urlParams['marital']) {
		$.params.marital = unescape(urlParams['marital']);		
		var b = $.params.marital.split(',');
		if(b) {
		$('#filters').show();
		$('<span class="filter-label">Marital status:</div>' ).appendTo('#filters')
		$.each(b, function(i, val) { 
			$('#marital-status-widget input[value='+val+']').change().attr('checked', true);
			var valname = $('#marital-status-widget input[value='+val+']').next('label').text();
			$('<span class="filter-val" data-param="marital" data-val="' + val + '">' + valname + '</div>' ).appendTo('#filters')
		});				
		$('#marital-status-widget input').change();
		}
	}	
	
	
	if(urlParams['looking_for_what']) {
		$.params.looking_for_what = unescape(urlParams['looking_for_what']);		
		var b = $.params.looking_for_what.split(',');
		if(b) {
		$('#filters').show();
		$('<span class="filter-label">Interested in:</div>' ).appendTo('#filters')
		$.each(b, function(i, val) { 
			$('#interest-widget input[value='+val+']').change().attr('checked', true);
			var valname = $('#interest-widget input[value=' + val + ']').next('label').text();
			$('<span class="filter-val" data-param="looking_for_what" data-val="' + val + '">' + valname + '</div>' ).appendTo('#filters')

		});	
		
		$('#interest-widget input').change();
		}
	}
	
	
	if(urlParams['age']){
		$.params.age = urlParams['age'];
		var age_range = $.params.age.split('-');
		$( '#age-range-widget' ).slider({
			range: true,
			min: 18,
			max: 80,
			values: [ age_range[0], age_range[1] ],
			slide: function( event, ui ) {
				$( '#min-age-input' ).val( ui.values[ 0 ] );
				$( '#max-age-input' ).val( ui.values[ 1 ] );
			}
		});
	} else {
	
			$( '#age-range-widget' ).slider({
			range: true,
			min: 18,
			max: 80,
			values: [ 24, 40 ],
			slide: function( event, ui ) {
				$( '#min-age-input' ).val( ui.values[ 0 ] );
				$( '#max-age-input' ).val( ui.values[ 1 ] );
			}
		});	
	}
	
	$( '#min-age-input' ).val( $( '#age-range-widget' ).slider( 'values', 0 ) );
	$( '#max-age-input' ).val( $( '#age-range-widget' ).slider( 'values', 1 ) );
	
	
	
	$('#results').results();
    $('#summary').sticky();	
});