"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon, Clock, AlertTriangle, CheckCircle, Plus, Filter, Bell } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const upcomingDeadlines = [
  {
    id: 1,
    title: "SPT Masa PPh 23",
    client: "PT Teknologi Maju",
    date: "2025-07-15",
    daysLeft: 7,
    priority: "urgent",
    type: "SPT Masa",
  },
  {
    id: 2,
    title: "SPT Masa PPN",
    client: "CV Berkah Jaya",
    date: "2025-07-31",
    daysLeft: 23,
    priority: "high",
    type: "SPT Masa",
  },
  {
    id: 3,
    title: "PPh 21 Bulanan",
    client: "PT Digital Nusantara",
    date: "2025-08-10",
    daysLeft: 33,
    priority: "medium",
    type: "PPh 21",
  },
  {
    id: 4,
    title: "Laporan Keuangan",
    client: "Ahmad Wijaya",
    date: "2025-08-15",
    daysLeft: 38,
    priority: "low",
    type: "Laporan",
  },
]

const todayTasks = [
  {
    id: 1,
    time: "09:00",
    title: "Review SPT PPh 21 - PT Maju Bersama",
    type: "Review",
    status: "pending",
  },
  {
    id: 2,
    time: "11:00",
    title: "Konsultasi dengan CV Sukses Mandiri",
    type: "Meeting",
    status: "scheduled",
  },
  {
    id: 3,
    time: "14:00",
    title: "Finalisasi PPN - PT Digital Nusantara",
    type: "Work",
    status: "in-progress",
  },
  {
    id: 4,
    time: "16:00",
    title: "Submit SPT Masa PPh 23",
    type: "Submit",
    status: "completed",
  },
]

const monthlyStats = [
  {
    title: "Deadline Bulan Ini",
    value: "24",
    completed: 18,
    pending: 6,
    icon: CalendarIcon,
  },
  {
    title: "SPT Diselesaikan",
    value: "156",
    target: 180,
    percentage: 87,
    icon: CheckCircle,
  },
  {
    title: "Konsultasi Terjadwal",
    value: "32",
    thisWeek: 8,
    icon: Clock,
  },
  {
    title: "Peringatan Aktif",
    value: "3",
    urgent: 1,
    high: 2,
    icon: AlertTriangle,
  },
]

export default function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [viewMode, setViewMode] = useState("month")
  const [filterType, setFilterType] = useState("all")

  const getPriorityBadge = (priority: string) => {
    const config = {
      urgent: { variant: "destructive" as const, label: "Mendesak" },
      high: { variant: "secondary" as const, label: "Tinggi", className: "bg-orange-100 text-orange-800" },
      medium: { variant: "secondary" as const, label: "Sedang", className: "bg-yellow-100 text-yellow-800" },
      low: { variant: "outline" as const, label: "Rendah" },
    }

    const { variant, label, className } = config[priority as keyof typeof config]
    return (
      <Badge variant={variant} className={className}>
        {label}
      </Badge>
    )
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "in-progress":
        return <Clock className="h-4 w-4 text-blue-600" />
      case "scheduled":
        return <CalendarIcon className="h-4 w-4 text-purple-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Kalender & Reminder</h1>
          <p className="text-muted-foreground">Kelola jadwal dan deadline kewajiban perpajakan</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Bell className="mr-2 h-4 w-4" />
            Atur Reminder
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Tambah Jadwal
          </Button>
        </div>
      </div>

      {/* Monthly Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {monthlyStats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                {stat.completed !== undefined && (
                  <p className="text-xs text-muted-foreground">
                    {stat.completed} selesai, {stat.pending} pending
                  </p>
                )}
                {stat.percentage !== undefined && (
                  <p className="text-xs text-muted-foreground">
                    {stat.percentage}% dari target ({stat.target})
                  </p>
                )}
                {stat.thisWeek !== undefined && (
                  <p className="text-xs text-muted-foreground">{stat.thisWeek} minggu ini</p>
                )}
                {stat.urgent !== undefined && (
                  <p className="text-xs text-muted-foreground">
                    {stat.urgent} mendesak, {stat.high} tinggi
                  </p>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Calendar */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Kalender</CardTitle>
            <CardDescription>Pilih tanggal untuk melihat jadwal</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
            <div className="mt-4 space-y-2">
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span>Deadline Mendesak</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span>Deadline Tinggi</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span>Konsultasi</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>Selesai</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Today's Tasks */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Jadwal Hari Ini</CardTitle>
                <CardDescription>
                  {new Date().toLocaleDateString("id-ID", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </CardDescription>
              </div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="completed">Selesai</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {todayTasks.map((task) => (
                <div key={task.id} className="flex items-center space-x-4 p-3 border rounded-lg">
                  <div className="text-sm font-medium text-muted-foreground min-w-[60px]">{task.time}</div>
                  <div className="flex-1">
                    <p className="font-medium">{task.title}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {task.type}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">{getStatusIcon(task.status)}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Deadlines */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Deadline Mendatang</CardTitle>
              <CardDescription>Kewajiban perpajakan yang perlu diselesaikan</CardDescription>
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingDeadlines.map((deadline) => (
              <div
                key={deadline.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium">{deadline.title}</h4>
                    <Badge variant="outline">{deadline.type}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{deadline.client}</p>
                  <p className="text-xs text-muted-foreground">
                    Deadline: {new Date(deadline.date).toLocaleDateString("id-ID")}
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <div className="text-sm font-medium">{deadline.daysLeft} hari lagi</div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(deadline.date).toLocaleDateString("id-ID")}
                    </div>
                  </div>
                  {getPriorityBadge(deadline.priority)}
                  <Button variant="ghost" size="sm">
                    <Bell className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
