<template>
  <unit-detail :is-edit="true" :existingData="existingData"/>
</template>

<script>
import { defineComponent } from 'vue';
import UnitDetail from '@/views/unit/components/UnitDetail.vue';

export default defineComponent({
  name: 'EditForm',
  components: { UnitDetail },
  data() {
    return {
      existingData: {
        identifier: 'c1cc-772-10',
        address: '772 Castle Court',
        property_name: 'Abbington Crossing I, LLC t/a Abbington Crossing',
        city: 'Newport',
        state: 'VA',
        zip: '23601',
        status: 'active'
      }
    };
  }
});
</script>

