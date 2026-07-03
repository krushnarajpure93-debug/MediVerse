import HomeHero from "./HomeHero";
import Services from "./Services";
import HowItWorks from "./HowItWorks";
import HealthTrackerPreview from "./HealthTrackerPreview";
import EmergencyBanner from "./EmergencyBanner";
import CallToAction from "../../components/common/CallToAction";
import React from "react";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <Services />
      <HowItWorks />
      <HealthTrackerPreview />
      <EmergencyBanner />
      <CallToAction />
    </>
  );
}
