/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useTelemetry, ScreenId } from '../context/TelemetryContext';
import { 
  Gauge, 
  Wind, 
  Zap, 
  Flag, 
  Sliders, 
  Sun, 
  Moon, 
  Play, 
  Pause,
  Menu,
  X
} from 'lucide-react';

interface NavItem {
  id: ScreenId;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  { id: 'cockpit', label: 'Cockpit', icon: Gauge },
  { id: 'aero', label: 'Car & Tires', icon: Wind },
  { id: 'powertrain', label: 'Engine & Battery', icon: Zap },
  { id: 'strategy', label: 'Race & Pit Stop', icon: Flag },
  { id: 'presets', label: 'Choose Track', icon: Sliders },
];

export const Header: React.FC = () => {
  const { 
    activeScreen, 
    setActiveScreen, 
    darkMode, 
    toggleDarkMode, 
    isSimulating, 
    toggleSimulation,
    units,
    toggleUnits
  } = useTelemetry();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full navbar backdrop-blur-md">
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-4">
        
        {/* Brand Lockup */}
        <div className="flex items-center gap-3 shrink-0">
          <button 
            onClick={() => setActiveScreen('cockpit')}
            className="group flex items-center gap-2.5 text-left focus:outline-none cursor-pointer"
          >
            <div className="w-3 h-7 bg-indigo-400 group-hover:bg-[#00F5D4] transition-colors rounded-sm shadow-[0_0_12px_rgba(129,140,248,0.5)]" />
            <div>
              <span className="text-lg sm:text-xl font-bold tracking-tight text-white dark:text-white uppercase flex items-center gap-1.5">
                Silver Arrow <span className="text-indigo-400">F1</span>
              </span>
            </div>
          </button>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-2">
          {navItems.map(item => {
            const isActive = activeScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveScreen(item.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs lg:text-sm font-semibold transition-all duration-200 whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? 'bg-[#1e1b4b] text-[#818cf8] border border-[rgba(129,140,248,0.3)] shadow-[0_0_15px_rgba(129,140,248,0.2)]'
                    : 'text-[#94a3b8] hover:text-white hover:bg-white/5'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Utility Controls */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Live / Paused Simulation Button */}
          <button
            onClick={toggleSimulation}
            title={isSimulating ? "Pause race simulation" : "Resume race simulation"}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wider transition-all border cursor-pointer ${
              isSimulating
                ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-400'
                : 'bg-amber-950/40 border-amber-500/40 text-amber-400'
            }`}
          >
            {isSimulating ? (
              <>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>RACING</span>
                <Pause className="w-3 h-3 ml-0.5" />
              </>
            ) : (
              <>
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span>PAUSED</span>
                <Play className="w-3 h-3 ml-0.5" />
              </>
            )}
          </button>

          {/* Unit Toggle */}
          <button
            onClick={toggleUnits}
            title="Switch Speed Unit"
            className="px-2.5 py-1.5 rounded-lg border border-white/10 bg-[#090a0f] hover:border-indigo-400 text-white text-xs font-bold transition-all cursor-pointer"
          >
            {units.toUpperCase()}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleDarkMode}
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label="Toggle theme"
            className="p-1.5 rounded-lg border border-white/10 bg-[#090a0f] text-slate-300 hover:text-white hover:border-indigo-400 transition-all cursor-pointer"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-indigo-400" />}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(prev => !prev)}
            aria-label="Toggle navigation"
            className="md:hidden p-1.5 rounded-lg border border-white/10 bg-[#090a0f] text-slate-300"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden w-full max-w-7xl mx-auto pt-3 mt-3 border-t border-white/10 grid grid-cols-2 gap-2">
          {navItems.map(item => {
            const isActive = activeScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveScreen(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-lg text-left transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-[#1e1b4b] text-[#818cf8] font-bold border border-[rgba(129,140,248,0.3)]'
                    : 'text-[#94a3b8] hover:bg-white/5'
                }`}
              >
                <item.icon className="w-4 h-4 shrink-0" />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
