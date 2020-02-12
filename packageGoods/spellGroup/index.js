"use strict";

var _regeneratorRuntime2 = _interopRequireDefault(require('./../../vendor.js')(2));

var _core = _interopRequireDefault(require('./../../vendor.js')(0));

var _util = _interopRequireDefault(require('./../../utils/util.js'));

var _statusBar = _interopRequireDefault(require('./../../mixins/statusBar.js'));

var _goods = require('./../../api/goods.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

_core["default"].page({
  mixins: [_statusBar["default"]],
  data: {
    curPage: 0,
    canLoadMoreGoods: true,
    showCatePopup: false,
    curRootCateIdx: 0,
    groupCategories: [],
    spellGoodsList: []
  },
  onLoad: function onLoad(options) {
    // 初始化团购商品，并传入对应的类目
    this.initGroupGoods(options.cateId);
  },
  // 事件处理函数(集中保存在methods对象中)
  methods: {
    redirectTo: function redirectTo(path) {
      _util["default"].navigateTo(path);
    },
    onClickBack: function onClickBack() {
      _util["default"].navigateBack();
    },
    onClickHome: function onClickHome() {
      _util["default"].switchHome();
    },
    onClickRootCate: function onClickRootCate(idx) {
      wx.pageScrollTo({
        scrollTop: 0
      });
      this.curRootCateIdx = idx;
      this.showCatePopup = false;
      this.canLoadMoreGoods = true;
      this.loadSpellGoods();
    },
    handlePopupModal: function handlePopupModal() {
      this.showCatePopup = !this.showCatePopup;
    },
    initGroupGoods: function () {
      var _initGroupGoods = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime2["default"].mark(function _callee() {
        var _this = this;

        var cateId,
            res,
            _args = arguments;
        return _regeneratorRuntime2["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                cateId = _args.length > 0 && _args[0] !== undefined ? _args[0] : null;
                _context.next = 3;
                return (0, _goods.getGroupCategories)();

              case 3:
                res = _context.sent;

                if (cateId !== null) {
                  res.data.forEach(function (item, idx) {
                    if (parseInt(cateId) === item.cateId) {
                      _this.curRootCateIdx = idx + 1;
                    }
                  });
                }

                this.groupCategories = [{
                  cateName: '全部',
                  cateId: 0
                }].concat(res.data);
                this.loadSpellGoods();

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function initGroupGoods() {
        return _initGroupGoods.apply(this, arguments);
      }

      return initGroupGoods;
    }(),
    loadSpellGoods: function loadSpellGoods() {
      var _this2 = this;

      var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      if (!this.canLoadMoreGoods) return null; // 判断分类ID

      var cateId = this.groupCategories[this.curRootCateIdx].cateId; // 获取分类ID

      var params = {
        page: page + 1,
        cateId: cateId
      }; // 获取团购商品

      (0, _goods.getGroupGoods)(params).then(function (res) {
        // 当前总数小于当前页面大小，则无更多数据
        if (res.data.curTotal < res.data.curPageSize) {
          _this2.canLoadMoreGoods = false;
        }

        _this2.curPage = res.data.curPage;
        _this2.spellGoodsList = page === 0 ? res.data.data : _this2.spellGoodsList.concat(res.data.data);
      });
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function onPullDownRefresh() {
    this.canLoadMoreGoods = true;
    this.initGroupGoods();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function onReachBottom() {
    this.loadSpellGoods(this.curPage);
  }
}, {info: {"components":{"van-nav-bar":{"path":"../../$vendor/@vant/weapp/dist/nav-bar/index"},"van-icon":{"path":"../../$vendor/@vant/weapp/dist/icon/index"},"van-loading":{"path":"../../$vendor/@vant/weapp/dist/loading/index"},"van-popup":{"path":"../../$vendor/@vant/weapp/dist/popup/index"},"spellGoodsItems":{"path":"../../components/spellGoodsItems"}},"on":{"34-0":["tap"],"34-1":["tap"],"34-4":["close","touchmove"]}}, handlers: {'34-0': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.onClickBack($event);
      })();
    
  }},'34-1': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.onClickHome($event);
      })();
    
  }},'34-2': {"tap": function proxy (index) {
    
    var _vm=this;
      return (function () {
        _vm.onClickRootCate(index);
      })();
    
  }},'34-3': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.handlePopupModal($event);
      })();
    
  }},'34-4': {"close": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.handlePopupModal($event);
      })();
    
  }, "touchmove": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        return($event);
      })();
    
  }},'34-6': {"tap": function proxy (idx) {
    
    var _vm=this;
      return (function () {
        _vm.onClickRootCate(idx);
      })();
    
  }}}, models: {}, refs: undefined });