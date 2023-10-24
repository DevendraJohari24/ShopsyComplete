import ScrollToTop from '../../components/ScrollToTop';
import {
	IntroSection,
	QuestionSection,
	ServiceSection,
	SubscribeSection,
	TeamMemberSection,
	TestimonialsSection,
} from '../../features/AboutScreen';
import BlogLatest from '../../features/BlogScreen/BlogLatest';

const About = () => {
	return (
		<>
			<IntroSection />
			<ScrollToTop />
			<ServiceSection />
			<TeamMemberSection />
			<TestimonialsSection />
			<QuestionSection />
			<SubscribeSection />
			<BlogLatest />
		</>
	);
};

export default About;

