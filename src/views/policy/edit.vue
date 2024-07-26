<template>
  <policy-detail :is-edit="true" :existingData="existingData"/>
</template>

<script>
import { defineComponent } from 'vue';
import PolicyDetail from './components/PolicyDetail.vue';

export default defineComponent({
  name: 'EditForm',
  components: { PolicyDetail },
  data() {
    return {
      existingData: {
        policy_name: 'Reduce Attorney Fee to 25%',
        description: 'Automatically adjust all UD Attorney Fees if they exceed 25% of Rent + Late.'
      }
    };
  }
});
</script>

