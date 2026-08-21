"use client";

import { useEffect, useState, useTransition } from "react";
import {
  Plus,
  Trash2,
  Edit3,
  Lock,
  LogOut,
  Check,
  Globe,
  FileText,
  Sparkles,
  AlertCircle,
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  Video,
  CheckCircle,
  XCircle,
  Search,
  Building,
} from "lucide-react";
import Link from "next/link";
import { getProjects, createProject, updateProject, deleteProject, Project } from "../actions/projectActions";
import { getCaseStudies, createCaseStudy, updateCaseStudy, deleteCaseStudy, CaseStudy } from "../actions/caseStudyActions";
import { getBookings, updateBookingStatus, deleteBooking, Booking } from "../actions/bookingActions";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState("");
  const [activeTab, setActiveTab] = useState<"bookings" | "projects" | "caseStudies">("bookings");

  const [projects, setProjects] = useState<Project[]>([]);
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  // Booking search & filter
  const [bookingFilter, setBookingFilter] = useState<"all" | "confirmed" | "completed" | "cancelled">("all");
  const [bookingSearch, setBookingSearch] = useState("");

  // Forms states
  const [projectForm, setProjectForm] = useState<Partial<Project>>({
    title: "",
    category: "",
    country: "",
    countryCode: "",
    status: "Live",
    website: "",
    description: "",
  });

  const [caseStudyForm, setCaseStudyForm] = useState<Partial<CaseStudy>>({
    number: "",
    category: "",
    type: "",
    title: "",
    subtitle: "",
    description: "",
    image: "",
    year: "",
    services: [],
  });

  const [editingId, setEditingId] = useState<number | null>(null);
  const [newService, setNewService] = useState("");
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    const savedPassword = localStorage.getItem("neirah_admin_password");
    if (savedPassword) {
      setPassword(savedPassword);
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [projs, cases, bks] = await Promise.all([
        getProjects(),
        getCaseStudies(),
        getBookings(password).catch(() => []),
      ]);
      setProjects(projs);
      setCaseStudies(cases);
      setBookings(bks);
    } catch (err) {
      console.error(err);
      showMsg("error", "Failed to fetch data from backend");
    } finally {
      setLoading(false);
    }
  };

  const showMsg = (type: "success" | "error", text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 5000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
      setAuthError("Password is required");
      return;
    }
    localStorage.setItem("neirah_admin_password", password);
    setIsAuthenticated(true);
    setAuthError("");
  };

  const handleLogout = () => {
    localStorage.removeItem("neirah_admin_password");
    setIsAuthenticated(false);
    setPassword("");
    setProjects([]);
    setCaseStudies([]);
    setBookings([]);
  };

  // Booking handlers
  const handleStatusChange = async (id: number, newStatus: "confirmed" | "completed" | "cancelled") => {
    try {
      await updateBookingStatus(id, newStatus, password);
      showMsg("success", `Booking marked as ${newStatus}`);
      await fetchData();
    } catch (err: any) {
      showMsg("error", err.message || "Failed to update booking status");
    }
  };

  const handleDeleteBooking = async (id: number) => {
    if (!confirm("Are you sure you want to delete this booking record?")) return;
    try {
      await deleteBooking(id, password);
      showMsg("success", "Booking deleted successfully");
      await fetchData();
    } catch (err: any) {
      showMsg("error", err.message || "Failed to delete booking");
    }
  };

  // Projects CRUD handlers
  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        if (editingId) {
          await updateProject(editingId, projectForm, password);
          showMsg("success", "Project updated successfully");
        } else {
          await createProject(projectForm as Omit<Project, "id">, password);
          showMsg("success", "Project created successfully");
        }
        setProjectForm({
          title: "",
          category: "",
          country: "",
          countryCode: "",
          status: "Live",
          website: "",
          description: "",
        });
        setEditingId(null);
        await fetchData();
      } catch (err: any) {
        console.error(err);
        showMsg("error", err.message || "Failed to save project");
      }
    });
  };

  const handleEditProject = (proj: Project) => {
    setEditingId(proj.id);
    setProjectForm(proj);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeleteProject = async (id: number) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      await deleteProject(id, password);
      showMsg("success", "Project deleted successfully");
      await fetchData();
    } catch (err: any) {
      showMsg("error", err.message || "Failed to delete project");
    }
  };

  // Case Studies CRUD handlers
  const handleCaseStudySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        if (editingId) {
          await updateCaseStudy(editingId, caseStudyForm, password);
          showMsg("success", "Case study updated successfully");
        } else {
          await createCaseStudy(caseStudyForm as Omit<CaseStudy, "id">, password);
          showMsg("success", "Case study created successfully");
        }
        setCaseStudyForm({
          number: "",
          category: "",
          type: "",
          title: "",
          subtitle: "",
          description: "",
          image: "",
          year: "",
          services: [],
        });
        setEditingId(null);
        await fetchData();
      } catch (err: any) {
        console.error(err);
        showMsg("error", err.message || "Failed to save case study");
      }
    });
  };

  const handleEditCaseStudy = (cs: CaseStudy) => {
    setEditingId(cs.id);
    setCaseStudyForm(cs);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeleteCaseStudy = async (id: number) => {
    if (!confirm("Are you sure you want to delete this case study?")) return;
    try {
      await deleteCaseStudy(id, password);
      showMsg("success", "Case study deleted successfully");
      await fetchData();
    } catch (err: any) {
      showMsg("error", err.message || "Failed to delete case study");
    }
  };

  const handleAddService = () => {
    if (newService.trim()) {
      setCaseStudyForm({
        ...caseStudyForm,
        services: [...(caseStudyForm.services || []), newService.trim()],
      });
      setNewService("");
    }
  };

  const handleRemoveService = (index: number) => {
    const updated = [...(caseStudyForm.services || [])];
    updated.splice(index, 1);
    setCaseStudyForm({ ...caseStudyForm, services: updated });
  };

  // Filtered bookings
  const filteredBookings = bookings.filter((b) => {
    const matchesStatus = bookingFilter === "all" || b.status === bookingFilter;
    const matchesQuery =
      bookingSearch === "" ||
      b.name.toLowerCase().includes(bookingSearch.toLowerCase()) ||
      b.email.toLowerCase().includes(bookingSearch.toLowerCase()) ||
      b.referenceCode.toLowerCase().includes(bookingSearch.toLowerCase()) ||
      b.service.toLowerCase().includes(bookingSearch.toLowerCase());
    return matchesStatus && matchesQuery;
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-2xl">
          <div>
            <div className="mx-auto h-12 w-12 rounded-2xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-500 mb-4">
              <Lock size={24} />
            </div>
            <h2 className="text-center text-3xl font-extrabold text-white">Neirah Admin</h2>
            <p className="mt-2 text-center text-sm text-slate-400">
              Enter administrative password to manage projects, case studies, and client bookings.
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none rounded-2xl relative block w-full px-4 py-3 border border-slate-800 bg-slate-950 placeholder-slate-500 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter admin password"
                />
              </div>
            </div>

            {authError && (
              <div className="flex items-center gap-2 text-red-500 text-sm bg-red-500/10 p-3 rounded-xl border border-red-500/20">
                <AlertCircle size={16} />
                <span>{authError}</span>
              </div>
            )}

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-2xl text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-lg shadow-blue-500/20 transition-all duration-200"
              >
                Login to Dashboard
              </button>
            </div>
          </form>

          <div className="text-center pt-2">
            <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 transition-colors">
              <ArrowLeft size={12} /> Back to Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 pb-20">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-white/80 border-b border-slate-200/80 backdrop-blur-xl shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-tr from-blue-600 to-cyan-500 p-2 rounded-xl text-white shadow-md shadow-blue-500/10">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h1 className="font-extrabold text-lg tracking-tight">Neirah Tech</h1>
              <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Management Console</p>
            </div>
          </div>

          {/* Top Tabs Switcher */}
          <div className="hidden sm:flex items-center bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => {
                setActiveTab("bookings");
                setEditingId(null);
              }}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === "bookings"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Calendar size={14} />
              <span>Bookings</span>
              {bookings.length > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-blue-100 text-blue-700 text-[10px]">
                  {bookings.length}
                </span>
              )}
            </button>

            <button
              onClick={() => {
                setActiveTab("projects");
                setEditingId(null);
              }}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === "projects"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Projects ({projects.length})
            </button>

            <button
              onClick={() => {
                setActiveTab("caseStudies");
                setEditingId(null);
              }}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === "caseStudies"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Case Studies ({caseStudies.length})
            </button>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/scheduler" target="_blank" className="text-xs font-semibold text-blue-600 hover:underline">
              Open Scheduler
            </Link>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all"
            >
              <LogOut size={14} /> Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {message && (
          <div
            className={`mb-6 p-4 rounded-2xl flex items-center gap-3 border ${
              message.type === "success"
                ? "bg-green-50 text-green-800 border-green-200"
                : "bg-red-50 text-red-800 border-red-200"
            }`}
          >
            <Check size={18} />
            <span className="text-sm font-semibold">{message.text}</span>
          </div>
        )}

        {/* ========================================================
            TAB 1: BOOKINGS & SCHEDULER VIEW
        ======================================================== */}
        {activeTab === "bookings" && (
          <div className="space-y-6">
            {/* Header & Controls */}
            <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900">Scheduled Consultations & Demos</h2>
                <p className="text-xs text-slate-500 font-semibold mt-0.5">
                  Manage incoming client discovery calls, tech strategy sessions, and meetings.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {/* Search */}
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={bookingSearch}
                    onChange={(e) => setBookingSearch(e.target.value)}
                    placeholder="Search name, email, ID..."
                    className="pl-8 pr-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 outline-none focus:ring-2 focus:ring-blue-500 w-48 sm:w-60"
                  />
                </div>

                {/* Filter */}
                <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-bold">
                  {(["all", "confirmed", "completed", "cancelled"] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => setBookingFilter(st)}
                      className={`px-3 py-1.5 rounded-lg capitalize transition-all ${
                        bookingFilter === st ? "bg-white text-blue-600 shadow-sm" : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Bookings List */}
            {loading ? (
              <div className="bg-white border border-slate-200 rounded-3xl p-16 flex flex-col items-center justify-center gap-3 text-slate-400">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent" />
                <span className="text-xs font-bold uppercase tracking-wider">Loading Scheduled Sessions...</span>
              </div>
            ) : filteredBookings.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-3xl p-16 text-center text-slate-400 space-y-2">
                <Calendar className="mx-auto h-12 w-12 text-slate-300" />
                <p className="font-bold text-sm text-slate-700">No scheduled sessions found</p>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  When clients book demos through the scheduler modal or landing page, they will appear here in real time.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredBookings.map((b) => (
                  <div
                    key={b.id}
                    className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm hover:border-blue-300 transition-all space-y-4"
                  >
                    {/* Top Row: Ref & Status */}
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
                          {b.referenceCode}
                        </span>
                        <span className="text-xs font-bold text-slate-800">{b.service}</span>
                      </div>

                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${
                          b.status === "confirmed"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : b.status === "completed"
                            ? "bg-blue-50 text-blue-700 border-blue-200"
                            : "bg-red-50 text-red-700 border-red-200"
                        }`}
                      >
                        {b.status}
                      </span>
                    </div>

                    {/* Date & Platform Matrix */}
                    <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded-xl">
                      <div className="flex items-center gap-2 text-slate-700">
                        <Calendar size={14} className="text-blue-500 shrink-0" />
                        <span className="font-semibold">{b.bookingDate}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-700">
                        <Clock size={14} className="text-amber-500 shrink-0" />
                        <span>{b.bookingTime} ({b.duration}m)</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-700">
                        <Video size={14} className="text-indigo-500 shrink-0" />
                        <span>{b.meetingPlatform}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-700 truncate" title={b.timezone}>
                        <Globe size={14} className="text-cyan-500 shrink-0" />
                        <span className="truncate">{b.timezone.split("/")[1] || b.timezone}</span>
                      </div>
                    </div>

                    {/* Attendee Details */}
                    <div className="space-y-1.5 text-xs">
                      <div className="flex items-center gap-2 text-slate-900 font-bold">
                        <User size={13} className="text-slate-400" />
                        <span>{b.name}</span>
                        {b.company && (
                          <span className="text-slate-500 font-normal">({b.company})</span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-slate-600">
                        <Mail size={13} className="text-slate-400" />
                        <a href={`mailto:${b.email}`} className="text-blue-600 hover:underline">
                          {b.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600">
                        <Phone size={13} className="text-slate-400" />
                        <a href={`tel:${b.phone}`} className="hover:text-slate-900">
                          {b.phone}
                        </a>
                      </div>

                      {b.notes && (
                        <div className="mt-2 p-2.5 bg-slate-50 rounded-xl text-slate-600 text-[11px] leading-relaxed border border-slate-100">
                          <span className="font-bold text-slate-700">Client Note: </span>
                          {b.notes}
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                      <div className="flex items-center gap-1.5">
                        {b.status !== "completed" && (
                          <button
                            onClick={() => handleStatusChange(b.id, "completed")}
                            className="px-2.5 py-1 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg text-xs font-semibold transition"
                          >
                            Mark Completed
                          </button>
                        )}
                        {b.status !== "cancelled" && (
                          <button
                            onClick={() => handleStatusChange(b.id, "cancelled")}
                            className="px-2.5 py-1 bg-slate-100 text-slate-700 hover:bg-red-50 hover:text-red-600 rounded-lg text-xs font-semibold transition"
                          >
                            Cancel
                          </button>
                        )}
                        {b.status !== "confirmed" && (
                          <button
                            onClick={() => handleStatusChange(b.id, "confirmed")}
                            className="px-2.5 py-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-lg text-xs font-semibold transition"
                          >
                            Confirm
                          </button>
                        )}
                      </div>

                      <button
                        onClick={() => handleDeleteBooking(b.id)}
                        className="text-red-500 hover:bg-red-50 p-1.5 rounded-lg transition"
                        title="Delete record"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ========================================================
            TAB 2 & 3: PROJECTS & CASE STUDIES VIEW
        ======================================================== */}
        {(activeTab === "projects" || activeTab === "caseStudies") && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Form Column */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm sticky top-24">
                <h2 className="text-xl font-extrabold mb-5 flex items-center gap-2">
                  {editingId ? <Edit3 size={18} className="text-blue-600" /> : <Plus size={18} className="text-blue-600" />}
                  {editingId ? "Edit Item" : "Add New Item"}
                </h2>

                <div className="flex bg-slate-100 p-1 rounded-xl mb-6">
                  <button
                    onClick={() => {
                      setActiveTab("projects");
                      setEditingId(null);
                    }}
                    className={`flex-1 text-center py-2 text-xs font-bold rounded-lg transition-all ${
                      activeTab === "projects" ? "bg-white text-blue-600 shadow-sm" : "text-slate-600 hover:text-slate-900"
                    }`}
                    disabled={editingId !== null}
                  >
                    Project
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab("caseStudies");
                      setEditingId(null);
                    }}
                    className={`flex-1 text-center py-2 text-xs font-bold rounded-lg transition-all ${
                      activeTab === "caseStudies" ? "bg-white text-blue-600 shadow-sm" : "text-slate-600 hover:text-slate-900"
                    }`}
                    disabled={editingId !== null}
                  >
                    Case Study
                  </button>
                </div>

                {activeTab === "projects" ? (
                  <form onSubmit={handleProjectSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Title</label>
                      <input
                        type="text"
                        required
                        value={projectForm.title || ""}
                        onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 text-sm"
                        placeholder="e.g. D Plus Landscaping"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Category</label>
                        <input
                          type="text"
                          required
                          value={projectForm.category || ""}
                          onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 text-sm"
                          placeholder="e.g. Services"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Status</label>
                        <select
                          value={projectForm.status || "Live"}
                          onChange={(e) => setProjectForm({ ...projectForm, status: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 text-sm"
                        >
                          <option value="Live">Live</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Country</label>
                        <input
                          type="text"
                          required
                          value={projectForm.country || ""}
                          onChange={(e) => setProjectForm({ ...projectForm, country: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 text-sm"
                          placeholder="e.g. USA"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Country Code</label>
                        <input
                          type="text"
                          required
                          value={projectForm.countryCode || ""}
                          onChange={(e) => setProjectForm({ ...projectForm, countryCode: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 text-sm uppercase"
                          placeholder="e.g. US"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Website URL</label>
                      <input
                        type="url"
                        value={projectForm.website || ""}
                        onChange={(e) => setProjectForm({ ...projectForm, website: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 text-sm"
                        placeholder="https://example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Description</label>
                      <textarea
                        rows={3}
                        value={projectForm.description || ""}
                        onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 text-sm"
                        placeholder="Brief project details..."
                      />
                    </div>

                    <div className="flex gap-2 pt-2">
                      <button
                        type="submit"
                        disabled={isPending}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all shadow-md shadow-blue-500/10 disabled:opacity-50"
                      >
                        {editingId ? "Update Project" : "Create Project"}
                      </button>
                      {editingId && (
                        <button
                          type="button"
                          onClick={() => {
                            setEditingId(null);
                            setProjectForm({
                              title: "",
                              category: "",
                              country: "",
                              countryCode: "",
                              status: "Live",
                              website: "",
                              description: "",
                            });
                          }}
                          className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-4 rounded-xl transition-all"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </form>
                ) : (
                  <form onSubmit={handleCaseStudySubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Number</label>
                        <input
                          type="text"
                          required
                          value={caseStudyForm.number || ""}
                          onChange={(e) => setCaseStudyForm({ ...caseStudyForm, number: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 text-sm"
                          placeholder="e.g. 01"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Year</label>
                        <input
                          type="text"
                          required
                          value={caseStudyForm.year || ""}
                          onChange={(e) => setCaseStudyForm({ ...caseStudyForm, year: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 text-sm"
                          placeholder="e.g. 2026"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Title</label>
                      <input
                        type="text"
                        required
                        value={caseStudyForm.title || ""}
                        onChange={(e) => setCaseStudyForm({ ...caseStudyForm, title: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 text-sm"
                        placeholder="e.g. David Taxi"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Category</label>
                        <input
                          type="text"
                          required
                          value={caseStudyForm.category || ""}
                          onChange={(e) => setCaseStudyForm({ ...caseStudyForm, category: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 text-sm"
                          placeholder="e.g. Transportation"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Type</label>
                        <input
                          type="text"
                          required
                          value={caseStudyForm.type || ""}
                          onChange={(e) => setCaseStudyForm({ ...caseStudyForm, type: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 text-sm"
                          placeholder="e.g. Web Platform"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Subtitle</label>
                      <input
                        type="text"
                        required
                        value={caseStudyForm.subtitle || ""}
                        onChange={(e) => setCaseStudyForm({ ...caseStudyForm, subtitle: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 text-sm"
                        placeholder="e.g. Smart Booking Platform"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Image Path</label>
                      <input
                        type="text"
                        required
                        value={caseStudyForm.image || ""}
                        onChange={(e) => setCaseStudyForm({ ...caseStudyForm, image: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 text-sm"
                        placeholder="/images/case-studies/name.jpg"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Description</label>
                      <textarea
                        rows={3}
                        required
                        value={caseStudyForm.description || ""}
                        onChange={(e) => setCaseStudyForm({ ...caseStudyForm, description: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 text-sm"
                        placeholder="Detailed case study summary..."
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Services</label>
                      <div className="flex gap-2 mb-2">
                        <input
                          type="text"
                          value={newService}
                          onChange={(e) => setNewService(e.target.value)}
                          className="flex-1 px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 text-sm"
                          placeholder="Add a service tag..."
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              handleAddService();
                            }
                          }}
                        />
                        <button
                          type="button"
                          onClick={handleAddService}
                          className="bg-slate-100 hover:bg-slate-200 px-3 rounded-xl font-bold text-xs"
                        >
                          Add
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {caseStudyForm.services?.map((srv, idx) => (
                          <span
                            key={idx}
                            className="bg-blue-50 text-blue-700 px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1 border border-blue-100"
                          >
                            {srv}
                            <button
                              type="button"
                              onClick={() => handleRemoveService(idx)}
                              className="text-blue-400 hover:text-blue-600 font-extrabold ml-0.5"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <button
                        type="submit"
                        disabled={isPending}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all shadow-md shadow-blue-500/10 disabled:opacity-50"
                      >
                        {editingId ? "Update Case Study" : "Create Case Study"}
                      </button>
                      {editingId && (
                        <button
                          type="button"
                          onClick={() => {
                            setEditingId(null);
                            setCaseStudyForm({
                              number: "",
                              category: "",
                              type: "",
                              title: "",
                              subtitle: "",
                              description: "",
                              image: "",
                              year: "",
                              services: [],
                            });
                          }}
                          className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-4 rounded-xl transition-all"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </form>
                )}
              </div>
            </div>

            {/* Right Data Table Column */}
            <div className="lg:col-span-2">
              <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm min-h-[500px]">
                <div className="flex items-center justify-between border-b border-slate-100 pb-5 mb-6">
                  <div>
                    <h2 className="text-xl font-extrabold">
                      {activeTab === "projects" ? "Projects Library" : "Case Studies Library"}
                    </h2>
                    <p className="text-xs text-slate-500 font-semibold mt-0.5">
                      {activeTab === "projects" ? `${projects.length} Total Projects` : `${caseStudies.length} Total Case Studies`}
                    </p>
                  </div>
                </div>

                {loading ? (
                  <div className="flex flex-col items-center justify-center py-20 text-slate-400 gap-3">
                    <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent" />
                    <span className="text-xs font-bold uppercase tracking-wider">Loading Library...</span>
                  </div>
                ) : activeTab === "projects" ? (
                  projects.length === 0 ? (
                    <div className="text-center py-20 text-slate-400">
                      <Globe className="mx-auto h-12 w-12 text-slate-300 mb-3" />
                      <p className="font-bold text-sm">No projects found</p>
                      <p className="text-xs mt-1">Get started by creating a new project in the form.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {projects.map((proj) => (
                        <div
                          key={proj.id}
                          className="flex flex-col md:flex-row md:items-center justify-between border border-slate-150 p-5 rounded-2xl hover:border-blue-200 hover:bg-slate-50/50 transition-all"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-extrabold text-base text-slate-900">{proj.title}</h3>
                              <span className="bg-slate-100 border border-slate-200 text-slate-700 px-2 py-0.5 rounded-md text-[10px] font-bold">
                                {proj.countryCode}
                              </span>
                              <span
                                className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${
                                  proj.status === "Live"
                                    ? "bg-green-50 text-green-700 border-green-100"
                                    : "bg-amber-50 text-amber-700 border-amber-100"
                                }`}
                              >
                                {proj.status}
                              </span>
                            </div>
                            <p className="text-xs font-bold text-blue-600">{proj.category}</p>
                            <p className="text-xs text-slate-500 max-w-xl">{proj.description}</p>
                            {proj.website && (
                              <a
                                href={proj.website}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-400 hover:text-blue-600 transition-colors pt-1"
                              >
                                {proj.website}
                              </a>
                            )}
                          </div>

                          <div className="flex items-center gap-2 mt-4 md:mt-0">
                            <button
                              onClick={() => handleEditProject(proj)}
                              className="bg-slate-50 border border-slate-200 hover:bg-slate-100 hover:border-slate-300 text-slate-700 p-2.5 rounded-xl transition-all"
                            >
                              <Edit3 size={15} />
                            </button>
                            <button
                              onClick={() => handleDeleteProject(proj.id)}
                              className="bg-red-50 border border-red-100 hover:bg-red-100 hover:border-red-200 text-red-600 p-2.5 rounded-xl transition-all"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )
                ) : caseStudies.length === 0 ? (
                  <div className="text-center py-20 text-slate-400">
                    <FileText className="mx-auto h-12 w-12 text-slate-300 mb-3" />
                    <p className="font-bold text-sm">No case studies found</p>
                    <p className="text-xs mt-1">Get started by creating a new case study in the form.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {caseStudies.map((cs) => (
                      <div
                        key={cs.id}
                        className="flex flex-col md:flex-row md:items-center justify-between border border-slate-150 p-5 rounded-2xl hover:border-blue-200 hover:bg-slate-50/50 transition-all"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-400 text-sm">#{cs.number}</span>
                            <h3 className="font-extrabold text-base text-slate-900">{cs.title}</h3>
                            <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md text-[10px] font-bold">
                              {cs.year}
                            </span>
                          </div>
                          <p className="text-xs font-bold text-blue-600">{cs.category} — {cs.type}</p>
                          <p className="text-xs text-slate-500 max-w-xl">{cs.description}</p>
                          <div className="flex flex-wrap gap-1 pt-1">
                            {cs.services.map((srv, idx) => (
                              <span
                                key={idx}
                                className="bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded-md text-[9px] font-semibold"
                              >
                                {srv}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 mt-4 md:mt-0">
                          <button
                            onClick={() => handleEditCaseStudy(cs)}
                            className="bg-slate-50 border border-slate-200 hover:bg-slate-100 hover:border-slate-300 text-slate-700 p-2.5 rounded-xl transition-all"
                          >
                            <Edit3 size={15} />
                          </button>
                          <button
                            onClick={() => handleDeleteCaseStudy(cs.id)}
                            className="bg-red-50 border border-red-100 hover:bg-red-100 hover:border-red-200 text-red-600 p-2.5 rounded-xl transition-all"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
