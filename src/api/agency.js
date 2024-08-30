import request from '@/utils/request';

export function fetchAgencies() {
  return request({
    url: '/admin/agencies',
    method: 'get'
  });
}
