/*
    This file is generated and updated by Sencha Cmd. You can edit this file as
    needed for your application, but these edits will have to be merged by
    Sencha Cmd when upgrading.
*/
Ext.application({
    name: 'UView',
    extend: 'UView.Application',
    autoCreateViewport: true,
    init: function () {
        window.time = +new Date();
    }
});
Ext.Loader.setConfig({disableCaching : false});
//Prevent iPad Viewport moving 
// document.body.addEventListener('touchmove', function(event) {
//     event.preventDefault();
// }, false);
