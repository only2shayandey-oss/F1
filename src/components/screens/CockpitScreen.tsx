/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useTelemetry } from '../../context/TelemetryContext';
import { Zap, Trophy, Battery, Flame, Gauge } from 'lucide-react';

export const CockpitScreen: React.FC = () => {
  const { 
    telemetry, 
    toggleDRS, 
    triggerOvertake, 
    units 
  } = useTelemetry();

  // Convert speed if imperial
  const displaySpeed = units === 'imperial' 
    ? Math.round(telemetry.speed * 0.621371) 
    : telemetry.speed;
  const speedUnit = units === 'imperial' ? 'MPH' : 'KM/H';

  // Calculate RPM LED lights (12 lights)
  const maxRpm = 13000;
  const minRpm = 8000;
  const rpmPct = Math.max(0, Math.min(1, (telemetry.rpm - minRpm) / (maxRpm - minRpm)));
  const totalLeds = 12;
  const litLeds = Math.round(rpmPct * totalLeds);

  return (
    <div className="space-y-6">
      
      {/* 4 Super Clean Status Cards with .card */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        
        {/* Race Standing */}
        <div className="card !p-5">
          <span className="badge">
            <Trophy className="w-3.5 h-3.5" />
            RACE LEADER
          </span>
          <div className="text-3xl font-bold text-white mt-1">
            1st Place
          </div>
          <p className="text-xs text-emerald-400 font-medium mt-1">
            Leading by 2.8s!
          </p>
        </div>

        {/* Battery Power */}
        <div className="card !p-5">
          <span className="badge">
            <Battery className="w-3.5 h-3.5" />
            BATTERY
          </span>
          <div className="text-3xl font-bold text-white mt-1 tabular-nums">
            {Math.round(telemetry.ersBatterySoC)}%
          </div>
          <div className="w-full bg-[#090a0f] h-2 rounded-full mt-2 overflow-hidden border border-white/10">
            <div 
              className="bg-indigo-400 h-full transition-all duration-300 rounded-full shadow-[0_0_8px_rgba(129,140,248,0.8)]"
              style={{ width: `${telemetry.ersBatterySoC}%` }}
            />
          </div>
        </div>

        {/* Lap Counter */}
        <div className="card !p-5">
          <span className="badge">
            <Gauge className="w-3.5 h-3.5" />
            GRAND PRIX
          </span>
          <div className="text-3xl font-bold text-white mt-1 tabular-nums">
            Lap {telemetry.currentLap} <span className="text-sm font-normal text-[#94a3b8]">/ {telemetry.totalLaps}</span>
          </div>
          <p className="text-xs text-[#94a3b8] mt-1">
            23 laps to the checkered flag
          </p>
        </div>

        {/* Tire Health */}
        <div className="card !p-5">
          <span className="badge">
            <Flame className="w-3.5 h-3.5" />
            TIRE GRIP
          </span>
          <div className="text-3xl font-bold text-white mt-1 tabular-nums">
            82%
          </div>
          <p className="text-xs text-emerald-400 font-medium mt-1">
            Yellow Medium (Good)
          </p>
        </div>

      </div>

      {/* Main Cockpit Speedometer View (.card) */}
      <div className="card text-center relative overflow-hidden">
        
        {/* Glow header stripe */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-[#00F5D4] to-indigo-500" />

        {/* Rev Lights (Tachometer LEDs) */}
        <div className="max-w-md mx-auto mb-6">
          <span className="badge !mb-2">ENGINE REVS</span>
          <div className="flex items-center justify-between gap-1.5 p-2 bg-[#090a0f] border border-white/10 rounded-xl">
            {Array.from({ length: totalLeds }).map((_, i) => {
              const isLit = i < litLeds;
              let ledColor = 'bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.9)]';
              if (i >= 5 && i < 9) {
                ledColor = 'bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.9)]';
              } else if (i >= 9) {
                ledColor = 'bg-indigo-400 shadow-[0_0_12px_rgba(129,140,248,1)]';
              }

              return (
                <div
                  key={i}
                  className={`flex-1 h-3.5 rounded-sm transition-all duration-75 ${
                    isLit ? ledColor : 'bg-[#1e1b4b]/60'
                  }`}
                />
              );
            })}
          </div>
        </div>

        {/* Big Speed & Big Gear Display */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center my-4">
          
          {/* Gas & Brake Pedals (Left) */}
          <div className="space-y-4 max-w-xs mx-auto md:mx-0 w-full text-left">
            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-emerald-400 flex items-center gap-1">🟢 GAS PEDAL</span>
                <span className="tabular-nums text-white font-mono">{telemetry.throttle}%</span>
              </div>
              <div className="h-4 w-full bg-[#090a0f] rounded-full overflow-hidden p-0.5 border border-white/10">
                <div 
                  className="h-full bg-emerald-400 rounded-full transition-all duration-100 shadow-[0_0_8px_rgba(52,211,153,0.7)]"
                  style={{ width: `${telemetry.throttle}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-rose-400 flex items-center gap-1">🔴 BRAKE PEDAL</span>
                <span className="tabular-nums text-white font-mono">{telemetry.brake}%</span>
              </div>
              <div className="h-4 w-full bg-[#090a0f] rounded-full overflow-hidden p-0.5 border border-white/10">
                <div 
                  className="h-full bg-rose-500 rounded-full transition-all duration-100 shadow-[0_0_8px_rgba(244,63,94,0.7)]"
                  style={{ width: `${telemetry.brake}%` }}
                />
              </div>
            </div>
          </div>

          {/* Center Speedometer */}
          <div className="flex flex-col items-center justify-center">
            <div className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tight text-white leading-none">
              {displaySpeed}
            </div>
            <div className="text-sm sm:text-base font-bold text-indigo-400 tracking-widest mt-1 uppercase">
              {speedUnit} SPEED
            </div>
            <div className="inline-block mt-3 px-3 py-1 bg-[#090a0f] border border-white/10 rounded-full text-xs text-[#94a3b8]">
              {telemetry.brake > 0 ? 'Braking for corner 🛑' : telemetry.throttle > 70 ? 'Full speed ahead! 🚀' : 'Cruising through corner 🏎️'}
            </div>
          </div>

          {/* Current Gear Box (Right) */}
          <div className="flex flex-col items-center justify-center">
            <span className="text-xs uppercase tracking-wider text-[#94a3b8] font-semibold mb-1">CURRENT GEAR</span>
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-[#090a0f] border-2 border-[rgba(129,140,248,0.3)] flex items-center justify-center shadow-[inset_0_2px_10px_rgba(0,0,0,0.8)]">
              <span className="text-5xl sm:text-6xl font-black text-indigo-400">
                {telemetry.gear === 0 ? 'N' : telemetry.gear}
              </span>
            </div>
            <span className="text-xs text-[#94a3b8] mt-2">
              8-Speed Paddle Gearbox
            </span>
          </div>

        </div>

      </div>

      {/* Two Big Action Cards with .card and .btn */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        
        {/* Boost Button Card */}
        <div className="card flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="badge">
                <Zap className="w-3.5 h-3.5" />
                ELECTRIC NITRO
              </span>
              <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${telemetry.overtakeActive ? 'bg-indigo-500/20 text-indigo-400 animate-pulse border border-indigo-500/40' : 'bg-white/5 text-[#94a3b8]'}`}>
                {telemetry.overtakeActive ? 'BLASTING!' : 'READY'}
              </span>
            </div>
            <h3 className="text-lg font-bold text-white">
              Electric Battery Boost ⚡
            </h3>
            <p className="mt-1 mb-4">
              Pushes 160 extra horsepower into the wheels for 10 seconds to overtake cars on the straights!
            </p>
          </div>

          <button
            onClick={triggerOvertake}
            disabled={telemetry.overtakeActive || telemetry.ersBatterySoC < 10}
            className={`btn btn-boost ${telemetry.overtakeActive ? '!bg-indigo-400 text-black shadow-[0_0_20px_rgba(129,140,248,0.8)]' : ''}`}
          >
            <Zap className={`w-4 h-4 ${telemetry.overtakeActive ? 'animate-bounce' : ''}`} />
            <span>{telemetry.overtakeActive ? `BOOSTING! ${telemetry.overtakeSecondsRemaining}s LEFT` : 'PRESS FOR 10s OVERTAKE BOOST!'}</span>
          </button>
        </div>

        {/* DRS Wing Flap Card */}
        <div className="card flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="badge">
                <Gauge className="w-3.5 h-3.5" />
                AERODYNAMICS
              </span>
              <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${telemetry.drsActive ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/40' : 'bg-white/5 text-[#94a3b8]'}`}>
                {telemetry.drsActive ? 'WING OPEN' : 'WING CLOSED'}
              </span>
            </div>
            <h3 className="text-lg font-bold text-white">
              Aerodynamic Wing Flap 🪽
            </h3>
            <p className="mt-1 mb-4">
              Opens the rear wing flap to cut through the air with less wind drag and gain +15 km/h extra speed!
            </p>
          </div>

          <button
            onClick={toggleDRS}
            className="btn btn-primary"
          >
            <span>{telemetry.drsActive ? 'CLOSE REAR WING (MORE CORNER GRIP)' : 'OPEN REAR WING (+15 SPEED!)'}</span>
          </button>
        </div>

      </div>

    </div>
  );
};
