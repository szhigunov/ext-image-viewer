Ext.define('custom.svgNavComp', {
	extend: 'Ext.container.Container',
	xtype: 'svgnavcontainer',
	id: 'nav',
	width: 59,
	height: 228,
	floating: true,
	border: false,
	shadow: false,
	items: {
		xtype: 'box',
		id: 'navigator',
		width: '100%',
		height: '100%'
	}
});
Ext.Loader.loadScript({
	url: 'packages/svgNavigatorComp/resources/svg.min.js',
	onLoad: function() {
		var loaded = [];
		Ext.Loader.loadScript({
			url: 'packages/svgNavigatorComp/resources/svg.parser.min.js',
			onLoad: function() {
				loaded.push('true');
			},
			onError: function() {
				loaded.push('false');
			}
		});
		Ext.Loader.loadScript({
			url: 'packages/svgNavigatorComp/resources/svg.import.js',
			onLoad: function() {
				loaded.push('true');
			},
			onError: function() {
				loaded.push('false');
			}
		});
		// console.log('loaded SVG.js');
		var runner = new Ext.util.TaskRunner(),
			task = runner.start({
				run: checkScripts,
				interval: 25
			});
		function checkScripts() {
			if (Ext.fly('imgEl') && loaded.indexOf(false) == -1) {
				var nav = Ext.getCmp('nav');
				Ext.defer(function(){
					nav.showAt(25, 25);
					createNavigator('navigator');
				},10);
				runner.destroy();
			}
		}
		function createNavigator(el) {
			// console.log('loading SVG');
			var raw = '<?xml version="1.0" encoding="utf-8"?> <!-- Generator: Adobe Illustrator 16.0.3, SVG Export Plug-In . SVG Version: 6.00 Build 0) --> <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"> <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="58.5px" height="227.5px" viewBox="0 0 58.5 227.5" enable-background="new 0 0 58.5 227.5" xml:space="preserve"> <g id="Navigator_1_"> <g id="Shadow"> <g opacity="0.3" filter="url(#AI_GaussianBlur_4)"> <g> <circle fill="#231F20" cx="27.5" cy="28.5" r="23.5"/> </g> <g> <path fill="#231F20" d="M19.5,73.5c0,1.65,0.944,3,2.5,3s2.5,1.35,2.5,3v122c0,1.65-0.944,3-2.5,3s-2.5,1.35-2.5,3v10 c0,1.65,1.191,3,2.842,3h10c1.65,0,3.158-1.35,3.158-3v-10c0-1.65-1.531-3-3-3s-3-1.35-3-3v-122c0-1.65,1.531-3,3-3s3-1.35,3-3 v-10c0-1.65-1.508-3-3.158-3h-10c-1.65,0-2.842,1.35-2.842,3V73.5z"/> </g> </g> </g> <g id="scale"> <rect x="23" y="66" fill="#FFFFFF" stroke="#B3B3B3" stroke-miterlimit="10" width="5" height="143"/> <g> <rect x="22.5" y="79.5" fill="#5A5A5A" width="5" height="2"/> <rect x="22.5" y="86.625" fill="#5A5A5A" width="5" height="2"/> <rect x="22.5" y="93.75" fill="#5A5A5A" width="5" height="2"/> <rect x="22.5" y="100.875" fill="#5A5A5A" width="5" height="2"/> <rect x="22.5" y="108" fill="#5A5A5A" width="5" height="2"/> <rect x="22.5" y="115.125" fill="#5A5A5A" width="5" height="2"/> <rect x="22.5" y="122.25" fill="#5A5A5A" width="5" height="2"/> <rect x="22.5" y="129.375" fill="#5A5A5A" width="5" height="2"/> <rect x="22.5" y="136.5" fill="#5A5A5A" width="5" height="2"/> <rect x="22.5" y="143.625" fill="#5A5A5A" width="5" height="2"/> <rect x="22.5" y="150.75" fill="#5A5A5A" width="5" height="2"/> <rect x="22.5" y="157.875" fill="#5A5A5A" width="5" height="2"/> <rect x="22.5" y="165" fill="#5A5A5A" width="5" height="2"/> <rect x="22.5" y="172.125" fill="#5A5A5A" width="5" height="2"/> <rect x="22.5" y="179.25" fill="#5A5A5A" width="5" height="2"/> <rect x="22.5" y="186.375" fill="#5A5A5A" width="5" height="2"/> <rect x="22.5" y="193.5" fill="#5A5A5A" width="5" height="2"/> </g> </g> <g> <circle fill="#B3B3B3" cx="25.5" cy="25.5" r="24.5"/> </g> <g> <circle fill="#FFFFFF" cx="25.5" cy="25.5" r="23.5"/> </g> <g id="Slider"> <g> <path fill="#B3B3B3" d="M30.5,187.25c1.65,0,3,1.35,3,3v6c0,1.65-1.508,3-3.158,3h-10c-1.65,0-2.842-1.35-2.842-3v-6 c0-1.65,1.191-3,2.842-3H30.5 M30.342,186.25h-10c-2.205,0-3.842,1.795-3.842,4v6c0,2.205,1.637,4,3.842,4h10 c2.205,0,4.158-1.795,4.158-4v-6c0-2.205-1.874-4-4.079-4H30.342z"/> <path fill="#FFFFFF" d="M33.5,196.25c0,1.656-1.344,3-3,3h-10c-1.656,0-3-1.344-3-3v-6c0-1.656,1.344-3,3-3h10 c1.656,0,3,1.344,3,3V196.25z"/> </g> <rect x="20.5" y="191.25" fill="#5A5A5A" width="10" height="2"/> </g> <g id="zoom_x5F_in_5_"> <g> <path fill="#B3B3B3" d="M30.5,57.5c1.65,0,3,1.35,3,3v10c0,1.65-1.508,3-3.158,3h-10c-1.65,0-2.842-1.35-2.842-3v-10 c0-1.65,1.191-3,2.842-3H30.5 M30.342,56.5h-10c-2.205,0-3.842,1.795-3.842,4v10c0,2.205,1.637,4,3.842,4h10 c2.205,0,4.158-1.795,4.158-4v-10c0-2.205-1.874-4-4.079-4H30.342z"/> <path fill="#FFFFFF" d="M33.5,70.5c0,1.656-1.344,3-3,3h-10c-1.656,0-3-1.344-3-3v-10c0-1.656,1.344-3,3-3h10 c1.656,0,3,1.344,3,3V70.5z"/> </g> <polygon fill="#5A5A5A" points="30.5,64.5 26.5,64.5 26.5,60.5 24.5,60.5 24.5,64.5 20.5,64.5 20.5,66.5 24.5,66.5 24.5,70.5 26.5,70.5 26.5,66.5 30.5,66.5 "/> </g> <g id="zoom_x5F_out_5_"> <g> <path fill="#B3B3B3" d="M30.5,204.5c1.65,0,3,1.35,3,3v10c0,1.65-1.508,3-3.158,3h-10c-1.65,0-2.842-1.35-2.842-3v-10 c0-1.65,1.191-3,2.842-3H30.5 M30.342,203.5h-10c-2.205,0-3.842,1.795-3.842,4v10c0,2.205,1.637,4,3.842,4h10 c2.205,0,4.158-1.795,4.158-4v-10c0-2.205-1.874-4-4.079-4H30.342z"/> <path fill="#FFFFFF" d="M33.5,217.5c0,1.656-1.344,3-3,3h-10c-1.656,0-3-1.344-3-3v-10c0-1.656,1.344-3,3-3h10 c1.656,0,3,1.344,3,3V217.5z"/> </g> <rect x="20.5" y="211.5" fill="#5A5A5A" width="10" height="2"/> </g> <g id="Down_x5F_Right"> <polygon fill="white" points="32.5,42.502 39.643,43.887 43.885,39.643 42.5,32.502 36.814,32.572 29.743,25.5 25.5,29.744 32.57,36.814 "/> <polygon fill="#5A5A5A" points="40.5,40.5 41.5,40.5 41.5,33.5 39.5,33.5 39.5,39.5 33.5,39.5 33.5,41.5 40.5,41.5 "/> </g> <g id="Down_x5F_Left"> <polygon fill="white" points="8.5,32.5 7.115,39.643 11.358,43.887 18.5,42.5 18.43,36.814 25.5,29.744 21.258,25.502 14.188,32.572 "/> <polygon fill="#5A5A5A" points="10.5,40.5 10.5,41.5 17.5,41.5 17.5,39.5 11.5,39.5 11.5,33.5 9.5,33.5 9.5,40.5 "/> </g> <g id="Up_x5F_Right"> <polygon fill="white" points="42.502,18.502 43.885,11.359 39.643,7.117 32.501,8.5 32.572,14.188 25.5,21.258 29.743,25.5 36.814,18.43 "/> <polygon fill="#5A5A5A" points="40.5,10.5 40.5,9.5 33.5,9.5 33.5,11.5 39.5,11.5 39.5,17.5 41.5,17.5 41.5,10.5 "/> </g> <g id="Up_x5F_Left"> <polygon fill="white" points="18.502,8.5 11.358,7.117 7.115,11.359 8.5,18.5 14.186,18.43 21.258,25.502 25.5,21.258 18.43,14.188 "/> <polygon fill="#5A5A5A" points="10.5,10.5 9.5,10.5 9.5,17.5 11.5,17.5 11.5,11.5 17.5,11.5 17.5,9.5 10.5,9.5 "/> </g> <g id="Down"> <polygon fill="white" points="18.428,42.471 22.5,48.5 28.5,48.5 32.57,42.471 28.5,38.5 28.5,28.5 22.5,28.5 22.5,38.5 "/> <polygon fill="#808080" points="25.658,44.75 26.432,45.5 34.158,38 32.613,36.5 25.658,43.251 18.703,36.5 17.158,38 24.885,45.5 "/> </g> <g id="Up"> <polygon fill="white" points="32.572,8.529 28.5,2.5 22.5,2.5 18.43,8.529 22.5,12.5 22.5,22.5 28.5,22.5 28.5,12.5 "/> <polygon fill="#808080" points="25.342,6.25 24.568,5.5 16.842,13 18.387,14.5 25.342,7.749 32.297,14.5 33.842,13 26.115,5.5 "/> </g> <g id="Left_5_"> <polygon fill="white" points="8.529,18.428 2.5,22.5 2.5,28.5 8.529,32.57 12.5,28.5 22.5,28.5 22.5,22.5 12.5,22.5 "/> <polygon fill="#808080" points="6.25,25.658 5.5,26.432 13,34.158 14.5,32.613 7.749,25.658 14.5,18.703 13,17.158 5.5,24.885 "/> </g> <g id="Right_5_"> <polygon fill="white" points="42.471,32.572 48.5,28.5 48.5,22.5 42.471,18.43 38.5,22.5 28.5,22.5 28.5,28.5 38.5,28.5 "/> <polygon fill="#808080" points="44.75,25.342 45.5,24.568 38,16.842 36.5,18.387 43.251,25.342 36.5,32.297 38,33.842 45.5,26.115 "/> </g> <g id="Center_5_"> <g> <path fill="#FFFFFF" d="M25.5,29c-1.93,0-3.5-1.57-3.5-3.5s1.57-3.5,3.5-3.5s3.5,1.57,3.5,3.5S27.43,29,25.5,29z"/> <path fill="#B3B3B3" d="M25.5,22.5c1.654,0,3,1.346,3,3s-1.346,3-3,3s-3-1.346-3-3S23.846,22.5,25.5,22.5 M25.5,21.5 c-2.209,0-4,1.791-4,4s1.791,4,4,4s4-1.791,4-4S27.709,21.5,25.5,21.5L25.5,21.5z"/> </g> <g> <circle fill="white" stroke="#FFFFFF" cx="25.5" cy="25.5" r="1"/> <circle fill="#B3B3B3" cx="25.5" cy="25.5" r="1"/> </g> </g> </g> </svg>';
			var draw = SVG(el);
			var svg = draw.svg(raw);
			var nav = {};
			var imgContBody = Ext.get('imageCont-body');
			nav.pad = {};
			nav.zoom = {};
			//pad
			nav.pad.up = SVG.get('Up');
			nav.pad.down = SVG.get('Down');
			nav.pad.left = SVG.get('Left_5_');
			nav.pad.right = SVG.get('Right_5_');
			nav.pad.center = SVG.get('Center_5_');
			nav.pad.upleft = SVG.get('Up_x5F_Left');
			nav.pad.upright = SVG.get('Up_x5F_Right');
			nav.pad.downright = SVG.get('Down_x5F_Right');
			nav.pad.downleft = SVG.get('Down_x5F_Left');
			//zoom 
			nav.zoom.plus = SVG.get('zoom_x5F_in_5_');
			nav.zoom.minus = SVG.get('zoom_x5F_out_5_');
			nav.zoom.slider = SVG.get('Slider');
			// Events 
			Ext.getDoc ().on({
					mousemove:slMouseMove,
					touchmove:slMouseMove,
					touchend:function(e){
						nav.xystart = null;
					},
					mouseup:function(e){
						nav.xystart = null;
					},
				});
			nav.pad.up.on('mouseover', function() {
				nav.pad.up.last().fill('red');
			});
			nav.pad.up.on('mouseout', function() {
				nav.pad.up.last().fill('#5a5a5a');
			});
			nav.pad.up.on('click', function() {
				imgContBody.scrollBy(0,-50,true)
			});
			nav.pad.up.on('touchstart', function() {
				imgContBody.scrollBy(0,-50,true)
			});
			nav.pad.down.on('mouseover', function() {
				nav.pad.down.last().fill('red');
			});
			nav.pad.down.on('mouseout', function() {
				nav.pad.down.last().fill('#5a5a5a');
			});
			nav.pad.down.on('click', function() {
				imgContBody.scrollBy(0,-50,true)
			});
			nav.pad.down.on('touchstart', function() {
				imgContBody.scrollBy(0,-50,true)
			});
			nav.pad.left.on('mouseover', function() {
				nav.pad.left.last().fill('red');
			});
			nav.pad.left.on('mouseout', function() {
				nav.pad.left.last().fill('#5a5a5a');
			});
			nav.pad.left.on('click', function() {
				imgContBody.scrollBy(-50,0,true);
			});
			nav.pad.left.on('touchstart', function() {
				imgContBody.scrollBy(-50,0,true);
			});
			nav.pad.right.on('mouseover', function() {
				nav.pad.right.last().fill('red');
			});
			nav.pad.right.on('mouseout', function() {
				nav.pad.right.last().fill('#5a5a5a');
			});
			nav.pad.right.on('click', function() {
				imgContBody.scrollBy(50,0,true)
			});
			nav.pad.right.on('touchstart', function() {
				imgContBody.scrollBy(50,0,true)
			});
			nav.pad.center.on('mouseover', function() {
				nav.pad.center.first().last().fill('red');
			});
			nav.pad.center.on('mouseout', function() {
				nav.pad.center.first().last().fill('#5a5a5a');
			});
			nav.pad.center.on('click', function() {
				var sl = Ext.getCmp('zoomSlider');
				sl.setValue(sl.minValue);
			});
			nav.pad.center.on('touchstart', function() {
				var sl = Ext.getCmp('zoomSlider');
				sl.setValue(sl.minValue);
			});
			nav.pad.upleft.on('mouseover', function() {
				nav.pad.upleft.last().fill('red');
			});
			nav.pad.upleft.on('mouseout', function() {
				nav.pad.upleft.last().fill('#5a5a5a');
			});
			nav.pad.upleft.on('click', function() {
				imgContBody.scrollBy(-50,-50)
			});
			nav.pad.upleft.on('touchstart', function() {
				imgContBody.scrollBy(-50,-50)
			});
			nav.pad.upright.on('mouseover', function() {
				nav.pad.upright.last().fill('red');
			});
			nav.pad.upright.on('mouseout', function() {
				nav.pad.upright.last().fill('#5a5a5a');
			});
			nav.pad.upright.on('click', function() {
				imgContBody.scrollBy(50,-50)
			});
			nav.pad.upright.on('touchstart', function() {
				imgContBody.scrollBy(50,-50)
			});
			nav.pad.downleft.on('mouseover', function() {
				nav.pad.downleft.last().fill('red');
			});
			nav.pad.downleft.on('mouseout', function() {
				nav.pad.downleft.last().fill('#5a5a5a');
			});
			nav.pad.downleft.on('click', function() {
				imgContBody.scrollBy(-50,50)
			});
			nav.pad.downleft.on('touchstart', function() {
				imgContBody.scrollBy(-50,50)
			});
			nav.pad.downright.on('mouseover', function() {
				nav.pad.downright.last().fill('red');
			});
			nav.pad.downright.on('mouseout', function() {
				nav.pad.downright.last().fill('#5a5a5a');
			});
			nav.pad.downright.on('click', function() {
				imgContBody.scrollBy(50,50)
			});
			nav.pad.downright.on('touchstart', function() {
				imgContBody.scrollBy(50,50)
			});
			nav.zoom.plus.on('mouseover', function() {
				nav.zoom.plus.last().fill('red');
			});
			nav.zoom.plus.on('mouseout', function() {
				nav.zoom.plus.last().fill('#5a5a5a');
			});
			nav.zoom.plus.on('click', function() {
				var sl = Ext.getCmp('zoomSlider');
				sl.setValue(sl.getValue()+1);
				
			});nav.zoom.plus.on('touchstart', function() {
				var sl = Ext.getCmp('zoomSlider');
				sl.setValue(sl.getValue()+1);
				
			});
			nav.zoom.minus.on('mouseover', function() {
				nav.zoom.minus.last().fill('red');
			});
			nav.zoom.minus.on('mouseout', function() {
				nav.zoom.minus.last().fill('#5a5a5a');
			});
			nav.zoom.minus.on('click', function() {
				var sl = Ext.getCmp('zoomSlider');
				sl.setValue(sl.getValue()-1);
			});
			nav.zoom.minus.on('touchstart', function() {
				var sl = Ext.getCmp('zoomSlider');
				sl.setValue(sl.getValue()-1);
			});
			nav.zoom.slider.on('mouseover', function() {
				nav.zoom.slider.last().fill('red');
			});
			nav.zoom.slider.on('mouseout', function() {
				nav.zoom.slider.last().fill('#5a5a5a');
			});
			Ext.get('Slider').on('mousedown', function(e) {
				nav.xystart = e.getXY();
				e.stopEvent(); // prevents native browser dragging	
			});
			Ext.get('Slider').on('touchstart', function(e) {
				nav.xystart = e.getXY();
				e.stopEvent(); // prevents native browser dragging	
			});
			function slMouseMove(moveEvent){
				
				if(nav.xystart){
					var moveEventXY = moveEvent.getXY();
					var sl = Ext.getCmp('zoomSlider');
					var svgSl = SVG.get('Slider');
					if (svgSl.attr('transform') === undefined){
						svgSl.attr('transform','translate(0 0)');
					}
					if(nav.xystart[1]-moveEventXY[1] >=7 && parseInt(svgSl.attr('transform').substr(12)) >= -105){
						svgSl.dmove(0,-7.125);
						sl.setValue(sl.getValue()+1);
						nav.xystart = moveEvent.getXY();
					}else if(nav.xystart[1]-moveEventXY[1] <=-7 && parseInt(svgSl.attr('transform').substr(12)) < -6){
						svgSl.dmove(0,7.125);
						sl.setValue(sl.getValue()-1);
						nav.xystart = moveEvent.getXY();
					}
				}
			}
		}
	}
});