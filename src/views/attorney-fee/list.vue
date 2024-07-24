<template>
  <div class="app-container">
    <div class="filter-container">
      <el-autocomplete
          v-model="listQuery.attorney_name"
          :fetch-suggestions="fetchAttorneyName"
          :trigger-on-focus="false"
          placeholder="Attorney Name"
          style="width: 200px; margin-right: 15px"
          class="filter-item"
          clearable
          @select="handleFilter"
      />
      <el-select
          v-model="listQuery.scope_type"
           placeholder="Select Scope Type"
           style="width: 200px; margin-right: 15px"
           class="filter-item"
           clearable
           @change="handleFilter"
      >
        <el-option v-for="item in scopeTypeOptions" :key="item" :label="item" :value="item"/>
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
      <router-link :to="'/attorney-fee/create/'">
        <el-button class="filter-item" style="margin-left: 15px;" type="primary" :icon="iconEdit">
          Create
        </el-button>
      </router-link>
    </div>
    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="ID" width="70px">
        <template v-slot="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column width="240px" align="center" label="Scope Type">
        <template v-slot="scope">
          <span>{{ scope.row.scope_type }}</span>
        </template>
      </el-table-column>
      <el-table-column width="240px" align="center" label="Scope ID">
        <template v-slot="scope">
          <span>{{ scope.row.scope_id }}</span>
        </template>
      </el-table-column>
      <el-table-column width="240px" align="center" label="Notice of Default">
        <template v-slot="scope">
          <span>{{ scope.row.fd }}</span>
        </template>
      </el-table-column>
      <el-table-column width="240px" align="center" label="Unlawful Detainers">
        <template v-slot="scope">
          <span>{{ scope.row.ud }}</span>
        </template>
      </el-table-column>

      <el-table-column width="240px" align="center" label="UD external">
        <template v-slot="scope">
          <span>{{ scope.row.ud_external }}</span>
        </template>
      </el-table-column>
      <el-table-column width="240px" align="center" label="Attorney Name">
        <template v-slot="scope">
          <span>{{ scope.row.attorney_name }}</span>
        </template>
      </el-table-column>
      <el-table-column width="160" align="center" label="Actions">
        <template v-slot="scope">
          <router-link :to="'/attorney-fee/edit/'+scope.row.id">
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
        attorney_name: '',
        scope_type: ''
      },
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      scopeTypeOptions: [],
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
          scope_type: 'State',
          scope_id: '1',
          fd: '190.0',
          ud: '200.0',
          ud_external: '300.0',
          attorney_name: 'John'
        },
        {
          id: 2,
          scope_type: 'Company',
          scope_id: '1',
          fd: '170.0',
          ud: '180.0',
          ud_external: '300.0',
          attorney_name: 'John'
        },
        {
          id: 3,
          scope_type: 'Property',
          scope_id: '1',
          fd: '130.0',
          ud: '160.0',
          ud_external: '200.0',
          attorney_name: 'John'
        },
        {
          id: 4,
          scope_type: 'Company',
          scope_id: '1',
          fd: '130.0',
          ud: '140.0',
          ud_external: '300.0',
          attorney_name: ''
        },
        {
          id: 5,
          scope_type: 'Property',
          scope_id: '1',
          fd: '100.0',
          ud: '120.0',
          ud_external: '300.0',
          attorney_name: ''
        }
      ]
    };
  },
  created() {
    this.getList();
    this.setScopeTypeOptions();
  },
  methods: {
    getList() {
      this.listLoading = true;

      let filteredData = this.data.filter(item => {
        const matchesAttorneyName = this.listQuery.attorney_name.toLowerCase() ? item.attorney_name.toLowerCase().includes(this.listQuery.attorney_name.toLowerCase()) : true;
        const matchesScopeType = this.listQuery.scope_type ? item.scope_type === this.listQuery.scope_type : true;
        return matchesAttorneyName && matchesScopeType;
      });

      if (this.listQuery.sort) {
        const order = this.listQuery.sort.startsWith('+') ? 1 : -1;
        const key = this.listQuery.sort.substring(1);
        filteredData = filteredData.sort((a, b) => (a[key] > b[key] ? order : -order));
      }

      this.total = filteredData.length;

      const start = (this.listQuery.page - 1) * this.listQuery.limit;
      const end = start + this.listQuery.limit;
      this.list = filteredData.slice(start, end);

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
    setScopeTypeOptions() {
      const data = [
        { scope_type: 'Company' },
        { scope_type: 'Property' },
        { scope_type: 'State' }
      ];
      const scopeTypes = data.map(item => item.scope_type);
      this.scopeTypeOptions = Array.from(new Set(scopeTypes));
    },
    fetchAttorneyName(queryString, cb) {
      const results = queryString
        ? this.list.filter(item => item.attorney_name.toLowerCase().includes(queryString.toLowerCase()))
        : this.list;
      cb(results.map(item => ({ value: item.attorney_name })));
    }
  }
});
</script>

<style scoped>

</style>
