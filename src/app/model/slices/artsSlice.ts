import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../../shared/api/axios";

const setParams = (author: string, tags: string[]) => {
  let params: {[k: string]: any} = {page_size: 15};
  if (author != '') {
    params.author = author;
  }
  if (tags.length > 0) {
    params.tags = tags;
  }
  return params;
}

export const fetchNewArts = createAsyncThunk('arts/fetchNewArts', async (args, { getState }) => {
  const state = getState();
  const author = state.arts.search.username;
  const tags = state.arts.search.tags;

  const params = setParams(author, tags);

  const { data } = await instance.get('/arts/new/', {params});
  // console.log(data)
  return data;
})
export const fetchPopularArts = createAsyncThunk('arts/fetchPopularArts', async (args, { getState }) => {
  const state = getState();
  const author = state.arts.search.username;
  const tags = state.arts.search.tags;

  const params = setParams(author, tags);

  const { data } = await instance.get('/arts/popular/', {params});

  return data;
})
export const fetchSubscriptionsArts = createAsyncThunk('arts/fetchSubscriptionsArts', async (args, { getState }) => {
  const state = getState();
  const author = state.arts.search.username;
  const tags = state.arts.search.tags;

  const params = setParams(author, tags);
  
  const { data } = await instance.get('/arts/subscriptions/', {params});

  return data;
})
export const fetchUserArts = createAsyncThunk('arts/fetchUserArts', async (id) => {
  const { data } = await instance.get(`/arts/users/${id}/`, { 
    params: {
      page_size: 15
    }});

  // console.log(data)
  return data;
})

export const fetchNewPage = createAsyncThunk('arts/fetchNewPage', async (args, { getState }) => {
  const state = getState();
  const url = state.arts.arts.next.slice(28);
  const { data } = await instance.get(url);

  return data;
})

const initialState = {
  arts: {
    items: [],
    status: 'loading',
    next: '',
  },
  feedName: 'новые работы',
  search: {
    username: '',
    tags: [],
  }
}

const artsSlice = createSlice({
  name: 'arts',
  initialState,
  reducers: {
    setFeedName: (state, action) => {
      state.feedName = action.payload;
    },
    setSearchUsername: (state, action) => {
      state.search.username = action.payload;
    },
    setSearchTags: (state, action) => {
      state.search.tags = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
    //fetchNewArts
      .addCase(fetchNewArts.pending, (state) => {
        state.arts.items = [];
        state.arts.status = 'loading';
      })
      .addCase(fetchNewArts.fulfilled, (state, action) => {
        state.arts.items = action.payload.results;
        state.arts.next = action.payload.next;
        state.arts.status = 'loaded';
      })
      .addCase(fetchNewArts.rejected, (state) => {
        state.arts.items = [];
        state.arts.status = 'error';
      })
    //fetchPopularArts
      .addCase(fetchPopularArts.pending, (state) => {
        state.arts.items = [];
        state.arts.status = 'loading';
      })
      .addCase(fetchPopularArts.fulfilled, (state, action) => {
        state.arts.items = action.payload.results;
        state.arts.next = action.payload.next;
        state.arts.status = 'loaded';
      })
      .addCase(fetchPopularArts.rejected, (state) => {
        state.arts.items = [];
        state.arts.status = 'error';
      })
    //fetchSubscriptionsArts
      .addCase(fetchSubscriptionsArts.pending, (state) => {
        state.arts.items = [];
        state.arts.status = 'loading';
      })
      .addCase(fetchSubscriptionsArts.fulfilled, (state, action) => {
        state.arts.items = action.payload.results;
        state.arts.next = action.payload.next;
        state.arts.status = 'loaded';
      })
      .addCase(fetchSubscriptionsArts.rejected, (state) => {
        state.arts.items = [];
        state.arts.status = 'error';
      })
    //fetchUserArts
      .addCase(fetchUserArts.pending, (state) => {
        state.arts.items = [];
        state.arts.status = 'loading';
      })
      .addCase(fetchUserArts.fulfilled, (state, action) => {
        state.arts.items = action.payload.results;
        state.arts.next = action.payload.next;
        state.arts.status = 'loaded';
      })
      .addCase(fetchUserArts.rejected, (state) => {
        state.arts.items = [];
        state.arts.status = 'error';
      })

    //fetchNewPage
      .addCase(fetchNewPage.pending, (state) => {
        state.arts.status = 'loading';
      })
      .addCase(fetchNewPage.fulfilled, (state, action) => {
        state.arts.items = [...state.arts.items, ...action.payload.results];
        state.arts.next = action.payload.next;
        state.arts.status = 'loaded';
      })
      .addCase(fetchNewPage.rejected, (state) => {
        state.arts.status = 'error';
      })
  }
})


export const artsReducer = artsSlice.reducer;

export const selectStatus = (state) => state?.arts?.arts?.status
export const selectNext = (state) => state?.arts?.arts?.next
export const selectFeedName = (state) => state?.arts?.feedName
export const selectSearchUsername = (state) => state.arts.search.username

export const {setFeedName, setSearchUsername, setSearchTags} = artsSlice.actions;