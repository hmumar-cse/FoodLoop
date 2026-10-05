import { useState, useEffect, useCallback } from 'react';
import type { FoodItem, Claim, UserRole, FoodCategory, SortOption, AppUser } from './types';
import { INITIAL_FOOD_ITEMS } from './data/mockData';
import { calculateSmartRescueScore, generateClaimId, STORAGE_KEYS } from './utils/helpers';

import { Header } from './components/Header';
import { FilterBar } from './components/FilterBar';
import { FoodCard } from './components/FoodCard';
import { FoodDetailModal } from './components/FoodDetailModal';
import { ClaimConfirmationModal } from './components/ClaimConfirmationModal';
import { MyClaimsModal } from './components/MyClaimsModal';
import { DonorDashboard } from './components/DonorDashboard';
import { AddFoodModal } from './components/AddFoodModal';
import { ScanQRModal } from './components/ScanQRModal';
import { LegalModals } from './components/LegalModals';
import { LoginModal } from './components/LoginModal';

interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}

let nextToastId = 1;

function App() {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  const [currentUser, setCurrentUser] = useState<AppUser | null>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.USER);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleLogin = useCallback((user: AppUser) => {
    setCurrentUser(user);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    setCurrentRole(user.role);
    localStorage.setItem(STORAGE_KEYS.ROLE, user.role);
    setShowLoginModal(false);
    addToast(`Welcome, ${user.name}! Connected to ${user.organizationName || 'FoodLoop TN'}`, 'success');
  }, []);

  const handleLogout = useCallback(() => {
    setCurrentUser(null);
    localStorage.removeItem(STORAGE_KEYS.USER);
    setCurrentRole('recipient');
    addToast('Signed out successfully.', 'info');
  }, []);

  // Location / City state (Tamil Nadu)
  const [selectedCity, setSelectedCity] = useState<string>(() => {
    try {
      const stored = localStorage.getItem('foodloop_city_v1');
      return stored || 'T. Nagar, Chennai';
    } catch {
      return 'T. Nagar, Chennai';
    }
  });

  const handleChangeCity = useCallback((city: string) => {
    setSelectedCity(city);
    localStorage.setItem('foodloop_city_v1', city);
    addToast(`Location set to ${city}`, 'info');
  }, []);

  // Food Items State (Always initialized with authentic Tamil Nadu items if storage is empty or reset)
  const [foodItems, setFoodItems] = useState<FoodItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.FOOD_ITEMS);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Check if it's already localized (e.g. contains 'Biryani' or 'Tamil' or 'Mandapam')
          const isLocalized = parsed.some(item => item.title.includes('Biryani') || item.title.includes('Sambar') || item.title.includes('Tamil') || item.title.includes('Pongal'));
          if (isLocalized) return parsed;
        }
      }
      return INITIAL_FOOD_ITEMS;
    } catch {
      return INITIAL_FOOD_ITEMS;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.FOOD_ITEMS, JSON.stringify(foodItems));
  }, [foodItems]);

  // Claims / Receipts State
  const [claims, setClaims] = useState<Claim[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CLAIMS);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CLAIMS, JSON.stringify(claims));
  }, [claims]);

  // Role State (Default: recipient for orphanages and trusts)
  const [currentRole, setCurrentRole] = useState<UserRole>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.ROLE);
      return (stored === 'donor' || stored === 'recipient') ? stored : 'recipient';
    } catch {
      return 'recipient';
    }
  });

  const handleRoleChange = useCallback((role: UserRole) => {
    setCurrentRole(role);
    localStorage.setItem(STORAGE_KEYS.ROLE, role);
    if (role === 'donor') {
      addToast('Switched to Kalyana Mandapam & Donor Hub', 'info');
    } else {
      addToast('Switched to Orphanage & Trust Recipient Feed', 'info');
    }
  }, []);

  const [selectedCategory, setSelectedCategory] = useState<FoodCategory | 'All'>('All');
  const [selectedSort, setSelectedSort] = useState<SortOption>('smart_match');
  const [searchQuery, setSearchQuery] = useState('');

  const [userDistanceRadius, setUserDistanceRadius] = useState<number>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.LOCATION);
      return stored ? Number(stored) : 5.0;
    } catch {
      return 5.0;
    }
  });

  const handleChangeRadius = useCallback((radius: number) => {
    setUserDistanceRadius(radius);
    localStorage.setItem(STORAGE_KEYS.LOCATION, String(radius));
  }, []);

  const [selectedFoodItem, setSelectedFoodItem] = useState<FoodItem | null>(null);
  const [activeClaim, setActiveClaim] = useState<Claim | null>(null);
  const [showMyClaimsModal, setShowMyClaimsModal] = useState(false);
  const [showAddFoodModal, setShowAddFoodModal] = useState(false);
  const [showScanQRModal, setShowScanQRModal] = useState(false);
  const [legalTab, setLegalTab] = useState<'privacy' | 'terms' | 'domain' | null>(null);

  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (message: string, type: Toast['type'] = 'info') => {
    const id = nextToastId++;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const filteredItems = foodItems
    .filter((item) => {
      if (selectedCategory !== 'All' && item.category !== selectedCategory) return false;
      if (item.distanceKm > userDistanceRadius) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          item.title.toLowerCase().includes(q) ||
          item.donorName.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q)
        );
      }
      return true;
    })
    .filter((item) => item.quantityRemaining > 0)
    .sort((a, b) => {
      switch (selectedSort) {
        case 'smart_match':
          return calculateSmartRescueScore(b, now) - calculateSmartRescueScore(a, now);
        case 'urgency':
          return a.expiryTimestamp - b.expiryTimestamp;
        case 'distance':
          return a.distanceKm - b.distanceKm;
        default:
          return 0;
      }
    });

  // Seamless Claim & Instant Receipt Creation
  const handleClaimItem = useCallback((item: FoodItem, servings: number, trustName?: string) => {
    const claimId = generateClaimId();
    const effectiveTrust = trustName || currentUser?.organizationName || 'Anbu Karangal Children Trust & Orphanage';
    
    const qrPayload = JSON.stringify({
      claimId,
      foodItemId: item.id,
      servings,
      trustName: effectiveTrust,
      donor: item.donorName,
      timestamp: Date.now(),
    });

    const newClaim: Claim = {
      id: claimId,
      foodItemId: item.id,
      foodTitle: item.title,
      donorName: item.donorName,
      servingsClaimed: servings,
      claimedAt: Date.now(),
      expiryTimestamp: item.expiryTimestamp,
      pickupAddress: item.pickupAddress,
      pickupInstructions: item.pickupInstructions,
      pickupWindow: item.pickupWindow,
      status: 'pending',
      qrPayload,
      trustName: effectiveTrust,
      recipientName: currentUser?.name || 'Trust Coordinator',
    };

    setClaims((prev) => [newClaim, ...prev]);
    setFoodItems((prev) =>
      prev.map((fi) =>
        fi.id === item.id
          ? { ...fi, quantityRemaining: Math.max(0, fi.quantityRemaining - servings) }
          : fi
      )
    );

    setSelectedFoodItem(null);
    setActiveClaim(newClaim);
    addToast(`Successfully reserved ${servings} meals for ${effectiveTrust}!`, 'success');
  }, [currentUser]);

  // Handover / Pickup Verification
  const handleConfirmPickup = useCallback((claimId: string): { success: boolean; message: string; claim?: Claim } => {
    const claim = claims.find((c) => c.id.toUpperCase() === claimId.toUpperCase());
    if (!claim) {
      return { success: false, message: 'Claim Voucher ID not found. Please check the code.' };
    }
    if (claim.status === 'collected') {
      return { success: false, message: 'This pickup voucher has already been marked as collected.' };
    }
    if (claim.status === 'cancelled') {
      return { success: false, message: 'This reservation was cancelled.' };
    }

    const updatedClaim = { ...claim, status: 'collected' as const };
    setClaims((prev) =>
      prev.map((c) => (c.id === claim.id ? updatedClaim : c))
    );
    
    // Update active modal claim if viewing it
    if (activeClaim && activeClaim.id === claim.id) {
      setActiveClaim(updatedClaim);
    }

    addToast(`Handover confirmed for ${claim.foodTitle} (${claim.servingsClaimed} meals)!`, 'success');
    return { success: true, message: `Handover confirmed for ${claim.trustName || 'Trust'}. ${claim.servingsClaimed} meals verified.`, claim: updatedClaim };
  }, [claims, activeClaim]);

  const handleCancelClaim = useCallback((claimId: string) => {
    const claim = claims.find((c) => c.id === claimId);
    if (!claim || claim.status !== 'pending') return;

    setClaims((prev) =>
      prev.map((c) => (c.id === claimId ? { ...c, status: 'cancelled' as const } : c))
    );
    setFoodItems((prev) =>
      prev.map((fi) =>
        fi.id === claim.foodItemId
          ? { ...fi, quantityRemaining: fi.quantityRemaining + claim.servingsClaimed }
          : fi
      )
    );
    addToast('Reservation cancelled. Portions returned to live feed.', 'info');
  }, [claims]);

  const handlePublishFood = useCallback((newItemData: Omit<FoodItem, 'id' | 'createdAt'>) => {
    const newItem: FoodItem = {
      ...newItemData,
      id: `food-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      createdAt: Date.now(),
    };
    setFoodItems((prev) => [newItem, ...prev]);
    setShowAddFoodModal(false);
    addToast(`"${newItem.title}" published to live Tamil Nadu feed!`, 'success');
  }, []);

  const handleDeleteListing = useCallback((id: string) => {
    setFoodItems((prev) => prev.filter((fi) => fi.id !== id));
    addToast('Surplus batch removed.', 'info');
  }, []);

  const handleResetData = useCallback(() => {
    setFoodItems(INITIAL_FOOD_ITEMS);
    setClaims([]);
    localStorage.removeItem(STORAGE_KEYS.FOOD_ITEMS);
    localStorage.removeItem(STORAGE_KEYS.CLAIMS);
    addToast('Reset feed to Tamil Nadu Kalyana Mandapam & Annadhanam dishes.', 'success');
  }, []);

  const pendingClaims = claims.filter((c) => c.status === 'pending');
  const activeClaimsCount = pendingClaims.length;

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-start">
      {/* Mobile-Native Responsive Container */}
      <div className="w-full max-w-md mx-auto bg-slate-50 min-h-screen flex flex-col shadow-2xl relative pb-[env(safe-area-inset-bottom,20px)]">
        <Header
          currentRole={currentRole}
          onRoleChange={handleRoleChange}
          activeClaimsCount={activeClaimsCount}
          onOpenMyClaims={() => setShowMyClaimsModal(true)}
          onOpenLegal={(tab) => setLegalTab(tab)}
          userDistanceRadius={userDistanceRadius}
          onChangeRadius={handleChangeRadius}
          onResetData={handleResetData}
          currentUser={currentUser}
          onLoginClick={() => setShowLoginModal(true)}
          onLogout={handleLogout}
          selectedCity={selectedCity}
          onChangeCity={handleChangeCity}
        />

        {/* ─── Recipient View (Orphanages, Trusts & Neighbours) ──────────────── */}
        {currentRole === 'recipient' && (
          <main className="flex-1 pb-10">
            <FilterBar
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              selectedSort={selectedSort}
              onSelectSort={setSelectedSort}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              totalCount={filteredItems.length}
            />

            <div className="px-3 sm:px-4 space-y-3 mt-3">
              {filteredItems.length === 0 ? (
                <div className="text-center py-16 px-4 bg-white rounded-2xl border border-slate-200 mx-1">
                  <div className="text-4xl mb-2">🍛</div>
                  <p className="text-slate-800 text-sm font-bold">No surplus food batches match your filter.</p>
                  <p className="text-slate-500 text-xs mt-1 mb-3">Try widening your search radius or clearing category filters.</p>
                  <button
                    onClick={handleResetData}
                    className="px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl shadow-xs"
                  >
                    Load Tamil Nadu Surplus Dishes
                  </button>
                </div>
              ) : (
                filteredItems.map((item) => (
                  <FoodCard
                    key={item.id}
                    item={item}
                    now={now}
                    onSelect={(fi) => setSelectedFoodItem(fi)}
                  />
                ))
              )}
            </div>
          </main>
        )}

        {/* ─── Donor View (Kalyana Mandapams, Hotels & Annadhanam Trusts) ───── */}
        {currentRole === 'donor' && (
          <main className="flex-1 pb-10 p-3 sm:p-4">
            <DonorDashboard
              foodItems={foodItems}
              claims={claims}
              now={now}
              onOpenAddModal={() => setShowAddFoodModal(true)}
              onOpenScanModal={() => setShowScanQRModal(true)}
              onDeleteListing={handleDeleteListing}
              onSelectListing={(fi) => setSelectedFoodItem(fi)}
              onConfirmPickup={(id) => handleConfirmPickup(id)}
            />
          </main>
        )}
      </div>

      {/* ─── Modals ──────────────────────────────────────────────────── */}

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleLogin}
      />

      <FoodDetailModal
        item={selectedFoodItem}
        now={now}
        onClose={() => setSelectedFoodItem(null)}
        onClaim={handleClaimItem}
        defaultTrustName={currentUser?.organizationName || 'Anbu Karangal Children Trust & Orphanage'}
      />

      <ClaimConfirmationModal
        claim={activeClaim}
        now={now}
        onClose={() => setActiveClaim(null)}
        onSimulatePickup={(claimId) => handleConfirmPickup(claimId)}
      />

      <MyClaimsModal
        claims={claims}
        now={now}
        isOpen={showMyClaimsModal}
        onClose={() => setShowMyClaimsModal(false)}
        onOpenClaim={(claim) => {
          setShowMyClaimsModal(false);
          setActiveClaim(claim);
        }}
        onCancelClaim={handleCancelClaim}
      />

      <AddFoodModal
        isOpen={showAddFoodModal}
        onClose={() => setShowAddFoodModal(false)}
        onPublish={handlePublishFood}
      />

      <ScanQRModal
        isOpen={showScanQRModal}
        onClose={() => setShowScanQRModal(false)}
        pendingClaims={pendingClaims}
        onConfirmPickup={handleConfirmPickup}
      />

      <LegalModals
        activeTab={legalTab}
        onClose={() => setLegalTab(null)}
      />

      {/* ─── Toast Notifications ─────────────────────────────────────── */}
      <div className="fixed bottom-6 right-4 left-4 sm:left-auto z-[60] flex flex-col gap-2 pointer-events-none items-center sm:items-end">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto px-4 py-3 rounded-xl shadow-xl text-xs sm:text-sm font-semibold text-white max-w-sm w-full sm:w-auto text-center sm:text-left transition-all ${
              toast.type === 'success'
                ? 'bg-emerald-600'
                : toast.type === 'error'
                ? 'bg-rose-600'
                : 'bg-slate-800'
            }`}
          >
            {toast.message}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
