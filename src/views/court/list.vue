<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
          v-model="listQuery.name"
          placeholder="Name"
          style="width: 200px; margin-right: 15px"
          class="filter-item"
          clearable
          @input="handleFilter"
      />
      <el-autocomplete
          v-model="listQuery.shortName"
          :fetch-suggestions="fetchShortName"
          :trigger-on-focus="false"
          placeholder="Short Name"
          style="width: 200px; margin-right: 15px"
          class="filter-item"
          clearable
          @select="handleFilter"
      />
      <el-select
          v-model="listQuery.city"
           placeholder="Select City"
           style="width: 140px; margin-right: 15px"
           class="filter-item"
           clearable
           @change="handleFilter"
      >
        <el-option v-for="item in cityOptions" :key="item" :label="item" :value="item"/>
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
      <router-link :to="'/court/edit/'+0">
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
      <el-table-column width="420px" align="center" label="Name">
        <template v-slot="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column width="420px" align="center" label="Short Name">
        <template v-slot="scope">
          <span>{{ scope.row.short_name }}</span>
        </template>
      </el-table-column>
      <el-table-column width="200px" align="center" label="City">
          <template v-slot="scope">
          <span>{{ scope.row.city }}</span>
        </template>
      </el-table-column>
      <el-table-column width="415px" align="center" label="Address">
        <template v-slot="scope">
          <span>{{ scope.row.address }}</span>
        </template>
      </el-table-column>
      <el-table-column width="155" align="center" label="Actions">
        <template v-slot="scope">
          <router-link :to="'/court/edit/'+scope.row.id">
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
import Pagination from '@/components/Pagination';

export default defineComponent({
  name: 'CourtsList',
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
        name: '',
        shortName: '',
        city: '',
        address: ''
      },
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      cityOptions: [],
      temp: {
        name: '',
        shortName: '',
        type: '',
        city: ''
      },
      downloadLoading: false,
      pvData: [],
      createdTimes: 0,
      data: [
        {
          id: 1,
          name: 'Albemarle General District Court',
          short_name: 'Alamance',
          address: '1 Court Square',
          city: 'Graham'
        },
        {
          id: 2,
          name: 'Onslow County Clerk of Court',
          short_name: 'Onslow',
          address: '625 Court Street',
          city: 'Jacksonville'
        },
        {
          id: 3,
          name: 'Westmoreland General District Courtarle',
          short_name: 'Westmoreland',
          address: '175 Polk Street, P.O. Box 688',
          city: 'Montross'
        },
        {
          id: 4,
          name: 'Franklin County General District Court',
          short_name: 'Franklin',
          address: 'P.O. Box 569, 275 South Main Street, Suite 111',
          city: 'Rocky Mount'
        },
        {
          id: 5,
          name: 'Franklin County Clerk of Court',
          short_name: 'Franklin',
          address: '102 South Main Street',
          city: 'Louisburg'
        },
        {
          id: 6,
          name: 'Amelia County General District Court – Civil Division',
          short_name: 'Amelia',
          address: 'P.O. Box 24, 16441 Court Street',
          city: 'Amelia'
        }
      ]
    };
  },
  created() {
    this.getList();
    this.setCityOptions();
  },
  methods: {
    getList() {
      this.listLoading = true;

      let filteredData = this.data.filter(item => {
        const matchesName = this.listQuery.name.toLowerCase() ? item.name.toLowerCase().includes(this.listQuery.name.toLowerCase()) : true;
        const matchesShortName = this.listQuery.shortName.toLowerCase() ? item.short_name.toLowerCase().includes(this.listQuery.shortName.toLowerCase()) : true;
        const matchesCity = this.listQuery.city ? item.city === this.listQuery.city : true;
        return matchesName && matchesShortName && matchesCity;
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
    setCityOptions() {
      const data = [
        { city: 'Graham' },
        { city: 'Jacksonville' },
        { city: 'Montross' },
        { city: 'Louisburg' }
      ];
      const cities = data.map(item => item.city);
      this.cityOptions = Array.from(new Set(cities));
    },
    fetchShortName(queryString, cb) {
      const results = queryString
        ? this.list.filter(item => item.short_name.toLowerCase().includes(queryString.toLowerCase()))
        : this.list;
      cb(results.map(item => ({ value: item.short_name })));
    }
  }
});
</script>

<style scoped>

</style>
