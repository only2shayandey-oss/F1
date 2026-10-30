/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useTelemetry, TireCompound } from '../../context/TelemetryContext';
import { ShieldCheck, Wind, Sparkles } from 'lucide-react';

export const AeroScreen: React.FC = () => {
  const { 
    telemetry, 
    setFrontWingAngle, 
    setTireCompound 
  } = useTelemetry();

  return (
    <div className="space-y-6">
      
      {/* Friendly Overview Banner (.card) */}
      <div className="card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="badge">
            <Wind className="w-3.5 h-3.5" />
            CHASSIS & TIRES
          </span>
          <h3 className="text-xl font-bold text-white mt-1">
            4-Tire Health & Wing Downforce
          </h3>
          <p className="mt-1">
            Inspect tire health and adjust your front wing angle to balance top speed vs corner grip!
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 bg-[#090a0f] px-4 py-2.5 rounded-xl border border-white/10">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <div className="text-xs">
            <span className="text-[#94a3b8] block text-[10px] uppercase">Vehicle Condition</span>
            <span className="font-bold text-white">100% Race Ready</span>
          </div>
        </div>
      </div>

      {/* 4 Tires Interactive Display (.card) */}
      <div className="card">
        <div className="text-center max-w-md mx-auto mb-6">
          <span className="badge">
            🛞 PIRELLI TIRES
          </span>
          <h4 className="text-lg font-bold text-white mt-1">
            4-Wheel Health Monitor
          </h4>
          <p className="mt-1">
            All 4 tires are warm and maintaining strong grip on the circuit asphalt.
          </p>
        </div>

        {/* 4 Tires Layout matching actual car positions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
          
          {/* Front Left Tire */}
          <div className="p-4 bg-[#090a0f] border border-white/10 hover:border-indigo-400/50 transition-all rounded-xl flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-[#94a3b8] uppercase block">
                Front-Left (FL)
              </span>
              <span className="text-xl font-bold text-white">
                {telemetry.tires.FL.wear}% Health
              </span>
              <span className="text-xs text-emerald-400 block mt-0.5">
                🟢 {telemetry.tires.FL.surfaceTemp}°C · Warm & Grippy
              </span>
            </div>
            <div className="w-12 h-16 bg-[#1e1b4b] border border-indigo-400/40 rounded-lg flex items-center justify-center text-indigo-300 text-xs font-bold shadow-[0_0_10px_rgba(129,140,248,0.2)]">
              FL
            </div>
          </div>

          {/* Front Right Tire */}
          <div className="p-4 bg-[#090a0f] border border-white/10 hover:border-indigo-400/50 transition-all rounded-xl flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-[#94a3b8] uppercase block">
                Front-Right (FR)
              </span>
              <span className="text-xl font-bold text-white">
                {telemetry.tires.FR.wear}% Health
              </span>
              <span className="text-xs text-emerald-400 block mt-0.5">
                🟢 {telemetry.tires.FR.surfaceTemp}°C · Warm & Grippy
              </span>
            </div>
            <div className="w-12 h-16 bg-[#1e1b4b] border border-indigo-400/40 rounded-lg flex items-center justify-center text-indigo-300 text-xs font-bold shadow-[0_0_10px_rgba(129,140,248,0.2)]">
              FR
            </div>
          </div>

          {/* Rear Left Tire */}
          <div className="p-4 bg-[#090a0f] border border-white/10 hover:border-indigo-400/50 transition-all rounded-xl flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-[#94a3b8] uppercase block">
                Rear-Left (RL)
              </span>
              <span className="text-xl font-bold text-white">
                {telemetry.tires.RL.wear}% Health
              </span>
              <span className="text-xs text-emerald-400 block mt-0.5">
                🟢 {telemetry.tires.RL.surfaceTemp}°C · Traction Ready
              </span>
            </div>
            <div className="w-12 h-16 bg-[#1e1b4b] border border-indigo-400/40 rounded-lg flex items-center justify-center text-indigo-300 text-xs font-bold shadow-[0_0_10px_rgba(129,140,248,0.2)]">
              RL
            </div>
          </div>

          {/* Rear Right Tire */}
          <div className="p-4 bg-[#090a0f] border border-white/10 hover:border-indigo-400/50 transition-all rounded-xl flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-[#94a3b8] uppercase block">
                Rear-Right (RR)
              </span>
              <span className="text-xl font-bold text-white">
                {telemetry.tires.RR.wear}% Health
              </span>
              <span className="text-xs text-emerald-400 block mt-0.5">
                🟢 {telemetry.tires.RR.surfaceTemp}°C · Traction Ready
              </span>
            </div>
            <div className="w-12 h-16 bg-[#1e1b4b] border border-indigo-400/40 rounded-lg flex items-center justify-center text-indigo-300 text-xs font-bold shadow-[0_0_10px_rgba(129,140,248,0.2)]">
              RR
            </div>
          </div>

        </div>
      </div>

      {/* Choose Tire Compound (.card) */}
      <div className="card">
        <span className="badge">PIT STOP TIRE SELECTION</span>
        <h4 className="text-lg font-bold text-white mt-1 mb-1">
          Select Tire Compound:
        </h4>
        <p className="mb-4">
          Click a tire below to test how different compounds affect grip and durability:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          {/* Soft Tire */}
          <button
            onClick={() => setTireCompound('SOFT')}
            className={`p-5 rounded-xl border text-left transition-all cursor-pointer ${
              telemetry.tireCompound === 'SOFT'
                ? 'border-rose-500 bg-rose-500/10 shadow-[0_0_20px_rgba(244,63,94,0.3)]'
                : 'border-white/10 bg-[#090a0f] hover:border-white/20'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-rose-400 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500 inline-block shadow-[0_0_8px_#f43f5e]" />
                Soft Tires (Red)
              </span>
              {telemetry.tireCompound === 'SOFT' && (
                <span className="text-[10px] font-bold px-2 py-0.5 bg-rose-500 text-white rounded-full">
                  FITTED
                </span>
              )}
            </div>
            <p className="text-xs m-0">
              🚀 <strong>Super Fast!</strong> Highest grip for quick qualifying laps, but wears out faster.
            </p>
          </button>

          {/* Medium Tire */}
          <button
            onClick={() => setTireCompound('MEDIUM')}
            className={`p-5 rounded-xl border text-left transition-all cursor-pointer ${
              telemetry.tireCompound === 'MEDIUM'
                ? 'border-amber-400 bg-amber-400/10 shadow-[0_0_20px_rgba(251,191,36,0.3)]'
                : 'border-white/10 bg-[#090a0f] hover:border-white/20'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-amber-400 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-amber-400 inline-block shadow-[0_0_8px_#fbbf24]" />
                Medium Tires (Yellow)
              </span>
              {telemetry.tireCompound === 'MEDIUM' && (
                <span className="text-[10px] font-bold px-2 py-0.5 bg-amber-400 text-slate-950 rounded-full">
                  FITTED
                </span>
              )}
            </div>
            <p className="text-xs m-0">
              ⚖️ <strong>Balanced Choice!</strong> Great combination of speed and durability. Standard race tire.
            </p>
          </button>

          {/* Hard Tire */}
          <button
            onClick={() => setTireCompound('HARD')}
            className={`p-5 rounded-xl border text-left transition-all cursor-pointer ${
              telemetry.tireCompound === 'HARD'
                ? 'border-indigo-400 bg-indigo-500/10 shadow-[0_0_20px_rgba(129,140,248,0.3)]'
                : 'border-white/10 bg-[#090a0f] hover:border-white/20'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-white flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-slate-300 inline-block shadow-[0_0_8px_white]" />
                Hard Tires (White)
              </span>
              {telemetry.tireCompound === 'HARD' && (
                <span className="text-[10px] font-bold px-2 py-0.5 bg-white text-slate-950 rounded-full">
                  FITTED
                </span>
              )}
            </div>
            <p className="text-xs m-0">
              🛡️ <strong>Toughest!</strong> Lasts for the longest number of laps without needing a pit stop.
            </p>
          </button>

        </div>
      </div>

      {/* Aerodynamic Wing Angle Tuning (.card) */}
      <div className="card">
        <span className="badge">
          <Wind className="w-3.5 h-3.5" />
          AERO BALANCE
        </span>
        <h4 className="text-lg font-bold text-white mt-1 mb-1">
          Front Wing Downforce Slider
        </h4>
        <p className="mb-4">
          Adjust the front wing flap angle: slide left for lower wind drag and top speed, or slide right for maximum downforce in the curves.
        </p>

        <div className="max-w-xl">
          <div className="flex justify-between items-center text-xs font-bold mb-2">
            <span className="text-[#94a3b8]">🚀 More Top Speed (12°)</span>
            <span className="text-indigo-400 text-sm font-mono">{telemetry.frontWingAngle.toFixed(1)}° Wing Angle</span>
            <span className="text-[#94a3b8]">More Corner Grip (24°) 🏎️</span>
          </div>
          <input
            type="range"
            min="12"
            max="24"
            step="0.5"
            value={telemetry.frontWingAngle}
            onChange={e => setFrontWingAngle(parseFloat(e.target.value))}
            className="w-full accent-indigo-400 cursor-pointer h-2 bg-[#090a0f] rounded-lg"
          />
          <div className="mt-3 p-3 bg-[#090a0f] border border-white/10 rounded-xl text-xs text-[#94a3b8] flex items-center justify-between">
            <span>Downforce Distribution:</span>
            <span className="font-bold text-white font-mono">
              {telemetry.frontDownforcePct}% Front / {(100 - telemetry.frontDownforcePct).toFixed(1)}% Rear
            </span>
          </div>
        </div>
      </div>

    </div>
  );
};
