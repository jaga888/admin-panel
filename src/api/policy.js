import request from '@/utils/request';

export function fetchList(query) {
  return request({
    url: '/admin/policies',
    method: 'get',
    params: query
  });
}
