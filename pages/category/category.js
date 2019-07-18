// pages/category/category.js
import {
  getCategory,
  getSubcategory,
  getCategoryDetail
} from '../../service/category.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    categories: [],
    categoryData: {},
    currentIndex: 0
  },

  // ---------------------- 页面生命周期相关函数 ----------------------

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    // 请求分类数据
    this._getCategory()
  },

  _getCategory() {
    getCategory().then(res => {
      // 获取categories
      const categories = res.data.category.list;

      // 初始化每个类别的子数据
      const categoryData = {}

      for (let i = 0; i < categories.length; i++) {
        categoryData[i] = {
          subcategories: [],
          categoryDetail: []
        }
      }

      // 修改data中的数据
      this.setData({
        categories: res.data.category.list,
        categoryData: categoryData
      })

      // 请求第一个类别的数据
      this._getSubcategory(0)

      // 请求第一个类别的详情数据
      this._getCategoryDetail(0)
    })
  },

  _getSubcategory(currentIndex) {
    // 获取对应的maitkey
    const maitkey = this.data.categories[currentIndex].maitKey;

    // 请求的数据
    getSubcategory(maitkey).then(res => {
      const tempCategoryData = this.data.categoryData;
      tempCategoryData[currentIndex].subcategories = res.data.list;
      this.setData({
        categoryData: tempCategoryData
      })
    })
  },

  _getCategoryDetail(currentIndex) {
    // 获取对应的miniWallKey
    const miniWallKey = this.data.categories[currentIndex].miniWallkey;

    // 请求数据类别的数据
    this._getRealCategoryDetail(currentIndex, miniWallKey, 'pop'); 
  },

  _getRealCategoryDetail(index, miniWallKey, type) {
    getCategoryDetail(miniWallKey, type).then(res => {
      // 获取categoryData
      const categoryData = this.data.categoryData;

      // 修改数据
      categoryData[index].categoryDetail = res;

      // 修改data中的数据
      this.setData({
        categoryData: categoryData
      })
    })
  },

  // ---------------------- 事件相关函数 ----------------------

  menuClick(e) {
    // 改变当前的currentIndex
    const currentIndex = e.detail.currentIndex;

    this.setData({
      currentIndex
    })

    // 请求对应currentIndex的数据
    this._getSubcategory(currentIndex);

    // 请求对应的currentIndex的详情数据
    this._getCategoryDetail(currentIndex)
  }

})