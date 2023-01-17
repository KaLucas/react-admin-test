import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { UsersApi } from '../providers/usersApi';

export const store = configureStore({
  reducer: {
    [UsersApi.reducerPath]: UsersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(UsersApi.middleware),
});

setupListeners(store.dispatch);

