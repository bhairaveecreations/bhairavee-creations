import BrandHighlights from "@/components/home/BrandHighlights";
import CustomOrderCTA from "@/components/home/CustomOrderCTA";
import FAQSection from "@/components/home/FAQSection";
import Hero from "@/components/home/Hero";
import InstagramSection from "@/components/home/InstagramSection";
import SignatureCollection from "@/components/home/SignatureCollection";
import Testimonials from "@/components/home/Testimonials";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <SignatureCollection/>
      <BrandHighlights/>
      <CustomOrderCTA/>
      <Testimonials/>
      <InstagramSection/>
      <FAQSection/> 
    </main>
  );
}