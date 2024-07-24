<template>
  <sticky :z-index="10" :class-name="'sub-navbar '+postForm.status">
    <span>{{postForm.document_name}}</span>
    <el-button v-loading="loading" style="margin-left: 10px;" type="success" @click="submitForm">
      Save
    </el-button>
    <el-button v-loading="loading" type="warning">
      Reset
    </el-button>
  </sticky>
  <div class="createPost-container">
    <el-form class="form-container" label-position="top">
      <div class="createPost-main-container">
        <el-row>
          <el-col :span="22">
            <h3>NFPR VA Weinstein CARES
            ( values here override "NFPR" values )</h3>
            <el-form-item label="'Notice of failure to pay rent' document title " prop="identifier">
             <Tinymce
                ref="editor"
                v-model="postForm.content"
                :height="100"
                :width="645"
              />
            </el-form-item>
            <el-form-item label="'Notice of failure to pay rent' section title" prop="content" style="margin-bottom: 30px;">
              <Tinymce :height="100" :width="645" placeholder="NOTICE OF FAILURE TO PAY RENT" aria-valuetext="asd"/>
            </el-form-item>
            <el-form-item label="'Notice of failure to pay rent' section text" prop="content" style="margin-bottom: 30px;">
              <Tinymce ref="editor" v-model="postForm.content" :height="100" :width="645" model-value=""/>
            </el-form-item>
            <el-form-item label = "'Notice of failure to pay rent' (with 'allow_notice_claim_creation' policy) section title" prop="content" style="margin-bottom: 30px;">
              <Tinymce ref="editor" v-model="postForm.content" :height="100" :width="645" model-value=""/>
            </el-form-item>
            <el-form-item label="'Notice of failure to pay rent' (with 'allow_notice_claim_creation' policy) section text" prop="content" style="margin-bottom: 30px;">
              <Tinymce ref="editor" v-model="postForm.content" :height="100" :width="645" model-value=""/>
            </el-form-item>
            <el-form-item label="'Note' section text" prop="content" style="margin-bottom: 30px;">
              <Tinymce ref="editor" v-model="postForm.content" :height="100" :width="645" model-value=""/>
            </el-form-item>
            <el-form-item label = "'Acceptance of rent with reservation' section title" prop="content" style="margin-bottom: 30px;">
              <Tinymce ref="editor" v-model="postForm.content" :height="100" :width="645" model-value=""/>
            </el-form-item>
            <el-form-item label="'Acceptance of rent with reservation' section text" prop="content" style="margin-bottom: 30px;">
              <Tinymce ref="editor" v-model="postForm.content" :height="100" :width="645" model-value=""/>
            </el-form-item>
            <el-form-item label="If you fail to pay in full' section title" prop="content" style="margin-bottom: 30px;">
              <Tinymce ref="editor" v-model="postForm.content" :height="100" :width="645" model-value=""/>
            </el-form-item>
            <el-form-item label = "'If you fail to pay in full' section text" prop="content" style="margin-bottom: 30px;">
              <Tinymce ref="editor" v-model="postForm.content" :height="100" :width="645" model-value=""/>
            </el-form-item>
            <el-form-item label="'Reservation of right to amend' section title " prop="content" style="margin-bottom: 30px;">
              <Tinymce ref="editor" v-model="postForm.content" :height="100" :width="645" model-value=""/>
            </el-form-item>
            <el-form-item label="Reservation of right to amen' section text " prop="content" style="margin-bottom: 30px;">
              <Tinymce ref="editor" v-model="postForm.content" :height="100" :width="645" model-value=""/>
            </el-form-item>
            <el-form-item label = "'Legal aid' section title" prop="content" style="margin-bottom: 30px;">
              <Tinymce ref="editor" v-model="postForm.content" :height="100" :width="645" model-value=""/>
            </el-form-item>
            <el-form-item label="'Legal aid' section text" prop="content" style="margin-bottom: 30px;">
              <Tinymce ref="editor" v-model="postForm.content" :height="100" :width="645" model-value=""/>
            </el-form-item>
            <el-form-item label="'Your property' section title " prop="content" style="margin-bottom: 30px;">
              <Tinymce ref="editor" v-model="postForm.content" :height="100" :width="645" model-value=""/>
            </el-form-item>
            <el-form-item label = "'Your property' section text " prop="content" style="margin-bottom: 30px;">
              <Tinymce ref="editor" v-model="postForm.content" :height="100" :width="645" model-value=""/>
            </el-form-item>
            <el-form-item label="'No duty to vacate' section title " prop="content" style="margin-bottom: 30px;">
              <Tinymce ref="editor" v-model="postForm.content" :height="100" :width="645" model-value=""/>
            </el-form-item>
            <el-form-item label="'No duty to vacate' section text" prop="content" style="margin-bottom: 30px;">
              <Tinymce ref="editor" v-model="postForm.content" :height="100" :width="645" model-value=""/>
            </el-form-item>
            <el-form-item label = "'CARES act' section title" prop="content" style="margin-bottom: 30px;">
              <Tinymce ref="editor" v-model="postForm.content" :height="100" :width="645" model-value=""/>
            </el-form-item>
            <el-form-item label="'CARES act' section text" prop="content" style="margin-bottom: 30px;">
              <Tinymce ref="editor" v-model="postForm.content" :height="100" :width="645" model-value=""/>
            </el-form-item>
            <el-form-item label="I hereby certify' section title " prop="content" style="margin-bottom: 30px;">
              <Tinymce ref="editor" v-model="postForm.content" :height="100" :width="645" model-value=""/>
            </el-form-item>
            <el-form-item label = "'I hereby certify' (with 'posts_notices' policy) section text" prop="content" style="margin-bottom: 30px;">
              <Tinymce ref="editor" v-model="postForm.content" :height="100" :width="645" model-value=""/>
            </el-form-item>
            <el-form-item label="'I hereby certify' (without 'posts_notices' policy) section text" prop="content" style="margin-bottom: 30px;">
              <Tinymce ref="editor" v-model="postForm.content" :height="100" :width="645" model-value=""/>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
    </el-form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Tinymce from '@/components/Tinymce';
import Sticky from '@/components/Sticky';
import { ElNotification } from 'element-plus';

const props = defineProps({
  isEdit: {
    type: Boolean,
    required: true
  },
  existingData: {
    type: Object,
    default: () => ({})
  }
});

const postForm = ref(props.existingData);

const submitForm = () => {
  console.log('Form submitted', postForm.value);
  ElNotification({
    title: 'Success',
    message: 'Property successfully saved',
    type: 'success',
    duration: 2000
  });
};
const loading = ref(false);

// const defaultForm = {
//   status: 'draft',
//   id: undefined,
//   platforms: ['a-platform'],
//   comment_disabled: false,
//   importance: 0,
//   // Additional fields
//   legalName: 'The Community of Donje, LLC',
//   name: '',
//   identifier: '',
//   address: '',
//   city: '',
//   state: '',
//   zip: '',
//   sameAsPropertyAddress: false,
//   invoiceAddress1: '',
//   invoiceAddress2: '',
//   invoiceCity: '',
//   invoiceState: '',
//   invoiceZip: '',
//   invoiceEmail: '',
//   contactName: '',
//   contactPhone: '',
//   contactEmail: '',
//   nfprDelivery: false,
//   noaDelivery: false,
//   uploadCourtDocket: false,
//   zeroDollarAttyFee: false,
//   preApproveCourtDocket: false,
//   caresActApproval: false,
//   splitCaresActCharge: false,
//   caresAct: false,
//   singleFamilyProperty: false,
//   clientCreatesNfprs: false,
//   clientCreatesUds: false,
//   allowUdChecklist: false,
//   apiRecordTransfer: false,
//   postsNotices: false,
//   attorneyFeePercentageLimit: false,
//   diyClientCreatesClaims: false,
//   diyClientAmendsClaims: false,
//   forceUnitAddressSelection: false,
//   newArtcraftImportLogic: false,
//   uploadSeImportFiles: false,
//   automaticallyReadyWrits: false,
//   clientAmendsClaims: false,
//   doNotRequireUdMilitaryStatus: false,
//   preApproveNoticesOfNoncompliance: false,
//   uploadImportFiles: false,
//   eSignNotices: false,
//   preApproveSummons: false,
//   uploadUdImportFiles: false,
//   reduceAttorneyFee: false,
//   uploadNonImportFiles: false,
//   generateUnswornDeclaration: false,
//   alwaysSendAmendedNotice: false,
//   nonNotGeneratedInSenex: false,
//   ignoreUdWaitingPeriod: false,
//   allowMulti: false,
//   automaticallyReadyWritsAbove500: false,
//   addPossessionToPrintedDocket: false,
//   propertyManagementSoftware: '',
//   clientWebsite: '',
//   udFilingThreshold: ''
// };
//
// export default defineComponent({
//   name: 'PropertyDetail',
//   // eslint-disable-next-line vue/no-unused-components
//   components: { NoteEdit, SingleImageUpload, Tinymce, MDinput, Upload, Sticky, CommentDropdown, PlatformDropdown, SourceUrlDropdown, TabPanel },
//   props: {
//     isEdit: {
//       type: Boolean,
//       default: false
//     }
//   },
//   data() {
//     const validateRequire = (rule, value, callback) => {
//       if (value === '') {
//         ElMessage({
//           message: rule.field + 'required',
//           type: 'error'
//         });
//         callback(new Error(rule.field + 'required'));
//       } else {
//         callback();
//       }
//     };
//     const validateSourceUri = (rule, value, callback) => {
//       if (value) {
//         if (validURL(value)) {
//           callback();
//         } else {
//           ElMessage({
//             message: 'invalid URL',
//             type: 'error'
//           });
//           callback(new Error('invalid URL'));
//         }
//       } else {
//         callback();
//       }
//     };
//     return {
//       postForm: Object.assign({}, defaultForm),
//       loading: false,
//       userListOptions: [],
//       rules: {
//         image_uri: [{ validator: validateRequire }],
//         title: [{ validator: validateRequire }],
//         content: [{ validator: validateRequire }],
//         source_uri: [{ validator: validateSourceUri, trigger: 'blur' }]
//       },
//       tempRoute: {},
//       tabMapOptions: [
//         { label: 'Info', key: 'info' },
//         { label: 'Files', key: 'files' },
//         { label: 'Notes', key: 'notes' }
//       ],
//       activeName: 'info',
//       createdTimes: 0
//     };
//   },
//   computed: {
//     contentShortLength() {
//       return this.postForm.content_short.length;
//     },
//     displayTime: {
//       get() {
//         return (+new Date(this.postForm.display_time));
//       },
//       set(val) {
//         this.postForm.display_time = new Date(val);
//       }
//     }
//   },
//   created() {
//     if (this.isEdit) {
//       const id = this.$route.params && this.$route.params.id;
//       this.fetchData(id);
//     }
//
//     this.tempRoute = Object.assign({}, this.$route);
//
//     if (window._XMLHttpRequest) {
//       var xhr = new window._XMLHttpRequest();
//       window.XMLHttpRequest.prototype.upload = xhr.upload;
//     }
//   },
//   methods: {
//     fetchData(id) {
//       fetchArticle(id).then(response => {
//         this.postForm = response.data;
//
//         this.setTagsViewTitle();
//         this.setPageTitle();
//       }).catch(err => {
//         console.log(err);
//       });
//     },
//     setTagsViewTitle() {
//       const title = 'Edit Article';
//       const route = Object.assign({}, this.tempRoute, { title: `${title}-${this.postForm.id}` });
//       this.$store.dispatch('tagsView/updateVisitedView', route);
//     },
//     setPageTitle() {
//       const title = 'Edit Article';
//       document.title = `${title} - ${this.postForm.id}`;
//     },
//     submitForm() {
//       this.$refs.postForm.validate(valid => {
//         if (valid) {
//           this.loading = true;
//           ElNotification({
//             title: 'Success',
//             message: 'Property successfully saved',
//             type: 'success',
//             duration: 2000
//           });
//           this.postForm.status = 'published';
//           this.loading = false;
//         } else {
//           console.log('error submit!');
//           return false;
//         }
//       });
//     },
//     draftForm() {
//       if (this.postForm.content.length === 0 || this.postForm.title.length === 0) {
//         ElMessage({
//           message: 'Fill required fields',
//           type: 'warning'
//         });
//         return;
//       }
//       ElMessage({
//         message: 'Saved successfully',
//         type: 'success',
//         showClose: true,
//         duration: 1000
//       });
//       this.postForm.status = 'draft';
//     },
//     getRemoteUserList(query) {
//       searchUser(query).then(response => {
//         if (!response.data.items) return;
//         this.userListOptions = response.data.items.map(v => v.name);
//       });
//     }
//   }
// });
</script>

<style lang="scss" scoped>
@import "@/styles/mixin.scss";

.createPost-container {
  padding: 20px;
  display: flex;
  justify-content: center;
  background-color: rgba(33, 241, 61, 0.1);
}

.form-container {
  width: 100%;
  max-width: 800px;
}

.form-group {
  margin-bottom: 10px;
}

.el-row {
  margin-bottom: 10px;
}

.el-form-item {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}

.el-row {
  display: flex;
  justify-content: center;
}

.el-form-item label {
  margin-bottom: 5px;
}

.createPost-main-container {
  display: flex;
  flex-direction: column;
}

h3 {
  font-size: 18px;
  margin-bottom: 10px;
}

.sub-navbar {
  display: flex;
  align-items: center;
  padding: 10px;
  background: #f5f5f5;
  border-bottom: 1px solid #dcdcdc;
  position: sticky;
  top: 0;
  z-index: 1000;
}

.sub-navbar .el-button {
  margin-right: 10px;
}

.el-checkbox {
  display: block;
  margin-bottom: 10px;
}

@import "@/styles/mixin.scss";

.createPost-container {
  position: relative;

  :deep(.sub-navbar) {
    display: flex;
    align-items: center;
    justify-content: right;
  }

  .createPost-main-container {
    padding: 40px 45px 20px 50px;

    .postInfo-container {
      position: relative;
      @include clearfix;
      margin-bottom: 10px;

      .postInfo-container-item {
        float: left;
      }
    }
  }

  .word-counter {
    width: 40px;
    position: absolute;
    right: 10px;
    top: 0px;
  }
}

.article-textarea {
  :deep(textarea) {
    padding-right: 40px;
    resize: none;
    border: none;
    border-radius: 0px;
    border-bottom: 1px solid #bfcbd9;
  }
}
</style>
