import { SwiperSlide } from 'swiper/react';
import Slider from '../../UI/Slider';
import BlogCard from '../BlogCard';

function BlogSlider({ blogs }) {
	return (
		<Slider
			breakpoints={{
				768: {
					slidesPerView: 2,
				},
				1280: {
					slidesPerView: 3,
				},
			}}
			loop={blogs.length > 2}
		>
			{blogs.map((blog) => (
				<SwiperSlide key={blog._id}>
					<BlogCard
						id={blog._id}
						title={blog.title}
						description={blog.description}
						tags={blog.tags}
						image={blog.image.url}
					/>
				</SwiperSlide>
			))}
		</Slider>
	);
}

export default BlogSlider;
