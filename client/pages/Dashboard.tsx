import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthProvider";

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  date: string;
  status: "Analyzed" | "Processing" | "Failed";
  riskLevel: "Low" | "Medium" | "High";
  keyPoints: number;
  analysisScore?: number;
}

interface RecentActivity {
  id: string;
  action: string;
  document: string;
  time: string;
  type: "upload" | "analysis" | "download";
}

type Tab = "documents" | "analytics" | "settings";

export default function Dashboard() {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>("documents");

  // Redirect if not logged in
  if (!isLoggedIn) {
    navigate("/login");
    return null;
  }

  // Real user data (starts empty)
  const documents: Document[] = [];
  const recentActivity: RecentActivity[] = [];

  const getRiskColor = (level: string) => {
    switch (level) {
      case "Low": return "text-green-600 bg-green-50 border-green-200";
      case "Medium": return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "High": return "text-red-600 bg-red-50 border-red-200";
      default: return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Analyzed": return "text-green-600 bg-green-50";
      case "Processing": return "text-yellow-600 bg-yellow-50";
      case "Failed": return "text-red-600 bg-red-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "upload":
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
          </svg>
        );
      case "analysis":
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
          </svg>
        );
      case "download":
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
        );
      default:
        return null;
    }
  };

  const EmptyDocumentsState = () => (
    <div className="text-center py-16">
      <div className="w-20 h-20 bg-[#F3F4F6] rounded-[24px] flex items-center justify-center mx-auto mb-6">
        <svg className="w-10 h-10 text-[#9CA3AF]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
        </svg>
      </div>
      <h3 className="text-xl font-semibold text-[#1F2937] mb-3">No Documents Yet</h3>
      <p className="text-[#6B7280] mb-6 max-w-md mx-auto">
        Upload your first legal document to get started with AI-powered analysis and risk assessment.
      </p>
      <button
        onClick={() => navigate('/upload')}
        className="bg-[#6366F1] text-white px-6 py-3 rounded-[18px] font-medium shadow-[0_4px_20px_rgba(99,102,241,0.3)] transition-all hover:shadow-[0_6px_25px_rgba(99,102,241,0.4)]"
      >
        Upload Your First Document
      </button>
    </div>
  );

  const EmptyActivityState = () => (
    <div className="text-center py-16">
      <div className="w-20 h-20 bg-[#F3F4F6] rounded-[24px] flex items-center justify-center mx-auto mb-6">
        <svg className="w-10 h-10 text-[#9CA3AF]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      </div>
      <h3 className="text-xl font-semibold text-[#1F2937] mb-3">No Activity Yet</h3>
      <p className="text-[#6B7280] mb-6 max-w-md mx-auto">
        Your recent document activities will appear here once you start uploading and analyzing documents.
      </p>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#1F2937] mb-2">Dashboard</h1>
          <p className="text-[#6B7280]">Manage your legal document analysis</p>
        </div>
        <button
          onClick={() => navigate('/upload')}
          className="bg-[#6366F1] text-white px-6 py-3 rounded-[18px] font-medium shadow-[0_4px_20px_rgba(99,102,241,0.3)] transition-all hover:shadow-[0_6px_25px_rgba(99,102,241,0.4)]"
        >
          Analyze New Document
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-[20px] p-6 shadow-[0_8px_32px_rgba(0,0,0,0.06)] border border-[#E5E7EB]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#6B7280] text-sm font-medium mb-1">Total Documents</p>
              <p className="text-2xl font-bold text-[#1F2937]">{documents.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-[12px] flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[20px] p-6 shadow-[0_8px_32px_rgba(0,0,0,0.06)] border border-[#E5E7EB]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#6B7280] text-sm font-medium mb-1">Analyzed</p>
              <p className="text-2xl font-bold text-[#1F2937]">{documents.filter(d => d.status === 'Analyzed').length}</p>
            </div>
            <div className="w-12 h-12 bg-green-50 rounded-[12px] flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[20px] p-6 shadow-[0_8px_32px_rgba(0,0,0,0.06)] border border-[#E5E7EB]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#6B7280] text-sm font-medium mb-1">High Risk</p>
              <p className="text-2xl font-bold text-[#1F2937]">{documents.filter(d => d.riskLevel === 'High').length}</p>
            </div>
            <div className="w-12 h-12 bg-red-50 rounded-[12px] flex items-center justify-center">
              <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[20px] p-6 shadow-[0_8px_32px_rgba(0,0,0,0.06)] border border-[#E5E7EB]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#6B7280] text-sm font-medium mb-1">Avg Score</p>
              <p className="text-2xl font-bold text-[#1F2937]">
                {documents.filter(d => d.analysisScore).length > 0
                  ? (documents
                      .filter(d => d.analysisScore)
                      .reduce((sum, d) => sum + (d.analysisScore || 0), 0) /
                    documents.filter(d => d.analysisScore).length).toFixed(1)
                  : "0.0"}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-50 rounded-[12px] flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-[24px] shadow-[0_8px_32px_rgba(0,0,0,0.06)] border border-[#E5E7EB] mb-8">
        <div className="border-b border-[#E5E7EB]">
          <nav className="flex space-x-8 px-8">
            <button
              onClick={() => setActiveTab('documents')}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'documents'
                  ? 'border-[#6366F1] text-[#6366F1]'
                  : 'border-transparent text-[#6B7280] hover:text-[#374151] hover:border-[#D1D5DB]'
              }`}
            >
              Documents
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'analytics'
                  ? 'border-[#6366F1] text-[#6366F1]'
                  : 'border-transparent text-[#6B7280] hover:text-[#374151] hover:border-[#D1D5DB]'
              }`}
            >
              Recent Activity
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'settings'
                  ? 'border-[#6366F1] text-[#6366F1]'
                  : 'border-transparent text-[#6B7280] hover:text-[#374151] hover:border-[#D1D5DB]'
              }`}
            >
              Settings
            </button>
          </nav>
        </div>

        <div className="p-8">
          {/* Documents Tab */}
          {activeTab === 'documents' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-[#1F2937]">Your Documents</h3>
                {documents.length > 0 && (
                  <div className="flex items-center gap-4">
                    <select className="px-3 py-2 rounded-[12px] border border-[#D1D5DB] text-sm focus:border-[#6366F1] focus:outline-none">
                      <option>All Types</option>
                      <option>Rental Agreement</option>
                      <option>Loan Contract</option>
                      <option>Terms of Service</option>
                    </select>
                    <select className="px-3 py-2 rounded-[12px] border border-[#D1D5DB] text-sm focus:border-[#6366F1] focus:outline-none">
                      <option>All Status</option>
                      <option>Analyzed</option>
                      <option>Processing</option>
                    </select>
                  </div>
                )}
              </div>

              {documents.length === 0 ? <EmptyDocumentsState /> : (
                <div className="space-y-4">
                  {documents.map((doc) => (
                    <div key={doc.id} className="bg-[#F8FAFC] rounded-[16px] p-6 border border-[#E2E8F0]">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-white rounded-[12px] flex items-center justify-center border border-[#E5E7EB]">
                            <svg className="w-6 h-6 text-[#6B7280]" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-semibold text-[#1F2937] mb-1">{doc.name}</h4>
                            <div className="flex items-center gap-4 text-sm text-[#6B7280]">
                              <span>{doc.type}</span>
                              <span>•</span>
                              <span>{doc.size}</span>
                              <span>•</span>
                              <span>{doc.date}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-6">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(doc.status)}`}>
                            {doc.status}
                          </span>

                          {doc.status === "Analyzed" && (
                            <>
                              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getRiskColor(doc.riskLevel)}`}>
                                {doc.riskLevel} Risk
                              </span>
                              <div className="text-center">
                                <p className="text-sm text-[#6B7280]">Score</p>
                                <p className="font-semibold text-[#1F2937]">{doc.analysisScore}/10</p>
                              </div>
                              <button className="text-[#6366F1] px-4 py-2 rounded-[12px] font-medium border border-[#6366F1] hover:bg-[#6366F1] hover:text-white transition-colors">
                                View Analysis
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Recent Activity Tab */}
          {activeTab === 'analytics' && (
            <div>
              <h3 className="text-lg font-semibold text-[#1F2937] mb-6">Recent Activity</h3>
              {recentActivity.length === 0 ? <EmptyActivityState /> : (
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center gap-4 p-4 bg-[#F8FAFC] rounded-[12px]">
                      <div className={`w-8 h-8 rounded-[8px] flex items-center justify-center ${
                        activity.type === 'upload' ? 'bg-blue-50 text-blue-600' :
                        activity.type === 'analysis' ? 'bg-green-50 text-green-600' :
                        'bg-purple-50 text-purple-600'
                      }`}>
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1">
                        <p className="text-[#1F2937] font-medium">{activity.action}</p>
                        <p className="text-[#6B7280] text-sm">{activity.document}</p>
                      </div>
                      <span className="text-[#6B7280] text-sm">{activity.time}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div>
              <h3 className="text-lg font-semibold text-[#1F2937] mb-6">Account Settings</h3>
              <div className="space-y-6">
                <div className="bg-[#F8FAFC] rounded-[16px] p-6">
                  <h4 className="font-semibold text-[#1F2937] mb-4">Profile Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#374151] mb-2">Full Name</label>
                      <input
                        type="text"
                        defaultValue="Deepanshi Goyal"
                        className="w-full px-3 py-2 rounded-[12px] border border-[#D1D5DB] focus:border-[#6366F1] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#374151] mb-2">Email</label>
                      <input
                        type="email"
                        defaultValue="deepanshi@example.com"
                        className="w-full px-3 py-2 rounded-[12px] border border-[#D1D5DB] focus:border-[#6366F1] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-[#F8FAFC] rounded-[16px] p-6">
                  <h4 className="font-semibold text-[#1F2937] mb-4">Notifications</h4>
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input type="checkbox" defaultChecked className="rounded text-[#6366F1] focus:ring-[#6366F1]" />
                      <span className="ml-3 text-[#374151]">Email notifications for analysis completion</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" defaultChecked className="rounded text-[#6366F1] focus:ring-[#6366F1]" />
                      <span className="ml-3 text-[#374151]">Weekly analysis summaries</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded text-[#6366F1] focus:ring-[#6366F1]" />
                      <span className="ml-3 text-[#374151]">Product updates and tips</span>
                    </label>
                  </div>
                </div>

                <div className="bg-red-50 rounded-[16px] p-6 border border-red-200">
                  <h4 className="font-semibold text-red-800 mb-4">Account Actions</h4>
                  <p className="text-red-700 text-sm mb-4">
                    Manage your account settings and data.
                  </p>
                  <div className="flex gap-4">
                    <button
                      onClick={logout}
                      className="text-[#6B7280] px-4 py-2 rounded-[12px] border border-[#D1D5DB] hover:bg-[#F3F4F6] transition-colors"
                    >
                      Sign Out
                    </button>
                    <button className="text-red-600 px-4 py-2 rounded-[12px] border border-red-300 hover:bg-red-50 transition-colors">
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
