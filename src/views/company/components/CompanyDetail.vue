<template>
  <div class="tab-container">
    <el-tabs v-model="activeName" style="margin-top:15px;" type="border-card">
      <el-tab-pane label="Info" name="info">
        <keep-alive>
          <div v-if="activeName == 'info'">
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
                      <h3>Company name</h3>
                      <el-form-item label="Legal Name" prop="legalName">
                        <el-input
                            v-model="postForm.legalName"
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
                    <el-col :span="22">
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
                    <el-col :span="22">
                      <div class="form-group">
                        <h3>Invoice Address</h3>
                        <el-form-item>
                          <el-checkbox checked v-model="postForm.sameAsPropertyAddress">Same as Property Address
                          </el-checkbox>
                        </el-form-item>
                        <el-form-item label="Address Line 1" prop="invoiceAddress1">
                          <el-input v-model="postForm.invoiceAddress1" placeholder="Enter Address Line 1..."/>
                        </el-form-item>
                        <el-form-item label="Address Line 2" prop="invoiceAddress2">
                          <el-input v-model="postForm.invoiceAddress2" placeholder="Enter Address Line 2..."/>
                        </el-form-item>
                        <el-row>
                          <el-col :span="12">
                            <el-form-item label="City" prop="invoiceCity">
                              <el-input v-model="postForm.invoiceCity" placeholder="Enter City..."/>
                            </el-form-item>
                          </el-col>
                          <el-col :span="6">
                            <el-form-item label="State" prop="invoiceState">
                              <el-input v-model="postForm.invoiceState" maxlength="2"
                                        placeholder="Enter State (2 letters)"/>
                            </el-form-item>
                          </el-col>
                          <el-col :span="6">
                            <el-form-item label="Zip" prop="invoiceZip">
                              <el-input v-model="postForm.invoiceZip" placeholder="Enter Zip..."/>
                            </el-form-item>
                          </el-col>
                        </el-row>
                        <el-form-item label="Email" prop="invoiceEmail">
                          <el-input v-model="postForm.invoiceEmail" placeholder="Enter Email"/>
                        </el-form-item>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="22">
                      <div class="form-group">
                        <h3>Contact</h3>
                        <el-form-item label="Name" prop="contactName">
                          <el-input
                              v-model="postForm.contactName"
                              placeholder="Enter Name..."
                          />
                        </el-form-item>
                        <el-form-item label="Phone" prop="contactPhone">
                          <el-input v-model="postForm.contactPhone" placeholder="Enter Phone..."/>
                        </el-form-item>
                        <el-form-item label="Email" prop="contactEmail">
                          <el-input
                              type="text"
                              v-model="postForm.contactEmail"
                              placeholder="Enter Email..."
                          />
                        </el-form-item>
                      </div>
                    </el-col>
                  </el-row>
                  <div class="form-group">
                    <h3 style="margin-left: 40px">Policies</h3>
                    <el-row :gutter="10">
                      <el-col :span="11">
                        <el-form-item>
                          <el-checkbox v-model="postForm.nfprDelivery">NFPR – Delivery Checkbox</el-checkbox>
                        </el-form-item>
                        <el-form-item>
                          <el-checkbox v-model="postForm.noaDelivery">NOA – Delivery Checkbox</el-checkbox>
                        </el-form-item>
                        <el-form-item>
                          <el-checkbox v-model="postForm.uploadCourtDocket">Upload Court Docket Import Files
                          </el-checkbox>
                        </el-form-item>
                        <el-form-item>
                          <el-checkbox v-model="postForm.zeroDollarAttyFee">Zero Dollar Atty Fee For Summons
                          </el-checkbox>
                        </el-form-item>
                        <el-form-item>
                          <el-checkbox v-model="postForm.preApproveCourtDocket">Pre-approve Court Docket</el-checkbox>
                        </el-form-item>
                        <el-form-item>
                          <el-checkbox v-model="postForm.caresActApproval">CARES Act Approval</el-checkbox>
                        </el-form-item>
                        <el-form-item>
                          <el-checkbox v-model="postForm.splitCaresActCharge">Split Cares Act Charge</el-checkbox>
                        </el-form-item>
                        <el-form-item>
                          <el-checkbox v-model="postForm.caresAct">CARES Act</el-checkbox>
                        </el-form-item>
                        <el-form-item>
                          <el-checkbox v-model="postForm.singleFamilyProperty">Single Family Property</el-checkbox>
                        </el-form-item>
                        <el-form-item>
                          <el-checkbox v-model="postForm.clientCreatesNfprs">Client Creates NFPRs & Senex Processes
                          </el-checkbox>
                        </el-form-item>
                        <el-form-item>
                          <el-checkbox v-model="postForm.clientCreatesUds">Client Creates UDs & Senex Processes
                          </el-checkbox>
                        </el-form-item>
                        <el-form-item>
                          <el-checkbox v-model="postForm.allowUdChecklist">Allow UD Checklist</el-checkbox>
                        </el-form-item>
                        <el-form-item>
                          <el-checkbox v-model="postForm.apiRecordTransfer">API Record Transfer (Entrata Sync)
                          </el-checkbox>
                        </el-form-item>
                        <el-form-item>
                          <el-checkbox v-model="postForm.postsNotices">Posts Notices</el-checkbox>
                        </el-form-item>
                        <el-form-item>
                          <el-checkbox v-model="postForm.attorneyFeePercentageLimit">Attorney Fee Percentage Limit
                          </el-checkbox>
                        </el-form-item>
                        <el-form-item>
                          <el-checkbox v-model="postForm.diyClientCreatesClaims">DIY: Client Creates Claims & Client
                            Processes
                            NFPRs
                          </el-checkbox>
                        </el-form-item>
                        <el-form-item>
                          <el-checkbox v-model="postForm.diyClientAmendsClaims">DIY: Client Amends Claims & Senex
                            Processes
                            NOAs
                          </el-checkbox>
                        </el-form-item>
                      </el-col>
                      <el-col :span="11">
                        <el-form-item>
                          <el-checkbox v-model="postForm.forceUnitAddressSelection">Force Unit Address Selection
                          </el-checkbox>
                        </el-form-item>
                        <el-form-item>
                          <el-checkbox v-model="postForm.newArtcraftImportLogic">New Artcraft import logic used
                          </el-checkbox>
                        </el-form-item>
                        <el-form-item>
                          <el-checkbox v-model="postForm.uploadSeImportFiles">Upload SE Import Files</el-checkbox>
                        </el-form-item>
                        <el-form-item>
                          <el-checkbox v-model="postForm.automaticallyReadyWrits">Automatically Ready Writs with
                            Possession
                          </el-checkbox>
                        </el-form-item>
                        <el-form-item>
                          <el-checkbox v-model="postForm.clientAmendsClaims">Client Amends Claims</el-checkbox>
                        </el-form-item>
                        <el-form-item>
                          <el-checkbox v-model="postForm.doNotRequireUdMilitaryStatus">Do Not Require UD Military Status
                            Verification
                          </el-checkbox>
                        </el-form-item>
                        <el-form-item>
                          <el-checkbox v-model="postForm.preApproveNoticesOfNoncompliance">Pre-approve Notices of
                            Noncompliance
                          </el-checkbox>
                        </el-form-item>
                        <el-form-item>
                          <el-checkbox v-model="postForm.uploadImportFiles">Upload Import Files</el-checkbox>
                        </el-form-item>
                        <el-form-item>
                          <el-checkbox v-model="postForm.eSignNotices">eSign Notices</el-checkbox>
                        </el-form-item>
                        <el-form-item>
                          <el-checkbox v-model="postForm.preApproveSummons">Pre-approve Summons</el-checkbox>
                        </el-form-item>
                        <el-form-item>
                          <el-checkbox v-model="postForm.preApproveNotices">Pre-approve Notices</el-checkbox>
                        </el-form-item>
                        <el-form-item>
                          <el-checkbox v-model="postForm.clientCreatesClaims">Client Creates Claims
                          </el-checkbox>
                        </el-form-item>
                        <el-form-item>
                          <el-checkbox v-model="postForm.allowMilitaryAllotment">Allow Military Allotment</el-checkbox>
                        </el-form-item>
                        <el-form-item>
                          <el-checkbox v-model="postForm.preApproveMilitaryAffidavit">Pre-approve Military Affidavit
                          </el-checkbox>
                        </el-form-item>
                        <el-form-item>
                          <el-checkbox v-model="postForm.allAddressesInZip">All Addresses in Zip</el-checkbox>
                        </el-form-item>
                        <el-form-item>
                          <el-checkbox v-model="postForm.uploadFiles">Upload Files</el-checkbox>
                        </el-form-item>
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
                                v-model="postForm.udFilingThreshold"
                                placeholder="Enter UD Filing Threshold"
                            />
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </div>
                    <div class="form-group">
                      <el-row>
                        <el-col :span="22">
                          <h3>Status</h3>
                          <p>This Client is Active.<br> To remove it from use, while retaining all historical data, you
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
      <el-tab-pane  label="File" name="file">
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

<script setup>
import { ref } from 'vue';
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
    message: 'Company successfully saved',
    type: 'success',
    duration: 2000
  });
};

const loading = ref(false);
const activeName = ref('info');
const dialogVisible = ref(false);
const dialogImageUrl = ref('');
// export default defineComponent({
//   name: 'ArticleDetail',
//   components: { SingleImageUpload, Sticky },
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
//         { label: 'Info', key: 'cn' },
//         { label: 'File', key: 'file' }
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
//             message: 'Company successfully saved',
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
  background-color: rgba(33, 120, 241, 0.1);
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
