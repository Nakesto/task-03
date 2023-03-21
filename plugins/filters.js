import Vue from "vue";

Vue.filter("toRp", function (number) {
  if (number !== "" && !isNaN(number)) {
    const value = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(number);
    return value;
  } else {
    return "";
  }
});

Vue.filter("convertDate", function (value) {
  const date = new Date(value);
  return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
});
