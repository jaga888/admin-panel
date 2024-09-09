import request from '@/utils/request';

export function fetchPropertiesByCompanyId(id) {
  return request({
    url: `/admin/properties/${id}`,
    method: 'get',
    params: { company_id: id }
  });
}

export function fetchList(query) {
  return request({
    url: '/admin/properties',
    method: 'get',
    params: query
  });
}

export function getProperty(id) {
  return request({
    url: `/admin/properties/${id}`,
    method: 'get'
  });
}

export function updateProperty(id, data) {
  return request({
    url: `/admin/properties/${id}`,
    method: 'put',
    data: {
      ...data,
      id: id
    }
  });
}

export function createProperty(data) {
  return request({
    url: '/admin/properties',
    method: 'post',
    data
  });
}
