<template>
  <div class="tab-container">
    <sticky :z-index="10" :class-name="'sub-navbar '+postForm.status">
      <el-button v-loading="loading" style="margin-left: 10px;" type="success" @click="submitForm">
        Save
      </el-button>
      <el-button v-loading="loading" type="warning" @click="draftForm">
        Reset
      </el-button>
    </sticky>
    <div class="createPost-container">
      <el-form :rules="rules" class="form-container" label-position="top">
        <div class="createPost-main-container">
          <el-row>
            <el-col :span="22">
              <h3>Agency</h3>
              <el-form-item label="Name" prop="name">
                <el-input
                    v-model="postForm.name"
                    placeholder="Name"
                    requiered
                />
              </el-form-item>
              <el-form-item label="Short Name" prop="shortName">
                <el-input
                    v-model="postForm.shortName"
                    placeholder="Short Name"
                    requiered
                />
              </el-form-item>
              <el-form-item label="Full Name" prop="fullName">
                <el-input
                    v-model="postForm.fullName"
                    placeholder="Full Name"
                    requiered
                />
              </el-form-item>
              <el-form-item label="Order" prop="order">
                <el-input
                    v-model="postForm.order"
                    placeholder="Order"
                    requiered
                />
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Sticky from '@/components/Sticky/index.vue';
// import { validURL } from '@/utils/validate';
// import { fetchArticle } from '@/api/article';
// import { searchUser } from '@/api/remote-search';
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
    message: 'User successfully saved',
    type: 'success',
    duration: 2000
  });
};

const loading = ref(false);
const activeName = ref('info');
const dialogVisible = ref(false);
const dialogImageUrl = ref('');
// const defaultForm = {
//   firstName: '',
//   lastName: '',
//   role: '',
//   email: ''
// };
// export default defineComponent({
//   name: 'PropertyDetail',
//   components: { Sticky },
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
//       const title = 'Edit Court';
//       const route = Object.assign({}, this.tempRoute, { title: `${title}-${this.postForm.id}` });
//       this.$store.dispatch('tagsView/updateVisitedView', route);
//     },
//     setPageTitle() {
//       const title = 'Edit Court';
//       document.title = `${title} - ${this.postForm.id}`;
//     },
//     submitForm() {
//       this.$refs.postForm.validate(valid => {
//         if (valid) {
//           this.loading = true;
//           ElNotification({
//             title: 'Success',
//             message: 'Court successfully saved',
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
@import "@/styles/mixin";

.createPost-container {
  padding: 20px;
  display: flex;
  justify-content: center;
  background-color: rgba(33, 241, 61, 0.1);
}

.form-container {
  width: 100%;
  max-width: 800px; /* Добавьте максимальную ширину для формы */
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
</style>
