<template>
  <div class="tab-container">
    <el-tabs v-model="activeName" style="margin-top:15px;" type="border-card">
      <el-tab-pane label="Info" name="info">
        <keep-alive>
          <div v-if="activeName === 'info'">
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
                      <h3>Court</h3>
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
                      <el-form-item label="City">
                        <el-select
                            v-model="postForm.city"
                            placeholder="Select City"
                            requiered
                        >
                          <el-option label="Albemarle" value="Albemarle"/>
                              <el-option label="Amelia" value="mri"/>
                              <el-option label="Bedford" value="realpage"/>
                              <el-option label="Botetourt" value="yardi"/>
                              <el-option label="Caroline" value="Caroline"/>
                              <el-option label="Charles City" value="Charles City"/>
                              <el-option label="Chesapeake" value="Chesapeake"/>
                              <el-option label="Chesterfield" value="Chesterfield"/>
                              <el-option label="Coloniai Heights" value="Coloniai Heights"/>
                              <el-option label="Culpeper" value="Culpeper"/>
                              <el-option label="Cumberland" value="Cumberland"/>
                              <el-option label="Dinwiddie" value="Dinwiddie"/>
                              <el-option label="Essex" value="Essex"/>
                              <el-option label="Fairfax County" value="Fairfax"/>
                              <el-option label="Fauquier" value="Fauquier"/>
                              <el-option label="Franklin" value="Franklin"/>
                              <el-option label="Franklin City" value="Franklin City"/>
                              <el-option label="Frederickburg" value="Frederickburg"/>
                              <el-option label="Gloucester" value="Gloucester"/>
                              <el-option label="Goochland" value="Goochland"/>
                              <el-option label="Hampton" value="Hampton"/>
                              <el-option label="Hanover" value="Hanover"/>
                              <el-option label="Henrico" value="Henrico"/>
                              <el-option label="Hopewell" value="Hopewell"/>
                              <el-option label="Isle of Wight" value="unknown"/>
                              <el-option label="King and Queen" value="King and Queen"/>
                              <el-option label="King George" value="King George"/>
                              <el-option label="King William" value="King William"/>
                              <el-option label="Louisa" value="Louisa"/>
                              <el-option label="Lynchburg" value="Lynchburg"/>
                              <el-option label="Mathews" value="Mathews"/>
                              <el-option label="Middlesex" value="Middlesex"/>
                              <el-option label="New Kent" value="New Kent"/>
                              <el-option label="Newport News" value="Newport News"/>
                              <el-option label="Norfolk" value="Norfolk"/>
                              <el-option label="Petersburg" value="Petersburg"/>
                              <el-option label="Portsmouth" value="Portsmouth"/>
                              <el-option label="Powhatan" value="Powhatan"/>
                              <el-option label="Prince Edward" value="Prince Edward"/>
                              <el-option label="Prince George" value="Prince George"/>
                              <el-option label="Prince William" value="Prince William"/>
                              <el-option label="Richmond" value="Richmond"/>
                              <el-option label="Roanoke City" value="Roanoke"/>
                              <el-option label="Rockingham" value="Rockingham"/>
                              <el-option label="Salem" value="Salem"/>
                              <el-option label="Southampton" value="Southampton"/>
                              <el-option label="Spotsylvania" value="Spotsylvania"/>
                              <el-option label="Stafford" value="Stafford"/>
                              <el-option label="Suffolk" value="Suffolk"/>
                              <el-option label="Surry" value="Surry"/>
                              <el-option label="Sussex" value="Sussex"/>
                              <el-option label="Virginia Beach" value="Virginia"/>
                              <el-option label="Warren" value="Warren"/>
                              <el-option label="Waynesboro" value="Waynesboro"/>
                              <el-option label="Westmoreland" value="Westmoreland"/>
                              <el-option label="Williamsburg" value="Williamsburg"/>
                              <el-option label="York" value="York"/>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="Address" prop="address">
                        <el-input
                            v-model="postForm.address"
                            placeholder="Address"
                            requiered
                        />
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
              </el-form>
            </div>
          </div>
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Sticky from '@/components/Sticky';
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
@import "@/styles/mixin.scss";

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
