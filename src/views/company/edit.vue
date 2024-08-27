<template>
  <company-detail :is-edit="true"/>
</template>

<script>
import { defineComponent } from 'vue';
import CompanyDetail from '@/views/company/components/CompanyDetail.vue';

export default defineComponent({
  name: 'EditForm',
  components: { CompanyDetail },
});
</script>

