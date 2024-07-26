<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
          v-model="listQuery.name"
          placeholder="Agency"
          style="width: 200px; margin-right: 15px"
          class="filter-item"
          clearable
          @input="handleFilter"
      />
      <el-autocomplete
          v-model="listQuery.shortName"
          :fetch-suggestions="fetchShortName"
          :trigger-on-focus="false"
          placeholder="Serviceable area"
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
      <router-link :to="'/jurisdiction/agency/create/'">
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
      <el-table-column width="420px" align="center" label="Agency">
        <template v-slot="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column width="200px" align="center" label="Serviceable area">
        <template v-slot="scope">
          <span>{{ scope.row.serviceable_area }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="100px" width="200px" label="Fee defendent">
        <template v-slot="{row}">
          <template v-if="row.edit">
            <el-input v-model="row.fee_defendent" class="edit-input" size="small" />
            <el-button
              class="cancel-btn"
              size="small"
              icon="el-icon-refresh"
              type="warning"
              @click="cancelEdit(row)"
            >
              cancel
            </el-button>
          </template>
          <span v-else>{{ row.fee_defendent }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="100px" width="200px" label="Fee ud">
        <template v-slot="{row}">
          <template v-if="row.edit">
            <el-input v-model="row.fee_ud" class="edit-input" size="small" />
            <el-button
              class="cancel-btn"
              size="small"
              icon="el-icon-refresh"
              type="warning"
              @click="cancelEdit(row)"
            >
              cancel
            </el-button>
          </template>
          <span v-else>{{ row.fee_ud }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Actions" width="120">
        <template v-slot="{row}">
          <el-button
            v-if="row.edit"
            type="success"
            size="small"
            :icon="iconCircleCheck"
            @click="confirmEdit(row)"
          >
            Ok
          </el-button>
          <el-button
            v-else
            type="primary"
            size="small"
            :icon="iconEdit"
            @click="row.edit=!row.edit"
          >
            Edit
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
import { Search, Edit, Download, Refresh, CircleCheck } from '@element-plus/icons-vue';
import waves from '@/directive/waves';
import Pagination from '@/components/Pagination/index.vue';

export default defineComponent({
  name: 'AgenciesList',
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      iconSearch: markRaw(Search),
      iconEdit: markRaw(Edit),
      iconDownload: markRaw(Download),
      iconRefresh: markRaw(Refresh),
      iconCircleCheck: markRaw(CircleCheck),
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        name: '',
        shortName: '',
        fee_defendent: '',
        fee_ud: '',
        original_fee_defendent: '',
        order: ''
      },
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      cityOptions: [],
      temp: {
        name: '',
        shortName: '',
        type: '',
        fee_defendent: '',
        original_fee_defendent: '',
        fee_ud: '',
        city: ''
      },
      downloadLoading: false,
      pvData: [],
      createdTimes: 0,
      data: [
        {
          id: 1,
          name: 'Marston',
          serviceable_area: 'New York',
          fee_defendent: '200,40',
          original_fee_defendent: '200,40',
          fee_ud: '180,50',
          original_fee_ud: '180,50'
        },
        {
          id: 2,
          name: 'Sheriff',
          serviceable_area: 'Norfolk',
          fee_defendent: '650,00',
          original_fee_defendent: '650,00',
          fee_ud: '580,00',
          original_fee_ud: '580,00'
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
        const matchesName = this.listQuery.name.toLowerCase() ? item.name.toLowerCase().includes(this.listQuery.name.toLowerCase()) : true;
        const matchesShortName = this.listQuery.shortName.toLowerCase() ? item.serviceable_area.toLowerCase().includes(this.listQuery.shortName.toLowerCase()) : true;
        return matchesName && matchesShortName;
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
      this.row.original_fee_defendent = this.fee_defendent;
      this.row.original_fee_ud = this.fee_ud;
    },
    cancelEdit(row) {
      row.fee_defendent = row.original_fee_defendent;
      row.fee_ud = row.original_fee_ud;
      row.edit = false;
      ElMessage({
        message: 'This fields have been restored to the original value',
        type: 'warning'
      });
    },
    confirmEdit(row) {
      row.edit = false;
      row.original_fee_defendent = row.fee_defendent;
      row.original_fee_ud = row.fee_ud;
      ElMessage({
        message: 'This fields have been edited',
        type: 'success'
      });
    },
    handleFilter() {
      this.listQuery.page = 1;
      this.getList();
    },

    fetchShortName(queryString, cb) {
      const results = queryString
        ? this.list.filter(item => item.serviceable_area.toLowerCase().includes(queryString.toLowerCase()))
        : this.list;
      cb(results.map(item => ({ value: item.serviceable_area })));
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
