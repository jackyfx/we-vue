import Vue from 'vue'
import TopTipsComponent from './top-tips.vue'

const TopTipsConstructor = Vue.extend(TopTipsComponent)
let instance

const TopTips = (options = {}) => {
  if (!instance) {
    instance = new TopTipsConstructor({
      el: document.createElement('div')
    })
  }
  if (instance.visible) return
  clearTimeout(instance.timer)

  const duration = options.duration || 3000
  instance.message = typeof options === 'string' ? options : options.message || ''
  document.body.appendChild(instance.$el)

  Vue.nextTick(() => {
    instance.visible = true
    instance.timer = setTimeout(function () {
      instance.visible = false
      instance.$el.remove()
    }, duration)
  })
}

TopTips.close = () => {
  if (instance) {
    Vue.nextTick(() => {
      instance.visible = false
      instance.$el.remove()
    })
  }
}

Vue.prototype.$toptips = TopTips

export default TopTips
export {
  TopTipsComponent as TopTips
}
