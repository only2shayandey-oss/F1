/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useTelemetry } from '../../context/TelemetryContext';
import { Flag, Check } from 'lucide-react';

interface TrackCard {
  id: string;
  name: string;
  country: string;
  flag: string;
  badge: string;
  speed: string;
  description: string;
}

const tracks: TrackCard[] = [
  {
    id: 'silverstone',
    name: 'Silverstone Grand Prix',
    country: 'Great Britain',
    flag: '🇬🇧',
    badge: 'High-Speed Curves',
    speed: '318 km/h',
    description: 'The historic home of British motorsport! Full of fast, sweeping turns where cars lean hard into corners.',
  },
  {
    id: 'monza',
    name: 'Monza Temple of Speed',
    country: 'Italy',
    flag: '🇮🇹',
    badge: 'Fastest Straight Road!',
    speed: '348 km/h',
    description: 'The fastest track on earth! Long, straight roads where cars reach maximum velocity with skinny wings.',
  },
  {
    id: 'spa',
    name: 'Spa-Francorchamps',
    country: 'Belgium',
    flag: '🇧🇪',
    badge: 'Forest Rollercoaster',
    speed: '332 km/h',
    description: 'Carved through mountain forests with the legendary uphill Eau Rouge corner that feels like a rollercoaster!',
  },
  {
    id: 'monaco',
    name: 'Circuit de Monaco',
    country: 'Monaco',
    flag: '🇲🇨',
    badge: 'Tight City Streets',
    speed: '286 km/h',
    description: 'A glamorous city race right next to the sea harbor! Super tight corners with zero room for mistakes.',
  },
];

export const PresetsScreen: React.FC = () => {
  const { 
    telemetry, 
    applyCircuitPreset,
    units,
    toggleUnits
  } = useTelemetry();

  const [appliedMessage, setAppliedMessage] = useState<string | null>(null);

  const handleSelectTrack = (track: TrackCard) => {
    applyCircuitPreset(track.id);
    setAppliedMessage(`Selected ${track.name}! Car setup adjusted for this circuit.`);
    setTimeout(() => setAppliedMessage(null), 3500);
  };

  return (
    <div className="space-y-6">
      
      {/* Toast Notification */}
      {appliedMessage && (
        <div className="p-3.5 bg-indigo-950/40 border border-indigo-400 rounded-xl flex items-center justify-between text-xs text-indigo-300">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400" />
            <span className="font-bold">{appliedMessage}</span>
          </div>
          <button onClick={() => setAppliedMessage(null)} className="font-bold hover:text-white cursor-pointer">✕</button>
        </div>
      )}

      {/* Track Selection Header (.card) */}
      <div className="card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="badge">
            <Flag className="w-3.5 h-3.5" />
            RACE CALENDAR
          </span>
          <h3 className="text-xl font-bold text-white mt-1">
            Choose Your Race Track
          </h3>
          <p className="mt-1">
            Pick a legendary track below. The car automatically optimizes its wing angles and top speed!
          </p>
        </div>
      </div>

      {/* 4 Clean Track Cards (.card) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {tracks.map(track => {
          const isSelected = telemetry.activePresetId === track.id;

          return (
            <div
              key={track.id}
              className={`card flex flex-col justify-between ${
                isSelected ? '!border-indigo-400 shadow-[0_0_30px_rgba(129,140,248,0.25)]' : ''
              }`}
            >
              <div>
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{track.flag}</span>
                    <div>
                      <h4 className="text-base font-bold text-white">
                        {track.name}
                      </h4>
                      <span className="text-xs text-[#94a3b8]">{track.country}</span>
                    </div>
                  </div>

                  <span className="badge !mb-0">
                    {track.badge}
                  </span>
                </div>

                <p className="my-3 leading-relaxed">
                  {track.description}
                </p>

                <div className="p-3 bg-[#090a0f] border border-white/10 rounded-xl text-xs mb-4 flex justify-between items-center">
                  <span className="text-[#94a3b8] uppercase">Top Speed:</span>
                  <span className="font-bold text-indigo-400 font-mono">{track.speed}</span>
                </div>
              </div>

              <button
                onClick={() => handleSelectTrack(track)}
                disabled={isSelected}
                className={`btn ${isSelected ? '!bg-[#1e1b4b] !text-indigo-300 border border-indigo-400/30' : 'btn-primary'}`}
              >
                {isSelected ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Track Selected & Loaded</span>
                  </>
                ) : (
                  <span>🏎️ Drive On This Track</span>
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* Speed Unit Preference (.card) */}
      <div className="card flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="badge">PREFERENCES</span>
          <h4 className="text-base font-bold text-white mt-1">
            Speed Display Measurement
          </h4>
          <p className="mt-1">
            Choose whether you prefer Kilometers per hour (KM/H) or Miles per hour (MPH):
          </p>
        </div>

        <div className="flex gap-2 shrink-0">
          <button
            onClick={() => units !== 'metric' && toggleUnits()}
            className={`btn !w-auto px-4 py-2 text-xs ${
              units === 'metric' ? 'btn-primary' : '!bg-[#090a0f] !text-white border border-white/10'
            }`}
          >
            KM/H (Metric)
          </button>
          <button
            onClick={() => units !== 'imperial' && toggleUnits()}
            className={`btn !w-auto px-4 py-2 text-xs ${
              units === 'imperial' ? 'btn-primary' : '!bg-[#090a0f] !text-white border border-white/10'
            }`}
          >
            MPH (Imperial)
          </button>
        </div>
      </div>

    </div>
  );
};
