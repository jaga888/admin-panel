import request from '@/utils/request';

export function login(data) {
  return request({
    url: '/vue-element-admin/user/login',
    method: 'post',
    data
  });
}

export function getInfo(token) {
  return request({
    url: '/admin/info',
    method: 'get',
  });
}

export function logout(token) {
  return request({
    url: '/admin/logout',
    method: 'post',
  });
}

export function fetchList(query) {
  return request({
    url: '/admin/users',
    method: 'get',
    params: query
  });
}
