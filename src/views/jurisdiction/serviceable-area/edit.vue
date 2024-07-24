<template>
  <serviceable-area-detail :is-edit="true" :existingData="existingData"/>
</template>

<script>
import { defineComponent } from 'vue';
import ServiceableAreaDetail from './components/ServiceableAreaDetail.vue';

export default defineComponent({
  name: 'EditForm',
  components: { ServiceableAreaDetail },
  data() {
    return {
      existingData: {
        city: 'Bedford',
        MarstonAgency: true
      }
    };
  }
});
</script>

