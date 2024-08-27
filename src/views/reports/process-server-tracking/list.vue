<template>
  <div class="app-container">
    <div class="filter-container">

      <router-link :to="'/company/create/'">
        <el-button class="filter-item" style="margin-left: 15px;" type="primary" :icon="iconGenerate">
          Generate
        </el-button>
      </router-link>
    </div>
    <el-table v-loading="loading" :data="reports" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="ID" width="60px">
        <template v-slot="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="465px" align="center" label="File Name">
        <template v-slot="scope">
          <span>{{ scope.row.file.name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="400px" align="center" label="Total">
        <template v-slot="scope">
          <span>{{ scope.row.total }}</span>
        </template>
      </el-table-column>

      <el-table-column width="400px" align="center" label="Created At">
        <template v-slot="scope">
          <span>{{ scope.row.created_at }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Actions" width="160">
        <template v-slot="scope">
          <router-link :to="'/report/download/'+scope.row.id">
            <el-button type="primary" size="small" icon="el-icon-download">
              Download
            </el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" v-model:page="listQuery.page" v-model:limit="listQuery.perPage"
                @pagination="getReports"/>
  </div>
</template>

<script setup lang="ts">
import { markRaw, ref } from 'vue';
import { Download, Edit } from '@element-plus/icons-vue';
import Pagination from '@/components/Pagination';
import { fetchList } from '@/api/report.js';

const listQuery = ref({
  filter: {
    name: 'process_server_tracking',
    // created_at: ''
  },
  sort: '-created_at',
  page: 1,
  perPage: 10,
});

const reports = ref([
  {
    id: 0,
    file: {
      name: '',
    },
    name: '',
    total: 0,
  }
]);

const loading = ref<boolean>(true);
const total = ref<number>(0);

const iconDownload = markRaw(Download);
const iconGenerate = markRaw(Edit);

const getReports = async () => {
  loading.value = true;

  fetchList(listQuery.value).then(response => {
    total.value = response.meta.total;
    reports.value = response.data;

    // Just to simulate the time of the request
    setTimeout(() => {
      loading.value = false;
    }, 1.5 * 1000);
  });

  loading.value = false;
};


getReports();
</script>

<style scoped>
.edit-input {
  padding-right: 100px;
}

.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>
