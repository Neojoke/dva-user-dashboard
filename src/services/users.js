import request from '../utils/request';
import { PAGE_SIZE } from '../constants';

export function fetch({ page = 1 }) {
  console.log(`user fetch PAGE_SIZE${PAGE_SIZE}`);
  return request(`/api/users?_page=${page}&_limit=${PAGE_SIZE}`);
}
