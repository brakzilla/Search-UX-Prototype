function getStateAbbr(st){  
	switch(st) {
		case "Alaska": return "AK"; break;
		case "Alabama": return "AL"; break;
		case "Arkansas": return "AR"; break;
		case "Arizona": return "AZ"; break;
		case "California": return "CA"; break;
		case "Colorado": return "CO"; break;
		case "Connecticut": return "CT"; break;
		case "District of Columbia": return "DC"; break;  
		case "Delaware": return "DE"; break;
		case "Florida": return "FL"; break;
		case "Georgia": return "GA"; break;
		case "Hawaii": return "HI"; break;
		case "Iowa": return "IA"; break;
		case "Idaho": return "ID"; break;
		case "Illinois": return "IL"; break;
		case "Indiana": return "IN"; break;
		case "Kansas": return "KS"; break;
		case "Kentucky": return "KY"; break;
		case "Louisiana": return "LA"; break;
		case "Massachusetts": return "MA"; break;
		case "Maryland": return "MD"; break;
		case "Maine": return "ME"; break;
		case "Michigan": return "MI"; break;
		case "Minnesota": return "MN"; break;
		case "Missouri": return "MO"; break;
		case "Mississippi": return "MS"; break;
		case "Montana": return "MT"; break;
		case "North Carolina": return "NC"; break;
		case "North Dakota": return "ND"; break;
		case "Nebraska": return "NE"; break;
		case "New Hampshire": return "NH"; break;
		case "New Jersey": return "NJ"; break;
		case "New Mexico": return "NM"; break;
		case "Nevada": return "NV"; break;
		case "New York": return "NY"; break;
		case "Ohio": return "OH"; break;
		case "Oklahoma": return "OK"; break;
		case "Oregon": return "OR"; break;
		case "Pennsylvania": return "PA"; break;
		case "Rhode Island": return "RI"; break;
		case "South Carolina": return "SC"; break;
		case "South Dakota": return "SD"; break;
		case "Tennessee": return "TN"; break;
		case "Texas": return "TX"; break;
		case "Utah": return "UT"; break;
		case "Virginia": return "VA"; break;
		case "Vermont": return "VT"; break;
		case "Washington": return "WA"; break;
		case "Wisconsin": return "WI"; break;
		case "West Virginia": return "WV"; break;
		case "Wyoming": return "WY"; break;
		default: return st; break;
	}
}  

$(function(){ 
	var profiletext = new Array();
	profiletext[0] = "Drops of rain could be heard hitting the pane, which made him feel quite sad. How about if I sleep a little bit longer an...";
	profiletext[1] = "A collection of textile samples lay spread out on the table - Samsa was a travelling salesman - and above it there hung a...";
	profiletext[2] = "It wasn't a dream. His room, a proper human room although a little too small, lay peacefully between its four familiar walls...";
	profiletext[3] = "One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin....";
	profiletext[4] = "He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided...";


	if ($.browser.msie) {
		alert( "Your browser does not fully support this prototype. For the best experience, use either Mozilla Firefox, Google Chrome, or Safari. " );
	}
	
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
		
		//see if no matches
		if( $(xml).find('error').text() == 'no matches') {		
			//no matches found... do not continue, print the no matches message. 
			$('<div class="error">No matches were found.</div>').appendTo('#results');
			$('#load-more').hide();
		} else {
		
			$(xml).find('member').shuffle().each(function(){
				var divcount = $('.result').not('.old-result').length;
				var name = $(this).find('name').text();
				var divname = name + '_' + divcount;
				var type = $(this).find('type').text();
				var sex = $(this).find('sex').text();
				var age = $(this).find('age').text();
				
				
				if(/largethumb/i.test($.params.variation)) {				
					var displayName = name;
				} else if(/smallthumb/i.test($.params.variation)) {
					//block string from extending too far out
					var displayName = name.substring(0, 8) + '...';				
				} else {				
					var displayName = name;
				}
				
				

				
				$(this).find('photo').each(function(){
					switch(sex) {
						case '1':
							$.no_pic = 'http://graphics.pop6.com/images/common/no_photo/96x96/male.gif';
							$.gender = 'M';
							break;
						case '2':
							$.no_pic = 'http://graphics.pop6.com/images/common/no_photo/96x96/female.gif';
							$.gender = 'F';
							break;
						case '3':
							$.no_pic = 'http://graphics.pop6.com/images/common/no_photo/96x96/couple.gif';
							$.gender = 'C';
							break;
						case '5':
							$.no_pic = 'http://graphics.pop6.com/images/common/no_photo/96x96/couple.gif';
							$.gender = 'C'
							break;
						case '6':
							$.no_pic = 'http://graphics.pop6.com/images/common/no_photo/96x96/couple.gif';
							$.gender = 'C';
							break;
						case '4':
							$.no_pic = 'http://graphics.pop6.com/images/common/no_photo/96x96/group.gif';
							$.gender = 'G';
							break;					
						case '7':
							$.no_pic = 'http://graphics.pop6.com/images/common/no_photo/96x96/tstvtg.gif';
							$.gender = 'T';
							break;					
						default: 
							$.no_pic = 'http://graphics.pop6.com/images/common/no_photo/96x96/female.gif';
							$.gender = '?';
							break;
					}
				
					pic = $(this).find('url').text();
					
						
					if(pic == ''){
						pic = $.no_pic;
					} else {
						if(/gallery/i.test($.params.variation)) {
							//do nothing.. leave as is..
						}else {
							pic = pic.replace('gallery', 'square');
						}
					}
					
					
				});		
				
				$(this).find('location').each(function(){					
					city = $(this).find('city').text();
					state = $(this).find('state').text();
					country = $(this).find('country').text();
				});	
				
				//convert full state to abbr
				state = getStateAbbr(state);
					
				//parse mid from pic
				var urlparts = pic.split('.');
				var mid = urlparts[2].replace('com/photo-ffadult-r20-s' + sex + '-', '');
				
				var maxdist = $.params.dist_max_value;
				if (maxdist == 'any') { maxdist = 1000; }
				
				$('<div class="result" id="result_' + divname + '"></div>').hide().appendTo('#results');
				$('<div class="status"></div>').appendTo('#result_' + divname);
				$('<div class="pic"></div>').html('<img src="' + pic + '" />').appendTo('#result_' + divname);
				$('<div class="name"></div>').html('<span class="handle">' + displayName + '</span> <span class="gender">' +age + '/' + $.gender + '</span>').appendTo('#result_' + divname);				
				$('<div class="outer-zoom" style="display:none;"></div>').html('<div class="zoom" data-parent="result_' + divname + '" ></div>').appendTo('#result_' + divname);
				$('<div class="pic"></div>').html('<img src="' + pic + '" />').appendTo('#result_' + divname + ' .zoom');
				$('<div class="name" style="display:none;"></div>').html('<span class="handle">' + displayName + '</span> <span class="gender">' +age + '/' + $.gender + '</span>').appendTo('#result_' + divname + ' .zoom');				
				$('<div class="status"></div>').appendTo('#result_' + divname + ' .zoom .name');
				$('<button class="itrigger btn small"></button>').html('Quick View').appendTo('#result_' + divname + ' .zoom .name');
				$('<div class="location" style="display:none;"></div>').html(city + ', '+ state).appendTo('#result_' + divname + ' .zoom');
				$('<div class="distance_away">' + (Math.floor(Math.random() * maxdist) + 1) + ' miles away</div>').appendTo('#result_' + divname + ' .zoom .location');
				$('<div class="cta" style="display:none;"></div>').html($.ctaButtons).appendTo('#result_' + divname + ' .zoom');
				$('<div class="iicon profile" style="display:none;"></div>').appendTo('#result_' + divname + ' .zoom');
				$('<div class="oneliner"></div>').html(  $(this).find('oneliner').text() ).appendTo('#result_' + divname + ' .zoom .profile');
				$('<div class="description"></div>').html(profiletext[Math.floor(Math.random()*5)] + '<a href="#" class="profile-nav">Read more</a>').appendTo('#result_' + divname + ' .zoom .profile');				
				$('<div class="iicon type" style="display:none;"></div>').html(  $(this).find('type').text() + ' member').appendTo('#result_' + divname + ' .zoom');
				$('<div class="iicon lastonline" style="display:none;"></div>').html(  'Last visited <span class="time-ago">' + $(this).find('lastonline').text() + '</span>').appendTo('#result_' + divname + ' .zoom');				
				$('<div class="iicon lookingfor" style="display:none;"></div>').html('Looking for men, women').appendTo('#result_' + divname + ' .zoom');
				$('<div class="iicon seepics" style="display:none;"></div>').html('<a href="#">' + Math.floor(Math.random() * 10) + ' photos</a>&nbsp;&nbsp;<a href="#">' + Math.floor(Math.random() * 6) + ' videos</a>').appendTo('#result_' + divname + ' .zoom');
				$('<div class="iicon photos" style="display:none;"></div>').html('<img src="img/opic' + Math.floor(Math.random() * 5) + '.gif" /><img src="img/opic' + Math.floor(Math.random() * 5) + '.gif" /><img src="img/opic' + Math.floor(Math.random() * 5) + '.gif" /><img src="img/opic' + Math.floor(Math.random() * 5) + '.gif" />').appendTo('#result_' + divname + ' .zoom');
				$('<div class="iicon videos" style="display:none;"></div>').html('<img style="background-image:url(img/ovid' + Math.floor(Math.random() * 3) + '.jpg)" src="img/film.png" /><img style="background-image:url(img/ovid' + Math.floor(Math.random() * 3) + '.jpg)" src="img/film.png" /><img style="background-image:url(img/ovid' + Math.floor(Math.random() * 3) + '.jpg)" src="img/film.png" />').appendTo('#result_' + divname + ' .zoom');
				count++;
				
				
				if(/smallthumb/i.test($.params.variation)) {
					if(count%6 != 0) {
						$('<div class="gut"></div>').appendTo('#results');
					} else {
						$('<div class="clearer"></div>').appendTo('#results');
					}
				} else if(/largethumb/i.test($.params.variation)) {
					if(count%4 != 0) {
						$('<div class="gut"></div>').appendTo('#results');
					} else {
						$('<div class="clearer"></div>').appendTo('#results');
					}
				} else {
					if(count%5 != 0) {
						$('<div class="gut"></div>').appendTo('#results');
					} else {
						$('<div class="clearer"></div>').appendTo('#results');
					}
				}
			
			});


			if(/smallthumb/i.test($.params.variation)) {
				//no fake needed
			} else if(/largethumb/i.test($.params.variation)) {
				//no fake needed
			} else {
				var divcount = $('.result').not('.old-result').length;
				var divname = 'seximember_' + divcount;
				
				var maxdist = $.params.dist_max_value;
				if (maxdist == 'any') { maxdist = 1000; }
				
				//since there is a 5 column grid, we have to create an additional "fake" profile...				
				$('<div class="result" id="result_' + divname + '"></div>').hide().appendTo('#results');
				$('<div class="status"></div>').appendTo('#result_' + divname);
				$('<div class="pic"></div>').html('<img src="' + $.no_pic + '" />').appendTo('#result_' + divname);				
				$('<div class="name"></div>').html('<span class="handle">sexiMember</span> <span class="gender">25/' + $.gender + '</span>').appendTo('#result_' + divname);
				$('<div class="outer-zoom" style="display:none;"></div>').html('<div class="zoom" data-parent="result_' + divname + '"></div>').appendTo('#result_' + divname);
				$('<div class="pic"></div>').html('<img src="' + $.no_pic +'" />').appendTo('#result_' + divname + ' .zoom');				
				$('<div class="name" style="display:none;"></div>').html('<span class="handle">sexiMember</span> <span class="gender">25/' + $.gender + '</span>').appendTo('#result_' + divname + ' .zoom');
				$('<div class="status"></div>').appendTo('#result_' + divname + ' .zoom .name');
				$('<div class="location" style="display:none;"></div>').html('Anytown, ST').appendTo('#result_' + divname + ' .zoom');
				$('<div class="distance_away">' + (Math.floor(Math.random() * maxdist) + 1) + ' miles away</div>').appendTo('#result_' + divname + ' .zoom .location');
				$('<div class="cta" style="display:none;"></div>').html($.ctaButtons).appendTo('#result_' + divname + ' .zoom');		
				$('<div class="iicon profile" style="display:none;"></div>').appendTo('#result_' + divname + ' .zoom');
				$('<div class="iicon oneliner"></div>').html('I like to think of myself as a rockstar!' ).appendTo('#result_' + divname + ' .zoom .profile');
				$('<div class="iicon description"></div>').html(profiletext[Math.floor(Math.random()*5)] + '<a href="#" class="profile-nav">Read more</a>').appendTo('#result_' + divname + ' .zoom .profile');
				$('<div class="iicon type" style="display:none;"></div>').html( 'Silver member').appendTo('#result_' + divname + ' .zoom');
				$('<div class="iicon lastonline" style="display:none;"></div>').html(  'Last visited yesterday' ).appendTo('#result_' + divname + ' .zoom');
				$('<div class="iicon lookingfor" style="display:none;"></div>').html('Looking for men, women').appendTo('#result_' + divname + ' .zoom');
				$('<div class="iicon seepics" style="display:none;"></div>').html('<a href="#">No photos</a>&nbsp;&nbsp;<a href="#">No videos</a>').appendTo('#result_' + divname + ' .zoom');
				$('<div class="iicon photos" style="display:none;"></div>').html('<img /><img /><img /><img />').appendTo('#result_' + divname + ' .zoom');
				$('<div class="iicon videos" style="display:none;"></div>').html('<img style="background-image:url()" src="img/film.png" /><img style="background-image:url()" src="img/film.png" /><img style="background-image:url()" src="img/film.png" />').appendTo('#result_' + divname + ' .zoom');
				
			}
			
			$('<div class="vpage-container"></div>').appendTo('#results');
			$('#load-more').fadeIn('slow');
			
			
			if($.params.online_now) {
				$('.status').addClass('online-now');
			} else {
				//Randomly attach the online-now class to certain results.
				var randomResults = $('.result').slice(-25).get().sort(function() {
					return Math.round(Math.random())-0.5
				}).slice(0,9);
				$(randomResults).find('.status').removeClass('broadcasting-now chatting-now').addClass('online-now');
			}

			if($.params.chatting_now) {
				$('.status').addClass('chatting-now');
			} else {
				//Randomly attach the online-now class to certain results.
				var randomResults = $('.result').slice(-25).get().sort(function() {
					return Math.round(Math.random())-0.5
				}).slice(0,3);
				$(randomResults).find('.status').removeClass('online-now broadcasting-now').addClass('chatting-now');
			}
			
			if($.params.broadcasting_now) {
				$('.status').addClass('broadcasting-now');
			} else {
				//Randomly attach the online-now class to certain results.
				var randomResults = $('.status').slice(-25).get().sort(function() {
					return Math.round(Math.random())-0.5
				}).slice(0,3);
				$(randomResults).find('.status').removeClass('online-now chatting-now').addClass('broadcasting-now');
			}
			
		
		}//matches found
		
		var options = $.extend({
			callback: function() {}
		}, arguments[0] || {});    
		options.callback.call(this);
	};

	$.fn.results = function() {	
		
		//Create query string from the params
		var qstr = jQuery.param($.params);
		
		//Determine if there are existing old results.
		if( $('.old-result').length > 0 ) {
			
			$('.old-result').removeAttr('id');
			
			//Overlay white over all the results. 
			$('#results .result').fadeTo('slow', 0.1);
			
			//move loader to the top
			$('#loading').addClass('abs-loader').prependTo('body').delay(500);

		}
		
		$('#loading').show();
		
		$.ajax({
			type: 'GET',
			url: '/search/g1211990?xml_req=1&' + qstr,
			dataType: 'xml',
			success: function(xml) { 
				$(xml).render({
					callback: function() {						
						$('#loading').fadeOut(500).removeClass('abs-loader').prependTo('#bottom');						
						//Overlay white over all the results. 
						$('#results').fadeTo('slow', 1.0);						
						//Destroy the old results
						$('#results .old-result').remove();						
						$('.result').fadeIn(500);
						if($('.result').length > 25) {
							$('.vpage').fadeIn(500);						
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
		if ($(this).scrollTop() > origTop + 40) {
		  content.addClass('sticky');
		} else if ($(this).scrollTop() < origTop) {
		  content.removeClass('sticky');
		}
	  });
	};

	
	$.fn.echofilters = function(p,w,l) {
	
		$.params[p] = [];	
		$('#' + w + ' input:checked').each(function() {
			$.params[p].push( $(this).val() );
		});
		$.params[p] = $.params[p].toString();
		
		if( $('#' + w + ' input:checked').length < 1 ) {
			delete($.params[p]);
		}	
	
		if($.params[p]) {
			//$.params[p] = unescape($.urlParams[p]);		
			var b = $.params[p].split(',');
			if(b) {
			$('#filters').show();
			$('<span class="filter-label">' + l + '</span>' ).appendTo('#filters')
			$.each(b, function(i, val) { 
				$('#' + w + ' input[value='+val+']').change().attr('checked', true);
				var valname = $('#' + w + ' input[value='+val+']').next('span').text();
				$('<span class="filter-val" data-param="' + p + '" data-val="' + val + '">' + valname + '</span>' ).appendTo('#filters')
			});	
			$('#' + w + ' input').change();
			}
		}	
	};
	
	$.fn.echotoggles = function(p) {
		$.params[p] = [];	
		$('#' + p + ':checked').each(function() {
			$.params[p].push( $(this).val() );
		});
		$.params[p] = $.params[p].toString();
		
		if( $('#' + p + ':checked').length < 1 ) {
			delete($.params[p]);
		}
		
		if($.params[p]) {			
			var valname = $('#' + p).next('span').text();
			$('#filters').show();			
			if( $('.filter-toggle-label').length == 0 ) {
				$('<span class="filter-label filter-toggle-label">Member Activities</span>' ).appendTo('#filters');
			}
			$('<span class="filter-toggle" data-param="' + p + '">' + valname + '</span>' ).appendTo('#filters');			
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
		
		//$('<div class="vpage"><span class="pnum">Page ' + $.params.page + '</span> &bull; <a href="#top">Previous<a/>  <a name="page' + $.params.page + '"></a></div>').appendTo( $(".vpage-container").last() );
		$('<div class="vpage"><span class="pnum">Page ' + $.params.page + '</span> <a name="page' + $.params.page + '"></a></div>').appendTo( $(".vpage-container").last() );
		$('<div id="scrollDown"></div>').appendTo('#results');
		
		$('#results').results();
	};
});



$(function(){

	var mouseOverActiveElement = false;
	
	$.ctaButtons = 	'<a href="#" class="flirt"><span></span>Flirt</a>' + 
					'<a href="#" class="hotlist"><span></span>Hotlist</a>' + 
					'<a href="#" class="email"><span></span>Email</a>' + 
					'<a href="#" class="friend"><span></span>Invite as friend</a>';

	$('#search-options').toggle(
		function(){
			$(this).toggleClass('options-active');
			$('.widget-link').removeClass('selected-widget');
			$('.active-widget-box').removeClass('active-widget-box');
			$('.widget-box').hide();
			$('#searchform').switchClass('default', 'advanced', 200);
			$('#search-options').html('Hide advanced search');
			$('#advanced').fadeToggle(200);
		},function(){
			$(this).toggleClass('options-active');
			$('.widget-link').removeClass('selected-widget');
			$('.active-widget-box').removeClass('active-widget-box');
			$('.widget-box').hide();
			$('#advanced').fadeToggle(200);
			$('#searchform').switchClass('advanced', 'default', 200);
			$('#search-options').html('Advanced search');
	});
	
	
	$('#location-list li').live('click', function() {
		$('#location-widget').hide();
		$('#location-widget-link').removeClass('selected-widget');
		$('.active-widget-box').removeClass('active-widget-box');
		
		if ( $(this).attr('data-geoname') == 'auto' ) {
			$.params.ip = 'auto';
			$.params.country = '';
			$.params.geo = '';
			$('#geo').val('');
			$('#geo-label').html( 'my location ???' );	
			$('#location-list').find('li[data-geoname="auto"]').addClass('active-location');			
		} else {
			//take the get name selected location id
			$('#geo-label').html( $(this).attr('data-geoname') );
		}
		
		//launch the query, simulate clicking on find...
		$('#find-button').click();
	});
	
	
	$('#sort-list li').click(function(e) {
		$('#sort-widget').hide();
		$('#sort-widget-link').removeClass('selected-widget');
		$('.active-widget-box').removeClass('active-widget-box');		
		$('#sort-label').html( $(this).attr('data-sortlabel') );
		$('.active-sort').removeClass('active-sort');
		$(this).addClass('active-sort');		
		if (e.originalEvent) {
			$('#find-button').click();
		}
	});
	
	
	$('#find-list li').click(function(e) {
		$('#find-widget').hide();
		$('#find-widget-link').removeClass('selected-widget');
		$('.active-widget-box').removeClass('active-widget-box');		
		$('#find-label').html( $(this).attr('data-findlabel') );
		$('.active-find').removeClass('active-find');
		$(this).addClass('active-find');		
		$.params.find_sex = $(this).attr('data-findvalue');
		if (e.originalEvent) {
			$('#find-button').click();
		}
	});
	
	$('.widget-link').live('click', function(){	
		$('.widget-box').not( $(this).next('.widget-box') ).hide();
		$('.widget-link').not( $(this) ).removeClass('selected-widget');
		$('active-widget-box').not( $(this).next('.widget-box') ).removeClass('active-widget-box');
		$(this).toggleClass('selected-widget');
		$(this).next('.widget-box').toggleClass('active-widget-box');
		$(this).next('.widget-box').fadeToggle(200);		
	});
	

	$('.active-widget-box,.widget-link').live('mouseenter', function(){
		mouseOverActiveElement = true; 
	}).live('mouseleave', function(){ 
		mouseOverActiveElement = false; 
	});	
	
	$('html').live('click', function(){ 
		if (!mouseOverActiveElement) {
			if( $('#country-finder-input').is(':visible') ) {
				$('#location-finder-change-country').click();
			}
			$('.selected-widget').toggleClass('selected-widget');	
			$('.active-widget-box').removeClass('active-widget-box').hide();
			$('.ui-autocomplete').hide();
			$('.ui-tooltip').hide();
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
	

	$('#geo').keypress(function(e){
		if(e.which == 13){
			$('#location-finder-done').click();
		}
	});

	$('#find-button').click(function() {
		
		if($.params.ip) {			
			$('#geo-label').html('my location');
			$('#location-list').find('li[data-geoname="auto"]').addClass('active-location');
			//change country back to default...
			$.params.country = '';
			$.params.force = 0;
			$('#location-finder-country').html('United States');
		} else {
			var geo =  $('#geo').val();
			if (geo == '') {
				//If its blank, return anyone in the same country
				$.params.ip = '';
				$.params.zip = '';
				
				if($.params.country == '') {
					if($.params.force == 1) {
						//Determine if this was submitted from the Done button
						$.params.country = 'United States';
					}
				}
			} else {
				$('#geo-label').html(geo);
				$('.active-location').removeClass('active-location');
				//It is not blank, check if it is a zip code
				var isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(geo);
				if(isValidZip) {
					//It is a valid zip code.
					$.params.zip = geo;
					$('#geo-label').html($.params.zip);
					$.params.geo = '';;
					$.params.ip = '';;
					
				} else {
					$.params.geo = geo;
					$('#geo-label').html($.params.geo);
					$.params.zip = '';
					$.params.ip = '';
				}			
			}
		}
		
		if($.params.country) {
			$('.active-location').removeClass('active-location');			
			
			if($.params.geo) {
				if($.params.geo != '*') {
					$('#geo-label').text($.params.geo + ', ' + $.params.country);
				}
			} else if($.params.zip) {
				$('#geo-label').text($.params.zip + ', ' + $.params.country);
			} else {
				$('#geo-label').text($.params.country);
			}
			$.params.geo = '*';
		}
		
		$.params.age = $('#min-age-input').val() + '-' + $('#max-age-input').val();		
		
		$('#filters').children().not('#oclip').remove();
		$('#filters').hide();		
		$(this).echofilters('body_type', 'body-type-widget', 'Body type');
		$(this).echofilters('race', 'race-widget', 'Race');
		$(this).echofilters('lang_spoken', 'languages-spoken-widget', 'Languages');
		$(this).echofilters('marital', 'marital-status-widget', 'Marital status');
		$(this).echofilters('sex_orient', 'orientation-widget', 'Sexual orientation');
		$(this).echofilters('looking_for_what', 'interest-widget', 'Interested in');
		$(this).echofilters('eye_color', 'eye-color-widget', 'Eye color');
		$(this).echofilters('brasize', 'bra-size-widget', 'Bra size');
		$(this).echofilters('hair_color', 'hair-type-widget .hair-color', 'Hair color');
		$(this).echofilters('hair_length', 'hair-type-widget .hair-length', 'Hair length');		
		
		$(this).echotoggles('online_now');
		$(this).echotoggles('verified_member');
		$(this).echotoggles('profile_photos');
		$(this).echotoggles('profile_videos');
		$(this).echotoggles('chatting_now');
		$(this).echotoggles('broadcasting_now');
		$(this).echotoggles('new_member');
		
		//Mark all the current results as old...
		$('#results').children().addClass('old-result');
		
		//Use the new parameters to get results
		$('#results').results();		
	});

	$('.filter-val').live('click', function() {
		$('input[name="' + $(this).attr('data-param') + '"][value="' + $(this).attr('data-val') + '"]').attr("checked",false).change();
		$('#find-button').click();
	});
	
	$('.filter-toggle').live('click', function() {
		$('input[name="' + $(this).attr('data-param') + '"]').attr("checked",false).change();
		$('#find-button').click();
	});
	
	
	$('#location-finder-done').click(function() {
		$('.ui-autocomplete').hide();
		$('#geo').blur();		
		
		$('#location-widget').hide();
		$('#location-widget-link').removeClass('selected-widget');
		$('.active-widget-box').removeClass('active-widget-box');
		
		$.params.ip = '';
		$.params.force = 1;
		
		$('#find-button').click();
	});
	
	$('#member-activity-options').change(function(e) {
		if (e.originalEvent) {
				$('#find-button').click();
		}
	});
	
	$('.widget-box input').not("#location-widget input").change(function() {	
		if ($(this).closest('.widget-box').find('input:checkbox:checked').length > 0) {
			$(this).closest('.widget-box').prev('.widget-link').html( $(this).closest('.widget-box').prev('.widget-link').attr('data-label') + ': ' + $(this).closest('.widget-box').find('input:checkbox:checked').length + ' selected');		
		} else {
			$(this).closest('.widget-box').prev('.widget-link').html( 'Any <span class="toggle-filter-label">' + $(this).closest('.widget-box').prev('.widget-link').attr('data-label') + '</span>');		
		}	
		$('.selected-widget').next('.widget-box').find('.apply').removeAttr('disabled');
	});
	
	$('.apply').click(function() {
		$(this).parent().parent().hide();
		$(this).attr('disabled', 'disabled');
		$('html.open-widget').removeClass('open-widget');
		$('.selected-widget').removeClass('selected-widget');
		$('.active-widget-box').removeClass('active-widget-box');
		$('#find-button').click();
	});
	


	$('#find-widget').change(function() {
		$('#find-button').click();
	});
	
	
	//////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////PIC ZOOM FUNCTION
	//////////////////////////////////////////////////////////////////////////////////
	$('.result').live({
		mouseenter: function() {
			if( $('.active-widget-box,.old-result').length == 0 ) {
				var timeout;				
				var pw = $(this).children('.pic').find('img').width();
				var ph = $(this).children('.pic').find('img').height();
				var thisid = $(this).attr('id');
				var zoom = function() {	return $('#' + thisid + ' .outer-zoom').show(); }
				
				if (timeout) window.clearTimeout(timeout);

				//kill all other zooms
				$('.outer-zoom').not('#' + thisid + ' .outer-zoom').children('.zoom').removeClass('done').children('div').not('.pic').hide();
				$('.outer-zoom').not('#' + thisid + ' .outer-zoom').hide();
				
				//Reset this one... just in case it was not reset earlier...
				$('#' + thisid + ' .outer-zoom').children('.zoom').children('div').not('.pic').hide();
				$('#' + thisid + ' .outer-zoom').css( { top: '-51px', left: '-51px' } ).find('.zoom').removeClass('done').css( { width: '144px', height: '144px' }  ).find('.pic img').css( { width: '144px', height: '144px' } );
				
			    $.when( zoom() ).done(function() {				
					timeout = window.setTimeout(function(){
						$('#' + thisid + ' .outer-zoom').animate( { top: '-86px', left: '-96px' }, 100 )
                                                .find('.pic img').animate( { width: pw * 1.5, height: ph * 1.5 }, 100)
                                                .parent().parent().addClass('done').animate( { width: '216px', height: '345px' }, 100, function() {				
							$('#' + thisid + ' .outer-zoom').children('.zoom').children('div').not('.iicon').fadeIn(150);
						});
					}, 500);
				});				
			}
		},
		mouseleave: function(){
			if( $('.active-widget-box,.old-result').length == 0 ) {
			var timeout;
			if (timeout) window.clearTimeout(timeout);
			var pw = $(this).children('.pic').find('img').width();
			var ph = $(this).children('.pic').find('img').height();
			var thisid = $(this).attr('id');			
			$('#' + thisid + ' .outer-zoom').children('.zoom').children('div').not('.pic').hide();			
			$('#' + thisid + ' .outer-zoom').animate( {  top: '-51px', left: '-51px' }, 30 ).find('.zoom').removeClass('done').animate( { width: '144px', height: '144px' }, 30 ).find('.pic img').animate( { width: '144px', height: '144px' }, 30, function() {
				$('#' + thisid + ' .outer-zoom').hide();
			});
			}
		}
	});

	
	/////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////Quick search tabs
	/////////////////////////////////////////////////////////////////////////////////////////////////
	$('#tabs .inactive').live('click', function() {
		//Toggle class on tab
		$('#tabs .active').removeClass('active').addClass('inactive');
		$(this).removeClass('inactive').addClass('active');
		
		// collapse advanced search if it is showing
		if( $('#advanced').is(':visible') ) {
			$('#search-options').click();
		}
		
		//always reset the params
		$("#advanced input:checkbox").attr('checked', false);
		$.params = { 		
			geo : '',
			country : '',
			ip : 'auto',
			find_sex : '2',
			age : '24-40',
			dist_max_value: 50
		};
		
		$('#age-range-widget').slider('values', [24, 40]);	
		$('#min-age-input').val( $('#age-range-widget').slider('values', 0) );
		$('#max-age-input').val( $('#age-range-widget').slider('values', 1) );		
		$('#distance-input-widget').slider('value', 3);
		$('#distance-input').html( $.params.dist_max_value );
		
		switch( $(this).attr('data-searchtab') ) {
			default:
			case "1"://use default search, reset distance.
				//				
			break;
			
			case "2"://online matches
				$('#find-list li[data-findvalue="2"]').click();
				$("#is-online-now").attr('checked', true);
			break;
			
			case "3"://new members				
				$("#is-new-member").attr('checked', true);
			break;
			
			case "4"://members near me				
				$('#distance-input-widget').slider('value', 2);
				$.params.dist_max_value = 25;
				$( '#distance-input' ).html( $.params.dist_max_value );
			break;			
		}	
		$('#find-button').click();
	});
	
	
	
	//Hide stuff
	$('#bra-size-widget-link').remove();
	$('#bra-size-widget').remove();	
	$("#advanced-options h2:contains('Quick Search')").remove();
	$('#quick-search').remove();
	$('#saved-searches').remove();	
	
	
	//Try it as a slider...
	$( '#distance-input-widget' ).slider({
		min: 0,
		max: 8,
		value: 3,
		slide: function( event, ui ) {
			$.params.force = 0;
			var v = ui.value;			
			if(v>=0 && v<1) { $.params.dist_max_value = 5;}
			if(v>=1 && v<2) { $.params.dist_max_value = 10;}
			if(v>=2 && v<3) { $.params.dist_max_value = 25;}
			if(v>=3 && v<4) { $.params.dist_max_value = 50;}
			if(v>=4 && v<5) { $.params.dist_max_value = 75;}
			if(v>=5 && v<6) { $.params.dist_max_value = 100;}
			if(v>=6 && v<7) { $.params.dist_max_value = 250;}
			if(v>=7 && v<8) { $.params.dist_max_value = 500;}			
			if(v>=8 && v<9) { $.params.dist_max_value = 'any';}
			$( '#distance-input' ).html( $.params.dist_max_value );
		},
		change: function(e, ui) { 
			if (e.originalEvent) {
				$('#find-button').click();
			}
		}
	});
	
	
	$('#location-finder-change-country').toggle(function() {
		$('#location-finder-country').fadeOut('fast', function() {
			//Add a new label saying search for your country
			$('<div id="find-your-country"></div>').html('Select another country').insertBefore('#location-finder-country');			
		});	
		//fade the city input and done...	
		$('.location-finder-bar:eq(1)').fadeOut('fast', function() {			
			//render the country input and append it to the div
			$('<div class="location-finder-bar"></div>').html('<div id="country-finder-input"><select id="country-finder"></select></div><div id="country-finder-done" style="display:none;" class="act-button">Done</div></div>').appendTo('#location-finder');					
			var countries=["United States","Afghanistan","Albania","Algeria","American Samoa","Andorra","Angola","Anguilla","Antigua & Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas, The","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia & Herzegovina","Botswana","Bouvet Island","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burma","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Central African Republic","Chad","Chile","China","Christmas Island","Clipperton Island","Cocos Islands","Colombia","Comoros","Congo","Cook Islands","Costa Rica","Cote d'Ivoire","Croatia","Cuba","Cyprus","Czech Republic","Denmark","Dhekelia","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Europa Island","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Guiana","French Polynesia","Gabon","Gambia, The","Gaza Strip","Georgia","Germany","Ghana","Gibraltar","Glorioso Islands","Greece","Greenland","Grenada","Guadeloupe","Guam","Guatemala","Guernsey","Guinea","Guinea-Bissau","Guyana","Haiti","Holy See","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Jan Mayen","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati","Korea, North","Korea, South","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Martinique","Mauritania","Mauritius","Mayotte","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montserrat","Morocco","Mozambique","Namibia","Nauru","Navassa Island","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Niue","Norfolk Island","Norway","Oman","Pakistan","Palau","Panama","Papua New Guinea","Paracel Islands","Paraguay","Peru","Philippines","Pitcairn Islands","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Helena","Saint Kitts & Nevis","Saint Lucia","Samoa","San Marino","Sao Tome & Principe","Saudi Arabia","Senegal","Serbia & Montenegro","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","Spain","Spratly Islands","Sri Lanka","Sudan","Suriname","Svalbard","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor-Leste","Togo","Tokelau","Tonga","Trinidad & Tobago","Tromelin Island","Tunisia","Turkey","Turkmenistan","Turks & Caicos","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States","Uruguay","Uzbekistan","Vanuatu","Venezuela","Vietnam","Virgin Islands","Wake Island","West Bank","Western Sahara","Yemen","Zambia","Zimbabwe"];
			for (i=0;i<countries.length;i++){
			   $('<option/>').val(countries[i]).html(countries[i]).appendTo('#country-finder');
			}						
			$('#country-finder-done').show();			
			//change it to cancel
			$('#location-finder-change-country').html('Cancel');
			//$('#country-finder').focus().trigger('keyup.autocomplete').autocomplete('search');
			$('#country-finder').focus();		
		});
	},function(){
		//reverse the whole thing...
		$('#country-finder-input').remove();
		$('#country-finder-done').remove();
		$('#find-your-country').remove();
		$('.location-finder-bar:eq(1)').fadeIn('slow');
		$('#location-finder-country').fadeIn('slow');
		$('#location-finder-change-country').html('Change country');
	});
	
	/*

	$('#geo').qtip({		
        content: 'Enter a city or zip code',
		position: {						
			my: 'top center',
			at: 'bottom center',
        },
        show: 'focus',
        hide: 'blur',
		style: {
			tip: true, 
			classes: 'ui-tooltip-shadow'		
        }
	});
	
	*/

	var len = $('.input-wrapper input.text').length,
        i;

    function update(force) {
        var $input = $(this),
            $parent = $input.parent( $('.input-wrapper input.text') );
        return $parent[force === true || $input.val() ? 'addClass' : 'removeClass']('filled');
    }

    function focus() {
        update.call(this).addClass('focus');
    }

    function blur() {
        update.call(this).removeClass('focus');
    }

    function keydown(evt) {
        var c = evt.keyCode;
        ((47 < c && c < 91) || (95 < c && c < 112) || (185 < c && c < 223)) && update.call(this, true);
    }

    $.fn.prepareInput = function() {
        return this.each(update);
    };

    for (i = 0; i < len; i++) {
        $('.input-wrapper input.text').live('focus', focus).live('blur', blur).live('keyup', update).live('click', update).live('keydown', keydown);
    }

    for (i = 0; i < len; i++) {
            $('.input-wrapper input.text').prepareInput();
    }
    
	
	
	$('#country-finder-done').live('click', function() {
		$.params.ip = '';
		$.params.geo = '';
		$.params.zip = '';
		$.params.country = $('#country-finder').val();
		$('#location-finder-country').html( $('#country-finder').val() );
		$('#geo').val('');
		$('#location-finder-change-country').click();
	});
	
	
	$('.cta a.flirt').live('click', function(e) {
		e.preventDefault();
		$(this).addClass('pressed').html('<span></span>Flirted');
		
		//If there is a parent, this means it is a lightbox interaction, so the parent should be updated as well 
		if( $(this).data('parent') ) {
			$('#' + $(this).data('parent') + ' .cta a.flirt').addClass('pressed').html('<span></span>Flirted');
		}
	});
	
	$('.cta a.hotlist').live('click', function(e) {
		e.preventDefault();
		$(this).addClass('pressed').html('<span></span>Hotlisted');
		//If there is a parent, this means it is a lightbox interaction, so the parent should be updated as well 
		if( $(this).data('parent') ) {
			$('#' + $(this).data('parent') + ' .cta a.hotlist').addClass('pressed').html('<span></span>Hotlisted');
		}
	});

	$('.cta a.friend').live('click', function(e) {
		e.preventDefault();
		$(this).addClass('pressed').html('<span></span>Invited as friend');
		//If there is a parent, this means it is a lightbox interaction, so the parent should be updated as well 
		if( $(this).data('parent') ) {
			$('#' + $(this).data('parent') + ' .cta a.friend').addClass('pressed').html('<span></span>Invited as friend');
		}
	});
	
	
	//Profile click interaction
	//$('.result .pic, .result .handle').live('click', function() {
	$('.itrigger').live('click', function() {
		ch = $(document).height();
		cw = $(document).width();
		
		//create a copy of this profile object
		var profile = $(this).parents('.zoom').html();	
		
		//determine the parent div
		var parent = $(this).parents('.zoom').data('parent');

		
		//create  a new lightbox
		$('.backdrop').css({'opacity':'.50'});	
		$('.box').css({ left : (cw/2) - 280 } );
		$('#prev-box').css({ left : (cw/2) - 365 } );
		$('#next-box').css({ left : (cw/2) + 290 } );
		$('.backdrop, .box').css( { display: 'block' } );
		$('.backdrop').css( { height : ch } );
		

		
		//inject object copy into the light box...
		$('.box .inner').html(profile);		
		$('.box .inner').find('.pic').hide().find('img').css( { height: '216px', width: '216px' } );
		$('.box, .box .cta a').attr('data-parent', parent);		
		
	
		var primarysrc = $('.box .pic img').attr('src');
		$('.box .photos img:eq(0)').attr('src', primarysrc);
		
		//fade in the contents
		$('.box .inner').find('div').fadeIn();

		//check if prev or next elements exist...if they do not, hide that particular button
		if( $('#' + $('.box').attr('data-parent') ).prevAll('.result:first').length < 1 ) {
			$('#prev-box').fadeOut();
		} else {
			$('#prev-box').fadeIn();
		}
		
		if( $('#' + $('.box').attr('data-parent') ).nextAll('.result:first').length < 1 ) {		
			$('#next-box').fadeOut();
		} else {
			$('#next-box').fadeIn();
		}	
		
	});	

	$(document).keyup(function(e) {
		if( $('.box').is(':visible') ){
			if (e.keyCode == 39) { 					
				$('#' + $('.box').attr('data-parent') ).nextAll('.result:first').find('.itrigger').click();					
			}
			if(e.keyCode == 37) {
				$('#' + $('.box').attr('data-parent') ).prevAll('.result:first').find('.itrigger').click();
			}
		}
	});

	$('#prev-box').click(function() {			
		$('#' + $('.box').attr('data-parent') ).prevAll('.result:first').find('.itrigger').click();			
	});
	
	$('#next-box').click(function() {
		$('#' + $('.box').attr('data-parent') ).nextAll('.result:first').find('.itrigger').click();
	});
	
	$('.box .photos img').live('mouseenter', function() {
		$(this).css( {opacity : 1.0});
	});

	$('.box .photos img').live('mouseleave', function() {
		$(this).css( {opacity : 0.85});		
	});
	
	$('.box .photos img').live('click', function() {
		var src = $(this).attr('src');
		$('.box .pic img').attr('src', src );
	});
	
	
 
 
 
	$('.close').click(function(){
		close_box();
	});

	$('.backdrop').click(function(){
		close_box();
	});
 
	function close_box() {
		$('.backdrop').animate({'opacity':'0'}, 100, 'linear', function(){
			$('.backdrop, .box, #prev-box, #next-box').css('display', 'none');
		});
	}
	
	$.urlParams = {};
	(function () {
		var e,
			a = /\+/g,  // Regex for replacing addition symbol with a space
			r = /([^&=]+)=?([^&]*)/g,
			d = function (s) { return decodeURIComponent(s.replace(a, ' ')); },
			q = window.location.search.substring(1);

		while (e = r.exec(q))
		   $.urlParams[d(e[1])] = d(e[2]);
	})();
	
	if($.urlParams['variation']){		
		$.params.variation = unescape($.urlParams['variation']);		
		var b = $.params.variation.split(',');
		if(b) {
			$.each(b, function(i, val) { 				
				$('html').addClass(val);
			});
		}
	}

	$( '#age-range-widget' ).slider({			
		range: true,
		min: 18,
		max: 99,
		values: [ 24, 40 ],
		slide: function( event, ui ) {
			$( '#min-age-input' ).val( ui.values[ 0 ] );
			$( '#max-age-input' ).val( ui.values[ 1 ] );
		},
		change: function(e, ui) { 
		    if (e.originalEvent) {
				$('#find-button').click();
			}			
		}
	});	

	$( '#min-age-input' ).val( $( '#age-range-widget' ).slider( 'values', 0 ) );
	$( '#max-age-input' ).val( $( '#age-range-widget' ).slider( 'values', 1 ) );
			
	//Set default params vars
	$.params = { 		
		geo : '',
		country : '',
		ip : 'auto',
		find_sex : '2',
		age : '24-40',		
		start : 0, 
		dist_max_value: 50,
		page : 1,
		variation : 'default'
	};
	$('#results').results();
    //$('#summary').sticky();
		
	$('<small>&#x25BC</small>').appendTo('.widget-link');
	
});
