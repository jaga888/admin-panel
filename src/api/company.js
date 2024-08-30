import request from '@/utils/request';

export function fetchList(query) {
  return request({
    url: '/admin/companies',
    method: 'get',
    params: query
  });
}

export function getCompany(id) {
  return request({
    url: `/admin/companies/${id}`,
    method: 'get'
  });
}

export function fetchTree() {
  return request({
    url: `/admin/companies/tree`,
    method: 'get'
  });
}

export function companiesUpdateActive(companyId, isActive) {
  return request({
    url: `/admin/companies/${companyId}/active`,
    method: 'patch',
    data: {
      active: isActive
    }
  });
}

export function updateCompany(id, data) {
  return request({
    url: `/admin/companies/${id}`,
    method: 'put',
    data: {
      ...data,
      id: id
    }
  });
}

export function createCompany(data) {
  return request({
    url: '/admin/companies',
    method: 'post',
    data
  });
}
