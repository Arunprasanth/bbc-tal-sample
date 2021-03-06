/**
* @preserve Copyright (c) 2013 British Broadcasting Corporation
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
  "sampleapp/appui/datasources/simplefeed",
  [
    "antie/class",
    "antie/runtimecontext"
  ],

  function (Class, RuntimeContext) {

    function evtBind() {

      var device = RuntimeContext.getDevice();
      var get = function () {
        return new Promise(function (resolve, reject) {
          // do a thing, possibly async, then…

          device.executeCrossDomainGet('http://localhost:3000/result', {
            onSuccess: function (responseObject) {
              resolve(responseObject);

            },
            onError: function (response) {
              reject(response);
            }
          });
        });
      };
      return get();

    }
     var sample= function(){
      var x=
      
      [
        {
          "id": "1",
          "title": "Apple",
          "img": "static/img/fruit/apple.png"
        },
        {
          "id": "2",
          "title": "Banana",
          "img": "static/img/fruit/banana.png"
        },
        {
          "id": "3",
          "title": "Grapes",
          "img": "static/img/fruit/grapes.png"
        },
        {
          "id": "4",
          "title": "Orange",
          "img": "static/img/fruit/orange.png"
        },
        {
          "id": "5",
          "title": "Peach",
          "img": "static/img/fruit/peach.png"
        },
        {
          "id": "6",
          "title": "Pear",
          "img": "static/img/fruit/pear.png"
        }
      ]
      return x;
    }
    return Class.extend({
      // You will probably want to do something more useful then returning static data
      loadData : function(callbacks) {
        // callbacks.onSuccess(
        // sample()
        
        //  );
        evtBind().then(callbacks.onSuccess);
      }
    });
  });
