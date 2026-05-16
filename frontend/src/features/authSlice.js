import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../utils/axios.js";

//Login
export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await API.post("/api/users/login", userData);
      return response.data.data; //user
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login Failed");
    }
  },
);

//Register
export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await API.post("/api/users/register", userData);
      return response.data.data; //user
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Register Failed",
      );
    }
  },
);

//Logout

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.post("/api/users/logout");
      return true;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Logout Failed");
    }
  },
);

//Get current User
export const getCurrentUser = createAsyncThunk(
  "auth/me",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get("/api/users/me");
      return response.data.data; //user
    } catch (error) {
      return rejectWithValue(null); //not logedIn
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    guestId: localStorage.getItem("guestId") || null,
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    //set guestId
    setGuestId: (state, action) => {
      state.guestId = action.payload;
    },

    //remove guestId (after login)
    clearGuestId: (state) => {
      state.guestId = null;
    },
  },
  extraReducers: (builder) => {
    builder
      //login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      })

      //Get current user
      .addCase(getCurrentUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getCurrentUser.rejected, (state) => {
        state.loading = false;
        state.error = null;
      });
  },
});

export const { clearError, setGuestId, clearGuestId } = authSlice.actions;
export default authSlice.reducer;
