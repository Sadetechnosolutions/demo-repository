import { createSlice } from "@reduxjs/toolkit";
import data from '../photos.json'

const initialState = {
    uploaded: data,
    selected: null,
    folders: [],
    profilepic: 'profile.jpg',
    selectedprofilepic: 'profile.jpg'
}

const photoslice = createSlice({
    name: 'photo',
    initialState,
    reducers: {
        addPhoto(state, action) {
            state.uploaded.push(action.payload);
        },
        addCommentToImage(state, action) {
            const { imageId, commentInfo } = action.payload;
            const image = state.uploaded.find((img) => img.id === imageId);
            if (image) {
                if (!image.comments) {
                    image.comments = [];
                }
                image.comments.push(commentInfo);
            }
        },
        deleteComment(state, action) {
            const { imageId, commentId } = action.payload;
            const image = state.uploaded.find((img) => img.id === imageId);
            if (image && image.comments) {
                image.comments = image.comments.filter((image) => image.commentId !== commentId);
            }
        },
        editComment(state, action) {
            const { imageId, commentId, newComment } = action.payload;
            // Find the image and the comment to edit
            const image = state.uploaded.find((img) => img.id === imageId);
            if (image) {
              const comment = image.comments.find((c) => c.commentId === commentId);
              if (comment) {
                comment.comment = newComment;
              }
            }
          },
        selectPhoto(state, action) {
            state.selected = action.payload;
        },
        removeSelected(state) {
            state.selected = null;
        },
        removePhoto(state, action) {
            state.uploaded = state.uploaded.filter((item) => item.id !== action.payload);
        },
        addFolder(state, action) {
            state.uploaded.push(action.payload);
        },
        changePhoto(state, action) {
            state.selectedprofilepic = action.payload;
        },
        updatePhoto(state, action) {
            state.profilepic = action.payload;
        }
    }
});

export const { addPhoto, addCommentToImage,deleteComment,editComment, selectPhoto, removePhoto, removeSelected, addFolder, changePhoto, updatePhoto } = photoslice.actions;
export default photoslice.reducer;
