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
.on('dragJustBeforeStart', function(handle) {
	console.log('dragStart', handle);
})
.on('dragStart', function(event, item, source) {
	console.log('dragStart', event, item, source);
})
.on('dragEnd', function(event, item, source, destination) {
	console.log('dragEnd', event, item, source, destination);
})
.on('beforeDragEnd', function(event, item, source, destination, position, feedback) {
	if (source[0] === destination[0]) return;
	feedback.abort = !window.confirm('Continue?');
})
.on('dragEnd', function(event, item, source, destination, position) {
	if (source[0] === destination[0]) return;

	// Make an ajax request to persist move on database
	// here i need to pass item-id, source-id, destination-id, position index to the server
	// ....
})
.on('dragMove', function(event, item, source, destination) {
	console.log('dragMove', event, item, source);
});
```
* * *

Original Author: David Bushell [http://dbushell.com](http://dbushell.com/) [@dbushell](http://twitter.com/dbushell/)

Big thanks to @bigfoot90 !

Copyright © 2012 David Bushell | BSD & MIT license
