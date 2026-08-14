"use client";

import { useEffect, useState, useTransition } from "react";
import { Plus, Trash2, Edit3, Lock, LogOut, Check, Globe, FileText, Sparkles, AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { getProjects, createProject, updateProject, deleteProject, Project } from "../actions/projectActions";
import { getCaseStudies, createCaseStudy, updateCaseStudy, deleteCaseStudy, CaseStudy } from "../actions/caseStudyActions";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState("");
  const [activeTab, setActiveTab] = useState<"projects" | "caseStudies">("projects");

  const [projects, setProjects] = useState<Project[]>([]);
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

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
      const projs = await getProjects();
      const cases = await getCaseStudies();
      setProjects(projs);
      setCaseStudies(cases);
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
    // Set authenticated and test with a fetch next
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
        // Reset form
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
    // Scroll to form
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeleteProject = async (id: number) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    startTransition(async () => {
      try {
        await deleteProject(id, password);
        showMsg("success", "Project deleted successfully");
        await fetchData();
      } catch (err: any) {
        console.error(err);
        showMsg("error", err.message || "Failed to delete project");
      }
    });
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
        // Reset form
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
    startTransition(async () => {
      try {
        await deleteCaseStudy(id, password);
        showMsg("success", "Case study deleted successfully");
        await fetchData();
      } catch (err: any) {
        console.error(err);
        showMsg("error", err.message || "Failed to delete case study");
      }
    });
  };

  const addService = () => {
    if (!newService.trim()) return;
    const currentServices = caseStudyForm.services || [];
    if (!currentServices.includes(newService.trim())) {
      setCaseStudyForm({
        ...caseStudyForm,
        services: [...currentServices, newService.trim()],
      });
    }
    setNewService("");
  };

  const removeService = (srv: string) => {
    const currentServices = caseStudyForm.services || [];
    setCaseStudyForm({
      ...caseStudyForm,
      services: currentServices.filter((s) => s !== srv),
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4 py-12 relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-md space-y-8 bg-slate-900/50 border border-slate-800/80 p-8 rounded-3xl backdrop-blur-xl shadow-2xl relative z-10">
          <div className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/10 text-blue-500 border border-blue-500/20">
              <Lock className="h-6 w-6" />
            </div>
            <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-white">Admin Dashboard</h2>
            <p className="mt-2 text-sm text-slate-400">Enter your admin password to manage website data</p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label className="sr-only">Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none rounded-2xl relative block w-full px-4 py-3 border border-slate-800 bg-slate-950 placeholder-slate-500 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
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
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-2xl text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-750 hover:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-lg shadow-blue-500/20 transition-all duration-200"
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

          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">
              View Website
            </Link>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-xl text-sm font-bold transition-all"
            >
              <LogOut size={16} /> Logout
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

        {/* Form and Tabs Grid */}
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

                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Category</label>
                    <input
                      type="text"
                      required
                      value={projectForm.category || ""}
                      onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 text-sm"
                      placeholder="e.g. Landscaping Services"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
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
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 text-sm"
                        placeholder="e.g. US"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Status</label>
                      <select
                        value={projectForm.status || "Live"}
                        onChange={(e) => setProjectForm({ ...projectForm, status: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 text-sm"
                      >
                        <option value="Live">Live</option>
                        <option value="In Development">In Development</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Website URL</label>
                      <input
                        type="text"
                        required
                        value={projectForm.website || ""}
                        onChange={(e) => setProjectForm({ ...projectForm, website: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 text-sm"
                        placeholder="e.g. https://domain.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Description</label>
                    <textarea
                      required
                      rows={3}
                      value={projectForm.description || ""}
                      onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 text-sm resize-none"
                      placeholder="Enter description..."
                    />
                  </div>

                  <div className="flex gap-3 pt-2">
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
                        className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 rounded-2xl text-xs font-bold transition-all"
                      >
                        Cancel
                      </button>
                    )}
                    <button
                      type="submit"
                      disabled={isPending}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-750 hover:to-cyan-605 text-white py-3 rounded-2xl text-xs font-bold shadow-lg shadow-blue-500/10 transition-all disabled:opacity-50"
                    >
                      {isPending ? "Saving..." : editingId ? "Update Project" : "Add Project"}
                    </button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleCaseStudySubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
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

                  <div className="grid grid-cols-2 gap-4">
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
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Image Path</label>
                    <input
                      type="text"
                      required
                      value={caseStudyForm.image || ""}
                      onChange={(e) => setCaseStudyForm({ ...caseStudyForm, image: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 text-sm"
                      placeholder="e.g. /images/case-studies/david-taxi.jpg"
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
                        placeholder="Add service..."
                      />
                      <button
                        type="button"
                        onClick={addService}
                        className="bg-slate-100 hover:bg-slate-200 px-4 rounded-xl text-xs font-bold"
                      >
                        Add
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {(caseStudyForm.services || []).map((srv, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 border border-blue-100 px-2 py-1 rounded-lg text-xs font-semibold"
                        >
                          {srv}
                          <button
                            type="button"
                            onClick={() => removeService(srv)}
                            className="text-blue-500 hover:text-blue-800"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Description</label>
                    <textarea
                      required
                      rows={3}
                      value={caseStudyForm.description || ""}
                      onChange={(e) => setCaseStudyForm({ ...caseStudyForm, description: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 text-sm resize-none"
                      placeholder="Enter description..."
                    />
                  </div>

                  <div className="flex gap-3 pt-2">
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
                        className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 rounded-2xl text-xs font-bold transition-all"
                      >
                        Cancel
                      </button>
                    )}
                    <button
                      type="submit"
                      disabled={isPending}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-750 hover:to-cyan-605 text-white py-3 rounded-2xl text-xs font-bold shadow-lg shadow-blue-500/10 transition-all disabled:opacity-50"
                    >
                      {isPending ? "Saving..." : editingId ? "Update Case Study" : "Add Case Study"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Right Data Table/List Column */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm min-h-[500px]">
              {/* Tab Header */}
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
                    <Globe className="mx-auto h-12 w-12 text-slate-350 mb-3" />
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
                  <FileText className="mx-auto h-12 w-12 text-slate-350 mb-3" />
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
      </div>
    </div>
  );
}
