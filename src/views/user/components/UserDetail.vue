<template>
  <div class="tab-container">
    <el-tabs v-model="activeName" style="margin-top:15px;" type="border-card" @tab-click="handleClick">
      <el-tab-pane label="Info" name="info">
        <keep-alive>
          <div v-if="activeName === 'info'">
            <sticky :z-index="10" :class-name="'sub-navbar ' + postForm.status">
              <el-button v-loading="loading" style="margin-left: 10px;" type="success" @click.prevent="submitForm">
                {{ isEdit ? 'Save' : 'Create' }}
              </el-button>
              <el-button v-if="isEdit" v-loading="loading" type="warning" @click="resetForm">
                Reset
              </el-button>
            </sticky>
            <div class="createPost-container">
              <el-form
                  class="form-container"
                  :rules="rules"
                  ref="postFormRef"
                  :model="postForm"
                  label-position="top">
                <div class="createPost-main-container">
                  <el-row :gutter="20" align="middle">
                    <el-col :span="4">
                      <h3>User Name</h3>
                    </el-col>
                    <el-col :span="11">
                      <el-checkbox
                          border
                          size="small"
                          v-model="postForm.is_attorney"
                      >
                        Attorney
                      </el-checkbox>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="26">
                      <el-form-item label="First Name" prop="first_name" :inline-message="true">
                        <el-input
                            v-model="postForm.first_name"
                            placeholder="First Name"
                            required
                        />
                      </el-form-item>
                      <el-form-item label="Last Name" prop="last_name" :inline-message="true">
                        <el-input
                            v-model="postForm.last_name"
                            placeholder="Last Name"
                            required
                        />
                      </el-form-item>
                      <el-form-item label="Roles">
                        <el-checkbox-group v-model="postForm.roles">
                          <el-checkbox
                              border
                              size="large"
                              v-for="(role, index) in roleOptions"
                              :key="index"
                              :value="role.id"
                          >
                            {{ role.name }}
                          </el-checkbox>
                        </el-checkbox-group>
                      </el-form-item>
                      <el-form-item v-if="isSuperAdmin" label="Firm">
                        <el-select v-model="postForm.firm_id" placeholder="Select a firm">
                          <el-option
                              v-for="(firm, index) in firmOptions"
                              :key="index"
                              :label="firm.name"
                              :value="firm.id"
                          >
                            {{ firm.name }}
                          </el-option>
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
                              disabled
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
      <el-tab-pane label="Company" name="company">
        <keep-alive>
          <div v-if="activeName === 'company'">
            <el-tree
                ref="treeRef"
                :data="companies"
                :props="defaultProps"
                show-checkbox
                :default-checked-keys="postForm.property_id_list.split(',').map(Number)"
                @check-change="handleCheckChange"
                node-key="id"
            />
          </div>
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, nextTick, watch } from 'vue';
import Sticky from '@/components/Sticky';
import { ElNotification } from 'element-plus';
import { fetchFirms } from '@/api/firm.js';
import { fetchRoles } from '@/api/role.js';
import { fetchTree } from '@/api/company';
import { getUser, updateUser, createUser } from '@/api/user.js';
import { useRoute } from 'vue-router';
import store from '@/store';
import type { TabsPaneContext, FormRules, FormInstance } from 'element-plus';

const treeRef = ref();
const route = useRoute();
const userId = route.params.id || null;
const isSuperAdmin = ref<boolean>(false);
const roles = store.user().roles;
const checkedPropertyKeys = ref();
const companies = ref([]);
const roleOptions = ref([]);
const firmOptions = ref([]);
const loading = ref<boolean>(false);
const activeName = ref<string>('info');
const postFormRef = ref<FormInstance | null>(null);

interface RuleForm {
  first_name: string;
  last_name: string;
  email: string;
  roles?: string[];
  firm_id?: number;
  is_attorney?: boolean;
  property_id_list?: string;
}

const rules = reactive<FormRules<RuleForm>>({
  first_name: [
    { required: true, message: 'First Name is required', trigger: 'blur' },
    { min: 3, max: 30, message: 'First Name must be between 3 and 30 characters', trigger: 'blur' }
  ],
  last_name: [
    { required: true, message: 'Last Name is required', trigger: 'blur' },
    { min: 3, max: 30, message: 'Last Name must be between 3 and 30 characters', trigger: 'blur' }
  ]
});

const treeQuery = ref({
  filter: {
    active: 1
  },
  firm_id: 1,
  sort: 'name'
});

const defaultProps = {
  children: 'children',
  label: 'name',
  id: 'id'
};

const postForm = reactive<RuleForm>({
  first_name: '',
  last_name: '',
  email: '',
  roles: [],
  firm_id: 1,
  is_attorney: false,
  property_id_list: ''
});

watch(postForm, async () => {
  if (postForm.firm_id) {
    treeQuery.value.firm_id = postForm.firm_id;
    await fetchThreeData();
  }
});

const handleClick = async (tab: TabsPaneContext) => {
  if (tab.paneName === 'company') {
    await nextTick();
    if (treeRef.value) {
      treeRef.value.setCheckedKeys(postForm.property_id_list?.split(',').map(Number));
    }
  }
};

const handleCheckChange = () => {
  if (treeRef.value) {
    postForm.property_id_list = treeRef.value.getCheckedKeys(false)
      .filter(key => key !== '' && key !== undefined && key !== null)
      .join(',');
  }
};

onMounted(async () => {
  try {
    isSuperAdmin.value = roles.some(role => role.name === 'super-admin');
  } catch (error) {
    console.error('Failed to determine user role:', error);
  }
});

onMounted(() => {
  setRoleOptions();
  setFirmOptions();
  if (isEdit.value) {
    fetchUserData();
  }
});

const fetchThreeData = async () => {
  try {
    console.log(11);
    const { data } = await fetchTree(treeQuery.value);
    companies.value = data;
  } catch (error) {
    console.error('Failed to fetch company data:', error);
  }
};

const isEdit = ref<boolean>(!!userId);

const fetchUserData = async () => {
  if (isEdit.value) {
    try {
      console.log(22);
      const { data } = await getUser(userId);
      Object.assign(postForm, data);
      console.log(data.firm_id);
      if (postForm.firm_id) {
        treeQuery.value.firm_id = postForm.firm_id;
      }
      await fetchThreeData();
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }
  }
};

const setFirmOptions = async () => {
  try {
    const response = await fetchFirms();
    firmOptions.value = response.firms;
  } catch (error) {
    console.error('Failed to fetch firm options:', error);
  }
};

const setRoleOptions = async () => {
  try {
    const response = await fetchRoles();
    roleOptions.value = response.data;
    if (!isSuperAdmin.value) {
      roleOptions.value = roleOptions.value.filter(role => role.name !== 'super-admin');
    }
  } catch (error) {
    console.error('Failed to fetch role options:', error);
  }
};

const submitForm = async () => {
  try {
    await postFormRef.value.validate();
    loading.value = true;
    if (isEdit.value) {
      await updateUser(userId, postForm);
      ElNotification({
        title: 'Success',
        message: `User ${postForm.first_name} updated successfully`,
        type: 'success',
        duration: 2000
      });
    } else {
      await createUser(postForm);
      ElNotification({
        title: 'Success',
        message: `User ${postForm.first_name} created successfully`,
        type: 'success',
        duration: 2000
      });
    }
  } catch (error) {
    console.error('Failed to submit user:', error);
    ElNotification({
      title: 'Error',
      message: 'Failed to submit user',
      type: 'error',
      duration: 2000
    });
  } finally {
    loading.value = false;
  }
};

const resetForm = () => {
  if (isEdit.value) {
    fetchUserData();
  } else {
    postForm.first_name = '';
    postForm.last_name = '';
    postForm.email = '';
    postForm.roles = [];
    postForm.is_attorney = false;
    postForm.firm_id = 1;
    postForm.property_id_list = '';
  }
  checkedPropertyKeys.value = [];
};
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

h3 {
  margin-top: 10px;
}
</style>
