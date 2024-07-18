<template>
  <property-detail :is-edit="false" />
</template>

<script>
import { defineComponent } from 'vue';
import PropertyDetail from './components/PropertyDetail.vue';

export default defineComponent({
  name: 'CreateProperty',
  components: { PropertyDetail }
});
</script>

