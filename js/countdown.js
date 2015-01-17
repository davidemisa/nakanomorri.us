/*global jQuery:false */
(function($) {
   "use strict";
	$.fn.countdown = function(options, callback, interval) {

		//custom 'this' selector
		var thisEl = $(this);

		//array of custom settings
		var settings = { 
			'date': null,
			'format': null,
            'lang': 'eng'
		};

		//append the settings array to options
		if(options) {
			$.extend(settings, options);
		}
		
		//main countdown function
		function countdown_proc() {
			
			var eventDate = Date.parse(settings.date) / 1000;
			var currentDate = Math.floor($.now() / 1000);
			
			if(eventDate <= currentDate) {
                /*jshint validthis:true */
				callback.call(this);
				clearInterval(interval);
			}
			
            var seconds = eventDate - currentDate;
			
			var days = Math.floor(seconds / (60 * 60 * 24)); //calculate the number of days
			seconds -= days * 60 * 60 * 24; //update the seconds variable with no. of days removed
			
			var hours = Math.floor(seconds / (60 * 60));
			seconds -= hours * 60 * 60; //update the seconds variable with no. of hours removed
			
			var minutes = Math.floor(seconds / 60);
			seconds -= minutes * 60; //update the seconds variable with no. of minutes removed
			
			//conditional Ss
            /*jshint validthis:true */
			if (days === 1) { thisEl.find(".timeRefDays").text(getRightLabel("day")); } else { thisEl.find(".timeRefDays").text(getRightLabel("day", true)); }
			if (hours === 1) { thisEl.find(".timeRefHours").text(getRightLabel("hour")); } else { thisEl.find(".timeRefHours").text(getRightLabel("hour", true)); }
			if (minutes === 1) { thisEl.find(".timeRefMinutes").text(getRightLabel("minute")); } else { thisEl.find(".timeRefMinutes").text(getRightLabel("minute", true)); }
			if (seconds === 1) { thisEl.find(".timeRefSeconds").text(getRightLabel("second")); } else { thisEl.find(".timeRefSeconds").text(getRightLabel("second", true)); }
			
			//logic for the two_digits ON setting
			if(settings.format === "on") {
				days = (String(days).length >= 2) ? days : "0" + days;
				hours = (String(hours).length >= 2) ? hours : "0" + hours;
				minutes = (String(minutes).length >= 2) ? minutes : "0" + minutes;
				seconds = (String(seconds).length >= 2) ? seconds : "0" + seconds;
			}
			
			//update the countdown's html values.
			if(!isNaN(eventDate)) {
				thisEl.find(".days").text(days);
				thisEl.find(".hours").text(hours);
				thisEl.find(".minutes").text(minutes);
				thisEl.find(".seconds").text(seconds);
			} else { 
				clearInterval(interval); 
			}
		}

        function getRightLabel(word, plural) {
            switch (settings.lang) {
                case 'eng':
                    return getEngLabel(word, plural);
                case 'it':
                    return getItLabel(word, plural);
                case 'jpn':
                    return getJpnLabel(word);
                default :
                    return getEngLabel(word, plural);
            }
        }

        function getEngLabel(word, plural) {
            return (plural ? word + 's' : word)
        }

        function getItLabel(word, plural) {
            switch (word) {
                case 'day':
                    return 'giorn' + (plural ? 'i' : 'o');
                case 'hour':
                    return 'or' + (plural ? 'e' : 'a');
                case 'minute':
                    return 'minut' + (plural ? 'i' : 'o');
                case 'second':
                    return 'second' + (plural ? 'i' : 'o');
            }
        }

        function getJpnLabel(word) {
            switch (word) {
                case 'day':
                    return '日';
                case 'hour':
                    return '時';
                case 'minute':
                    return '分';
                case 'second':
                    return '秒';
            }
        }
		
		//run the function
		countdown_proc();
		
		//loop the function
		interval = setInterval(countdown_proc, 1000);
		
    };
}) (jQuery);