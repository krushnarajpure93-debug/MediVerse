import ConsultHero from "./ConsultHero";
import DoctorFilter from "./DoctorFilter";
import DoctorList from "./DoctorList";
import AppointmentModal from "./AppointmentModal";
import ChatOrVideoCall from "./ChatOrVideoCall";
import { useEffect, useState } from "react";
import React from "react";
import axios from "../../api/axios";

export default function ConsultPage() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const fetchDoctors = async (filters = {}) => {
    try {
      setLoading(true);
      const res = await axios.get("/doctor/all", { params: filters });
      setDoctors(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  return (
    <div>
      <ConsultHero />

      <DoctorFilter
        onSelectSpecialty={(specialization) =>
          fetchDoctors(specialization ? { specialization } : {})
        }
      />

      <DoctorList
        doctors={doctors}
        loading={loading}
        onSelectDoctor={setSelectedDoctor}
      />

      {selectedDoctor && (
        <>
          <AppointmentModal
            doctor={selectedDoctor}
            onClose={() => setSelectedDoctor(null)}
          />
          <ChatOrVideoCall doctor={selectedDoctor} />
        </>
      )}
    </div>
  );
}
