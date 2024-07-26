<template>
  <billing-detail :is-edit="false" />
</template>

<script>
import { defineComponent } from 'vue';
import BillingDetail from './components/BillingDetail.vue';

export default defineComponent({
  name: 'CreateBilling',
  components: { BillingDetail }
});
</script>

