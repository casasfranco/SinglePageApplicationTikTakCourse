import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "axios";
import apiConfig from "../config/api";


let innerLoadVideos = async (path, thunkAPI) => {
  let token;
  try {
    token = thunkAPI.getState().user.user.jwtToken;
  } catch {
    return Promise.reject("No hay token");
  }

  if (!token) return Promise.reject("No hay token"); //puede ser null o undefined

  let response = await Axios.get(`${apiConfig.domain}/${path}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export const loadVideos = createAsyncThunk(
  "videos/load",
  async (page = 1, thunkAPI) => {
    innerLoadVideos(`videos?page=${page}`, thunkAPI)
  }
);

export const getVideo = createAsyncThunk(
  "videos/get",
  async (videoId, thunkAPI) => {
    let token;
    try {
      token = thunkAPI.getState().user.user.jwtToken;
    } catch {
      return Promise.reject("No hay token");
    }

    if (!token) return Promise.reject("No hay token"); //puede ser null o undefined

    let response = await Axios.get(`${apiConfig.domain}/videos/${videoId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);

export const createVideo = createAsyncThunk(
  "videos/create",
  async (videoData, thunkAPI) => {
    let token;
    try {
      token = thunkAPI.getState().user.user.jwtToken;
    } catch {
      return Promise.reject("No hay token");
    }
    if (!token) return Promise.reject("No hay token"); //puede ser null o undefined

    let response = await Axios.post(`${apiConfig.domain}/videos`, videoData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);

let videosSlice = createSlice({
  name: "videos",
  initialState: {
    status: "not_loaded",
    data: {
      videos: [], //videos cargados
      nextPage: 1,
      total: 1, //total de videos
    },
    currentVideo: null,
  },
  reducers: {},
  extraReducers: {
    [loadVideos.fulfilled]: (state, action) => {
      let { currentPage, nextPage, PrevPage, total } = action.payload;
      state.status = "success";
      state.data = {
        currentPage,
        nextPage,
        PrevPage,
        total,
        videos: state.data.videos.concat(action.payload.videos),
      };
    },
    [getVideo.fulfilled]: (state,action) => {
      state.status = 'success';
      state.currentVideo = action.payload;
    }
  },
});

export default videosSlice.reducer;
