
define(
    "sampleapp/appui/components/logincomponent",
    [

        "antie/widgets/component",
        "antie/widgets/label",
        "antie/widgets/image",
        "antie/widgets/button",
        "antie/widgets/verticallist",
    ],
    function (Component, Label, Image,Button,VerticalList) {
  
        return Component.extend({
            init: function init() {
                init.base.call(this, "logincomponent");
                var self = this;
                var logoImage=new Image("logoImage","static/img/logo-desktop.png");
                logoImage.addClass("logo");
                var welcomeLableStart=new Label("welcomeLabelStart","WELCOME BACK");
                welcomeLableStart.addClass("welcome-label");
                var welcomeLableEnd=new Label("welcomeLabelEnd","SIGN IN BELOW");
                welcomeLableEnd.addClass("welcome-label");
                var submitButton = new Button();
                submitButton.addClass("bc-FF015B");
                submitButton.appendChildWidget(new Label("SIGN IN"));

                var loginForm = new Button();
               loginForm.addClass("height-50-percentage");
               var emailLabel=new Label("email","EMAIL*");
               emailLabel.addClass("login-form");
               var passwordLabel=new Label("password","PASSWORD*");
               passwordLabel.addClass("login-form");
               loginForm.appendChildWidget(emailLabel);
               loginForm.appendChildWidget(passwordLabel);
               loginForm.appendChildWidget(submitButton);
               self.appendChildWidget(logoImage);
                self.appendChildWidget(welcomeLableStart);
                self.appendChildWidget(welcomeLableEnd);
               // self.appendChildWidget(submitButton);
                self.appendChildWidget(loginForm);
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

