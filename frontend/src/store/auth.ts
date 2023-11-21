import {
  createAction,
  createSlice,
  Dispatch,
  PayloadAction,
} from "@reduxjs/toolkit";

import localStorageService from "../service/localStorageService";
import authService from "../service/authService";
import { UserData } from "./types";
import {
  AuthErrors,
  LoginData,
  RegisterData,
} from "../componets/Form/formTypes";

interface AuthState {
  isLoading: boolean;
  error: string | null | AuthErrors;
  auth: { userId: string | null } | null;
  currentUser: UserData | null;
  dataLoaded: boolean;
  isLoggedIn: boolean;
  authSuccess: string | null;
}
const initialState: AuthState = localStorageService.getAccessToken()
  ? {
      isLoading: false,
      error: null,
      auth: { userId: localStorageService.getUserId() },
      currentUser: null,
      dataLoaded: false,
      isLoggedIn: true,
      authSuccess: null,
    }
  : {
      isLoading: false,
      error: null,
      auth: null,
      dataLoaded: false,
      currentUser: null,
      isLoggedIn: false,
      authSuccess: null,
    };

export const authSlice = createSlice({
  name: "authStore",
  initialState,
  reducers: {
    authRequested: (state: AuthState) => {
      state.isLoading = true;
    },
    userReceived: (state: AuthState, action: PayloadAction<UserData>) => {
      state.dataLoaded = true;
      state.currentUser = action.payload;
      state.isLoading = false;
    },
    userRequestFailed: (state: AuthState, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    authRequestSuccess: (
      state: AuthState,
      action: PayloadAction<[{ userId: string }, { message: string }]>
    ) => {
      state.auth = action.payload[0];
      state.isLoading = false;
      state.isLoggedIn = true;
      state.authSuccess = action.payload[1].message;
    },
    authRequestFailed: (
      state: AuthState,
      action: PayloadAction<string | AuthErrors>
    ) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    authErrorReset: (state: AuthState) => {
      state.error = null;
    },

    loggedOut: (state: AuthState) => {
      state.isLoggedIn = false;
    },
  },
});

export const signUp = (payload: RegisterData) => async (dispatch: Dispatch) => {
  try {
    dispatch(authRequested());
    const data = await authService.register(payload);
    localStorageService.setTokens({ ...data, expiresIn: 90000 });
    dispatch(
      authRequestSuccess([{ userId: data._id }, { message: "User Created" }])
    );
    dispatch(userReceived(data));
    return true;
  } catch (error: any) {
    const message = error.response?.data?.message || "Something went wrong";
    if (Array.isArray(message)) {
      const errors: AuthErrors = {
        username: message.find((m: string) => m.includes("username")),
        email: message.find((m: string) => m.toLowerCase().includes("email")),
        password: message.find((m: string) => m.includes("password")),
      };
      dispatch(authRequestFailed(errors));
    } else {
      dispatch(authRequestFailed(message));
    }
  }
};
const userRequsted = createAction("current user requestd");
export const signIn = (payload: LoginData) => async (dispatch: Dispatch) => {
  try {
    dispatch(authRequested());
    const data = await authService.login(payload);
    localStorageService.setTokens({ ...data, expiresIn: 90000 });
    dispatch(
      authRequestSuccess([{ userId: data._id }, { message: "Logged In!" }])
    );
    return true;
  } catch (error: any) {
    const message = error.response?.data?.message || "Something went wrong";

    dispatch(authRequestFailed(message));
  }
};
export const resetAuthError = () => (dispatch: Dispatch) => {
  dispatch(authErrorReset());
};

// export const loadCurrentUser = () => async (dispatch: Dispatch) => {
//   try {
//     dispatch(userRequsted());
//     const data = await userService.getUserById(
//       localStorageService.getUserId()!
//     );
//     dispatch(userReceived(data));
//   } catch (error: any) {
//     const message = error.response?.data?.message || "Something went wrong";
//     dispatch(authRequestFailed(message));
//   }
// };

export const logOut = () => (dispatch: Dispatch) => {
  dispatch(loggedOut());
  localStorageService.removeAuthData();
};
export const getAuthError =
  () =>
  (state: { authStore: AuthState }): string | null | AuthErrors =>
    state.authStore.error;

export const getIsLoggedIn =
  () =>
  (state: { authStore: AuthState }): boolean =>
    state.authStore.isLoggedIn;
export const getAuthSuccess =
  () =>
  (state: { authStore: AuthState }): string | null =>
    state.authStore.authSuccess;
export const getAuthLoading =
  () =>
  (state: { authStore: AuthState }): boolean =>
    state.authStore.isLoading;
export const getCurrentUser =
  () =>
  (state: { authStore: AuthState }): UserData | null =>
    state.authStore.currentUser;

export const getCurrentUserId =
  () =>
  (state: { authStore: AuthState }): string | null | undefined =>
    state.authStore.auth?.userId;

const { reducer: authReducer, actions } = authSlice;
const {
  authRequestSuccess,
  loggedOut,
  authRequested,
  authRequestFailed,
  userReceived,
  authErrorReset,
} = actions;

export default authReducer;
