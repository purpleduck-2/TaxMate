"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Upload,
  Search,
  Filter,
  FileText,
  ImageIcon,
  File,
  Download,
  Eye,
  MoreHorizontal,
  Folder,
  Calendar,
  User,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const documents = [
  {
    id: 1,
    name: "SPT Masa PPh 21 - Juni 2025.pdf",
    client: "PT Teknologi Maju",
    type: "SPT Masa",
    category: "PPh 21",
    size: "2.4 MB",
    uploadDate: "2025-07-05",
    uploadedBy: "Ahmad Wijaya",
    status: "Final",
    fileType: "pdf",
  },
  {
    id: 2,
    name: "Bukti Potong PPh 23 - CV Berkah.pdf",
    client: "CV Berkah Jaya",
    type: "Bukti Potong",
    category: "PPh 23",
    size: "1.8 MB",
    uploadDate: "2025-07-04",
    uploadedBy: "Siti Rahayu",
    status: "Draft",
    fileType: "pdf",
  },
  {
    id: 3,
    name: "Faktur Pajak Masukan - Juni.xlsx",
    client: "PT Digital Nusantara",
    type: "Faktur Pajak",
    category: "PPN",
    size: "856 KB",
    uploadDate: "2025-07-03",
    uploadedBy: "Budi Santoso",
    status: "Review",
    fileType: "excel",
  },
  {
    id: 4,
    name: "Laporan Keuangan Q2 2025.pdf",
    client: "Ahmad Wijaya",
    type: "Laporan Keuangan",
    category: "Supporting",
    size: "3.2 MB",
    uploadDate: "2025-07-02",
    uploadedBy: "Maria Gonzalez",
    status: "Final",
    fileType: "pdf",
  },
  {
    id: 5,
    name: "NPWP Scan.jpg",
    client: "PT Maju Bersama",
    type: "Dokumen Legal",
    category: "Identitas",
    size: "1.2 MB",
    uploadDate: "2025-07-01",
    uploadedBy: "Ahmad Wijaya",
    status: "Final",
    fileType: "image",
  },
]

const documentStats = [
  {
    title: "Total Dokumen",
    value: "1,247",
    change: "+23 hari ini",
    icon: FileText,
  },
  {
    title: "Menunggu Review",
    value: "45",
    change: "12 urgent",
    icon: Eye,
  },
  {
    title: "Storage Terpakai",
    value: "2.8 GB",
    change: "dari 10 GB",
    icon: Folder,
  },
  {
    title: "Upload Hari Ini",
    value: "23",
    change: "+15% dari kemarin",
    icon: Upload,
  },
]

export default function DocumentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case "pdf":
        return <FileText className="h-4 w-4 text-red-600" />
      case "excel":
        return <File className="h-4 w-4 text-green-600" />
      case "image":
        return <ImageIcon className="h-4 w-4 text-blue-600" />
      default:
        return <File className="h-4 w-4 text-gray-600" />
    }
  }

  const getStatusBadge = (status: string) => {
    const config = {
      Final: { variant: "default" as const, className: "bg-green-100 text-green-800" },
      Draft: { variant: "secondary" as const, className: "bg-gray-100 text-gray-800" },
      Review: { variant: "secondary" as const, className: "bg-yellow-100 text-yellow-800" },
    }

    const { variant, className } = config[status as keyof typeof config] || config["Draft"]
    return (
      <Badge variant={variant} className={className}>
        {status}
      </Badge>
    )
  }

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.client.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || doc.category.toLowerCase() === categoryFilter
    const matchesStatus = statusFilter === "all" || doc.status.toLowerCase() === statusFilter

    return matchesSearch && matchesCategory && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manajemen Dokumen</h1>
          <p className="text-muted-foreground">Kelola semua dokumen pajak dan supporting documents</p>
        </div>
        <Button>
          <Upload className="mr-2 h-4 w-4" />
          Upload Dokumen
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {documentStats.map((stat, index) => {
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

      {/* Document Management */}
      <Card>
        <CardHeader>
          <CardTitle>Daftar Dokumen</CardTitle>
          <CardDescription>Semua dokumen pajak dan supporting documents</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Cari dokumen..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Kategori" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Kategori</SelectItem>
                <SelectItem value="pph 21">PPh 21</SelectItem>
                <SelectItem value="pph 23">PPh 23</SelectItem>
                <SelectItem value="ppn">PPN</SelectItem>
                <SelectItem value="supporting">Supporting</SelectItem>
                <SelectItem value="identitas">Identitas</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Status</SelectItem>
                <SelectItem value="final">Final</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="review">Review</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>

          {/* Documents Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Dokumen</TableHead>
                  <TableHead>Klien</TableHead>
                  <TableHead>Kategori</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Upload Info</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDocuments.map((doc) => (
                  <TableRow key={doc.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        {getFileIcon(doc.fileType)}
                        <div>
                          <p className="font-medium">{doc.name}</p>
                          <p className="text-sm text-muted-foreground">{doc.size}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <p className="font-medium">{doc.client}</p>
                        <Badge variant="outline" className="text-xs">
                          {doc.type}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{doc.category}</Badge>
                    </TableCell>
                    <TableCell>{getStatusBadge(doc.status)}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center text-sm">
                          <Calendar className="mr-2 h-3 w-3" />
                          {new Date(doc.uploadDate).toLocaleDateString("id-ID")}
                        </div>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <User className="mr-2 h-3 w-3" />
                          {doc.uploadedBy}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            Lihat
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <FileText className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
