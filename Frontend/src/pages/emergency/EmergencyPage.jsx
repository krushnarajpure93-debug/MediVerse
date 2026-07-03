import EmergencyHero from "./EmergencyHero";
import SOSButton from "./SOSButton";
import NearbyHospitals from "./NearbyHospitals";
import EmergencyContacts from "./EmergencyContacts";
import LiveLocationShare from "./LiveLocationShare";
import React from "react";
export default function EmergencyPage() {
  return (
    <div>
      <EmergencyHero />
      <SOSButton />
      <NearbyHospitals />
      <EmergencyContacts />
      <LiveLocationShare />
    </div>
  );
}
