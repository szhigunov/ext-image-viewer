Ext.define('UView.controller.DragDrop', {
	extend: 'UView.controller.MainSuper',
	onScroll: function(e) {
		var wheelVal = e.getWheelDelta();
		var sl = this.getSlider();
		var newZoomVal = wheelVal + sl.getValue();
		sl.scroll = true;
		sl.xy = e.getXY();
		if(sl.maxValue >= newZoomVal && newZoomVal >= sl.minValue ){
			sl.setValue(newZoomVal);
			this.scrollWithMouse(e);
		}else{
			console.log(sl.getValue()+' is edge value');
		}
		e.stopEvent();
	},
	startDrag: function(event, el) {
		if (!this.self.mouseDown) {
			console.log(arguments.callee.$name);
			
			if(event.browserEvent.changedTouches){
		    	var xy = [ event.browserEvent.changedTouches[0].clientX, event.browserEvent.changedTouches[0].clientY];
		    }else{
				var xy = event.getXY();
		    }
		    this.self.addStatics({
				mouseDown:true,
				mouseDownXY:xy,
				mouseDownScroll:{
					left:this.getImgCont().body.getScrollLeft(), 	
					top:this.getImgCont().body.getScrollTop()
				}
			});
			event.stopEvent(); // prevents native browser dragging
		}
	},
	mouseMove: function(event, el) {
		if (this.self.mouseDown) {
			var startXY = this.self.mouseDownXY,
				xy,
				scr = {},
				imgContBody = this.getImgCont().body;

		    if(event.browserEvent.changedTouches){
		    	xy = [ event.browserEvent.changedTouches[0].clientX, event.browserEvent.changedTouches[0].clientY ];
		    }else{
				xy = event.getXY();
		    }
		    var dist = [xy[0] - startXY[0],xy[1] - startXY[1]];
			scr.left = (dist[0]) > 0 ? -(dist[0]) : + startXY[0] - xy[0];
			scr.top = (dist[1]) > 0 ? -(dist[1]) : + startXY[1] - xy[1];
			imgContBody.setScrollLeft(this.self.mouseDownScroll.left + scr.left * 2);
			imgContBody.setScrollTop(this.self.mouseDownScroll.top + scr.top * 2);
			event.stopEvent(); // prevents native browser dragging
		}
		else {
			event.stopEvent();
		}
	},
	endDrag: function(event, el) {
		if (this.self.mouseDown) {
			console.log(arguments.callee.$name);
			this.self.addStatics({ mouseDown:false, res:null});
		}

	},
	onScroll: function(e) {
		var wheelVal = e.getWheelDelta();
		var sl = this.getSlider();
		var newZoomVal = wheelVal + sl.getValue();
		sl.scroll = true;
		sl.xy = e.getXY();
		if(sl.maxValue >= newZoomVal && newZoomVal >= sl.minValue ){
			sl.setValue(newZoomVal);
			this.scrollWithMouse(e);
		}else{
			console.log(sl.getValue()+' is edge value');
		}
		e.stopEvent();
	},	//Touch Events
	pinch:function(e) {
		var me = this;
		if(!this.self.res){
			this.self.res = null;
		}
		imgIres = this.self.res;
		var xyArr = [];
		var touches = e.browserEvent.targetTouches;
		for(var i = touches.length;i>0;i--){
			var touch = touches[i-1];
			var xy = {
				x: touch.pageX,
				y: touch.pageY
			};
			xyArr.push(xy);
		}
		var res = Math.sqrt(Math.abs(xyArr[0].x-xyArr[1].x)) + Math.sqrt(Math.abs(xyArr[0].y-xyArr[1].y));
		console.log(Math.abs(imgIres-res));
		if(imgIres == false){
			imgIres = this.self.res = res;
		}else if(Math.abs(imgIres-res)>2){
			if(imgIres > res){
				me.getSlider().setValue(me.getSlider().getValue()-1);
				this.self.res = res;
			}else {
				me.getSlider().setValue(me.getSlider().getValue()+1);
				this.self.res = res;
			}
		}
	},
	touchMove:function(e){
		//console.log(e);
		var me = this;
		if (this.self.mouseDown) {
			if(e.browserEvent.targetTouches.length == 2){
				me.pinch(e);
			}else if(e.browserEvent.targetTouches.length == 1){
				console.log(arguments.callee.$name);
				this.mouseMove(e);
			}
			e.stopEvent(); // pres native browser dragging
		}
		else {
			e.stopEvent();
		}
	},
});