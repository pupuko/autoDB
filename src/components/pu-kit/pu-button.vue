<template>
  <div class="pu-button" @click="btnClick" >
    <slot></slot>
  </div>
</template>
<script>
export default {
  props: {
    text: {
      type: String,
      default: '',
    }
  },
  name: 'pu-button',
  methods: {
    btnClick() {
      this.$emit("click")
    }
  }
}
</script>
<style lang="scss" scoped>
.pu-button {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 15px;
  height: 40px;
  border-radius: 4px;
  transition: 0.2s;
  background: gray;
  font-size: 14px;
  border: 1px solid transparent;
  box-sizing: border-box;
  cursor: pointer;
  &:hover {
    filter: brightness(1.1);
  }
  &:active {
    filter: brightness(0.9);
  }
}
</style>