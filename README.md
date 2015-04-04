Nestable with 4 little callbacks
========

## This is a modified version of Nestable

Original can be found here: https://github.com/dbushell/Nestable

## Example
```
$('#example-list-element').nestable({
	'maxDepth': 3,
	afterInit: function ( event ) { 
		console.log( event ); 
	}
})
	.on('dragJustBeforeStart', function(event) {
		console.log('dragStart', event);
	})
	.on('dragStart', function(event, item, source, destination) {
		console.log('dragStart', event, item, source, destination);
	})
	.on('dragEnd', function(event, item, source, destination) {
		console.log('dragEnd', event, item, source, destination);
	})
	.on('dragMove', function(event, item, source, destination) {
		console.log('dragMove', event, item, source, destination);
	});
```
* * *

Original Author: David Bushell [http://dbushell.com](http://dbushell.com/) [@dbushell](http://twitter.com/dbushell/)

Copyright © 2012 David Bushell | BSD & MIT license
