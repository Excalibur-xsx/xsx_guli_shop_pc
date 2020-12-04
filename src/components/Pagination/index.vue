<template>
  <div class="pagination">
    <button>上一页</button>
    <button>1</button>
    <button v-show="startEnd.start > 2">...</button>
    <button
      v-for="item in mapBtnsCount"
      :key="item"
      @click="setCurrentPage(startEnd.start + item - 1)"
    >
      {{ startEnd.start + item - 1 }}
    </button>
    <button v-show="startEnd.end < totalPages - 1">...</button>
    <button v-show="totalPages > 1">{{ totalPages }}</button>
    <button>下一页</button>
    <button>总数：{{ total }}</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    // 当前页码
    currentPage: {
      type: Number,
      default: 1,
    },
    // 显示按钮的数量
    pagerCount: {
      type: Number,
      validator(val) {
        return val >= 5 && val <= 21 && val % 2 === 1;
      },
      default: 7,
    },
    // 每页条数
    pageSize: {
      type: Number,
      default: 10,
    },
    // 总数
    total: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      myCurrentPage: this.currentPage,
    };
  },
  computed: {
    // 总页数
    totalPages() {
      // 向上取整
      return Math.ceil(this.total / this.pageSize);
    },
    startEnd() {
      const { myCurrentPage, pagerCount, totalPages } = this;

      const count = pagerCount - 2;
      // 中间的一半
      const halfCount = Math.floor(count / 2);

      let start, end;
      // 开始计算
      if (myCurrentPage >= totalPages - halfCount) {
        start = totalPages - count;
      } else {
        start = myCurrentPage - halfCount;
      }

      if (start <= 1) {
        start = 2;
      }

      end = start + count - 1;

      if (end >= totalPages) {
        end = totalPages - 1;
      }
      // 返回计算结果
      return {
        start,
        end,
      };
    },
    // 需要遍历的按钮数量
    mapBtnsCount() {
      const { start, end } = this.startEnd;
      const count = end - start + 1;
      return count >= 1 ? count : 0;
    },
  },
  methods: {
    setCurrentPage(currentPage) {
      this.myCurrentPage = currentPage;
    },
  },
};
</script>

<style lang='less' scoped>
.pagination {
  display: flex;
  white-space: nowrap;
  font-weight: 700;
  button {
    margin: 0 5px;
    padding: 0 4px;
    font-size: 13px;
    min-width: 30px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: none;
    outline: none;
    display: block;
    background-color: #f4f4f5;
    color: #606266;
    border-radius: 2px;
  }
}

button.active {
  background-color: #409eff;
  color: #fff;
}
</style>