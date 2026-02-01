import { userSlice } from './slice';
import {
  fetchLogin,
  fetchRegistration,
  fetchLogout,
  fetchUpdateUser
} from './thunks';
import { TUser } from '@utils-types';

const mockUser: TUser = {
  email: 'test_user@test.ru',
  name: 'Test User'
};

describe('userSlice', () => {
  describe('логин', () => {
    test('fetchLogin.pending', () => {
      const initialState = {
        user: null,
        loading: false
      };

      const result = userSlice.reducer(
        initialState,
        fetchLogin.pending('', {
          email: 'test_user@test.ru',
          password: 'test_user_password'
        })
      );

      expect(result.loading).toBe(true);
    });

    test('fetchLogin.fulfilled', () => {
      const initialState = {
        user: null,
        loading: true
      };

      const result = userSlice.reducer(
        initialState,
        fetchLogin.fulfilled(mockUser, '', {
          email: 'test_user@test.ru',
          password: 'test_user_password'
        })
      );

      expect(result.loading).toBe(false);
      expect(result.user).toEqual(mockUser);
    });

    test('fetchLogin.rejected', () => {
      const initialState = {
        user: null,
        loading: true
      };

      const result = userSlice.reducer(
        initialState,
        fetchLogin.rejected(new Error('Error message'), '', {
          email: 'test_user@test.ru',
          password: 'test_user_password'
        })
      );

      expect(result.loading).toBe(false);
      expect(result.user).toBeNull();
    });
  });

  describe('регистрация', () => {
    test('fetchRegistration.pending', () => {
      const initialState = {
        user: null,
        loading: false
      };

      const result = userSlice.reducer(
        initialState,
        fetchRegistration.pending('', {
          email: 'test_user@test.ru',
          password: 'test_user_password',
          name: 'Test user'
        })
      );

      expect(result.loading).toBe(true);
    });

    test('fetchRegistration.fulfilled', () => {
      const initialState = {
        user: null,
        loading: true
      };

      const result = userSlice.reducer(
        initialState,
        fetchRegistration.fulfilled(mockUser, '', {
          email: 'test_user@test.ru',
          password: 'test_user_password',
          name: 'Test user'
        })
      );

      expect(result.loading).toBe(false);
      expect(result.user).toEqual(mockUser);
    });

    test('fetchRegistration.rejected', () => {
      const initialState = {
        user: null,
        loading: true
      };

      const result = userSlice.reducer(
        initialState,
        fetchRegistration.rejected(new Error('Error message'), '', {
          email: 'test_user@test.ru',
          password: 'test_user_password',
          name: 'Test user'
        })
      );

      expect(result.loading).toBe(false);
      expect(result.user).toBeNull();
    });
  });

  describe('логаут', () => {
    test('fetchLogout.pending', () => {
      const initialState = {
        user: mockUser,
        loading: false
      };

      const result = userSlice.reducer(
        initialState,
        fetchLogout.pending('', undefined)
      );

      expect(result.loading).toBe(true);
    });

    test('fetchLogout.fulfilled', () => {
      const initialState = {
        user: mockUser,
        loading: true
      };

      const result = userSlice.reducer(
        initialState,
        fetchLogout.fulfilled(undefined, '', undefined)
      );

      expect(result.loading).toBe(false);
      expect(result.user).toBeNull();
    });

    test('fetchLogout.rejected', () => {
      const initialState = {
        user: mockUser,
        loading: true
      };

      const result = userSlice.reducer(
        initialState,
        fetchLogout.rejected(new Error('Logout failed'), '', undefined)
      );

      expect(result.loading).toBe(false);
      expect(result.user).toEqual(mockUser);
    });
  });

  describe('обновление', () => {
    test('fetchUpdateUser.pending', () => {
      const initialState = {
        user: mockUser,
        loading: false
      };

      const result = userSlice.reducer(
        initialState,
        fetchUpdateUser.pending('', { name: 'Updated User' })
      );

      expect(result.loading).toBe(true);
    });

    test('fetchUpdateUser.fulfilled', () => {
      const initialState = {
        user: mockUser,
        loading: true
      };

      const updatedUser = { ...mockUser, name: 'Updated User' };

      const result = userSlice.reducer(
        initialState,
        fetchUpdateUser.fulfilled(updatedUser, '', { name: 'Updated User' })
      );

      expect(result.loading).toBe(false);
      expect(result.user).toEqual(updatedUser);
    });

    test('fetchUpdateUser.rejected', () => {
      const initialState = {
        user: mockUser,
        loading: true
      };

      const result = userSlice.reducer(
        initialState,
        fetchUpdateUser.rejected(new Error('Error message'), '', {
          name: 'Updated User'
        })
      );

      expect(result.loading).toBe(false);
      expect(result.user).toEqual(mockUser);
    });
  });
});
