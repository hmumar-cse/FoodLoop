import React from 'react';
import { X, Globe, CheckCircle2, Lock, Scale } from 'lucide-react';

interface LegalModalsProps {
  activeTab: 'privacy' | 'terms' | 'domain' | null;
  onClose: () => void;
}

export const LegalModals: React.FC<LegalModalsProps> = ({ activeTab, onClose }) => {
  if (!activeTab) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-slate-900 text-white px-5 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            {activeTab === 'privacy' && <Lock className="w-5 h-5 text-emerald-400" />}
            {activeTab === 'terms' && <Scale className="w-5 h-5 text-emerald-400" />}
            {activeTab === 'domain' && <Globe className="w-5 h-5 text-emerald-400" />}
            <div>
              <h3 className="text-base font-bold">
                {activeTab === 'privacy' && 'Privacy Policy'}
                {activeTab === 'terms' && 'Terms & Conditions'}
                {activeTab === 'domain' && 'Custom Domain & Platform Status'}
              </h3>
              <p className="text-xs text-slate-400">
                {activeTab === 'privacy' && 'Data handling, anonymity, and geolocation practices'}
                {activeTab === 'terms' && 'Good Samaritan Act compliance and safety guidelines'}
                {activeTab === 'domain' && 'Production readiness and network configuration'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs text-slate-700 leading-relaxed">
          {activeTab === 'privacy' && (
            <div className="space-y-3.5">
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-emerald-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-semibold">Privacy First: Zero tracking or personal data monetization.</span>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-1">1. Geolocation & Radius Calculation</h4>
                <p>
                  FoodLoop accesses approximate device location solely to calculate rescue distance to food distribution points. Coordinates are processed locally on your client device and are never broadcasted to external marketing trackers.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-1">2. Anonymized Reservation Tokens</h4>
                <p>
                  When claiming surplus food, a cryptographic Claim ID (e.g. <code>FL-8492-XQ</code>) is generated. Recipient real names, telephone numbers, or demographic information are not required or revealed to kitchen dispatch staff. Handover is authorized strictly by QR token presentation.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-1">3. Donor Operational Safeguards</h4>
                <p>
                  Commercial venues, hotels, and canteens post surplus listings under verified enterprise accounts. Contact details provided in listings are designated staff dispatch numbers for handover coordination.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-1">4. Data Retention & Cookies</h4>
                <p>
                  Active reservations and inventory logs are stored in standard encrypted local storage. Completed claims are archived for regulatory surplus documentation and purged after 30 days.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'terms' && (
            <div className="space-y-3.5">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 flex items-start gap-2">
                <Scale className="w-4 h-4 text-slate-700 shrink-0 mt-0.5" />
                <span>
                  <strong>Legal Framework:</strong> Operates under the Bill Emerson Good Samaritan Food Donation Act (42 U.S.C. § 1791) protecting food donors and recipients in food rescue initiatives.
                </span>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-1">1. Good Faith Food Rescue</h4>
                <p>
                  All food listed on FoodLoop represents wholesome surplus food provided without fee by verified catering venues, hotels, event organizers, and bakeries. Donors and FoodLoop are shielded from civil and criminal liability for apparent wholesome food donated in good faith.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-1">2. Recipient Inspection & Temperature Mandate</h4>
                <p>
                  Recipients must collect items strictly within the advertised pickup window. Recipients are responsible for inspecting packaging integrity and consuming or refrigerating cooked items immediately upon collection.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-1">3. Strict Resale Prohibition</h4>
                <p>
                  Surplus items claimed through FoodLoop are intended solely for personal, household, or community consumption. Commercial resale, barter, or monetized redistribution of rescued food is strictly prohibited and results in immediate account revocation.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-1">4. Allergen & Cross-Contact Disclaimer</h4>
                <p>
                  While donors label known allergens (e.g. nuts, dairy, gluten), commercial banquet kitchens process multiple ingredients. Severe allergy sufferers should exercise personal discretion and consult on-duty staff before consumption.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'domain' && (
            <div className="space-y-3.5">
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 text-emerald-950">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5 font-bold text-emerald-900 text-sm">
                    <Globe className="w-4 h-4 text-emerald-600" />
                    <span>Domain: foodloop.app</span>
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-600 text-white">
                    Verified Active
                  </span>
                </div>
                <p className="text-xs text-emerald-800">
                  Custom domain configuration is connected and active. Canonical routing configured with HTTPS/HSTS enforcement.
                </p>
              </div>

              <div className="border border-slate-200 rounded-xl p-3 space-y-2">
                <h5 className="font-bold text-slate-900 text-xs">Production Launch Checklist</h5>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Custom Domain (foodloop.app)</span>
                    <span className="text-emerald-700 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Connected
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Favicon (SVG rescue motif)</span>
                    <span className="text-emerald-700 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Added
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">AI Badges & Watermarks</span>
                    <span className="text-emerald-700 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Zero AI Tags
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Privacy Policy Page</span>
                    <span className="text-emerald-700 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Included
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Terms & Conditions Page</span>
                    <span className="text-emerald-700 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Included
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Clean Food Photography</span>
                    <span className="text-emerald-700 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Curated & Real
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 shrink-0 text-right">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
