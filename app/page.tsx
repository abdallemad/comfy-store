import FeatureProducts from "@/components/home/FeatureProducts";
import Hero from "@/components/home/Hero";
import { Suspense } from "react";
import LoadingContainer from "@/components/global/LoadingContainer";
export default function Home() {
  return <>
  <Hero />
  {/* <LoadingContainer /> */}
  <Suspense fallback={<LoadingContainer/>}>
    <FeatureProducts />
  </Suspense>
  </>
}
