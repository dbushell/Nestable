Nestable
========

### Drag & drop hierarchical list with mouse and touch compatibility (jQuery / Zepto plugin)

[**Try Nestable Demo**](https://rawgithub.com/kevinknelson/Nestable/master/index.html)

## Usage

Write your nested HTML lists like so:

    <div class="dd">
        <ol class="dd-list">
            <li class="dd-item" data-id="1">
                <div class="dd-handle">Item 1</div>
            </li>
            <li class="dd-item" data-id="2">
                <div class="dd-handle">Item 2</div>
            </li>
            <li class="dd-item" data-id="3">
                <div class="dd-handle">Item 3</div>
                <ol class="dd-list">
                    <li class="dd-item dd-nonest" data-id="4">
                    	<button type="button" data-action="remove" title="Remove">x</button>
                        <div class="dd-handle">Item 4 (can't have children)</div>
                    </li>
                    <li class="dd-item" data-id="5">
                        <div class="dd-handle">Item 5</div>
                    </li>
                </ol>
            </li>
        </ol>
    </div>

Then activate with jQuery like so:

    $('.dd').nestable({ /* config options */ });

### Custom Actions

When initializing a list, you can provide customActions with callbacks.  In the below example, the "remove" action will remove the LI tag and it's children from the DOM.  To use this custom action
all that is needed is to have a button with data-action="remove" as a child of the item.

[**See the demo page for a more complete example**](https://rawgithub.com/kevinknelson/Nestable/master/index.html)

    $('.dd').nestable({
		customActions   : {
			"remove"    : function(item,button) { item.remove(); }
		}
    });

### Events

The `change` event is fired when items are reordered.

    $('.dd').on('change', function() {
        /* on change event */
    });

### Methods

You can get a serialised object with all `data-*` attributes for each item.

    $('.dd').nestable('serialize');

The serialised JSON for the example above would be:

    [{"id":1},{"id":2},{"id":3,"children":[{"id":4},{"id":5}]}]

### Configuration

You can change the follow options:

* `maxDepth` number of levels an item can be nested (default `5`)
* `group` group ID to allow dragging between lists (default `0`)

These advanced config options are also available:

* `actionClass` Elements with this class can fire customActions.  expandBtnHTML and collapseBtnHTML should also have this class (default `'dd-action'`)
* `listNodeName` The HTML element to create for lists (default `'ol'`)
* `itemNodeName` The HTML element to create for list items (default `'li'`)
* `rootClass` The class of the root element `.nestable()` was used on (default `'dd'`)
* `listClass` The class of all list elements (default `'dd-list'`)
* `itemClass` The class of all list item elements (default `'dd-item'`)
* `dragClass` The class applied to the list element that is being dragged (default `'dd-dragel'`)
* `handleClass` The class of the content element inside each list item (default `'dd-handle'`)
* `collapsedClass` The class applied to lists that have been collapsed (default `'dd-collapsed'`)
* `placeClass` The class of the placeholder element (default `'dd-placeholder'`)
* `emptyClass` The class used for empty list placeholder elements (default `'dd-empty'`)
* `noNestClass` The class used to prohibit child items being dropped within tag (default `'dd-nonest'`)
* `customActions` An object that can have actions defined for buttons with custom callbacks (default `{}`)
* `expandBtnHTML` The HTML text used to generate a list item expand button (default `'<button class="dd-action" data-action="expand" title="Expand">+</button>'`)
* `collapseBtnHTML` The HTML text used to generate a list item collapse button (default `'<button class="dd-action" data-action="collapse" title="Collapse">-</button>'`)
* `isNestAllowed` customizable callback which allows you to specify logical rules for nesting.  `Currently buggy`

**Inspect the [Nestable Demo](https://rawgithub.com/kevinknelson/Nestable/master/index.html) for guidance.**

## Change Log

### 5th August 2013

* Added option for an isNestAllowed($parent,$item) callback that will allow the developer to specify logical business rules for whether or not an item can be nested within a parent.  It's currently buggy in that if it's not allowed to be nested on multiple levels, trying to nest it in the deepest level may allow it into a level just above it which is also not allowed but doesn't get checked since it's only checking one level at a time.

### 25th June 2013

* BREAKING CHANGE: ANY element can now trigger a customAction.  However, buttons no longer auto-trigger.  So, if you have a custom expand/collapse HTML, they will break with this change until you add class="dd-action", where "dd-action" can be configured with the new actionClass option. (contributed by @ThisIsAreku)

### 20th June 2013

* Added option customActions that allows buttons with any data-action to call methods defined in initialization
* Removed handler for data-action="remove" (replaced with customActions since it is more flexible)

### 19th June 2013

* FIX broken mouse actions on touch-capable browsers by making both touch and mouse work simultaneously
* Added option noNestClass to allow items to be identified as not allowed to have children
* Added handler that allows a button to be added with data-action="remove" to remove elements
* Update example page to reflect above changes.

### 15th October 2012

* Merge for Zepto.js support
* Merge fix for remove/detach items

### 27th June 2012

* Added `maxDepth` option (default to 5)
* Added empty placeholder
* Updated CSS class structure with options for `listClass` and `itemClass`.
* Fixed to allow drag and drop between multiple Nestable instances (off by default).
* Added `group` option to enabled the above.

* * *

Author: David Bushell [http://dbushell.com](http://dbushell.com/) [@dbushell](http://twitter.com/dbushell/)
Contributer: Kevin K. Nelson [http://xingcreative.com](http://xingcreative.com/)

Copyright © 2012 David Bushell | BSD & MIT license
