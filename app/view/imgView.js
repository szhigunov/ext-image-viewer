Ext.define("UView.view.imgView", {
	extend: 'Ext.panel.Panel',
	requires:['custom.svgNavComp'],
	xtype: 'imgview',
	autoScroll: false,
	border: false,
	layout: 'fit',
	items: [{
		xtype: 'panel',
		id: 'imageCont',
		itemId: 'imageCont',
		cls: 'image-viewer',
		layout: {
			type: 'vbox',
			align: 'center',
			pack: 'center'
		},
		items: {
			xtype: 'svgnavcontainer',
		},
		bodyStyle: {
			border: 'none',
		},
		autoScroll: false
	}],
	tbar:[{
		text:'upload image',
		padding:5,
		itemId:'btnLoader'
	},{
		xtype:'tbseparator'
	},{
		xtype: 'slider',
		labelCls: 'x-hidden',
		hidden:false,
		ui:'footer',
		width:200,
		useTips:false,
		itemId: 'zoomSlider',
		id:'zoomSlider',
		minValue: 1,
		value:1,	
		maxValue: 16,
		increment: 1
	}]
});