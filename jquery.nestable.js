/*!
 * Nestable jQuery Plugin - Copyright (c) 2012 David Bushell - http://dbushell.com/
 * Dual-licensed under the BSD or MIT licenses
 */
;(function($, window, document, undefined)
{

    var hasTouch = 'ontouchstart' in window;

    var eStart  = hasTouch ? 'touchstart'  : 'mousedown',
        eMove   = hasTouch ? 'touchmove'   : 'mousemove',
        eEnd    = hasTouch ? 'touchend'    : 'mouseup';
        eCancel = hasTouch ? 'touchcancel' : 'mouseup';

    var defaults = {
            listNodeName    : 'ul',
            itemNodeName    : 'li',
            dragClass       : 'dd-dragel',
            handleClass     : 'dd-handle',
            collapsedClass  : 'dd-collapsed',
            placeClass      : 'dd-placeholder',
            maxdepth        : 3,
            threshold       : 20
        };

    function Plugin(element, options)
    {
        this.el = $(element);
        this.options = $.extend({}, defaults, options);
        this.dragEl = null;
        this.pointEl = null;
        this.placeEl = null;
        this.init();
    }

    Plugin.prototype = {

        init: function()
        {
            var list = this;

            list.reset();

            list.placeEl = $('<div class="' + list.options.placeClass + '"/>');

            $.each(this.el.find(list.options.itemNodeName), function(k, el) {
                list.setParent($(el));
            });

            list.el.on('click', function(e) {
                if (list.dragEl || (!hasTouch && e.button !== 0)) {
                    return;
                }
                var target = $(e.target),
                    action = target.data('action'),
                    item   = target.parent(list.options.itemNodeName);
                if (action === 'collapse') {
                    list.collapseItem(item);
                }
                if (action === 'expand') {
                    list.expandItem(item);
                }
            });

            var onStartEvent = function(e)
            {
                if (!$(e.target).hasClass(list.options.handleClass)) {
                    return;
                }
                if (list.dragEl || (!hasTouch && e.button !== 0) || (hasTouch && e.touches.length !== 1)) {
                    return;
                }
                e.preventDefault();
                list.dragStart(hasTouch ? e.touches[0] : e);
            };

            var onMoveEvent = function(e)
            {
                if (list.dragEl) {
                    e.preventDefault();
                    list.dragMove(hasTouch ? e.touches[0] : e);
                }
            };

            var onEndEvent = function(e)
            {
                if (list.dragEl) {
                    e.preventDefault();
                    list.dragStop(hasTouch ? e.touches[0] : e);
                }
            };

            if (hasTouch) {
                list.el[0].addEventListener(eStart, onStartEvent, false);
                window.addEventListener(eMove, onMoveEvent, false);
                window.addEventListener(eEnd, onEndEvent, false);
                window.addEventListener(eCancel, onEndEvent, false);
            } else {
                list.el.on(eStart, onStartEvent);
                $(window).on(eMove, onMoveEvent);
                $(window).on(eEnd, onEndEvent);
            }

        },

        serialize: function()
        {
            var data,
                list  = this;
                step  = function(level)
                {
                    var array = [ ],
                        items = level.children(list.options.itemNodeName);
                    items.each(function()
                    {
                        var li   = $(this),
                            item = li.data(),
                            sub  = li.children(list.options.listNodeName);
                        if (sub.length) {
                            item.children = step(sub);
                        }
                        array.push(item);
                    });
                    return array;
                };
            data = step(list.el.find(list.options.listNodeName + ':first'));
            return data;
        },

        serialise: function()
        {
            return this.serialize();
        },

        reset: function()
        {
            this.mouse = {
                offsetX   : 0,
                offsetY   : 0,
                startX    : 0,
                startY    : 0,
                lastX     : 0,
                lastY     : 0,
                nowX      : 0,
                nowY      : 0,
                distX     : 0,
                distY     : 0,
                dirAx     : 0,
                dirX      : 0,
                dirY      : 0,
                lastDirX  : 0,
                lastDirY  : 0,
                distAxX   : 0,
                distAxY   : 0
            };
            this.moving = false;
        },

        expandItem: function(li)
        {
            li.removeClass(this.options.collapsedClass);
            li.children('[data-action="expand"]').hide();
            li.children('[data-action="collapse"]').show();
            li.children(this.options.listNodeName).show();
        },

        collapseItem: function(li)
        {
            var lists = li.children(this.options.listNodeName);
            if (lists.length) {
                li.addClass(this.options.collapsedClass);
                li.children('[data-action="collapse"]').hide();
                li.children('[data-action="expand"]').show();
                li.children(this.options.listNodeName).hide();
            }
        },

        expandAll: function()
        {
            var list = this;
            list.el.find(list.options.itemNodeName).each(function() {
                list.expandItem($(this));
            });
        },

        collapseAll: function()
        {
            var list = this;
            list.el.find(list.options.itemNodeName).each(function() {
                list.collapseItem($(this));
            });
        },

        setParent: function(li)
        {
            if (li.children(this.options.listNodeName).length) {
                li.prepend('<button data-action="expand">+</button>');
                li.prepend('<button data-action="collapse">-</button>');
            }
            li.children('[data-action="expand"]').hide();
        },

        unsetParent: function(li)
        {
            li.removeClass(this.options.collapsedClass);
            li.children('[data-action]').remove();
            li.children(this.options.listNodeName).remove();
        },

        dragStart: function(e)
        {
            var mouse  = this.mouse,
                target = $(e.target);
            this.dragEl = target.parents(this.options.itemNodeName + ':first');
            this.placeEl.css({
                'width'         : this.dragEl.width(),
                'height'        : this.dragEl.height(),
                'margin-bottom' : this.dragEl.css('margin-bottom')
            });
            mouse.offsetX = e.offsetX !== undefined ? e.offsetX : e.pageX - target.offset().left;
            mouse.offsetY = e.offsetY !== undefined ? e.offsetY : e.pageY - target.offset().top;

            

            mouse.startX = mouse.lastX = e.pageX;
            mouse.startY = mouse.lastY = e.pageY;

            this.dragEl.css('width', this.dragEl.width()).replaceWith(this.placeEl);
            $(document.body).append(this.dragEl.addClass(this.options.dragClass));
            this.dragEl.css({
                'left' : e.pageX - mouse.offsetX,
                'top'  : e.pageY - mouse.offsetY
            });
        },

        dragStop: function(e)
        {
            this.reset();
            this.placeEl.replaceWith(this.dragEl.removeClass(this.options.dragClass));
            this.dragEl[0].style.cssText = '';
            this.dragEl = null;
            this.pointEl = null;
            this.el.trigger('change');
        },

        dragMove: function(e)
        {
            var list, parent, prev, next,
                mouse = this.mouse;

            this.dragEl.css({
                'left' : e.pageX - mouse.offsetX,
                'top'  : e.pageY - mouse.offsetY
            });

            // mouse position last events
            mouse.lastX = mouse.nowX;
            mouse.lastY = mouse.nowY;
            // mouse position this events
            mouse.nowX  = e.pageX;
            mouse.nowY  = e.pageY;
            // distance mouse moved between events
            mouse.distX = mouse.nowX - mouse.lastX;
            mouse.distY = mouse.nowY - mouse.lastY;
            // direction mouse was moving
            mouse.lastDirX = mouse.dirX;
            mouse.lastDirY = mouse.dirY;
            // direction mouse is now moving (on both axis)
            mouse.dirX = mouse.distX === 0 ? 0 : mouse.distX > 0 ? 1 : -1;
            mouse.dirY = mouse.distY === 0 ? 0 : mouse.distY > 0 ? 1 : -1;
            // axis mouse is now moving on
            var newAx   = Math.abs(mouse.distX) > Math.abs(mouse.distY) ? 1 : 0;

            // do nothing on first move
            if (!mouse.moving) {
                mouse.dirAx  = newAx;
                mouse.moving = true;
                return;
            }
            // calc distance moved on this axis AND direction
            if (mouse.dirAx !== newAx) {
                mouse.distAxX = 0;
                mouse.distAxY = 0;
            } else {
                mouse.distAxX += Math.abs(mouse.distX);
                if (mouse.dirX !== 0 && mouse.dirX !== mouse.lastDirX) {
                    mouse.distAxX = 0;
                }
                mouse.distAxY += Math.abs(mouse.distY);
                if (mouse.dirY !== 0 && mouse.dirY !== mouse.lastDirY) {
                    mouse.distAxY = 0;
                }
            }
            mouse.dirAx = newAx;

            /**
             * move horizontal
             */
            if (mouse.dirAx) {
                if (mouse.distAxX < this.options.threshold) {
                    return;
                }
                mouse.distAxX = 0;
                // increase level
                if (mouse.distX > 0) {
                    prev = this.placeEl.prev(this.options.itemNodeName);
                    if (!prev.length) {
                        return;
                    }
                    list = prev.find(this.options.listNodeName + ':last');
                    // item is at same level as item above
                    if (prev.hasClass(this.options.collapsedClass)) {
                        return;
                    }
                    /*
                    var depth = placeholder.parents('li').length;
                    if (depth >= this.options.maxdepth) {
                        return;
                    }
                    */
                    if (!list.length) {
                        list = $('<' + this.options.listNodeName + '/>');
                        list.append(this.placeEl);
                        prev.append(list);
                        this.setParent(prev);
                    } else {
                        // else append to next level up
                        list = prev.children(this.options.listNodeName + ':last');
                        list.append(this.placeEl);
                    }
                // decrease level
                } else {
                    next = this.placeEl.next(this.options.itemNodeName);
                    if (next.length) {
                        return;
                    }
                    parent = this.placeEl.parent();
                    this.placeEl.parents(this.options.itemNodeName + ':first').after(this.placeEl);
                    if (!parent.children().length) {
                        this.unsetParent(parent.parent());
                    }
                }
            /**
             * move vertical
             */
            } else {
                this.pointEl = $(document.elementFromPoint(e.clientX, e.clientY));
                if (this.pointEl.hasClass(this.options.handleClass)) {
                    this.pointEl = $(this.pointEl[0].parentNode);
                }
                if (this.pointEl[0].nodeName.toLowerCase() !== this.options.itemNodeName || this.pointEl.hasClass(this.options.dragClass)) {
                    return;
                }
                var before = e.clientY < (this.pointEl.offset().top + this.pointEl.height() / 2);
                    parent = this.placeEl.parent();
                    this.placeEl.parents(this.options.itemNodeName + ':first').after(this.placeEl);
                    if (!parent.children().length) {
                        this.unsetParent(parent.parent());
                    }
                if (before) {
                    this.pointEl.before(this.placeEl);
                } else {
                    this.pointEl.after(this.placeEl);
                }
            }
        }

    };

    $.fn.nestable = function(params)
    {
        var lists  = this,
            retval = this;

        lists.each(function()
        {
            var plugin = $.data(this, 'plugin_nestable');
            if (!plugin) {
                $.data(this, 'plugin_nestable', new Plugin(this, params));
            } else {
                if (typeof params === 'string' && typeof plugin[params] === 'function') {
                    retval = plugin[params]();
                }
            }
        });

        return retval || lists;
    };

})(jQuery, window, document);