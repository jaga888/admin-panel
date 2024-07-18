<template>
  <court-detail :is-edit="true" />
</template>

<script>
import { defineComponent } from 'vue';
import CourtDetail from './components/CourtDetail.vue';

export default defineComponent({
  name: 'EditForm',
  components: { CourtDetail }
});
</script>

