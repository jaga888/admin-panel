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
              <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container" label-position="top">
                <div class="createPost-main-container">
                  <el-row>
                    <el-col :span="22">
                      <h3>Property name</h3>
                      <el-form-item label="Legal Name" prop="legalName">
                        <el-input
                            v-model="postForm.legalName"
                            placeholder="The Legal Name is used on most documents."
                            value="The Community of Donje, LLC"
                        />
                      </el-form-item>
                      <el-form-item label="Name" prop="name">
                        <el-input
                            v-model="postForm.name"
                            placeholder="The name is the name of the property. Typically, it's the same as the trade name."
                            value="Donje's Digs"
                        />
                      </el-form-item>
                      <el-form-item label="Nickname" prop="nickname">
                        <el-input v-model="postForm.nickname"
                                  placeholder="The nickname is displayed in the software, and can be shortened for brevity."
                                  value=""
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
                              value="100 Awesome Lane"
                          />
                        </el-form-item>
                        <el-row>
                          <el-col :span="12">
                            <el-form-item label="City" prop="city">
                              <el-input
                                  v-model="postForm.city"
                                  placeholder="Enter City..."
                                  value="Newport"
                              />
                            </el-form-item>
                          </el-col>
                          <el-col :span="6">
                            <el-form-item label="State" prop="state">
                              <el-input
                                  v-model="postForm.state"
                                  maxlength="2"
                                  placeholder="Enter State (2 letters)"
                                  value="VA"
                              />
                            </el-form-item>
                          </el-col>
                          <el-col :span="6">
                            <el-form-item label="Zip" prop="zip">
                              <el-input
                                  v-model="postForm.zip"
                                  placeholder="Enter Zip..."
                                  maxlength="5"
                                  value="23601"
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
                              <el-option label="Bedford" value="realpage" selected/>
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
                        <h3>Property Manager</h3>
                        <el-form-item label="Name" prop="contactName">
                          <el-input
                              v-model="postForm.contactName"
                              placeholder="Enter Name..."
                              value="Donje"
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
                              value="donje.putnam@senexlaw.com"
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
                          <el-checkbox checked v-model="postForm.nfprDelivery">NFPR – Delivery Checkbox</el-checkbox>
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
                          <el-checkbox checked v-model="postForm.caresActApproval">CARES Act Approval</el-checkbox>
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
                          <el-checkbox checked v-model="postForm.clientCreatesClaims">Client Creates Claims
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
                    <el-row>
                      <el-col :span="22">
                        <div class="form-group">
                          <el-form-item
                              label="Rent is considered late, and new claims may be created after this day:"
                              :prop="udFilingThreshold">
                            <el-input
                                v-model="postForm.udFilingThreshold"
                                placeholder="Enter UD Filing Threshold"
                                value="5"
                            />
                          </el-form-item>
                        </div>
                      </el-col>
                      <el-col :span="22">
                        <div class="form-group">
                          <el-form-item
                              label="New claims may be created if balance outstanding is greater than or equal to this amount:"
                              :prop="udFilingThreshold">
                            <el-input
                                v-model="postForm.udFilingThreshold"
                                placeholder="Enter UD Filing Threshold"
                                value="100,00"
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
                                value="500"
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
                                v-model="postForm.clientWebsite"
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
                          <p>This Property is Active.<br> To remove it from use, while retaining all historical data, you
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
      <el-tab-pane  label="Files" name="files">
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
      <el-tab-pane  label="Notes" name="notes">
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

<script>
import { defineComponent } from 'vue';
import Tinymce from '@/components/Tinymce';
import Upload from '@/components/Upload/SingleImage3';
import MDinput from '@/components/MDinput';
import Sticky from '@/components/Sticky';
import TabPanel from '@/views/tab/components/TabPanel.vue';
import { validURL } from '@/utils/validate';
import { fetchArticle } from '@/api/article';
import { searchUser } from '@/api/remote-search';
import { CommentDropdown, PlatformDropdown, SourceUrlDropdown } from './Dropdown';
import SingleImageUpload from '@/components/Upload/SingleImage.vue';
import NoteEdit from '@/views/property/components/Note/Create.vue';

const defaultForm = {
  status: 'draft',
  id: undefined,
  platforms: ['a-platform'],
  comment_disabled: false,
  importance: 0,
  // Additional fields
  legalName: 'The Community of Donje, LLC',
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
  nfprDelivery: false,
  noaDelivery: false,
  uploadCourtDocket: false,
  zeroDollarAttyFee: false,
  preApproveCourtDocket: false,
  caresActApproval: false,
  splitCaresActCharge: false,
  caresAct: false,
  singleFamilyProperty: false,
  clientCreatesNfprs: false,
  clientCreatesUds: false,
  allowUdChecklist: false,
  apiRecordTransfer: false,
  postsNotices: false,
  attorneyFeePercentageLimit: false,
  diyClientCreatesClaims: false,
  diyClientAmendsClaims: false,
  forceUnitAddressSelection: false,
  newArtcraftImportLogic: false,
  uploadSeImportFiles: false,
  automaticallyReadyWrits: false,
  clientAmendsClaims: false,
  doNotRequireUdMilitaryStatus: false,
  preApproveNoticesOfNoncompliance: false,
  uploadImportFiles: false,
  eSignNotices: false,
  preApproveSummons: false,
  uploadUdImportFiles: false,
  reduceAttorneyFee: false,
  uploadNonImportFiles: false,
  generateUnswornDeclaration: false,
  alwaysSendAmendedNotice: false,
  nonNotGeneratedInSenex: false,
  ignoreUdWaitingPeriod: false,
  allowMulti: false,
  automaticallyReadyWritsAbove500: false,
  addPossessionToPrintedDocket: false,
  propertyManagementSoftware: '',
  clientWebsite: '',
  udFilingThreshold: ''
};

export default defineComponent({
  name: 'PropertyDetail',
  // eslint-disable-next-line vue/no-unused-components
  components: { NoteEdit, SingleImageUpload, Tinymce, MDinput, Upload, Sticky, CommentDropdown, PlatformDropdown, SourceUrlDropdown, TabPanel },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const validateRequire = (rule, value, callback) => {
      if (value === '') {
        ElMessage({
          message: rule.field + 'required',
          type: 'error'
        });
        callback(new Error(rule.field + 'required'));
      } else {
        callback();
      }
    };
    const validateSourceUri = (rule, value, callback) => {
      if (value) {
        if (validURL(value)) {
          callback();
        } else {
          ElMessage({
            message: 'invalid URL',
            type: 'error'
          });
          callback(new Error('invalid URL'));
        }
      } else {
        callback();
      }
    };
    return {
      postForm: Object.assign({}, defaultForm),
      loading: false,
      userListOptions: [],
      rules: {
        image_uri: [{ validator: validateRequire }],
        title: [{ validator: validateRequire }],
        content: [{ validator: validateRequire }],
        source_uri: [{ validator: validateSourceUri, trigger: 'blur' }]
      },
      tempRoute: {},
      tabMapOptions: [
        { label: 'Info', key: 'info' },
        { label: 'Files', key: 'files' },
        { label: 'Notes', key: 'notes' }
      ],
      activeName: 'info',
      createdTimes: 0
    };
  },
  computed: {
    contentShortLength() {
      return this.postForm.content_short.length;
    },
    displayTime: {
      get() {
        return (+new Date(this.postForm.display_time));
      },
      set(val) {
        this.postForm.display_time = new Date(val);
      }
    }
  },
  created() {
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id;
      this.fetchData(id);
    }

    this.tempRoute = Object.assign({}, this.$route);

    if (window._XMLHttpRequest) {
      var xhr = new window._XMLHttpRequest();
      window.XMLHttpRequest.prototype.upload = xhr.upload;
    }
  },
  methods: {
    fetchData(id) {
      fetchArticle(id).then(response => {
        this.postForm = response.data;

        this.setTagsViewTitle();
        this.setPageTitle();
      }).catch(err => {
        console.log(err);
      });
    },
    setTagsViewTitle() {
      const title = 'Edit Article';
      const route = Object.assign({}, this.tempRoute, { title: `${title}-${this.postForm.id}` });
      this.$store.dispatch('tagsView/updateVisitedView', route);
    },
    setPageTitle() {
      const title = 'Edit Article';
      document.title = `${title} - ${this.postForm.id}`;
    },
    submitForm() {
      this.$refs.postForm.validate(valid => {
        if (valid) {
          this.loading = true;
          ElNotification({
            title: 'Success',
            message: 'Property successfully saved',
            type: 'success',
            duration: 2000
          });
          this.postForm.status = 'published';
          this.loading = false;
        } else {
          console.log('error submit!');
          return false;
        }
      });
    },
    draftForm() {
      if (this.postForm.content.length === 0 || this.postForm.title.length === 0) {
        ElMessage({
          message: 'Fill required fields',
          type: 'warning'
        });
        return;
      }
      ElMessage({
        message: 'Saved successfully',
        type: 'success',
        showClose: true,
        duration: 1000
      });
      this.postForm.status = 'draft';
    },
    getRemoteUserList(query) {
      searchUser(query).then(response => {
        if (!response.data.items) return;
        this.userListOptions = response.data.items.map(v => v.name);
      });
    }
  }
});
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
