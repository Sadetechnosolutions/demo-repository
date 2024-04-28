import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  postliked:{},
  videoliked:{},
  postlikeCount:{},
  videolikeCount:{}
};

const likeslice = createSlice({
  name: 'like',
  initialState,
  reducers: {
    setpostLike(state, action) {
      const { id, liked } = action.payload;
      state.postliked[id] = liked;

      if (liked) {
        state.postlikeCount[id] = (state.postlikeCount[id] || 0) + 1;
      } else {
        state.postlikeCount[id] = Math.max((state.postlikeCount[id] || 0) - 1, 0);
      }
    },

        setvideoLike(state, action) {
      const { id, liked } = action.payload;
      state.videoliked[id] = liked;

      if (liked) {
        state.videolikeCount[id] = (state.videolikeCount[id] || 0) + 1;
      } else {
        state.videolikeCount[id] = Math.max((state.videolikeCount[id] || 0) - 1, 0);
      }
    },
  },
});

export const { setpostLike,setvideoLike } = likeslice.actions;
export default likeslice.reducer;
