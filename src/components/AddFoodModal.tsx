import React, { useState, useRef } from 'react';
import type { FoodCategory, DonorType, FoodItem } from '../types';
import { PHOTO_PRESETS } from '../data/mockData';
import { 
  X, 
  PlusCircle, 
  Check, 
  Thermometer,
  Sparkles,
  Camera,
  Upload,
  Image as ImageIcon,
  Trash2
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
  const [isCustomPhoto, setIsCustomPhoto] = useState(false);
  const [customPhotoName, setCustomPhotoName] = useState('');
  const [dietaryInput, setDietaryInput] = useState('Halal, Authentic Seeraga Samba, Nut-Free');
  const [distanceKm] = useState(0.9);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle image file upload with client-side canvas compression
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setCustomPhotoName(file.name);

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 900;
        const MAX_HEIGHT = 900;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height = Math.round((height * MAX_WIDTH) / width);
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width = Math.round((width * MAX_HEIGHT) / height);
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.82);
          setSelectedPhoto(compressedDataUrl);
          setIsCustomPhoto(true);
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  // Quick Preset Selector for Tamil Nadu Donors
  const applyPreset = (presetType: 'biryani' | 'meals' | 'tiffin' | 'bakery') => {
    setIsCustomPhoto(false);
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

          {/* Photo Selector & Upload Option */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-emerald-600" />
                <span>Food Photo (Upload or Select Preset) *</span>
              </label>
              {isCustomPhoto && (
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  ✓ Custom Photo Loaded
                </span>
              )}
            </div>

            {/* Hidden File Input for Device/Camera Upload */}
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />

            {/* Upload Action Card & Active Preview */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-2.5">
              {/* Upload / Camera Button */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className={`p-3 rounded-xl border-2 border-dashed flex flex-col items-center justify-center text-center transition-all ${
                  isCustomPhoto
                    ? 'border-emerald-500 bg-emerald-50/60 text-emerald-900'
                    : 'border-slate-300 hover:border-emerald-500 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mb-1 shadow-xs">
                  <Camera className="w-4 h-4" />
                </div>
                <span className="font-bold text-xs flex items-center gap-1">
                  <Upload className="w-3 h-3" />
                  <span>{isCustomPhoto ? 'Change Photo' : 'Upload Food Photo'}</span>
                </span>
                <span className="text-[10px] text-slate-500 mt-0.5">
                  Camera / Gallery / Files
                </span>
              </button>

              {/* Selected Photo Live Preview */}
              <div className="sm:col-span-2 relative rounded-xl overflow-hidden border border-slate-200 bg-slate-100 h-24 flex items-center justify-center group">
                <img
                  src={selectedPhoto}
                  alt="Selected Food Preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end justify-between p-2">
                  <span className="text-[11px] font-bold text-white drop-shadow-sm truncate max-w-[70%]">
                    {isCustomPhoto ? (customPhotoName || 'Uploaded Device Photo') : 'Selected Preset Photo'}
                  </span>
                  {isCustomPhoto ? (
                    <button
                      type="button"
                      onClick={() => {
                        setIsCustomPhoto(false);
                        setSelectedPhoto(PHOTO_PRESETS[0].url);
                        setCustomPhotoName('');
                      }}
                      className="px-2 py-0.5 rounded bg-rose-600 hover:bg-rose-700 text-white text-[10px] font-bold flex items-center gap-1 shadow-xs"
                    >
                      <Trash2 className="w-2.5 h-2.5" />
                      <span>Reset</span>
                    </button>
                  ) : (
                    <span className="text-[10px] text-emerald-300 font-bold bg-slate-900/80 px-1.5 py-0.5 rounded">
                      Preset Active
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Tamil Nadu Food Presets Grid */}
            <div>
              <p className="text-[11px] font-bold text-slate-600 mb-1">
                Or select authentic Tamil Nadu dish preset:
              </p>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
                {PHOTO_PRESETS.map((preset) => {
                  const isSelected = !isCustomPhoto && selectedPhoto === preset.url;
                  return (
                    <button
                      key={preset.url}
                      type="button"
                      onClick={() => {
                        setIsCustomPhoto(false);
                        setSelectedPhoto(preset.url);
                        setCustomPhotoName('');
                      }}
                      className={`relative rounded-lg overflow-hidden h-14 border-2 transition-all group ${
                        isSelected
                          ? 'border-emerald-600 ring-2 ring-emerald-500/40 shadow-sm'
                          : 'border-slate-200 opacity-65 hover:opacity-100 hover:border-slate-400'
                      }`}
                      title={preset.label}
                    >
                      <img
                        src={preset.url}
                        alt={preset.label}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      />
                      {isSelected && (
                        <div className="absolute top-1 right-1 bg-emerald-600 text-white rounded-full p-0.5 shadow-sm">
                          <Check className="w-2.5 h-2.5" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
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
