<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
          v-model="listQuery.title"
          placeholder="Company name"
          style="width: 200px;"
          class="filter-item"
          @input="handleFilter"
          @keyup.enter="handleFilter"
      />

      <el-select v-model="listQuery.sort" style="width: 140px; margin-right: 15px" class="filter-item"
                 @change="handleFilter" :value="Sort">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key"/>
      </el-select>
      <el-button class="filter-item" type="primary" :icon="iconSearch" @click="handleFilter">
        <span v-waves>Search</span>
      </el-button>
      <router-link :to="'/company/edit/'+0">
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

      <el-table-column width="465px" align="center" label="Company Name">
        <template v-slot="scope">
          <span>{{ scope.row.company_name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="400px" align="center" label="Short Name">
        <template v-slot="scope">
          <span>{{ scope.row.short_name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="600px" align="center" label="Legal Name">
        <template v-slot="scope">
          <span>{{ scope.row.legal_name }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Actions" width="145">
        <template v-slot="scope">
          <router-link :to="'/company/edit/'+scope.row.id">
            <el-button type="primary" size="small" icon="el-icon-edit">
              Edit
            </el-button>
          </router-link>
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
import { debounce } from 'lodash';
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
        limit: 20
      },
      importanceOptions: [1, 2, 3],
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],
      temp: {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        type: '',
        status: 'published'
      },
      downloadLoading: false,
      pvData: [],
      tabMapOptions: [
        { label: 'China', key: 'CN' },
        { label: 'USA', key: 'US' },
        { label: 'Japan', key: 'JP' },
        { label: 'Eurozone', key: 'EU' }
      ],
      activeName: 'CN',
      createdTimes: 0,
      debouncedSearch: debounce(function () {
        this.handleFilter();
      }, 300)
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;

      const data = [
        {
          id: 1,
          company_name: 'A-Donje\'s Apartment Communities',
          short_name: 'Donje\'s Digs',
          legal_name: 'The Community of Donje, LLC',
          importance: 1,
          type: 'meeting'
        },
        {
          id: 2,
          company_name: 'American Communities Management',
          short_name: 'ACM',
          legal_name: 'American Communities Management, LLC',
          importance: 2,
          type: 'event'
        },
        {
          id: 3,
          company_name: 'Newport Pacific',
          short_name: 'newport',
          legal_name: 'Newport Pacific Capital Company',
          importance: 2,
          type: 'event'
        },
        {
          id: 4,
          company_name: 'Multifamily Management Services',
          short_name: 'MMS',
          legal_name: 'Multifamily Management Services, LLC',
          importance: 3,
          type: 'event'
        },
        {
          id: 5,
          company_name: 'Cushman & Wakefield',
          short_name: 'Cushman Wakefield',
          legal_name: 'Cushman & Wakefield of Virginia, LLC',
          importance: 2,
          type: 'event'
        }
      ];

      let filteredData = data.filter(item => {
        const matchesTitle = this.listQuery.title ? item.company_name.includes(this.listQuery.title) : true;
        return matchesTitle;
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
    }
  }
});
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
