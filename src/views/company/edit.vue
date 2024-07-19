<template>
  <article-detail :is-edit="true" :existingData="existingData"/>
</template>

<script>
import { defineComponent } from 'vue';
import ArticleDetail from '@/views/company/components/CompanyDetail.vue';

export default defineComponent({
  name: 'EditForm',
  components: { ArticleDetail },
  data() {
    return {
      existingData: {
        legalName: 'The Community of Donje, LLC',
        name: 'Donje\'s Digs',
        identifier: '',
        address: '100 Awesome Lane',
        city: 'Newport',
        state: 'VA',
        zip: '23601',
        sameAsPropertyAddress: 'checked',
        contactName: 'Donje',
        contactPhone: '100 Awesome Lane',
        contactEmail: 'donje.putnam@senexlaw.com',
        nfprDelivery: true,
        caresActApproval: true,
        clientCreatesClaims: true,
        propertyManagementSoftware: 'RealPage',
        clientWebsite: 'www.',
        udFilingThreshold: '500'
      }
    };
  }
});
</script>

