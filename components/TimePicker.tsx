'use client';
import React from 'react';

interface TimePickerProps {
  selectedTime: string | null;
  onSelectTime: (time: string) => void;
  label: string;
}

const timeSlots = ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00', '18:00'];

export function TimePicker({ selectedTime, onSelectTime, label }: TimePickerProps) {
  return (
    <div>
      <label className="block text-[13.5px] font-medium text-ink">{label}</label>
      <div className="mt-3 rounded-xl bg-paper p-4 ring-1 ring-ink/10">
        <div className="grid grid-cols-3 gap-2">
          {timeSlots.map((time) => {
            const isSelected = selectedTime === time;
            return (
              <button
                key={time}
                type="button"
                onClick={() => onSelectTime(time)}
                className={`rounded-lg py-2.5 text-[13px] font-semibold transition-colors ${
                  isSelected
                    ? 'bg-accent text-ink'
                    : 'bg-chalk text-ink hover:bg-chalk/70 ring-1 ring-ink/8'
                }`}>
                {time}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
