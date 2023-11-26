import {
  createAction,
  createSlice,
  Dispatch,
  PayloadAction,
} from "@reduxjs/toolkit";
import { UserData, UserMinData } from "./types";
import userService from "../service/userService";

interface UserState {
  isLoading: boolean;
  error: string | null;
  user: UserData | null;
  users: UserMinData[];
  searchedUsers: UserMinData[];
  dataLoaded: boolean;
}
const initialState: UserState = {
  isLoading: false,
  error: null,
  user: null,
  users: [],
  searchedUsers: [],
  dataLoaded: false,
};

export const userSlice = createSlice({
  name: "usersStore",
  initialState,
  reducers: {
    userRequested: (state: UserState) => {
      state.user = null;
      state.dataLoaded = false;
    },
    userSearchRequested: (state: UserState) => {
      state.dataLoaded = false;
    },
    userSearchCompleted: (
      state: UserState,
      action: PayloadAction<UserMinData[]>
    ) => {
      if (state.searchedUsers.length > 0) {
        const users = [
          ...state.searchedUsers,
          ...action.payload.filter(
            (user) =>
              !state.searchedUsers.some((sUser) => sUser._id === user._id)
          ),
        ];
        state.searchedUsers = users;
      } else {
        state.searchedUsers = action.payload;
      }
      state.dataLoaded = true;
    },
    userReceived: (state: UserState, action: PayloadAction<UserData>) => {
      state.dataLoaded = true;
      state.user = action.payload;
    },
    usersReceived: (state: UserState, action: PayloadAction<UserMinData[]>) => {
      state.dataLoaded = true;
      state.users = action.payload;
    },
    usersRequestFailed: (state: UserState, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});
const followRequested = createAction("user/FollowRequested");
const unfollowRequested = createAction("user/UnFollowRequested");
// export const loadUserData =
//   (userId: string) => async (dispatch: AppDispatch) => {
//     try {
//       dispatch(userRequested());
//       const data = await userService.loadUserData(userId);

//       dispatch(userReceived(data));
//     } catch (error: any) {
//       const message = error.response?.data?.message || "Something went wrong";
//       dispatch(usersRequestFailed(message));
//     }
//   };

export const searchUser = (name: string) => async (dispatch: Dispatch) => {
  try {
    dispatch(userSearchRequested());
    const users = await userService.searchUser(name);
    dispatch(userSearchCompleted(users));
  } catch (error: any) {
    console.log(error);
    const message = error.response?.data?.message || "Something went wrong";
    dispatch(usersRequestFailed(message));
  }
};
export const loadUser = (id: string) => async (dispatch: Dispatch) => {
  try {
    dispatch(userRequested());
    const data = await userService.getUserById(id);

    dispatch(userReceived(data));
  } catch (error: any) {
    const message = error.response?.data?.message || "Something went wrong";
    dispatch(usersRequestFailed(message));
  }
};
export const getSearchedUsers = () => (state: { usersStore: UserState }) =>
  state.usersStore.searchedUsers;
export const getUserData =
  () =>
  (state: { usersStore: UserState }): UserData | null =>
    state.usersStore.user;
export const getIsDataLoaded = () => (state: { usersStore: UserState }) =>
  state.usersStore.dataLoaded;
export const getIsLoading = () => (state: { usersStore: UserState }) =>
  state.usersStore.isLoading;
export const getUserError = () => (state: { usersStore: UserState }) =>
  state.usersStore.error;
const { reducer: userReducer, actions } = userSlice;
const {
  usersRequestFailed,
  userSearchRequested,
  userRequested,
  userSearchCompleted,
  userReceived,
} = actions;

export default userReducer;
