import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import type { Claim } from '../types';
import { getUrgencyInfo } from '../utils/helpers';
import { 
  CheckCircle2, 
  Copy, 
  Check, 
  MapPin, 
  Phone,
  Printer, 
  Clock, 
  Building2, 
  HeartHandshake,
  ShieldCheck,
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

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
      <div 
        className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[94vh] flex flex-col my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Ribbon */}
        <div className="bg-slate-900 text-white px-4 sm:px-5 py-3.5 flex items-center justify-between shrink-0 border-b border-slate-800">
          <div className="flex items-center gap-2">
            {isCollected ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            ) : (
              <HeartHandshake className="w-5 h-5 text-emerald-400 shrink-0" />
            )}
            <div>
              <h3 className="text-sm font-bold tracking-tight">
                {isCollected ? 'Food Rescue Receipt (Collected)' : 'Official Surplus Food Rescue Receipt'}
              </h3>
              <p className="text-[11px] text-slate-400">
                {isCollected ? 'Handover completed successfully' : 'Present this pass at Mandapam/Donor kitchen'}
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
        <div className="p-4 sm:p-5 overflow-y-auto space-y-3.5 text-left text-xs">
          {/* Status Banner */}
          {isCollected ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-emerald-900 font-semibold flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <div className="font-bold text-emerald-950">Food Handover Completed!</div>
                <div className="text-[11px] text-emerald-800 mt-0.5">
                  Verified and handed over to trust volunteers. Thank you for preventing food waste!
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-amber-950 flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping shrink-0"></span>
              <div>
                <div className="font-bold">Active Pickup Pass & Receipt</div>
                <div className="text-[11px] text-amber-900 mt-0.5">
                  Show this QR code at the kitchen dispatch door for instant verification.
                </div>
              </div>
            </div>
          )}

          {/* Official Receipt Card */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-2.5 shadow-2xs">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">Rescue Voucher</span>
                <span className="font-mono text-sm font-bold text-slate-900">{claim.id}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleCopyId}
                  className="flex items-center gap-1 text-[11px] text-slate-600 hover:text-slate-900 bg-white px-2 py-1 rounded-md border border-slate-200 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy ID'}</span>
                </button>
                <button
                  type="button"
                  onClick={handlePrint}
                  className="flex items-center gap-1 text-[11px] text-slate-600 hover:text-slate-900 bg-white px-2 py-1 rounded-md border border-slate-200 transition-colors"
                  title="Print Receipt"
                >
                  <Printer className="w-3.5 h-3.5 text-slate-500" />
                  <span>Print</span>
                </button>
              </div>
            </div>

            {/* Food Title & Quantity */}
            <div>
              <div className="text-[11px] text-slate-500 font-medium">Claimed Food Item:</div>
              <div className="font-bold text-slate-900 text-sm mt-0.5 leading-snug">
                {claim.foodTitle}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-200/80">
              <div>
                <span className="text-[10px] text-slate-500 block">Portions Reserved:</span>
                <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 inline-block mt-0.5">
                  {claim.servingsClaimed} Meals
                </span>
              </div>

              <div>
                <span className="text-[10px] text-slate-500 block">Pickup Deadline:</span>
                <span className={`font-semibold px-2 py-0.5 rounded inline-block mt-0.5 ${urgency.badgeClasses}`}>
                  {urgency.formatted}
                </span>
              </div>
            </div>

            {/* Trust / Recipient Information */}
            <div className="pt-2 border-t border-slate-200/80">
              <div className="text-[10px] text-slate-500">Beneficiary / Claimed For:</div>
              <div className="font-semibold text-slate-800 flex items-center gap-1 mt-0.5">
                <HeartHandshake className="w-3.5 h-3.5 text-emerald-600" />
                <span>{claim.trustName || 'Anbu Karangal Children Trust & Orphanage'}</span>
              </div>
            </div>
          </div>

          {/* QR Code Container */}
          <div className="bg-white border-2 border-dashed border-emerald-300 rounded-2xl p-4 text-center shadow-xs">
            <div className="bg-white p-2.5 rounded-xl border border-slate-200 inline-block">
              <QRCodeSVG
                value={claim.qrPayload}
                size={160}
                level="H"
                includeMargin={false}
                fgColor="#0F172A"
              />
            </div>
            <div className="mt-2 text-center">
              <span className="text-[11px] font-bold text-slate-700 block">
                QR Verification Code for Dispatch
              </span>
              <span className="text-[10px] text-slate-500">
                Scan by Donor upon food collection
              </span>
            </div>
          </div>

          {/* Donor Location & Directions */}
          <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-2xs">
            <div className="p-2.5 bg-slate-100 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-1.5 font-bold text-slate-800">
                <Building2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Donor: {claim.donorName}</span>
              </div>
              <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                <ShieldCheck className="w-3 h-3" />
                Verified
              </span>
            </div>

            <div className="p-3 space-y-2">
              <div className="flex items-start gap-1.5">
                <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-900">{claim.pickupAddress}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">{claim.pickupInstructions}</div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <div className="flex items-center gap-1 text-[11px] text-slate-600">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Window: {claim.pickupWindow.start} – {claim.pickupWindow.end}</span>
                </div>

                <a
                  href="tel:+919842154321"
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-semibold border border-emerald-200 transition-colors"
                >
                  <Phone className="w-3 h-3 text-emerald-600" />
                  <span>Call Donor</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="p-3.5 sm:p-4 bg-slate-50 border-t border-slate-200 space-y-2 shrink-0">
          {!isCollected ? (
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => onSimulatePickup(claim.id)}
                className="flex-1 py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                title="Simulate Mandapam / Donor scanning this QR code"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Confirm Handover (Donor Scan)</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors shadow-xs"
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
              Close Receipt
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
