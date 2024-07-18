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
              <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container" label-position="top">
                <div class="createPost-main-container">
                  <el-row>
                    <el-col :span="22">
                      <h3>Attorney Fee</h3>
                      <el-form-item label="Scope Type">
                        <el-select
                              v-model="postForm.scope_type"
                              placeholder="Select Scope Type"
                              requiered
                            >
                              <el-option label="State" value="state"/>
                              <el-option label="Company" value="company"/>
                              <el-option label="Property" value="property" selected/>
                            </el-select>
                      </el-form-item>
                      <el-form-item label="Scope ID" prop="scope_id">
                        <el-input
                            type="number"
                            v-model="postForm.scope_id"
                            placeholder="Enter scope ID"
                            value="1"
                            requiered
                        />
                      </el-form-item>
                      <el-form-item label="Notice of Default" prop="fd">
                        <el-input
                            v-model="postForm.fd"
                            placeholder="Enter fd"
                            value="150,30"
                            requiered
                        />
                      </el-form-item>
                      <el-form-item label="Unlawful Detainers" prop="ud">
                        <el-input
                            v-model="postForm.ud"
                            placeholder="Enter ud"
                            value="200,99"
                            requiered
                        />
                      </el-form-item>
                      <el-form-item label="UD external" prop="ud external">
                        <el-input
                            v-model="postForm.ud_external"
                            placeholder="Enter ud external"
                            value="300,50"
                            requiered
                        />
                      </el-form-item>
                      <el-form-item label="Attorney Name">
                        <el-select
                              v-model="postForm.attorney_name"
                              placeholder="Select Attorney"
                            >
                              <el-option label="" value=""/>
                              <el-option label="John" value="john"/>
                              <el-option label="Michael" value="michael"/>
                              <el-option label="Alex" value="alex" selected/>
                            </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
                </el-form>
                </div>
          </div>
</template>

<script>
import { defineComponent } from 'vue';
import Sticky from '@/components/Sticky';
import { validURL } from '@/utils/validate';
import { fetchArticle } from '@/api/article';
import { searchUser } from '@/api/remote-search';
import SingleImageUpload from '@/components/Upload/SingleImage.vue';

const defaultForm = {
  firstName: '',
  lastName: '',
  role: '',
  email: ''
};
export default defineComponent({
  name: 'PropertyDetail',
  components: { SingleImageUpload, Sticky },
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
            message: 'User successfully saved',
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
