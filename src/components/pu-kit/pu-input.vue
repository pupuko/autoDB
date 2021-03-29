<template>
  <input
    type="text"
    class="pu-input"
    :placeholder="placeholder"
    :v-model="value"
  />
</template>
<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: '',
    },
  },
}
</script>
<style lang="scss" scoped>
input {
  width: 200px;
  height: 35px;
  margin: 0;
  padding: 0 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: transparent;
  color: currentColor;
  box-sizing: border-box;
  font-size: 14px;
  transition: 0.2s;
  &:focus {
    outline: none;
    border-color: darkslategray;
  }
}
</style>