<template>
  <serviceable-area-detail :is-edit="false" />
</template>

<script>
import { defineComponent } from 'vue';
import ServiceableAreaDetail from './components/ServiceableAreaDetail.vue';

export default defineComponent({
  name: 'ServiceableAreaCourt',
  components: { ServiceableAreaDetail }
});
</script>

