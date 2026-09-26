'use client';
import React, { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

interface DatePickerProps {
  selectedDate: string | null;
  onSelectDate: (date: string) => void;
  label: string;
}

export function DatePicker({ selectedDate, onSelectDate, label }: DatePickerProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const monthName = currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' });
  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDay = getFirstDayOfMonth(currentMonth);
  const days = [];

  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const formatDate = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    return date.toISOString().split('T')[0];
  };

  const isPastDate = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    date.setHours(0, 0, 0, 0);
    return date < today;
  };

  return (
    <div>
      <label className="block text-[13.5px] font-medium text-ink">{label}</label>
      <div className="mt-3 rounded-xl bg-paper p-4 ring-1 ring-ink/10">
        <div className="mb-4 flex items-center justify-between">
          <button
            type="button"
            onClick={handlePrevMonth}
            className="rounded p-1 hover:bg-chalk/50">
            <ChevronLeftIcon size={18} />
          </button>
          <span className="text-sm font-semibold">{monthName}</span>
          <button
            type="button"
            onClick={handleNextMonth}
            className="rounded p-1 hover:bg-chalk/50">
            <ChevronRightIcon size={18} />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-semibold text-slate2 mb-2">
          <div>Su</div>
          <div>Mo</div>
          <div>Tu</div>
          <div>We</div>
          <div>Th</div>
          <div>Fr</div>
          <div>Sa</div>
        </div>

        <div className="grid grid-cols-7 gap-1">
          {days.map((day, idx) => {
            if (day === null) {
              return <div key={`empty-${idx}`} />;
            }

            const dateStr = formatDate(day);
            const isSelected = selectedDate === dateStr;
            const isPast = isPastDate(day);

            return (
              <button
                key={day}
                type="button"
                onClick={() => !isPast && onSelectDate(dateStr)}
                disabled={isPast}
                className={`rounded py-1.5 text-[13px] font-medium transition-colors ${
                  isPast
                    ? 'text-slate2/40 cursor-not-allowed'
                    : isSelected
                      ? 'bg-accent text-ink'
                      : 'hover:bg-chalk/50 text-ink'
                }`}>
                {day}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
