import { useState, useRef, useCallback } from "react";
import { useAuth } from "../components/AuthProvider";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface UploadedFile {
  file: File;
  id: string;
  progress: number;
  status: "uploading" | "analyzing" | "completed" | "error";
}

interface AnalysisResult {
  documentType: string;
  riskLevel: "Low" | "Medium" | "High";
  overallScore: number;
  keyRisks: string[];
  protections: string[];
  simplifiedSummary: string;
  recommendations: string[];
}

const ACCEPTED_FILE_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/msword",
  "text/plain",
  "text/rtf",
];

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export default function Upload() {
  const { isLoggedIn } = useAuth();
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(
    null,
  );
  const [showAnalysis, setShowAnalysis] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Redirect if not logged in
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="max-w-md mx-auto text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-[#6366F1] to-[#4ADE80] rounded-[20px] flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-8 h-8 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-[#1F2937] mb-4">
            Sign In Required
          </h1>
          <p className="text-[#6B7280] mb-6">
            Please sign in to access document analysis features.
          </p>
          <button
            onClick={() => (window.location.href = "/login")}
            className="bg-[#6366F1] text-white px-6 py-3 rounded-[18px] font-medium shadow-[0_4px_20px_rgba(99,102,241,0.3)]"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  const validateFile = (file: File): string | null => {
    if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
      return "File type not supported. Please upload PDF, DOCX, DOC, TXT, or RTF files.";
    }
    if (file.size > MAX_FILE_SIZE) {
      return "File size too large. Please upload files smaller than 10MB.";
    }
    return null;
  };

  const generateMockAnalysis = (fileName: string): AnalysisResult => {
    const mockAnalyses = [
      {
        documentType: "Rental Agreement",
        riskLevel: "Medium" as const,
        overallScore: 7.2,
        keyRisks: [
          "Security deposit non-refundable clause",
          "Automatic rent increase provision",
          "Limited maintenance responsibility",
        ],
        protections: [
          "30-day notice requirement",
          "Right to quiet enjoyment",
          "Habitability guarantee",
        ],
        simplifiedSummary:
          "This rental agreement contains standard terms with some concerning clauses. The security deposit is non-refundable, and rent can increase automatically. However, you have basic tenant protections including proper notice requirements and habitability rights.",
        recommendations: [
          "Negotiate the security deposit terms",
          "Clarify maintenance responsibilities",
          "Request cap on rent increases",
        ],
      },
      {
        documentType: "Loan Contract",
        riskLevel: "High" as const,
        overallScore: 4.8,
        keyRisks: [
          "Variable interest rate without cap",
          "Severe penalty clauses for late payment",
          "Personal guarantee requirement",
        ],
        protections: [
          "Right to prepay without penalty",
          "Clear payment schedule",
          "Grace period for payments",
        ],
        simplifiedSummary:
          "This loan contract has significant risks including uncapped variable rates and harsh penalties. The personal guarantee means your assets could be at risk if you default.",
        recommendations: [
          "Negotiate interest rate cap",
          "Review penalty terms",
          "Consider removing personal guarantee",
        ],
      },
    ];

    return mockAnalyses[Math.floor(Math.random() * mockAnalyses.length)];
  };

  const simulateUploadAndAnalysis = (file: File) => {
    const fileId = Math.random().toString(36).substr(2, 9);
    const newFile: UploadedFile = {
      file,
      id: fileId,
      progress: 0,
      status: "uploading",
    };

    setUploadedFiles((prev) => [...prev, newFile]);

    // Simulate upload progress
    const uploadInterval = setInterval(() => {
      setUploadedFiles((prev) =>
        prev.map((f) => {
          if (f.id === fileId && f.status === "uploading") {
            const newProgress = Math.min(f.progress + 15, 100);
            if (newProgress >= 100) {
              return { ...f, progress: 100, status: "analyzing" };
            }
            return { ...f, progress: newProgress };
          }
          return f;
        }),
      );
    }, 200);

    // Complete upload and start analysis
    setTimeout(() => {
      clearInterval(uploadInterval);
      setUploadedFiles((prev) =>
        prev.map((f) =>
          f.id === fileId ? { ...f, progress: 100, status: "analyzing" } : f,
        ),
      );

      // Complete analysis
      setTimeout(() => {
        setUploadedFiles((prev) =>
          prev.map((f) =>
            f.id === fileId ? { ...f, status: "completed" } : f,
          ),
        );

        const analysis = generateMockAnalysis(file.name);
        setAnalysisResult(analysis);
        setShowAnalysis(true);
      }, 2000);
    }, 1500);
  };

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;

    Array.from(files).forEach((file) => {
      const error = validateFile(file);
      if (error) {
        alert(error);
        return;
      }
      simulateUploadAndAnalysis(file);
    });
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  }, []);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileSelect(e.target.files);
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case "Low":
        return "text-green-600 bg-green-50 border-green-200";
      case "Medium":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "High":
        return "text-red-600 bg-red-50 border-red-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  if (showAnalysis && analysisResult) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#1F2937] mb-2">
              Analysis Results
            </h1>
            <p className="text-[#6B7280]">
              AI-powered insights for your legal document
            </p>
          </div>
          <button
            onClick={() => setShowAnalysis(false)}
            className="text-[#6366F1] px-4 py-2 rounded-[18px] font-medium border border-[#6366F1] hover:bg-[#6366F1] hover:text-white transition-colors"
          >
            Analyze Another Document
          </button>
        </div>

        {/* Risk Summary Card */}
        <div className="bg-white rounded-[24px] p-8 shadow-[0_12px_48px_rgba(0,0,0,0.06)] border border-[#E5E7EB] mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-[#1F2937] mb-2">
                {analysisResult.documentType}
              </h2>
              <div className="flex items-center gap-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium border ${getRiskColor(analysisResult.riskLevel)}`}
                >
                  {analysisResult.riskLevel} Risk
                </span>
                <span className="text-[#6B7280]">
                  Overall Score: {analysisResult.overallScore}/10
                </span>
              </div>
            </div>
          </div>

          {/* Quick Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-red-50 rounded-[16px] p-4 border border-red-100">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-red-500 rounded-[8px] flex items-center justify-center">
                  <span className="text-white text-sm font-bold">
                    {analysisResult.keyRisks.length}
                  </span>
                </div>
                <div>
                  <p className="text-red-800 font-semibold text-sm">
                    Risk Factors
                  </p>
                  <p className="text-red-600 text-xs">Require attention</p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 rounded-[16px] p-4 border border-green-100">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-500 rounded-[8px] flex items-center justify-center">
                  <span className="text-white text-sm font-bold">
                    {analysisResult.protections.length}
                  </span>
                </div>
                <div>
                  <p className="text-green-800 font-semibold text-sm">
                    Protections
                  </p>
                  <p className="text-green-600 text-xs">Working for you</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-[16px] p-4 border border-blue-100">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-500 rounded-[8px] flex items-center justify-center">
                  <span className="text-white text-sm font-bold">
                    {analysisResult.recommendations.length}
                  </span>
                </div>
                <div>
                  <p className="text-blue-800 font-semibold text-sm">Actions</p>
                  <p className="text-blue-600 text-xs">Recommended</p>
                </div>
              </div>
            </div>
          </div>

          {/* Summary Section - Always Visible */}
          <div className="bg-[#F8FAFC] rounded-[16px] p-6 mb-6">
            <h3 className="font-semibold text-[#1F2937] mb-3">
              📄 Executive Summary
            </h3>
            <p className="text-[#374151] leading-relaxed">
              {analysisResult.simplifiedSummary}
            </p>
          </div>

          {/* Tab Navigation */}
          <Tabs defaultValue="risks" className="mt-8">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="risks" className="flex items-center gap-2">
                <span className="text-red-600">⚠️</span>
                Key Risks
                <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                  {analysisResult.keyRisks.length}
                </span>
              </TabsTrigger>
              <TabsTrigger value="protections" className="flex items-center gap-2">
                <span className="text-green-600">🛡️</span>
                Protections
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                  {analysisResult.protections.length}
                </span>
              </TabsTrigger>
              <TabsTrigger value="recommendations" className="flex items-center gap-2">
                <span className="text-blue-600">💡</span>
                Actions
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                  {analysisResult.recommendations.length}
                </span>
              </TabsTrigger>
            </TabsList>

            {/* Key Risks Tab */}
            <TabsContent value="risks">
              <div className="bg-white rounded-[24px] p-8 shadow-[0_12px_48px_rgba(0,0,0,0.06)] border border-[#E5E7EB]">
                <h3 className="font-semibold text-red-800 text-xl mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 bg-red-100 rounded-[12px] flex items-center justify-center">
                    <span className="text-red-600 text-lg">⚠️</span>
                  </span>
                  Key Risks Identified
                </h3>
                <div className="space-y-4">
                  {analysisResult.keyRisks.map((risk, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-4 bg-red-50 rounded-[12px] border border-red-200"
                    >
                      <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-sm font-bold">
                          {index + 1}
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="text-red-800 font-medium leading-relaxed">
                          {risk}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Legal Protections Tab */}
            <TabsContent value="protections">
              <div className="bg-white rounded-[24px] p-8 shadow-[0_12px_48px_rgba(0,0,0,0.06)] border border-[#E5E7EB]">
                <h3 className="font-semibold text-green-800 text-xl mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 bg-green-100 rounded-[12px] flex items-center justify-center">
                    <span className="text-green-600 text-lg">🛡️</span>
                  </span>
                  Your Legal Protections
                </h3>
                <div className="space-y-4">
                  {analysisResult.protections.map((protection, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-4 bg-green-50 rounded-[12px] border border-green-200"
                    >
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-sm">✓</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-green-800 font-medium leading-relaxed">
                          {protection}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Recommendations Tab */}
            <TabsContent value="recommendations">
              <div className="bg-white rounded-[24px] p-8 shadow-[0_12px_48px_rgba(0,0,0,0.06)] border border-[#E5E7EB]">
                <h3 className="font-semibold text-blue-800 text-xl mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 bg-blue-100 rounded-[12px] flex items-center justify-center">
                    <span className="text-blue-600 text-lg">💡</span>
                  </span>
                  Recommended Actions
                </h3>
                <div className="space-y-4">
                  {analysisResult.recommendations.map((rec, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-4 bg-blue-50 rounded-[12px] border border-blue-200"
                    >
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-sm font-bold">
                          {index + 1}
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="text-blue-800 font-medium leading-relaxed">
                          {rec}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Action Buttons */}
          <div className="mt-8 p-6 bg-white rounded-[16px] border border-[#E5E7EB] shadow-sm">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="font-semibold text-[#1F2937] mb-1">
                  Analysis Complete
                </h4>
                <p className="text-sm text-[#6B7280]">
                  Save, share, or analyze another document
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button className="px-4 py-2 text-[#6366F1] border border-[#6366F1] rounded-[12px] font-medium hover:bg-[#6366F1] hover:text-white transition-all">
                  📧 Email Report
                </button>
                <button className="px-4 py-2 text-[#6366F1] border border-[#6366F1] rounded-[12px] font-medium hover:bg-[#6366F1] hover:text-white transition-all">
                  📄 Export PDF
                </button>
                <button
                  onClick={() => setShowAnalysis(false)}
                  className="px-6 py-2 bg-[#6366F1] text-white rounded-[12px] font-medium shadow-[0_4px_20px_rgba(99,102,241,0.3)] hover:shadow-[0_6px_25px_rgba(99,102,241,0.4)] transition-all"
                >
                  ➕ Analyze Another
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-[#1F2937] mb-4">
          Analyze Legal Documents
        </h1>
        <p className="text-xl text-[#6B7280] max-w-2xl mx-auto">
          Upload your contracts, agreements, and legal documents to get instant
          AI-powered analysis and risk assessment.
        </p>
      </div>

      {/* Upload Area */}
      <div className="mb-8">
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`
            relative border-2 border-dashed rounded-[32px] p-12 text-center transition-all cursor-pointer
            ${
              isDragging
                ? "border-[#6366F1] bg-[#6366F1]/5 scale-[1.02]"
                : "border-[#D1D5DB] hover:border-[#6366F1] hover:bg-[#6366F1]/5"
            }
          `}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".pdf,.docx,.doc,.txt,.rtf"
            onChange={handleFileInputChange}
            className="hidden"
          />

          <div className="w-20 h-20 bg-gradient-to-br from-[#6366F1] to-[#4ADE80] rounded-[24px] flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-10 h-10 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
            </svg>
          </div>

          <h3 className="text-2xl font-semibold text-[#1F2937] mb-4">
            {isDragging ? "Drop your files here" : "Drag & drop your documents"}
          </h3>

          <p className="text-[#6B7280] mb-6">
            or{" "}
            <span className="text-[#6366F1] font-medium">click to browse</span>
          </p>

          <div className="text-sm text-[#6B7280]">
            <p className="mb-2">Supported formats: PDF, DOCX, DOC, TXT, RTF</p>
            <p>Maximum file size: 10MB</p>
          </div>
        </div>
      </div>

      {/* File List */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-[#1F2937] mb-4">
            Processing Files
          </h3>
          {uploadedFiles.map((fileItem) => (
            <div
              key={fileItem.id}
              className="bg-white rounded-[20px] p-6 shadow-[0_8px_32px_rgba(0,0,0,0.06)] border border-[#E5E7EB]"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#F3F4F6] rounded-[12px] flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-[#6B7280]"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-[#1F2937]">
                      {fileItem.file.name}
                    </p>
                    <p className="text-sm text-[#6B7280]">
                      {(fileItem.file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  {fileItem.status === "uploading" && (
                    <span className="text-[#6366F1] text-sm">Uploading...</span>
                  )}
                  {fileItem.status === "analyzing" && (
                    <span className="text-[#F59E0B] text-sm">Analyzing...</span>
                  )}
                  {fileItem.status === "completed" && (
                    <span className="text-[#10B981] text-sm">✓ Complete</span>
                  )}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-[#F3F4F6] rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    fileItem.status === "completed"
                      ? "bg-[#10B981]"
                      : fileItem.status === "analyzing"
                        ? "bg-[#F59E0B]"
                        : "bg-[#6366F1]"
                  }`}
                  style={{ width: `${fileItem.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Supported Document Types */}
      <div className="mt-16">
        <h3 className="text-2xl font-bold text-[#1F2937] text-center mb-8">
          What We Can Analyze
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: "🏠", name: "Rental Agreements" },
            { icon: "💰", name: "Loan Contracts" },
            { icon: "📋", name: "Terms of Service" },
            { icon: "💼", name: "Employment Contracts" },
            { icon: "🛡️", name: "Insurance Policies" },
            { icon: "🤝", name: "Business Contracts" },
            { icon: "⚖️", name: "Legal Agreements" },
            { icon: "📄", name: "Privacy Policies" },
          ].map((type, index) => (
            <div
              key={index}
              className="bg-white rounded-[16px] p-4 text-center shadow-[0_4px_16px_rgba(0,0,0,0.04)] border border-[#E5E7EB]"
            >
              <div className="text-2xl mb-2">{type.icon}</div>
              <p className="text-sm font-medium text-[#374151]">{type.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
