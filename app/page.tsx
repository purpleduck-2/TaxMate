"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Users,
  FileText,
  Calendar,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  BarChart3,
} from "lucide-react"

export default function Dashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("monthly")

  const stats = [
    {
      title: "Total Klien",
      value: "248",
      change: "+12%",
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "SPT Selesai",
      value: "156",
      change: "+8%",
      icon: FileText,
      color: "text-green-600",
    },
    {
      title: "Pendapatan Bulan Ini",
      value: "Rp 125.5M",
      change: "+15%",
      icon: DollarSign,
      color: "text-purple-600",
    },
    {
      title: "Tingkat Kepatuhan",
      value: "98.5%",
      change: "+2%",
      icon: CheckCircle,
      color: "text-emerald-600",
    },
  ]

  const upcomingDeadlines = [
    {
      client: "PT Maju Bersama",
      task: "SPT Masa PPh 23",
      deadline: "15 Juli 2025",
      status: "urgent",
      daysLeft: 7,
    },
    {
      client: "CV Sukses Mandiri",
      task: "SPT Masa PPN",
      deadline: "31 Juli 2025",
      status: "warning",
      daysLeft: 23,
    },
    {
      client: "PT Digital Nusantara",
      task: "PPh 21 Bulanan",
      deadline: "10 Agustus 2025",
      status: "normal",
      daysLeft: 33,
    },
  ]

  const recentActivities = [
    {
      action: "SPT PPh 21 disubmit",
      client: "PT Teknologi Maju",
      time: "2 jam lalu",
      status: "completed",
    },
    {
      action: "Dokumen diunggah",
      client: "CV Berkah Jaya",
      time: "4 jam lalu",
      status: "pending",
    },
    {
      action: "Konsultasi dijadwalkan",
      client: "PT Inovasi Digital",
      time: "6 jam lalu",
      status: "scheduled",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Selamat datang kembali! Berikut ringkasan aktivitas hari ini.</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant={selectedPeriod === "daily" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedPeriod("daily")}
          >
            Harian
          </Button>
          <Button
            variant={selectedPeriod === "monthly" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedPeriod("monthly")}
          >
            Bulanan
          </Button>
          <Button
            variant={selectedPeriod === "yearly" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedPeriod("yearly")}
          >
            Tahunan
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">{stat.change}</span> dari bulan lalu
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Upcoming Deadlines */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Deadline Mendatang
            </CardTitle>
            <CardDescription>Kewajiban pajak yang perlu diselesaikan segera</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingDeadlines.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="space-y-1">
                    <p className="font-medium">{item.client}</p>
                    <p className="text-sm text-muted-foreground">{item.task}</p>
                    <p className="text-xs text-muted-foreground">{item.deadline}</p>
                  </div>
                  <div className="text-right">
                    <Badge
                      variant={
                        item.status === "urgent" ? "destructive" : item.status === "warning" ? "secondary" : "outline"
                      }
                    >
                      {item.daysLeft} hari
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Aktivitas Terbaru
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div
                    className={`w-2 h-2 rounded-full mt-2 ${
                      activity.status === "completed"
                        ? "bg-green-500"
                        : activity.status === "pending"
                          ? "bg-yellow-500"
                          : "bg-blue-500"
                    }`}
                  />
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.client}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Overview */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Performa Tim
            </CardTitle>
            <CardDescription>Produktivitas dan efisiensi tim konsultan</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>SPT Diselesaikan</span>
                <span>85%</span>
              </div>
              <Progress value={85} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Tingkat Akurasi</span>
                <span>98%</span>
              </div>
              <Progress value={98} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Kepuasan Klien</span>
                <span>92%</span>
              </div>
              <Progress value={92} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Peringatan Sistem
            </CardTitle>
            <CardDescription>Notifikasi penting yang memerlukan perhatian</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                <div>
                  <p className="text-sm font-medium text-red-800">3 SPT mendekati deadline</p>
                  <p className="text-xs text-red-600">Perlu tindakan segera</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <Clock className="h-4 w-4 text-yellow-600" />
                <div>
                  <p className="text-sm font-medium text-yellow-800">Update regulasi tersedia</p>
                  <p className="text-xs text-yellow-600">Peraturan DJP terbaru</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <BarChart3 className="h-4 w-4 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-blue-800">Laporan bulanan siap</p>
                  <p className="text-xs text-blue-600">Review performa Juli 2025</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
