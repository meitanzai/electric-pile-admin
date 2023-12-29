import Vue from 'vue';
import App from './App.vue';
import router, { setRoutes } from './router';
import store from './store/index';
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import * as echarts from 'echarts';
import moment from 'moment';
import AmapVue from '@amap/amap-vue';

AmapVue.config.version = '2.0'; // 默认2.0，这里可以不修改
AmapVue.config.key = '545afca1ce75b395e1e9c9cde96a48ef';
AmapVue.config.plugins = [];
Vue.use(AmapVue);

Vue.prototype.axios = axios;
Vue.prototype.$echarts = echarts;
Vue.use(ElementUI);
Vue.config.productionTip = false;

Vue.filter('dateFormat', function (dateStr,pattern = "YYYY MM-DD") {
  return moment(dateStr).format(pattern);
});
Vue.filter('dateTimeFormat', function (dateStr,pattern = "YYYY MM-DD HH:MM") {
  return moment(dateStr).format(pattern);
});


new Vue({
  router,
  store,
  render: h => h(App),
  created(){
    setRoutes()
  }
}).$mount('#app')
