/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireDefault = __webpack_require__(1)['default'];

	var _carouselJs = __webpack_require__(2);

	var _carouselJs2 = _interopRequireDefault(_carouselJs);

	window.onload = function () {
	  var elCarousel = document.getElementsByClassName('carousel')[0];
	  var objCarousel = new _carouselJs2['default'](elCarousel);
	};

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	exports["default"] = function (obj) {
	  return obj && obj.__esModule ? obj : {
	    "default": obj
	  };
	};

	exports.__esModule = true;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/*
	* accepts single reference to wrapper? which contains first-level children of equal width(!sic);
	* width of carousel and therefore number of visible aforementioned children are calculated
	* depending on the container's width and width's of children themselves
	*
	* it does not have opinion on styling, css props used in script are only used for layout
	*
	* */

	var _createClass = __webpack_require__(3)['default'];

	var _classCallCheck = __webpack_require__(7)['default'];

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var Carousel = (function () {
	  function Carousel(root) {
	    _classCallCheck(this, Carousel);

	    var big;
	    this.elements = root.children;
	    this.root = root;
	    this.offset = 0;
	    this.root.style.paddingLeft = 0; // daddy knows best how to style his ul's, ok google?

	    try {
	      this.elemWidth = this.root.firstElementChild.offsetWidth; // hopefully all elements are alike (dimensionwise)
	    } catch (e) {
	      throw Error('doesnt work with empty list');
	    }

	    this.elemsVisible = this.root.offsetWidth / this.root.firstElementChild.offsetWidth | 0;
	    this.contentWidth = this.elemWidth * this.elemsVisible;
	    this.fullWidth = this.elements.length * this.elemWidth;
	    if (this.fullWidth > this.contentWidth) big = true;

	    this.root.style.width = this.fullWidth + 'px';
	    //wrapper on the outside, cause putting wrapper between ul and it's children feels nonsemantic
	    this.wrapper = document.createElement('carousel');
	    this.wrapper.style.height = root.firstElementChild.offsetHeight + 'px';
	    this.wrapper.style.cssText = 'overflow:hidden;' + 'display:block;' + 'margin:0 auto;' + 'position:relative;' + 'width: ' + this.elemsVisible * this.elemWidth + 'px;';
	    //ul which we begun with - now it is inner element and it is going to slide
	    this.root.parentNode.insertBefore(this.wrapper, this.root);
	    this.wrapper.appendChild(this.root); // wrapping root into, well, wrapper

	    //if content smaller than container do not even bother creating controls
	    if (big) {
	      // creating buttons from thin air, no html required
	      var leftButton = document.createElement('button');
	      leftButton.style.position = 'absolute';
	      var rightButton = leftButton.cloneNode(true);
	      leftButton.style.left = '0px';
	      rightButton.style.right = '0px';
	      leftButton.innerHTML = '⇦';
	      rightButton.innerHTML = '⇨';
	      this.wrapper.appendChild(leftButton);
	      this.wrapper.appendChild(rightButton);
	      leftButton.style.top = rightButton.style.top = root.firstElementChild.offsetHeight / 2 - leftButton.offsetHeight / 2 + 'px';
	      leftButton.className = rightButton.className = 'carousel__nav-button';

	      //animation hanging events
	      this.moving = 0;
	      this.speed = 10;
	      this.root.style.transition = 'margin-left ' + this.speed * 0.1 + 's';
	      leftButton.addEventListener('click', this.onLeftButton.bind(this));
	      rightButton.addEventListener('click', this.onRightButton.bind(this));

	      this.$controls = { $leftButton: leftButton, $rightButton: rightButton };

	      this.wrapper.addEventListener('mouseenter', this.onHover.bind(this));
	      this.wrapper.addEventListener('mouseleave', this.onHoverLeave.bind(this));
	    }
	  }

	  _createClass(Carousel, [{
	    key: 'onHover',
	    value: function onHover() {
	      console.log('hovering');
	      for (var el in this.$controls) {
	        this.$controls[el].style.display = 'block';
	      }
	    }
	  }, {
	    key: 'onHoverLeave',
	    value: function onHoverLeave() {
	      for (var el in this.$controls) {
	        this.$controls[el].style.display = 'none';
	      }
	    }
	  }, {
	    key: 'onRightButton',
	    value: function onRightButton() {
	      this._moveRight(this.elemsVisible * this.elemWidth);
	    }
	  }, {
	    key: 'onLeftButton',
	    value: function onLeftButton() {
	      this._moveLeft(this.elemsVisible * this.elemWidth);
	    }
	  }, {
	    key: 'onRightHover',
	    value: function onRightHover(e) {
	      var _this = this;

	      this.moving = setInterval(function () {
	        _this._moveRight(_this.speed);
	      }, 100);
	    }
	  }, {
	    key: 'remove',
	    value: function remove() {
	      this.wrapper.remove();
	    }
	  }, {
	    key: '_moveRight',
	    value: function _moveRight(pixels) {
	      if (this._willOverflowRight(pixels)) this._harbourRight();else {
	        this._animate(-pixels);
	      }
	    }
	  }, {
	    key: '_moveLeft',
	    value: function _moveLeft(pixels) {
	      if (this._willOverflowLeft(pixels)) this._harbourLeft();else {
	        this._animate(pixels);
	      }
	    }
	  }, {
	    key: '_willOverflowLeft',
	    value: function _willOverflowLeft(pixels) {
	      return this.offset + pixels > 0;
	    }
	  }, {
	    key: '_willOverflowRight',
	    value: function _willOverflowRight(pixels) {
	      return Math.abs(this.offset) > this.fullWidth - this.contentWidth - pixels;
	    }
	  }, {
	    key: '_harbourRight',
	    value: function _harbourRight() {
	      this._animate(-(this.fullWidth - Math.abs(this.offset) - this.contentWidth));
	    }
	  }, {
	    key: '_harbourLeft',
	    value: function _harbourLeft() {
	      this._animate(-this.offset);
	    }
	  }, {
	    key: '_animate',
	    value: function _animate(pixels) {
	      // moves container left or right on pixels(direction set by sign)
	      // for now it just changes margin-left, and relies on css transform property being set on root element
	      this.offset = this.offset + pixels;
	      this.root.style.marginLeft = this.offset + 'px';
	    }
	  }]);

	  return Carousel;
	})();

	exports['default'] = Carousel;
	module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Object$defineProperty = __webpack_require__(4)["default"];

	exports["default"] = (function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;

	      _Object$defineProperty(target, descriptor.key, descriptor);
	    }
	  }

	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	})();

	exports.__esModule = true;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

		module.exports = { "default": __webpack_require__(5), __esModule: true };

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $ = __webpack_require__(6);
	module.exports = function defineProperty(it, key, desc) {
	  return $.setDesc(it, key, desc);
	};

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";

	var $Object = Object;
	module.exports = {
	  create: $Object.create,
	  getProto: $Object.getPrototypeOf,
	  isEnum: ({}).propertyIsEnumerable,
	  getDesc: $Object.getOwnPropertyDescriptor,
	  setDesc: $Object.defineProperty,
	  setDescs: $Object.defineProperties,
	  getKeys: $Object.keys,
	  getNames: $Object.getOwnPropertyNames,
	  getSymbols: $Object.getOwnPropertySymbols,
	  each: [].forEach
	};

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";

	exports["default"] = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

	exports.__esModule = true;

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jYXJvdXNlbC9idWlsZC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBhNWIzYjcxNjFkNTY3ZTkzMjA0NCIsIndlYnBhY2s6Ly8vLi9jYXJvdXNlbC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLXJ1bnRpbWUvaGVscGVycy9pbnRlcm9wLXJlcXVpcmUtZGVmYXVsdC5qcyIsIndlYnBhY2s6Ly8vLi9jYXJvdXNlbC9jYXJvdXNlbC5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLXJ1bnRpbWUvaGVscGVycy9jcmVhdGUtY2xhc3MuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2RlZmluZS1wcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2RlZmluZS1wcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtcnVudGltZS9oZWxwZXJzL2NsYXNzLWNhbGwtY2hlY2suanMiXSwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCBhNWIzYjcxNjFkNTY3ZTkzMjA0NFxuICoqLyIsImltcG9ydCBDYXJvdXNlbCBmcm9tICcuL2Nhcm91c2VsLmpzJztcclxuXHJcbndpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbigpIHtcclxuICBsZXQgZWxDYXJvdXNlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2Nhcm91c2VsJylbMF07XHJcbiAgbGV0IG9iakNhcm91c2VsID0gbmV3IENhcm91c2VsKGVsQ2Fyb3VzZWwpO1xyXG59O1xyXG5cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9jYXJvdXNlbC9pbmRleC5qc1xuICoqLyIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IGZ1bmN0aW9uIChvYmopIHtcbiAgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHtcbiAgICBcImRlZmF1bHRcIjogb2JqXG4gIH07XG59O1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9iYWJlbC1ydW50aW1lL2hlbHBlcnMvaW50ZXJvcC1yZXF1aXJlLWRlZmF1bHQuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcbi8qXHJcbiogYWNjZXB0cyBzaW5nbGUgcmVmZXJlbmNlIHRvIHdyYXBwZXI/IHdoaWNoIGNvbnRhaW5zIGZpcnN0LWxldmVsIGNoaWxkcmVuIG9mIGVxdWFsIHdpZHRoKCFzaWMpO1xyXG4qIHdpZHRoIG9mIGNhcm91c2VsIGFuZCB0aGVyZWZvcmUgbnVtYmVyIG9mIHZpc2libGUgYWZvcmVtZW50aW9uZWQgY2hpbGRyZW4gYXJlIGNhbGN1bGF0ZWRcclxuKiBkZXBlbmRpbmcgb24gdGhlIGNvbnRhaW5lcidzIHdpZHRoIGFuZCB3aWR0aCdzIG9mIGNoaWxkcmVuIHRoZW1zZWx2ZXNcclxuKlxyXG4qIGl0IGRvZXMgbm90IGhhdmUgb3BpbmlvbiBvbiBzdHlsaW5nLCBjc3MgcHJvcHMgdXNlZCBpbiBzY3JpcHQgYXJlIG9ubHkgdXNlZCBmb3IgbGF5b3V0XHJcbipcclxuKiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYXJvdXNlbCB7XHJcbiAgY29uc3RydWN0b3Iocm9vdCkge1xyXG4gICAgdmFyIGJpZztcclxuICAgIHRoaXMuZWxlbWVudHMgPSByb290LmNoaWxkcmVuO1xyXG4gICAgdGhpcy5yb290ID0gcm9vdDtcclxuICAgIHRoaXMub2Zmc2V0ID0gMDtcclxuICAgIHRoaXMucm9vdC5zdHlsZS5wYWRkaW5nTGVmdCA9IDA7IC8vIGRhZGR5IGtub3dzIGJlc3QgaG93IHRvIHN0eWxlIGhpcyB1bCdzLCBvayBnb29nbGU/XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgdGhpcy5lbGVtV2lkdGggPSB0aGlzLnJvb3QuZmlyc3RFbGVtZW50Q2hpbGQub2Zmc2V0V2lkdGg7IC8vIGhvcGVmdWxseSBhbGwgZWxlbWVudHMgYXJlIGFsaWtlIChkaW1lbnNpb253aXNlKVxyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICB0aHJvdyBFcnJvcignZG9lc250IHdvcmsgd2l0aCBlbXB0eSBsaXN0Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5lbGVtc1Zpc2libGUgPSAodGhpcy5yb290Lm9mZnNldFdpZHRoIC8gdGhpcy5yb290LmZpcnN0RWxlbWVudENoaWxkLm9mZnNldFdpZHRoKSB8IDA7XHJcbiAgICB0aGlzLmNvbnRlbnRXaWR0aCA9ICB0aGlzLmVsZW1XaWR0aCAqIHRoaXMuZWxlbXNWaXNpYmxlO1xyXG4gICAgdGhpcy5mdWxsV2lkdGggPSB0aGlzLmVsZW1lbnRzLmxlbmd0aCAqIHRoaXMuZWxlbVdpZHRoO1xyXG4gICAgaWYgKHRoaXMuZnVsbFdpZHRoID4gdGhpcy5jb250ZW50V2lkdGgpIGJpZyA9IHRydWU7XHJcblxyXG4gICAgdGhpcy5yb290LnN0eWxlLndpZHRoID0gIHRoaXMuZnVsbFdpZHRoICsgJ3B4JztcclxuICAgIC8vd3JhcHBlciBvbiB0aGUgb3V0c2lkZSwgY2F1c2UgcHV0dGluZyB3cmFwcGVyIGJldHdlZW4gdWwgYW5kIGl0J3MgY2hpbGRyZW4gZmVlbHMgbm9uc2VtYW50aWNcclxuICAgIHRoaXMud3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Nhcm91c2VsJyk7XHJcbiAgICB0aGlzLndyYXBwZXIuc3R5bGUuaGVpZ2h0ID0gcm9vdC5maXJzdEVsZW1lbnRDaGlsZC5vZmZzZXRIZWlnaHQgKyAncHgnO1xyXG4gICAgdGhpcy53cmFwcGVyLnN0eWxlLmNzc1RleHQgPSAgJ292ZXJmbG93OmhpZGRlbjsnICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdkaXNwbGF5OmJsb2NrOycgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ21hcmdpbjowIGF1dG87JyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAncG9zaXRpb246cmVsYXRpdmU7JyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnd2lkdGg6ICcgKyAodGhpcy5lbGVtc1Zpc2libGUgKiB0aGlzLmVsZW1XaWR0aCkgKyAncHg7JztcclxuICAgIC8vdWwgd2hpY2ggd2UgYmVndW4gd2l0aCAtIG5vdyBpdCBpcyBpbm5lciBlbGVtZW50IGFuZCBpdCBpcyBnb2luZyB0byBzbGlkZVxyXG4gICAgdGhpcy5yb290LnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHRoaXMud3JhcHBlciwgdGhpcy5yb290KTtcclxuICAgIHRoaXMud3JhcHBlci5hcHBlbmRDaGlsZCh0aGlzLnJvb3QpOyAgLy8gd3JhcHBpbmcgcm9vdCBpbnRvLCB3ZWxsLCB3cmFwcGVyXHJcblxyXG4gICAgLy9pZiBjb250ZW50IHNtYWxsZXIgdGhhbiBjb250YWluZXIgZG8gbm90IGV2ZW4gYm90aGVyIGNyZWF0aW5nIGNvbnRyb2xzXHJcbiAgICBpZiAoYmlnKSB7XHJcbiAgICAgIC8vIGNyZWF0aW5nIGJ1dHRvbnMgZnJvbSB0aGluIGFpciwgbm8gaHRtbCByZXF1aXJlZFxyXG4gICAgICBsZXQgbGVmdEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgICBsZWZ0QnV0dG9uLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcclxuICAgICAgbGV0IHJpZ2h0QnV0dG9uID0gbGVmdEJ1dHRvbi5jbG9uZU5vZGUodHJ1ZSk7XHJcbiAgICAgIGxlZnRCdXR0b24uc3R5bGUubGVmdCA9ICcwcHgnO1xyXG4gICAgICByaWdodEJ1dHRvbi5zdHlsZS5yaWdodCA9ICcwcHgnO1xyXG4gICAgICBsZWZ0QnV0dG9uLmlubmVySFRNTCA9ICfih6YnO1xyXG4gICAgICByaWdodEJ1dHRvbi5pbm5lckhUTUwgPSAn4oeoJztcclxuICAgICAgdGhpcy53cmFwcGVyLmFwcGVuZENoaWxkKGxlZnRCdXR0b24pO1xyXG4gICAgICB0aGlzLndyYXBwZXIuYXBwZW5kQ2hpbGQocmlnaHRCdXR0b24pO1xyXG4gICAgICBsZWZ0QnV0dG9uLnN0eWxlLnRvcCA9IHJpZ2h0QnV0dG9uLnN0eWxlLnRvcCA9IChyb290LmZpcnN0RWxlbWVudENoaWxkLm9mZnNldEhlaWdodCAvIDIpIC0gKGxlZnRCdXR0b24ub2Zmc2V0SGVpZ2h0IC8gMikgKyAncHgnO1xyXG4gICAgICBsZWZ0QnV0dG9uLmNsYXNzTmFtZSA9IHJpZ2h0QnV0dG9uLmNsYXNzTmFtZSA9ICdjYXJvdXNlbF9fbmF2LWJ1dHRvbic7XHJcblxyXG4gICAgICAvL2FuaW1hdGlvbiBoYW5naW5nIGV2ZW50c1xyXG4gICAgICB0aGlzLm1vdmluZyA9IDA7XHJcbiAgICAgIHRoaXMuc3BlZWQgPSAxMDtcclxuICAgICAgdGhpcy5yb290LnN0eWxlLnRyYW5zaXRpb24gPSAnbWFyZ2luLWxlZnQgJyArIHRoaXMuc3BlZWQgKiAwLjEgKydzJztcclxuICAgICAgbGVmdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMub25MZWZ0QnV0dG9uLmJpbmQodGhpcykpO1xyXG4gICAgICByaWdodEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMub25SaWdodEJ1dHRvbi5iaW5kKHRoaXMpKTtcclxuXHJcbiAgICAgIHRoaXMuJGNvbnRyb2xzID0geyRsZWZ0QnV0dG9uOmxlZnRCdXR0b24sICRyaWdodEJ1dHRvbjogcmlnaHRCdXR0b259O1xyXG5cclxuICAgICAgdGhpcy53cmFwcGVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCB0aGlzLm9uSG92ZXIuYmluZCh0aGlzKSk7XHJcbiAgICAgIHRoaXMud3JhcHBlci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgdGhpcy5vbkhvdmVyTGVhdmUuYmluZCh0aGlzKSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvbkhvdmVyKCkgeyBjb25zb2xlLmxvZygnaG92ZXJpbmcnKTtcclxuICAgIGZvciAoIGxldCBlbCBpbiB0aGlzLiRjb250cm9scykge1xyXG4gICAgICB0aGlzLiRjb250cm9sc1tlbF0uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvbkhvdmVyTGVhdmUgKCkge1xyXG4gICAgZm9yICggbGV0IGVsIGluIHRoaXMuJGNvbnRyb2xzKSB7XHJcbiAgICAgIHRoaXMuJGNvbnRyb2xzW2VsXS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgb25SaWdodEJ1dHRvbigpIHtcclxuICAgICAgdGhpcy5fbW92ZVJpZ2h0KHRoaXMuZWxlbXNWaXNpYmxlICogdGhpcy5lbGVtV2lkdGgpO1xyXG4gIH1cclxuXHJcbiAgb25MZWZ0QnV0dG9uKCkge1xyXG4gICAgdGhpcy5fbW92ZUxlZnQodGhpcy5lbGVtc1Zpc2libGUgKiB0aGlzLmVsZW1XaWR0aCk7XHJcbiAgfVxyXG5cclxuICBvblJpZ2h0SG92ZXIoZSkge1xyXG4gICAgdGhpcy5tb3ZpbmcgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgIHRoaXMuX21vdmVSaWdodCh0aGlzLnNwZWVkKTtcclxuICAgIH0sIDEwMCk7XHJcbiAgfVxyXG5cclxuICByZW1vdmUgKCkge1xyXG4gICAgdGhpcy53cmFwcGVyLnJlbW92ZSgpO1xyXG4gIH1cclxuXHJcbiAgX21vdmVSaWdodChwaXhlbHMpe1xyXG4gICAgaWYoIHRoaXMuX3dpbGxPdmVyZmxvd1JpZ2h0KHBpeGVscykpXHJcbiAgICAgIHRoaXMuX2hhcmJvdXJSaWdodCgpO1xyXG4gICAgZWxzZSB7XHJcbiAgICAgIHRoaXMuX2FuaW1hdGUoLXBpeGVscyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBfbW92ZUxlZnQocGl4ZWxzKXtcclxuICAgIGlmICh0aGlzLl93aWxsT3ZlcmZsb3dMZWZ0KHBpeGVscykpXHJcbiAgICAgIHRoaXMuX2hhcmJvdXJMZWZ0KCk7XHJcbiAgICBlbHNlIHtcclxuICAgICAgdGhpcy5fYW5pbWF0ZShwaXhlbHMpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgX3dpbGxPdmVyZmxvd0xlZnQocGl4ZWxzKSB7XHJcbiAgICByZXR1cm4gdGhpcy5vZmZzZXQgKyBwaXhlbHMgPiAwO1xyXG4gIH1cclxuXHJcbiAgX3dpbGxPdmVyZmxvd1JpZ2h0KHBpeGVscyl7XHJcbiAgICByZXR1cm4gTWF0aC5hYnModGhpcy5vZmZzZXQpID4gdGhpcy5mdWxsV2lkdGggLSB0aGlzLmNvbnRlbnRXaWR0aCAtIHBpeGVscztcclxuICB9XHJcblxyXG4gIF9oYXJib3VyUmlnaHQoKXtcclxuICAgIHRoaXMuX2FuaW1hdGUoIC0oIHRoaXMuZnVsbFdpZHRoIC0gTWF0aC5hYnModGhpcy5vZmZzZXQpIC0gdGhpcy5jb250ZW50V2lkdGggKSk7XHJcbiAgfVxyXG5cclxuICBfaGFyYm91ckxlZnQoKXtcclxuICAgIHRoaXMuX2FuaW1hdGUoLXRoaXMub2Zmc2V0KTtcclxuICB9XHJcblxyXG4gIF9hbmltYXRlKHBpeGVscykge1xyXG4gICAgLy8gbW92ZXMgY29udGFpbmVyIGxlZnQgb3IgcmlnaHQgb24gcGl4ZWxzKGRpcmVjdGlvbiBzZXQgYnkgc2lnbilcclxuICAgIC8vIGZvciBub3cgaXQganVzdCBjaGFuZ2VzIG1hcmdpbi1sZWZ0LCBhbmQgcmVsaWVzIG9uIGNzcyB0cmFuc2Zvcm0gcHJvcGVydHkgYmVpbmcgc2V0IG9uIHJvb3QgZWxlbWVudFxyXG4gICAgICB0aGlzLm9mZnNldCA9IHRoaXMub2Zmc2V0ICsgcGl4ZWxzO1xyXG4gICAgICB0aGlzLnJvb3Quc3R5bGUubWFyZ2luTGVmdCA9IHRoaXMub2Zmc2V0ICsgJ3B4JztcclxuICB9XHJcbn1cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9jYXJvdXNlbC9jYXJvdXNlbC5qc1xuICoqLyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgX09iamVjdCRkZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2RlZmluZS1wcm9wZXJ0eVwiKVtcImRlZmF1bHRcIl07XG5cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gKGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTtcbiAgICAgIGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTtcbiAgICAgIGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTtcbiAgICAgIGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7XG5cbiAgICAgIF9PYmplY3QkZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHtcbiAgICBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpO1xuICAgIGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpO1xuICAgIHJldHVybiBDb25zdHJ1Y3RvcjtcbiAgfTtcbn0pKCk7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2JhYmVsLXJ1bnRpbWUvaGVscGVycy9jcmVhdGUtY2xhc3MuanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2RlZmluZS1wcm9wZXJ0eVwiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2RlZmluZS1wcm9wZXJ0eS5qc1xuICoqLyIsInZhciAkID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy8kJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KGl0LCBrZXksIGRlc2Mpe1xuICByZXR1cm4gJC5zZXREZXNjKGl0LCBrZXksIGRlc2MpO1xufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvZGVmaW5lLXByb3BlcnR5LmpzXG4gKiovIiwidmFyICRPYmplY3QgPSBPYmplY3Q7XG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgY3JlYXRlOiAgICAgJE9iamVjdC5jcmVhdGUsXG4gIGdldFByb3RvOiAgICRPYmplY3QuZ2V0UHJvdG90eXBlT2YsXG4gIGlzRW51bTogICAgIHt9LnByb3BlcnR5SXNFbnVtZXJhYmxlLFxuICBnZXREZXNjOiAgICAkT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcixcbiAgc2V0RGVzYzogICAgJE9iamVjdC5kZWZpbmVQcm9wZXJ0eSxcbiAgc2V0RGVzY3M6ICAgJE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzLFxuICBnZXRLZXlzOiAgICAkT2JqZWN0LmtleXMsXG4gIGdldE5hbWVzOiAgICRPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyxcbiAgZ2V0U3ltYm9sczogJE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMsXG4gIGVhY2g6ICAgICAgIFtdLmZvckVhY2hcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmpzXG4gKiovIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gZnVuY3Rpb24gKGluc3RhbmNlLCBDb25zdHJ1Y3Rvcikge1xuICBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7XG4gIH1cbn07XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2JhYmVsLXJ1bnRpbWUvaGVscGVycy9jbGFzcy1jYWxsLWNoZWNrLmpzXG4gKiovIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ3RDQTtBQUNBOzs7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ1JBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFTQTtBQUNBO0FBREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBTUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQTVEQTs7QUE2REE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTs7O0FBRUE7OztBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTs7O0FBRUE7OztBQUdBO0FBQ0E7QUFDQTs7O0FBaElBOzs7QUFBQTs7Ozs7OztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUN2QkE7Ozs7Ozs7O0FDQUE7QUFDQTtBQUNBOzs7Ozs7Ozs7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OzsiLCJzb3VyY2VSb290IjoiIn0=