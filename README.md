Nestable with 4 little callbacks
========

## This is a modified version of Nestable

Original can be found here: https://github.com/dbushell/Nestable

## Example
```
$('#example-list-element').nestable({
	afterInit: function () {
		console.log('afterInit');
	},
	onStartEvent: function ( _event ) {
		console.log('onStartEvent',_event);
	},
	onMoveEvent: function ( _event ) {
		console.log('onMoveEvent',_event);
	},
	onEndEvent: function ( _event ) {
		console.log('onEndEvent',_event);
	},
});
```
* * *

Original Author: David Bushell [http://dbushell.com](http://dbushell.com/) [@dbushell](http://twitter.com/dbushell/)

Copyright © 2012 David Bushell | BSD & MIT license
