<template>
  <property-detail :is-edit="false" />
</template>

<script>
import { defineComponent } from 'vue';
import PropertyDetail from './components/DocumentsTextDetail.vue';

export default defineComponent({
  name: 'CreateProperty',
  components: { PropertyDetail }
});
</script>

