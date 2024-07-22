import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import service from "../appwrite/config";

export const fetchposts = createAsyncThunk('post/fethposts', async () => {
    const response =service.getPosts();
    return response.documents;
});

export const createPost = createAsyncThunk('posts/createPost', async (postData) => {
    const response = await service.createPost(postData);
    return response;
});


export const updatePost = createAsyncThunk('posts/updatePost', async ({ id, postData }) => {
    const response = await service.updatePost(id, postData);
    return response;
});

const initialState = {
    posts: [],
    loading: false,
    error: null,
}

const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {}, //Synchornous action
    extraReducers: (builder) => { // Asynchronus action for using asyncThunk
        builder.addCase(fetchposts.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchposts.fulfilled,(state, action) => {
            state.posts = action.payload;
            state.loading = false;
        })
        .addCase(fetchposts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        .addCase(createPost.fulfilled, (state, action) => {
            state.posts.push(action.payload);
        })
        .addCase(updatePost.fulfilled, (state, action) => {
            const index = state.posts.findIndex(post => post.$id === action.payload.$id);
            if (index !== -1) {
             state.posts[index] = action.payload;   
            }
        })
    }
})