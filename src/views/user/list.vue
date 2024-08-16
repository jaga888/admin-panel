<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
          v-model="listQuery.firstName"
          placeholder="First Name"
          style="width: 200px; margin-right: 15px"
          class="filter-item"
          clearable
          @input="handleFilter"
      />
      <el-autocomplete
          v-model="listQuery.lastName"
          :fetch-suggestions="fetchLastName"
          :trigger-on-focus="false"
          placeholder="Last Name"
          style="width: 200px; margin-right: 15px"
          class="filter-item"
          clearable
          @select="handleFilter"
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
import { defineComponent, markRaw } from 'vue';
import { Search, Edit, Download } from '@element-plus/icons-vue';
import waves from '@/directive/waves';
import Pagination from '@/components/Pagination';
import {fetchList} from "@/api/user.js";

export default defineComponent({
  name: 'CompaniesList',
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      iconSearch: markRaw(Search),
      iconEdit: markRaw(Edit),
      iconDownload: markRaw(Download),
      list: [],
      total: 0,
      listLoading: false,
      listQuery: {
        page: 1,
        limit: 10,
        firstName: '',
        lastName: '',
        role: ''
      },
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
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
      data: [
        {
          id: 1,
          first_name: 'Matt',
          last_name: 'Abbitt',
          email: 'mabbitt@abbitt.com',
          role: 'attorney'
        },
        {
          id: 2,
          first_name: 'Abbitt',
          last_name: 'Admin',
          email: 'admin@abbitt.com',
          role: 'super-admin'
        },
        {
          id: 3,
          first_name: 'Cheryl',
          last_name: 'Pryne',
          email: 'youngsmill@abbitt.com',
          role: 'admin'
        },
        {
          id: 4,
          first_name: 'Annette',
          last_name: 'Sauer',
          email: 'wendwood@abbitt.com',
          role: 'user'
        },
        {
          id: 5,
          first_name: 'Vicki',
          last_name: 'Aimable',
          email: 'vaimable@agpmanager.com',
          role: 'admin'
        },
        {
          id: 6,
          first_name: 'Thomas',
          last_name: 'Burt',
          email: 'thomas.burt@senexlaw.com',
          role: 'attorney'
        },
        {
          id: 7,
          first_name: 'Nichole',
          last_name: 'Drungo',
          email: 'nichole.drungo@senexlaw.com',
          role: 'attorney'
        }
      ]
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
        debugger;
        // let filteredData = response.data.filter(item => {
        //   const matchesFirstName = this.listQuery.firstName.toLowerCase() ? item.first_name.toLowerCase().includes(this.listQuery.firstName.toLowerCase()) : true;
        //   const matchesLastName = this.listQuery.lastName.toLowerCase() ? item.last_name.toLowerCase().includes(this.listQuery.lastName.toLowerCase()) : true;
        //   const matchesRole = this.listQuery.role ? item.role === this.listQuery.role : true;
        //   return matchesFirstName && matchesLastName && matchesRole;
        // });
        //
        // if (this.listQuery.sort) {
        //   const order = this.listQuery.sort.startsWith('+') ? 1 : -1;
        //   const key = this.listQuery.sort.substring(1);
        //   filteredData = filteredData.sort((a, b) => (a[key] > b[key] ? order : -order));
        // }

        this.total = response.data.length;

        const start = (this.listQuery.page - 1) * this.listQuery.limit;
        const end = start + this.listQuery.limit;
        this.list = response.data.slice(start, end);

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
        { role: 'admin' },
        { role: 'super-admin' },
        { role: 'user' },
        { role: 'attorney' }
      ];
      const roles = data.map(item => item.role);
      this.roleOptions = Array.from(new Set(roles));
    },
    fetchPropertyNames(queryString, cb) {
      const results = queryString
        ? this.list.filter(item => item.property_name.toLowerCase().includes(queryString.toLowerCase()))
        : this.list;
      cb(results.map(item => ({ value: item.property_name })));
    },
    fetchLastName(queryString, cb) {
      const results = queryString
        ? this.list.filter(item => item.last_name.toLowerCase().includes(queryString.toLowerCase()))
        : this.list;
      cb(results.map(item => ({ value: item.last_name })));
    }
  }
});
</script>

<style scoped>

</style>
