import Vue from 'vue'
import vClickOutside from 'v-click-outside'
import Toast from "vue-toastification"
import "vue-toastification/dist/index.css"
import { formatDistance, format, addDays, isDate } from 'date-fns'

Vue.directive('click-outside', vClickOutside.directive)
Vue.use(Toast, {
  hideProgressBar: true,
  draggable: false
})

Vue.prototype.$dateDistanceFromNow = (unixms) => {
  if (!unixms) return ''
  return formatDistance(unixms, Date.now(), { addSuffix: true })
}
Vue.prototype.$formatDate = (unixms, fnsFormat = 'MM/dd/yyyy HH:mm') => {
  if (!unixms) return ''
  return format(unixms, fnsFormat)
}
Vue.prototype.$uniqueId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2)
}