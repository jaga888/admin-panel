<template>
  <courtroom-detail :is-edit="true" :existingData="existingData"/>
</template>

<script>
import { defineComponent } from 'vue';
import CourtroomDetail from './components/CourtroomDetail.vue';

export default defineComponent({
  name: 'EditForm',
  components: { CourtroomDetail },
  data() {
    return {
      existingData: {
        court: 'Albemarle General District Court',
        room: 'Room A'
      }
    };
  }
});
</script>

