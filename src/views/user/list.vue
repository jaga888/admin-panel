<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
          v-model="listQuery.filter.full_name"
          placeholder="Full Name"
          style="width: 200px; margin-right: 15px"
          class="filter-item"
          clearable
          @input="handleFilter"
      />
      <el-select
          v-model="listQuery.filter.role"
          placeholder="Select Role"
          style="width: 140px; margin-right: 15px"
          class="filter-item"
          clearable
          @change="handleFilter"
      >
        <el-option v-for="(item, key) in roleOptions" :key="key" :label="item.name" :value="item.name"/>
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
      <router-link :to="'/user/create/'">
        <el-button class="filter-item" style="margin-left: 15px;" type="primary" :icon="iconEdit">
          Create
        </el-button>
      </router-link>
    </div>
    <el-table v-loading="usersLoading" :data="users" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="ID" width="60px">
        <template v-slot="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column width="420px" align="center" label="First Name">
        <template v-slot="scope">
          <span>{{ scope.row.first_name }}</span>
        </template>
      </el-table-column>
      <el-table-column width="420px" align="center" label="Last Name">
        <template v-slot="scope">
          <span>{{ scope.row.last_name }}</span>
        </template>
      </el-table-column>
      <el-table-column width="410px" align="center" label="Email">
        <template v-slot="scope">
          <span>{{ scope.row.email }}</span>
        </template>
      </el-table-column>
      <el-table-column width="200px" align="center" label="Role">
        <template v-slot="scope">
          <el-tag :type="getStatusColor(role.name)" class="tag-item" v-for="role in scope.row.roles">
            {{ role.name }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column width="160" align="center" label="Actions">
        <template v-slot="scope">
          <router-link :to="'/user/edit/'+scope.row.id">
            <el-button type="primary" size="small">
              Edit
            </el-button>
          </router-link>
          <el-button style="margin-left: 15px" size="small" type="danger">
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total > 0" :total="total" v-model:page="listQuery.page" v-model:limit="listQuery.perPage"
                @pagination="getUsers"/>
  </div>
</template>

<script setup lang="ts">
import { markRaw, ref } from 'vue';
import { Edit } from '@element-plus/icons-vue';
import Pagination from '@/components/Pagination';
import { fetchList } from '@/api/user.js';
import { fetchRoles } from '@/api/role.js';

const listQuery = ref({
  filter: {
    full_name: '',
    role: ''
  },
  sort: 'first_name',
  page: 1,
  perPage: 10
});

const users = ref([
  {
    first_name: '',
    last_name: '',
    email: ''
  }
]);

const usersLoading = ref<boolean>(true);
const total = ref<number>(0);
const roleOptions = ref< Array >([{
  name: ''
}]);
const sortOptions = ref< Array >([
  {
    label: 'First Name Ascending',
    key: 'first_name'
  },
  {
    label: 'First Name Descending',
    key: '-first_name'
  }
]);
const iconEdit = markRaw(Edit);

const getUsers = async () => {
  usersLoading.value = true;

  fetchList(listQuery.value).then(response => {
    total.value = response.meta.total;
    users.value = response.data;

    // Just to simulate the time of the request
    setTimeout(() => {
      usersLoading.value = false;
    }, 1.5 * 1000);
  });

  usersLoading.value = false;
};

const handleFilter = () => {
  listQuery.value.page = 1;
  getUsers();
};

const getStatusColor = (status: string) => {
  return status === 'firm-manager' ? 'success' : 'info';
};

const setRoleOptions = () => {
  fetchRoles().then(response => {
    roleOptions.value = response.data;
    console.log(roleOptions.value);
  });
};

getUsers();
setRoleOptions();
</script>

<style scoped>

</style>
