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
	.on('dragStart', function(event, item, source, destination) {
		console.log('dragStart', item, source, destination);
	})
	.on('dragEnd', function(event, item, source, destination) {
		console.log('dragEnd', item, source, destination);
	})
	.on('dragMove', function(event, item, source, destination) {
		console.log('dragMove', item, source, destination);
	});
```
* * *

Original Author: David Bushell [http://dbushell.com](http://dbushell.com/) [@dbushell](http://twitter.com/dbushell/)

Copyright © 2012 David Bushell | BSD & MIT license
