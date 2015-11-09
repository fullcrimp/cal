# Simple calendar js plugin

Simplest possible plugin - no restrictions, no popups, minimum scripts. All styles in css file.

![example](https://github.com/fullcrimp/cal/blob/master/images/blue.png)

## Jquery plugin

Example:

```javascript
$('.elClass').cal({
    
    mondayFirst: true, // otherwise sunday is first

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
@TODO
