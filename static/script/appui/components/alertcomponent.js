/**
* @preserve Copyright (c) 2014 British Broadcasting Corporation
* (http://www.bbc.co.uk) and TAL Contributors (1)
*
* (1) TAL Contributors are listed in the AUTHORS file and at
*     https://github.com/fmtvp/TAL/AUTHORS - please extend this file,
*     not this notice.
*
* @license Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*
* All rights reserved
* Please contact us for an alternative licence
*/

define(
    "sampleapp/appui/components/alertcomponent",
    [

        "antie/widgets/component",
        "antie/widgets/horizontalprogress",
        "antie/widgets/label",
        "antie/widgets/button",
        "antie/widgets/keyboard",
        "antie/widgets/verticallist",
    ],
    function (Component, HorizontalProgress, Label, Button, Keyboard,VerticalList) {
        function evtBind(self, functionName) {
            return function (evt) {
                self[functionName].call(self, evt);
            };
        }

        return Component.extend({
            init: function init() {
                init.base.call(this, "alertcomponent");
                var self = this;
                var button = new Button();
                //this._createKeboard();
                button.appendChildWidget(new Label("Press SELECT to return to main menu."));
                //this.appendChildWidget(button);
                this._addComponentListeners();
               // var x=this._createKeboard();
               
               var myVirtualKeyBoard = new Keyboard("keyboards", 23,2, "ABCDEFGHIJKLMNOPQRSTUVWXYZ", false, true);
                myVirtualKeyBoard.setActiveChildKey('C')
              //  verticalListMenu = new VerticalList("subMenuList");
               // verticalListMenu.appendChildWidget(button);
                //verticalListMenu.appendChildWidget(myVirtualKeyBoard);
                this.appendChildWidget(myVirtualKeyBoard);

            },
            _addComponentListeners: function () {
                var componentEventListenerMap;
                componentEventListenerMap = {
                    'load': evtBind(this, '_onLoad'),
                    'beforerender': evtBind(this, '_onBeforeRender'),
                    'select': evtBind(this, '_onSelect')
                };
                this._addListenersTo(this, componentEventListenerMap);
            },
            _createKeboard: function () {

                var myVirtualKeyBoard = new Keyboard("keyboards", 4, 1, "abcdefg", false, true);
                myVirtualKeyBoard.setActiveChildKey('A')
              //  this.appendChildWidget(myVirtualKeyBoard);
            },
            _onLoad: function (ev) {

                // Called when component is first loaded.
            },
            _onBeforeRender: function (ev) {

                // Called before a component is rendered.
                // This is the best place to set data-specific content.
            },
            _onSelect: function (ev) {
                this.parentWidget.back();
            },
            _addListenersTo: function (target, listenerMap) {
                this._modifyListenersOn(target, listenerMap, true);
            },

            _modifyListenersOn: function (target, listenerMap, add) {
                var eventName, modifyFunction;
                modifyFunction = add ? target.addEventListener : target.removeEventListener;
                for (eventName in listenerMap) {
                    if (listenerMap.hasOwnProperty(eventName)) {
                        modifyFunction.call(target, eventName, listenerMap[eventName]);
                    }
                }
            }
        });
    });

