<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
          v-model="listQuery.identifier"
          placeholder="Unit identifier"
          style="width: 200px; margin-right: 15px"
          class="filter-item"
          clearable
          @input="handleFilter"
      />
      <el-autocomplete
          v-model="listQuery.property_name"
          :fetch-suggestions="fetchPropertyNames"
          :trigger-on-focus="false"
          placeholder="Property name"
          style="width: 200px; margin-right: 15px"
          class="filter-item"
          clearable
          @select="handleFilter"
      />
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
      <el-checkbox
          v-model="listQuery.showActiveOnly"
          @change="handleFilter"
          class="filter-item"
          style="margin-left:15px;padding-top: 10px"
      >Show only active </el-checkbox>
    </div>
    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="ID" width="60px">
        <template v-slot="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column width="430px" align="center" label="Identifier">
        <template v-slot="scope">
          <span>{{ scope.row.identifier }}</span>
        </template>
      </el-table-column>
      <el-table-column width="430px" align="center" label="Address">
        <template v-slot="scope">
          <span>{{ scope.row.address }}</span>
        </template>
      </el-table-column>
      <el-table-column width="430px" align="center" label="Property Name">
        <template v-slot="scope">
          <span>{{ scope.row.property_name }}</span>
        </template>
      </el-table-column>
      <el-table-column width="165px" align="center" label="Status">
        <template v-slot="scope">
          <el-tag :type="getStatusColor(scope.row.status)" class="tag-item">
            {{ scope.row.status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column width="155" align="center" label="Actions">
        <template v-slot="scope">
          <router-link :to="'/unit/edit/'+scope.row.id">
            <el-button type="primary" size="small" icon="el-icon-edit">
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
        identifier: '',
        showActiveOnly: false
      },
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      stateOptions: [],
      statusOptions: ['active', 'not active'],
      temp: {
        // propertyName: '',
        // identifier: '',
        type: '',
        status: ''
      },
      downloadLoading: false,
      pvData: [],
      createdTimes: 0,
      data: [
        {
          id: 1,
          identifier: 'c1cc-772-10',
          address: '772 Castle Court',
          property_name: 'Abbington Crossing I, LLC t/a Abbington Crossing',
          status: 'active'
        },
        {
          id: 2,
          identifier: 'a2wvd-5733-08',
          address: '5733 Westover Village Drive',
          property_name: 'Dominion Associates, LC t/a Aden Park II',
          status: 'not active'
        },
        {
          id: 3,
          identifier: 'cp954-12-07',
          address: '772 Castle Court',
          property_name: 'Donje\'s Digs',
          status: 'active'
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
        const matchesIdentifier = this.listQuery.identifier.toLowerCase() ? item.identifier.toLowerCase().includes(this.listQuery.identifier.toLowerCase()) : true;
        const matchesActiveStatus = this.listQuery.showActiveOnly ? item.status === 'active' : true;
        return matchesPropertyName && matchesIdentifier && matchesActiveStatus;
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
