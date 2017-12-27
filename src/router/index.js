import Vue from 'vue'
import Router from 'vue-router'
import HtmlToImage from 'pages/htmlToImage/htmlToImage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HtmlToImage',
      component: HtmlToImage
    }
  ]
})
