import request from '@/utils/request';

export function fetchList(query) {
  return request({
    url: '/admin/reports',
    method: 'get',
    params: query
  });
}

export function createReport(data) {
  return request({
    url: '/admin/reports',
    method: 'post',
    data
  });
}
