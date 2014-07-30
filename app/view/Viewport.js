Ext.define('UView.view.Viewport', {
    extend: 'Ext.container.Viewport',
    requires: [
        'Ext.layout.container.Border',
        'Ext.slider.Single',
        'custom.svgNavComp',
        'UView.view.Main'
    ],
    layout: {
        type: 'border',
    },
    items: [{
        region: 'north',
        ui: 'header',
        layout: {
            type: 'hbox',
            align: 'middle',
            padding: 5,
        },
        defaults: {
            padding: '0 10 0 10'
        },
        items: [{
            xtype: 'box',
            html: '<h1>Viewport Head\'a</h1>',
        }, {
            xtype: 'button',
            text: 'Select Image',
            itemId:'btnLoader',
            scale: 'large'
        },{
            xtype:'button',
            text:'Reset Zoom',
            itemId:'resetZoomBtn',
            scale:'large'
        }]
    }, {
        region: 'center',
        xtype: 'app-main',
    }, {
        region: 'south',
        ui: 'footer',
        html: '<h1> This is Footaaaar!</h1>'
    }]
});