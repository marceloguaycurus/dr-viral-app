"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Download, Filter, RefreshCcw, Search } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Dados de exemplo para os logs
const logsData = [
  {
    id: 1,
    timestamp: "2025-05-14T14:05:23",
    endpoint: "/api/whatsapp/message",
    method: "POST",
    statusCode: 200,
    responseTime: 245,
    user: "Maria Silva",
    requestBody: { message: "Confirmação de consulta", patientId: "12345" },
    responseBody: { success: true, messageId: "msg_123456" },
  },
  {
    id: 2,
    timestamp: "2025-05-14T13:45:12",
    endpoint: "/api/appointments/schedule",
    method: "POST",
    statusCode: 201,
    responseTime: 312,
    user: "João Pereira",
    requestBody: { patientId: "23456", doctorId: "D001", date: "2025-05-20T10:00:00" },
    responseBody: { success: true, appointmentId: "apt_789012" },
  },
  {
    id: 3,
    timestamp: "2025-05-14T13:30:45",
    endpoint: "/api/patients/search",
    method: "GET",
    statusCode: 200,
    responseTime: 178,
    user: "Admin",
    requestBody: { query: "Silva" },
    responseBody: { success: true, count: 12, results: "[...]" },
  },
  {
    id: 4,
    timestamp: "2025-05-14T13:15:33",
    endpoint: "/api/whatsapp/message",
    method: "POST",
    statusCode: 400,
    responseTime: 156,
    user: "Carlos Mendes",
    requestBody: { message: "Lembrete de consulta", patientId: "34567" },
    responseBody: { success: false, error: "Invalid phone number" },
  },
  {
    id: 5,
    timestamp: "2025-05-14T12:55:18",
    endpoint: "/api/appointments/cancel",
    method: "DELETE",
    statusCode: 200,
    responseTime: 289,
    user: "Ana Beatriz",
    requestBody: { appointmentId: "apt_456789", reason: "Patient request" },
    responseBody: { success: true },
  },
  {
    id: 6,
    timestamp: "2025-05-14T12:40:02",
    endpoint: "/api/doctors/availability",
    method: "GET",
    statusCode: 200,
    responseTime: 203,
    user: "Admin",
    requestBody: { doctorId: "D003", date: "2025-05-21" },
    responseBody: { success: true, slots: "[...]" },
  },
  {
    id: 7,
    timestamp: "2025-05-14T12:25:47",
    endpoint: "/api/whatsapp/template",
    method: "POST",
    statusCode: 500,
    responseTime: 345,
    user: "System",
    requestBody: { templateId: "tmpl_001", parameters: "[...]" },
    responseBody: { success: false, error: "Internal server error" },
  },
  {
    id: 8,
    timestamp: "2025-05-14T12:10:33",
    endpoint: "/api/patients/update",
    method: "PUT",
    statusCode: 200,
    responseTime: 267,
    user: "Fernanda Lima",
    requestBody: { patientId: "45678", phone: "+5511987654321" },
    responseBody: { success: true },
  },
  {
    id: 9,
    timestamp: "2025-05-14T11:55:21",
    endpoint: "/api/auth/login",
    method: "POST",
    statusCode: 200,
    responseTime: 189,
    user: "Admin",
    requestBody: { username: "admin@clinica.com" },
    responseBody: { success: true, token: "[redacted]" },
  },
  {
    id: 10,
    timestamp: "2025-05-14T11:40:09",
    endpoint: "/api/reports/daily",
    method: "GET",
    statusCode: 200,
    responseTime: 456,
    user: "Admin",
    requestBody: { date: "2025-05-13" },
    responseBody: { success: true, data: "[...]" },
  },
]

// Função para formatar a data
function formatDate(dateString: string) {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(date)
}

// Função para determinar a cor do badge de status
function getStatusBadgeColor(statusCode: number) {
  if (statusCode >= 200 && statusCode < 300) return "bg-green-500 hover:bg-green-600"
  if (statusCode >= 300 && statusCode < 400) return "bg-blue-500 hover:bg-blue-600"
  if (statusCode >= 400 && statusCode < 500) return "bg-yellow-500 hover:bg-yellow-600"
  return "bg-red-500 hover:bg-red-600"
}

export default function LogsPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [methodFilter, setMethodFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedLog, setSelectedLog] = useState<number | null>(null)

  const itemsPerPage = 5

  // Aplicar filtros
  const filteredLogs = logsData.filter((log) => {
    const matchesSearch =
      log.endpoint.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.user.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesMethod = methodFilter === "all" || log.method === methodFilter

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "success" && log.statusCode >= 200 && log.statusCode < 300) ||
      (statusFilter === "redirect" && log.statusCode >= 300 && log.statusCode < 400) ||
      (statusFilter === "clientError" && log.statusCode >= 400 && log.statusCode < 500) ||
      (statusFilter === "serverError" && log.statusCode >= 500)

    return matchesSearch && matchesMethod && matchesStatus
  })

  // Paginação
  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedLogs = filteredLogs.slice(startIndex, startIndex + itemsPerPage)

  // Obter detalhes do log selecionado
  const getSelectedLog = () => {
    return logsData.find((log) => log.id === selectedLog)
  }

  return (
    <div className="container mx-auto flex-1 p-10">
      <div className="flex flex-col space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Logs do Sistema</h1>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <RefreshCcw className="h-4 w-4" />
            Atualizar
          </Button>
        </div>

        {/* Filtros */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por endpoint ou usuário..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <div className="w-40">
              <Select value={methodFilter} onValueChange={setMethodFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Método" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="GET">GET</SelectItem>
                  <SelectItem value="POST">POST</SelectItem>
                  <SelectItem value="PUT">PUT</SelectItem>
                  <SelectItem value="DELETE">DELETE</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="w-40">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="success">Sucesso (2xx)</SelectItem>
                  <SelectItem value="redirect">Redirecionamento (3xx)</SelectItem>
                  <SelectItem value="clientError">Erro Cliente (4xx)</SelectItem>
                  <SelectItem value="serverError">Erro Servidor (5xx)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>

            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Tabela de Logs */}
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[180px]">Timestamp</TableHead>
                <TableHead>Endpoint</TableHead>
                <TableHead className="w-[100px]">Método</TableHead>
                <TableHead className="w-[100px]">Status</TableHead>
                <TableHead className="w-[120px]">Tempo (ms)</TableHead>
                <TableHead className="w-[150px]">Usuário</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedLogs.length > 0 ? (
                paginatedLogs.map((log) => (
                  <TableRow
                    key={log.id}
                    className="cursor-pointer hover:bg-slate-50"
                    onClick={() => setSelectedLog(log.id)}
                  >
                    <TableCell className="font-mono text-xs">{formatDate(log.timestamp)}</TableCell>
                    <TableCell className="font-mono text-xs">{log.endpoint}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-mono">
                        {log.method}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusBadgeColor(log.statusCode)}>{log.statusCode}</Badge>
                    </TableCell>
                    <TableCell>{log.responseTime} ms</TableCell>
                    <TableCell>{log.user}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                    Nenhum log encontrado com os filtros aplicados.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Paginação */}
        {filteredLogs.length > 0 && (
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Mostrando {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredLogs.length)} de{" "}
              {filteredLogs.length} logs
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="text-sm">
                Página {currentPage} de {totalPages}
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Detalhes do Log */}
        {selectedLog && (
          <Card>
            <CardHeader>
              <CardTitle>Detalhes do Log</CardTitle>
              <CardDescription>
                {getSelectedLog()?.endpoint} - {formatDate(getSelectedLog()?.timestamp || "")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium mb-2">Request</h3>
                  <pre className="bg-slate-100 p-3 rounded-md text-xs overflow-auto max-h-60">
                    {JSON.stringify(getSelectedLog()?.requestBody, null, 2)}
                  </pre>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Response</h3>
                  <pre className="bg-slate-100 p-3 rounded-md text-xs overflow-auto max-h-60">
                    {JSON.stringify(getSelectedLog()?.responseBody, null, 2)}
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}   