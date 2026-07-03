// src/api/mockData.js
export const mockUsers = [
  {
    _id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "admin",
    status: "Active",
  },
  {
    _id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "user",
    status: "Active",
  },
  {
    _id: "3",
    name: "Mark Lee",
    email: "mark@example.com",
    role: "user",
    status: "Inactive",
  },
  {
    _id: "4",
    name: "Alice Brown",
    email: "alice@example.com",
    role: "user",
    status: "Active",
  },
];

export const mockCourses = [
  {
    _id: "1",
    name: "React Basics",
    enrolled: 20,
    status: "Active",
  },
  {
    _id: "2",
    name: "Node.js Mastery",
    enrolled: 15,
    status: "Active",
  },
  {
    _id: "3",
    name: "Python Fundamentals",
    enrolled: 10,
    status: "Draft",
  },
];

export const mockLogs = [
  {
    user: "John Doe",
    action: "Created course React Basics",
    time: "2026-01-25 10:00",
  },
  {
    user: "Jane Smith",
    action: "Enrolled in Node.js",
    time: "2026-01-25 11:00",
  },
  { user: "Mark Lee", action: "Updated profile", time: "2026-01-25 12:00" },
];

export const mockNotifications = [
  { title: "Server Update", message: "Server will be down at 12:00 AM" },
  { title: "New User", message: "Alice Brown registered successfully" },
  { title: "Course Added", message: "React Basics course added" },
];
