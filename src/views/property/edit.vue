<template>
  <property-detail :is-edit="true"/>
</template>

<script>
import { defineComponent } from 'vue';
import PropertyDetail from '@/views/property/components/PropertyDetail.vue';

export default defineComponent({
  name: 'EditForm',
  components: { PropertyDetail }
});
</script>

