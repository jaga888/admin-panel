<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
          v-model="listQuery.court"
          placeholder="Court"
          style="width: 200px; margin-right: 15px"
          class="filter-item"
          clearable
          @input="handleFilter"
      />
      <el-autocomplete
          v-model="listQuery.room"
          :fetch-suggestions="fetchRoom"
          :trigger-on-focus="false"
          placeholder="Room"
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
      <router-link :to="'/jurisdiction/courtroom/create'">
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
      <el-table-column width="420px" align="center" label="Court">
        <template v-slot="scope">
          <span>{{ scope.row.court }}</span>
        </template>
      </el-table-column>
      <el-table-column width="420px" align="center" label="Room">
        <template v-slot="scope">
          <span>{{ scope.row.room }}</span>
        </template>
      </el-table-column>
      <el-table-column width="160" align="center" label="Actions">
        <template v-slot="scope">
          <router-link :to="'/jurisdiction/courtroom/edit/'+scope.row.id">
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
  name: 'CourtroomsList',
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
        court: '',
        room: ''
      },
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      temp: {
        court: '',
        room: ''
      },
      downloadLoading: false,
      pvData: [],
      createdTimes: 0,
      data: [
        {
          id: 1,
          court: 'Albemarle General District Court',
          room: 'Room A'
        },
        {
          id: 2,
          court: 'Onslow County Clerk of Court',
          room: 'Room C'
        },
        {
          id: 3,
          court: 'Westmoreland General District Courtarle',
          room: 'Room B'
        },
        {
          id: 4,
          court: 'Franklin County General District Court',
          room: 'Room D'
        },
        {
          id: 6,
          court: 'Onslow County Clerk of Court',
          room: 'Room A'
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
        const matchesCourt = this.listQuery.court.toLowerCase() ? item.court.toLowerCase().includes(this.listQuery.court.toLowerCase()) : true;
        const matchesRoom = this.listQuery.room.toLowerCase() ? item.room.toLowerCase().includes(this.listQuery.room.toLowerCase()) : true;
        return matchesCourt && matchesRoom;
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
    fetchRoom(queryString, cb) {
      const results = queryString
        ? this.list.filter(item => item.room.toLowerCase().includes(queryString.toLowerCase()))
        : this.list;
      cb(results.map(item => ({ value: item.room })));
    }
  }
});
</script>

<style scoped>

</style>
