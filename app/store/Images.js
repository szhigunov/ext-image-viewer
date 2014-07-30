Ext.define('UView.store.Images',{
	autoLoad:true,
	extend:'Ext.data.Store',
	storeId:'images',
	model:'UView.model.Image',
	proxy:{
		type:'ajax',
		url: './getFiles.php',
		reader:{
			type:'json',
			root:'images'
		}
	}
});