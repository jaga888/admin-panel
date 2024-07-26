<template>
  <policy-detail :is-edit="false" />
</template>

<script>
import { defineComponent } from 'vue';
import PolicyDetail from './components/PolicyDetail.vue';

export default defineComponent({
  name: 'CreatePolicy',
  components: { PolicyDetail }
});
</script>

