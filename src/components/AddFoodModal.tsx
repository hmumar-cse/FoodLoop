import React, { useState } from 'react';
import type { FoodCategory, DonorType, FoodItem } from '../types';
import { PHOTO_PRESETS } from '../data/mockData';
import { 
  X, 
  PlusCircle, 
  Clock, 
  ShieldCheck, 
  Check, 
  Sparkles,
  Thermometer,
  MapPin
} from 'lucide-react';

interface AddFoodModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPublish: (newItem: Omit<FoodItem, 'id' | 'createdAt'>) => void;
}

export const AddFoodModal: React.FC<AddFoodModalProps> = ({
  isOpen,
  onClose,
  onPublish,
}) => {
  if (!isOpen) return null;

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<FoodCategory>('Cooked Meals');
  const [donorName, setDonorName] = useState('Grand Hyatt Regency & Banquets');
  const [donorType, setDonorType] = useState<DonorType>('Hotel Banquet');
  const [isVerifiedDonor, setIsVerifiedDonor] = useState(true);
  const [quantity, setQuantity] = useState(30);
  const [unit, setUnit] = useState('meals');
  const [hoursUntilExpiry, setHoursUntilExpiry] = useState(1.5);
  const [pickupStart, setPickupStart] = useState('8:00 PM');
  const [pickupEnd, setPickupEnd] = useState('9:30 PM');
  const [pickupAddress, setPickupAddress] = useState('500 Grand Bay Boulevard, Kitchen Service Gate 2');
  const [pickupInstructions, setPickupInstructions] = useState('Report to Kitchen Steward Door. Ask for Sous Chef Carlos. Bring clean insulated carry bags.');
  const [temperatureStatus, setTemperatureStatus] = useState('Kept in hot-holding units at 65°C / 149°F');
  const [selectedPhoto, setSelectedPhoto] = useState(PHOTO_PRESETS[0].url);
  const [customPhotoUrl, setCustomPhotoUrl] = useState('');
  const [dietaryInput, setDietaryInput] = useState('Halal, Vegetarian Options');
  const [distanceKm, setDistanceKm] = useState(1.1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Please enter a food title');
      return;
    }

    const expiryTimestamp = Date.now() + Math.round(hoursUntilExpiry * 3600 * 1000);
    const dietaryTags = dietaryInput
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const finalPhoto = customPhotoUrl.trim() || selectedPhoto;

    onPublish({
      title: title.trim(),
      category,
      donorName: donorName.trim() || 'Verified Donor Partner',
      donorType,
      isVerifiedDonor,
      quantityRemaining: quantity,
      initialQuantity: quantity,
      unit,
      distanceKm: Number(distanceKm) || 1.0,
      expiryTimestamp,
      pickupWindow: {
        start: pickupStart,
        end: pickupEnd,
      },
      pickupAddress: pickupAddress.trim(),
      pickupInstructions: pickupInstructions.trim(),
      donorContact: {
        name: 'Carlos Ruiz',
        phone: '+1 (555) 789-0123',
        department: 'Banquets & Culinary Dispatch',
      },
      dietaryTags: dietaryTags.length > 0 ? dietaryTags : ['Ready to Eat'],
      temperatureStatus: temperatureStatus.trim(),
      imageUrl: finalPhoto,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-slate-900 text-white px-5 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
              <PlusCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold">List Surplus Food</h3>
              <p className="text-xs text-slate-400">
                Rescue excess catering, hotel trays, or bakery production
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

        {/* Scrollable Form */}
        <form onSubmit={handleSubmit} className="p-5 overflow-y-auto space-y-4 text-xs">
          {/* Food Title */}
          <div>
            <label className="block font-bold text-slate-800 mb-1">
              Surplus Food Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Wedding Reception Buffet: 40 Gourmet Chicken & Herb Rice Portions"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white text-xs sm:text-sm"
            />
          </div>

          {/* Category & Entity Type */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-800 mb-1">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as FoodCategory)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
              >
                <option value="Cooked Meals">Cooked Meals (Warm/Buffet/Bento)</option>
                <option value="Baked Goods">Baked Goods (Breads/Pastries)</option>
                <option value="Packaged Foods">Packaged Foods (Deli/Boxes/Sealed)</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">
                Donor Entity Type *
              </label>
              <select
                value={donorType}
                onChange={(e) => setDonorType(e.target.value as DonorType)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
              >
                <option value="Wedding Event">Wedding Event Hall</option>
                <option value="Hotel Banquet">Hotel Banquet & Convention</option>
                <option value="Corporate Canteen">Corporate Canteen</option>
                <option value="Artisan Bakery">Artisan Bakery</option>
                <option value="Community Kitchen">Community Kitchen</option>
              </select>
            </div>
          </div>

          {/* Donor Name & Verified Badge Toggle */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
            <div className="sm:col-span-2">
              <label className="block font-bold text-slate-800 mb-1">
                Donor Organization Name *
              </label>
              <input
                type="text"
                required
                value={donorName}
                onChange={(e) => setDonorName(e.target.value)}
                placeholder="e.g. Grand Hyatt Regency Banquets"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
              />
            </div>

            <div className="flex items-center gap-2 p-2 bg-emerald-50/70 border border-emerald-200 rounded-xl h-[38px]">
              <input
                type="checkbox"
                id="verifiedEntity"
                checked={isVerifiedDonor}
                onChange={(e) => setIsVerifiedDonor(e.target.checked)}
                className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500 border-slate-300"
              />
              <label htmlFor="verifiedEntity" className="font-semibold text-emerald-900 cursor-pointer flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Verified Entity</span>
              </label>
            </div>
          </div>

          {/* Servings & Deadline Setter */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
            <div>
              <label className="block font-bold text-slate-800 mb-1">
                Available Servings / Quantity *
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="1"
                  max="1000"
                  required
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-24 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-900 font-bold"
                />
                <select
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  className="px-2 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-900 font-medium"
                >
                  <option value="meals">meals</option>
                  <option value="portions">portions</option>
                  <option value="boxes">boxes</option>
                  <option value="items">items</option>
                </select>
                <div className="flex gap-1 ml-auto">
                  {[15, 30, 50].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setQuantity(preset)}
                      className="px-1.5 py-1 bg-white hover:bg-slate-100 border border-slate-200 rounded text-[11px] font-semibold text-slate-700"
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-amber-600" />
                <span>Expiry / Rescue Deadline *</span>
              </label>
              <div className="flex items-center gap-2">
                <select
                  value={hoursUntilExpiry}
                  onChange={(e) => setHoursUntilExpiry(parseFloat(e.target.value))}
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-900 font-medium"
                >
                  <option value={0.75}>45 mins (Urgent - Red)</option>
                  <option value={1.5}>1 hour 30 mins (High - Yellow)</option>
                  <option value={2.5}>2 hours 30 mins (Normal - Green)</option>
                  <option value={4.0}>4 hours (Extended)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Pickup Window & Proximity */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block font-bold text-slate-800 mb-1">
                Pickup Start
              </label>
              <input
                type="text"
                value={pickupStart}
                onChange={(e) => setPickupStart(e.target.value)}
                placeholder="e.g. 8:00 PM"
                className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-800 mb-1">
                Pickup End
              </label>
              <input
                type="text"
                value={pickupEnd}
                onChange={(e) => setPickupEnd(e.target.value)}
                placeholder="e.g. 9:30 PM"
                className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-800 mb-1 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-emerald-600" />
                <span>Radius (km)</span>
              </label>
              <input
                type="number"
                step="0.1"
                min="0.1"
                max="20"
                value={distanceKm}
                onChange={(e) => setDistanceKm(parseFloat(e.target.value) || 1.0)}
                className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
              />
            </div>
          </div>

          {/* Location & Instructions */}
          <div>
            <label className="block font-bold text-slate-800 mb-1">
              Pickup Address & Specific Entrance *
            </label>
            <input
              type="text"
              required
              value={pickupAddress}
              onChange={(e) => setPickupAddress(e.target.value)}
              placeholder="e.g. 500 Grand Bay Boulevard, Kitchen Service Gate 2"
              className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 mb-2"
            />

            <label className="block font-bold text-slate-800 mb-1">
              Staff Instructions for Recipient
            </label>
            <textarea
              rows={2}
              value={pickupInstructions}
              onChange={(e) => setPickupInstructions(e.target.value)}
              placeholder="e.g. Ring bell at staff door. Ask for Chef Carlos. Bring clean insulated bags."
              className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 resize-none"
            />
          </div>

          {/* Food Safety & Dietary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-800 mb-1 flex items-center gap-1">
                <Thermometer className="w-3.5 h-3.5 text-emerald-600" />
                <span>Temperature Control *</span>
              </label>
              <input
                type="text"
                value={temperatureStatus}
                onChange={(e) => setTemperatureStatus(e.target.value)}
                placeholder="e.g. Kept in hot-holding units at 65°C / 149°F"
                className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">
                Dietary Tags (comma-separated)
              </label>
              <input
                type="text"
                value={dietaryInput}
                onChange={(e) => setDietaryInput(e.target.value)}
                placeholder="e.g. Halal, Vegetarian, Nut-Free"
                className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
              />
            </div>
          </div>

          {/* Photo Selector */}
          <div>
            <label className="block font-bold text-slate-800 mb-1.5">
              Select Curated Real Food Photo
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mb-2">
              {PHOTO_PRESETS.slice(0, 4).map((preset, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setSelectedPhoto(preset.url);
                    setCustomPhotoUrl('');
                  }}
                  className={`relative h-18 rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${
                    selectedPhoto === preset.url && !customPhotoUrl
                      ? 'border-emerald-600 ring-2 ring-emerald-500/30'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <img src={preset.url} alt={preset.label} className="w-full h-full object-cover" />
                  {selectedPhoto === preset.url && !customPhotoUrl && (
                    <div className="absolute top-1 right-1 bg-emerald-600 text-white rounded-full p-0.5">
                      <Check className="w-3 h-3" />
                    </div>
                  )}
                  <span className="absolute bottom-0 inset-x-0 bg-slate-950/70 text-white text-[9px] px-1 py-0.5 truncate text-center">
                    {preset.category}
                  </span>
                </div>
              ))}
            </div>

            {/* Custom Photo URL Fallback */}
            <input
              type="url"
              value={customPhotoUrl}
              onChange={(e) => setCustomPhotoUrl(e.target.value)}
              placeholder="Or paste custom image URL (e.g. https://...)"
              className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs"
            />
          </div>

          {/* Form Actions */}
          <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 font-semibold hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-1.5 text-xs sm:text-sm"
            >
              <Sparkles className="w-4 h-4" />
              <span>Publish Listing to Live Feed</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
