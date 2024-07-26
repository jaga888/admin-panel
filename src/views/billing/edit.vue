<template>
  <billing-detail :is-edit="true" :existingData="existingData"/>
</template>

<script>
import { defineComponent } from 'vue';
import BillingDetail from './components/BillingDetail.vue';

export default defineComponent({
  name: 'EditForm',
  components: { BillingDetail },
  data() {
    return {
      existingData: {
        invoices: '',
        summary: '',
        report: ''
      }
    };
  }
});
</script>

