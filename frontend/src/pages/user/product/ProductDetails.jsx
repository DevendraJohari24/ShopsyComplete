import { useParams } from "react-router-dom";
import { getProductById } from "../../../redux/api/productsApi";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";

function ProductDetails() {
  const { id } = useParams();
  const {
    data:productResponse, 
    isLoading:isLoadingProductResponse,
    isSuccess:isSuccessProductResponse,
    isError:isErrorProductResponse
  } = getProductById(id);
   
    if(isLoadingProductResponse){
      return (
          <LoadingSpinner />
      );
    }
    const {product} = productResponse;
    const { name:title, images, price, description} = product;
    const image = images[0].url;
    return(
      <>
      {isSuccessProductResponse && (
        <section className="pt-32 pb-12 lg:py-32 h-screen flex items-center">
        <div className="container mx-auto">
            <div className="flex flex-col lg:flex-row items-center">
                <div className="flex flex-1 justify-center items-center m-8 lg:mb-0">
                        <img className="max-w-[200px] lg:max-w-sm" src={image} alt="" />
                </div>
                <div className="flex-1 text-center lg:text-left">
                    <h1 className="text-[26px] font-medium mb-2 max-w-[450px] mx-auto lg:mx-0">{title}</h1>
                    <div className="text-xl text-red-500 font-medium mb-6">$ {price}</div>
                    <p className="mb-8">{description}</p>
                    <button 
                    onClick={() => console.log("Add to cart")}
                    className=" bg-primary py-4 px-8 text-white">Add to cart</button>
                </div>
            </div>
        </div>
        </section>
      )}
      </>
    )
    // <>
    {/* {isSuccess && ( data && 
        (
        <div className=" md:max-w-6xl mx-auto md:mt-20 flex flex-col gap-4 p-4 md:p-0">
          <div className="flex md:flex-row flex-col md:gap-28 gap-8">
          <div className='flex flex-col gap-6'>
              <img src={activeImg ||  data.product.images[0].url} alt="" className='w-full max-h-[300px] md:max-h-[600px] md:max-w-xl object-cover'/>
              <div className='grid grid-cols-3 gap-5'>
                {data.product.images.map((productImage, index) => (
                    <img src={productImage.url} key={index} alt="" className='w-full h-24 rounded-md cursor-pointer object-cover' onClick={() => setActiveImage(productImage.url)}/>
                ))}
              </div>
          </div>
          <div className='flex flex-col gap-4'>
              <div>
                  <span className="text-lg text-secondary">{data.product.category.name}</span>
                  <h1 className="text-5xl text-accent">{data.product.name}</h1>
                  <span className="text-sm">{data.product.numOfReviews} customer reviews</span>
              </div>
              <div className="rating ">
                        {
                            [...Array(5)].map((star, index) => {
                                return (
                                    <Star key={index} 
                                    className={`${index + 1 < data.product.ratings ? " text-orange-400": null}`}
                                    fill={`${ index + 1 < data.product.ratings ? "orange": null}`} />
                                )
                            })
                        }     
                    </div>    
              <div>
                <p className='text-3xl'>Price : Rs. {data.product.price}</p>
              </div>
              <div>
                <h4 className=" text-lg"><span className=" text-success">{data.product.stock} </span>item left in stock</h4>
              </div>
              <div>
                  <div className="flex space-x-4">
                    <button className="btn btn-xs" onClick={() => quantity+1 < data.product.stock && setQuantity((quantity) => quantity + 1)}><Plus /></button>
                    <p>{quantity}</p>
                    <button className="btn btn-xs" onClick={() => quantity>1 && setQuantity((quantity) => quantity - 1)}><Minus /></button>                  
                  </div>
              </div>
              <div className=''> 
                  <button className='btn btn-wide bg-primary'>Add to Cart</button>
              </div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
            <Accordian title="Product Description" content={data.product.description} />
            <AccordianReview reviews={data.product.reviews} />      
        </div>
        <div>
        {isAuthenticated && (
                  isUserDataSuccess && (
                    <div className="flex flex-col gap-2">
                        <div className="flex space-x-5 items-center h-full">
                            <Avatar image_url={userData.user.avatar.url} width="w-10" />
                            <div className="">
                                <p className="text-lg">{userData.user.name}</p>
                                <p className="text-sm">{userData.user.email}</p>
                            </div>
                        </div>
                          <div className="rating">
                            {[...Array(5)].map((star, index) => {
                              return (
                                <input key={index} 
                                type="radio" 
                                name="rating" 
                                className="mask mask-star-2 bg-orange-400"  
                                value={index + 1}
                                {
                                  ...register("ratings")
                                } />
                              );
                            })}
                          </div>
                          <div className="form-control">
                            <label className="label">
                              <span className="label-text">Write a comment here</span>
                            </label>
                            <textarea 
                            className="textarea textarea-bordered h-24" 
                            placeholder="Write Here...."
                            id="comment"
                            {...register("comment")}
                            ></textarea>
                          </div>
                          <button 
                          className="btn btn-success w-56 self-end"
                          onClick={handleSubmit(handleReviewsSubmit)}
                          >
                            Add Review
                            </button>
                    </div>
                  )  
                )}
        </div>
      </div>
        )
        )} */}
    
    // </>
}

export default ProductDetails