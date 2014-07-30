Ext.define('UView.Application', {
    name: 'UView',
    extend: 'Ext.app.Application',
    requires:['router.Router'],
    views: [   
        // TODO: add views here
    ],
    models:['Image'],
    controllers: [
    'Main','DragDrop','MainSuper'
        // TODO: add controllers here
    ],

    stores: [
    'Images'
        // TODO: add stores here
    ]
});
