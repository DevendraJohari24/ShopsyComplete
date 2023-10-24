import Glider from 'react-glider';
import 'glider-js/glider.min.css';
import { useCallback } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';

const carouselData = [
    {
        "id": 1,
        "image": "/public/carousel-1.jpg"
    },
    {
        "id": 2,
        "image": "/public/carousel-2.jpg"
    },
    {
        "id": 3,
        "image": "/public/carousel-3.jpg"
    },
    {
        "id": 4,
        "image": "/public/carousel-4.jpg"
    }
]

export default function MainCarousel() {
    const intervalRef = useRef();
    const gliderRef = useCallback((glider) => {
        if(glider){
            if(!intervalRef.current){
                intervalRef.current = setInterval(() => {
                    let index = glider.page;
                    if(index < carouselData.length){
                        index += 1;
                    }else{
                        index = 0;
                    }
                    glider.scrollItem(index, false);
                }, 3000);
            }
        }
    }, []);

    useEffect(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
    }, [])
  return (
          <div className="w-full h-fit">
                <Glider
                className="glider-container"
                draggable
                slidesToShow={1}
                scrollLock
                hasDots
                ref={gliderRef}
            >
                {carouselData.map((data) => (
                <div className="w-full max-h-[700px] relative" key={data.id}>
                    <img src={data.image} className="w-[100%] h-[100%] object-cover" />
                    {/* Text */}
                    <div className="absolute top-1/2 left-32 -translate-y-[50%] text-gray-700 max-w-md flex flex-col space-y-8">
                        <h4 className=" text-xl tracking-[0.5rem] font-medium">Elessi store</h4>
                        <h1 className="text-5xl font-bold tracking-wider">Looking for the Best Price</h1>     
                        <button className="bg-primary w-32 h-11 text-center text-white text-md font-semibold tracking-wide">Shop Now</button>                   
                    </div>
                </div> 
                )
                )}    
            </Glider>
          </div>
  )
}
