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
