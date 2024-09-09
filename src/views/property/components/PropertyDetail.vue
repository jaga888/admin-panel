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
                    <el-col :span="22">
                      <h3>Property name</h3>
                      <el-form-item label="Legal Name" prop="legalName">
                        <el-input
                            v-model="postForm.legal_name"
                            placeholder="The Legal Name is used on most documents."
                        />
                      </el-form-item>
                      <el-form-item label="Name" prop="name">
                        <el-input
                            v-model="postForm.name"
                            placeholder="The name is the name of the property. Typically, it's the same as the trade name."
                        />
                      </el-form-item>
                      <el-form-item label="Nickname" prop="nickname">
                        <el-input v-model="postForm.nickname"
                                  placeholder="The nickname is displayed in the software, and can be shortened for brevity."
                        />
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="22">
                      <div class="form-group">
                        <h3>Location</h3>
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
                        <el-col>
                          <el-select
                              v-model="postForm.propertyManagementSoftware"
                              placeholder="Select Jurisdiction"
                          >
                            <el-option label="" value=""/>
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
                        </el-col>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="22">
                      <div class="form-group">
                        <h3>Default Unit Address</h3>
                        <el-form-item>
                          <el-checkbox checked v-model="postForm.sameAsPropertyAddress">Same as Property Address
                          </el-checkbox>
                        </el-form-item>
                        <el-form-item label="Address Line 1" prop="invoiceAddress1">
                          <el-input v-model="postForm.invoice_address1" placeholder="Enter Address Line 1..."/>
                        </el-form-item>
                        <el-form-item label="Address Line 2" prop="invoiceAddress2">
                          <el-input v-model="postForm.invoice_address2" placeholder="Enter Address Line 2..."/>
                        </el-form-item>
                        <el-row>
                          <el-col :span="12">
                            <el-form-item label="City" prop="invoiceCity">
                              <el-input v-model="postForm.invoice_city" placeholder="Enter City..."/>
                            </el-form-item>
                          </el-col>
                          <el-col :span="6">
                            <el-form-item label="State" prop="invoiceState">
                              <el-input v-model="postForm.invoice_state" maxlength="2"
                                        placeholder="Enter State (2 letters)"/>
                            </el-form-item>
                          </el-col>
                          <el-col :span="6">
                            <el-form-item label="Zip" prop="invoiceZip">
                              <el-input v-model="postForm.invoice_zip" placeholder="Enter Zip..."/>
                            </el-form-item>
                          </el-col>
                        </el-row>
                        <el-form-item label="Email" prop="invoiceEmail">
                          <el-input v-model="postForm.invoice_email" placeholder="Enter Email"/>
                        </el-form-item>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="22">
                      <div class="form-group">
                        <h3>Property Manager</h3>
                        <el-form-item label="Name" prop="contactName">
                          <el-input
                              v-model="postForm.contact_name"
                              placeholder="Enter Name..."
                          />
                        </el-form-item>
                        <el-form-item label="Phone" prop="contactPhone">
                          <el-input v-model="postForm.contact_phone" placeholder="Enter Phone..."/>
                        </el-form-item>
                        <el-form-item label="Email" prop="contactEmail">
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
                          <el-checkbox-group v-model="postForm.policies">
                            <el-checkbox
                                v-for="(policy, index) in policyOptions.slice(0, Math.ceil(policyOptions.length / 2))"
                                :key="index"
                                :checked="policyOptions.includes(postForm.policies)"
                                :value="postForm.policies"
                            >
                              {{ formatPolicyName(policy) }}
                            </el-checkbox>
                          </el-checkbox-group>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item>
                          <el-checkbox-group v-model="postForm.policies">
                            <el-checkbox
                                v-for="(policy, index) in policyOptions.slice(Math.ceil(policyOptions.length / 2))"
                                :key="index"
                                :checked="policyOptions.includes(postForm.policies)"
                                :value="postForm.policies"
                            >
                              {{ formatPolicyName(policy) }}
                            </el-checkbox>
                          </el-checkbox-group>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="22">
                        <div class="form-group">
                          <el-form-item
                              label="Rent is considered late, and new claims may be created after this day:"
                              :prop="udFilingThreshold">
                            <el-input
                                v-model="postForm.day_limit"
                                placeholder="Enter UD Filing Threshold"
                            />
                          </el-form-item>
                        </div>
                      </el-col>
                      <el-col :span="22">
                        <div class="form-group">
                          <el-form-item
                              label="New claims may be created if balance outstanding is greater than or equal to this amount:">
                            <el-input
                                v-model="postForm.amount"
                                placeholder="Enter UD Filing Threshold"
                            />
                          </el-form-item>
                        </div>
                      </el-col>
                      <el-col :span="22">
                        <div class="form-group">
                          <el-form-item label="UD Filing Threshold" prop="udFilingThreshold">
                            <el-input
                                v-model="postForm.udFilingThreshold"
                                placeholder="Enter UD Filing Threshold"
                            />
                          </el-form-item>
                        </div>
                      </el-col>
                    </el-row>
                    <div class="form-group">
                      <el-row>
                        <el-col :span="22">
                          <h3>Other Information</h3>
                          <el-form-item label="Property Management Software" prop="propertyManagementSoftware">
                            <el-select v-model="postForm.propertyManagementSoftware"
                                       placeholder="Select Property Management Software"
                            >
                              <el-option label="Appfolio" value="appfolio"/>
                              <el-option label="Entrata" value="entrata"/>
                              <el-option label="MRI" value="mri"/>
                              <el-option label="RealPage" value="realpage" selected/>
                              <el-option label="Yardi" value="yardi"/>
                              <el-option label="None" value="none"/>
                              <el-option label="Other" value="other"/>
                              <el-option label="Unknown" value="unknown"/>
                            </el-select>
                          </el-form-item>
                          <el-form-item label="Client Website" prop="clientWebsite">
                            <el-input
                                v-model="postForm.client_website"
                                placeholder="Enter Client Website"
                                value="www."
                            />
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </div>
                    <div class="form-group">
                      <el-row>
                        <el-col :span="22">
                          <h3>Status</h3>
                          <p>This Property is Active.<br> To remove it from use, while retaining all historical data,
                            you
                            may
                            deactivate
                            it</p>
                          <el-button type="danger">Deactivate</el-button>
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
      <el-tab-pane label="Files" name="files">
        <keep-alive>
          <div v-if="activeName === 'files'">
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
      <el-tab-pane label="Notes" name="notes">
        <keep-alive>
          <div v-if="activeName === 'notes'">
            <h3 style="display:flex; justify-content: center;">Notes</h3>
            <note-edit ref="editor" :height="400"></note-edit>
          </div>
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Tinymce from '@/components/Tinymce';
import Upload from '@/components/Upload/SingleImage3';
import MDinput from '@/components/MDinput';
import Sticky from '@/components/Sticky';
import TabPanel from '@/views/tab/components/TabPanel.vue';
import { CommentDropdown, PlatformDropdown, SourceUrlDropdown } from './Dropdown';
import SingleImageUpload from '@/components/Upload/SingleImage.vue';
import NoteEdit from '@/views/property/components/Note/Create.vue';
import { ElNotification } from 'element-plus';
import { fetchList } from '@/api/policy.js';
import { getProperty } from '@/api/property.js';
import { useRoute } from 'vue-router';

const route = useRoute();
const propertyId = route.params.id || null;

const isEdit = ref<boolean>(!!propertyId);
const loading = ref<boolean>(false);
const activeName = ref<string>('info');
const dialogVisible = ref<boolean>(false);
const dialogImageUrl = ref('');

const postForm = ref({
  id: undefined,
  legal_name: '',
  name: '',
  short_name: '',
  identifier: '',
  address: '',
  city: '',
  state: '',
  zip: '',
  sameAsPropertyAddress: false,
  invoice_address1: '',
  invoice_address2: '',
  invoice_city: '',
  invoice_state: '',
  invoice_zip: '',
  invoice_email: '',
  contact_name: '',
  contact_phone: '',
  contact_email: '',
  policies: [],
  property_management_software: '',
  client_website: '',
  ud_filing_threshold: ''
});

const fetchPropertyData = async () => {
  if (isEdit.value) {
    const { data } = await getProperty(propertyId);

    postForm.value = data;
    console.log(postForm.value);
  }
};

const setPolicyOptions = async () => {
  const response = await fetchList();

  policyOptions.value = response.data;
  console.log('allowed policies', policyOptions.value);
};

onMounted(() => {
  setPolicyOptions();

  if (isEdit.value) {
    fetchPropertyData();
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
      await updateProperty(propertyId, postForm.value);
      ElNotification({
        title: 'Success',
        message: `Property ${postForm.value.name} updated successfully`,
        type: 'success',
        duration: 2000
      });
    } else {
      await createProperty(postForm.value);
      ElNotification({
        title: 'Success',
        message: `Property created successfully`,
        type: 'success',
        duration: 2000
      });
    }
  } catch (error) {
    console.error('Failed to submit property:', error);
    ElNotification({
      title: 'Error',
      message: 'Failed to submit property',
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
    fetchPropertyData();
  } else {
    postForm.value = {
      id: undefined,
      legalName: '',
      name: '',
      identifier: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      sameAsPropertyAddress: false,
      invoiceAddress1: '',
      invoiceAddress2: '',
      invoiceCity: '',
      invoiceState: '',
      invoiceZip: '',
      invoiceEmail: '',
      contactName: '',
      contactPhone: '',
      contactEmail: '',
      policy_ids: [],
      propertyManagementSoftware: '',
      clientWebsite: '',
      udFilingThreshold: ''
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
</style>
