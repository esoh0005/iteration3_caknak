import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import type { SupabaseClient } from '@supabase/supabase-js';
import { Tooltip } from 'react-tooltip'; // using v5

// custom swipe component for navigation
import SwipeRight from '~/app/_components/swipe-right';
import './swipe-right.css';


// types for our data structures
interface RansomwareAttack {
  id: number;
  published: string;
  // other fields we might use later
}

interface Week {
  start: Date;
  end: Date;
  label: string;
  month: number;
  weekOfMonth: number;
}

interface WeekData {
  label: string;
  count: number;
  fullLabel: string;
  dates: string;
  placeholder?: boolean;
}

type HeatmapByMonth = Record<string, WeekData[]>;

interface StatCardProps {
  emoji: string;
  label: string;
  count: number;
  source?: string;      // country code for victim data
}

// css-in-js for our dashboard ui
// using ancient scroll/parchment theme with ochre/sienna color palette
const styles = {
  container: {
    padding: '2rem',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  cardContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1rem',
    marginTop: '2rem',
    justifyContent: 'center',
  },
  card: {
    flex: '1 0 200px',
    background: '#f1f1f1',
    borderRadius: '12px',
    padding: '1.5rem',
    textAlign: 'center',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  },
  cardEmoji: { fontSize: '2rem', marginBottom: '0.5rem' },
  cardTitle: { margin: '0.5rem 0', fontWeight: 'bold' },
  cardValue: { fontSize: '1.8rem', color: '#2e7d32' },
  cardSource: {
    marginTop: '0.5rem',
    fontWeight: 'bold',
    fontSize: '0.9rem',
    color: '#777777',
  },
  heatmapSection: { marginTop: '3rem' },
  heatmapTitle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '1.5rem',
    marginTop: '2rem',
    color: '#666',
  },
  heatmapRows: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    alignItems: 'center',
  },
  heatmapRow: { display: 'flex', gap: '2rem', justifyContent: 'center' },
  monthContainer: { display: 'flex', flexDirection: 'column', alignItems: 'center' },
  monthLabel: { fontWeight: 'bold', color: '#fff', marginBottom: '0.5rem' },
  weeksContainer: { display: 'flex', gap: '0.3rem' },
  weekBox: {
    width: '2rem',
    height: '2rem',
    borderRadius: '4px',
    background: '#ebedf0',
    cursor: 'pointer',
    transition: 'transform 0.1s ease',
  },
  weekLabel: { fontSize: '0.7rem', textAlign: 'center', color: '#fff', marginTop: '0.2rem' },
  emptyWeek: { background: '#ebedf0' },
  level1: { background: '#f4e0c1' }, // light parchment-peach
  level2: { background: '#e8c69d' }, // warm sand
  level3: { background: '#dcaa72' }, // amber ochre
  level4: { background: '#c4884c' }, // burnt sienna / deep rust

  // dark wood background for the heatmap
  heatmapWrapper: {
    backgroundColor: '#3b2a1a',
    borderRadius: '12px',
    padding: '1rem',
    color: '#fff',
    marginTop: '1rem',
  },
} as const;

// database connection config
const supabaseUrl = "https://ektqafpmakngeshistpk.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVrdHFhZnBtYWtuZ2VzaGlzdHBrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NDg2NTMxNCwiZXhwIjoyMDYwNDQxMzE0fQ.YhCIciKYk6_oOvSYPSmXeKj9MMwMXM7Wq9ricgbrADE";
const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

// card component for displaying stats with emoji icon
const StatCard: React.FC<StatCardProps> = ({ emoji, label, count, source = 'US' }) => {
  let iconElement: React.ReactNode;
  switch (label) {
    case "Victims":
      iconElement = <div style={styles.cardEmoji}>⚔️</div>;
      break;
    case "This Month":
      iconElement = <div style={styles.cardEmoji}>🌕</div>;
      break;
    case "This Year":
      iconElement = <div style={styles.cardEmoji}>☀️</div>;
      break;
    default:
      iconElement = <div style={styles.cardEmoji}>{emoji}</div>;
  }

  return (
    <div style={styles.card}>
      {iconElement}
      <h3 style={styles.cardTitle}>{label}</h3>
      <p style={styles.cardValue}>{count}</p>

      {label === "Victims" && (
        <p style={styles.cardSource}>
          Latest: {source}
        </p>
      )}
    </div>
  );
};

// calculates which week number within the month (1-5) a date falls on
const getWeekOfMonth = (d: Date) =>
  Math.ceil((d.getDate() + new Date(d.getFullYear(), d.getMonth(), 1).getDay()) / 7);

// formats a date as "Mon W#" (e.g., "Jan W2")
const formatMonthWeek = (d: Date) =>
  `${['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][d.getMonth()]} W${getWeekOfMonth(d)}`;

// generates all weeks for a given year as structured objects
const getAllWeeksInYear = (year: number): Week[] => {
  const weeks: Week[] = [];
  const curr = new Date(year, 0, 1);
  // adjust to start of week (sunday)
  while (curr.getDay() !== 0) curr.setDate(curr.getDate() - 1);
  while (curr.getFullYear() <= year) {
    const start = new Date(curr);
    const mid = new Date(curr);
    mid.setDate(mid.getDate() + 3);
    curr.setDate(curr.getDate() + 6);
    const end = new Date(curr);
    if (end.getFullYear() >= year && start.getFullYear() <= year) {
      weeks.push({
        start,
        end,
        label: formatMonthWeek(mid),
        month: mid.getMonth(),
        weekOfMonth: getWeekOfMonth(mid),
      });
    }
    curr.setDate(curr.getDate() + 1);
  }
  return weeks;
};

// main dashboard component
const DataVis: React.FC = () => {
  const [ransomData, setRansomData] = useState<RansomwareAttack[]>([]);
  const [heatmapByMonth, setHeatmapByMonth] = useState<HeatmapByMonth>({});
  const [isLoading, setIsLoading] = useState(true);

  // fetch data from supabase on component mount
  useEffect(() => {
    void (async () => {
      // fetch all ransomware attacks, sorted by date (newest first)
      const { data, error } = await supabase
        .from('asean_ransomware')
        .select('*')
        .order('published', { ascending: false });
  
      if (error) {
        console.error('fetch error:', error);
        return;
      }
  
      if (data) {
        // cast to our type
        const rows = data as RansomwareAttack[];
        setRansomData(rows);
        processWeeklyData(rows);
      }
    })();
  }, []);
  
  // transform raw data into weekly heatmap format
  const processWeeklyData = (data: RansomwareAttack[]) => {
    const year = new Date().getFullYear();
    const allWeeks = getAllWeeksInYear(year);
    const map: Record<string, number> = {};
    allWeeks.forEach(wk => (map[wk.label] = 0));

    // count attacks per week
    data.forEach(item => {
      if (item.published) {
        const d = new Date(item.published);
        if (d.getFullYear() === year) {
          const key = formatMonthWeek(d);
          map[key] = (map[key] ?? 0) + 1;
        }
      }
    });

    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const result: HeatmapByMonth = {};

    // organize by month for the heatmap display
    months.forEach(mn => {
      const weeksForMonth = allWeeks
        .filter(wk => wk.label.startsWith(mn))
        .sort((a, b) => a.weekOfMonth - b.weekOfMonth)
        .slice(0, 4);

      result[mn] = weeksForMonth.map(wk => ({
        label: `W${wk.weekOfMonth}`,
        count: map[wk.label] ?? 0,
        fullLabel: wk.label,
        dates: `${wk.start.toLocaleDateString()} - ${wk.end.toLocaleDateString()}`,
      }));

      // ensure each month has exactly 4 weeks for consistent display
      while (result[mn].length < 4) {
        const idx = result[mn].length + 1;
        result[mn].push({
          label: `W${idx}`,
          count: 0,
          fullLabel: `${mn} W${idx}`,
          dates: 'No data',
          placeholder: true,
        });
      }
    });

    setHeatmapByMonth(result);
    setIsLoading(false);
  };

  // count incidents from current month
  const getThisMonthCount = (data: RansomwareAttack[]) =>
    data.filter(i => {
      if (!i.published) return false;
      const d = new Date(i.published);
      return (
        d.getMonth() === new Date().getMonth() &&
        d.getFullYear() === new Date().getFullYear()
      );
    }).length;

  // count incidents from current year
  const getThisYearCount = (data: RansomwareAttack[]) =>
    data.filter(i =>
      i.published
        ? new Date(i.published).getFullYear() === new Date().getFullYear()
        : false
    ).length;

  // determine heatmap color based on incident count
  // more attacks = darker color on our ochre scale
  const getColorClass = (count: number) =>
    count === 0
      ? styles.emptyWeek
      : count > 10
      ? styles.level4
      : count > 5
      ? styles.level3
      : count > 2
      ? styles.level2
      : styles.level1;

  // creates the two-row horizontal heatmap
  // top row is jan-jun, bottom row is jul-dec
  const renderHorizontalHeatmap = () => {
    const months = Object.keys(heatmapByMonth);
    const firstRow = months.slice(0, 6);
    const secondRow = months.slice(6);

    return (
      <div style={styles.heatmapRows}>
        {[firstRow, secondRow].map((row, ri) => (
          <div key={ri} style={styles.heatmapRow}>
            {row.map(mn => (
              <div key={mn} style={styles.monthContainer}>
                <div style={styles.monthLabel}>{mn}</div>
                {/* weeks container for this month */}
                <div style={styles.weeksContainer}>
                  {(heatmapByMonth[mn] ?? []).map((wk, idx) => (
                    <div key={idx}>
                      <div
                        style={{ ...styles.weekBox, ...getColorClass(wk.count) }}
                        data-tooltip-id="heatmap-tooltip"
                        data-tooltip-content={`${wk.fullLabel}: ${wk.count} attacks`}
                      />
                      <div style={styles.weekLabel}>{wk.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div style={styles.container}>
      <h1
        style={{
          display: 'block',
          width: 'fit-content',
          margin: '1rem auto 0',
          backgroundColor: 'rgba(255,255,255,0.75)',
          padding: '0.5rem 0.5rem',
          borderRadius: '0.25rem',
        }}
        className="text-4xl text-[#5b4636] tracking-wide uppercase"
      >
        {/* main title banner with warning emoji */}
        ⚠️ASEAN RANSOMWARE ATTACKS⚠️
      </h1>

      {/* stat cards */}
      <div style={styles.cardContainer}>
        <StatCard emoji="🌕" label="This Month" count={getThisMonthCount(ransomData)} />
        {/* pass source="MY" or whatever country code you want */}
        <StatCard emoji="⚔️" label="Victims" count={ransomData.length} source="MY" />
        <StatCard emoji="☀️" label="This Year" count={getThisYearCount(ransomData)} />
      </div>

      {/* heatmap */}
      <div style={styles.heatmapSection}>
        <h3
          style={{
            display: 'block',
            width: 'fit-content',
            margin: '1rem auto 0',
            backgroundColor: 'rgba(44,28,15,0.85)',
            color: '#f8f1e7',
            padding: '0.5rem 0.5rem',
            borderRadius: '0.25rem',
          }}
          className="text-2xl tracking-wide uppercase"
        >
          {/* section title for the heatmap */}
          🏹 Weekly Attack Heatmap 🏹
        </h3>

        {isLoading ? (
          // show loading indicator while data is being fetched
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            loading heatmap data...
          </div>
        ) : (
          <div style={styles.heatmapWrapper}>
            {renderHorizontalHeatmap()}
            <Tooltip id="heatmap-tooltip" />
            <p
      style={{
        textAlign: 'center',
        marginTop: '1rem',
        fontSize: '14px',
        color: '#dcdcdc',
        fontStyle: 'italic',
      }}
    >
      {/* data source attribution with link */}
      Live data sourced from{' '}
      <a
        href="https://ransomware.live"
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: '#ffd966', textDecoration: 'underline' }}
      >
        Ransomware.live
      </a>
    </p>
  </div>
)}

<style>
  {`
    /* animations for text elements to fade in from bottom */
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .animated-text {
      animation: fadeInUp 0.8s ease-out both;
    }

    /* staggered timing for sequential animations */
    .animated-delay-1 { animation-delay: 0.2s; }
    .animated-delay-2 { animation-delay: 0.4s; }
    .animated-delay-3 { animation-delay: 0.6s; }
  `}
</style>


<p
  className="animated-text animated-delay-1"
  style={{
    maxWidth: '800px',
    margin: '2rem auto 0',
    textAlign: 'center',
    color: '#5b4636',
    fontSize: '20px',
    lineHeight: '1.6',
  }}
>
{/* intro text with link to ransomware explanation */}
<a 
    href="https://www.youtube.com/watch?v=e_CrzLvDHI8" 
    target="_blank" 
    style={{ textDecoration: 'underline', color: '#c25d5d', fontWeight: 'bold' }}
  >
    Ransomware
  </a> is just one threat in Southeast Asia&apos;s growing cybercrime landscape.
</p>

<p
  className="animated-text animated-delay-2"
  style={{
    maxWidth: '800px',
    margin: '2rem auto 0',
    textAlign: 'center',
    color: '#fefae0', // light brwon
    backgroundColor: '#66492d', // deep brown
    fontSize: '30px',
    lineHeight: '1.6',
    padding: '0.5rem 1rem',
    borderRadius: '8px',
    width: 'fit-content',
    fontWeight: '600',
  }}
>
  {/* highlighted question to draw attention */}
  But what about the others?
</p>
<p
  className="animated-text animated-delay-3"
  style={{
    maxWidth: '600px',
    margin: '2rem auto 0',
    textAlign: 'center',
    color: '#5b4636',
    fontSize: '25px',
    lineHeight: '1.6',
  }}
>
  {/* call to action introducing the interactive story */}
  Step into our interactive story with real Malaysian cybercrime data so you can better:
</p>



        <div
  style={{
    display: 'flex',
    justifyContent: 'center',
    gap: '2rem',
    marginTop: '1.5rem',
    flexWrap: 'wrap',
  }}
>
  {/* three key benefits displayed as icons with text */}
  <div style={{ fontWeight: 'bold', color: '#5b4636', fontSize: '1.5rem' }}>
    🔍 Spot Danger
  </div>
  <div style={{ fontWeight: 'bold', color: '#5b4636', fontSize: '1.5rem' }}>
    🧠 Make Choices
  </div>
  <div style={{ fontWeight: 'bold', color: '#5b4636', fontSize: '1.5rem' }}>
    🛡️ Level Up
  </div>
</div>
      </div>
      <div style={{ marginTop: '4rem' }}>
    {/* user will unlock before playng game*/}
    <SwipeRight />
  </div>
      
    </div>



  );
};

export default DataVis;