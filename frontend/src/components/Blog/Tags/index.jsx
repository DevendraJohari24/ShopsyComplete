import { FaTags } from 'react-icons/fa';
import Button from '../../UI/Button';
import Tooltip from '../../UI/Tooltip';

function Tags({ tags, relatedTag }) {
	return (
		<div className="mb-3">
			<div className="flex items-center">
				{!relatedTag && <FaTags className="text-greenBtn" />}
				<div className="flex flex-wrap md:gap-6 gap-4">
					{tags?.map((tag, index) => (
						<Tooltip content="Feature under development" key={index}>
							<Button
								btn={relatedTag ? 'tag2' : 'tag'}
								key={index}
								type="link"
								link="/blog"
							>
								{tag}
							</Button>
						</Tooltip>
					))}
				</div>
			</div>
		</div>
	);
}

export default Tags;
