// pages/home/home.js
import {
  getMultiData,
  getProduct
} from '../../service/home.js'

import {
  POP,
  NEW,
  SELL,
  BACK_TOP_POSITION
} from '../../common/const.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    banners: [],
    recommends: [],
    titles: ["流行", "新款", "精选"],
    goods: {
      [POP]: { page: 1, list: [] },
      [NEW]: { page: 1, list: [] },
      [SELL]: { page: 1, list: [] },
    },
    currentType: 'pop',
    topPosition: 0,
    tabControlTop: 0,
    showBackTop: false,
    showTabControl: false
  },

  // ---------------------- 页面生命周期相关函数 ----------------------
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 发送网络请求
    this._getData()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  // ---------------------- 网络请求相关函数 ----------------------
  _getData() {
    // 获取轮播图数据
    this._getMultiData();

    // 获取不同类型商品数据
    this._getProductData(POP);
    this._getProductData(NEW);
    this._getProductData(SELL);
  },

  _getMultiData() {
    getMultiData().then(res => {
      // 取出所有的轮播数据
      const banners = res.data.banner.list.map(item => {
        return item.image
      })

      // 设置数据
      this.setData({
        banners: banners,
        recommends: res.data.recommend.list
      })
    })
  },

  _getProductData(type) {
    // 获取数据对应的页码
    const page = this.data.goods[type].page;

    // 请求数据
    getProduct(type, page).then(res => {
      // console.log(res)

      // 取出数据
      const list = res.data.list;

      // 将数据临时获取
      const goods = this.data.goods;
      goods[type].list.push(...list)
      goods[type].page += 1;

      // 将最新的goods设置到goods中
      this.setData({
        goods: goods
      })
    })
  },

  // ---------------------- 事件相关函数 ----------------------
  // onReachBottom: function() {
  //   this._getProductData(this.data.currentType)
  // },

  loadMore() {
    this._getProductData(this.data.currentType);
  },

  scrollPosition(e) {
    // 获取滚动的顶部
    const position = e.detail.scrollTop;

    // 设置是否显示
    this.setData({
      showBackTop: position > BACK_TOP_POSITION,
    })

    wx.createSelectorQuery().select('.tab-control').boundingClientRect((rect) => {
      const show = rect.top > 0
      this.setData({
        showTabControl: !show
      })
    }).exec()
  },
  
  onImageLoad() {
    wx.createSelectorQuery().select('.tab-control').boundingClientRect((rect) => {
      this.setData({
        tabControlTop: rect.top
      })
    }).exec()
  },

  onPageScroll(res) {
  },

  tabClick(e) {
    // 1.根据当前的点击赋值最新的currentType
    let currentType = ''
    switch (e.detail.index) {
      case 0:
        currentType = POP
        break
      case 1:
        currentType = NEW
        break
      case 2:
        currentType = SELL
        break
    }
    this.setData({
      currentType: currentType
    })
    console.log(this.selectComponent('.tab-control'));
    this.selectComponent('.tab-control').setCurrentIndex(e.detail.index)
    this.selectComponent('.tab-control-temp').setCurrentIndex(e.detail.index)
  },

  onBackTop() {
    // wx.pageScrollTo({
    //   scrollTop: 0,
    //   duration: 0
    // })
    this.setData({
      showBackTop: false,
      topPosition: 0,
      tabControlTop: 0
    })
  }

})