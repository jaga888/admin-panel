<template>
  <court-detail :is-edit="true" :existingData="existingData"/>
</template>

<script>
import { defineComponent } from 'vue';
import CourtDetail from './components/CourtDetail.vue';

export default defineComponent({
  name: 'EditForm',
  components: { CourtDetail },
  data() {
    return {
      existingData: {
        name: 'Albemarle General District Court',
        shortName: 'Albemarle',
        city: 'Bedford',
        address: '501 East Jefferson Street, Suite 138'
      }
    };
  }
});
</script>

