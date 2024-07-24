<template>
  <agency-detail :is-edit="true" :existingData="existingData"/>
</template>

<script>
import { defineComponent } from 'vue';
import AgencyDetail from './components/AgencyDetail.vue';

export default defineComponent({
  name: 'EditForm',
  components: { AgencyDetail },
  data() {
    return {
      existingData: {
        name: 'Marston',
        shortName: 'Marston',
        fullName: 'Marston',
        order: '4'
      }
    };
  }
});
</script>

