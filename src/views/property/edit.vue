<template>
  <property-detail :is-edit="true" :existingData="existingData"/>
</template>

<script>
import { defineComponent } from 'vue';
import PropertyDetail from '@/views/property/components/PropertyDetail.vue';

export default defineComponent({
  name: 'EditForm',
  components: { PropertyDetail },
  data() {
    return {
      existingData: {
        legalName: 'The Community of Donje, LLC',
        name: 'Donje\'s Digs',
        nickname: '',
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
        dayLimit: '5',
        amount: '100',
        udFilingThreshold: '500'
      }
    };
  }
});
</script>

