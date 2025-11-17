import { DayPicker } from 'react-day-picker';
import 'react-day-picker/style.css';
import { Dispatch, SetStateAction, useMemo, useState, useCallback } from 'react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2';
import type { SentimentData } from '../types/sentiment';
import { formatDateDisplay, getWeekRange } from '../utils/date';

type FilterName = 'latest' | 'daily' | 'weekly' | 'monthly';

interface FilterState {
  name: FilterName;
  key: number;
}

interface OptionState {
  date?: string | false;
  from_date?: string | false;
  to_date?: string | false;
  month?: string | false;
  year?: string | false;
}

interface DateDisplayProps {
  datas: SentimentData | null;
  filter: FilterState;
  setFilter: Dispatch<SetStateAction<FilterState>>;
  setOption: Dispatch<SetStateAction<OptionState>>;
  selected: Date | undefined;
  setSelected: Dispatch<SetStateAction<Date>>;
  selectedWeek: Date | undefined;
  setSelectedWeek: Dispatch<SetStateAction<Date>>;
}

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agt', 'Sep', 'Okt', 'Nov', 'Des'];

export default function DateDisplay({
  datas,
  setFilter,
  filter,
  setOption,
  selected,
  setSelected,
  selectedWeek,
  setSelectedWeek,
}: DateDisplayProps) {
  const [selectedMonth, setSelectedMonth] = useState<Date>(new Date());
  const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());
  const [hoveredWeek, setHoveredWeek] = useState<Date | null>(null);
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const filterList = ['latest', 'daily', 'weekly', 'monthly'] as const;
  const dateDisplay = useMemo(() => formatDateDisplay(datas), [datas]);

  const handleDateSelect = useCallback(
    (date: Date | undefined) => {
      if (date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;

        setSelected(date);

        setOption((prev) => ({
          ...prev,
          date: formattedDate,
          from_date: false,
          to_date: false,
          month: false,
          year: false,
        }));
        setFilter((prev) => ({
          ...prev,
          key: prev.key + 1,
        }));
        setIsPickerVisible(false);
      }
    },
    [setOption, setFilter, setSelected]
  );

  const handleWeekSelect = useCallback(
    (date: Date | undefined) => {
      if (date) {
        const { from, to } = getWeekRange(date);
        setSelectedWeek(from);

        const fromYear = from.getFullYear();
        const fromMonth = String(from.getMonth() + 1).padStart(2, '0');
        const fromDay = String(from.getDate()).padStart(2, '0');
        const fromFormatted = `${fromYear}-${fromMonth}-${fromDay}`;

        const toYear = to.getFullYear();
        const toMonth = String(to.getMonth() + 1).padStart(2, '0');
        const toDay = String(to.getDate()).padStart(2, '0');
        const toFormatted = `${toYear}-${toMonth}-${toDay}`;

        setOption((prev) => ({
          ...prev,
          date: false,
          from_date: fromFormatted,
          to_date: toFormatted,
          month: false,
          year: false,
        }));
        setFilter((prev) => ({
          ...prev,
          key: prev.key + 1,
        }));
        setIsPickerVisible(false);
      }
    },
    [setOption, setFilter, setSelectedWeek]
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
      setFilter((prev) => ({
        ...prev,
        key: prev.key + 1,
      }));
      setIsPickerVisible(false);
    },
    [setOption, setFilter]
  );

  const handleFilterChange = useCallback(
    (newFilter: (typeof filterList)[number]) => {
      setFilter((prev) => ({
        name: newFilter,
        key: newFilter === 'latest' ? prev.key + 1 : prev.key,
      }));
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
      if (filt !== 'latest' && filter.name === filt) {
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
      <div className="bg-white/95 rounded-lg px-4 py-2.5 shadow-md backdrop-blur-sm border border-gray-100 flex items-center gap-2">
        <span className="text-xs text-gray-500 font-medium">Data per:</span>
        <span className="text-xs font-semibold text-gray-800">{dateDisplay}</span>
      </div>
      <div className="relative flex items-center gap-1.5 bg-white/95 px-2 py-1.5 rounded-lg shadow-md border border-gray-100">
        {filterList.map((filt) => (
          <button
            key={filt}
            onClick={() => handleFilterChange(filt)}
            onMouseEnter={() => handleMouseEnterFilter(filt)}
            className={`text-xs font-medium px-3 py-1.5 rounded-md transition-all duration-200 ease-in-out ${
              filter.name === filt
                ? 'bg-[#F05454] text-white shadow-sm scale-105'
                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            {filt === 'latest' ? 'Latest' : filt.charAt(0).toUpperCase() + filt.slice(1)}
          </button>
        ))}

        {filter.name === 'daily' && isPickerVisible && (
          <div
            className="absolute right-0 top-12 bg-white p-5 z-1200 rounded-xl shadow-2xl border border-gray-200 animate-slideDown"
            onMouseLeave={handleMouseLeavePickerDaily}
          >
            <DayPicker
              mode="single"
              selected={selected}
              onSelect={handleDateSelect}
              defaultMonth={selected}
              className="date-picker-daily"
            />
          </div>
        )}

        {filter.name === 'weekly' && isPickerVisible && (
          <div
            className="absolute right-0 top-12 bg-white p-5 z-1200 rounded-xl shadow-2xl border border-gray-200 animate-slideDown"
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
              className="date-picker-weekly"
            />
          </div>
        )}

        {filter.name === 'monthly' && isPickerVisible && (
          <div
            className="absolute right-0 top-12 bg-white p-5 z-1200 rounded-xl shadow-2xl border border-gray-200 w-[300px] animate-slideDown"
            onMouseLeave={handleMouseLeavePickerMonthly}
          >
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200">
              <button
                onClick={handleYearDecrement}
                className="p-1.5 hover:bg-gray-100 rounded-lg transition-all duration-200 hover:scale-110"
                aria-label="Previous year"
              >
                <HiChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <span className="text-base font-bold text-gray-800">{currentYear}</span>
              <button
                onClick={handleYearIncrement}
                className="p-1.5 hover:bg-gray-100 rounded-lg transition-all duration-200 hover:scale-110"
                aria-label="Next year"
              >
                <HiChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2.5">
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
                      px-3 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 
                      ${
                        isSelected
                          ? 'bg-[#F05454] text-white shadow-md scale-105'
                          : 'bg-gray-50 text-gray-700 hover:bg-[#FCA5A5] hover:text-white hover:scale-105 hover:shadow-sm'
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
