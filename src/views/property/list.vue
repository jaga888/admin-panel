<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
          v-model="listQuery.filter.full_name"
          placeholder="Property name"
          style="width: 200px; margin-right: 0px"
          class="filter-item"
          clearable
          @input="handleFilter"
      />
      <el-autocomplete
          v-model="listQuery.filter.company_id"
          :fetch-suggestions="fetchCompanyNames"
          :trigger-on-focus="false"
          placeholder="Company name"
          style="width: 200px; margin-right: 15px"
          class="filter-item"
          clearable
          @select="handleFilter"
      />
      <el-select
          v-model="listQuery.filter.state"
           placeholder="Select state"
           style="width: 140px; margin-right: 15px"
           class="filter-item"
           clearable
           @change="handleFilter"
      >
        <el-option v-for="item in stateOptions" :key="item" :label="item" :value="item"/>
      </el-select>
      <el-select
          v-model="listQuery.sort"
          style="width: 140px; margin-right: 15px"
          class="filter-item"
          @change="handleFilter"
          clearable
          placeholder="Sort by"
      >
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key"/>
      </el-select>
      <router-link :to="'/property/edit/'+0">
        <el-button class="filter-item" type="primary" :icon="iconEdit">
          Create
        </el-button>
      </router-link>
    </div>
    <el-table v-loading="propertiesLoading" :data="properties" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="ID" width="60px">
        <template v-slot="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column width="400px" align="center" label="Property Name">
        <template v-slot="scope">
          <span>{{ scope.row.short_name }}</span>
        </template>
      </el-table-column>
      <el-table-column width="400px" align="center" label="Legal Name">
        <template v-slot="scope">
          <span>{{ scope.row.legal_name }}</span>
        </template>
      </el-table-column>
      <el-table-column width="380px" align="center" label="Company Name">
        <template v-slot="scope">
          <router-link :to="'/company/edit/'+scope.row.company.id">
            <el-button type="text"  size="default" icon="el-icon-edit">
              {{scope.row.company.legal_name}}
            </el-button>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column width="120px" align="center" label="State">
        <template v-slot="scope">
          <span>{{ scope.row.state }}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px" align="center" label="Status">
        <template v-slot="scope">
          <el-tag :type="getStatusColor(scope.row.active)" class="tag-item">
            {{ getStatus(scope.row.active) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column width="180" align="center" label="Actions">
        <template v-slot="scope">
          <router-link :to="'/property/edit/'+scope.row.id">
            <el-button type="primary" size="small" :icon="Edit" >
              Edit
            </el-button>
          </router-link>
          <el-button style="margin-left: 15px" size="small" type="danger" :icon="Delete">
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" v-model:page="listQuery.page" v-model:limit="listQuery.perPage"
                @pagination="getProperties"/>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, markRaw, ref } from 'vue';
import { Search, Edit, Download, Delete } from '@element-plus/icons-vue';
import waves from '@/directive/waves';
import Pagination from '@/components/Pagination';
import { fetchList } from '@/api/property.js';

const listQuery = ref({
  filter: {
    full_name: '',
    company_id: '',
    state: ''
  },
  sort: '',
  page: 1,
  perPage: 10
});

const properties = ref([
  {
    company_name: '',
    property_name: '',
    legal_name: '',
    active: '',
    state: ''
  }
]);

const propertiesLoading = ref<boolean>(true);
const total = ref<number>(0);

const getProperties = async () => {
  propertiesLoading.value = true;
  try {
    const response = await fetchList(listQuery.value);
    total.value = response.meta.total;
    properties.value = response.data;
  } finally {
    propertiesLoading.value = false;
  }
};

const getStatusColor = (active: boolean) => {
  return active ? 'success' : 'info';
};
const getStatus = (active:boolean) => {
  return active ? 'Active' : 'Not Active';
};

const handleFilter = () => {
  listQuery.value.page = 1;
  getProperties();
};

getProperties();
</script>

<style scoped>
.app-container {
  background-color: #e9ecef;
}
</style>
