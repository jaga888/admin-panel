<template>
  <documents-text-detail :is-edit="true" :existingData="existingData"/>
</template>

<script>
import { defineComponent } from 'vue';
import documentsTextDetail from '@/views/documents-text/components/DocumentsTextDetail.vue';

export default defineComponent({
  name: 'EditForm',
  components: { documentsTextDetail },
  data() {
    return {
      existingData: {
        identifier: 'NFPR VA Weinstein CARES',
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

