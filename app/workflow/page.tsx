"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Workflow, Play, Pause, CheckCircle, Clock, AlertTriangle, Users, Plus, Settings, Eye } from "lucide-react"

const workflowTemplates = [
  {
    id: "spt-pph21",
    name: "SPT PPh 21 Workflow",
    description: "Proses lengkap untuk SPT Masa PPh 21",
    steps: 6,
    estimatedTime: "2-3 hari",
    category: "SPT Masa",
    status: "Active",
  },
  {
    id: "spt-ppn",
    name: "SPT PPN Workflow",
    description: "Proses lengkap untuk SPT Masa PPN",
    steps: 8,
    estimatedTime: "3-4 hari",
    category: "SPT Masa",
    status: "Active",
  },
  {
    id: "audit-prep",
    name: "Audit Preparation",
    description: "Persiapan dokumen untuk audit pajak",
    steps: 12,
    estimatedTime: "1-2 minggu",
    category: "Audit",
    status: "Active",
  },
  {
    id: "client-onboarding",
    name: "Client Onboarding",
    description: "Proses onboarding klien baru",
    steps: 5,
    estimatedTime: "1-2 hari",
    category: "Onboarding",
    status: "Active",
  },
]

const activeWorkflows = [
  {
    id: 1,
    client: "PT Teknologi Maju",
    workflow: "SPT PPh 21 Workflow",
    currentStep: "Review Dokumen",
    progress: 60,
    assignee: "Ahmad Wijaya",
    dueDate: "2025-07-15",
    status: "In Progress",
    priority: "High",
  },
  {
    id: 2,
    client: "CV Berkah Jaya",
    workflow: "SPT PPN Workflow",
    currentStep: "Perhitungan Pajak",
    progress: 40,
    assignee: "Siti Rahayu",
    dueDate: "2025-07-20",
    status: "In Progress",
    priority: "Medium",
  },
  {
    id: 3,
    client: "PT Digital Nusantara",
    workflow: "Audit Preparation",
    currentStep: "Kompilasi Dokumen",
    progress: 25,
    assignee: "Budi Santoso",
    dueDate: "2025-07-30",
    status: "In Progress",
    priority: "Low",
  },
]

const workflowSteps = [
  {
    id: 1,
    name: "Pengumpulan Dokumen",
    description: "Kumpulkan semua dokumen yang diperlukan dari klien",
    status: "Completed",
    assignee: "Ahmad Wijaya",
    duration: "1 hari",
  },
  {
    id: 2,
    name: "Verifikasi Data",
    description: "Verifikasi kelengkapan dan keakuratan data",
    status: "Completed",
    assignee: "Ahmad Wijaya",
    duration: "0.5 hari",
  },
  {
    id: 3,
    name: "Review Dokumen",
    description: "Review mendalam terhadap semua dokumen",
    status: "In Progress",
    assignee: "Ahmad Wijaya",
    duration: "1 hari",
  },
  {
    id: 4,
    name: "Perhitungan Pajak",
    description: "Hitung kewajiban pajak berdasarkan data",
    status: "Pending",
    assignee: "Ahmad Wijaya",
    duration: "1 hari",
  },
  {
    id: 5,
    name: "Penyusunan SPT",
    description: "Susun SPT berdasarkan perhitungan",
    status: "Pending",
    assignee: "Ahmad Wijaya",
    duration: "0.5 hari",
  },
  {
    id: 6,
    name: "Review & Submit",
    description: "Review final dan submit ke DJP",
    status: "Pending",
    assignee: "Ahmad Wijaya",
    duration: "0.5 hari",
  },
]

const workflowStats = [
  {
    title: "Active Workflows",
    value: "24",
    change: "+3 minggu ini",
    icon: Workflow,
  },
  {
    title: "Completed",
    value: "156",
    change: "bulan ini",
    icon: CheckCircle,
  },
  {
    title: "On Schedule",
    value: "18",
    change: "75% on time",
    icon: Clock,
  },
  {
    title: "Delayed",
    value: "3",
    change: "perlu perhatian",
    icon: AlertTriangle,
  },
]

export default function WorkflowPage() {
  const [selectedWorkflow, setSelectedWorkflow] = useState("spt-pph21")

  const getStatusBadge = (status: string) => {
    const config = {
      "In Progress": { variant: "default" as const, className: "bg-blue-100 text-blue-800" },
      Completed: { variant: "default" as const, className: "bg-green-100 text-green-800" },
      Pending: { variant: "secondary" as const, className: "bg-yellow-100 text-yellow-800" },
      Delayed: { variant: "destructive" as const },
    }

    const { variant, className } = config[status as keyof typeof config]
    return (
      <Badge variant={variant} className={className}>
        {status}
      </Badge>
    )
  }

  const getPriorityBadge = (priority: string) => {
    const config = {
      High: { variant: "destructive" as const },
      Medium: { variant: "secondary" as const, className: "bg-yellow-100 text-yellow-800" },
      Low: { variant: "outline" as const },
    }

    const { variant, className } = config[priority as keyof typeof config]
    return (
      <Badge variant={variant} className={className}>
        {priority}
      </Badge>
    )
  }

  const getStepStatusIcon = (status: string) => {
    switch (status) {
      case "Completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "In Progress":
        return <Play className="h-4 w-4 text-blue-600" />
      case "Pending":
        return <Clock className="h-4 w-4 text-gray-400" />
      default:
        return <Clock className="h-4 w-4 text-gray-400" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Workflow Management</h1>
          <p className="text-muted-foreground">Kelola dan otomatisasi proses kerja untuk efisiensi maksimal</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            Template
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Buat Workflow
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {workflowStats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.change}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Workflow Templates */}
        <Card>
          <CardHeader>
            <CardTitle>Template Workflow</CardTitle>
            <CardDescription>Template siap pakai untuk berbagai proses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {workflowTemplates.map((template) => (
                <div
                  key={template.id}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors hover:bg-muted/50 ${
                    selectedWorkflow === template.id ? "border-primary bg-primary/5" : ""
                  }`}
                  onClick={() => setSelectedWorkflow(template.id)}
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-sm">{template.name}</h4>
                      <Badge variant="outline" className="text-xs">
                        {template.category}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{template.description}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{template.steps} langkah</span>
                      <span>{template.estimatedTime}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Workflow Steps */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Detail Workflow: SPT PPh 21</CardTitle>
            <CardDescription>Langkah-langkah dalam workflow yang dipilih</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {workflowSteps.map((step, index) => (
                <div key={step.id} className="flex items-start space-x-4">
                  <div className="flex flex-col items-center">
                    {getStepStatusIcon(step.status)}
                    {index < workflowSteps.length - 1 && <div className="w-px h-8 bg-border mt-2"></div>}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{step.name}</h4>
                      <div className="flex items-center space-x-2">
                        {getStatusBadge(step.status)}
                        <span className="text-xs text-muted-foreground">{step.duration}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                    <p className="text-xs text-muted-foreground">Assignee: {step.assignee}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Workflows */}
      <Card>
        <CardHeader>
          <CardTitle>Workflow Aktif</CardTitle>
          <CardDescription>Workflow yang sedang berjalan untuk berbagai klien</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="active" className="space-y-4">
            <TabsList>
              <TabsTrigger value="active">Aktif</TabsTrigger>
              <TabsTrigger value="completed">Selesai</TabsTrigger>
              <TabsTrigger value="delayed">Terlambat</TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="space-y-4">
              {activeWorkflows.map((workflow) => (
                <div
                  key={workflow.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium">{workflow.client}</h4>
                      {getPriorityBadge(workflow.priority)}
                    </div>
                    <p className="text-sm text-muted-foreground">{workflow.workflow}</p>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <div className="flex items-center">
                        <Users className="mr-1 h-3 w-3" />
                        {workflow.assignee}
                      </div>
                      <div className="flex items-center">
                        <Clock className="mr-1 h-3 w-3" />
                        Due: {new Date(workflow.dueDate).toLocaleDateString("id-ID")}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Current: {workflow.currentStep}</span>
                        <span>{workflow.progress}%</span>
                      </div>
                      <Progress value={workflow.progress} className="h-2 w-64" />
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    {getStatusBadge(workflow.status)}
                    <div className="flex items-center space-x-1">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Play className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Pause className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="completed">
              <div className="text-center py-8 text-muted-foreground">
                Workflow yang sudah selesai akan ditampilkan di sini...
              </div>
            </TabsContent>

            <TabsContent value="delayed">
              <div className="text-center py-8 text-muted-foreground">
                Workflow yang terlambat akan ditampilkan di sini...
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Workflow Analytics */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Efisiensi Workflow</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Rata-rata Completion Time</span>
                <span className="font-medium">3.2 hari</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">On-time Completion Rate</span>
                <span className="font-medium text-green-600">85%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Bottleneck Terbanyak</span>
                <span className="font-medium">Review Dokumen</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Team Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Ahmad Wijaya</span>
                <span className="font-medium">12 workflows</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Siti Rahayu</span>
                <span className="font-medium">8 workflows</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Budi Santoso</span>
                <span className="font-medium">6 workflows</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Upcoming Deadlines</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium">PT Teknologi Maju</p>
                  <p className="text-xs text-muted-foreground">SPT PPh 21</p>
                </div>
                <span className="text-sm text-orange-600">7 hari</span>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium">CV Berkah Jaya</p>
                  <p className="text-xs text-muted-foreground">SPT PPN</p>
                </div>
                <span className="text-sm text-blue-600">12 hari</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
