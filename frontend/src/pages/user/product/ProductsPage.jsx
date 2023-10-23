import { useEffect, useState } from "react";
import CategoryCarousel from "../../../components/Carousel/CategoryCarousel"
import { useGetCategoriesQuery } from "../../../redux/api/productsApi";
import ProductsGrid from "../../../components/ProductsGrid/ProductsGrid";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function ProductsPage() {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const categoriesResponse = useGetCategoriesQuery();
  const {isAuthenticated} = useSelector((state) => state.auth);

  const handleActiveIndex = (updatedIndex) => {
      setActiveIndex(updatedIndex);
  } 

  useEffect(() => {
    if(!isAuthenticated){
      navigate("/user/login");
    }
  }, [isAuthenticated, navigate]);
  return (
    <div>
      <section>
        <div className="">
          {categoriesResponse.isSuccess && (
            categoriesResponse.data &&  <CategoryCarousel activeIndex={activeIndex} handleActiveIndex={handleActiveIndex} categories={categoriesResponse.data.categories} />
          )}
        </div>
      </section>
      <section>
          <div className="m-2">
          {categoriesResponse.isSuccess && (
            categoriesResponse.data && <ProductsGrid categoryName={categoriesResponse.data.categories[activeIndex].name} />
            )}
          </div>
      </section>
      
    </div>
  )
}

export default ProductsPage