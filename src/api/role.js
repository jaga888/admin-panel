import request from '@/utils/request';

export function fetchRoles() {
  return request({
    url: '/admin/roles',
    method: 'get'
  });
}
