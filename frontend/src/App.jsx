import { Navigate, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { Suspense } from 'react';

import Loader from "./components/UI/Loader";


import RootLayout, {loader as rootLoader} from './layouts/RootLayout';
import { loader as productLoader } from './pages/Shop/ProductDetailPage';
import { loader as userLoader } from './pages/UserProfile';


import NotFound from './pages/NotFound';
import Home from './pages/Home';
import UserProfile from './pages/UserProfile';
import Cart from './pages/Cart';
import About from './pages/About';
import Checkout from './pages/Checkout';
import Contact from './pages/Contact';
import ComingSoon from './pages/ComingSoon';
import ProductGridPage from './pages/Shop/ProductGridPage';
import ProductDetailPage from './pages/Shop/ProductDetailPage';
import ProductSearch from './pages/Shop/ProductSearch';
import Gallery from './pages/Gallery';
import ShopLayout from './layouts/ShopLayout';
import BlogLayout from './layouts/BlogLayout';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';


function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route id='root' loader={rootLoader} 
       errorElement={<NotFound />}>
        <Route path='/' element={<RootLayout />} >
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
					<Route path="register" element={<Register />} />
					<Route
						path="user-profile"
            loader={userLoader}
            errorElement={<Navigate to="/login"  />}
						element={
							<PrivateRoute>
								<UserProfile />
							</PrivateRoute>
						}
					></Route>
          <Route path='shop' element={<ShopLayout />} >
            <Route index element={<ProductGridPage />} />
            <Route path=':productId' element={<ProductDetailPage />} loader={productLoader} />
            <Route path='search' element={<ProductSearch />} />
          </Route>
          <Route path='cart' element={<Cart />} />
          {/* <Route path='checkout' element={<Checkout />} action={checkoutAction} /> */}
          <Route path='about' element={<About />} />
          <Route path='contact' element={<Contact />} />
          {/* <Route path="blog" element={<BlogLayout />}>
						<Route index element={<BlogGridPage />} />
						<Route
							path=":blogId"
							element={<BlogDetailPage />}
							loader={blogLoader}
						/>
						<Route path="search" element={<SearchBlogsPage />} />
					</Route> */}
          <Route path='gallery' element={<Gallery />} />
        </Route>
        <Route path='coming-soon' element={<ComingSoon />} />
      </Route>
    )
  )
  return (
    <Suspense fallback={<Loader />}>
      <RouterProvider
      router={router}
      fallbackElement={<Loader />}
      />
      </Suspense>
  )
}

export default App
