(function($) {

    $.fn.cal = function(options) {

        return this.each(function() {

            // date variables
            var today = new Date(),
                curDate = today, // dodgy
                curMonth = curDate.getMonth(),
                curYear = curDate.getFullYear(),
                monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

            // actual content: 4 elements
            // button previous
            var $btnPrev = $('<div>')
                .addClass('btn btn-previous-month')
                .html('&larr;')
                .on('click', function() {
                    curMonth = curMonth - 1;
                    updateDate();

                    if (typeof options.onMonthChange !== 'undefined') {
                        options.onMonthChange(curYear, curMonth);
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

                        if (typeof options.onMonthChange !== 'undefined') {
                            options.onMonthChange(curYear, curMonth);
                        }

                        showMonth(curMonth, curYear);
                    }),

                //actual calendar
                $contCal = $('<div>')
                    .addClass('cont-cal')
                    .on('click', '.day', function() {
                        $(this).siblings('.day.selected').removeClass('selected');
                        $(this).addClass('selected');

                        var d = new Date(curYear, curMonth, $(this).text());

                        if (typeof options.onDateClick !== 'undefined') {
                            options.onDateClick(d);
                        }
                    }),

                // month title
                $contTitle = $('<div>')
                    .addClass('cont-cal-title'),

                // put controls in control div
                $contControl = $('<div>')
                    .addClass('cont-cal-control').append($btnPrev, $btnNext, $contTitle);

            // adding to the parent
            $(this).html('').append($contControl, $contCal);

            /**
            * [updateDate description]
            * @return {[type]} [description]
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
            * [showMonth description]
            * @param  {[type]} month [description]
            * @param  {[type]} year  [description]
            * @return {[type]}       [description]
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
                firstWeekDay = curTempDate.getDay(),
                daysInCurMonth = new Date(curYear, curMonth + 1, 0).getDate(), // number of days in the current month
                daysInPrevMonth = new Date(curYear, curMonth, 0).getDate();  // number of days in the previous month

                // previous month days els
                // +1 = correction to make sunday first
                // -5 = to make it last
                var correctionDays = 1;

                // empty days to make a proper week start
                createDateElements(daysInPrevMonth - firstWeekDay + correctionDays, daysInPrevMonth);
                createCurrentMonthDateElements(daysInCurMonth);

                // update title
                $contTitle.html(monthNames[curMonth] + ', ' + curYear);
            }

            /**
            * adds day elements to calendar container from start date to end date
            * @param  {[type]} startDate [description]
            * @param  {[type]} endDate   [description]
            * @param  {[type]} curMonth  [description]
            * @return {[type]}           [description]
            */
            function createDateElements(startDate, endDate, curMonth) {
                var i = startDate;

                while (i <= endDate) {
                    $contCal.append(getDayElement(i, curMonth));
                    i++;
                }
            }

            /**
            * adds day elements to calendar container with class 'current-month'
            * @param  {[type]} daysNum [description]
            * @return {[type]}         [description]
            */
            function createCurrentMonthDateElements(daysNum) {
                createDateElements(1, daysNum, true);
            }

            /**
            * returns a day element
            * @param  integer date  a days date
            * @param  boolean isCurrentMonth true in case of current month
            * @return {[type]}       [description]
            */
            function getDayElement(date, isCurrentMonth) {

                if (typeof date === 'undefined') {
                    date = '';
                }

                return $('<div>')
                    .addClass('day')
                    // .data('date', curYear + ', ' + curMonth + ', ' + date)
                    .addClass(isCurrentMonth ? 'current-month' : '')
                    .text(date);
            }

            showMonth();
        });
    };

}(jQuery));
