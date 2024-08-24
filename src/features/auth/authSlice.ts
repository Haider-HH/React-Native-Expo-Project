import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { supabase } from "../../lib/supabase";
import { Session } from "@supabase/supabase-js";
import { createAppAsyncThunk } from "@/src/redux/withTypes";
import { RootState } from "@/src/redux/store";

type Profile = {
    id: string;
    group: string;
    avatar_url: string | null;
    full_name: string | null;
    updated_at: string | null;
    username: string | null;
};

type AuthData = {
    session: Session | null;
    profile: Profile | null;
    loading: boolean;
    isAdmin: boolean;
};

const initialState: AuthData = {
    session: null,
    loading: true,
    profile: null,
    isAdmin: false,
};

// Thunks
export const fetchProfile = createAppAsyncThunk(
    'auth/fetchProfile',
    async (userId: string, { rejectWithValue }) => {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single();
        
        if (error) {
            console.log('Error fetching profile: ', error);
            return rejectWithValue(error.message);
        }
        return data;
    }
);

export const fetchSession = createAppAsyncThunk(
    'auth/fetchSession',
    async (_, { dispatch }) => {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
            await dispatch(fetchProfile(session.user.id)); // Fetch profile
        }
        return session;
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setSession: (state, action: PayloadAction<Session | null>) => {
            state.session = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchSession.pending, (state) => {
            console.log('Fetching session: pending');
            state.loading = true;
        })
        .addCase(fetchSession.fulfilled, (state, action: PayloadAction<Session | null>) => {
            console.log('Fetching session: fulfilled', action.payload);
            state.loading = false;
            state.session = action.payload;
        })
        .addCase(fetchSession.rejected, (state) => {
            console.log('Fetching session: rejected');
            state.loading = false;
            state.session = null;
            state.profile = null;
        })
        .addCase(fetchProfile.fulfilled, (state, action: PayloadAction<Profile | null>) => {
            console.log('Fetching profile: fulfilled', action.payload);
            state.profile = action.payload;
            state.isAdmin = action.payload?.group === 'ADMIN' ?? false;
        })
        .addCase(fetchProfile.rejected, (state) => {
            console.log('Fetching profile: rejected');
            state.profile = null;
            state.isAdmin = false;
        });
                
    },
});

// Export actions and the reducer
export const { setSession, setLoading } = authSlice.actions;
export default authSlice.reducer;

// Selector hooks for components to use the auth state
export const selectAuth = (state: RootState) => state.auth;
