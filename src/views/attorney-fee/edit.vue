<template>
  <attorney-fee-detail :is-edit="true" :existingData="existingData"/>
</template>

<script>
import { defineComponent } from 'vue';
import AttorneyFeeDetail from './components/AttorneyFeeDetail.vue';

export default defineComponent({
  name: 'EditForm',
  components: { AttorneyFeeDetail },
  data() {
    return {
      existingData: {
        scope_type: 'State',
        scope_id: 'Nichole',
        fd: '150,30',
        ud: '200,99',
        ud_external: '300,50',
        writOfEviction: '400,20',
        attorney_name: 'John'
      }
    };
  }
});
</script>

