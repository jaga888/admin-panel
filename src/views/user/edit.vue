<template>
  <user-detail :is-edit="true"/>
</template>

<script>
import { defineComponent } from 'vue';
import UserDetail from './components/UserDetail.vue';

export default defineComponent({
  name: 'EditForm',
  components: { UserDetail }
});
</script>
