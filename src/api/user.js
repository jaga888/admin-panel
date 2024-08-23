import request from '@/utils/request';

export function login(data) {
  return request({
    url: '/vue-element-admin/user/login',
    method: 'post',
    data
  });
}

export function getInfo() {
  return request({
    url: '/admin/info',
    method: 'get'
  });
}

export function logout() {
  return request({
    url: '/admin/logout',
    method: 'post'
  });
}

export function fetchList(query) {
  return request({
    url: '/admin/users',
    method: 'get',
    params: query
  });
}

export function getUser(id) {
  return request({
    url: `/admin/users/${id}`,
    method: 'get'
  });
}

export function updateUser(id, data) {
  return request({
    url: `/admin/users/${id}`,
    method: 'put',
    data: {
      ...data,
      id: id
    }
  });
}

export function createUser(data) {
  return request({
    url: '/admin/users',
    method: 'post',
    data
  });
}
