import React, { useState, useEffect, useRef, useCallback } from 'react';
import jsQR from 'jsqr';
import type { Claim } from '../types';
import { 
  X, 
  Scan, 
  CheckCircle2, 
  AlertCircle, 
  QrCode, 
  Sparkles,
  Camera,
  KeyRound,
  ShieldCheck,
  Building2,
  HeartHandshake
} from 'lucide-react';

interface ScanQRModalProps {
  isOpen: boolean;
  onClose: () => void;
  pendingClaims: Claim[];
  onConfirmPickup: (codeOrPayload: string) => { success: boolean; message: string; claim?: Claim };
}

export const ScanQRModal: React.FC<ScanQRModalProps> = ({
  isOpen,
  onClose,
  pendingClaims,
  onConfirmPickup,
}) => {
  const [activeTab, setActiveTab] = useState<'scanner' | 'otp'>('scanner');
  const [inputCode, setInputCode] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [scanResult, setScanResult] = useState<{
    success: boolean;
    message: string;
    claim?: Claim;
  } | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animationFrameId = useRef<number | null>(null);
  const fileCameraInputRef = useRef<HTMLInputElement>(null);

  const stopCamera = useCallback(() => {
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
      animationFrameId.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  }, []);

  const handleProcessCode = useCallback((code: string) => {
    setIsProcessing(true);
    setScanResult(null);

    // Short tactile delay
    setTimeout(() => {
      setIsProcessing(false);
      const res = onConfirmPickup(code.trim());
      setScanResult(res);
      if (res.success) {
        stopCamera();
        setInputCode('');
      }
    }, 400);
  }, [onConfirmPickup, stopCamera]);

  // Handle image taken from mobile camera or chosen from gallery
  const handleImageScan = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    setScanResult(null);

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const qrCode = jsQR(imageData.data, imageData.width, imageData.height, {
            inversionAttempts: 'dontInvert',
          });

          setIsProcessing(false);
          if (qrCode && qrCode.data) {
            handleProcessCode(qrCode.data);
          } else {
            setScanResult({
              success: false,
              message: 'Could not detect a clear QR code in this photo. Please retake closer with clear lighting or enter the 4-digit code.'
            });
          }
        } else {
          setIsProcessing(false);
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  // Start live camera stream (WebRTC)
  const startCamera = useCallback(async () => {
    setCameraError(null);
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Live stream blocked on HTTP. Use the "Snap QR with Camera" button below.');
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: 'environment' }, width: { ideal: 640 }, height: { ideal: 480 } },
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.setAttribute('playsinline', 'true');
        await videoRef.current.play();
        setCameraActive(true);
      }
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : 'Camera stream unavailable';
      setCameraError(errMsg);
      setCameraActive(false);
    }
  }, []);

  // Continuous frame analysis for QR codes
  useEffect(() => {
    if (!cameraActive || !isOpen) return;

    let isScanningFrame = true;

    const scanFrame = () => {
      if (!isScanningFrame) return;

      const video = videoRef.current;
      const canvas = canvasRef.current;

      if (video && canvas && video.readyState === video.HAVE_ENOUGH_DATA) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });

        if (ctx) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const qrCode = jsQR(imageData.data, imageData.width, imageData.height, {
            inversionAttempts: 'dontInvert',
          });

          if (qrCode && qrCode.data) {
            handleProcessCode(qrCode.data);
            return;
          }
        }
      }

      animationFrameId.current = requestAnimationFrame(scanFrame);
    };

    animationFrameId.current = requestAnimationFrame(scanFrame);

    return () => {
      isScanningFrame = false;
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [cameraActive, isOpen, handleProcessCode]);

  useEffect(() => {
    if (isOpen && activeTab === 'scanner' && !scanResult?.success) {
      startCamera();
    }
    return () => {
      stopCamera();
    };
  }, [isOpen, activeTab, scanResult, startCamera, stopCamera]);

  if (!isOpen) return null;

  const handleReset = () => {
    setScanResult(null);
    setInputCode('');
    if (activeTab === 'scanner') {
      startCamera();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[94vh] flex flex-col my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Hidden Mobile Camera Input (Reliable fallback on 100% of Android/iOS devices) */}
        <input
          type="file"
          ref={fileCameraInputRef}
          accept="image/*"
          capture="environment"
          onChange={handleImageScan}
          className="hidden"
        />

        {/* Header */}
        <div className="bg-slate-900 text-white px-4 sm:px-5 py-3.5 flex items-center justify-between shrink-0 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
              <Scan className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold tracking-tight">Verify Pickup</h3>
              <p className="text-[11px] text-slate-400">
                Scan recipient QR pass or enter 4-digit code
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              stopCamera();
              onClose();
            }}
            className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Selection */}
        {!scanResult?.success && (
          <div className="flex border-b border-slate-200 bg-slate-50 text-xs font-bold">
            <button
              type="button"
              onClick={() => {
                setActiveTab('scanner');
                startCamera();
              }}
              className={`flex-1 py-2.5 flex items-center justify-center gap-1.5 transition-colors border-b-2 ${
                activeTab === 'scanner'
                  ? 'border-emerald-600 text-emerald-700 bg-white'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <QrCode className="w-4 h-4" />
              <span>Camera Scanner</span>
            </button>
            <button
              type="button"
              onClick={() => {
                stopCamera();
                setActiveTab('otp');
              }}
              className={`flex-1 py-2.5 flex items-center justify-center gap-1.5 transition-colors border-b-2 ${
                activeTab === 'otp'
                  ? 'border-emerald-600 text-emerald-700 bg-white'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <KeyRound className="w-4 h-4" />
              <span>4-Digit Code</span>
            </button>
          </div>
        )}

        {/* Body Content */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-3.5 text-left text-xs">
          {scanResult?.success ? (
            /* Official Verified Handover Certificate */
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-center space-y-3 animate-in zoom-in-95 duration-200">
              <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-7 h-7" />
              </div>

              <div>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full mb-1">
                  <ShieldCheck className="w-3 h-3" /> Handover Verified
                </span>
                <h4 className="text-base font-bold text-emerald-950">
                  Surplus Food Dispatched!
                </h4>
                <p className="text-xs text-emerald-800 mt-0.5">
                  {scanResult.message}
                </p>
              </div>

              {scanResult.claim && (
                <div className="bg-white p-3.5 rounded-xl border border-emerald-200 text-left text-xs space-y-2 shadow-2xs">
                  <div className="flex justify-between items-center pb-1.5 border-b border-slate-100">
                    <span className="text-slate-500 font-medium">Voucher ID:</span>
                    <strong className="font-mono text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                      {scanResult.claim.id}
                    </strong>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 font-medium">Recipient:</span>
                    <strong className="text-slate-900 flex items-center gap-1">
                      <HeartHandshake className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{scanResult.claim.trustName || 'Community Recipient'}</span>
                    </strong>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 font-medium">Food Item:</span>
                    <strong className="text-slate-900 truncate max-w-[190px]">
                      {scanResult.claim.foodTitle}
                    </strong>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 font-medium">Portions Released:</span>
                    <strong className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {scanResult.claim.servingsClaimed} Meals
                    </strong>
                  </div>

                  <div className="flex justify-between items-center text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                    <span>Verification Code:</span>
                    <span className="font-mono font-bold text-slate-800">
                      {scanResult.claim.verificationCode || 'VERIFIED'}
                    </span>
                  </div>
                </div>
              )}

              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex-1 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors"
                >
                  Verify Another
                </button>
                <button
                  type="button"
                  onClick={() => {
                    stopCamera();
                    onClose();
                  }}
                  className="flex-1 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors shadow-xs"
                >
                  Complete
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Error Alert */}
              {scanResult && !scanResult.success && (
                <div className="bg-rose-50 border border-rose-200 rounded-xl p-3 flex items-start gap-2 text-xs text-rose-800 animate-in shake">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-bold">Verification Note:</strong>
                    <span>{scanResult.message}</span>
                  </div>
                </div>
              )}

              {/* CAMERA SCANNER TAB */}
              {activeTab === 'scanner' && (
                <div className="space-y-3">
                  <div className="relative bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 min-h-[200px] flex items-center justify-center">
                    {/* Live Video Element */}
                    <video
                      ref={videoRef}
                      className={`w-full h-52 object-cover ${cameraActive ? 'block' : 'hidden'}`}
                    />
                    {/* Hidden canvas for processing frame */}
                    <canvas ref={canvasRef} className="hidden" />

                    {/* Camera Offline / Mobile Camera Launcher */}
                    {!cameraActive && (
                      <div className="p-5 text-center text-slate-400 space-y-2.5">
                        <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-emerald-400">
                          <Camera className="w-6 h-6" />
                        </div>
                        <div className="font-bold text-xs text-slate-200">
                          Scan Beneficiary QR Code
                        </div>
                        <p className="text-[11px] text-slate-400 max-w-xs mx-auto">
                          {cameraError ? cameraError : 'Tap below to open your mobile camera and snap the QR pass.'}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-2 justify-center pt-1">
                          {/* Direct Mobile Camera Trigger */}
                          <button
                            type="button"
                            onClick={() => fileCameraInputRef.current?.click()}
                            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs inline-flex items-center justify-center gap-2 shadow-md transition-all active:scale-98"
                          >
                            <Camera className="w-4 h-4" />
                            <span>Open Camera / Snap QR</span>
                          </button>

                          {/* Try Live Stream Button */}
                          <button
                            type="button"
                            onClick={startCamera}
                            className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 font-semibold text-xs inline-flex items-center justify-center gap-1.5 transition-colors"
                          >
                            <span>Live Video Stream</span>
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Optical Scan Overlay Frame */}
                    {cameraActive && (
                      <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center">
                        <div className="w-44 h-44 relative border-2 border-emerald-400/80 rounded-2xl bg-emerald-500/5 backdrop-blur-2xs">
                          {/* Corner markers */}
                          <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-emerald-400"></div>
                          <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-emerald-400"></div>
                          <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-emerald-400"></div>
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-emerald-400"></div>

                          {/* Animated laser line */}
                          <div className="absolute inset-x-0 h-0.5 bg-emerald-400 shadow-[0_0_10px_#34d399] animate-bounce"></div>
                        </div>

                        <div className="mt-2 bg-slate-900/90 text-white px-2.5 py-1 rounded-full text-[10px] font-medium border border-slate-700 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                          <span>Align Beneficiary QR Code</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Camera Bar Actions */}
                  <div className="flex justify-between items-center text-[11px] text-slate-500 px-1">
                    <button
                      type="button"
                      onClick={() => fileCameraInputRef.current?.click()}
                      className="text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-1 underline"
                    >
                      <Camera className="w-3.5 h-3.5" />
                      <span>Take photo of QR instead</span>
                    </button>

                    {cameraActive && (
                      <button
                        type="button"
                        onClick={stopCamera}
                        className="text-slate-500 hover:text-slate-800 underline"
                      >
                        Stop Live Stream
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* 4-DIGIT CODE TAB */}
              {activeTab === 'otp' && (
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
                  <div className="text-center">
                    <label className="block text-xs font-bold text-slate-800 mb-1">
                      Enter 4-Digit Pickup Code or Voucher ID
                    </label>
                    <p className="text-[11px] text-slate-500">
                      Ask the recipient for the 4-digit code shown on their pass screen
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      maxLength={14}
                      value={inputCode}
                      onChange={(e) => setInputCode(e.target.value.toUpperCase())}
                      placeholder="e.g. 7492 or FL-8492-TN"
                      className="flex-1 font-mono text-center tracking-widest text-sm font-bold uppercase px-3 py-2.5 bg-white border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <button
                      type="button"
                      disabled={!inputCode.trim() || isProcessing}
                      onClick={() => handleProcessCode(inputCode)}
                      className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-colors shadow-sm flex items-center gap-1.5"
                    >
                      <ShieldCheck className="w-4 h-4" />
                      <span>{isProcessing ? 'Verifying...' : 'Verify'}</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Active Pending Pickups Queue */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-slate-800 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>Awaiting Pickup ({pendingClaims.length}):</span>
                  </span>
                  <span className="text-[10px] text-slate-500">1-click verify</span>
                </div>

                {pendingClaims.length === 0 ? (
                  <p className="text-slate-500 text-[11px] py-1 text-center">
                    No active pickups currently waiting for verification.
                  </p>
                ) : (
                  <div className="space-y-1.5 max-h-40 overflow-y-auto">
                    {pendingClaims.map((claim) => (
                      <div
                        key={claim.id}
                        onClick={() => handleProcessCode(claim.verificationCode || claim.id)}
                        className="bg-white hover:bg-emerald-50/70 border border-slate-200 hover:border-emerald-400 rounded-lg p-2.5 flex items-center justify-between cursor-pointer transition-all shadow-2xs group"
                      >
                        <div className="truncate pr-2">
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded text-[11px] border border-emerald-200">
                              CODE: {claim.verificationCode || claim.id.slice(-4)}
                            </span>
                            <span className="font-mono text-slate-500 text-[10px]">
                              ({claim.id})
                            </span>
                          </div>
                          <div className="font-semibold text-slate-900 truncate mt-0.5">
                            {claim.foodTitle}
                          </div>
                          <div className="text-[10px] text-slate-500 flex items-center gap-1 mt-0.5">
                            <Building2 className="w-3 h-3 text-slate-400" />
                            <span>{claim.trustName || 'Recipient'} • {claim.servingsClaimed} portions</span>
                          </div>
                        </div>

                        <button
                          type="button"
                          className="shrink-0 px-2.5 py-1.5 bg-emerald-600 group-hover:bg-emerald-700 text-white rounded-lg text-[11px] font-bold shadow-xs flex items-center gap-1"
                        >
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Verify</span>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-end shrink-0">
          <button
            type="button"
            onClick={() => {
              stopCamera();
              onClose();
            }}
            className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-100 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
