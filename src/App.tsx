import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Plus, 
  Pencil, 
  Trash2, 
  CheckCircle2, 
  AlertCircle, 
  ArrowLeft,
  GraduationCap,
  BookOpen,
  Calendar,
  ListFilter
} from 'lucide-react';

interface Student {
  id: number;
  fullName: string;
  email: string;
  age: number;
}

export default function App() {
  // Navigation state: 'dashboard' | 'students' | 'create' | 'edit' | 'delete'
  const [currentView, setCurrentView] = useState<'dashboard' | 'students' | 'create' | 'edit' | 'delete'>('dashboard');
  const [selectedStudentId, setSelectedStudentId] = useState<number | null>(null);

  // Student database state (simulating real SQL Server records via EF Core)
  const [students, setStudents] = useState<Student[]>([
    { id: 1, fullName: 'Ahmed Mohamed', email: 'ahmed.mohamed@example.com', age: 21 },
    { id: 2, fullName: 'Sara Mahmoud', email: 'sara.mahmoud@example.com', age: 20 },
    { id: 3, fullName: 'Omar Khaled', email: 'omar.khaled@example.com', age: 22 },
    { id: 4, fullName: 'Mariam Ali', email: 'mariam.ali@example.com', age: 19 },
  ]);

  // Form states for Create & Edit
  const [formData, setFormData] = useState({ fullName: '', email: '', age: '' });
  const [formErrors, setFormErrors] = useState<{ fullName?: string; email?: string; age?: string }>({});
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Form validation matching Data Annotations
  const validateForm = () => {
    const errors: { fullName?: string; email?: string; age?: string } = {};
    if (!formData.fullName.trim()) {
      errors.fullName = 'Full Name is required.';
    } else if (formData.fullName.trim().length < 3) {
      errors.fullName = 'Full Name must be at least 3 characters.';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address.';
    }

    const ageNum = parseInt(formData.age, 10);
    if (!formData.age) {
      errors.age = 'Age is required.';
    } else if (isNaN(ageNum) || ageNum < 16 || ageNum > 100) {
      errors.age = 'Age must be between 16 and 100.';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCreateStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const newId = students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1;
    const newStudent: Student = {
      id: newId,
      fullName: formData.fullName.trim(),
      email: formData.email.trim(),
      age: parseInt(formData.age, 10),
    };

    setStudents([...students, newStudent]);
    setFormData({ fullName: '', email: '', age: '' });
    setFormErrors({});
    setCurrentView('students');
    showToast(`Student "${newStudent.fullName}" created successfully!`);
  };

  const handleStartEdit = (student: Student) => {
    setSelectedStudentId(student.id);
    setFormData({
      fullName: student.fullName,
      email: student.email,
      age: student.age.toString(),
    });
    setFormErrors({});
    setCurrentView('edit');
  };

  const handleUpdateStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm() || selectedStudentId === null) return;

    setStudents(students.map(s => {
      if (s.id === selectedStudentId) {
        return {
          id: s.id,
          fullName: formData.fullName.trim(),
          email: formData.email.trim(),
          age: parseInt(formData.age, 10),
        };
      }
      return s;
    }));

    setCurrentView('students');
    showToast('Student record updated successfully!');
  };

  const handleStartDelete = (id: number) => {
    setSelectedStudentId(id);
    setCurrentView('delete');
  };

  const handleConfirmDelete = () => {
    if (selectedStudentId === null) return;
    const student = students.find(s => s.id === selectedStudentId);
    setStudents(students.filter(s => s.id !== selectedStudentId));
    setSelectedStudentId(null);
    setCurrentView('students');
    showToast(`Student "${student?.fullName || ''}" deleted successfully.`);
  };

  const selectedStudent = students.find(s => s.id === selectedStudentId);

  return (
    <div className="flex h-screen bg-[#F8FAFC] text-[#0F172A] font-sans antialiased overflow-hidden">
      
      {/* Toast Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-lg text-sm text-white transition-all transform animate-bounce ${
          notification.type === 'success' ? 'bg-[#2563EB]' : 'bg-red-600'
        }`}>
          <CheckCircle2 className="w-4 h-4" />
          <span>{notification.message}</span>
        </div>
      )}

      {/* LEFT SIDEBAR (Clean reproduction matching original screenshot) */}
      <aside className="w-60 bg-white border-r border-[#E2E8F0] flex flex-col justify-between shrink-0 select-none">
        <div>
          {/* Logo / Header */}
          <div className="p-6 pb-6">
            <h1 className="text-xl font-bold tracking-tight text-[#0F172A]">Student Records</h1>
            <p className="text-xs text-slate-400 font-normal mt-0.5">Management System</p>
          </div>

          {/* Navigation Items (Only Dashboard and Students) */}
          <nav className="px-3 space-y-1.5">
            {/* Dashboard Link */}
            <button
              onClick={() => setCurrentView('dashboard')}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium transition-colors ${
                currentView === 'dashboard'
                  ? 'bg-[#2563EB] text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <LayoutDashboard className={`w-4 h-4 ${currentView === 'dashboard' ? 'text-white' : 'text-slate-500'}`} />
              <span>Dashboard</span>
            </button>

            {/* Students Link */}
            <button
              onClick={() => setCurrentView('students')}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium transition-colors ${
                currentView === 'students' || currentView === 'create' || currentView === 'edit' || currentView === 'delete'
                  ? 'bg-[#2563EB] text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <Users className={`w-4 h-4 ${currentView !== 'dashboard' ? 'text-white' : 'text-slate-500'}`} />
              <span>Students</span>
            </button>
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-6 pb-6 text-xs text-slate-400">
          <p>&copy; 2025 School Management</p>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        
        <div className="p-8 max-w-7xl w-full mx-auto space-y-8">

          {/* VIEW 1: DASHBOARD (Exact Match to Reference Screenshot) */}
          {currentView === 'dashboard' && (
            <div className="space-y-8">
              {/* Page Title & Subtitle */}
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-[#0F172A]">Dashboard</h1>
                <p className="text-sm text-slate-500 mt-1">Overview of your school management system</p>
              </div>

              {/* 4 Summary Cards in One Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                
                {/* 1. Total Students (Live count from database) */}
                <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500">Total Students</p>
                    <p className="text-3xl font-bold text-[#0F172A] mt-2 font-sans tracking-tight">
                      {students.length}
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-[#2563EB] flex items-center justify-center text-white shadow-sm shrink-0">
                    <Users className="w-6 h-6" />
                  </div>
                </div>

                {/* 2. Total Classes */}
                <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500">Total Classes</p>
                    <p className="text-3xl font-bold text-[#0F172A] mt-2 font-sans tracking-tight">
                      0
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-[#10B981] flex items-center justify-center text-white shadow-sm shrink-0">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                </div>

                {/* 3. Total Subjects */}
                <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500">Total Subjects</p>
                    <p className="text-3xl font-bold text-[#0F172A] mt-2 font-sans tracking-tight">
                      0
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-[#9333EA] flex items-center justify-center text-white shadow-sm shrink-0">
                    <BookOpen className="w-6 h-6" />
                  </div>
                </div>

                {/* 4. Total Sessions */}
                <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500">Total Sessions</p>
                    <p className="text-3xl font-bold text-[#0F172A] mt-2 font-sans tracking-tight">
                      0
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-[#F97316] flex items-center justify-center text-white shadow-sm shrink-0">
                    <Calendar className="w-6 h-6" />
                  </div>
                </div>

              </div>

              {/* Quick Actions Section */}
              <div className="bg-white p-8 rounded-2xl border border-[#E2E8F0] shadow-sm">
                <h2 className="text-lg font-bold text-[#0F172A] mb-6">Quick Actions</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Action 1: Add New Student */}
                  <button
                    onClick={() => {
                      setFormData({ fullName: '', email: '', age: '' });
                      setFormErrors({});
                      setCurrentView('create');
                    }}
                    className="p-6 rounded-xl border border-[#E2E8F0] text-left hover:border-[#2563EB] hover:shadow-sm transition-all group bg-white cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#2563EB] flex items-center justify-center mb-4 group-hover:bg-[#2563EB] group-hover:text-white transition-colors">
                      <Users className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-base text-[#0F172A]">Add New Student</h3>
                    <p className="text-xs text-slate-500 mt-1">Register a new student</p>
                  </button>

                  {/* Action 2: View Students */}
                  <button
                    onClick={() => setCurrentView('students')}
                    className="p-6 rounded-xl border border-[#E2E8F0] text-left hover:border-[#2563EB] hover:shadow-sm transition-all group bg-white cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#2563EB] flex items-center justify-center mb-4 group-hover:bg-[#2563EB] group-hover:text-white transition-colors">
                      <ListFilter className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-base text-[#0F172A]">View Students</h3>
                    <p className="text-xs text-slate-500 mt-1">Browse and manage student records</p>
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* VIEW 2: STUDENTS LIST (Views/Students/Index.cshtml) */}
          {currentView === 'students' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold tracking-tight text-[#0F172A]">Students</h1>
                  <p className="text-sm text-slate-500 mt-1">Student Records Management</p>
                </div>

                <button
                  onClick={() => {
                    setFormData({ fullName: '', email: '', age: '' });
                    setFormErrors({});
                    setCurrentView('create');
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#2563EB] hover:bg-blue-700 text-white font-semibold text-sm rounded-xl shadow-sm transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Student</span>
                </button>
              </div>

              {/* Table Container */}
              <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden">
                {students.length === 0 ? (
                  <div className="p-12 text-center">
                    <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                    <h3 className="text-base font-bold text-slate-700">No Students Found</h3>
                    <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                      There are currently no student records in the database.
                    </p>
                    <button
                      onClick={() => setCurrentView('create')}
                      className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-[#2563EB] text-white text-xs font-semibold rounded-lg cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      Add Student Now
                    </button>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-sm">
                      <thead>
                        <tr className="bg-slate-50 border-b border-[#E2E8F0] text-xs font-semibold uppercase tracking-wider text-slate-600">
                          <th className="py-4 px-6">ID</th>
                          <th className="py-4 px-6">Full Name</th>
                          <th className="py-4 px-6">Email Address</th>
                          <th className="py-4 px-6">Age</th>
                          <th className="py-4 px-6 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E2E8F0]">
                        {students.map((st) => (
                          <tr key={st.id} className="hover:bg-slate-50/60 transition-colors">
                            <td className="py-4 px-6 font-mono text-xs font-semibold text-slate-500">
                              #{st.id}
                            </td>
                            <td className="py-4 px-6 font-semibold text-[#0F172A]">
                              {st.fullName}
                            </td>
                            <td className="py-4 px-6 text-slate-600 font-mono text-xs">
                              {st.email}
                            </td>
                            <td className="py-4 px-6 text-slate-600">
                              <span className="font-medium">{st.age}</span> yrs
                            </td>
                            <td className="py-4 px-6 text-right space-x-2">
                              <button
                                onClick={() => handleStartEdit(st)}
                                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-[#2563EB] hover:bg-blue-50 rounded-lg transition-colors border border-blue-200 cursor-pointer"
                              >
                                <Pencil className="w-3.5 h-3.5" />
                                <span>Edit</span>
                              </button>
                              <button
                                onClick={() => handleStartDelete(st.id)}
                                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-red-200 cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                <span>Delete</span>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* VIEW 3: CREATE STUDENT (Views/Students/Create.cshtml) */}
          {currentView === 'create' && (
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-[#0F172A]">Add New Student</h1>
                  <p className="text-xs text-slate-500 mt-0.5">Enter student details</p>
                </div>
                <button
                  onClick={() => setCurrentView('students')}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-[#0F172A] cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to List</span>
                </button>
              </div>

              <div className="bg-white p-8 rounded-2xl border border-[#E2E8F0] shadow-sm">
                <form onSubmit={handleCreateStudent} className="space-y-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Mahmoud Hassan"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-colors focus:outline-none ${
                        formErrors.fullName ? 'border-red-500 bg-red-50/20' : 'border-[#E2E8F0] focus:border-[#2563EB]'
                      }`}
                    />
                    {formErrors.fullName && (
                      <p className="text-xs text-red-600 mt-1.5 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {formErrors.fullName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. mahmoud@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-colors focus:outline-none ${
                        formErrors.email ? 'border-red-500 bg-red-50/20' : 'border-[#E2E8F0] focus:border-[#2563EB]'
                      }`}
                    />
                    {formErrors.email && (
                      <p className="text-xs text-red-600 mt-1.5 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {formErrors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Age <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 21"
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-colors focus:outline-none ${
                        formErrors.age ? 'border-red-500 bg-red-50/20' : 'border-[#E2E8F0] focus:border-[#2563EB]'
                      }`}
                    />
                    {formErrors.age && (
                      <p className="text-xs text-red-600 mt-1.5 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {formErrors.age}
                      </p>
                    )}
                  </div>

                  <div className="pt-4 border-t border-[#E2E8F0] flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setCurrentView('students')}
                      className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-sm transition-colors cursor-pointer"
                    >
                      Save Student Record
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* VIEW 4: EDIT STUDENT (Views/Students/Edit.cshtml) */}
          {currentView === 'edit' && (
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-[#0F172A]">Edit Student Record</h1>
                  <p className="text-xs text-slate-500 mt-0.5">Updating student #{selectedStudentId}</p>
                </div>
                <button
                  onClick={() => setCurrentView('students')}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-[#0F172A] cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to List</span>
                </button>
              </div>

              <div className="bg-white p-8 rounded-2xl border border-[#E2E8F0] shadow-sm">
                <form onSubmit={handleUpdateStudent} className="space-y-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-colors focus:outline-none ${
                        formErrors.fullName ? 'border-red-500 bg-red-50/20' : 'border-[#E2E8F0] focus:border-[#2563EB]'
                      }`}
                    />
                    {formErrors.fullName && (
                      <p className="text-xs text-red-600 mt-1.5 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {formErrors.fullName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-colors focus:outline-none ${
                        formErrors.email ? 'border-red-500 bg-red-50/20' : 'border-[#E2E8F0] focus:border-[#2563EB]'
                      }`}
                    />
                    {formErrors.email && (
                      <p className="text-xs text-red-600 mt-1.5 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {formErrors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Age <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-colors focus:outline-none ${
                        formErrors.age ? 'border-red-500 bg-red-50/20' : 'border-[#E2E8F0] focus:border-[#2563EB]'
                      }`}
                    />
                    {formErrors.age && (
                      <p className="text-xs text-red-600 mt-1.5 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {formErrors.age}
                      </p>
                    )}
                  </div>

                  <div className="pt-4 border-t border-[#E2E8F0] flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setCurrentView('students')}
                      className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-sm transition-colors cursor-pointer"
                    >
                      Update Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* VIEW 5: DELETE CONFIRMATION (Views/Students/Delete.cshtml) */}
          {currentView === 'delete' && selectedStudent && (
            <div className="max-w-xl mx-auto space-y-6">
              <div className="bg-white p-8 rounded-2xl border border-red-200 shadow-sm">
                <div className="flex items-center gap-3 text-red-600 pb-5 border-b border-red-100">
                  <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
                    <Trash2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-[#0F172A]">Delete Student Record</h2>
                    <p className="text-xs text-red-600 font-medium">Are you sure you want to delete this record?</p>
                  </div>
                </div>

                <div className="py-5 space-y-3.5 text-sm">
                  <div className="flex justify-between py-1.5 border-b border-slate-100">
                    <span className="text-xs font-bold text-slate-500">Student ID:</span>
                    <span className="font-mono font-bold text-slate-800">#{selectedStudent.id}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-100">
                    <span className="text-xs font-bold text-slate-500">Full Name:</span>
                    <span className="font-semibold text-slate-800">{selectedStudent.fullName}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-100">
                    <span className="text-xs font-bold text-slate-500">Email:</span>
                    <span className="font-mono text-xs text-slate-700">{selectedStudent.email}</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-xs font-bold text-slate-500">Age:</span>
                    <span className="font-medium text-slate-800">{selectedStudent.age} years old</span>
                  </div>
                </div>

                <div className="pt-5 border-t border-slate-100 flex items-center justify-end gap-3">
                  <button
                    onClick={() => setCurrentView('students')}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmDelete}
                    className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl shadow-sm transition-colors cursor-pointer"
                  >
                    Yes, Delete Student
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

    </div>
  );
}
