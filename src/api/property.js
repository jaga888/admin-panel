import request from '@/utils/request';

export function fetchPropertiesByCompanyId(id) {
  return request({
    url: '/admin/properties',
    method: 'get',
    params: { company_id: id }
  });
}
