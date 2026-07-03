const mongoose = require("mongoose");
const Doctor = require("./backend/models/Doctor.model");
// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/aipp")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Sample doctors
const doctors = [
  {
    user: new mongoose.Types.ObjectId(),
    specialization: "Cardiologist",
    qualifications: [{ degree: "MBBS", institution: "AIIMS", year: 2010 }],
    experience: 12,
    registrationNumber: "CARD12345",
    registrationCouncil: "MCI",
    clinicHospitalName: "Heart Care Hospital",
    clinicAddress: {
      street: "MG Road",
      city: "Pune",
      state: "Maharashtra",
      pincode: "411001",
    },
    consultationFee: 1000,
    languages: ["English", "Hindi"],
    about:
      "Experienced cardiologist with 12 years of practice in heart surgeries.",
    isVerified: true,
    verificationStatus: "verified",
    documents: [
      { type: "Medical License", url: "https://example.com/doc1.pdf" },
      { type: "Degree Certificate", url: "https://example.com/doc2.pdf" },
    ],
  },
  {
    user: new mongoose.Types.ObjectId(),
    specialization: "Dermatologist",
    qualifications: [{ degree: "MBBS", institution: "KEM", year: 2012 }],
    experience: 8,
    registrationNumber: "DERM56789",
    registrationCouncil: "MCI",
    clinicHospitalName: "SkinCare Clinic",
    clinicAddress: {
      street: "Linking Road",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400050",
    },
    consultationFee: 800,
    languages: ["English", "Marathi"],
    about: "Specialist in skin treatments and cosmetic procedures.",
    isVerified: true,
    verificationStatus: "verified",
  },
  {
    user: new mongoose.Types.ObjectId(),
    specialization: "Pediatrician",
    qualifications: [
      { degree: "MBBS", institution: "BJ Medical College", year: 2011 },
    ],
    experience: 10,
    registrationNumber: "PED11223",
    registrationCouncil: "MCI",
    clinicHospitalName: "Happy Kids Clinic",
    clinicAddress: {
      street: "FC Road",
      city: "Pune",
      state: "Maharashtra",
      pincode: "411004",
    },
    consultationFee: 600,
    languages: ["English", "Hindi"],
    about: "Caring pediatrician with focus on child health and nutrition.",
    isVerified: false,
    verificationStatus: "pending",
  },
  {
    user: new mongoose.Types.ObjectId(),
    specialization: "Orthopedic",
    qualifications: [{ degree: "MBBS", institution: "AIIMS", year: 2008 }],
    experience: 15,
    registrationNumber: "ORTH33445",
    registrationCouncil: "MCI",
    clinicHospitalName: "Bone & Joint Hospital",
    clinicAddress: {
      street: "Juhu",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400049",
    },
    consultationFee: 1200,
    languages: ["English", "Hindi", "Marathi"],
    about: "Expert in joint replacement surgeries and sports injuries.",
    isVerified: true,
    verificationStatus: "verified",
  },
  {
    user: new mongoose.Types.ObjectId(),
    specialization: "Neurologist",
    qualifications: [{ degree: "MBBS", institution: "KEM", year: 2009 }],
    experience: 14,
    registrationNumber: "NEURO99887",
    registrationCouncil: "MCI",
    clinicHospitalName: "BrainCare Hospital",
    clinicAddress: {
      street: "Camp",
      city: "Pune",
      state: "Maharashtra",
      pincode: "411001",
    },
    consultationFee: 1500,
    languages: ["English", "Hindi"],
    about: "Neurologist specializing in brain and nerve disorders.",
    isVerified: true,
    verificationStatus: "verified",
  },
];

// Insert sample doctors
const insertDoctors = async () => {
  try {
    await Doctor.deleteMany(); // Optional: clear existing data
    const result = await Doctor.insertMany(doctors);
    console.log("Sample doctors inserted:", result);
    mongoose.connection.close();
  } catch (err) {
    console.error(err);
  }
};

insertDoctors();
