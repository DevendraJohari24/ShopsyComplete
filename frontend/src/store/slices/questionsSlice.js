import { apiSlice } from './apiSlice';
const QUESTION_URL = '/api/v1/questions';

export const questionsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getQuestions: builder.query({
        query: () => ({
            url: `${QUESTION_URL}/`,
        }),
    }),
  }),
});

export const {
  useLazyGetQuestionsQuery
} = questionsApiSlice;