import { useNavigate } from "react-router-dom";

export default function Homepage() {
  const navigate = useNavigate();

  return (
    <div>
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-6xl sm:text-4xl font-bold text-[#1F2937] mb-8 leading-tight">
            <span>Demystify Legal Documents with </span>
            <span className="bg-gradient-to-r from-[#6366F1] to-[#4ADE80] bg-clip-text text-transparent">
              AI-Powered
            </span>
            <span> Clarity</span>
          </h1>
          <p className="text-xl sm:text-lg text-[#6B7280] mb-12 leading-relaxed max-w-3xl mx-auto">
            Transform complex legal jargon into clear, understandable guidance.
            Upload contracts, agreements, and legal documents to get instant
            analysis, risk assessment, and actionable insights.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
            <button
              onClick={() => navigate("/signup")}
              className="bg-[#6366F1] text-white px-8 py-4 rounded-[24px] font-semibold text-lg shadow-[0_8px_32px_rgba(99,102,241,0.3)] transition-all hover:shadow-[0_10px_40px_rgba(99,102,241,0.4)]"
            >
              Start Analyzing Documents
            </button>
            <button className="text-[#6366F1] px-8 py-4 rounded-[24px] font-semibold text-lg border-2 border-[#6366F1] transition-all hover:bg-[#6366F1] hover:text-white">
              See How It Works
            </button>
          </div>

          {/* Before/After Comparison */}
          <div className="relative max-w-5xl mx-auto">
            <div className="bg-white rounded-[32px] shadow-[0_20px_80px_rgba(0,0,0,0.08)] p-8 border border-[#E5E7EB]">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Before */}
                <div className="bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] rounded-[24px] p-8 border border-[#E2E8F0]">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#EF4444] to-[#DC2626] rounded-[16px] flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-[#1F2937]">
                      Before: Complex Legal Text
                    </h3>
                  </div>
                  <p className="text-sm text-[#6B7280] leading-relaxed font-mono bg-[#F9FAFB] p-4 rounded-[12px] border">
                    "The Lessee hereby acknowledges and agrees that any and all
                    security deposits, advance rent payments, or other monetary
                    considerations paid hereunder shall be deemed non-refundable
                    and non-returnable under any circumstances whatsoever..."
                  </p>
                </div>

                {/* After */}
                <div className="bg-gradient-to-br from-[#ECFDF5] to-[#F0FDF4] rounded-[24px] p-8 border border-[#D1FAE5]">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#4ADE80] to-[#10B981] rounded-[16px] flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-[#1F2937]">
                      After: Clear Explanation
                    </h3>
                  </div>
                  <p className="text-sm text-[#374151] leading-relaxed bg-white p-4 rounded-[12px] border border-[#D1FAE5]">
                    <span className="font-semibold text-[#EF4444]">
                      ⚠️ Risk Alert:
                    </span>
                    <span>
                      {" "}
                      Your security deposit and advance rent payments are
                      non-refundable. This means you won't get this money back
                      even if you leave the property in perfect condition.
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Supported Document Types */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#1F2937] mb-6">
            Supported Document Types
          </h2>
          <p className="text-xl text-[#6B7280] max-w-2xl mx-auto">
            Our AI understands and analyzes various types of legal documents to
            protect your interests
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Rental Agreements */}
          <div className="bg-white rounded-[32px] p-10 shadow-[0_12px_48px_rgba(0,0,0,0.06)] border border-[#E5E7EB] text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] rounded-[24px] flex items-center justify-center mx-auto mb-8">
              <svg
                className="w-10 h-10 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-[#1F2937] mb-4">
              Rental Agreements
            </h3>
            <p className="text-[#6B7280] leading-relaxed">
              Lease contracts, rental terms, security deposit clauses, and
              tenant rights analysis
            </p>
          </div>

          {/* Loan Contracts */}
          <div className="bg-white rounded-[32px] p-10 shadow-[0_12px_48px_rgba(0,0,0,0.06)] border border-[#E5E7EB] text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-[#4ADE80] to-[#10B981] rounded-[24px] flex items-center justify-center mx-auto mb-8">
              <svg
                className="w-10 h-10 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-[#1F2937] mb-4">
              Loan Contracts
            </h3>
            <p className="text-[#6B7280] leading-relaxed">
              Personal loans, mortgages, interest rates, payment terms, and
              penalty clauses
            </p>
          </div>

          {/* Terms of Service */}
          <div className="bg-white rounded-[32px] p-10 shadow-[0_12px_48px_rgba(0,0,0,0.06)] border border-[#E5E7EB] text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-[#F59E0B] to-[#D97706] rounded-[24px] flex items-center justify-center mx-auto mb-8">
              <svg
                className="w-10 h-10 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-[#1F2937] mb-4">
              Terms of Service
            </h3>
            <p className="text-[#6B7280] leading-relaxed">
              Privacy policies, user agreements, liability clauses, and data
              usage terms
            </p>
          </div>

          {/* Employment Contracts */}
          <div className="bg-white rounded-[32px] p-10 shadow-[0_12px_48px_rgba(0,0,0,0.06)] border border-[#E5E7EB] text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-[#8B5CF6] to-[#7C3AED] rounded-[24px] flex items-center justify-center mx-auto mb-8">
              <svg
                className="w-10 h-10 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 01-2 2H10a2 2 0 01-2-2V6m8 0H8m0 0H6a2 2 0 00-2 2v6a2 2 0 002 2h2m0 0h8m-8 0v2a2 2 0 002 2h4a2 2 0 002-2v-2m-8 0V8a2 2 0 012-2h4a2 2 0 012 2v8"></path>
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-[#1F2937] mb-4">
              Employment Contracts
            </h3>
            <p className="text-[#6B7280] leading-relaxed">
              Job agreements, non-compete clauses, compensation terms, and
              termination conditions
            </p>
          </div>

          {/* Insurance Policies */}
          <div className="bg-white rounded-[32px] p-10 shadow-[0_12px_48px_rgba(0,0,0,0.06)] border border-[#E5E7EB] text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-[#EF4444] to-[#DC2626] rounded-[24px] flex items-center justify-center mx-auto mb-8">
              <svg
                className="w-10 h-10 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-[#1F2937] mb-4">
              Insurance Policies
            </h3>
            <p className="text-[#6B7280] leading-relaxed">
              Coverage details, exclusions, deductibles, and claim procedures
              explained clearly
            </p>
          </div>

          {/* Business Contracts */}
          <div className="bg-white rounded-[32px] p-10 shadow-[0_12px_48px_rgba(0,0,0,0.06)] border border-[#E5E7EB] text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-[#06B6D4] to-[#0891B2] rounded-[24px] flex items-center justify-center mx-auto mb-8">
              <svg
                className="w-10 h-10 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-[#1F2937] mb-4">
              Business Contracts
            </h3>
            <p className="text-[#6B7280] leading-relaxed">
              Partnership agreements, vendor contracts, and service level
              agreements
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-[#6366F1] to-[#4ADE80] py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-5xl sm:text-3xl font-bold text-white mb-8">
            Protect Yourself from Legal Risks
          </h2>
          <p className="text-xl sm:text-lg text-white/90 mb-12 leading-relaxed">
            Don't sign documents you don't understand. Get instant AI-powered
            analysis and make informed decisions.
          </p>
          <button
            onClick={() => navigate("/signup")}
            className="bg-white text-[#6366F1] px-10 py-5 rounded-[24px] font-semibold text-xl shadow-[0_8px_32px_rgba(255,255,255,0.3)] transition-all hover:shadow-[0_10px_40px_rgba(255,255,255,0.4)]"
          >
            Start Free Analysis
          </button>
        </div>
      </section>
    </div>
  );
}
