const mongoose = require("mongoose");

const healthRecordSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    vitals: {
      heartRate: {
        value: Number,
        unit: { type: String, default: "bpm" },
        recordedAt: Date,
      },
      bloodPressure: {
        systolic: Number,
        diastolic: Number,
        unit: { type: String, default: "mmHg" },
        recordedAt: Date,
      },
      temperature: {
        value: Number,
        unit: { type: String, default: "°F" },
        recordedAt: Date,
      },
      oxygenLevel: {
        value: Number,
        unit: { type: String, default: "%" },
        recordedAt: Date,
      },
      weight: {
        value: Number,
        unit: { type: String, default: "kg" },
        recordedAt: Date,
      },
      height: {
        value: Number,
        unit: { type: String, default: "cm" },
        recordedAt: Date,
      },
      bmi: {
        value: Number,
        recordedAt: Date,
      },
      bloodSugar: {
        value: Number,
        type: { type: String, enum: ["fasting", "random", "postprandial"] },
        unit: { type: String, default: "mg/dL" },
        recordedAt: Date,
      },
    },
    allergies: [
      {
        allergen: String,
        severity: { type: String, enum: ["mild", "moderate", "severe"] },
        reaction: String,
      },
    ],
    chronicConditions: [
      {
        condition: String,
        diagnosedDate: Date,
        currentStatus: {
          type: String,
          enum: ["active", "controlled", "resolved"],
        },
      },
    ],
    medications: [
      {
        name: String,
        dosage: String,
        frequency: String,
        startDate: Date,
        endDate: Date,
        prescribedBy: String,
        isActive: { type: Boolean, default: true },
      },
    ],
    immunizations: [
      {
        vaccine: String,
        date: Date,
        nextDue: Date,
      },
    ],
    labReports: [
      {
        testName: String,
        testDate: Date,
        reportUrl: String,
        result: String,
        normalRange: String,
      },
    ],
    medicalDocuments: [
      {
        documentType: {
          type: String,
          enum: ["report", "scan", "prescription", "other"],
        },
        documentName: String,
        documentUrl: String,
        uploadedAt: { type: Date, default: Date.now },
      },
    ],
    surgeries: [
      {
        surgeryName: String,
        date: Date,
        hospital: String,
        surgeon: String,
        notes: String,
      },
    ],
    familyHistory: [
      {
        relation: String,
        condition: String,
        ageOfOnset: Number,
      },
    ],
    lifestyle: {
      smoking: { type: String, enum: ["never", "former", "current"] },
      alcohol: { type: String, enum: ["never", "occasional", "regular"] },
      exercise: {
        type: String,
        enum: ["sedentary", "light", "moderate", "active"],
      },
      diet: { type: String, enum: ["vegetarian", "non-vegetarian", "vegan"] },
    },
    emergencyNotes: {
      type: String,
      maxlength: 500,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("HealthRecord", healthRecordSchema);
