var cal = (function calModule() {

    function init(selector, options) {

        var settings = {
            mondayFirst: true, // otherwise sunday is first

            onMonthChange: function() {
                console.log(arguments);
            },

            onDateClick: function() {
                console.log(arguments);
            },
        };

        for (prop in options) {
            settings[prop] = options[prop];
        };

        var nodeList = document.querySelectorAll(selector);
        var nodesArray = Array.prototype.slice.call(nodeList);

        //use array method on nodeList
        nodesArray.forEach(function(parent) {

            // date variables
            var today = new Date(),
            curDate = today, // dodgy
            curMonth = curDate.getMonth(),
            curYear = curDate.getFullYear(),
            monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

            // actual content: 4 elements
            var contControl =  document.createElement('div'),
            btnPrev, btnNext, сcontTitle;

            contControl.classList.add('cont-cal-control');

            btnPrev = document.createElement('div');
            btnPrev.innerHTML = '&larr;';
            btnPrev.classList.add('btn', 'btn-previous-month');
            btnPrev.addEventListener('click', function(e) {
                curMonth = curMonth - 1;
                updateDate();

                if (typeof settings.onMonthChange !== 'undefined') {
                    settings.onMonthChange(curYear, curMonth);
                }

                showMonth(curMonth, curYear);
            });

            contControl.appendChild(btnPrev);

            btnNext = document.createElement('div');
            btnNext.innerHTML = '&rarr;';
            btnNext.classList.add('btn', 'btn-next-month');
            btnNext.addEventListener('click', function(e) {
                curMonth = curMonth + 1;
                updateDate();

                if (typeof settings.onMonthChange !== 'undefined') {
                    settings.onMonthChange(curYear, curMonth);
                }

                showMonth(curMonth, curYear);
            });

            contControl.appendChild(btnNext);

            var contTitle =  document.createElement('div');
            contTitle.classList.add('cont-cal-title');
            contControl.appendChild(contTitle);

            var contCal =  document.createElement('div');
            contCal.classList.add('cont-cal');
            contCal.addEventListener('click', function(e) {

                if(e.target.classList.contains('current-month')) {
                    var selectedEls = contCal.getElementsByClassName('selected');
                    if (selectedEls.length > 0) {
                        selectedEls[0].classList.remove('selected');
                    }

                    var todayEls = contCal.getElementsByClassName('today');
                    if (todayEls.length > 0) {
                        todayEls[0].classList.remove('today');
                    }

                    //blabla
                    e.target.classList.add('selected');

                    var d = new Date(curYear, curMonth, e.target.innerHTML);

                    if (typeof settings.onDateClick !== 'undefined') {
                        settings.onDateClick(d);
                    }
                }
            });

            parent.appendChild(contControl);
            parent.appendChild(contCal);

            /**
            //         * [updateDate description]
            //         * @return {none} [description]
            //         */
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
                contCal.innerHTML = '';

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
                var correctionDays = settings.mondayFirst ? -5 : 1;

                // empty days to make a proper week start
                createDateElements(daysInPrevMonth - firstWeekDay + correctionDays, daysInPrevMonth);
                createCurrentMonthDateElements(daysInCurMonth);

                // show today selected
                if (curMonth === today.getMonth()) {
                    contCal.getElementsByClassName('current-month')[today.getDate() - 1].classList.add('today');
                }

                // update title
                contTitle.innerHTML = monthNames[curMonth] + ', ' + curYear;
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

                while (i <= endDate) {
                    contCal.appendChild(getDayElement(i, curMonth));
                    i++;
                }
            }

            /**
            * adds day elements to calendar container with class 'current-month'
            * @param  {integer} daysNum [description]
            * @return {none}         [description]
            */
            function createCurrentMonthDateElements(daysNum) {
                createDateElements(1, daysNum, true);
            }

            /**
            * returns a day element
            * @param  {integer} date  a days date
            * @param  {boolean} isCurrentMonth true in case of current month
            * @return {$object}       jquery DOM object
            */
            function getDayElement(date, isCurrentMonth) {

                if (typeof date === 'undefined') date = '';

                var result = document.createElement('div');
                result.classList.add('day');
                if (isCurrentMonth) result.classList.add('current-month');
                result.innerHTML = date;

                return result;
            }

            showMonth();
        });
    };

    /**
    * [destroy description]
    * @param  {[type]} selector [description]
    * @return {[type]}          [description]
    */
    function destroy(selector) {
        var nodeList = document.querySelectorAll(selector);
        var nodesArray = Array.prototype.slice.call(nodeList);

        //use array method on nodeList
        nodesArray.forEach(function(parent) {
            parent.innerHTML = '';
        });
    }

    return {
        init: init,
        destroy: destroy
    }
})();
