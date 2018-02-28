define(
    "sampleapp/appui/widgets/input", [
        'antie/widgets/container',
        'antie/events/focusdelayevent',
        'antie/events/keyevent',
        'antie/events/selectevent',
        'antie/runtimecontext'
    ],
    function(Container, FocusDelayEvent, KeyEvent, SelectEvent, Runtimecontext) {
        'use strict';
        return Container.extend({
            init: function init(id, animationEnabled) {
                init.base.call(this, id);
                var device = Runtimecontext.getDevice();
                this._focusDelayHandle = null;
                this._disabled = false;

                /* Reduce the focusDelayTimeout for devices that don't have animation enabled */
                if (typeof animationEnabled === 'boolean' && !animationEnabled) {
                    this._focusDelayTimeout = 500;
                } else {
                    this._focusDelayTimeout = 1500;
                }

                /* if the ENTER key is pressed, translate into into a SelectEvent on this button */
                var self = this;
                this.addEventListener('keydown', function(e) {
                    if (e.keyCode === KeyEvent.VK_ENTER) {
                        self.select();
                        e.stopPropagation();
                    }
                });
                this.render(device);
            },

            render: function render(device) {
                console.log("hai");
                this.outputElement = this._createInput(this.id);
                for (var i = 0; i < this._childWidgetOrder.length; i++) {
                    device.appendChildElement(this.outputElement, this._childWidgetOrder[i].render(device));
                }
                return this.outputElement;
            },

            _createInput: function _createInput(id, classNames) {
                var input = document.createElement('div');
                // don't add auto-generated IDs to the DOM
                if (id && (id.substring(0, 1) !== '#')) {
                    input.id = id;
                }
                if (classNames && (classNames.length > 0)) {
                    input.className = classNames.join(' ');
                }
                input.type = "input";
                input.name = "1";
                input.value = 2;
                return input;
            },

            isFocusable: function isFocusable() {
                // a widget can receive focus if it or any of it's descendants are Buttons
                // We're a button, so we are
                return !this._disabled;
            },
            _onKeyDown: function _onKeyDown(e) {
                console.log(e);
            },
            select: function select() {
                this.bubbleEvent(new SelectEvent(this));
            },
            focus: function focus() {
                var origDisabled = this._disabled;
                if (force) {
                    this._disabled = false;
                }

                var focusChanged = true;
                var w = this;
                while (w.parentWidget) {
                    if (!w.parentWidget.setActiveChildWidget(w)) {
                        focusChanged = false;
                    }
                    w = w.parentWidget;
                }

                this._disabled = origDisabled;

                return focusChanged;
            },
            select: function select() {
                this.bubbleEvent(new SelectEvent(this));
            },
            /**
             * Flags the active child as focussed or blurred.
             * @param {Boolean} focus True if the active child is to be focussed, False if the active child is to be blurred.
             * @private
             */
            _setActiveChildFocussed: function _setActiveChildFocussed(focus) {
                if (this._focusDelayHandle) {
                    clearTimeout(this._focusDelayHandle);
                }
                console.log("here");
                if (focus) {
                    this.outputElement.focus();
                    this.removeClass('buttonBlurred');
                    //this.addClass('buttonFocussed');
                    var self = this;
                    // Fire a focus delay event if this button has had focus for more than x-seconds.
                    this._focusDelayHandle = setTimeout(function() {
                        self.bubbleEvent(new FocusDelayEvent(self));
                    }, this._focusDelayTimeout);

                    this.getCurrentApplication()._setFocussedWidget(this);
                } else {
                    this.outputElement.blur();
                    this.removeClass('buttonFocussed');
                    this.addClass('buttonBlurred');
                }
            },
            removeFocus: function removeFocus() {
                removeFocus.base.call(this);
                this.removeClass('buttonFocussed');
                this.addClass('buttonBlurred');
            }
        });
    }
);