<template>
  <user-detail :is-edit="false" />
</template>

<script>
import { defineComponent } from 'vue';
import UserDetail from './components/UserDetail';

export default defineComponent({
  name: 'CreateUser',
  components: { UserDetail }
});
</script>

