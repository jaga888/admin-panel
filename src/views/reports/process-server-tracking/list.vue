<template>
  <div class="app-container">
    <div class="filter-container" style="display: flex; justify-content: space-between">
      <div>
        <el-select
            v-model="listQuery.filter.agency"
            placeholder="Select Agency"
            style="width: 140px; margin-right: 15px"
            class="filter-item"
            clearable
            @change="handleFilter"
        >
          <el-option v-for="(item, key) in agencyOptions" :key="key" :label="item.name" :value="item.id"/>
        </el-select>
      </div>
      <div>
        <el-date-picker
            v-model="generateQuery.date"
            style="width: 140px; margin-bottom: 10px; margin-right: 15px"
            type="date"
            placeholder="Pick a day"
            format="MM-DD-YYYY"
            value-format="YYYY-MM-DD H:mm:ss"
        />
        <el-tree-select
            v-model="generateQuery.agency_ids"
            style="width: 240px; margin-bottom: 10px"
            :data="agencyOptions"
            :props="defaultProps"
            node-key="id"
            multiple
            :render-after-expand="false"
            show-checkbox
        />
        <el-button class="filter-item"
                   style="margin-left: 15px"
                   type="primary"
                   :icon="iconGenerate"
                   @click="generateReport"
        >
          Generate
        </el-button>
      </div>
    </div>
    <el-table v-loading="loading" :data="reports" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="ID" width="60px">
        <template v-slot="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="465px" align="center" label="File Name">
        <template v-slot="scope">
          <span>{{ scope.row.file?.name }}</span>
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

      <el-table-column width="200px" align="center" label="Agencies">
        <template v-slot="scope">
          <el-tag v-for="agency in scope.row.agencies" :key="agency.id" class="tag-item">
            {{ agency.name }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Actions" width="160">
        <template v-slot="scope">
          <router-link :to="'/report/download/'+scope.row.id">
            <el-button type="primary" size="small" :icon="iconDownload">
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
import {markRaw, ref} from 'vue';
import {Download, Edit} from '@element-plus/icons-vue';
import Pagination from '@/components/Pagination';
import {createReport, fetchList} from '@/api/report.js';
import {fetchAgencies} from '@/api/agency';
import {ElNotification} from "element-plus";
import moment from "moment"

const loading = ref<boolean>(true);
const total = ref<number>(0);

const defaultProps = {
  label: 'name',
  id: 'id'
};

const iconDownload = markRaw(Download);
const iconGenerate = markRaw(Edit);
const agencyOptions = ref([{
  name: ''
}]);

const listQuery = ref({
  filter: {
    agency: ''
  },
  sort: '-created_at',
  page: 1,
  perPage: 10
});

const generateQuery = ref({
  date: moment().format('yyyy-MM-DD H:mm:ss'),
  agency_ids: [],
})

const reports = ref([
  {
    id: 0,
    file: {
      name: ''
    },
    name: '',
    total: 0,
    agency_id: ''
  }
]);

const handleFilter = () => {
  listQuery.value.page = 1;
  getReports();
};

const setAgencyOptions = () => {
  fetchAgencies().then(response => {
    agencyOptions.value = response.data;
    console.log(agencyOptions.value);
  });
};

const getReports = async () => {
  loading.value = true;

  fetchList(listQuery.value).then(response => {
    total.value = response.meta.total;
    reports.value = response.data;
    console.log('response', reports.value);

    // Just to simulate the time of the request
    setTimeout(() => {
      loading.value = false;
    }, 1.5 * 1000);
  });

  loading.value = false;
};

const generateReport = async () => {
  await createReport(generateQuery.value);

  listQuery.value.page = 1;

  await getReports();

  ElNotification({
    title: 'Success',
    message: `Report created successfully`,
    type: 'success',
    duration: 2000
  });
}

getReports();
setAgencyOptions();
</script>

<style>
.el-icon.el-tree-node__expand-icon.is-leaf {
  width: 0;
}
</style>
