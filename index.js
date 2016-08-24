'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require("./index.less");
var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _maskM = require('m-mask');

var _maskM2 = _interopRequireDefault(_maskM);

/*
var _inputM = require('@ali/input-m');
var _inputM2 = _interopRequireDefault(_inputM);
*/

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _util = require('m-base/js/util');

var _util2 = _interopRequireDefault(_util);

var _getTransitionEnd = require('m-base/js/getTransitionEnd');

var _getTransitionEnd2 = _interopRequireDefault(_getTransitionEnd);

var _getAnimationEnd = require('m-base/js/getAnimationEnd');

var _getAnimationEnd2 = _interopRequireDefault(_getAnimationEnd);

var _touchEvents = require('m-base/js/touchEvents');

var _touchEvents2 = _interopRequireDefault(_touchEvents);

var _getTranslate = require('m-base/js/getTranslate');

var _getTranslate2 = _interopRequireDefault(_getTranslate);

var _animationFrame = require('m-base/js/animationFrame');

var _transition = require('m-base/js/transition');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * picker
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

//import injectTapEventPlugin from 'react-tap-event-plugin';

//injectTapEventPlugin();

var COL_ALIGN = { 'left': true, 'center': true, 'right': true };
var noop = function noop(x) {
    return x;
};
var preventDefault = function preventDefault(e) {
    e && e.preventDefault();
};

var Picker = function (_Component) {
    _inherits(Picker, _Component);

    function Picker(props) {
        _classCallCheck(this, Picker);

        // 用于picker container

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Picker).call(this, props));

        _this.pickerId = _util2.default.createComponentId();

        //Picker面板本身滑入滑出的动画是否正在执行
        _this.isAnimating = false;

        _this.initialized = false;

        // 缓存cols
        _this.cols = props.cols.map(function (col, index) {
            return {
                id: _util2.default.createComponentId(),
                values: col.values,
                displayValues: col.displayValues,
                onChange: col.onChange,
                width: col.width,
                index: index,
                divider: col.divider,
                content: col.content
            };
        });

        _this.value = props.defaultValue || [];
        _this.displayValue = _this.value;

        _this.state = {
            opened: false, //Picker面板是否处于打开状态
            inputValue: _this.getInputValue()
        };

        // bind function
        ['handleInputClick', 'handleMaskClick', 'handleClear', 'handleSubmit', 'handleContainerAnimationEnd'].forEach(function (fn) {
            _this[fn] = _this[fn].bind(_this);
        });
        return _this;
    }

    _createClass(Picker, [{
        key: 'getInputValue',
        value: function getInputValue() {
            return this.props.formatValue ? this.props.formatValue(this, this.value, this.displayValue) : this.value.join(' ');
        }

        // set col value

    }, {
        key: 'setValue',
        value: function setValue(arrValues, transition) {
            var index = 0;
            // 这里不能直接用cols.forEach里面的index，因为arrValues的值未包含divider
            this.cols.forEach(function (col) {
                if (col && !col.divider) {
                    col.setValue(arrValues[index++], transition);
                }
            });
        }

        // update col value

    }, {
        key: 'updateValue',
        value: function updateValue() {
            var newValue = [];
            var newDisplayValue = [];
            this.cols.forEach(function (col) {
                if (!col.divider) {
                    newValue.push(col.value);
                    newDisplayValue.push(col.displayValue);
                }
            });
            if (newValue.indexOf(undefined) >= 0) return;
            this.value = newValue;
            this.displayValue = newDisplayValue;
            this.setState({
                inputValue: this.getInputValue()
            });
            if (typeof this.props.onChange === 'function') {
                this.props.onChange(this, this.value, this.displayValue);
            }
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {}
    }, {
        key: 'componentWillUpdate',
        value: function componentWillUpdate() {}
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState) {
            var _this2 = this;

            var flag = this.state.opened !== prevState.opened || this.props.opened !== prevProps.opened;
            flag && this.renderPicker();

            // bind picker container event
            var _containerDOM = document.getElementById(this.pickerId);
            if (_containerDOM && !this.initialized) {
                _containerDOM.addEventListener(_getAnimationEnd2.default, this.handleContainerAnimationEnd);

                this.cols.forEach(function (col) {
                    _this2.initPickerCol(col, true); // todo updateItems ?
                });

                if (this.props.defaultValue) {
                    this.setValue(this.props.defaultValue, 0);
                }

                this.initialized = true;
            } else if (_containerDOM && this.state.opened && !prevState.opened) {
                // 弹出picker container的时候更新一次数据
                this.setState({ inputValue: this.getInputValue() });
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            var _containerDOM = document.getElementById(this.pickerId);
            if (_containerDOM) {
                _containerDOM.removeEventListener(_getAnimationEnd2.default, this.handleContainerAnimationEnd);

                this.picker_box.removeChild(_containerDOM);
            }
        }
    }, {
        key: 'handleInputClick',
        value: function handleInputClick(e) {
            this.isAnimating = true;
            this.setState({ opened: true });
        }
    }, {
        key: 'handleMaskClick',
        value: function handleMaskClick(e) {
            if (this.isAnimating) return;
            this.isAnimating = true;
            this.setState({ opened: false });
        }
    }, {
        key: 'handleClear',
        value: function handleClear(e) {
            // todo 清除this.value和col[i].value
            this.isAnimating = true;
            this.setState({ opened: false, inputValue: '' });
        }
    }, {
        key: 'handleSubmit',
        value: function handleSubmit(e) {
            this.isAnimating = true;
            this.setState({ opened: false });
        }
    }, {
        key: 'handleContainerAnimationEnd',
        value: function handleContainerAnimationEnd(e) {
            this.isAnimating = false;
            if (this.state.opened) {
                this.props.onOpen(this);
            } else {
                this.props.onClose(this);
            }
        }

        // ------------------------ initPickerCol start ------------------------

    }, {
        key: 'initPickerCol',
        value: function initPickerCol(col, updateItems) {
            var _this3 = this;

            var colWrapper = document.getElementById(col.id);
            //const colIndex = col.index;
            if (col.divider) return;
            col.wrapper = colWrapper;
            col.container = colWrapper.parentNode;
            col.items = colWrapper.childNodes;

            var wrapperHeight = undefined,
                itemHeight = undefined,
                itemsHeight = undefined,
                minTranslate = undefined,
                maxTranslate = undefined;
            col.calcSize = function () {
                var colWidth = undefined,
                    colHeight = undefined;
                colWidth = 0;
                colHeight = col.container.offsetHeight;
                wrapperHeight = col.wrapper.offsetHeight;
                itemHeight = col.wrapper.childNodes[0].offsetHeight;
                itemsHeight = itemHeight * col.items.length;
                minTranslate = colHeight / 2 - itemsHeight + itemHeight / 2;
                maxTranslate = colHeight / 2 - itemHeight / 2;
                if (col.width) {
                    colWidth = col.width;
                    if (parseInt(colWidth, 10) === colWidth) colWidth = colWidth + 'px';
                    col.container.style.width = colWidth;
                }
            };
            col.calcSize();

            (0, _transition.setTransform)(col.wrapper, 'translate3d(0, ' + maxTranslate + 'px, 0)');
            (0, _transition.setTransitionDur)(col.wrapper, 0);

            //let activeIndex = 0;
            col.animationFrameId = undefined;

            // set value function
            col.setValue = function (newValue, transition, valueCallbacks) {
                if (transition === undefined) transition = '';
                var newActiveIndex = col.values.indexOf(newValue);
                if (newActiveIndex === -1) return;
                var newTranslate = -newActiveIndex * itemHeight + maxTranslate;
                // update wrapper
                (0, _transition.setTransitionDur)(col.wrapper, transition);
                (0, _transition.setTransform)(col.wrapper, 'translate3d(0, ' + newTranslate + 'px, 0)');

                // watch items
                if (_this3.props.updateValuesOnMomentum && col.activeIndex && col.activeIndex !== newActiveIndex) {
                    (0, _animationFrame.cancelAnimationFrame)(col.animationFrameId);
                    _util2.default.one(col.wrapper, _getTransitionEnd2.default, function (e) {
                        (0, _animationFrame.cancelAnimationFrame)(col.animationFrameId);
                    });
                    updateDuringScroll();
                }

                // update items
                col.updateItems(newActiveIndex, newTranslate, transition, valueCallbacks);
            };

            col.updateItems = function (activeIndex, translate, transition, valueCallbacks) {
                if (translate === undefined) {
                    translate = (0, _getTranslate2.default)(col.wrapper, 'y');
                }
                if (activeIndex === undefined) {
                    activeIndex = -Math.round((translate - maxTranslate) / itemHeight);
                }
                if (activeIndex < 0) activeIndex = 0;
                if (activeIndex >= col.items.length) activeIndex = col.items.length - 1;
                var previousActiveIndex = col.activeIndex;
                col.activeIndex = activeIndex;
                var _activeItem = col.wrapper.querySelector('.active');
                _activeItem && _activeItem.classList.remove('active');

                var selectedItem = col.items[activeIndex];
                selectedItem.classList.add('active');
                (0, _transition.setTransform)(selectedItem, '');

                if (valueCallbacks || valueCallbacks === undefined) {
                    // update values
                    col.value = selectedItem.getAttribute('data-item-value');
                    col.displayValue = col.displayValues ? col.displayValues[activeIndex] : col.value;
                    // on change callback
                    if (previousActiveIndex !== activeIndex) {
                        if (typeof col.onChange === 'function') {
                            col.onChange(_this3, col.value, col.displayValue);
                        }
                        _this3.updateValue();
                    }
                }
            };

            var updateDuringScroll = function updateDuringScroll() {
                col.animationFrameId = (0, _animationFrame.requestAnimationFrame)(function () {
                    col.updateItems(undefined, undefined, 0);
                    updateDuringScroll();
                });
            };

            // update items on init
            if (updateItems) col.updateItems(0, maxTranslate, 0);

            col.allowItemClick = true;
            var isTouched = undefined,
                isMoved = undefined,
                touchStartY = undefined,
                touchCurrentY = undefined,
                touchStartTime = undefined,
                touchEndTime = undefined,
                startTranslate = undefined,
                returnTo = undefined,
                currentTranslate = undefined,
                prevTranslate = undefined,
                velocityTranslate = undefined,
                velocityTime = undefined;

            var handleTouchStart = function handleTouchStart(e) {
                if (isMoved || isTouched) return;
                e.preventDefault();
                isTouched = true;
                touchStartY = touchCurrentY = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
                touchStartTime = +new Date();

                col.allowItemClick = true;
                startTranslate = currentTranslate = (0, _getTranslate2.default)(col.wrapper, 'y');
            };

            var handleTouchMove = function handleTouchMove(e) {
                if (!isTouched) return;
                e.preventDefault();
                col.allowItemClick = false;
                touchCurrentY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
                if (!isMoved) {
                    // first move
                    (0, _animationFrame.cancelAnimationFrame)(col.animationFrameId);
                    isMoved = true;
                    startTranslate = currentTranslate = (0, _getTranslate2.default)(col.wrapper, 'y');
                    (0, _transition.setTransitionDur)(col.wrapper, 0);
                }
                e.preventDefault(); // ?
                var diff = touchCurrentY - touchStartY;
                currentTranslate = startTranslate + diff;
                returnTo = undefined;

                // nomalize translate
                if (currentTranslate < minTranslate) {
                    currentTranslate = minTranslate - Math.pow(minTranslate - currentTranslate, 0.8);
                    returnTo = 'min';
                }
                if (currentTranslate > maxTranslate) {
                    currentTranslate = maxTranslate + Math.pow(currentTranslate - maxTranslate, 0.8);
                    returnTo = 'max';
                }
                // transform wrapper
                (0, _transition.setTransform)(col.wrapper, 'translate3d(0, ' + currentTranslate + 'px, 0)');

                // update items
                col.updateItems(undefined, currentTranslate, 0, _this3.props.updateValuesOnTouchmove);

                // calc velocity
                velocityTranslate = currentTranslate - prevTranslate || currentTranslate;
                velocityTime = +new Date();
                prevTranslate = currentTranslate;
            };

            var handleTouchEnd = function handleTouchEnd(e) {
                if (!isTouched || !isMoved) {
                    isTouched = isMoved = false;
                    return;
                }
                isTouched = isMoved = false;
                (0, _transition.setTransitionDur)(col.wrapper, '');
                if (returnTo) {
                    if (returnTo === 'min') {
                        (0, _transition.setTransform)(col.wrapper, 'translate3d(0, ' + minTranslate + 'px, 0)');
                    } else {
                        (0, _transition.setTransform)(col.wrapper, 'translate3d(0, ' + maxTranslate + 'px, 0)');
                    }
                }
                touchEndTime = +new Date();
                var velocity = undefined,
                    newTranslate = undefined;
                if (touchEndTime - touchStartTime > 300) {
                    newTranslate = currentTranslate;
                } else {
                    velocity = Math.abs(velocityTranslate / (touchEndTime - velocityTime));
                    newTranslate = currentTranslate + velocityTranslate * _this3.props.momentumRatio;
                }

                newTranslate = Math.max(Math.min(newTranslate, maxTranslate), minTranslate);

                // active index
                var activeIndex = -Math.floor((newTranslate - maxTranslate) / itemHeight);

                // normalize translate
                if (!_this3.props.freeMode) newTranslate = -activeIndex * itemHeight + maxTranslate;

                // transform wrapper
                (0, _transition.setTransform)(col.wrapper, 'translate3d(0, ' + parseInt(newTranslate, 10) + 'px, 0)');

                // update items
                col.updateItems(activeIndex, newTranslate, '', true);

                // watch items
                if (_this3.props.updateValuesOnMomentum) {
                    updateDuringScroll();
                    _util2.default.one(col.wrapper, _getTransitionEnd2.default, function (e) {
                        (0, _animationFrame.cancelAnimationFrame)(col.animationFrameId);
                    });
                }

                // allow click
                setTimeout(function () {
                    col.allowItemClick = true;
                }, 100);
            };

            col.initEvents = function (detach) {
                var method = detach ? 'removeEventListener' : 'addEventListener';
                col.container[method](_touchEvents2.default.start, handleTouchStart);
                col.container[method](_touchEvents2.default.move, handleTouchMove);
                col.container[method](_touchEvents2.default.end, handleTouchEnd);
            };

            col.destroyEvents = function () {
                col.initEvents(true);
            };

            col.initEvents();
        }
        // --------------------- initPickerCol END --------------------------

    }, {
        key: 'renderPicker',
        value: function renderPicker() {
            var _this4 = this;

            var _props2 = this.props;
            var toolbar = _props2.toolbar;
            var toolbarTitle = _props2.toolbarTitle;
            var showSubmitBtn = _props2.showSubmitBtn;
            var showClearBtn = _props2.showClearBtn;
            var cols = _props2.cols;


            var opened = this.state.opened;

            if (!this.picker_box) {
                this.picker_box = document.createElement('div');
                document.body.appendChild(this.picker_box);
            }

            // ------------- render toolbar -------------
            var _toolbar = null;
            if (toolbar) {
                _toolbar = _react2.default.createElement(
                    'div',
                    { className: 'picker-toolbar' },
                    _react2.default.createElement(
                        'h3',
                        { className: 'picker-title' },
                        toolbarTitle || '请选择'
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'fn-group' },
                        showClearBtn ? _react2.default.createElement(
                            'a',
                            { href: 'javascript:void(0)', onClick: this.handleClear, className: 'fn-clear' },
                            '清除'
                        ) : null,
                        showSubmitBtn ? _react2.default.createElement(
                            'a',
                            { href: 'javascript:void(0)', onClick: this.handleSubmit, className: 'fn-submit' },
                            '确定'
                        ) : null
                    )
                );
            }

            // --------------- render cols -----------------
            var _cols = cols.map(function (col, colIndex) {
                var colX = _this4.cols[colIndex];
                if (col.divider) {
                    return _react2.default.createElement(
                        'div',
                        { key: colIndex, className: 'picker-col-divider' },
                        col.content
                    );
                }

                // col items
                var _displayValue = col.displayValues || col.values;
                var _items = _displayValue.map(function (val, valIndex) {
                    var _value = col.values[valIndex];
                    var _props = {
                        children: val,
                        key: 'item-' + valIndex,
                        'data-item-value': _value,
                        onClick: Picker.handleItemClick.bind(_this4, colX, _value)
                    };
                    return _react2.default.createElement('li', _props);
                });

                var clazz = (0, _classnames2.default)('picker-col-list', col.className, _defineProperty({}, 'col-' + col.textAlign, COL_ALIGN[col.textAlign]));

                return _react2.default.createElement(
                    'div',
                    { key: 'col-' + colIndex, className: 'picker-col' },
                    _react2.default.createElement(
                        'ul',
                        { className: clazz, id: colX.id },
                        _items
                    )
                );
            });
            _cols.push(_react2.default.createElement('div', { key: 'col-highlight', className: 'picker-highlight' }));

            // ---------------- render picker modal --------------
            var container_clazz = (0, _classnames2.default)('picker-modal', 'animated-fast', {
                'has-toolbar': toolbar,
                'fadeInUp': opened,
                'fadeOutDown': !opened
            });

            _reactDom2.default.render(_react2.default.createElement(
                'div',
                { className: container_clazz, id: this.pickerId, onTouchMove: preventDefault },
                _toolbar,
                _react2.default.createElement(
                    'div',
                    { className: 'picker-container' },
                    _cols
                )
            ), this.picker_box);
        }
    }, {
        key: 'renderMask',
        value: function renderMask() {
            return this.state.opened ? _react2.default.createElement(_maskM2.default, { className: 'fadeIn animated-fast', onClick: this.handleMaskClick }) : null;
        }
    }, {
        key: 'render',
        value: function render() {
            var _props3 = this.props;
            var onChange = _props3.onChange;
            var cols = _props3.cols;
            var readOnly = _props3.readOnly;
            var value = _props3.value;
            var defaultValue = _props3.defaultValue;
            var className = _props3.className;

            var others = _objectWithoutProperties(_props3, ['onChange', 'cols', 'readOnly', 'value', 'defaultValue', 'className', 'updateValuesOnMomentum', 'updateValuesOnTouchmove', 'onOpen', 'onClose', 'toolbar', 'toolbarTitle', 'showSubmitBtn', 'showClearBtn', 'momentumRatio', 'freeMode']);

            var clazz = (0, _classnames2.default)('picker-input', className);

            var __extraDOM = this.renderMask();
            others.onTouchStart = _util2.default.createChainedFunction(this.handleInputClick, others.onClick);

            return _react2.default.createElement(
                'div',
                { },
                __extraDOM || null,
                _react2.default.createElement('input', _extends({ ref: 'inputRef', className: clazz, readOnly: true, value: this.state.inputValue }, others))
            )
        }
    }], [{
        key: 'handleItemClick',
        value: function handleItemClick(col, value) {
            if (!col.allowItemClick) return;
            (0, _animationFrame.cancelAnimationFrame)(col.animationFrameId);
            col.setValue(value);
        }
    }]);

    return Picker;
}(_react.Component);

Picker.propTypes = {
    onOpen: _react.PropTypes.func,
    onClose: _react.PropTypes.func,
    defaultValue: _react.PropTypes.array,

    toolbar: _react.PropTypes.bool, // 是否显示toolbar
    toolbarTitle: _react.PropTypes.node,
    showSubmitBtn: _react.PropTypes.bool,
    showClearBtn: _react.PropTypes.bool,

    cols: _react.PropTypes.arrayOf(_react.PropTypes.shape({
        className: _react.PropTypes.string, // 用于给某个col加上特定的样式
        textAlign: _react.PropTypes.oneOf(['left', 'right', 'center']),
        values: _react.PropTypes.array,
        displayValues: _react.PropTypes.array
    })).isRequired,
    formatValue: _react.PropTypes.func, // (this, value, displayValue)

    updateValuesOnMomentum: _react.PropTypes.bool,
    updateValuesOnTouchmove: _react.PropTypes.bool,
    momentumRatio: _react.PropTypes.number,
    freeMode: _react.PropTypes.bool
};

Picker.defaultProps = {
    onOpen: noop,
    onClose: noop,

    toolbar: false,
    toolbarTitle: '',
    showSubmitBtn: true,
    showClearBtn: false,

    updateValuesOnMomentum: false,
    updateValuesOnTouchmove: true,
    momentumRatio: 5,
    freeMode: false
};

exports.default = Picker;
module.exports = exports['default'];
