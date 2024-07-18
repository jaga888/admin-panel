<template>
  <user-detail :is-edit="false" />
</template>

<script>
import { defineComponent } from 'vue';
import UserDetail from './components/AttorneyFeeDetail.vue';

export default defineComponent({
  name: 'CreateUser',
  components: { UserDetail }
});
</script>

