import * as userService from '../services/users';

export default {
  namespace: 'users',
  state: {
    list: [],
    total: null,
    page: null,
  },
  reducers: {
    save(state, { payload: { data: list, total, page } }) {
      return { ...state, list, total, page };
    },
  },
  effects: {
    *fetch(action, { call, put }) {
      let page = 1;
      try {
        if (action.payload.page) page = action.payload.page;
      } catch (error) {
        console.log(error);
      }
      const { data, headers } = yield call(userService.fetch, { page });
      yield put({ type: 'save', payload: { data, total: headers['x-total-count'], page } });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/users') {
          dispatch({ type: 'fetch', payload: query });
        }
      });
    },
  },
};
