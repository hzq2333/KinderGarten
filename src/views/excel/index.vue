<template>
  <div id="app-contatiner">
    <upload-excel-component
      :on-success="handleSuccess"
      :before-upload="beforeUpload"
      style="margin-top:10px"
    />
    <el-table
      :data="tableData"
      border
      highlight-current-row
      style="width: 100%; margin-top: 20px"
    >
      <el-table-column
        v-for="item of tableHeader"
        :key="item"
        :prop="item"
        :label="item"
      />
    </el-table>
  </div>
</template>
<script>
import UploadExcelComponent from "@/components/UploadExcel/index.vue";
export default {
  components: { UploadExcelComponent },
  data() {
    return {
      tableData: [],
      tableHeader: [],
    };
  },
  methods: {
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1;
      if (isLt1M) {
        return true;
      }
      this.$message({
        message: '文件大小超出了限制',
        type: 'warning',
      });
      return false;
    },
    handleSuccess({ results, header }) {
      this.tableData = results;
      this.tableHeader = header;
    },
  },
};
</script>