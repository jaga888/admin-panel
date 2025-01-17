<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
          v-model="listQuery.filter.full_name"
          placeholder="Company name"
          style="width: 200px;"
          class="filter-item"
          @input="handleFilter"
          @keyup.enter="handleFilter"
      />

      <el-select v-model="listQuery.sort" style="width: 140px; margin-right: 15px" class="filter-item"
                 @change="handleFilter" :value="listQuery.sort">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key"/>
      </el-select>
      <el-select v-model="listQuery.filter.active"
                 style="width: 160px; margin-right: 15px"
                 class="filter-item"
                 clearable
                 @change="handleFilter">
        <el-option value=" " label="Show All" selected/>
        <el-option value="1" label="Active Only"/>
        <el-option value="0" label="Inactive Only"/>
      </el-select>
      <router-link :to="'/company/create/'">
        <el-button class="filter-item" style="margin-left: 15px;" type="primary" :icon="Edit">
          Create
        </el-button>
      </router-link>
    </div>
    <el-table v-loading="companiesLoading" :data="companies" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="ID" width="60px">
        <template v-slot="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="465px" align="center" label="Company Name">
        <template v-slot="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="400px" align="center" label="Short Name">
        <template v-slot="scope">
          <span>{{ scope.row.short_name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="585px" align="center" label="Legal Name">
        <template v-slot="scope">
          <span>{{ scope.row.legal_name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120px" align="center" label="Active">
        <template v-slot="scope">
          <el-switch
              inline-prompt
              :active-icon="Check"
              :inactive-icon="Close"
              v-model="scope.row.active"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="toggleCompanyActive(scope.row)"
          />
        </template>
      </el-table-column>
      <el-table-column align="center" label="Actions" width="180">
        <template v-slot="scope">
          <router-link :to="'/company/edit/'+scope.row.id">
            <el-button type="primary" size="small" :icon="Edit">
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
                @pagination="getCompanies"/>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Delete, Edit } from '@element-plus/icons-vue';
import Pagination from '@/components/Pagination';
import { companiesUpdateActive, fetchList } from '@/api/company.js';
import { Check, Close } from '@element-plus/icons-vue';

const listQuery = ref({
  filter: {
    full_name: '',
    active: ' '
  },
  sort: 'name',
  page: 1,
  perPage: 10
});

const companies = ref([
  {
    name: '',
    short_name: '',
    legal_name: '',
    active: false
  }
]);

const toggleCompanyActive = async (companies) => {
  try {
    await companiesUpdateActive(companies.id, companies.active);
    console.log(companies.active);
    ElNotification({
      title: 'Success',
      message: `Company ${companies.short_name} is now ${companies.active ? 'active' : 'inactive'}.`,
      type: 'success',
      duration: 2000
    });
  } catch (error) {
    console.error('Failed to update company active status:', error);
    ElNotification({
      title: 'Error',
      message: 'Failed to update company active status',
      type: 'error',
      duration: 2000
    });
  }
};

const companiesLoading = ref<boolean>(true);
const total = ref<number>(0);

const sortOptions = ref<Array>([
  {
    label: 'Company Name Ascending',
    key: 'name'
  },
  {
    label: 'Company Name Descending',
    key: '-name'
  }
]);

const getCompanies = async () => {
  companiesLoading.value = true;

  fetchList(listQuery.value).then(response => {
    total.value = response.meta.total;
    companies.value = response.data;
    console.log(companies.value);
    setTimeout(() => {
      companiesLoading.value = false;
    }, 1.5 * 1000);
  });

  companiesLoading.value = false;
};

const handleFilter = () => {
  listQuery.value.page = 1;
  getCompanies();
};

getCompanies();
</script>

<style scoped>
.el-table-column {
  background-color: rgba(0, 0, 0, 0.03);
}

.app-container {
  background-color: #e9ecef;
}

.edit-input {
  padding-right: 100px;
}

.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>
