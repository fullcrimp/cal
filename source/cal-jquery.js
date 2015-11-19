(function($) {

    $.fn.cal = function(options) {

        var defaults = {
            sundayPosition: 6, // otherwise sunday is first

            onMonthChange: function() {
                console.log(arguments);
            },

            onDateClick: function() {
                console.log(arguments);
            }

        };
        var settings = $.extend({}, defaults, options);

        return this.each(function() {

            // date variables
            var today = new Date(),
                curDate = today, // dodgy
                curMonth = curDate.getMonth(),
                curYear = curDate.getFullYear(),
                monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

            // actual content: 4 elements
            // button previous
            var $parent = $(this),
                $btnPrev = $('<div>')
                .addClass('btn btn-previous-month')
                .html('&larr;')
                .on('click', function() {
                    curMonth = curMonth - 1;
                    updateDate();

                    if (typeof settings.onMonthChange !== 'undefined') {
                        settings.onMonthChange(curYear, curMonth);
                    }

                    showMonth(curMonth, curYear);
                }),

                // button next
                $btnNext = $('<div>')
                    .addClass('btn btn-next-month')
                    .html('&rarr;')
                    .on('click', function() {
                        curMonth = curMonth + 1;
                        updateDate();

                        if (typeof settings.onMonthChange !== 'undefined') {
                            settings.onMonthChange(curYear, curMonth);
                        }

                        showMonth(curMonth, curYear);
                    }),

                //actual calendar
                $contCal = $('<div>')
                    .addClass('cont-cal')
                    .on('click', '.day.current-month', function() {
                        $contCal.find('.selected').removeClass('selected');
                        $contCal.find('.today').removeClass('today');
                        $(this).addClass('selected');

                        var d = new Date(curYear, curMonth, $(this).text());

                        if (typeof settings.onDateClick !== 'undefined') {
                            settings.onDateClick(d);
                        }
                    }),

                // month title
                $contTitle = $('<div>')
                    .addClass('cont-cal-title'),

                // put controls in control div
                $contControl = $('<div>')
                    .addClass('cont-cal-control').append($btnPrev, $btnNext, $contTitle);

            // adding to the parent
            $parent.html('').append($contControl, $contCal);

            /**
            * [updateDate description]
            * @return {none} [description]
            */
            function updateDate() {
                if (curMonth > 11) {
                    curYear++;
                    curMonth -= 12;
                }

                if (curMonth < 0) {
                    curYear--;
                    curMonth += 12;
                }
            }

            /**
            * create DOM elements for the month calendar
            * @param  {integer} month [description]
            * @param  {integer} year  [description]
            * @return {none}       [description]
            */
            function showMonth(month, year) {

                // clean the layout
                $contCal.empty();

                // if a month is not set
                if (typeof month === 'undefined') {
                    curMonth = curDate.getMonth();
                } else {
                    curMonth = month;
                }

                // case when a date object passed
                if (typeof month === 'object') {
                    curMonth = month.getMonth();
                }

                // case when a year is not set
                if (typeof year === 'undefined') {
                    curYear = curDate.getFullYear();
                } else {
                    curYear = year;
                }

                var curTempDate = new Date(curYear, curMonth, 1), // a first day of the month to get a weekday of it
                    curMonthFirstWeekDay = curTempDate.getDay(),
                    daysInCurMonth = new Date(curYear, curMonth + 1, 0).getDate(), // number of days in the current month
                    daysInPrevMonth = new Date(curYear, curMonth, 0).getDate();  // number of days in the previous month

                // previous month days els
                createDateElements(0, (curMonthFirstWeekDay + settings.sundayPosition) % 7, false);
                createDateElements(1, daysInCurMonth, true);

                // show today selected
                if (curMonth === today.getMonth()) {
                    $contCal.find('.day.current-month').eq(today.getDate() - 1).addClass('today');
                }

                // update title
                $contTitle.html(monthNames[curMonth] + ', ' + curYear);
            }

            /**
            * adds day elements to calendar container from start date to end date
            * @param  {integer} startDate [description]
            * @param  {integer} endDate   [description]
            * @param  {boolean} curMonth  [description]
            * @return {none}
            */
            function createDateElements(startDate, endDate, curMonth) {
                var i = startDate;

                while (i < endDate) {
                    $contCal.append(getDayElement(i, curMonth));
                    i++;
                }
            }

            /**
            * returns a day element
            * @param  {integer} date  a days date
            * @param  {boolean} isCurrentMonth true in case of current month
            * @return {$object}       jquery DOM object
            */
            function getDayElement(date, isCurrentMonth) {

                if (typeof date === 'undefined') {
                    date = '';
                }

                return $('<div>')
                    .addClass('day')
                    .addClass(isCurrentMonth ? 'current-month' : '')
                    .text(date);
            }

            showMonth();
        });
    };

}(jQuery));
