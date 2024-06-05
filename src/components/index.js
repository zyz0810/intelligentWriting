import Pagination from './Pagination'
import MyDialog from './MyDialog'
import VCarousel from './cusomComponent/VCarousel'
import VCrosswise from './cusomComponent/VCrosswise'
import VLengthways from './cusomComponent/VLengthways'
import VMeal from './cusomComponent/VMeal'

const commomComponents = {
  install: function (Vue) {
    Vue.component('pagination', Pagination)
    Vue.component('myDialog', MyDialog)
    Vue.component('VMeal', VMeal)
    Vue.component('VCarousel', VCarousel)
    Vue.component('VCrosswise', VCrosswise)
    Vue.component('VLengthways', VLengthways)
  }
}
// 导出
export default commomComponents
