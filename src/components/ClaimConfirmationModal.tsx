import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import type { Claim } from '../types';
import { getUrgencyInfo } from '../utils/helpers';
import { 
  CheckCircle2, 
  Copy, 
  Check, 
  MapPin, 
  QrCode, 
  X
} from 'lucide-react';

interface ClaimConfirmationModalProps {
  claim: Claim | null;
  now: number;
  onClose: () => void;
  onSimulatePickup: (claimId: string) => void;
}

export const ClaimConfirmationModal: React.FC<ClaimConfirmationModalProps> = ({
  claim,
  now,
  onClose,
  onSimulatePickup,
}) => {
  if (!claim) return null;

  const [copied, setCopied] = useState(false);
  const urgency = getUrgencyInfo(claim.expiryTimestamp, now);
  const isCollected = claim.status === 'collected';

  const handleCopyId = () => {
    navigator.clipboard.writeText(claim.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[94vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Ribbon */}
        <div className="bg-slate-900 text-white px-5 py-3.5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            {isCollected ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            ) : (
              <QrCode className="w-5 h-5 text-emerald-400" />
            )}
            <div>
              <h3 className="text-sm font-bold tracking-tight">
                {isCollected ? 'Pickup Completed' : 'Surplus Rescue Pass'}
              </h3>
              <p className="text-[11px] text-slate-400">
                {isCollected ? 'Food saved successfully' : 'Present pass to staff at pickup'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto space-y-4 text-center">
          {/* Status Banner */}
          {isCollected ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-emerald-900 text-xs font-semibold flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Verified and collected. Thank you for rescuing surplus food!</span>
            </div>
          ) : (
            <div className="bg-amber-50/90 border border-amber-200 rounded-xl p-2.5 text-amber-950 text-xs flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
              <span className="font-semibold">Show QR at Pickup:</span>
              <span>Ask for kitchen lead upon arrival</span>
            </div>
          )}

          {/* QR Code Container */}
          <div className="bg-slate-50 border-2 border-dashed border-slate-300 rounded-2xl p-5 inline-block mx-auto shadow-inner">
            <div className="bg-white p-3 rounded-xl shadow-xs border border-slate-200 inline-block">
              <QRCodeSVG
                value={claim.qrPayload}
                size={180}
                level="H"
                includeMargin={false}
                fgColor="#0F172A"
              />
            </div>

            {/* Claim ID Monospace */}
            <div className="mt-3 flex items-center justify-center gap-2">
              <span className="text-xs text-slate-500 font-medium">Claim ID:</span>
              <code className="text-base font-bold font-mono text-slate-900 bg-white px-2.5 py-1 rounded-md border border-slate-300">
                {claim.id}
              </code>
              <button
                type="button"
                onClick={handleCopyId}
                className="p-1.5 rounded-md hover:bg-slate-200 text-slate-600 transition-colors"
                title="Copy Claim ID"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Food and Portions Summary */}
          <div className="text-left bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-2 text-xs">
            <div className="font-bold text-slate-900 text-sm leading-tight">
              {claim.foodTitle}
            </div>

            <div className="flex items-center justify-between text-slate-600 pt-1 border-t border-slate-200">
              <span>Donor Partner:</span>
              <strong className="text-slate-800">{claim.donorName}</strong>
            </div>

            <div className="flex items-center justify-between text-slate-600">
              <span>Portions Reserved:</span>
              <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                {claim.servingsClaimed} Servings
              </span>
            </div>

            <div className="flex items-center justify-between text-slate-600">
              <span>Time Left to Collect:</span>
              <span className={`font-semibold px-2 py-0.5 rounded ${urgency.badgeClasses}`}>
                {urgency.formatted}
              </span>
            </div>
          </div>

          {/* Location Map Preview */}
          <div className="text-left border border-slate-200 rounded-xl overflow-hidden bg-white shadow-2xs">
            <div className="p-3 bg-slate-100 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                <MapPin className="w-4 h-4 text-emerald-600" />
                <span>Pickup Location Map</span>
              </div>
              <span className="text-[11px] text-slate-500 font-medium">
                Live Directions
              </span>
            </div>

            {/* Stylized Simulated Map Preview */}
            <div className="relative h-28 bg-slate-200 w-full overflow-hidden flex items-center justify-center">
              {/* SVG Grid / Map lines */}
              <svg className="w-full h-full text-slate-300" viewBox="0 0 400 120" preserveAspectRatio="none">
                <rect width="400" height="120" fill="#e2e8f0" />
                <path d="M 0 30 Q 150 10 400 50" stroke="#cbd5e1" strokeWidth="6" fill="none" />
                <path d="M 40 0 L 120 120" stroke="#cbd5e1" strokeWidth="5" fill="none" />
                <path d="M 240 0 L 290 120" stroke="#cbd5e1" strokeWidth="7" fill="none" />
                <path d="M 0 90 L 400 80" stroke="#cbd5e1" strokeWidth="4" fill="none" />
                <path d="M 120 60 Q 220 80 300 40" stroke="#10b981" strokeWidth="3" strokeDasharray="4 4" fill="none" />
              </svg>

              {/* Pin Overlay */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <div className="bg-emerald-600 text-white p-1.5 rounded-full shadow-lg border-2 border-white animate-bounce">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="mt-1 bg-slate-900/90 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm whitespace-nowrap">
                  {claim.donorName}
                </div>
              </div>
            </div>

            <div className="p-3 text-xs text-slate-700 bg-white">
              <div className="font-semibold text-slate-900 mb-0.5">{claim.pickupAddress}</div>
              <div className="text-[11px] text-slate-500">{claim.pickupInstructions}</div>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 space-y-2 shrink-0">
          {!isCollected ? (
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => onSimulatePickup(claim.id)}
                className="flex-1 py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                title="Simulate scanning this QR code as the donor"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Simulate Pickup (Donor Scan)</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors"
              >
                Done
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={onClose}
              className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors"
            >
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
