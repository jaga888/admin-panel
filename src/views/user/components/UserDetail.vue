<template>
  <div class="tab-container">
    <el-tabs v-model="activeName" style="margin-top:15px;" type="border-card" @tab-click="handleClick">
      <el-tab-pane label="Info" name="info">
        <keep-alive>
          <div v-if="activeName === 'info'">
            <sticky :z-index="10" :class-name="'sub-navbar '+postForm.status">
              <el-button v-loading="loading" style="margin-left: 10px;" type="success" @click.prevent="submitForm">
                {{ isEdit ? 'Save' : 'Create' }}
              </el-button>
              <el-button v-if="isEdit" v-loading="loading" type="warning" @click="resetForm">
                Reset
              </el-button>
            </sticky>
            <div class="createPost-container">
              <el-form class="form-container" label-position="top">
                <div class="createPost-main-container">
                  <el-row :gutter="20" align="middle">
                    <el-col :span="4">
                      <h3>User Name</h3>
                    </el-col>
                    <el-col :span="11">
                      <el-checkbox
                          border=border
                          size="small"
                          v-model="postForm.is_attorney"
                      >
                        Attorney
                      </el-checkbox>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="26">
                      <el-form-item label="First Name" prop="firstName">
                        <el-input
                            v-model="postForm.first_name"
                            placeholder="First Name"
                            required
                        />
                      </el-form-item>
                      <el-form-item label="Last Name" prop="lastName">
                        <el-input
                            v-model="postForm.last_name"
                            placeholder="Last Name"
                            required
                        />
                      </el-form-item>
                      <el-form-item label="Roles">
                        <el-checkbox-group v-model="postForm.roles">
                          <el-checkbox
                              border=border
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
      <el-tab-pane label="Company" name="company">
        <keep-alive>
          <div v-if="activeName === 'company'">
            <el-tree
              ref="treeRef"
              :data="companies"
              :props="defaultProps"
              show-checkbox
              :default-checked-keys="checkedPropertyKeys"
              @check-change="handleCheckChange"
            />
          </div>
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Sticky from '@/components/Sticky';
import { ElNotification } from 'element-plus';
import { fetchFirms } from '@/api/firm.js';
import { fetchRoles } from '@/api/role.js';
import { fetchTree } from '@/api/company';
import { getUser, updateUser, createUser } from '@/api/user.js';
import { useRoute } from 'vue-router';
import store from '@/store';
import { ElTree } from 'element-plus';
import type { TabsPaneContext } from 'element-plus';

const treeRef = ref<InstanceType<typeof ElTree>>();
const route = useRoute();
const userId = route.params.id || null;
const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
  console.log('asd', treeRef.value);
};

const defaultProps = {
  label: 'name'
};

const postForm = ref({
  first_name: '',
  last_name: '',
  email: '',
  roles: [],
  firm: [],
  is_attorney: false,
  properties_id_list: ''
});

const isSuperAdmin = ref<boolean>(false);
const roles = store.user().roles;

onMounted(async () => {
  try {
    console.log('current user roles', roles);
    isSuperAdmin.value = roles.some(role => role.name === 'super-admin');
  } catch (error) {
    console.error('Failed to check user role:', error);
  }
  try {
    const { data } = await fetchTree();
    companies.value = data;
    console.log('companies', companies.value);
  } catch (error) {
    console.error('Failed to load companies:', error);
  }
});

const isEdit = ref<boolean>(!!userId);

const fetchUserData = async () => {
  if (isEdit.value) {
    try {
      const { data } = await getUser(userId);
      postForm.value = data;
      console.log('user data', postForm.value);
      if (postForm.value.property_id_list) {
        checkedPropertyKeys.value = postForm.value.property_id_list.split(',').map(Number);
        treeRef.value = postForm.value.property_id_list.split(',').map(Number);
        console.log("user's property", checkedPropertyKeys.value);
      }
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }
  }
};

const setFirmOptions = async () => {
  const response = await fetchFirms();
  firmOptions.value = response.firms;
  console.log('Firms:', firmOptions.value);
};

const setRoleOptions = async () => {
  const response = await fetchRoles();
  roleOptions.value = response.data;
  console.log('allowed roles', roleOptions.value);
  if (!isSuperAdmin.value) {
    console.log('You are not super-admin');
    roleOptions.value = roleOptions.value.filter(role => role.name !== 'super-admin');
  }
};

const properties = ref([]);
const checkedPropertyKeys = ref<Array<number>>([]);
const companies = ref([]);
const roleOptions = ref<Array>([]);
const firmOptions = ref<Array>([]);
const loading = ref<boolean>(false);
const activeName = ref<string>('info');

onMounted(() => {
  setRoleOptions();
  setFirmOptions();
  if (isEdit.value) {
    fetchUserData();
  }
});

const handleCheckChange = (data, checked, indeterminate) => {
  checkedPropertyKeys.value = postForm;
};

const submitForm = async () => {
  loading.value = true;
  postForm.value.property_id_list = checkedPropertyKeys.value.length > 0
    ? checkedPropertyKeys.value.join(',')
    : '';
  try {
    if (isEdit.value) {
      await updateUser(userId, postForm.value);
      ElNotification({
        title: 'Success',
        message: `User ${postForm.value.first_name} updated successfully`,
        type: 'success',
        duration: 2000
      });
    } else {
      await createUser(postForm.value);
      ElNotification({
        title: 'Success',
        message: `User  created successfully`,
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
    postForm.value = {
      first_name: '',
      last_name: '',
      email: '',
      roles: [],
      is_attorney: '',
      firm: [],
      properties_id_list: ''
    };
    checkedKeys.value = [];
  }
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
