<template>
  <user-detail :is-edit="true" :existingData="existingData" />
</template>

<script>
import { defineComponent } from 'vue';
import UserDetail from './components/UserDetail.vue';

export default defineComponent({
  name: 'EditForm',
  components: { UserDetail },
  data() {
    return {
      existingData: {
        firstName: 'Nichole',
        lastName: 'Drungo',
        role: 'Admin',
        email: 'donje.putnam@senexlaw.com'
      }
    };
  }
});
</script>
