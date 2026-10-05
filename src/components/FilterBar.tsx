import React from 'react';
import type { FoodCategory, SortOption } from '../types';
import { Sparkles, Clock, Navigation, Search, Filter, X } from 'lucide-react';

interface FilterBarProps {
  selectedCategory: FoodCategory | 'All';
  onSelectCategory: (category: FoodCategory | 'All') => void;
  selectedSort: SortOption;
  onSelectSort: (sort: SortOption) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  totalCount: number;
}

const CATEGORIES: (FoodCategory | 'All')[] = [
  'All',
  'Cooked Meals',
  'Baked Goods',
  'Packaged Foods',
];

export const FilterBar: React.FC<FilterBarProps> = ({
  selectedCategory,
  onSelectCategory,
  selectedSort,
  onSelectSort,
  searchQuery,
  onSearchChange,
  totalCount,
}) => {
  return (
    <div className="bg-white border-b border-slate-200 px-4 py-3 sticky top-[128px] sm:top-[122px] z-20 shadow-xs">
      {/* Search Input */}
      <div className="relative mb-2.5">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by food name, donor, dietary tag (e.g. Vegetarian, Halal)..."
          className="w-full pl-9 pr-9 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
            title="Clear search"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Sorting bar & Category chips */}
      <div className="flex flex-col gap-2">
        {/* Sort Options */}
        <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1 text-xs">
          <div className="flex items-center gap-1 text-slate-500 font-medium shrink-0">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span>Sort:</span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => onSelectSort('smart_match')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-medium transition-all ${
                selectedSort === 'smart_match'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
              title="Prioritize imminent expiry, closest radius, and surplus volume"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Smart Rescue Match</span>
            </button>

            <button
              onClick={() => onSelectSort('urgency')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-medium transition-all ${
                selectedSort === 'urgency'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Urgency (Time Left)</span>
            </button>

            <button
              onClick={() => onSelectSort('distance')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-medium transition-all ${
                selectedSort === 'distance'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Distance</span>
            </button>
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 no-scrollbar">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => onSelectCategory(cat)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200/80'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          <div className="text-[11px] text-slate-500 font-medium shrink-0 pl-1">
            {totalCount} available
          </div>
        </div>
      </div>
    </div>
  );
};
