import React, { useState } from 'react';
import type { Claim } from '../types';
import { 
  X, 
  Scan, 
  CheckCircle2, 
  AlertCircle, 
  QrCode, 
  Sparkles
} from 'lucide-react';

interface ScanQRModalProps {
  isOpen: boolean;
  onClose: () => void;
  pendingClaims: Claim[];
  onConfirmPickup: (claimId: string) => { success: boolean; message: string; claim?: Claim };
}

export const ScanQRModal: React.FC<ScanQRModalProps> = ({
  isOpen,
  onClose,
  pendingClaims,
  onConfirmPickup,
}) => {
  if (!isOpen) return null;

  const [inputCode, setInputCode] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<{
    success: boolean;
    message: string;
    claim?: Claim;
  } | null>(null);

  const handleProcessCode = (code: string) => {
    setIsScanning(true);
    setScanResult(null);

    // Simulate optical scan delay (600ms)
    setTimeout(() => {
      setIsScanning(false);
      const res = onConfirmPickup(code.trim().toUpperCase());
      setScanResult(res);
      if (res.success) {
        setInputCode('');
      }
    }, 600);
  };

  const handleReset = () => {
    setScanResult(null);
    setInputCode('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-slate-900 text-white px-5 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
              <Scan className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold">Scan Recipient Pass</h3>
              <p className="text-xs text-slate-400">
                Verify QR code at kitchen dispatch or handover
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

        {/* Body Content */}
        <div className="p-5 overflow-y-auto space-y-4">
          {scanResult?.success ? (
            /* Success confirmation card */
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 text-center space-y-3 animate-in zoom-in-95 duration-200">
              <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-7 h-7" />
              </div>

              <div>
                <h4 className="text-base font-bold text-emerald-950">
                  Pickup Verified & Logged!
                </h4>
                <p className="text-xs text-emerald-800 mt-1">
                  {scanResult.message}
                </p>
              </div>

              {scanResult.claim && (
                <div className="bg-white p-3 rounded-xl border border-emerald-200 text-left text-xs space-y-1">
                  <div className="flex justify-between text-slate-600">
                    <span>Claim ID:</span>
                    <strong className="font-mono text-slate-900">{scanResult.claim.id}</strong>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Food Rescued:</span>
                    <strong className="text-slate-900 truncate max-w-[200px]">{scanResult.claim.foodTitle}</strong>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Servings Released:</span>
                    <strong className="text-emerald-700 font-bold">{scanResult.claim.servingsClaimed} portions</strong>
                  </div>
                  <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                    Inventory has been decremented and logged in compliance records.
                  </div>
                </div>
              )}

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex-1 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors"
                >
                  Scan Another Code
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Camera Scanner Viewport Simulator */}
              <div className="relative bg-slate-950 rounded-2xl p-6 text-center overflow-hidden border border-slate-800">
                {/* Viewport Frame with optical scan guide */}
                <div className="w-48 h-48 mx-auto relative border-2 border-emerald-500/60 rounded-2xl flex items-center justify-center bg-slate-900/60 backdrop-blur-xs">
                  {/* Corner notches */}
                  <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-emerald-400"></div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-emerald-400"></div>
                  <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-emerald-400"></div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-emerald-400"></div>

                  {/* Animated laser scan line */}
                  <div className="absolute inset-x-0 h-0.5 bg-emerald-400 shadow-[0_0_8px_#34d399] animate-[bounce_2s_infinite]"></div>

                  <div className="text-center text-slate-400 p-3">
                    <QrCode className="w-12 h-12 mx-auto text-emerald-400/80 mb-2" />
                    <span className="text-[11px] font-medium block">
                      {isScanning ? 'Verifying QR Token...' : 'Align Recipient QR Code'}
                    </span>
                  </div>
                </div>

                <div className="mt-3 text-slate-400 text-xs flex items-center justify-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>Optical Camera Scanner Active</span>
                </div>
              </div>

              {/* Error Banner */}
              {scanResult && !scanResult.success && (
                <div className="bg-rose-50 border border-rose-200 rounded-xl p-3 flex items-start gap-2 text-xs text-rose-800">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block">Scan Failed:</strong>
                    <span>{scanResult.message}</span>
                  </div>
                </div>
              )}

              {/* 1-Click Simulator of Active Pending Claims */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs">
                <span className="font-bold text-slate-800 block mb-1.5 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Quick-Test Active Recipient Passes ({pendingClaims.length}):</span>
                </span>

                {pendingClaims.length === 0 ? (
                  <p className="text-slate-500 text-[11px]">
                    No recipient claims are currently pending pickup. Switch to Recipient view to claim a meal first!
                  </p>
                ) : (
                  <div className="space-y-1.5">
                    {pendingClaims.map((claim) => (
                      <div
                        key={claim.id}
                        onClick={() => handleProcessCode(claim.id)}
                        className="bg-white hover:bg-emerald-50/60 border border-slate-200 hover:border-emerald-300 rounded-lg p-2 flex items-center justify-between cursor-pointer transition-colors"
                      >
                        <div className="truncate pr-2">
                          <span className="font-mono font-bold text-slate-900 mr-2 bg-slate-100 px-1 py-0.5 rounded text-[11px]">
                            {claim.id}
                          </span>
                          <span className="font-medium text-slate-700 truncate">
                            {claim.foodTitle}
                          </span>
                          <span className="text-slate-400 text-[11px] ml-1">
                            ({claim.servingsClaimed} servings)
                          </span>
                        </div>

                        <button
                          type="button"
                          className="shrink-0 px-2 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-[11px] font-bold"
                        >
                          Simulate Scan
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Manual Entry Fallback */}
              <div>
                <label className="block font-bold text-slate-800 text-xs mb-1">
                  Or Enter Claim ID Manually:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value.toUpperCase())}
                    placeholder="e.g. FL-8492-XQ"
                    className="flex-1 font-mono uppercase px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                  />
                  <button
                    type="button"
                    disabled={!inputCode.trim() || isScanning}
                    onClick={() => handleProcessCode(inputCode)}
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-colors"
                  >
                    Validate
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-100 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
