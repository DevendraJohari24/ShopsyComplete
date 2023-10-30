import { Outlet, useLocation } from "react-router-dom";
import CommonSection from "../components/CommonSection";
import Header from "./Header";
import { Toaster } from "react-hot-toast";
import FeatureFooter from "../features/HomeScreen/FeatureSection/FeatureFooter";
import Footer from "./Footer";
import { productsApiSlice } from "../store/slices/productsSlice";

export default function RootLayout() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <>
    {isHomePage ? (
				<Header />
			) : (
				<CommonSection title={location.pathname.substring(1)}>
					<Header />
				</CommonSection>
			)}
      <main>
          <Outlet />
      </main>
      <Toaster
				position="top-right"
				reverseOrder={false}
				toastOptions={{
					duration: 1500,
				}}
			/>
			<FeatureFooter />
			<Footer />
    </>
  )
}


export const loader = async() => {
	const [getProducts, ] = productsApiSlice.useLazyGetProductsQuery();
  console.log(data);
  return data;
}

