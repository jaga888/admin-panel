<template>
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
            <h3>Courtroom</h3>
              <el-form-item label="Court">
                <el-select
                    v-model="postForm.court"
                    placeholder="Select Court"
                    requiered
                >
                  <el-option label="Alamance County Clerk of Court" value="Alamance County Clerk of Court"/>
                      <el-option label="Albemarle General District Court" value="Albemarle General District Court"/>
                      <el-option label="Amelia County General District Court – Civil Division" value="Amelia County General District Court – Civil Division"/>
                      <el-option label="Beaufort County Courthouse" value="Beaufort County Courthouse"/>
                      <el-option label="Bedford General District Court" value="Bedford General District Court"/>
                      <el-option label="Bladen County Courthouse" value="Bladen County Courthouse"/>
                      <el-option label="Botetourt General District Court" value="Botetourt General District Court"/>
                      <el-option label="Brunswick County Clerk of Court" value="Brunswick County Clerk of Court"/>
                      <el-option label="Buncombe County Courthouse" value="Buncombe County Courthouse"/>
                      <el-option label="Burke County Courthouse" value="Burke County Courthouse"/>
                      <el-option label="Cabarrus County Clerk of Court" value="Cabarrus County Clerk of Court"/>
                      <el-option label="Caroline General District Court" value="Caroline General District Court"/>
                      <el-option label="Catawba County Clerk of Court" value="Catawba County Clerk of Court"/>
                      <el-option label="Catawba County Government Center" value="Catawba County Government Center"/>
                      <el-option label="Catawba/Ebenezer Magistrate" value="Catawba/Ebenezer Magistrate"/>
                      <el-option label="Cayce-West Columbia Magistrate" value="Cayce-West Columbia Magistrate"/>
                      <el-option label="Charles City General District Court" value="Charles City General District Court"/>
                      <el-option label="Charlottesville General District Court" value="Charlottesville General District Court"/>
                      <el-option label="Chatham County Justice Center" value="Chatham County Justice Center"/>
                      <el-option label="Chesapeake General District Court" value="Chesapeake General District Court"/>
                      <el-option label="Chesterfield General District Court" value="Chesterfield General District Court"/>
                      <el-option label="Chick Springs Summary Court" value="Chick Springs Summary Court"/>
                      <el-option label="Cobb County Magistrate Court" value="Cobb County Magistrate Court"/>
                      <el-option label="Colonial Heights General District Court" value="Colonial Heights General District Court"/>
                      <el-option label="Craven County Courthouse" value="Craven County Courthouse"/>
                      <el-option label="Culpeper General District Court" value="Culpeper General District Court"/>
                      <el-option label="Cumberland County Clerk of Court" value="Cumberland County Clerk of Court"/>
                      <el-option label="Cumberland County Courthouse" value="Cumberland County Courthouse"/>
                      <el-option label="Cumberland General and Juvenile and Domestic Relations District Combined Courts" value="Cumberland General and Juvenile and Domestic Relations District Combined Courts"/>
                      <el-option label="Davidson County Clerk of Court" value="Davidson County Clerk of Court"/>
                      <el-option label="Davie County Courthouse" value="Davie County Courthouse"/>
                      <el-option label="Dentsville Magistrate" value="Dentsville Magistrate"/>
                      <el-option label="Dinwiddie General and Juvenile and Domestic Relations District Combined Courts" value="Dinwiddie General and Juvenile and Domestic Relations District Combined Courts"/>
                      <el-option label="East Cooper Magistrate" value="East Cooper Magistrate"/>
                      <el-option label="Edgecombe County Clerk of Court" value="Edgecombe County Clerk of Court"/>
                      <el-option label="Forsyth County Clerk of Court" value="Forsyth County Clerk of Court"/>
                      <el-option label="Franklin County Clerk of Court" value="Franklin County Clerk of Court"/>
                      <el-option label="Hampton General District Court" value="Hampton General District Court"/>
                      <el-option label="Newport News General District Court" value="Newport News General District Court"/>
                      <el-option label="Norfolk General District Court" value="Norfolk General District Court"/>
                      <el-option label="Orange County Clerk of Court" value="Orange County Clerk of Court"/>
                      <el-option label="Salem General District Court" value="Salem General District Court"/>
                      <el-option label="Stanly County Clerk of Court" value="Stanly County Clerk of Court"/>
                      <el-option label="Summerville Magistrate" value="Summerville Magistrate"/>
                      <el-option label="Surry General District Court" value="Surry General District Court"/>
                      <el-option label="Union County Clerk of Court" value="Union County Clerk of Court"/>
                      <el-option label="Union County Courthouse" value="Union County Courthouse"/>
                      <el-option label="Virginia Beach General District Court" value="Virginia Beach General District Court"/>
                      <el-option label="Wake County Clerk of Court" value="Wake County Clerk of Court"/>
                      <el-option label="Warren General District Court" value="Warren General District Court"/>
                      <el-option label="Watauga County Courthouse" value="Watauga County Courthouse"/>
                      <el-option label="Wayne County Courthouse" value="Wayne County Courthouse"/>
                      <el-option label="Waynesboro General District Court" value="Waynesboro General District Court"/>
                      <el-option label="West Ashley Magistrate" value="West Ashley Magistrate"/>
                      <el-option label="Westmoreland General District Court" value="Westmoreland General District Court"/>
                      <el-option label="Wilson County Clerk of Court" value="Wilson County Clerk of Court"/>
                      <el-option label="York General District Court" value="York General District Court"/>
                </el-select>
              </el-form-item>
            <el-form-item label="Room" prop="room">
              <el-checkbox v-model="isRoomByDefault">By default</el-checkbox>
              <el-input
                  :disabled="isRoomByDefault"
                  v-model="postForm.room"
                  placeholder="Enter Room"
                  requiered
              />
            </el-form-item>
          </el-col>
        </el-row>
      </div>
    </el-form>
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
const isRoomByDefault = ref(false);

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
