import React, { useState } from 'react';
import type { FoodCategory, DonorType, FoodItem } from '../types';
import { PHOTO_PRESETS } from '../data/mockData';
import { 
  X, 
  PlusCircle, 
  Check, 
  Thermometer,
  Sparkles
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

  const [title, setTitle] = useState('Kalyana Biryani Feast with Ennai Kathirikai & Raitha');
  const [category, setCategory] = useState<FoodCategory>('Cooked Meals');
  const [donorName, setDonorName] = useState('Sri Krishna Gana Sabha Kalyana Mandapam');
  const [donorType, setDonorType] = useState<DonorType>('Kalyana Mandapam (Marriage Hall)');
  const [quantity, setQuantity] = useState(50);
  const [unit, setUnit] = useState('meals');
  const [hoursUntilExpiry, setHoursUntilExpiry] = useState(2.0);
  const [pickupStart] = useState('3:00 PM');
  const [pickupEnd] = useState('5:00 PM');
  const [pickupAddress, setPickupAddress] = useState('20, Maharajapuram Santhanam Salai, T. Nagar, Chennai - 600017');
  const [pickupInstructions, setPickupInstructions] = useState('Report to Dining Hall Kitchen Rear Gate. Ask for Master Caterer Senthil. Bring thermal carrier drums.');
  const [temperatureStatus, setTemperatureStatus] = useState('Maintained in hot-holding stainless steel vessels at 65°C');
  const [selectedPhoto, setSelectedPhoto] = useState(PHOTO_PRESETS[0].url);
  const [dietaryInput, setDietaryInput] = useState('Halal, Authentic Seeraga Samba, Nut-Free');
  const [distanceKm] = useState(0.9);

  // Quick Preset Selector for Tamil Nadu Donors
  const applyPreset = (presetType: 'biryani' | 'meals' | 'tiffin' | 'bakery') => {
    if (presetType === 'biryani') {
      setTitle('Kalyana Biryani Feast with Ennai Kathirikai & Onion Raitha');
      setCategory('Cooked Meals');
      setQuantity(60);
      setUnit('meals');
      setHoursUntilExpiry(1.5);
      setSelectedPhoto(PHOTO_PRESETS[0].url);
      setDietaryInput('Halal Chicken, Seeraga Samba, Hot & Fresh');
      setTemperatureStatus('Hot in sealed stainless steel degh/vessels (>65°C)');
    } else if (presetType === 'meals') {
      setTitle('South Indian Full Meals: Sambar Rice, Poriyal, Kootu & Payasam');
      setCategory('Cooked Meals');
      setQuantity(50);
      setUnit('meal sets');
      setHoursUntilExpiry(2.0);
      setSelectedPhoto(PHOTO_PRESETS[1].url);
      setDietaryInput('Pure Vegetarian, Satvik, Banana Leaf Accompaniments');
      setTemperatureStatus('Freshly cooked; kept in thermal hot insulated containers');
    } else if (presetType === 'tiffin') {
      setTitle('Evening Engagement Tiffin: Ghee Ven Pongal, Medu Vadai & Sambar');
      setCategory('Cooked Meals');
      setQuantity(40);
      setUnit('tiffin sets');
      setHoursUntilExpiry(1.2);
      setSelectedPhoto(PHOTO_PRESETS[3].url);
      setDietaryInput('Vegetarian, Crispy Vadai, Pure Ghee Pongal');
      setTemperatureStatus('Warm in food service warmers');
    } else if (presetType === 'bakery') {
      setTitle('Fresh Bakery Evening Surplus: Veg Puffs, Mysore Pak & Milk Bread');
      setCategory('Baked Goods');
      setQuantity(35);
      setUnit('boxes');
      setHoursUntilExpiry(3.0);
      setSelectedPhoto(PHOTO_PRESETS[5].url);
      setDietaryInput('Vegetarian, Ghee Sweets, Baked Fresh');
      setTemperatureStatus('Ambient bakery temperature, packed today');
    }
  };

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

    onPublish({
      title: title.trim(),
      category,
      donorName: donorName.trim() || 'Verified Tamil Nadu Mandapam / Donor',
      donorType,
      isVerifiedDonor: true,
      quantityRemaining: Number(quantity) || 30,
      initialQuantity: Number(quantity) || 30,
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
        name: 'K. Ramanathan (Mandapam Lead)',
        phone: '+91 94440 12890',
        department: 'Wedding Catering & Hall Operations',
      },
      dietaryTags: dietaryTags.length > 0 ? dietaryTags : ['Hot & Fresh Meals'],
      temperatureStatus: temperatureStatus.trim(),
      imageUrl: selectedPhoto,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
      <div 
        className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[94vh] flex flex-col my-auto text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-slate-900 text-white px-4 sm:px-5 py-3.5 flex items-center justify-between shrink-0 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
              <PlusCircle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold">Post Surplus Food Batch</h3>
              <p className="text-[11px] text-slate-400">
                Instantly broadcast surplus to local orphanages and trusts
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

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-5 overflow-y-auto space-y-3.5 text-xs">
          {/* Tamil Nadu Quick Preset Chips */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Quick Tamil Food Presets (Click to autofill)</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
              <button
                type="button"
                onClick={() => applyPreset('biryani')}
                className="p-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-900 text-left transition-colors font-semibold"
              >
                🍛 Kalyana Biryani
              </button>
              <button
                type="button"
                onClick={() => applyPreset('meals')}
                className="p-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-900 text-left transition-colors font-semibold"
              >
                🍱 Full Meals & Sambar
              </button>
              <button
                type="button"
                onClick={() => applyPreset('tiffin')}
                className="p-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-900 text-left transition-colors font-semibold"
              >
                🫓 Pongal & Vadai
              </button>
              <button
                type="button"
                onClick={() => applyPreset('bakery')}
                className="p-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-900 text-left transition-colors font-semibold"
              >
                🥐 Puffs & Sweets
              </button>
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Food Title / Description *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Kalyana Biryani Feast, Sambar Rice, Pongal Vadai"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
              required
            />
          </div>

          {/* Donor Entity Name & Type */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Mandapam / Donor Name
              </label>
              <input
                type="text"
                value={donorName}
                onChange={(e) => setDonorName(e.target.value)}
                placeholder="e.g. Sri Krishna Kalyana Mandapam, T. Nagar"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Donor Category
              </label>
              <select
                value={donorType}
                onChange={(e) => setDonorType(e.target.value as DonorType)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="Kalyana Mandapam (Marriage Hall)">Kalyana Mandapam (Marriage Hall)</option>
                <option value="Temple Annadhanam Trust">Temple Annadhanam Trust</option>
                <option value="Hotel & Banquet Hall">Hotel & Banquet Hall</option>
                <option value="Corporate IT Canteen">Corporate IT Canteen</option>
                <option value="Bakery & Sweet Stall">Bakery & Sweet Stall</option>
                <option value="Catering Service">Catering Service</option>
              </select>
            </div>
          </div>

          {/* Servings, Expiry & Category */}
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Quantity (Servings)
              </label>
              <input
                type="number"
                min="1"
                max="500"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Unit
              </label>
              <input
                type="text"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                placeholder="meals / packets"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Expiry (Hours Left)
              </label>
              <select
                value={hoursUntilExpiry}
                onChange={(e) => setHoursUntilExpiry(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value={0.75}>45 mins (Flash Rescue)</option>
                <option value={1.5}>1.5 hours</option>
                <option value={2.5}>2.5 hours</option>
                <option value={4.0}>4 hours</option>
              </select>
            </div>
          </div>

          {/* Photo Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Select Food Photo
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {PHOTO_PRESETS.slice(0, 4).map((preset) => (
                <button
                  key={preset.url}
                  type="button"
                  onClick={() => setSelectedPhoto(preset.url)}
                  className={`relative rounded-lg overflow-hidden h-16 border-2 transition-all ${
                    selectedPhoto === preset.url
                      ? 'border-emerald-500 ring-2 ring-emerald-500/30'
                      : 'border-slate-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={preset.url} alt={preset.label} className="w-full h-full object-cover" />
                  {selectedPhoto === preset.url && (
                    <div className="absolute top-1 right-1 bg-emerald-600 text-white rounded-full p-0.5 shadow-sm">
                      <Check className="w-3 h-3" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Pickup Address & Directions */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Pickup Address & Kitchen Gate Instructions
            </label>
            <input
              type="text"
              value={pickupAddress}
              onChange={(e) => setPickupAddress(e.target.value)}
              placeholder="e.g. 20, Maharajapuram Santhanam Salai, T. Nagar, Chennai"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 mb-1.5 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <textarea
              rows={2}
              value={pickupInstructions}
              onChange={(e) => setPickupInstructions(e.target.value)}
              placeholder="Instructions for trust volunteers (e.g. Contact cook Ramanathan at back gate)"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Food Safety Note */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
              <Thermometer className="w-3.5 h-3.5 text-emerald-600" />
              <span>Food Temperature & Safety Note</span>
            </label>
            <input
              type="text"
              value={temperatureStatus}
              onChange={(e) => setTemperatureStatus(e.target.value)}
              placeholder="e.g. Hot holding stainless steel container at 65°C"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-colors flex items-center justify-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              <span>PUBLISH SURPLUS FOOD TO LIVE FEED</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
