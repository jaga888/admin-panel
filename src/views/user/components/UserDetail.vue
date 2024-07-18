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
              <el-button v-loading="loading" type="warning" @click="resetForm">
                Reset
              </el-button>
            </sticky>
            <div class="createPost-container">
              <el-form class="form-container" label-position="top">
                <div class="createPost-main-container">
                  <el-row>
                    <el-col :span="22">
                      <h3>User Name</h3>
                      <el-form-item label="First Name" prop="firstName">
                        <el-input
                          v-model="postForm.firstName"
                          placeholder="First Name"
                          required
                        />
                      </el-form-item>
                      <el-form-item label="Last Name" prop="lastName">
                        <el-input
                          v-model="postForm.lastName"
                          placeholder="Second Name"
                          required
                        />
                      </el-form-item>
                      <el-form-item label="Role" prop="role">
                        <el-select
                          v-model="postForm.role"
                          placeholder="Select Role"
                          required
                        >
                          <el-option label="Admin" value="admin"/>
                          <el-option label="Super-Admin" value="super-admin"/>
                          <el-option label="User" value="User" selected/>
                          <el-option label="Attorney" value="attorney"/>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="22">
                      <div class="form-group">
                        <h3>Email</h3>
                        <el-form-item label="Email" prop="email">
                          <el-input
                            type="text"
                            v-model="postForm.email"
                            placeholder="Enter Email..."
                            required
                          />
                        </el-form-item>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </el-form>
            </div>
          </div>
        </keep-alive>
      </el-tab-pane>
      <el-tab-pane label="Signature" name="signature">
        <keep-alive>
          <div v-if="activeName === 'signature'">
            <h3 style="display:flex; justify-content: center;">File Upload</h3>
            <single-image-upload
              action="/upload"
              list-type="picture-card"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
            >
              <i class="el-icon-plus"></i>
            </single-image-upload>
            <el-dialog v-model:visible="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt=""/>
            </el-dialog>
          </div>
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { defineComponent, ref, reactive, watch, onMounted } from 'vue';
import Sticky from '@/components/Sticky';
import SingleImageUpload from '@/components/Upload/SingleImage.vue';
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
// export default defineComponent({
//   name: 'UserDetail',
//   components: { SingleImageUpload, Sticky },
//   props: {
//     isEdit: {
//       type: Boolean,
//       required: true
//     },
//     existingData: {
//       type: Object,
//       default: () => ({})
//     }
//   },
//   setup(props) {
//     const postForm = reactive({
//       // firstName: props.existingData.firstName,
//       // lastName: props.existingData.lastName,
//       // role: props.existingData.role,
//       // email: props.existingData.email
//     });
//
//     // const initializeForm = () => {
//     //   console.log(props.existingData);
//     //   if (props.isEdit && props.existingData) {
//     //     postForm.firstName = props.existingData.firstName;
//     //     postForm.lastName = props.existingData.lastName;
//     //     postForm.role = props.existingData.role;
//     //     postForm.email = props.existingData.email;
//     //   } else {
//     //     postForm.firstName = '';
//     //     postForm.lastName = '';
//     //     postForm.role = '';
//     //     postForm.email = '';
//     //   }
//     // };
//
//     // watch(() => props.isEdit, initializeForm, { immediate: true });
//     // watch(() => props.existingData, initializeForm, { immediate: true });
//     //
//     // onMounted(initializeForm);
//
//     const submitForm = () => {
//       console.log('Form submitted', postForm);
//       ElNotification({
//         title: 'Success',
//         message: 'User successfully saved',
//         type: 'success',
//         duration: 2000
//       });
//     };
//
//     // const resetForm = () => {
//     //   initializeForm();
//     // };
//
//     return {
//       postForm: Object.assign({}, defaultForm),
//       submitForm,
//       // resetForm,
//       loading: false,
//       activeName: 'info',
//       dialogVisible: false,
//       dialogImageUrl: ''
//     };
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
</style>
