<template lang="">
  <b-form-group :class="[`mb-0 py-2 col-12 ${groupClass}`, {'col-md-6' : !penuh }]">
    <label :for="name" :class="labelClass">{{ label }}:</label>
    <input
      :id="name"
      :placeholder="'Your ' + label"
      :type="type"
      :value="value"
      @input="updateValue($event.target.value)"
      class="form-control"
      :class="inputClass"
      autocomplete="off"
      @focus="emit('onFocus', name)"
      @blur="emit('onBlur')"
    ></input>
    <!-- <label id="about-error" :style="active == name ? 'display: block' : 'display: none'" class="error" :for="name">{{{{errMsg}}}}</label> -->
    <small style="font-size: 10px" :style="active == name ? 'display: block' : 'display: none'" :id="name" class="text-danger">{{errMsg}}</small>
  </b-form-group>
</template>
<script setup>
const props = defineProps({
  value: {
    type: [String, Object, Number],
    required: true
  },
    name: {
    type: String,
    required: true
  },
    label: {
    type: String,
    required: true
  },
    type: {
    type: String,
    default: "text"
  },
    penuh: {
    type: Boolean,
    default: false
  },
  active: {
      type: String
  },
  labelClass: {
    type: String
  },
  inputClass: {
    type: String
  },
  groupClass: {
    type: String
  },
  errMsg: {
    type: String
  }
})
const emit = defineEmits(['input', 'onFocus', 'onBlur'])
const updateValue = (value) => {
  emit("input", value)
}
</script>
<style lang="css" scoped>
</style>
