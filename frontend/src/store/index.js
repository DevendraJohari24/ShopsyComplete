import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import {
	persistReducer,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
	FLUSH,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// import cartReducer from './cart/cartSlice';
import modalReducer from './modal/modalSlice';
import authReducer from './auth/authSlice';
// import { blogsApi } from './api/blogs/blogsApi';
// import { countdownsApi } from './api/countdowns/countdownsApi';
// import { featuresApi } from './api/features/featuresApi';
// import { portfoliosApi } from './api/portfolios/portfoliosApi';
// import { promotionsApi } from './api/promotions/promotionsApi';
// import { questionsApi } from './api/questions/questionsApi';
// import { servicesApi } from './api/services/servicesApi';
// import { slidersApi } from './api/sliders/slidersApi';
// import { teamsApi } from './api/teams/teamsApi';
// import { feedbacksApi } from './api/feedbacks/feedbacksApi';
import { authApi } from './api/auth/authApi';
import { usersApi } from './api/users/usersApi';
import { productsApi } from './api/products/productsApi';
// import authReducer from './auth/authSlice';

const reducers = combineReducers({
    auth: authReducer,
	modal: modalReducer,
    [productsApi.reducerPath]: productsApi.reducer,
    // [blogsApi.reducerPath]: blogsApi.reducer,
    // [countdownsApi.reducerPath]: countdownsApi.reducer,
    // [featuresApi.reducerPath]: featuresApi.reducer,
    // [portfoliosApi.reducerPath]: portfoliosApi.reducer,
    // [promotionsApi.reducerPath]: promotionsApi.reducer,
    // [questionsApi.reducerPath]: questionsApi.reducer,
    // [servicesApi.reducerPath]: servicesApi.reducer,
    // [slidersApi.reducerPath]: slidersApi.reducer,
    // [teamsApi.reducerPath]: teamsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer
});
const PersistConfig = {
	key: 'root',
	storage,
	version: 1,
	whitelist: ['cart'],
};

const persistedReducer = persistReducer(PersistConfig, reducers);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		})
        .concat(productsApi.middleware)
        // .concat(blogsApi.middleware).concat(countdownsApi.middleware)
        // .concat(featuresApi.middleware).concat(feedbacksApi.middleware)
        // .concat(portfoliosApi.middleware).concat(promotionsApi.middleware)
        // .concat(questionsApi.middleware).concat(servicesApi.middleware)
        // .concat(slidersApi.middleware).concat(teamsApi.middleware)
        .concat(authApi.middleware).concat(usersApi.middleware),
    devTools: true
});
