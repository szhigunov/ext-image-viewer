Ext.define('UView.view.Main', {
	extend: 'Ext.container.Container',
	xtype: 'app-main',
	layout: 'fit',
	items: [{
		xtype: 'panel',
		itemId: 'imageCont',
		id:'imageCont',
		titleAlign: 'center',
		layout: {
			type: 'vbox',
			align: 'center',
			pack: 'center'	
		},
		autoScroll:false,
		frame:true,
		bodyStyle: {
			border: 'none',
		},
		dockedItems:[{
			xtype:'toolbar',
			dock:'top',
			hidden:true,
			items:[{
				xtype:'slider',
				hidden:true,
				useTips:false,
				itemId: 'zoomSlider',
				id:'zoomSlider',
				minValue: 1,
				value:1,	
				maxValue: 16,
				increment: 1
			}]
		}],
		items: [{xtype: 'svgnavcontainer'},{
			xtype: 'image',
			id:'imgEl',
			itemId:'imgEl',
			style:'text-indent: 100%;white-space: nowrap;overflow: hidden;',
			hidden:true,
			src: './resources/placeholder.jpg' // Default IMAGE
		}]

	}]
});