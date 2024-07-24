<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
          v-model="listQuery.document_name"
          placeholder="Document Name"
          style="width: 200px;"
          class="filter-item"
          clearable
          @input="handleFilter"
      />
      <router-link :to="'/documents-text/edit/'+0">
        <el-button class="filter-item" type="primary" :icon="iconEdit">
          Create
        </el-button>
      </router-link>
    </div>
    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 50%">
      <el-table-column width="680px" align="center" label="Document Name">
        <template v-slot="scope">
          <span>{{ scope.row.document_name }}</span>
        </template>
      </el-table-column>
      <el-table-column width="155" align="center" label="Actions">
        <template v-slot="scope">
          <router-link :to="'/documents-text/edit/'+scope.row.id">
            <el-button type="primary" size="small">
              Edit
            </el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>

    <pagination
        v-show="total > 0"
        :total="total"
        v-model:page="listQuery.page"
        v-model:limit="listQuery.limit"
        @pagination="getList"
    />
  </div>
</template>

<script>
import { defineComponent, markRaw } from 'vue';
import { Search, Edit, Download } from '@element-plus/icons-vue';
import waves from '@/directive/waves';
import Pagination from '@/components/Pagination';

export default defineComponent({
  name: 'UnitsList',
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
        property_name: '',
        document_name: '',
        showActiveOnly: false
      },
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      stateOptions: [],
      statusOptions: ['active', 'not active'],
      temp: {
        type: '',
        status: ''
      },
      downloadLoading: false,
      pvData: [],
      createdTimes: 0,
      data: [
        {
          id: 1,
          document_name: 'NFPR VA'
        },
        {
          id: 2,
          document_name: 'NFPR VA CARES'
        },
        {
          id: 3,
          document_name: 'NFPR VA Gates Hudson'
        },
        {
          id: 4,
          document_name: 'NFPR VA Gates Hudson CARES'
        },
        {
          id: 5,
          document_name: 'NFPR VA AION'
        },
        {
          id: 6,
          document_name: 'NFPR VA AION CARES'
        },
        {
          id: 7,
          document_name: 'NFPR VA Weinstein'
        },
        {
          id: 8,
          document_name: 'NFPR VA Weinstein CARES'
        }
      ]
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;

      let filteredData = this.data.filter(item => {
        const matchesPropertyName = this.listQuery.property_name.toLowerCase() ? item.property_name.toLowerCase().includes(this.listQuery.property_name.toLowerCase()) : true;
        const matchesDocumentName = this.listQuery.document_name.toLowerCase() ? item.document_name.toLowerCase().includes(this.listQuery.document_name.toLowerCase()) : true;
        const matchesActiveStatus = this.listQuery.showActiveOnly ? item.status === 'active' : true;
        return matchesPropertyName && matchesDocumentName && matchesActiveStatus;
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
    getStatusColor(status) {
      return status === 'active' ? 'success' : 'info';
    },
    fetchPropertyNames(queryString, cb) {
      const results = queryString
        ? this.list.filter(item => item.property_name.toLowerCase().includes(queryString.toLowerCase()))
        : this.list;
      cb(results.map(item => ({ value: item.property_name })));
    }
  }
});
</script>

<style scoped>

</style>
