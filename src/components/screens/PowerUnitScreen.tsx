/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useTelemetry, ERSMode } from '../../context/TelemetryContext';
import { Zap, Flame, BatteryCharging } from 'lucide-react';

export const PowerUnitScreen: React.FC = () => {
  const { 
    telemetry, 
    setERSMode, 
    triggerOvertake 
  } = useTelemetry();

  const simpleModes: { id: ERSMode; emoji: string; title: string; subtitle: string }[] = [
    {
      id: 'BALANCED',
      emoji: '🏎️',
      title: 'Standard Race Mode',
      subtitle: 'Great all-around power. Uses electricity and recharges smoothly on every lap.',
    },
    {
      id: 'QUALIFYING',
      emoji: '⚡',
      title: 'Full Power Attack Mode',
      subtitle: 'Maximum electric blast! Gives you the fastest lap time possible.',
    },
    {
      id: 'RECHARGE',
      emoji: '🔋',
      title: 'Battery Recharge Mode',
      subtitle: 'Recovers battery quickly when you brake, getting you ready for the next boost!',
    },
  ];

  return (
    <div className="space-y-6">
      
      {/* Friendly Overview Banner (.card) */}
      <div className="card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="badge">
            <Zap className="w-3.5 h-3.5" />
            POWERTRAIN
          </span>
          <h3 className="text-xl font-bold text-white mt-1">
            Gas Engine + Electric Hybrid System
          </h3>
          <p className="mt-1">
            An F1 car combines a high-revving turbo engine with an electric battery that recharges every time you step on the brake!
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 bg-[#090a0f] px-4 py-2.5 rounded-xl border border-white/10">
          <Zap className="w-5 h-5 text-indigo-400" />
          <div className="text-xs">
            <span className="text-[#94a3b8] block text-[10px] uppercase">Combined Output</span>
            <span className="font-bold text-white">~1,000+ Horsepower</span>
          </div>
        </div>
      </div>

      {/* Two Big Power Sources (.card) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Source 1: Gas Turbo Engine */}
        <div className="card flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/20">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-[#94a3b8] uppercase tracking-wider block">INTERNAL COMBUSTION</span>
                <h4 className="text-base font-bold text-white">
                  1.6L V6 Turbo Gas Engine
                </h4>
              </div>
            </div>

            <p className="mb-4">
              A compact but extremely high-performance turbocharged engine that revs up to 13,000 RPM!
            </p>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center p-3 bg-[#090a0f] border border-white/10 rounded-xl">
                <span className="text-[#94a3b8]">Engine RPM (Speed):</span>
                <span className="font-bold text-white font-mono">{telemetry.rpm.toLocaleString()} RPM</span>
              </div>

              <div className="flex justify-between items-center p-3 bg-[#090a0f] border border-white/10 rounded-xl">
                <span className="text-[#94a3b8]">Engine Temperature:</span>
                <span className="font-bold text-emerald-400 font-mono">
                  🟢 {telemetry.engineCoolantTemp}°C (Safe & Cool)
                </span>
              </div>

              <div className="flex justify-between items-center p-3 bg-[#090a0f] border border-white/10 rounded-xl">
                <span className="text-[#94a3b8]">Engine Output:</span>
                <span className="font-bold text-white">~850 Horsepower</span>
              </div>
            </div>
          </div>
        </div>

        {/* Source 2: Electric Hybrid Battery */}
        <div className="card flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 bg-indigo-500/10 text-indigo-400 rounded-xl border border-indigo-500/20">
                <BatteryCharging className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-[#94a3b8] uppercase tracking-wider block">ENERGY STORE (ES)</span>
                <h4 className="text-base font-bold text-white">
                  Hybrid Battery System
                </h4>
              </div>
            </div>

            <p className="mb-4">
              Recharges kinetic energy from braking zones to give you instant boost for overtaking!
            </p>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-[#090a0f] border border-white/10 rounded-xl">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-[#94a3b8]">Battery Charge Level:</span>
                  <span className="font-bold text-indigo-400 text-sm font-mono">
                    {Math.round(telemetry.ersBatterySoC)}%
                  </span>
                </div>
                <div className="h-3 w-full bg-[#12141c] rounded-full overflow-hidden border border-white/10">
                  <div 
                    className="h-full bg-gradient-to-r from-indigo-500 to-[#00F5D4] rounded-full transition-all duration-300 shadow-[0_0_10px_rgba(129,140,248,0.6)]"
                    style={{ width: `${telemetry.ersBatterySoC}%` }}
                  />
                </div>
              </div>

              <div className="flex justify-between items-center p-3 bg-[#090a0f] border border-white/10 rounded-xl">
                <span className="text-[#94a3b8]">Electric Extra Boost:</span>
                <span className="font-bold text-white">+160 Horsepower (120 kW)</span>
              </div>

              <div className="flex justify-between items-center p-3 bg-[#090a0f] border border-white/10 rounded-xl">
                <span className="text-[#94a3b8]">Battery Status:</span>
                <span className="font-bold text-emerald-400">
                  ⚡ Ready for Overtake Push
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Select Driving Mode (.card) */}
      <div className="card">
        <span className="badge">POWER STRATEGY</span>
        <h4 className="text-lg font-bold text-white mt-1 mb-1">
          Select Power Mode:
        </h4>
        <p className="mb-4">
          Choose how the car utilizes its electrical battery energy:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {simpleModes.map(mode => {
            const isSelected = telemetry.ersMode === mode.id;
            return (
              <button
                key={mode.id}
                onClick={() => setERSMode(mode.id)}
                className={`p-5 rounded-xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'border-indigo-400 bg-indigo-500/10 shadow-[0_0_20px_rgba(129,140,248,0.3)]'
                    : 'border-white/10 bg-[#090a0f] hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-white flex items-center gap-2">
                    <span>{mode.emoji}</span>
                    <span>{mode.title}</span>
                  </span>
                  {isSelected && (
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-indigo-400 text-slate-950 rounded-full">
                      ACTIVE
                    </span>
                  )}
                </div>
                <p className="text-xs m-0 leading-relaxed">
                  {mode.subtitle}
                </p>
              </button>
            );
          })}
        </div>

        {/* Quick Boost Button with .btn-boost */}
        <div className="mt-6 pt-5 border-t border-white/10">
          <button
            onClick={triggerOvertake}
            disabled={telemetry.overtakeActive}
            className={`btn btn-boost ${telemetry.overtakeActive ? '!bg-indigo-400 text-black shadow-[0_0_20px_rgba(129,140,248,0.8)]' : ''}`}
          >
            <Zap className="w-4 h-4" />
            <span>{telemetry.overtakeActive ? `BOOSTING! ${telemetry.overtakeSecondsRemaining}s REMAINING` : 'TEST ELECTRIC BOOST NOW (10 SECONDS)'}</span>
          </button>
        </div>
      </div>

    </div>
  );
};
