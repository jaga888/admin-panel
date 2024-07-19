<template>
  <article-detail :is-edit="false" />
</template>

<script>
import { defineComponent } from 'vue';
import ArticleDetail from '@/views/company/components/CompanyDetail.vue';

export default defineComponent({
  name: 'CreateArticle',
  components: { ArticleDetail }
});
</script>

