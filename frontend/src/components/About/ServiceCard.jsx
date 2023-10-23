import { Link } from 'react-router-dom';

function ServiceCard({ title, description, iconImg }) {
	return (
		<div className="bg-white shadow-card md:px-8 px-6 py-10 rounded-md h-full">
			<div className="flex items-center">
				<img
					src={iconImg?.url}
					alt={title}
				/>
				<Link
					className="lg:text-2xl md:text-xl text-lg font-bold ml-6 hover:text-greenBtn transition-all"
					wto="/Our-Service"
				>
					{title}
				</Link>
			</div>
			<p className="mt-5">{description}</p>
		</div>
	);
}

export default ServiceCard;
