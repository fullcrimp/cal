# Simple calendar js plugin

Simplest possible plugin - no restrictions, no popups, minimum scripts. All styles in css file.

![example](https://github.com/fullcrimp/cal/blob/master/images/blue.png)

## Jquery plugin

Example:

```javascript
$('.elClass').cal({

    sundayPosition: 0, // 6 is default
    
    onDateClick: function(date){
        console.log(date);
    },
    onMonthChange: function(month, year){
        console.log(month, year);

    }
});
```



## Angular directive
@TODO

## Vanila js module
No dependencies. IE9+.
Example:

```javascript
cal.init('.test1, .test2, .test3', {

    sundayPosition: 0, // 6 is default

    onDateClick: function(date) {
        console.log(date);
    },
    onMonthChange: function(month, year) {
        console.log(month, year);
    }
});

...

cal.destroy('.test1');
```
