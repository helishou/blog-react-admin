/*
 * @Author       : helishou
 * @Date         : 2021-05-26 20:17:55
 * @LastEditTime : 2021-06-16 21:18:10
 * @LastEditors  : helishou
 * @Description  : user的model
 * @FilePath     : \src\models\user.js
 * 你用你的指尖,阻止我说再见,在bug完全失去之前
 */
import { query as queryAdmin, queryCurrent } from '@/services/user';

export default {
  namespace: 'user',

  state: {
    list: [],
    currentUser: {},
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryAdmin);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      // console.log(response);
      if (response.code == 0) {
        yield put({
          type: 'saveCurrentUser',
          payload: response.data,
        });
      }
    },
    // *delUser({ payload }, { call, put }) {
    //   const { resolve, params } = payload;
    //   const response = yield call(delUser, params);
    //   !!resolve && resolve(response);
    // },
  },

  reducers: {
    save(state, action) {
      console.log('save');
      return {
        ...state,
        list: action.payload,
      };
    },
    saveCurrentUser(state, action) {
      // console.log('saveCurrentUser');
      return {
        ...state,
        currentUser: action.payload || {},
      };
    },
    changeNotifyCount(state, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload,
        },
      };
    },
    saveUserList(state, { payload }) {
      return {
        ...state,
        userList: payload,
      };
    },
    saveUserListTotal(state, { payload }) {
      return {
        ...state,
        total: payload,
      };
    },
  },
};
