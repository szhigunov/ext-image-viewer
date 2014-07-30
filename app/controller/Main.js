Ext.define('UView.controller.Main', {
    extend: 'UView.controller.MainSuper',
    statics: {
        mouseDown: false
    },
    mixins: {
        DragDrop: 'UView.controller.DragDrop',
    },
    init: function() {
        //This code runs before any function
        this.control({
            'viewport > panel': {
                render: this.onPanelRendered
            },
            'slider#zoomSlider': {
                change: function(sl, val) {
                    this.zoomChange(val)
                },
                beforechange: function(slider) {
                    slider.OldElSize = this.getImage().getSize();
                    slider.OldScr = this.getImgCont().body.getScroll();
                }
            },
            'panel#imageCont': {
                boxready: function(comp, width, height) {
                    this.addMask(comp);
                },
                resize: {
                    fn: this.imgContResize,
                    buffer: 500
                }
            },
            'button#resetZoomBtn': {
                click: function() {
                    this.getSlider().setValue(1)
                }
            },
            'image#imgEl': {
                render: this.onImageRender,
                afterrender: this.afterImageRender,
                boxready: this.onImageBoxReady
            },
            'button#btnLoader': {
                click: this.showLoadImagePanel
            },
        });
    },
    onImageRender: function(image) {
        console.log(arguments.callee.$name);
        image.getEl().dom.onprogress = function(e) {
            console.log(e);
        };
    },
    afterImageRender: function(image) {
        console.log(arguments.callee.$name);
        image.getEl().on('load', this.afterImageElLoaded, this);
    },
    afterImageElLoaded: function(evt, t) {
        console.log(arguments.callee.$name);
        this.removeMask(this.getImgCont());
    },
    addMask: function(comp) {
        comp.getEl().mask('Loading: Please Wait ...');
        comp.down('image').getEl().on('load', this.afterImageElLoaded, this, {
            single: true
        });
    },
    removeMask: function(comp) {
        console.log(arguments.callee.$name);
        comp.getEl().unmask();
    },
    onImageBoxReady: function(image, width, height, eOpts) {
        console.log(arguments.callee.$name);
        this.initDD(image);
    },
    onImageResize: function(image, width, height, oldWidth, oldHeight, eOpts) {
        console.log(arguments.callee.$name);
    },
    onPanelRendered: function() {
        console.log('The panel was rendered');

    },
    imgContResize: function(comp, width, height, oldWidth, oldHeight, eOpts) {
        console.log(arguments.callee.$name);
        this.doImgElResize(width, height);
        if (this.getImage().hidden) {
            this.getImage().show();
            if (this.getSlider().getValue() != this.getSlider().minValue) {
                this.getSlider().reset();
            }
        }
    },
    setImage: function(url) {
        var elCmp = this.getImage();
        this.addMask(elCmp.up('panel'));
        elCmp.setSrc(url);
        this.getSlider().reset();
        elCmp.getEl().on('load', function(e, t) {
            elCmp.show();
        }, this, {
            single: true
        });
    },
    doImgElResize: function(width, height) {
        console.log(arguments.callee.$name);
        if (this.getImage()) {
            var elCmp = this.getImage();
            var el = elCmp.getEl();
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
            elCmp.updateLayout();
        }
    },
    scrollWithMouse: function(e) {
        var el = this.getImage().getEl(),
            imgContXY = {
                x: this.getImgCont().getEl().getLeft(),
                y: this.getImgCont().getEl().getTop()
            };
        innerX = e.browserEvent.pageX - imgContXY.x - el.getLeft();
        innerY = e.browserEvent.pageY - imgContXY.y - el.getTop();
    },
    zoomChange: function(val) {
        var el = this.getImage().getEl(),
            sl = this.getSlider(),
            imgCont = this.getImgCont(),
            svgSl = SVG.get('Slider'),
            imgContSize = this.getImgCont().getSize(),
            elSize = el.getSize();
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
            var stepWidth = (el.dom.naturalWidth - imgContSize.width) / (sl.maxValue - 1);
            var stepHeight = (el.dom.naturalHeight - imgContSize.height) / (sl.maxValue - 1);
            if (el.dom.naturalWidth > el.dom.naturalHeight) {
                var newH = stepHeight * (val - 1) + imgContSize.height;
                var newW = newH * (el.dom.naturalWidth / el.dom.naturalHeight);
                this.doImgElResize(newW, newH);
                // When loaded SVG Navigator
                if (svgSl) {
                    svgSl.move(0, -(val - 1) * 7.125);
                }
            }
        }
        if (val == sl.minValue) {
            this.getResetButton().disable();
        } else {
            this.getResetButton().enable();
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
    initDD: function(image) {
        var imgEl = image.getEl();
        if (Ext.is.Desktop) {
            imgEl.on({
                scope: this,
                mousewheel: this.mixins.DragDrop.onScroll,
                mousedown: this.mixins.DragDrop.startDrag
            });
            Ext.getDoc().on({
                scope: this,
                mouseup: this.mixins.DragDrop.endDrag,
                mousemove: this.mixins.DragDrop.mouseMove
            });

        } else if (Ext.is.Phone || Ext.is.iOS || Ext.is.Tablet || Ext.is.Android) {
            imgEl.on({
                scope: this,
                touchstart: this.mixins.DragDrop.startDrag
            });
            Ext.getDoc().on({
                scope: this,
                touchmove: this.mixins.DragDrop.touchMove,
                touchend: this.mixins.DragDrop.endDrag
            });
        }
    },
    showLoadImagePanel: function(btn) {
        var me = this;
        btn.disable();
        this.getImgCont().mask();
        Ext.create('Ext.form.Panel', {
            requires: [''],
            title: 'Upload a Photo',
            width: 600,
            height:200,
            // draggable: true,
            bodyPadding: 5,
            floating: true,
            autoShow: true,
            closable: true,
            frame: true,
            tools: [{
                itemId: 'back',
                type: 'refresh',
                callback: function(panel, tool) {
                    Ext.getCmp('btnLoaded').show();
                    Ext.getCmp('btnNew').show();
                    panel.down('container#filelist').hide();
                    panel.down('fieldcontainer#upload').hide();
                    this.hide();
                }
            }],
            renderTo: Ext.getBody(),
            listeners: {
                close: function() {
                    me.getImgCont().unmask();
                    btn.enable();
                }
            },
            layout: {
                type: 'hbox',
                align: 'center',
                padding: 5,
            },
            items: [{
                xtype: 'button',
                scale: 'large',
                id: 'btnLoaded',
                handler: function(btn) {
                    Ext.getCmp('btnLoaded').hide();
                    Ext.getCmp('btnNew').hide();
                    btn.up('form').down('container#filelist').show();
                    btn.up('form').down('tool#back').show();
                },
                text: 'Choose one from loaded'
            }, {
                xtype: 'button',
                scale: 'large',
                id: 'btnNew',
                text: 'Upload new',
                handler: function(btn) {
                    Ext.getCmp('btnLoaded').hide();
                    Ext.getCmp('btnNew').hide();
                    btn.up('form').down('container#upload').show();
                    btn.up('form').down('tool#back').show();
                }
            }, {
                xtype: 'container',
                itemId: 'filelist',
                defaults: {
                    padding: '0 5 0 5'
                },
                layout: 'fit',
                hidden: true,
                items: [{
                    xtype: 'dataview',
                    itemId:'imageDataView',
                    store: 'Images',
                    width: 600,
                    overflowX: 'scroll',
                    overflowY: 'hidden',
                    listeners:{
                        itemdblclick:function(item,record) {
                            var url = record.get('raw');
                            me.setImage('resources/' + url);
                        }
                    },
                    height: 180,
                    layout: 'absolute',
                    tpl: new Ext.XTemplate('<div class="wrapper">',
                     '<tpl for=".">',
                     '<div style="margin-bottom: 5px;" class="thumb-wrap">',
                     '<img width="150" height="100" src="resources/{thumb}" />',
                     '<br/>', '</div>', '</tpl>', '</div>'),
                    itemSelector: 'div.thumb-wrap',
                    emptyText: 'No images available'
                }]
            }, {
                xtype: 'fieldcontainer',
                itemId: 'upload',
                defaults: {
                    padding: '0 5 0 5'
                },
                layout: 'hbox',
                hidden: true,
                items: [{
                    xtype: 'filefield',
                    name: 'photo',
                    fieldLabel: 'Photo',
                    labelWidth: 50,
                    msgTarget: 'side',
                    buttonOnly: true,
                    allowBlank: true,
                    anchor: '100%',
                    buttonText: 'Select Photo...',
                    listeners: {
                        change: function(filefield, val, opt) {
                            var file = filefield.fileInputEl.dom.files[0];
                            if (typeof FileReader !== 'undefined' && (/image/i).test(file.type)) {
                                var reader = new FileReader();
                                reader.onload = function(e) {
                                    Ext.defer(function() {
                                        me.setImage(e.target.result);
                                    }, 1, this);
                                }
                                reader.readAsDataURL(file);
                            } else if (!(/image/i).test(file.type)) {
                                Ext.Msg.alert('Warning');
                                filefield.reset();
                            }
                        }
                    }
                }, {
                    xtype: 'textfield',
                    name: 'url',
                    fieldLabel: 'url',
                    labelWidth: 15,
                    allowBlank: true,
                    anchor: '100%',
                }, {
                    xtype: 'button',
                    style: 'float:left',
                    itemId: 'uploadUrl',
                    text: 'upload',
                    handler: function() {
                        var url = this.up('fieldcontainer#upload').down('textfield[name=url]').getValue();
                        me.setImage(url);
                        me.getSlider().setValue(me.getSlider().maxValue);
                    }
                }]
            }]
        });
    }
});