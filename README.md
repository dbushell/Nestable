Nestable
========

Just another fork of Nestable jQuery plugin developed by David Bushell then updated by Ramon Smit who deleted the repository later.

This covers the latest version. Some features may be added in the near future.

[**Try Nestable Demo**](http://dbushell.github.com/Nestable/)

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

You can get a hierarchical nested set model like below.

    $('.dd').nestable('asNestedSet');

The output will be like below.

    [{"id":1,"parent_id":"","depth":0,"lft":1,"rgt":2},{"id":2,"parent_id":"","depth":0,"lft":3,"rgt":4},{"id":3,"parent_id":"","depth":0,"lft":5,"rgt":10},{"id":4,"parent_id":3,"depth":1,"lft":6,"rgt":7},{"id":5,"parent_id":3,"depth":1,"lft":8,"rgt":9}]

### Configuration

You can change the follow options:

* `maxDepth` number of levels an item can be nested (default `5`)
* `group` group ID to allow dragging between lists (default `0`)
* `callback` callback function when an element has been changed (default `null`)

These advanced config options are also available:

* `contentCallback` The callback for customizing content (default `function(item) {return item.content || '' ? item.content : item.id;}`)
* `listNodeName` The HTML element to create for lists (default `'ol'`)
* `itemNodeName` The HTML element to create for list items (default `'li'`)
* `rootClass` The class of the root element `.nestable()` was used on (default `'dd'`)
* `listClass` The class of all list elements (default `'dd-list'`)
* `itemClass` The class of all list item elements (default `'dd-item'`)
* `dragClass` The class applied to the list element that is being dragged (default `'dd-dragel'`)
* `noDragClass` The class applied to an element to prevent dragging (default `'dd-nodrag'`)
* `handleClass` The class of the content element inside each list item (default `'dd-handle'`)
* `collapsedClass` The class applied to lists that have been collapsed (default `'dd-collapsed'`)
* `noChildrenClass` The class applied to items that cannot have children (default `'dd-nochildren'`)
* `placeClass` The class of the placeholder element (default `'dd-placeholder'`)
* `emptyClass` The class used for empty list placeholder elements (default `'dd-empty'`)
* `expandBtnHTML` The HTML text used to generate a list item expand button (default `'<button data-action="expand">Expand></button>'`)
* `collapseBtnHTML` The HTML text used to generate a list item collapse button (default `'<button data-action="collapse">Collapse</button>'`)
* `includeContent` Enable or disable the content in output (default `false`)
* `listRenderer` The callback for customizing final list output (default `function(children, options) { ... }` - see defaults in code)
* `itemRenderer` The callback for customizing final item output (default `function(item_attrs, content, children, options) { ... }` - see defaults in code)
* `json` JSON string used to dynamically generate a Nestable list. This is the same format as the `serialize()` output

## Change Log

### 25th September 2015

* [ozdemirburak] Fork of disappeared repository of Ramon Smit
* [ozdemirburak] Added asNestedSet method.

### 6th October 2014

* [zemistr] Created listRenderer and itemRenderer. Refactored build from JSON.
* [zemistr] Added support for adding classes via input data. (```[{"id": 1, "content": "First item", "classes": ["dd-nochildren", "dd-nodrag", ...] }, ... ]```)

### 3th October 2014

* [zemistr] Added support for additional data parameters.
* [zemistr] Added callback for customizing content.
* [zemistr] Added parameter "includeContent" for including / excluding content from the output data.
* [zemistr] Added fix for input data. (JSON string / Javascript object)

### 7th April 2014

* New pickup of repo for developement.

### 14th March 2013

* [tchapi] Merge Craig Sansam' branch [https://github.com/craigsansam/Nestable/](https://github.com/craigsansam/Nestable/) - Add the noChildrenClass option

### 13th March 2013

* [tchapi] Replace previous `change` behaviour with a callback

### 12th February 2013

* Merge fix from [jails] : Fix change event triggered twice.

### 3rd December 2012

* [dbushell] add no-drag class for handle contents
* [dbushell] use `el.closest` instead of `el.parents`
* [dbushell] fix scroll offset on document.elementFromPoint()

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

Copyright © 2012 David Bushell | BSD & MIT license
