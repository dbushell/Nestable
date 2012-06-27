Nestable
========

### Drag & drop hierarchical list with mouse and touch compatibility (jQuery plugin)

[**Try Nestable Demo**](http://dbushell.github.com/Nestable/)

## Usage

Set up your HTML like so:

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
            </li>
            <li class="dd-item" data-id="4">
                <div class="dd-handle">Item 4</div>
            </li>
            <li class="dd-item" data-id="5">
                <div class="dd-handle">Item 5</div>
            </li>
        </ol>
    </div>

Then activate with JavaScript like so:

    $('.dd').nestable({
        /* options */
    });

Instructions are being written soon. For the time being inspect the [Nestable Demo](http://dbushell.github.com/Nestable/) for guidance.

## Change Log

### 27th June 2012

* Added `maxDepth` option (default to 5)
* Added empty placeholder
* Updated CSS class structure with options for `listClass` and `itemClass`.
* Fixed to allow drag and drop between multiple Nestable instances (off by default).
* Added `group` option to enabled the above.

* * *

Author: David Bushell [http://dbushell.com](http://dbushell.com/) [@dbushell](http://twitter.com/dbushell/)

Copyright © 2012 David Bushell | BSD & MIT license
