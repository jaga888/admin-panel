<template>
  <div class="tab-container">
    <el-tabs v-model="activeName" style="margin-top:15px;" type="border-card">
      <el-tab-pane label="Info" name="info">
        <keep-alive>
          <div v-if="activeName == 'info'">
            <sticky :z-index="10" :class-name="'sub-navbar '">
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
                    <el-col :span="24">
                      <h3>Company name</h3>
                      <el-form-item label="Legal Name" prop="legal_name">
                        <el-input
                            v-model="postForm.legal_name"
                            placeholder="The full Legal Name of the client company"
                        />
                      </el-form-item>
                      <el-form-item label="Name" prop="name">
                        <el-input
                            v-model="postForm.name"
                            placeholder="The name of the client"
                        />
                      </el-form-item>
                      <el-form-item label="Identifier" prop="identifier">
                        <el-input v-model="postForm.identifier"
                                  placeholder="A unique word, only lowercase letters, no spaces. It cannot be changed"
                        />
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="24">
                      <div class="form-group">
                        <h3>Address</h3>
                        <el-form-item label="Address" prop="address">
                          <el-input
                              v-model="postForm.address"
                              placeholder="Enter Address..."
                          />
                        </el-form-item>
                        <el-row>
                          <el-col :span="12">
                            <el-form-item label="City" prop="city">
                              <el-input
                                  v-model="postForm.city"
                                  placeholder="Enter City..."
                              />
                            </el-form-item>
                          </el-col>
                          <el-col :span="6">
                            <el-form-item label="State" prop="state">
                              <el-input
                                  v-model="postForm.state"
                                  maxlength="2"
                                  placeholder="Enter State (2 letters)"
                              />
                            </el-form-item>
                          </el-col>
                          <el-col :span="6">
                            <el-form-item label="Zip" prop="zip">
                              <el-input
                                  v-model="postForm.zip"
                                  placeholder="Enter Zip..."
                                  maxlength="5"
                              />
                            </el-form-item>
                          </el-col>
                        </el-row>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="24">
                      <div class="form-group">
                        <h3>Invoice Address</h3>
                        <el-form-item label="Address Line 1" prop="invoiceAddress1">
                          <el-input v-model="postForm.invoice_address" placeholder="Enter Address Line 1..."/>
                        </el-form-item>
                        <el-form-item label="Address Line 2" prop="invoiceAddress2">
                          <el-input v-model="postForm.invoice_address2" placeholder="Enter Address Line 2..."/>
                        </el-form-item>
                        <el-row>
                          <el-col :span="12">
                            <el-form-item label="City" prop="invoice_state">
                              <el-input v-model="postForm.invoice_city" placeholder="Enter City..."/>
                            </el-form-item>
                          </el-col>
                          <el-col :span="6">
                            <el-form-item label="State" prop="invoice_state">
                              <el-input v-model="postForm.invoice_state" maxlength="2"
                                        placeholder="Enter State (2 letters)"/>
                            </el-form-item>
                          </el-col>
                          <el-col :span="6">
                            <el-form-item label="Zip" prop="invoice_zip">
                              <el-input v-model="postForm.invoice_zip" placeholder="Enter Zip..."/>
                            </el-form-item>
                          </el-col>
                        </el-row>
                        <el-form-item label="Email" prop="invoice_email">
                          <el-input v-model="postForm.invoice_email" placeholder="Enter Email"/>
                        </el-form-item>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="24">
                      <div class="form-group">
                        <h3>Contact</h3>
                        <el-form-item label="Name" prop="contact_name">
                          <el-input
                              v-model="postForm.contact_name"
                              placeholder="Enter Name..."
                          />
                        </el-form-item>
                        <el-form-item label="Phone" prop="contact_phone">
                          <el-input v-model="postForm.contact_phone" placeholder="Enter Phone..."/>
                        </el-form-item>
                        <el-form-item label="Email" prop="contact_email">
                          <el-input
                              type="text"
                              v-model="postForm.contact_email"
                              placeholder="Enter Email..."
                          />
                        </el-form-item>
                      </div>
                    </el-col>
                  </el-row>
                  <div class="form-group">
                    <h3 style="margin-left: 40px">Policies</h3>
                    <el-row :gutter="10">
                    <el-col :span="12">
                      <el-form-item>
                        <el-checkbox v-model="postForm.policy_ids"
                                     v-for="(policy, index) in policyOptions.slice(0, Math.ceil(policyOptions.length / 2))"
                                     :key="index"
                                     :checked="policyOptions.includes(policy.id)"
                                     :value="policy.id"
                        >
                          {{ formatPolicyName(policy) }}
                        </el-checkbox>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item>
                        <el-checkbox v-model="postForm.policy_ids"
                                     v-for="(policy, index) in policyOptions.slice(Math.ceil(policyOptions.length / 2))"
                                     :key="index"
                                     :checked="policyOptions.includes(policy.id)"
                                     :value="policy.id"
                        >
                          {{ formatPolicyName(policy) }}
                        </el-checkbox>
                      </el-form-item>
                    </el-col>
                  </el-row>
                    <div class="form-group">
                      <el-row>
                        <el-col :span="24">
                          <h3>Other Information</h3>
                          <el-form-item label="Property Management Software" prop="propertyManagementSoftware">
                            <el-select v-model="postForm.propertyManagementSoftware"
                                       placeholder="Select Property Management Software"
                            >
                              <el-option label="Appfolio" value="appfolio"/>
                              <el-option label="Entrata" value="entrata"/>
                              <el-option label="MRI" value="mri"/>
                              <el-option label="RealPage" value="realpage"/>
                              <el-option label="Yardi" value="yardi"/>
                              <el-option label="None" value="none"/>
                              <el-option label="Other" value="other"/>
                              <el-option label="Unknown" value="unknown"/>
                            </el-select>
                          </el-form-item>
                          <el-form-item label="Client Website" prop="clientWebsite">
                            <el-input
                                v-model="postForm.clientWebsite"
                                placeholder="Enter Client Website"
                            />
                          </el-form-item>
                          <el-form-item label="UD Filing Threshold" prop="udFilingThreshold">
                            <el-input
                                v-model="postForm.ud_filing_threshold"
                                placeholder="Enter UD Filing Threshold"
                            />
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </div>
                  </div>
                </div>
              </el-form>
            </div>
          </div>
        </keep-alive>
      </el-tab-pane>
      <el-tab-pane label="File" name="file">
        <keep-alive>
          <div v-if="activeName === 'file'">
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

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Sticky from '@/components/Sticky';
import SingleImageUpload from '@/components/Upload/SingleImage.vue';
import { ElNotification } from 'element-plus';
import { getCompany, updateCompany, createCompany } from '@/api/company.js';
import { fetchList } from '@/api/policy.js';
import { useRoute } from 'vue-router';

const route = useRoute();
const companyId = route.params.id || null;

const postForm = ref({
  id: undefined,
  name: '',
  legal_name: '',
  address: '',
  city: '',
  contact_email: '',
  contact_name: '',
  contact_phone: '',
  identifier: '',
  invoice_address: '',
  invoice_address2: '',
  invoice_city: '',
  invoice_email: '',
  invoice_state: '',
  invoice_zip: '',
  pm_software_id: 0,
  policy_ids: [],
  short_name: '',
  state: '',
  ud_filing_threshold: 0,
  url: '',
  zip: ''
});

const isSuperAdmin = ref<boolean>(false);

const isEdit = ref<boolean>(!!companyId);

const fetchCompanyData = async () => {
  if (isEdit.value) {
    const { data } = await getCompany(companyId);
    postForm.value = data;
  }
};

const loading = ref<boolean>(false);
const activeName = ref<string>('info');
const dialogVisible = ref<boolean>(false);
const dialogImageUrl = ref('');

const setPolicyOptions = async () => {
  const response = await fetchList();

  policyOptions.value = response.data;
  console.log('allowed policies', policyOptions.value);
};

onMounted(() => {
  setPolicyOptions();

  if (isEdit.value) {
    fetchCompanyData();
  }
});

const formatPolicyName = (policy) => {
  return policy.name
    ? policy.name
    : policy.identifier
      .replaceAll('_', ' ')
      .toLowerCase()
      .replace(/(?<= )\S|^./g, a => a.toUpperCase());
};

const submitForm = async () => {
  loading.value = true;
  try {
    if (isEdit.value) {
      console.log(postForm.value);
      await updateCompany(companyId, postForm.value);
      ElNotification({
        title: 'Success',
        message: `Company ${postForm.value.name} updated successfully`,
        type: 'success',
        duration: 2000
      });
    } else {
      await createCompany(postForm.value);
      ElNotification({
        title: 'Success',
        message: `Company created successfully`,
        type: 'success',
        duration: 2000
      });
    }
  } catch (error) {
    console.error('Failed to submit company:', error);
    ElNotification({
      title: 'Error',
      message: 'Failed to submit company',
      type: 'error',
      duration: 2000
    });
  } finally {
    loading.value = false;
  }
};

const policyOptions = ref<Array>([]);

const resetForm = () => {
  if (isEdit.value) {
    fetchCompanyData();
  } else {
    postForm.value = {
      id: undefined,
      name: '',
      legal_name: '',
      active: false,
      address: '',
      city: '',
      contact_email: '',
      contact_name: '',
      contact_phone: '',
      invoice_address: '',
      invoice_address2: '',
      invoice_city: '',
      invoice_email: '',
      invoice_state: '',
      invoice_zip: '',
      pm_software_id: 0,
      policy_ids: [],
      short_name: '',
      state: '',
      ud_filing_threshold: 0,
      url: '',
      zip: ''
    };
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/mixin.scss";

.createPost-container {
  padding: 20px;
  display: flex;
  justify-content: center;
  background-color: rgba(33, 120, 241, 0.1);
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

:deep(.el-form-item__content) {
  display: flex;
  justify-content: center;
  align-items: flex-start;
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
