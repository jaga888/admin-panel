import request from '@/utils/request';

export function fetchFirms() {
  return request({
    url: '/admin/firms',
    method: 'get'
  });
}
