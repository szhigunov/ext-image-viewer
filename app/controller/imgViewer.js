Ext.define('UView.controller.imgViewer', {
	extend: 'Ext.app.Controller',
	statics: {
		placeholderUrl: './resources/placeholder.jpg'
	},
	refs: [{
		ref: 'imgView',
		selector: 'imgview'
	}, {
		ref: 'imgCont',
		selector: 'panel#imageCont'
	}, {
		ref: 'imgEl',
		selector: 'image#imgEl'
	}, {
		ref: 'slider',
		selector: 'slider#zoomSlider'
	}, {
		ref: 'refreshBtn',
		selector: 'tool#refreshBtn'
	}, {
		ref: 'btnLoader',
		selector: 'button#btnLoader'
	}],
	init: function() {
		// Init the singleton.  Any tag-based quick tips will start working.
		Ext.tip.QuickTipManager.init();
		this.control({
			//Insert our view Panel
			'imgview': {
				afterrender: this.afterImgViewRdy
			},
			'slider#zoomSlider': {
				beforechange: function(slider) {
					if (this.getImgEl()) {
						slider.OldElSize = this.getImgEl().getSize();
						slider.OldScr = this.getImgCont().body.getScroll();
					}
				},
				change: function(sl, val) {
					this.zoomChange(val);
				}
			},
			'button#btnLoader': {
				click:this.showLoadImagePanel
			},
			'panel#imageCont': {
				afterrender: this.imgContRdy
			}
		});
	},
	
	imgContRdy: function(comp) {
		console.log(arguments.callee.$name);
		// comp.on('resize', this.imgContResize, this, {
		// 	buffer: 250
		// });
		if (this.self.placeholderUrl) {
			this.setImage(this.self.placeholderUrl);
		}
	},
	afterImgViewRdy: function() {
		console.log(arguments.callee.$name);

	},
	setImage: function(imagePath) {
		console.log(arguments.callee.$name);
		var imgCont = this.getImgCont();
		meEl = this.getImgEl();
		imgCont.body.mask('loading image');
		if (meEl) {
			console.log(meEl);
			// If We Only Replace Image URL
			meEl.hide();
			meEl.getEl().setSize('', ''); // Restore Original Sizing
			Ext.defer(function() {
				meEl.setSrc(imagePath); // Load from New URL 
				this.setZoomMax();
			}, 5, this);
		} else {
			meEl = this.createImageElement(imagePath);
			imgCont.add(meEl);
			this.setZoomMax();
			meEl.getEl().on({
				scope: this,
				load: this.imageElLoad,
			});
			imgCont.getEl().on({
				scope: this,
				mousewheel: this.onScroll
			});
		}
	},
	// Creates hidden Element Ext.Img #imgEl
	// Call only one time
	createImageElement: function(url) {
		var meEl = new Ext.Img({
			itemId: 'imgEl',
			id: 'imgEl',
			src: url,
			hidden: false
		});
		return meEl;
	},
	// Run every time when new image loading into ImgEl
	imageElLoad: function(evt, t) {
		console.log(arguments.callee.$name);
		var imgEl = Ext.get(t),
			imgCont = this.getImgCont(),
			imgView = this.getImgView();
		imgView.imageWidth = imgEl.getWidth();
		imgView.imageHeight = imgEl.getHeight();
		this.initDragImage(imgEl);
		imgEl.unselectable();
		imgCont.doLayout();
		imgEl.show();
		imgCont.body.unmask();
	},
	imgContResize: function(comp, width, height, oldWidth, oldHeight, eOpts) {
		console.log(arguments.callee.$name);
		if (this.getImgEl()) this.doImgElResize(width, height);
	},
	doImgElResize: function(width, height) {
		var el = this.getImgEl().getEl();
		if (width >= height) {
			el.setSize({
				width: '',
				height: height
			});
		} else {
			el.setSize({
				width: width,
				height: ''
			});
		}
		this.getImgEl().updateLayout();
	},
	/*
	 *
	 * Zoom functions
	 *
	 */
	onScroll: function(e) {
		var wheelVal = e.getWheelDelta();
		var sl = this.getSlider();
		var newZoomVal = wheelVal + sl.getValue();
		sl.scroll = true;
		sl.xy = e.getXY();
		if (sl.maxValue >= newZoomVal && newZoomVal >= sl.minValue) {
			sl.setValue(newZoomVal);
			this.scrollWithMouse(e);
		} else {
			console.log(sl.getValue() + ' is edge value');
		}
		e.stopEvent();
	},
	scrollWithMouse: function(e) {
		var el = this.getImgEl().getEl(),
			imgContXY = {
				x: this.getImgCont().getEl().getLeft(),
				y: this.getImgCont().getEl().getTop()
			};
		innerX = e.browserEvent.pageX - imgContXY.x - el.getLeft();
		innerY = e.browserEvent.pageY - imgContXY.y - el.getTop();
	},
	zoomChange: function(val) {
		var el = Ext.get('imgEl'),
			sl = this.getSlider(),
			imgCont = this.getImgCont(),
			svgSl = SVG.get('Slider'),
			imgContSize = this.getImgCont().getSize(),
			elSize = el.getSize(),
			imgView = this.getImgView();
		el.xy = el.getXY();
		if (val == sl.maxValue) {
			this.doImgElResize('', '');
			// When loaded SVG Navigator
			if (svgSl) {
				svgSl.move(0, -(val * 7.125));
			}
		}
		if (val == sl.minValue) {
			this.doImgElResize(imgCont.getWidth(), imgCont.getHeight());
			// When loaded SVG Navigator
			if (svgSl) {
				svgSl.move(0, 0);
			}
		} else {
			var stepWidth = (imgView.imageWidth - imgContSize.width) / (sl.maxValue - 1);
			var stepHeight = (imgView.imageHeight - imgContSize.height) / (sl.maxValue - 1);
			if (imgView.imageWidth > imgView.imageHeight) {
				var newH = stepHeight * (val - 1) + imgContSize.height;
				var newW = newH * (imgView.imageWidth / imgView.imageHeight);
				this.doImgElResize(newW, newH);
				// When loaded SVG Navigator
				if (svgSl) {
					svgSl.move(0, -(val - 1) * 7.125);
				}
			}
		}
		if (val == sl.minValue) {
			this.getRefreshBtn().disable();
		} else {
			this.getRefreshBtn().enable();
		}
		// this.getTbZoomText().setText((val-1) * 6.25 + '%');
		// this.doDotCorrection();
		//Zoom by Center
		if (sl.scroll) {
			// elSize==sl.OldElSize
			var xyInner = {
				x: sl.xy[0] - el.xy[0],
				y: sl.xy[1] - el.xy[1]
			},
				scale = {
					x: xyInner.x / sl.OldElSize.width,
					y: xyInner.y / sl.OldElSize.height
				};
			sl.scroll = null;
			var newLeft = ((el.getWidth() * scale.x.toFixed(2)) - xyInner.x + sl.OldScr.left);
			var newTop = ((el.getHeight() * scale.y.toFixed(2)) - xyInner.y + sl.OldScr.top);
			//зум по центру
			imgCont.body.setScrollLeft(newLeft).setScrollTop(newTop);
		} else if (sl.OldScr) {
			var scaleW = (sl.OldScr.left + imgContSize.width / 2) / sl.OldElSize.width;
			var scaleH = (sl.OldScr.top + imgContSize.height / 2) / sl.OldElSize.height;
			var newScrVal = {
				left: (el.getSize().width * scaleW) - imgContSize.width / 2,
				top: (el.getSize().height * scaleH) - imgContSize.height / 2
			};
			imgCont.body.setScrollLeft(newScrVal.left).setScrollTop(newScrVal.top);
		}
	},
	setZoomMin: function() {
		var slider = this.getSlider();
		slider.setValue(slider.minValue);
		return slider;
	},
	setZoomMax: function() {
		var slider = this.getSlider();
		slider.setValue(slider.maxValue);
		return slider;
	},
	/*
	 *
	 * Drag Drop functions
	 *
	 */
	initDragImage: function(elem) {
		var cont = Ext.get('imageCont');
		elem.on({
			scope: this,
			touchstart: this.startDrag,
			mousedown: this.startDrag
		});
		Ext.getDoc().on({
			scope: this,
			mouseup: this.endDrag,
			touchmove: this.mouseMove,
			mousemove: this.mouseMove,
			touchend: this.endDrag
		});

	},
	startDrag: function(event, el) {
		console.log(arguments.callee.$name);
		var imgView = this.getImgView();
		if (event.browserEvent.changedTouches) {
			var xy = [event.browserEvent.changedTouches[0].clientX, event.browserEvent.changedTouches[0].clientY];
		} else {
			var xy = event.getXY();
		}
		imgView.mouseDownXY = xy;
		imgView.mouseDownScrollLeft = this.getImgCont().body.getScrollLeft();
		imgView.mouseDownScrollTop = this.getImgCont().body.getScrollTop();
		imgView.mouseDown = true;
		event.stopEvent(); // prevents native browser dragging
	},
	endDrag: function(event, el) {
		var imgView = this.getImgView();
		if (imgView.mouseDown) {
			console.log(arguments.callee.$name);
			imgView.mouseDown = false;
			imgView.res = null;
			Ext.get('imgEl').setOpacity(1);
			event.stopEvent();
		}
	},
	mouseMove: function(event, el) {
		var imgView = this.getImgView();
		if (imgView.mouseDown) {
			console.log(arguments.callee.$name);
			Ext.get('imgEl').setOpacity(.5);
			var thisElMD = this.getImgView().mouseDownXY;
			var imgContBodyDom = Ext.getDom('imageCont-body');
			if (event.browserEvent.changedTouches) {
				if (e.browserEvent.targetTouches.length == 2) {
					console.log(imgView.res);
					if (!imgView.res) {
						imgView.res = null;
					}
					imgViewres = imgView.res;
					var xyArr = [];
					var touches = e.browserEvent.targetTouches;
					for (var i = touches.length; i > 0; i--) {
						var touch = touches[i - 1];
						var xy = {
							x: touch.pageX,
							y: touch.pageY
						};
						xyArr.push(xy);
					}
					var res = Math.sqrt(Math.abs(xyArr[0].x - xyArr[1].x)) + Math.sqrt(Math.abs(xyArr[0].y - xyArr[1].y));
					if (imgViewres == false) {
						console.log('')
						imgViewres = imgView.res = res;
					} else if (Math.abs(imgViewres - res) > 2) {
						console.log(Math.abs(imgViewres - res));
						console.log(imgViewres, res);
						if (imgViewres > res) {
							me.getSlider().setValue(me.getSlider().getValue() - 1);
							imgView.res = res;
						} else {
							me.getSlider().setValue(me.getSlider().getValue() + 1);
							imgView.res = res;
						}
					}
				} else if (e.browserEvent.targetTouches.length == 1) {
					console.log(arguments.callee.$name);
					var thisElMD = this.getImgView().mouseDownXY;
					var imgContBodyDom = Ext.get('imageCont-body').dom;
					if (e.browserEvent.changedTouches) {
						var xy = [e.browserEvent.changedTouches[0].clientX, e.browserEvent.changedTouches[0].clientY];
					} else {
						var xy = e.getXY();
					}
					var scrL = (xy[0] - thisElMD[0]) > 0 ? -(xy[0] - thisElMD[0]) : +imgView.mouseDownXY[0] - xy[0];
					var scrT = (xy[1] - thisElMD[1]) > 0 ? -(xy[1] - thisElMD[1]) : +imgView.mouseDownXY[1] - xy[1];
					imgContBodyDom.scrollLeft = imgView.mouseDownScrollLeft + scrL;
					imgContBodyDom.scrollTop = imgView.mouseDownScrollTop + scrT;
				}
			} else {
				var xy = event.getXY();
				//
				var scrL = (xy[0] - thisElMD[0]) > 0 ? -(xy[0] - thisElMD[0]) : +imgView.mouseDownXY[0] - xy[0];
				var scrT = (xy[1] - thisElMD[1]) > 0 ? -(xy[1] - thisElMD[1]) : +imgView.mouseDownXY[1] - xy[1];
				imgContBodyDom.scrollLeft = imgView.mouseDownScrollLeft + scrL * 2;
				imgContBodyDom.scrollTop = imgView.mouseDownScrollTop + scrT * 2;
				event.stopEvent(); // prevents native browser dragging
			}
		} else {
			event.stopEvent();
		}
	}
});