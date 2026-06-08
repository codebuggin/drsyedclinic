import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '../supabase'
import {
  Check, CheckCheck, X, Trash2, MessageCircle,
  RefreshCw, Search, Calendar, Clock, MapPin, LogOut,
} from 'lucide-react'
import {
  ResponsiveContainer, BarChart, Bar, XAxis, Tooltip,
  PieChart, Pie, Cell,
} from 'recharts'

/* ─── Constants ─────────────────────────────────── */
const ADMIN_PASSWORD = 'syed@admin2025'
const SESSION_KEY    = 'homeo_admin_authed'
/* ─── Helpers ───────────────────────────────────── */
function todayStr() { return new Date().toISOString().split('T')[0] }

function formatDate(iso) {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
}
function formatDateTime(iso) {
  if (!iso) return '—'
  return new Date(iso).toLocaleString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
  })
}

/* ─── Status pill ───────────────────────────────── */
const statusStyles = {
  pending:   'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
  confirmed: 'bg-green-500/20  text-green-400  border border-green-500/30',
  completed: 'bg-slate-500/20  text-slate-400  border border-slate-500/30',
  cancelled: 'bg-red-500/20    text-red-400    border border-red-500/30',
}
function StatusPill({ status }) {
  return (
    <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize whitespace-nowrap ${statusStyles[status] ?? 'bg-slate-700 text-slate-300'}`}>
      {status}
    </span>
  )
}

/* ─── Branch pill ───────────────────────────────── */
function BranchPill({ branch }) {
  if (!branch) return <span className="text-slate-500">—</span>
  const style = branch === 'Yakutpura'
    ? 'bg-blue-500/20 text-blue-400'
    : 'bg-amber-500/20 text-amber-400'
  return (
    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${style}`}>{branch}</span>
  )
}

/* ─── Skeleton row ──────────────────────────────── */
function SkeletonRow() {
  return (
    <tr>
      {[...Array(10)].map((_, i) => (
        <td key={i} className="px-4 py-4">
          <div className="h-3 bg-[#334155] rounded animate-pulse" style={{ width: `${50 + (i * 17) % 50}%` }} />
        </td>
      ))}
    </tr>
  )
}

/* ─── Mobile booking card ───────────────────────── */
function BookingCard({ booking: b, onStatusChange, onDelete, confirmDeleteId, setConfirmDeleteId }) {
  const isConfirmingDelete = confirmDeleteId === b.id
  const waMsg = encodeURIComponent(
    `Hello ${b.name}, your appointment at Dr. Syed's Advanced Homeo Clinics (${b.location} branch) has been confirmed for ${formatDate(b.preferred_date)}. Please arrive 10 minutes early. Thank you!`
  )
  return (
    <div className="bg-[#1e293b] border border-[#334155] rounded-2xl p-5 space-y-3">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="font-bold text-white">{b.name}</p>
          <a href={`tel:${b.phone}`} className="text-sm font-mono text-[#4ade80]">{b.phone}</a>
        </div>
        <StatusPill status={b.status} />
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        <BranchPill branch={b.location} />
        <span className="text-slate-300 text-sm">{b.condition}</span>
      </div>
      <div className="text-xs text-slate-400 space-y-0.5">
        {b.token_number && <p>🎫 Token #{b.token_number}</p>}
        <p>📅 {formatDate(b.preferred_date)}{b.time_slot ? ` — ${b.time_slot}` : ''}</p>
        <p>🕐 Booked: {formatDateTime(b.created_at)}</p>
        {b.message && <p>💬 {b.message}</p>}
      </div>
      <div className="flex gap-2 flex-wrap pt-1">
        <button onClick={() => onStatusChange(b.id, 'confirmed')} title="Confirm"
          className="flex-1 flex items-center justify-center gap-1 p-2 rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500 hover:text-white transition text-xs font-semibold">
          <Check size={13} /> Confirm
        </button>
        <button onClick={() => onStatusChange(b.id, 'completed')} title="Mark as Done"
          className="flex-1 flex items-center justify-center gap-1 p-2 rounded-lg bg-slate-500/20 text-slate-400 hover:bg-slate-500 hover:text-white transition text-xs font-semibold">
          <CheckCheck size={13} /> Done
        </button>
        <button onClick={() => onStatusChange(b.id, 'cancelled')} title="Cancel"
          className="flex-1 flex items-center justify-center gap-1 p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition text-xs font-semibold">
          <X size={13} /> Cancel
        </button>
        <a href={`https://wa.me/91${b.phone}?text=${waMsg}`} target="_blank" rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-1 p-2 rounded-lg bg-[#25D366]/20 text-[#25D366] hover:bg-[#25D366] hover:text-white transition text-xs font-semibold">
          <MessageCircle size={13} /> WA
        </a>
        <button
          onClick={() => isConfirmingDelete ? onDelete(b.id) : setConfirmDeleteId(b.id)}
          className={`flex items-center justify-center gap-1 px-3 py-2 rounded-lg text-xs font-semibold transition ${isConfirmingDelete ? 'bg-red-500/20 text-red-400' : 'text-slate-600 hover:text-red-400'}`}>
          <Trash2 size={13} />{isConfirmingDelete ? 'Sure?' : ''}
        </button>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════
   LOGIN SCREEN
══════════════════════════════════════════════════ */
function LoginScreen({ onAuth }) {
  const [pw, setPw]       = useState('')
  const [error, setError] = useState(false)
  const [shake, setShake] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (pw === ADMIN_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, '1')
      onAuth(true)
    } else {
      setError(true)
      setShake(true)
      setPw('')
      setTimeout(() => setShake(false), 500)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: '#0f172a' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#1e293b] border border-[#334155] rounded-3xl p-10 w-full max-w-sm shadow-2xl"
      >
        <div className="text-center mb-8">
          <div className="text-4xl mb-3">🌿</div>
          <p className="text-xs font-bold tracking-widest uppercase" style={{ color: '#f59e0b' }}>Dr. Syed's</p>
          <h1 className="text-3xl font-black text-white mt-1">Admin Portal</h1>
          <p className="text-slate-400 text-sm mt-1">Advanced Homeo Clinics — Staff Only</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <motion.div animate={shake ? { x: [-8, 8, -6, 6, 0] } : {}}>
            <input
              type="password"
              value={pw}
              onChange={(e) => { setPw(e.target.value); setError(false) }}
              placeholder="Enter admin password"
              className="w-full bg-[#0f172a] border border-[#334155] text-white rounded-xl px-4 py-3 focus:border-[#4ade80] outline-none transition-colors placeholder:text-slate-600 text-sm"
              autoFocus
            />
          </motion.div>

          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-2"
              >
                Incorrect password. Please try again.
              </motion.p>
            )}
          </AnimatePresence>

          <button type="submit"
            className="w-full font-black py-3 rounded-xl transition-colors text-[#0f172a] hover:bg-green-400"
            style={{ backgroundColor: '#4ade80' }}>
            Enter Dashboard
          </button>
        </form>
      </motion.div>
    </div>
  )
}

/* ══════════════════════════════════════════════════
   DASHBOARD
══════════════════════════════════════════════════ */
function Dashboard({ onLogout }) {
  const [bookings, setBookings]               = useState([])
  const [loading, setLoading]                 = useState(true)
  const [toast, setToast]                     = useState(null)
  const [confirmDeleteId, setConfirmDeleteId] = useState(null)
  const [clock, setClock]                     = useState('')
  const deleteTimerRef                        = useRef(null)

  /* Filters */
  const [branchFilter, setBranchFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')
  const [dateFilter, setDateFilter]     = useState('')
  const [search, setSearch]             = useState('')

  /* ── Live clock ── */
  useEffect(() => {
    const tick = () => setClock(new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' }))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  /* ── Auto-reset delete confirm ── */
  useEffect(() => {
    clearTimeout(deleteTimerRef.current)
    if (confirmDeleteId) {
      deleteTimerRef.current = setTimeout(() => setConfirmDeleteId(null), 3000)
    }
    return () => clearTimeout(deleteTimerRef.current)
  }, [confirmDeleteId])

  /* ── Fetch ── */
  const fetchBookings = useCallback(async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase.from('bookings').select('*').order('created_at', { ascending: false })
      if (!error) setBookings(data ?? [])
    } finally { setLoading(false) }
  }, [])

  useEffect(() => { fetchBookings() }, [fetchBookings])

  /* ── Real-time ── */
  useEffect(() => {
    const channel = supabase
      .channel('bookings-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'bookings' }, (payload) => {
        if (payload.eventType === 'INSERT') {
          setBookings((prev) => [payload.new, ...prev])
          showToast(`New booking from ${payload.new.name}!`)
        } else if (payload.eventType === 'UPDATE') {
          setBookings((prev) => prev.map((b) => b.id === payload.new.id ? payload.new : b))
        } else if (payload.eventType === 'DELETE') {
          setBookings((prev) => prev.filter((b) => b.id !== payload.old.id))
        }
      })
      .subscribe()
    return () => supabase.removeChannel(channel)
  }, [])

  /* ── Toast ── */
  const showToast = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(null), 4000)
  }

  /* ── Status update ── */
  const handleStatusChange = async (id, status) => {
    try {
      const { error } = await supabase.from('bookings').update({ status }).eq('id', id)
      if (!error) setBookings((prev) => prev.map((b) => b.id === id ? { ...b, status } : b))
    } catch { /* silent */ }
  }

  /* ── Delete ── */
  const handleDelete = async (id) => {
    try {
      const { error } = await supabase.from('bookings').delete().eq('id', id)
      if (!error) { setBookings((prev) => prev.filter((b) => b.id !== id)); setConfirmDeleteId(null) }
    } catch { /* silent */ }
  }

  /* ── Stats ── */
  const today          = todayStr()
  const totalCount     = bookings.length
  const todayCount     = bookings.filter((b) => b.created_at?.startsWith(today)).length
  const yakutCount     = bookings.filter((b) => b.location === 'Yakutpura').length
  const mallepallyCount = bookings.filter((b) => b.location === 'Mallepally').length

  const stats = [
    { label: 'Total Bookings',   value: totalCount,      color: 'text-white',         icon: <Calendar size={16} />,  note: null },
    { label: "Today's Bookings", value: todayCount,      color: 'text-[#4ade80]',     icon: <Clock size={16} />,     note: null },
    { label: 'Yakutpura',        value: yakutCount,      color: 'text-[#60a5fa]',     icon: <MapPin size={16} />,    note: 'Mon, Wed & Sat · 10AM – 8PM' },
    { label: 'Mallepally',       value: mallepallyCount, color: 'text-[#f59e0b]',     icon: <MapPin size={16} />,    note: 'Sun, Tue & Thu · 11AM–3PM & 5–8PM' },
  ]

  /* ── Filter ── */
  const filtered = bookings.filter((b) => {
    if (branchFilter !== 'All' && b.location !== branchFilter) return false
    if (statusFilter !== 'All' && b.status !== statusFilter.toLowerCase()) return false
    if (dateFilter && b.preferred_date !== dateFilter) return false
    if (search) {
      const q = search.toLowerCase()
      if (!b.name?.toLowerCase().includes(q) && !b.phone?.includes(q)) return false
    }
    return true
  })

  /* ── WA message ── */
  const waMsg = (b) => encodeURIComponent(
    `Hello ${b.name}, your appointment at Dr. Syed's Advanced Homeo Clinics (${b.location} branch) has been confirmed for ${formatDate(b.preferred_date)}. Please arrive 10 minutes early. Thank you!`
  )

  const currentDate = new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })

  /* Branch / status pill toggle styles */
  const branchActiveStyle = (b) => branchFilter === b
    ? 'bg-[#4ade80] text-[#0f172a] font-bold'
    : 'bg-[#0f172a] text-slate-400 border border-[#334155] hover:border-[#4ade80]'

  const statusActiveMap = {
    All:       'bg-slate-500 text-white',
    Pending:   'bg-yellow-500 text-black',
    Confirmed: 'bg-green-500 text-white',
    Completed: 'bg-slate-500 text-white',
    Cancelled: 'bg-red-500 text-white',
  }
  const statusPillStyle = (s) => statusFilter === s
    ? statusActiveMap[s]
    : 'bg-[#0f172a] text-slate-400 border border-[#334155] hover:border-slate-400'

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0f172a' }}>

      {/* ── Toast ── */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl font-bold text-[#0f172a]"
            style={{ backgroundColor: '#4ade80' }}
          >
            🔔 {toast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Header ── */}
      <header
        className="sticky top-0 z-40 border-b px-8 py-4 flex items-center justify-between"
        style={{ backgroundColor: '#0f172a', borderColor: '#1e293b' }}
      >
        <div>
          <p className="text-xs font-bold tracking-widest uppercase" style={{ color: '#4ade80' }}>
            Dr. Syed's Advanced Homeo Clinics
          </p>
          <p className="text-2xl font-black text-white">Admin Dashboard</p>
        </div>
        <div className="flex items-center gap-5">
          <div className="hidden sm:flex flex-col items-end">
            <p className="text-xs text-slate-500">{currentDate}</p>
            <p className="text-sm font-mono text-white">{clock}</p>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-[#4ade80] font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#4ade80] animate-pulse" />
            Live
          </div>
          <button
            onClick={onLogout}
            className="flex items-center gap-1.5 text-sm font-semibold text-red-400 border border-red-500 px-4 py-2 rounded-xl hover:bg-red-500 hover:text-white transition-colors"
          >
            <LogOut size={14} /> Logout
          </button>
        </div>
      </header>

      <div className="px-4 sm:px-6 py-6 max-w-7xl mx-auto space-y-5">

        {/* ── Stats ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map(({ label, value, color, icon, note }) => (
            <div key={label} className="bg-[#1e293b] border border-[#334155] rounded-2xl p-6 relative">
              <div className="absolute top-4 right-4 text-slate-600">{icon}</div>
              <p className={`text-4xl font-black ${color}`}>{value}</p>
              <p className="text-slate-400 text-sm mt-1">{label}</p>
              {note && <p className="text-slate-500 text-xs italic mt-2">{note}</p>}
            </div>
          ))}
        </div>

        {/* ── Charts ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Bar chart — Bookings This Week */}
          <div className="bg-[#1e293b] border border-[#334155] rounded-2xl p-6">
            <p className="text-white font-bold mb-4">Bookings This Week</p>
            {(() => {
              const days = Array.from({ length: 7 }, (_, i) => {
                const d = new Date()
                d.setDate(d.getDate() - (6 - i))
                return {
                  label: d.toLocaleDateString('en-IN', { weekday: 'short' }),
                  dateStr: d.toISOString().split('T')[0],
                  count: 0,
                }
              })
              bookings.forEach((b) => {
                const ds = b.created_at?.split('T')[0]
                const day = days.find((d) => d.dateStr === ds)
                if (day) day.count++
              })
              const hasData = days.some((d) => d.count > 0)
              if (!hasData) return (
                <div className="h-[200px] flex items-center justify-center text-slate-500 text-sm">No bookings yet</div>
              )
              return (
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={days} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                    <XAxis dataKey="label" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
                    <Tooltip
                      cursor={{ fill: 'rgba(255,255,255,0.04)' }}
                      contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '12px', color: 'white' }}
                      formatter={(v) => [v, 'Bookings']}
                    />
                    <Bar dataKey="count" fill="#4ade80" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )
            })()}
          </div>

          {/* Donut chart — Branch Distribution */}
          <div className="bg-[#1e293b] border border-[#334155] rounded-2xl p-6">
            <p className="text-white font-bold mb-4">Branch Distribution</p>
            {(() => {
              const yakut = bookings.filter((b) => b.location === 'Yakutpura').length
              const malle = bookings.filter((b) => b.location === 'Mallepally').length
              const total = yakut + malle
              if (total === 0) return (
                <div className="h-[200px] flex items-center justify-center text-slate-500 text-sm">No bookings yet</div>
              )
              const data = [
                { name: 'Yakutpura', value: yakut, color: '#60a5fa' },
                { name: 'Mallepally', value: malle, color: '#f59e0b' },
              ]
              return (
                <div>
                  <ResponsiveContainer width="100%" height={160}>
                    <PieChart>
                      <Pie data={data} cx="50%" cy="50%" innerRadius={50} outerRadius={70} dataKey="value" strokeWidth={0}>
                        {data.map((entry) => (
                          <Cell key={entry.name} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '12px', color: 'white' }}
                        formatter={(v) => [v, 'Bookings']}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex justify-center gap-6 mt-2">
                    {data.map((d) => (
                      <div key={d.name} className="flex items-center gap-2 text-sm">
                        <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: d.color }} />
                        <span className="text-slate-300">{d.name}</span>
                        <span className="font-bold" style={{ color: d.color }}>{d.value}</span>
                        <span className="text-slate-500 text-xs">({total ? Math.round((d.value / total) * 100) : 0}%)</span>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })()}
          </div>
        </div>

        {/* ── Filter bar ── */}
        <div className="bg-[#1e293b] border border-[#334155] rounded-2xl p-4 flex flex-wrap gap-3 items-center">
          {/* Branch */}
          <div className="flex gap-1.5">
            {['All', 'Yakutpura', 'Mallepally'].map((b) => (
              <button key={b} onClick={() => setBranchFilter(b)}
                className={`px-3 py-1.5 rounded-full text-xs transition-colors ${branchActiveStyle(b)}`}>
                {b}
              </button>
            ))}
          </div>
          {/* Status */}
          <div className="flex gap-1.5 flex-wrap">
            {['All', 'Pending', 'Confirmed', 'Completed', 'Cancelled'].map((s) => (
              <button key={s} onClick={() => setStatusFilter(s)}
                className={`px-3 py-1.5 rounded-full text-xs transition-colors ${statusPillStyle(s)}`}>
                {s}
              </button>
            ))}
          </div>
          {/* Date */}
          <div className="flex items-center gap-2 bg-[#0f172a] border border-[#334155] rounded-xl px-3 py-2">
            <Calendar size={13} className="text-slate-500" />
            <input type="date" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)}
              className="text-sm text-white bg-transparent outline-none [color-scheme:dark]" />
          </div>
          {/* Search */}
          <div className="flex items-center gap-2 bg-[#0f172a] border border-[#334155] rounded-xl px-3 py-2 flex-1 min-w-[180px]">
            <Search size={13} className="text-slate-500 flex-shrink-0" />
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name or phone…"
              className="text-sm text-white bg-transparent outline-none w-full placeholder:text-slate-600" />
          </div>
          {/* Refresh */}
          <button onClick={fetchBookings}
            className="flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm text-[#0f172a] hover:bg-green-400 transition-colors ml-auto"
            style={{ backgroundColor: '#4ade80' }}>
            <RefreshCw size={14} /> Refresh
          </button>
        </div>

        {/* ── Desktop table ── */}
        <div className="hidden md:block bg-[#1e293b] border border-[#334155] rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead style={{ backgroundColor: '#0f172a' }}>
                <tr>
                  {['#', 'Token', 'Patient', 'Phone', 'Branch', 'Condition', 'Date', 'Time Slot', 'Booked At', 'Status', 'Actions'].map((h) => (
                    <th key={h} className="py-4 px-4 text-left text-xs font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  [...Array(5)].map((_, i) => <SkeletonRow key={i} />)
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={11} className="py-20 text-center">
                      <div className="text-5xl mb-4">📋</div>
                      <p className="text-xl font-bold text-white">No bookings yet</p>
                      <p className="text-slate-400 mt-2">New bookings will appear here in real-time</p>
                    </td>
                  </tr>
                ) : (
                  filtered.map((b, idx) => {
                    const isConfirmingDelete = confirmDeleteId === b.id
                    return (
                      <tr key={b.id}
                        className="border-t border-[#334155] hover:bg-white/5 transition-colors">
                        <td className="px-4 py-4 text-slate-500 text-xs">{idx + 1}</td>
                        <td className="px-4 py-4">
                          {b.token_number ? (
                            <span className="inline-flex items-center justify-center min-w-[2.25rem] px-2 py-1 rounded-full text-xs font-bold bg-[#4ade80]/20 text-[#4ade80]">
                              #{b.token_number}
                            </span>
                          ) : (
                            <span className="text-slate-600">—</span>
                          )}
                        </td>
                        <td className="px-4 py-4 font-semibold text-white whitespace-nowrap">{b.name}</td>
                        <td className="px-4 py-4">
                          <a href={`tel:${b.phone}`} className="font-mono text-[#4ade80] hover:text-green-300 text-sm">{b.phone}</a>
                        </td>
                        <td className="px-4 py-4"><BranchPill branch={b.location} /></td>
                        <td className="px-4 py-4 text-slate-300 max-w-[120px] truncate">{b.condition}</td>
                        <td className="px-4 py-4 text-slate-400 whitespace-nowrap">{formatDate(b.preferred_date)}</td>
                        <td className="px-4 py-4 text-slate-500 text-xs max-w-[120px]">{b.time_slot || '—'}</td>
                        <td className="px-4 py-4 text-slate-500 text-xs whitespace-nowrap">{formatDateTime(b.created_at)}</td>
                        <td className="px-4 py-4"><StatusPill status={b.status} /></td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-1">
                            <button onClick={() => handleStatusChange(b.id, 'confirmed')} title="Confirm"
                              className="p-2 rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500 hover:text-white transition">
                              <Check size={14} />
                            </button>
                            <button onClick={() => handleStatusChange(b.id, 'completed')} title="Mark as Done"
                              className="p-2 rounded-lg bg-slate-500/20 text-slate-400 hover:bg-slate-500 hover:text-white transition">
                              <CheckCheck size={14} />
                            </button>
                            <button onClick={() => handleStatusChange(b.id, 'cancelled')} title="Cancel"
                              className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition">
                              <X size={14} />
                            </button>
                            <a href={`https://wa.me/91${b.phone}?text=${waMsg(b)}`} target="_blank" rel="noopener noreferrer" title="WhatsApp"
                              className="p-2 rounded-lg bg-[#25D366]/20 text-[#25D366] hover:bg-[#25D366] hover:text-white transition">
                              <MessageCircle size={14} />
                            </a>
                            <button
                              onClick={() => isConfirmingDelete ? handleDelete(b.id) : setConfirmDeleteId(b.id)}
                              title="Delete"
                              className={`transition rounded-lg text-xs font-semibold ${isConfirmingDelete ? 'bg-red-500/20 text-red-400 px-2 py-1' : 'p-2 text-slate-600 hover:text-red-400'}`}>
                              {isConfirmingDelete ? 'Sure?' : <Trash2 size={14} />}
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Mobile cards ── */}
        <div className="md:hidden space-y-4">
          {loading ? (
            [...Array(3)].map((_, i) => (
              <div key={i} className="bg-[#1e293b] rounded-2xl p-4 space-y-3 animate-pulse">
                <div className="h-4 bg-[#334155] rounded w-1/2" />
                <div className="h-3 bg-[#334155] rounded w-3/4" />
                <div className="h-3 bg-[#334155] rounded w-2/3" />
              </div>
            ))
          ) : filtered.length === 0 ? (
            <div className="bg-[#1e293b] rounded-2xl p-16 text-center">
              <div className="text-5xl mb-4">📋</div>
              <p className="text-xl font-bold text-white">No bookings yet</p>
              <p className="text-slate-400 mt-2">New bookings will appear here in real-time</p>
            </div>
          ) : (
            filtered.map((b) => (
              <BookingCard key={b.id} booking={b}
                onStatusChange={handleStatusChange}
                onDelete={handleDelete}
                confirmDeleteId={confirmDeleteId}
                setConfirmDeleteId={setConfirmDeleteId}
              />
            ))
          )}
        </div>

        {/* Row count */}
        {!loading && (
          <p className="text-xs text-slate-600 text-right">
            Showing {filtered.length} of {bookings.length} bookings
          </p>
        )}
      </div>

      {/* ── Dashboard footer ── */}
      <div className="border-t border-[#1e293b] py-4 text-center">
        <p className="text-slate-600 text-xs">
          Dr. Syed's Advanced Homeo Clinics · Admin Portal · Built by AVL Innovations
        </p>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════════════════ */
export default function Admin() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(SESSION_KEY) === '1')
  const handleLogout = () => { sessionStorage.removeItem(SESSION_KEY); setAuthed(false) }
  return authed ? <Dashboard onLogout={handleLogout} /> : <LoginScreen onAuth={setAuthed} />
}
