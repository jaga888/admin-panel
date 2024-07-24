<template>
  <tinymce>
  </tinymce>
</template>

<script>
import { defineComponent } from 'vue';
import Tinymce from '@/components/Tinymce/index.vue';

export default defineComponent({
  name: 'NoteEdit',
  components: { Tinymce }
});
</script>
