<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
          v-model="listQuery.propertyTitle"
          placeholder="Property name"
          style="width: 200px; margin-right: 15px"
          class="filter-item"
          clearable
          @input="handleFilter"
      />
      <el-autocomplete
          v-model="listQuery.companyTitle"
          :fetch-suggestions="fetchCompanyNames"
          :trigger-on-focus="false"
          placeholder="Company name"
          style="width: 200px; margin-right: 15px"
          class="filter-item"
          clearable
          @select="handleFilter"
      />
      <el-select
          v-model="listQuery.state"
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
      <el-button class="filter-item" type="primary" :icon="iconSearch" @click="handleFilter">
        <span v-waves>Search</span>
      </el-button>
      <router-link :to="'/property/edit/'+0">
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
      <el-table-column width="400px" align="center" label="Property Name">
        <template v-slot="scope">
          <span>{{ scope.row.property_name }}</span>
        </template>
      </el-table-column>
      <el-table-column width="400px" align="center" label="Legal Name">
        <template v-slot="scope">
          <span>{{ scope.row.legal_name }}</span>
        </template>
      </el-table-column>
      <el-table-column width="380px" align="center" label="Company Name">
        <template v-slot="scope">
          <router-link :to="'/company/edit/'+scope.row.id">
            <el-button type="text"  size="default" icon="el-icon-edit">
              {{scope.row.company_name}}
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
          <el-tag :type="getStatusColor(scope.row.status)" class="tag-item">
            {{ scope.row.status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column width="160" align="center" label="Actions">
        <template v-slot="scope">
          <router-link :to="'/property/edit/'+scope.row.id">
            <el-button type="primary" size="small" >
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
        propertyTitle: '',
        companyTitle: '',
        state: ''
      },
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      stateOptions: [],
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
          company_name: 'A-Donje\'s Apartment Communities',
          property_name: 'Donje\'s Digs',
          legal_name: 'The Community of Donje, LLC',
          status: 'active',
          state: 'VA'
        },
        {
          id: 2,
          company_name: 'A-Donje\'s Apartment Communities',
          property_name: 'Tommie\'s Towers',
          legal_name: 'Tommie\'s Towers, LLC',
          status: 'not active',
          state: 'VA'
        },
        {
          id: 3,
          company_name: 'Newport Pacific',
          property_name: 'Newport',
          legal_name: 'Newport Pacific Capital Company',
          status: 'active',
          state: 'NC'
        },
        {
          id: 4,
          company_name: 'Multifamily Management Services',
          property_name: 'Mallside Forest(OLD)',
          legal_name: 'Fore Mallside Forest L.P.',
          status: 'not active',
          state: 'FL'
        },
        {
          id: 5,
          company_name: 'Cushman & Wakefield',
          property_name: 'Crosswinds',
          legal_name: 'ASI Crosswinds Apartments, LLC',
          status: 'active',
          state: 'NC'
        },
        {
          id: 6,
          company_name: 'Multifamily Management Services',
          property_name: 'Mallside Forest(Primary)',
          legal_name: 'Fore Mallside Forest L.P. t/a Mallside Forest Apartments',
          status: 'active',
          state: 'VA'
        },
        {
          id: 7,
          company_name: 'Cushman & Wakefield',
          property_name: 'Pillars at Great Bridge',
          legal_name: 'CVII - Great Bridge LLC',
          status: 'active',
          state: 'VA'
        },
        {
          id: 8,
          company_name: 'American Communities Management',
          property_name: 'Warwick',
          legal_name: 'Warwick Community, LLC',
          status: 'active',
          state: 'VA'
        },
        {
          id: 9,
          company_name: 'American Landmark',
          property_name: 'Boulders Lakeside (NEW)',
          legal_name: 'Boulders Lakeside POE LLC',
          status: 'active',
          state: 'VA'
        },
        {
          id: 10,
          company_name: 'American Landmark',
          property_name: 'Boulders Lakeside (OLD)',
          legal_name: 'Boulders Lakeside Property Owner, LLC',
          status: ' not active',
          state: 'NC'
        },
        {
          id: 11,
          company_name: 'American Communities Management',
          property_name: 'Heritage',
          legal_name: 'Heritage Community, LLC',
          status: 'active',
          state: 'VA'
        },
        {
          id: 12,
          company_name: 'American Communities Management',
          property_name: 'Clydes Dale',
          legal_name: 'Clydes Dale Community, LLC',
          status: 'not active',
          state: 'NC'
        }
      ]
    };
  },
  created() {
    this.getList();
    this.setStateOptions();
  },
  methods: {
    getList() {
      this.listLoading = true;

      let filteredData = this.data.filter(item => {
        const matchesPropertyName = this.listQuery.propertyTitle.toLowerCase() ? item.property_name.toLowerCase().includes(this.listQuery.propertyTitle.toLowerCase()) : true;
        const matchesCompanyName = this.listQuery.companyTitle.toLowerCase() ? item.company_name.toLowerCase().includes(this.listQuery.companyTitle.toLowerCase()) : true;
        const matchesState = this.listQuery.state ? item.state === this.listQuery.state : true;
        return matchesPropertyName && matchesCompanyName && matchesState;
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
      return status === 'active' ? 'success' : 'info';
    },
    setStateOptions() {
      const data = [
        { state: 'VA' }, { state: 'VA' }, { state: 'NC' }, { state: 'FL' },
        { state: 'NC' }, { state: 'VA' }, { state: 'VA' }, { state: 'VA' },
        { state: 'VA' }, { state: 'NC' }, { state: 'VA' }, { state: 'NC' }
      ];
      const states = data.map(item => item.state);
      this.stateOptions = Array.from(new Set(states));
    },
    fetchPropertyNames(queryString, cb) {
      const results = queryString
        ? this.list.filter(item => item.property_name.toLowerCase().includes(queryString.toLowerCase()))
        : this.list;
      cb(results.map(item => ({ value: item.property_name })));
    },
    fetchCompanyNames(queryString, cb) {
      const results = queryString
        ? this.list.filter(item => item.company_name.toLowerCase().includes(queryString.toLowerCase()))
        : this.list;
      cb(results.map(item => ({ value: item.company_name })));
    }
  }
});
</script>

<style scoped>

</style>
