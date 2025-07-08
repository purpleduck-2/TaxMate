"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Building2,
  FileText,
  Calculator,
  Download,
  Send,
  Eye,
  Plus,
  Clock,
  CheckCircle,
  AlertTriangle,
  User,
} from "lucide-react"

const sptTemplates = [
  {
    id: "pph21",
    name: "SPT Masa PPh 21",
    description: "Pajak Penghasilan Pasal 21 - Gaji Karyawan",
    icon: User,
    color: "bg-blue-100 text-blue-800",
    deadline: "10 setiap bulan",
    complexity: "Sedang",
  },
  {
    id: "pph23",
    name: "SPT Masa PPh 23",
    description: "Pajak Penghasilan Pasal 23 - Jasa dan Sewa",
    icon: FileText,
    color: "bg-green-100 text-green-800",
    deadline: "20 setiap bulan",
    complexity: "Sedang",
  },
  {
    id: "ppn",
    name: "SPT Masa PPN",
    description: "Pajak Pertambahan Nilai",
    icon: Calculator,
    color: "bg-purple-100 text-purple-800",
    deadline: "Akhir bulan berikutnya",
    complexity: "Tinggi",
  },
  {
    id: "pph-badan",
    name: "SPT Tahunan PPh Badan",
    description: "Pajak Penghasilan Badan",
    icon: Building2,
    color: "bg-orange-100 text-orange-800",
    deadline: "30 April",
    complexity: "Tinggi",
  },
]

const recentSPT = [
  {
    id: 1,
    client: "PT Teknologi Maju",
    type: "SPT Masa PPh 21",
    period: "Juni 2025",
    status: "Selesai",
    progress: 100,
    dueDate: "2025-07-10",
    createdBy: "Ahmad Wijaya",
  },
  {
    id: 2,
    client: "CV Berkah Jaya",
    type: "SPT Masa PPN",
    period: "Juni 2025",
    status: "Dalam Proses",
    progress: 75,
    dueDate: "2025-07-31",
    createdBy: "Siti Rahayu",
  },
  {
    id: 3,
    client: "PT Digital Nusantara",
    type: "SPT Masa PPh 23",
    period: "Juni 2025",
    status: "Review",
    progress: 90,
    dueDate: "2025-07-20",
    createdBy: "Budi Santoso",
  },
]

export default function SPTGeneratorPage() {
  const [selectedClient, setSelectedClient] = useState("")
  const [selectedPeriod, setSelectedPeriod] = useState("")
  const [selectedTemplate, setSelectedTemplate] = useState("")

  const getStatusBadge = (status: string) => {
    const config = {
      Selesai: { variant: "default" as const, className: "bg-green-100 text-green-800" },
      "Dalam Proses": { variant: "secondary" as const, className: "bg-blue-100 text-blue-800" },
      Review: { variant: "secondary" as const, className: "bg-yellow-100 text-yellow-800" },
      Draft: { variant: "outline" as const, className: "" },
    }

    const { variant, className } = config[status as keyof typeof config] || config["Draft"]
    return (
      <Badge variant={variant} className={className}>
        {status}
      </Badge>
    )
  }

  const getComplexityBadge = (complexity: string) => {
    const config = {
      Rendah: { className: "bg-green-100 text-green-800" },
      Sedang: { className: "bg-yellow-100 text-yellow-800" },
      Tinggi: { className: "bg-red-100 text-red-800" },
    }

    const { className } = config[complexity as keyof typeof config] || config["Sedang"]
    return (
      <Badge variant="secondary" className={className}>
        {complexity}
      </Badge>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Generator SPT</h1>
          <p className="text-muted-foreground">Buat dan kelola Surat Pemberitahuan Tahunan secara otomatis</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Buat SPT Baru
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">SPT Bulan Ini</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+3 dari bulan lalu</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Selesai</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">75% completion rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Dalam Proses</CardTitle>
            <Clock className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">Perlu diselesaikan</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mendekati Deadline</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Perlu perhatian</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* SPT Creation Form */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Buat SPT Baru</CardTitle>
            <CardDescription>Pilih template dan isi data untuk membuat SPT</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="client">Klien</Label>
              <Select value={selectedClient} onValueChange={setSelectedClient}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih klien" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pt-teknologi">PT Teknologi Maju</SelectItem>
                  <SelectItem value="cv-berkah">CV Berkah Jaya</SelectItem>
                  <SelectItem value="pt-digital">PT Digital Nusantara</SelectItem>
                  <SelectItem value="ahmad-wijaya">Ahmad Wijaya</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="period">Periode</Label>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih periode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2025-07">Juli 2025</SelectItem>
                  <SelectItem value="2025-06">Juni 2025</SelectItem>
                  <SelectItem value="2025-05">Mei 2025</SelectItem>
                  <SelectItem value="2024">Tahun 2024</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="template">Template SPT</Label>
              <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih template" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pph21">SPT Masa PPh 21</SelectItem>
                  <SelectItem value="pph23">SPT Masa PPh 23</SelectItem>
                  <SelectItem value="ppn">SPT Masa PPN</SelectItem>
                  <SelectItem value="pph-badan">SPT Tahunan PPh Badan</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button className="w-full" disabled={!selectedClient || !selectedPeriod || !selectedTemplate}>
              <Plus className="mr-2 h-4 w-4" />
              Buat SPT
            </Button>
          </CardContent>
        </Card>

        {/* SPT Templates */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Template SPT Tersedia</CardTitle>
            <CardDescription>Pilih template sesuai dengan jenis kewajiban perpajakan</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {sptTemplates.map((template) => {
                const Icon = template.icon
                return (
                  <Card key={template.id} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <div className={`p-2 rounded-lg ${template.color.split(" ")[0]} w-fit`}>
                          <Icon className={`h-5 w-5 ${template.color.split(" ")[1]}`} />
                        </div>
                        <div className="flex-1 space-y-2">
                          <h3 className="font-medium">{template.name}</h3>
                          <p className="text-sm text-muted-foreground">{template.description}</p>
                          <div className="flex items-center justify-between">
                            <div className="space-y-1">
                              <p className="text-xs text-muted-foreground">Deadline: {template.deadline}</p>
                              <div className="flex items-center space-x-2">
                                {getComplexityBadge(template.complexity)}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent SPT */}
      <Card>
        <CardHeader>
          <CardTitle>SPT Terbaru</CardTitle>
          <CardDescription>Daftar SPT yang sedang dikerjakan atau baru selesai</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">Semua</TabsTrigger>
              <TabsTrigger value="in-progress">Dalam Proses</TabsTrigger>
              <TabsTrigger value="review">Review</TabsTrigger>
              <TabsTrigger value="completed">Selesai</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              {recentSPT.map((spt) => (
                <div
                  key={spt.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium">{spt.client}</h4>
                      <Badge variant="outline">{spt.type}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Periode: {spt.period} • Deadline: {new Date(spt.dueDate).toLocaleDateString("id-ID")}
                    </p>
                    <p className="text-xs text-muted-foreground">Dibuat oleh: {spt.createdBy}</p>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{spt.progress}%</span>
                      </div>
                      <Progress value={spt.progress} className="h-2 w-48" />
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    {getStatusBadge(spt.status)}
                    <div className="flex items-center space-x-1">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
