/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { TelemetryProvider, useTelemetry } from './context/TelemetryContext';
import { Header } from './components/Header';
import { CockpitScreen } from './components/screens/CockpitScreen';
import { AeroScreen } from './components/screens/AeroScreen';
import { PowerUnitScreen } from './components/screens/PowerUnitScreen';
import { StrategyScreen } from './components/screens/StrategyScreen';
import { PresetsScreen } from './components/screens/PresetsScreen';

const ScreenRenderer: React.FC = () => {
  const { activeScreen } = useTelemetry();

  const renderCurrentScreen = () => {
    switch (activeScreen) {
      case 'cockpit':
        return <CockpitScreen />;
      case 'aero':
        return <AeroScreen />;
      case 'powertrain':
        return <PowerUnitScreen />;
      case 'strategy':
        return <StrategyScreen />;
      case 'presets':
        return <PresetsScreen />;
      default:
        return <CockpitScreen />;
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeScreen}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        className="w-full"
      >
        {renderCurrentScreen()}
      </motion.div>
    </AnimatePresence>
  );
};

const MainLayout: React.FC = () => {
  const { activeScreen, isSimulating } = useTelemetry();

  const getScreenTitle = () => {
    switch (activeScreen) {
      case 'cockpit': return 'Cockpit & Driver Controls';
      case 'aero': return 'Car & Tires Health Check';
      case 'powertrain': return 'Engine & Hybrid Battery Power';
      case 'strategy': return 'Race Strategy & Pit Wall Orders';
      case 'presets': return 'Choose Your Race Track';
      default: return 'Silver Arrow Dashboard';
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      
      {/* Top Bar Header (.navbar) */}
      <Header />

      {/* Main Content Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        
        {/* Simple Page Breadcrumb / Status Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="badge">
              <span className="w-2 h-2 rounded-full bg-[#818cf8] animate-pulse" />
              LIVE TELEMETRY
            </span>
            <h2 className="text-base sm:text-lg font-bold tracking-tight text-white m-0">
              {getScreenTitle()}
            </h2>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="text-[#94a3b8]">Mercedes-AMG W16 E-Performance</span>
            <span className="text-white/20">·</span>
            <span className={isSimulating ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}>
              {isSimulating ? '● 50Hz Realtime Feed' : '⏸ Stream Paused'}
            </span>
          </div>
        </div>

        {/* Dynamic Animated Screen */}
        <ScreenRenderer />
      </main>

      {/* Clean, Simple Footer */}
      <footer className="w-full border-t border-white/10 bg-[#12141c]/80 backdrop-blur-sm py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#94a3b8]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-indigo-400 rounded-full" />
            <span>Silver Arrow F1 Race Dashboard</span>
          </div>
          <div>
            <span>Simple, Clean & Responsive UI</span>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default function App() {
  return (
    <TelemetryProvider>
      <MainLayout />
    </TelemetryProvider>
  );
}
