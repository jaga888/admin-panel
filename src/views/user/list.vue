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
          v-model="listQuery.role"
          placeholder="Select Role"
          style="width: 140px; margin-right: 15px"
          class="filter-item"
          clearable
          @change="handleFilter"
      >
        <el-option v-for="item in roleOptions" :key="item" :label="item" :value="item"/>
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
      <el-button class="filter-item" type="primary" :icon="iconSearch" @click="handleFilter">
        <span v-waves>Search</span>
      </el-button>
      <router-link :to="'/user/create/'">
        <el-button class="filter-item" style="margin-left: 15px;" type="primary" :icon="iconEdit">
          Create
        </el-button>
      </router-link>
    </div>
    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
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
      <el-table-column width="420px" align="center" label="Second Name">
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
          <el-tag :type="getStatusColor(scope.row.role)" class="tag-item">
            {{ scope.row.role }}
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

    <pagination v-show="total > 0" :total="total" v-model:page="listQuery.page" v-model:limit="listQuery.limit"
                @pagination="getList"/>
  </div>
</template>

<script>
import {defineComponent, markRaw} from 'vue';
import {Search, Edit, Download} from '@element-plus/icons-vue';
import waves from '@/directive/waves';
import Pagination from '@/components/Pagination';
import {fetchList} from "@/api/user.js";

export default defineComponent({
  name: 'CompaniesList',
  components: {Pagination},
  directives: {waves},
  data() {
    return {
      iconSearch: markRaw(Search),
      iconEdit: markRaw(Edit),
      iconDownload: markRaw(Download),
      list: [],
      total: 0,
      listLoading: false,
      listQuery: {
        filter: {
          full_name: ''
        },
        sort: 'first_name',
        page: 1,
        perPage: 10,
        role: ''
      },
      sortOptions: [
        {
          label: 'First Name Ascending',
          key: 'first_name'
        },
        {
          label: 'First Name Descending',
          key: '-first_name'
        }
      ],
      roleOptions: [],
      statusOptions: ['active', 'not active'],
      temp: {
        companyName: '',
        propertyName: '',
        type: '',
        status: ''
      },
      downloadLoading: false,
      pvData: [],
      createdTimes: 0,
    };
  },
  created() {
    this.getList();
    this.setRoleOptions();
  },
  methods: {
    getList() {
      this.listLoading = true;

      fetchList(this.listQuery).then(response => {
        this.total = response.meta.total;
        this.list = response.data;

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false;
        }, 1.5 * 1000);
      });

      this.listLoading = false;
    },
    handleFilter() {
      this.listQuery.page = 1;
      this.getList();
    },
    handleTitleInput(event) {
      this.debouncedSearch(event.target.value);
    },
    getStatusColor(status) {
      return status === 'admin' ? 'success' : 'info';
    },
    setRoleOptions() {
      const data = [
        {role: 'admin'},
        {role: 'super-admin'},
        {role: 'user'},
        {role: 'attorney'}
      ];
      const roles = data.map(item => item.role);
      this.roleOptions = Array.from(new Set(roles));
    },
    fetchPropertyNames(queryString, cb) {
      const results = queryString
          ? this.list.filter(item => item.property_name.toLowerCase().includes(queryString.toLowerCase()))
          : this.list;
      cb(results.map(item => ({value: item.property_name})));
    },
    fetchLastName(queryString, cb) {
      const results = queryString
          ? this.list.filter(item => item.last_name.toLowerCase().includes(queryString.toLowerCase()))
          : this.list;
      cb(results.map(item => ({value: item.last_name})));
    }
  }
});
</script>

<style scoped>

</style>
