<template>
  <div class="pu-box">
    <div class="mask"></div>
    <div class="box">
      <div class="top">
        <div class="title">{{ title }}</div>
        <div class="btn">
          <div class="close" @click="close">
            <i class="el-icon-close"></i>
          </div>
        </div>
      </div>
      <div class="body">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
  },

  methods: {
    close() {
      this.$emit('close')
    },
  },
}
</script>
<style lang="scss" scoped>
.pu-box {
  .mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba($color: #000000, $alpha: 0.5);
    z-index: 1;
    animation: fade 0.1s forwards;
  }
  .box {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 700px;
    height: 500px;
    background: white;
    transform: translate(-50%, -50%);
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5);
    border-radius: 8px;
    padding: 10px;
    // display: flex;
    // flex-direction: column;
    box-sizing: border-box;
    z-index: 2;
    animation: show 0.1s forwards;
    .top {
      height: 30px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .title {
        font-size: 22px;
        font-weight: bold;
        padding-left: 10px;
        color: darkslategray;
      }
      .btn {
        .close {
          cursor: pointer;
          font-size: 1.5em;
          i {
            transition: 0.1s;
            border-radius: 4px;
            color: gray;
          }
          &:hover i {
            background: crimson;
            color: white;
          }
        }
      }
    }
    .body {
      display: flex;
      flex-direction: column;
      // justify-content: center;
      align-items: center;
      height: calc(100% - 30px)
    }

  }
  @keyframes fade {
    0% {
      filter: opacity(0);
      
    }
    100% {
      filter: opacity(1);
      backdrop-filter: blur(2px);
    }
  }
  @keyframes show {
    0% {
      filter: opacity(0);
      top: 40%;
    }
    100% {
      filter: opacity(1);
      
    }
  }
}
</style>