Nestable
========

## PLEASE NOTE

**I cannot provide any support or guidance beyond this README. If this code helps you that's great but I have no plans to develop Nestable beyond this demo (it's not a final product and has limited functionality). I cannot reply to any requests for help.**

* * *

### Drag & drop hierarchical list with mouse and touch compatibility (jQuery / Zepto plugin)

[**Try Nestable Demo**](http://dbushell.github.com/Nestable/)

Nestable is an experimental example and not under active development. If it suits your requirements feel free to expand upon it!

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
                    <li class="dd-item" data-id="4">
                        <div class="dd-handle">Item 4</div>
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

You can add `data-move-in` attribute to `item`, the value is a list no, which defined in `list` object, using `data-list-no` attribute, see example list-2, these item can only move up/down in theirs list range.

You can change the follow options:

* `maxDepth` number of levels an item can be nested (default `5`)
* `group` group ID to allow dragging between lists (default `0`)

These advanced config options are also available:

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
* `expandBtnHTML` The HTML text used to generate a list item expand button (default `'<button data-action="expand">Expand></button>'`)
* `collapseBtnHTML` The HTML text used to generate a list item collapse button (default `'<button data-action="collapse">Collapse</button>'`)
* `enableHMove` Enable horizontal move or not, default is `true`

**Inspect the [Nestable Demo](http://dbushell.github.com/Nestable/) for guidance.**

## Change Log

### 10th June 2014

* add restore feature, it can restores the state of nestable list, it accepts serialized object and extract item state('opened' or 'closed'), usage: `$('#root').nestable().nestable('restore', serialized_obj)`

### 9th June 2014

* add `enableHMove` to options for enable horizontal move or not, default `true`

### 7th June 2014

* add `data-move-in` and `data-list-no` for `item` and `list`, `item` only can be move in that `list`

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

Copyright © 2012 David Bushell | BSD & MIT license
