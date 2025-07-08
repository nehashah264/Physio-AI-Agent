import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Exercise {
  name: string;
  description: string;
  reps: string;
  image_url: string;
}

interface RecommendationState {
  exercises: Exercise[];
  note: string;
  error: string | null;
  loading: boolean;
}

const initialState: RecommendationState = {
  exercises: [],
  note: '',
  error: null,
  loading: false,
};

const recommendationSlice = createSlice({
  name: 'recommendation',
  initialState,
  reducers: {
    setRecommendations: (
      state,
      action: PayloadAction<{ exercises: Exercise[]; note: string }>
    ) => {
      state.exercises = action.payload.exercises;
      state.note = action.payload.note;
      state.error = null;
      state.loading = false;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.exercises = [];
      state.note = '';
      state.loading = false;
    },
    setLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
  },
});

export const { setRecommendations, setError, setLoading } = recommendationSlice.actions;
export default recommendationSlice.reducer;