<template>
  <div class="pu-menu">
    <slot></slot>
    <div class="pu-menu-list">
      <div
        class="pu-menu-item"
        :class="itemChecked === index ? 'checked' : ''"
        v-for="(item, index) in items"
        :key="index"
        @click="itemClick(item, index)"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    items: {
      type: Array,
    },
  },
  watch: {
    items(nv, ov) {
      console.log('aaa')
      if (nv.length > ov.length) {
        this.itemChecked = nv.length - 1
      }
      if (nv.length < ov.length) {
        this.itemChecked = ''
      }
    },
  },
  data() {
    return {
      itemChecked: '',
    }
  },
  methods: {
    itemClick(item, index) {
      this.itemChecked = index
      this.$emit('click', item, index)
    },
  },
}
</script>
<style lang="scss" scoped>
.pu-menu {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  color: black;
  background: inherit;
  .pu-menu-list {
    overflow-y: auto;
    background: inherit;

    .pu-menu-item {
      height: 60px;
      line-height: 60px;
      width: 100%;
      background: inherit;
      transition: 0.2s;
      box-sizing: border-box;
      cursor: pointer;

      &:hover {
        filter: brightness(1.1);
      }
      &:active {
        filter: brightness(0.9);
      }
      &.checked {
        filter: brightness(0.9);
        color: lightgreen;
        border-left: 4px solid lightgreen;
      }
    }
  }
}
</style>