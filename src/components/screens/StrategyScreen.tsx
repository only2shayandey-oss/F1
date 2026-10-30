/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useTelemetry } from '../../context/TelemetryContext';
import { Trophy, Radio, Clock, Wrench } from 'lucide-react';

interface RadioMsg {
  id: string;
  sender: string;
  text: string;
  time: string;
}

export const StrategyScreen: React.FC = () => {
  const { telemetry } = useTelemetry();

  const [radioLogs, setRadioLogs] = useState<RadioMsg[]>([
    { id: '1', sender: '🏎️ Driver', text: 'Car feels great! Loving the grip on these yellow tires.', time: 'Just now' },
    { id: '2', sender: '👨‍🔧 Pit Chief', text: 'You are in 1st place! Keep this exact pace.', time: '1 min ago' },
    { id: '3', sender: '👨‍🔧 Pit Chief', text: 'Plan A is working perfectly. Pit window opens on Lap 38.', time: '2 mins ago' },
  ]);

  const [activeCall, setActiveCall] = useState<string | null>(null);

  const sendPitCommand = (commandType: string) => {
    setActiveCall(commandType);
    setTimeout(() => {
      if (commandType === 'box') {
        setRadioLogs(prev => [
          { id: Date.now().toString(), sender: '👨‍🔧 Pit Chief', text: 'Box Box! Coming in on Lap 38 for new Hard tires!', time: 'Just now' },
          ...prev
        ]);
      } else if (commandType === 'push') {
        setRadioLogs(prev => [
          { id: Date.now().toString(), sender: '🏎️ Driver', text: 'Understood! Stepping on the gas, going for maximum speed!', time: 'Just now' },
          ...prev
        ]);
      } else {
        setRadioLogs(prev => [
          { id: Date.now().toString(), sender: '🏎️ Driver', text: 'Copy that, saving tires and holding 1st place carefully.', time: 'Just now' },
          ...prev
        ]);
      }
      setActiveCall(null);
    }, 500);
  };

  return (
    <div className="space-y-6">
      
      {/* Race Standing Header (.card) */}
      <div className="card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="badge">
            <Trophy className="w-3.5 h-3.5" />
            RACE STANDINGS
          </span>
          <h3 className="text-xl font-bold text-white mt-1">
            You are Leading in 1st Place! 🏆
          </h3>
          <p className="mt-1">
            Lap {telemetry.currentLap} of {telemetry.totalLaps} · 2.8 seconds ahead of the 2nd place car!
          </p>
        </div>

        <div className="flex items-center gap-2.5 bg-[#090a0f] px-4 py-2.5 rounded-xl border border-white/10 shrink-0">
          <Clock className="w-5 h-5 text-indigo-400" />
          <div className="text-xs">
            <span className="text-[#94a3b8] block text-[10px] uppercase">Best Lap Time</span>
            <span className="font-bold text-indigo-400 font-mono">1:24.120 (Fastest!)</span>
          </div>
        </div>
      </div>

      {/* Pit Stop Recommendation (.card) */}
      <div className="card">
        <span className="badge">
          <Wrench className="w-3.5 h-3.5" />
          PIT STOP WINDOW
        </span>
        <h4 className="text-lg font-bold text-white mt-1 mb-1">
          Pit Stop Strategy Plan
        </h4>
        <p className="mb-4">
          In Formula 1, cars stop to get 4 brand-new tires in just about 2.2 seconds!
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <div className="p-4 bg-[#090a0f] border border-white/10 rounded-xl">
            <span className="text-[#94a3b8] block text-[10px] uppercase mb-1">Recommended Stop</span>
            <span className="text-base font-bold text-indigo-400">Lap 38 (In 4 Laps)</span>
          </div>

          <div className="p-4 bg-[#090a0f] border border-white/10 rounded-xl">
            <span className="text-[#94a3b8] block text-[10px] uppercase mb-1">Next Tires To Put On</span>
            <span className="text-base font-bold text-white">⚪ Hard Tires (White)</span>
          </div>

          <div className="p-4 bg-[#090a0f] border border-white/10 rounded-xl">
            <span className="text-[#94a3b8] block text-[10px] uppercase mb-1">Pit Crew Stop Time</span>
            <span className="text-base font-bold text-emerald-400">⚡ 2.2 Seconds</span>
          </div>
        </div>

        {/* 3 Sector Lights in Lap */}
        <div className="pt-4 border-t border-white/10">
          <span className="text-xs font-bold text-[#94a3b8] uppercase block mb-3">
            Track Sector Speed Performance:
          </span>
          <div className="grid grid-cols-3 gap-3 text-center text-xs font-mono">
            <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-500/40 text-purple-300 font-bold">
              Sector 1: 🟣 Purple (Fastest!)
            </div>
            <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-400 font-bold">
              Sector 2: 🟢 Green (Personal Best)
            </div>
            <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-400 font-bold">
              Sector 3: 🟢 Green (Personal Best)
            </div>
          </div>
        </div>
      </div>

      {/* Team Radio (.card) */}
      <div className="card">
        <span className="badge">
          <Radio className="w-3.5 h-3.5" />
          TEAM RADIO
        </span>
        <h4 className="text-lg font-bold text-white mt-1 mb-1">
          Pit Wall Audio & Commands 📻
        </h4>
        <p className="mb-4">
          Click any radio order below to transmit orders to the driver over the team radio!
        </p>

        {/* Radio Action Buttons with .btn */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          <button
            onClick={() => sendPitCommand('box')}
            disabled={activeCall !== null}
            className="btn btn-primary !text-xs"
          >
            🏁 Call "Box Box" for Pit Stop
          </button>

          <button
            onClick={() => sendPitCommand('push')}
            disabled={activeCall !== null}
            className="btn !bg-amber-400 !text-slate-950 !text-xs hover:!bg-amber-300"
          >
            🚀 Tell Driver to Push Flat-Out!
          </button>

          <button
            onClick={() => sendPitCommand('defend')}
            disabled={activeCall !== null}
            className="btn !bg-emerald-400 !text-slate-950 !text-xs hover:!bg-emerald-300"
          >
            🛡️ Save Tires & Protect 1st Place
          </button>
        </div>

        {/* Live Radio Message Log */}
        <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
          {radioLogs.map(log => (
            <div 
              key={log.id} 
              className="p-3 bg-[#090a0f] border border-white/10 rounded-xl text-xs flex items-start justify-between gap-2"
            >
              <div>
                <span className="font-bold text-indigo-400 mr-2">{log.sender}:</span>
                <span className="text-slate-200">{log.text}</span>
              </div>
              <span className="text-[10px] text-[#94a3b8] shrink-0">{log.time}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
