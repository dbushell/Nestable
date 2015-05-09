Nestable with 5 little callbacks
========

## This is a modified version of Nestable

Original can be found here: https://github.com/dbushell/Nestable

## Example
```
$('#example-list-element').nestable({
    afterInit: function ( event ) { 
        console.log( event ); 
    }
})
.on('beforeDragStart', function(handle) {
    console.log('dragStart', handle);
})
.on('dragStart', function(event, item, source) {
    console.log('dragStart', event, item, source);
})
.on('dragMove', function(event, item, source, destination) {
    console.log('dragMove', event, item, source);
})
.on('dragEnd', function(event, item, source, destination) {
    console.log('dragEnd', event, item, source, destination);
})
.on('beforeDragEnd', function(event, item, source, destination, position, feedback) {
    // If you need to persist list items order if changes, you need to comment the next line
    if (source[0] === destination[0]) { feedback.abort = true; return; }

    feedback.abort = !window.confirm('Continue?');
})
.on('dragEnd', function(event, item, source, destination, position) {
    // Make an ajax request to persist move on database
    // here you can pass item-id, source-id, destination-id and position index to the server
    // ....

    console.log('dragEnd', event, item, source, destination, position);
});
```
* * *

Original Author: David Bushell [http://dbushell.com](http://dbushell.com/) [@dbushell](http://twitter.com/dbushell/)

Big thanks to @bigfoot90 !

Copyright © 2012 David Bushell | BSD & MIT license
