import React from 'react';
import type { Claim } from '../types';
import { getUrgencyInfo } from '../utils/helpers';
import { 
  X, 
  Ticket, 
  CheckCircle2, 
  ChevronRight, 
  Trash2, 
  QrCode,
  AlertCircle
} from 'lucide-react';

interface MyClaimsModalProps {
  claims: Claim[];
  now: number;
  isOpen: boolean;
  onClose: () => void;
  onOpenClaim: (claim: Claim) => void;
  onCancelClaim: (claimId: string) => void;
}

export const MyClaimsModal: React.FC<MyClaimsModalProps> = ({
  claims,
  now,
  isOpen,
  onClose,
  onOpenClaim,
  onCancelClaim,
}) => {
  if (!isOpen) return null;

  const pendingClaims = claims.filter((c) => c.status === 'pending');
  const pastClaims = claims.filter((c) => c.status !== 'pending');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-lg rounded-2xl shadow-xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-slate-900 text-white px-5 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <Ticket className="w-5 h-5 text-emerald-400" />
            <div>
              <h3 className="text-base font-bold">My Rescue Passes</h3>
              <p className="text-xs text-slate-400">
                {pendingClaims.length} active pickup pass{pendingClaims.length === 1 ? '' : 'es'}
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
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4">
          {claims.length === 0 ? (
            <div className="text-center py-10 px-4 bg-slate-50 rounded-xl border border-slate-200">
              <Ticket className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <div className="text-sm font-bold text-slate-700">No active claims yet</div>
              <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                Browse surplus food from local venues, weddings, and canteens to claim meals before they go to waste.
              </p>
            </div>
          ) : (
            <>
              {/* Active Pending Claims */}
              {pendingClaims.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Active & Ready for Pickup ({pendingClaims.length})
                  </h4>
                  <div className="space-y-2.5">
                    {pendingClaims.map((claim) => {
                      const urgency = getUrgencyInfo(claim.expiryTimestamp, now);
                      return (
                        <div
                          key={claim.id}
                          className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-2xs hover:border-emerald-500 transition-all cursor-pointer flex flex-col gap-2.5"
                          onClick={() => onOpenClaim(claim)}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                                <span className="font-mono text-xs font-bold text-slate-900 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                                  {claim.id}
                                </span>
                                <span className="font-mono text-[11px] font-extrabold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                                  OTP: {claim.verificationCode || claim.id.slice(-4)}
                                </span>
                                <span className="text-xs text-slate-500">
                                  {claim.servingsClaimed} servings
                                </span>
                              </div>
                              <h5 className="text-sm font-bold text-slate-900 leading-snug">
                                {claim.foodTitle}
                              </h5>
                              <p className="text-xs text-slate-600 mt-0.5">
                                {claim.donorName}
                              </p>
                            </div>

                            <div className="shrink-0">
                              <span className={`text-[11px] font-semibold px-2 py-0.5 rounded ${urgency.badgeClasses}`}>
                                {urgency.formatted}
                              </span>
                            </div>
                          </div>

                          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                            <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                              <QrCode className="w-3.5 h-3.5" />
                              <span>Show QR Code Pass</span>
                            </span>

                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (confirm(`Cancel reservation for "${claim.foodTitle}"? Portions will be released back to the community feed.`)) {
                                    onCancelClaim(claim.id);
                                  }
                                }}
                                className="text-slate-400 hover:text-rose-600 text-xs p-1"
                                title="Cancel Claim"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                              <ChevronRight className="w-4 h-4 text-slate-400" />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Past / Completed Claims */}
              {pastClaims.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Rescue History ({pastClaims.length})
                  </h4>
                  <div className="space-y-2">
                    {pastClaims.map((claim) => (
                      <div
                        key={claim.id}
                        className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center justify-between gap-3 text-xs opacity-80"
                      >
                        <div>
                          <div className="flex items-center gap-1.5 font-bold text-slate-700">
                            {claim.status === 'collected' ? (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            ) : (
                              <AlertCircle className="w-3.5 h-3.5 text-slate-400" />
                            )}
                            <span>{claim.foodTitle}</span>
                          </div>
                          <div className="text-[11px] text-slate-500 mt-0.5">
                            {claim.donorName} • {claim.servingsClaimed} servings • Claim ID {claim.id}
                          </div>
                        </div>

                        <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-100 text-emerald-800 shrink-0">
                          {claim.status === 'collected' ? 'Collected' : 'Cancelled'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
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
