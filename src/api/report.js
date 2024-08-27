import request from '@/utils/request';

export function fetchList(query) {
  return request({
    url: '/admin/reports',
    method: 'get',
    params: query
  });
}
