Ext.define('UView.controller.MainSuper', {
	extend: 'Ext.app.Controller',
	refs:[{
        ref:'image',
        selector:'image#imgEl'
    },{
        ref:'imgCont',
        selector:'panel#imageCont'
    },{
    	ref:'Main',
        selector:'app-main'
    },{
        ref:'slider',
        selector:'slider#zoomSlider'
    },{
        ref: 'resetButton',
        selector: 'button#resetZoomBtn'
    }],
});