import { DayPicker } from 'react-day-picker';
import 'react-day-picker/style.css';
import { Dispatch, SetStateAction, useMemo, useState, useCallback } from 'react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2';
import type { SentimentData } from '../types/sentiment';
import { formatDateDisplay, getWeekRange } from '../utils/date';

interface DateDisplayProps {
  datas: SentimentData | null;
  filter: string;
  setFilter: Dispatch<SetStateAction<'latest' | 'daily' | 'weekly' | 'monthly'>>;
  setOption: Dispatch<
    SetStateAction<{
      date?: string | false;
      from_date?: string | false;
      to_date?: string | false;
      month?: string | false;
      year?: string | false;
    }>
  >;
}

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agt', 'Sep', 'Okt', 'Nov', 'Des'];

export default function DateDisplay({ datas, setFilter, filter, setOption }: DateDisplayProps) {
  const [selected, setSelected] = useState<Date>();
  const [selectedWeek, setSelectedWeek] = useState<Date>();
  const [selectedMonth, setSelectedMonth] = useState<Date>();
  const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());
  const [hoveredWeek, setHoveredWeek] = useState<Date | null>(null);
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const filterList = ['latest', 'daily', 'weekly', 'monthly'] as const;
  const formattedDate = useMemo(() => formatDateDisplay(datas), [datas]);

  const handleDateSelect = useCallback(
    (date: Date | undefined) => {
      setSelected(date);
      if (date) {
        const formattedDate = date.toISOString().split('T')[0];
        setOption((prev) => ({
          ...prev,
          date: formattedDate,
          from_date: false,
          to_date: false,
          month: false,
          year: false,
        }));
        setIsPickerVisible(false);
      }
    },
    [setOption]
  );

  const handleWeekSelect = useCallback(
    (date: Date | undefined) => {
      if (date) {
        const { from, to } = getWeekRange(date);
        setSelectedWeek(from);

        const fromFormatted = from.toISOString().split('T')[0];
        const toFormatted = to.toISOString().split('T')[0];

        setOption((prev) => ({
          ...prev,
          date: false,
          from_date: fromFormatted,
          to_date: toFormatted,
          month: false,
          year: false,
        }));
        setIsPickerVisible(false);
      }
    },
    [setOption]
  );

  const handleCustomMonthSelect = useCallback(
    (month: number, year: number) => {
      const date = new Date(year, month - 1, 1);
      setSelectedMonth(date);

      setOption((prev) => ({
        ...prev,
        date: false,
        from_date: false,
        to_date: false,
        month: month.toString(),
        year: year.toString(),
      }));
      setIsPickerVisible(false);
    },
    [setOption]
  );

  const handleFilterChange = useCallback(
    (newFilter: (typeof filterList)[number]) => {
      setFilter(newFilter);
      if (newFilter === 'latest') {
        setIsPickerVisible(false);
        setOption({
          date: false,
          from_date: false,
          to_date: false,
          month: false,
          year: false,
        });
      } else {
        setIsPickerVisible(true);
      }
    },
    [setFilter, setOption]
  );

  const handleMouseEnterFilter = useCallback(
    (filt: (typeof filterList)[number]) => {
      if (filt !== 'latest' && filter === filt) {
        setIsPickerVisible(true);
      }
    },
    [filter]
  );

  const handleMouseLeavePickerDaily = useCallback(() => {
    setIsPickerVisible(false);
  }, []);

  const handleMouseLeavePickerWeekly = useCallback(() => {
    setIsPickerVisible(false);
  }, []);

  const handleMouseLeavePickerMonthly = useCallback(() => {
    setIsPickerVisible(false);
  }, []);

  const handleDayMouseEnter = useCallback((date: Date) => {
    setHoveredWeek(date);
  }, []);

  const handleDayMouseLeave = useCallback(() => {
    setHoveredWeek(null);
  }, []);

  const handleYearDecrement = useCallback(() => {
    setCurrentYear((prev) => prev - 1);
  }, []);

  const handleYearIncrement = useCallback(() => {
    setCurrentYear((prev) => prev + 1);
  }, []);

  const weekModifiers = useMemo(
    () => ({
      weekSelected: (date: Date) => {
        if (!selectedWeek) return false;
        const { from, to } = getWeekRange(selectedWeek);
        return date >= from && date <= to;
      },
      weekHovered: (date: Date) => {
        if (!hoveredWeek) return false;
        const { from, to } = getWeekRange(hoveredWeek);
        return date >= from && date <= to;
      },
    }),
    [selectedWeek, hoveredWeek]
  );

  const weekModifiersStyles = useMemo(
    () => ({
      weekSelected: {
        backgroundColor: '#FEE2E2',
        color: '#991B1B',
        fontWeight: 'bold',
      },
      weekHovered: {
        backgroundColor: '#FCA5A5',
        color: '#FFFFFF',
        cursor: 'pointer',
        fontWeight: '600',
      },
    }),
    []
  );

  return (
    <div className="flex items-center gap-3">
      <div className="bg-white/95 rounded-lg px-3.5 py-2 shadow-sm backdrop-blur-[10px] flex items-center gap-1.5">
        <span className="text-[11px] text-gray-600">Data per:</span>
        <span className="text-[11px] font-semibold text-gray-800">{formattedDate}</span>
      </div>
      <div className="relative flex items-center gap-1 bg-white/90 px-4.5 py-1 rounded-md shadow-sm">
        {filterList.map((filt) => (
          <button
            key={filt}
            onClick={() => handleFilterChange(filt)}
            onMouseEnter={() => handleMouseEnterFilter(filt)}
            className={`text-xs cursor-pointer px-2 py-1 rounded-md transition-colors duration-150 ${
              filter === filt ? 'bg-[#F05454] text-white' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            {filt === 'latest' ? 'Latest' : filt.charAt(0).toUpperCase() + filt.slice(1)}
          </button>
        ))}

        {filter === 'daily' && isPickerVisible && (
          <div
            className="absolute right-0 top-10 bg-white p-4 z-1200 rounded-lg shadow-xl border border-gray-200"
            onMouseLeave={handleMouseLeavePickerDaily}
          >
            <DayPicker
              mode="single"
              selected={selected}
              onSelect={handleDateSelect}
              defaultMonth={selected}
            />
          </div>
        )}

        {filter === 'weekly' && isPickerVisible && (
          <div
            className="absolute right-0 top-10 bg-white p-4 z-1200 rounded-lg shadow-xl border border-gray-200"
            onMouseLeave={handleMouseLeavePickerWeekly}
          >
            <DayPicker
              mode="single"
              selected={selectedWeek}
              onSelect={handleWeekSelect}
              defaultMonth={selectedWeek}
              onDayMouseEnter={handleDayMouseEnter}
              onDayMouseLeave={handleDayMouseLeave}
              modifiers={weekModifiers}
              modifiersStyles={weekModifiersStyles}
            />
          </div>
        )}

        {filter === 'monthly' && isPickerVisible && (
          <div
            className="absolute right-0 top-10 bg-white p-4 z-1200 rounded-lg shadow-xl border border-gray-200 w-[280px]"
            onMouseLeave={handleMouseLeavePickerMonthly}
          >
            <div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-200">
              <button
                onClick={handleYearDecrement}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
              >
                <HiChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <span className="text-sm font-semibold text-gray-700">{currentYear}</span>
              <button
                onClick={handleYearIncrement}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
              >
                <HiChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {months.map((month, index) => {
                const monthNum = index + 1;
                const isSelected =
                  selectedMonth &&
                  selectedMonth.getMonth() === index &&
                  selectedMonth.getFullYear() === currentYear;

                return (
                  <button
                    key={month}
                    onClick={() => handleCustomMonthSelect(monthNum, currentYear)}
                    className={`
                      px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-150
                      ${
                        isSelected
                          ? 'bg-[#F05454] text-white shadow-sm'
                          : 'bg-gray-50 text-gray-700 hover:bg-[#FCA5A5] hover:text-white'
                      }
                    `}
                  >
                    {month}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
