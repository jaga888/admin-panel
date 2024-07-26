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
          v-model="listQuery.description"
          :fetch-suggestions="fetchDescription"
          :trigger-on-focus="false"
          placeholder="Description"
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
      <router-link :to="'/policy/create/'">
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
      <el-table-column width="725px" align="center" label="Name">
        <template v-slot="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column width="725px" align="center" label="Description">
        <template v-slot="scope">
          <span>{{ scope.row.description }}</span>
        </template>
      </el-table-column>
      <el-table-column width="160" align="center" label="Actions">
        <template v-slot="scope">
          <router-link :to="'/policy/edit/'+scope.row.id">
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
  name: 'PoliciesList',
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
        description: ''
      },
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      cityOptions: [],
      temp: {
        name: '',
        description: ''
      },
      downloadLoading: false,
      pvData: [],
      createdTimes: 0,
      data: [
        {
          id: 1,
          name: 'Reduce Attorney Fee to 25%',
          description: 'Automatically adjust all UD Attorney Fees if they exceed 25% of Rent + Late.'
        },
        {
          id: 2,
          name: 'Automatically Ready Writs with Possession',
          description: 'Writs are automatically set to ready when an actual outcome of Immediate Possession is selected.'
        },
        {
          id: 3,
          name: 'Client Amends Claims',
          description: 'These clients have the ability to amend a claim.'
        },
        {
          id: 4,
          name: 'Do Not Require UD Military Status Verification',
          description: 'Allow users to submit a UD request without required resident information for an SCRA search.'
        },
        {
          id: 5,
          name: 'Pre-approve Notices of Noncompliance',
          description: 'Pre-approve Notices of Noncompliance when submitting import files.'
        },
        {
          id: 6,
          name: 'Upload Import Files',
          description: 'Upload files to import data to create claims for processing.'
        },
        {
          id: 30,
          name: 'eSign Notices',
          description: 'Electronically sign and approve notices with the client\'s signature.'
        },
        {
          id: 7,
          name: 'Pre-approve Summons',
          description: 'Pre-approve Summons when submitting import files.'
        },
        {
          id: 8,
          name: 'Upload UD Import Files',
          description: 'Upload files to import Unlawful Detainer data to create claims for processing.'
        },
        {
          id: 9,
          name: 'Upload SE Import Files',
          description: 'Upload files to import Summary Ejectment data to create claims for processing.'
        },
        {
          id: 10,
          name: 'Upload NON Import Files',
          description: 'Upload files to import Notice data to create claims for processing.'
        },
        {
          id: 29,
          name: 'Generate Unsworn Declaration',
          description: 'Regardless of amending, this court will generate an Unsworn Declaration for everyone.'
        },
        {
          id: 11,
          name: 'Always Send - Amended Notice',
          description: 'An Amended Notice will always be generated for any value greater than $0.'
        },
        {
          id: 12,
          name: 'NON Not Generated in Senex',
          description: 'NON Not Generated in Senex'
        },
        {
          id: 13,
          name: 'Ignore UD Waiting Period',
          description: 'Ignore any waiting period that is put on an Unlawful Detainer making it requestable.'
        },
        {
          id: 14,
          name: 'Automatically Ready Writs with Possession above $500',
          description: 'Writs are automatically set to ready if the balance due is greater than $500 when an actual outcome of Immediate Possession is selected.'
        },
        {
          id: 15,
          name: 'Upload Court Docket Import Files',
          description: 'Upload files to import Court Docket data to update claims for court.'
        },
        {
          id: 16,
          name: 'Pre-approve Court Docket',
          description: 'Pre-approve Docket data when submitting import files.'
        },
        {
          id: 17,
          name: 'CARES Act Approval',
          description: ''
        },
        {
          id: 18,
          name: 'CARES Act',
          description: ''
        },
        {
          id: 19,
          name: 'Client Creates NFPRs & Senex Processes',
          description: 'This policy removes the date range from the NFPR.'
        },
        {
          id: 20,
          name: 'Allow UD Checklist',
          description: 'allow_ud_checklist'
        },
        {
          id: 21,
          name: 'API Record Transfer (Entrata Sync)',
          description: 'API integration with PM software that allows clients to create/update/amend their claims on the Notices of Noncompliance page.'
        },
        {
          id: 22,
          name: 'Posts Notices',
          description: 'Hand delivers notices instead of mailing'
        },
        {
          id: 23,
          name: 'Attorney Fee Percentage Limit',
          description: 'Attorney Fee Percentage Limit'
        },
        {
          id: 24,
          name: 'DIY: Client Creates Claims & Client Processes NFPRs',
          description: 'If used with Client Creates NFPRs & Senex Processes then this policy will override who processes and Client will be processor'
        },
        {
          id: 25,
          name: 'Force Unit Address Selection',
          description: 'If the policy is on then the Address field would only be populated with Active Units instead of all units like it is now.'
        },
        {
          id: 26,
          name: 'New Artcraft import logic used',
          description: 'If policy is on then use new logic for importing'
        },
        {
          id: 27,
          name: 'NFPR – Delivery Checkbox',
          description: 'If the policy is on then the special checkbox will be added to the bottom of NFPR / NFPR (CARES) document.'
        },
        {
          id: 28,
          name: 'NOA – Delivery Checkbox',
          description: 'If the policy is on then the special checkbox will be added to the bottom of NOA document.'
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
        const matchesDescription = this.listQuery.description.toLowerCase() ? item.description.toLowerCase().includes(this.listQuery.description.toLowerCase()) : true;
        return matchesName && matchesDescription;
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

    fetchDescription(queryString, cb) {
      const results = queryString
        ? this.list.filter(item => item.description.toLowerCase().includes(queryString.toLowerCase()))
        : this.list;
      cb(results.map(item => ({ value: item.description })));
    }
  }
});
</script>

<style scoped>

</style>
