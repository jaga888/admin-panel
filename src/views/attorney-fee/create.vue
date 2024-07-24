<template>
  <attorney-fee-detail :is-edit="false" />
</template>

<script>
import { defineComponent } from 'vue';
import AttorneyFeeDetail from './components/AttorneyFeeDetail.vue';

export default defineComponent({
  name: 'CreateUser',
  components: { AttorneyFeeDetail }
});
</script>

