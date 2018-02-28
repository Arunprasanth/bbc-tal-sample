
define(
    "sampleapp/appui/widgets/videocard", [
        'antie/widgets/container',
        'antie/events/focusdelayevent',
        'antie/events/keyevent',
        'antie/events/selectevent',
        'antie/runtimecontext'
    ],
    function(Container, FocusDelayEvent, KeyEvent, SelectEvent, Runtimecontext) {
        'use strict';
        return Container.extend({
            init: function init(id, animationEnabled,dataObject) {
               
                init.base.call(this, id);
                var device = Runtimecontext.getDevice();
                this._focusDelayHandle = null;
                this._disabled = false;
                this.dataObject=dataObject;

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
             
                this.outputElement = this._createVideoCard(this.id);
                for (var i = 0; i < this._childWidgetOrder.length; i++) {
                    device.appendChildElement(this.outputElement, this._childWidgetOrder[i].render(device));
                }
                return this.outputElement;
            },

            _createVideoCard: function _createVideoCard(id) {
               console.log(this.dataObject.id)
                var videoCard = document.createElement('div');
                var videoCardContent = document.createElement('div');
                var videoCardContentHeader = document.createElement('div');
                var videoCardHeaderContent = document.createElement('span');
                videoCardHeaderContent.innerHTML="15.17"
                videoCard.className="";
                videoCardContent.className="card--content";
                videoCardContentHeader.className="header";
                videoCardHeaderContent.className="badge badge-info";
                videoCardContentHeader.appendChild(videoCardHeaderContent);   
                videoCardContent.appendChild(videoCardContentHeader);   
                videoCard.appendChild(videoCardContent);   
                // don't add auto-generated IDs to the DOM
             var x=   `<div class="card--container video with--description" 
             style="width: 295px; height: 165.938px;"><a class="card  resident-secondary-color-fg " 
             href="/video/8468?startFrom=206"><div class="card--content"><div class="header"><span
              class="badge badge-info">25:51</span></div><span class="btn-control"><span 
              class="btn btn-play btn-play-mini"><i class="dice-icon icon-play"></i></span><span 
              class="btn btn-play"><i class="dice-icon icon-play" style="padding-top: 20px;"></i></span></span><div class="info">
              <span class="date"></span><span class="title">Premier League World - Show 35</span><p 
              class="description"><span>This week we take an in look with former Coventry City, 
              Liverpool and England goalkeeper Chris Kirkland about his up and down Premier League 
              career.</span></p></div><div class="overlay"></div><div class="cover"><div class="thumbnail
               ready" style="background-image: url(&quot;https://dve-images.imggaming.com/295x165/p/2018/02/15/6e27a691fb516dd4f6cd804fef60bb72.jpg&quot;);">
               </div><div class="placeholder ready" 
               style="background-image: url(&quot;https://imggaming.s3.amazonaws.com/dice-web/assets/dce.epl/card_dummy.png&quot;);"></div></div><div class="progress" style="background-color: rgb(255, 1, 91); width: 13.2818%;">
               </div></div></a></div>`;
                var videoCardz = document.createElement('div');
                videoCardHeaderContent.innerHTML=x;
                videoCard.appendChild(videoCardz); 
                return videoCard;
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
            // _populateTheGridWithKeyButtons: function _populateTheGridWithKeyButtons () {
            //             var button = new Button(this.id,"Sample");
            //             button.addClass("card--content")
            //             button.setDataItem("letter");
            //             var headerButton=new Button("headerButton");
            //             headerButton.addClass("header")
            //             var headerLabel=new Label("headerLabel","15.07");
            //             headerLabel.addClass("badge badge-info")
            //             var footerLabel=new Label("footer","Premier League world show");
            //             footerLabel.addClass("info");
            //             headerButton.appendChildWidget(headerLabel);
            //             button.appendChildWidget(headerButton);
            //            // button.appendChildWidget(footerLabel);
            //        //     this._letterButtons[this._keys[1]] = button;

            //             this.setWidgetAt(0, 1, button);
                  
 