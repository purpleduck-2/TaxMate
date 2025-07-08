"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Plus,
  Search,
  Filter,
  Building2,
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  FileText,
  MoreHorizontal,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const clients = [
  {
    id: 1,
    name: "PT Teknologi Maju",
    type: "Perusahaan",
    npwp: "01.234.567.8-901.000",
    contact: "Budi Santoso",
    phone: "+62 21 1234567",
    email: "budi@teknologimaju.com",
    address: "Jakarta Selatan",
    status: "Aktif",
    lastActivity: "2 hari lalu",
    services: ["PPh Badan", "PPN", "PPh 21"],
  },
  {
    id: 2,
    name: "CV Berkah Jaya",
    type: "CV",
    npwp: "02.345.678.9-012.000",
    contact: "Siti Rahayu",
    phone: "+62 21 2345678",
    email: "siti@berkahjaya.com",
    address: "Jakarta Timur",
    status: "Aktif",
    lastActivity: "1 minggu lalu",
    services: ["PPh Final", "PPN"],
  },
  {
    id: 3,
    name: "Ahmad Wijaya",
    type: "Perorangan",
    npwp: "03.456.789.0-123.000",
    contact: "Ahmad Wijaya",
    phone: "+62 812 3456789",
    email: "ahmad.wijaya@email.com",
    address: "Depok",
    status: "Aktif",
    lastActivity: "3 hari lalu",
    services: ["PPh OP"],
  },
  {
    id: 4,
    name: "PT Digital Nusantara",
    type: "Perusahaan",
    npwp: "04.567.890.1-234.000",
    contact: "Maria Gonzalez",
    phone: "+62 21 3456789",
    email: "maria@digitalnusantara.com",
    address: "Jakarta Pusat",
    status: "Tidak Aktif",
    lastActivity: "1 bulan lalu",
    services: ["PPh Badan", "PPN", "PPh 21", "PPh 23"],
  },
]

export default function ClientsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  const filteredClients = clients.filter((client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.npwp.includes(searchTerm) ||
      client.contact.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || client.status.toLowerCase() === statusFilter
    const matchesType = typeFilter === "all" || client.type.toLowerCase() === typeFilter.toLowerCase()

    return matchesSearch && matchesStatus && matchesType
  })

  const getStatusBadge = (status: string) => {
    return status === "Aktif" ? (
      <Badge variant="default" className="bg-green-100 text-green-800">
        Aktif
      </Badge>
    ) : (
      <Badge variant="secondary">Tidak Aktif</Badge>
    )
  }

  const getTypeBadge = (type: string) => {
    const colors = {
      Perusahaan: "bg-blue-100 text-blue-800",
      CV: "bg-purple-100 text-purple-800",
      Perorangan: "bg-orange-100 text-orange-800",
    }
    return (
      <Badge variant="secondary" className={colors[type as keyof typeof colors]}>
        {type}
      </Badge>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manajemen Klien</h1>
          <p className="text-muted-foreground">Kelola informasi dan layanan untuk semua klien Anda</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Tambah Klien
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Klien</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clients.length}</div>
            <p className="text-xs text-muted-foreground">+2 klien baru bulan ini</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Klien Aktif</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clients.filter((c) => c.status === "Aktif").length}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((clients.filter((c) => c.status === "Aktif").length / clients.length) * 100)}% dari total
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Perusahaan</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clients.filter((c) => c.type === "Perusahaan").length}</div>
            <p className="text-xs text-muted-foreground">Klien korporat</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Perorangan</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clients.filter((c) => c.type === "Perorangan").length}</div>
            <p className="text-xs text-muted-foreground">Klien individu</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Daftar Klien</CardTitle>
          <CardDescription>Kelola dan pantau semua klien dalam satu tempat</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Cari klien..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Status</SelectItem>
                <SelectItem value="aktif">Aktif</SelectItem>
                <SelectItem value="tidak aktif">Tidak Aktif</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Jenis" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Jenis</SelectItem>
                <SelectItem value="perusahaan">Perusahaan</SelectItem>
                <SelectItem value="cv">CV</SelectItem>
                <SelectItem value="perorangan">Perorangan</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>

          {/* Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Klien</TableHead>
                  <TableHead>Kontak</TableHead>
                  <TableHead>Layanan</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Aktivitas Terakhir</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <p className="font-medium">{client.name}</p>
                          {getTypeBadge(client.type)}
                        </div>
                        <p className="text-sm text-muted-foreground">{client.npwp}</p>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <MapPin className="mr-1 h-3 w-3" />
                          {client.address}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center text-sm">
                          <User className="mr-2 h-3 w-3" />
                          {client.contact}
                        </div>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Phone className="mr-2 h-3 w-3" />
                          {client.phone}
                        </div>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Mail className="mr-2 h-3 w-3" />
                          {client.email}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {client.services.map((service, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {service}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(client.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="mr-2 h-3 w-3" />
                        {client.lastActivity}
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
                            <FileText className="mr-2 h-4 w-4" />
                            Lihat Detail
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <User className="mr-2 h-4 w-4" />
                            Edit Klien
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Calendar className="mr-2 h-4 w-4" />
                            Jadwal Konsultasi
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
