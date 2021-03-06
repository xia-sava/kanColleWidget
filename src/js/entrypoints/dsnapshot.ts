import Vue from "vue";
import App from "../Applications/Components/DamageSnapshot/index.vue";

new Vue({
  render: (h) => h(App),
}).$mount("main#app");

window.resizeBy(
  window.outerWidth - window.innerWidth,
  window.outerHeight - window.innerHeight,
);
