import Vue from "vue";

Vue.directive("autoFocus", {
  inserted: (el) => {
    Vue.nextTick(function () {
      el.focus();
    });
  },
});
