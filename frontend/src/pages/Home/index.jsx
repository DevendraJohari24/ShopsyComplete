import BlogLatest from "../../features/BlogScreen/BlogLatest";
import { CountDownSection, ProductSection, PromotionSection } from "../../features/HomeScreen";
import FeatureHomePage from "../../features/HomeScreen/FeatureSection/FeatureHomePage";
import PortfolioSection from "../../features/HomeScreen/PortfolioSection";

export default function Home() {
  return (
    <>
      <PromotionSection />
      <ProductSection />
      <CountDownSection />
      <FeatureHomePage />
      <PortfolioSection />
			<BlogLatest />
    </>
  )
}
