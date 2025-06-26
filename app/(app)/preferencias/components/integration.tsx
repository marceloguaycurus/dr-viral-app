'use client'

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { AlertCircle, Check, Copy, RefreshCw, X, Mail } from "lucide-react"

interface IntegrationProps {
  data: {
    provider: string;
    apiKey: string;
    endpoint: string;
    connectionStatus: string;
    lastSync: string | null;
  } | null;
  error: string | null;
  onSave: (data: any) => void;
}

export function Integration({ data, error, onSave }: IntegrationProps) {
  const [provedor, setProvedor] = useState("sem_integracao")
  const [apiKey, setApiKey] = useState("sk_test_51NZgGtLkdIwItyXYZ...")
  const [endpoint, setEndpoint] = useState("https://api.iclinic.com.br/v1")
  const [statusConexao, setStatusConexao] = useState("desconectado") // conectado, erro, desconectado
  const [ultimoSync, setUltimoSync] = useState("2023-05-07T14:30:22")
  const [showApiKey, setShowApiKey] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const [logs] = useState([
    { data: "2023-05-07T10:15:32", mensagem: "Erro de autenticação: API Key inválida" },
    { data: "2023-05-06T16:42:11", mensagem: "Timeout na requisição ao endpoint /appointments" },
    { data: "2023-05-05T09:23:45", mensagem: "Erro 404: Recurso não encontrado em /doctors/123" },
  ])

  // Carregar dados quando disponíveis
  useEffect(() => {
    if (data) {
      setProvedor(data.provider || "sem_integracao");
      setApiKey(data.apiKey || "");
      setEndpoint(data.endpoint || "");
      setStatusConexao(data.connectionStatus || "desconectado");
      if (data.lastSync) {
        setUltimoSync(data.lastSync);
      }
    }
  }, [data]);

  const copiarApiKey = () => {
    navigator.clipboard.writeText(apiKey)
  }

  const sincronizarAgora = () => {
    // Simulação de sincronização
    const newDate = new Date().toISOString();
    setUltimoSync(newDate);
    
    // No futuro, pode-se implementar uma chamada ao backend para sincronizar
    // onSave({
    //   provider: provedor,
    //   apiKey,
    //   endpoint,
    //   connectionStatus: statusConexao,
    //   lastSync: newDate
    // });
  }

  const handleSubmit = async () => {
    try {
      setIsSaving(true);
      await onSave({
        provider: provedor,
        apiKey,
        endpoint,
        connectionStatus: statusConexao,
        lastSync: ultimoSync
      });
    } catch (error) {
      console.error("Erro ao salvar:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const formatarData = (dataString: string) => {
    const data = new Date(dataString)
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(data)
  }

  if (error) {
    return (
      <div className="p-6 text-center text-destructive">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-medium">Integração</h3>
        <p className="text-sm text-muted-foreground">
          Configure integrações com outros sistemas e ERPs
        </p>
      </div>
      <Separator />

      <div className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="provedor-erp">Provedor ERP</Label>
            <Select value={provedor} onValueChange={setProvedor}>
              <SelectTrigger id="provedor-erp">
                <SelectValue placeholder="Selecione o provedor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sem_integracao">Sem integração</SelectItem>
                <SelectItem value="iclinic">iClinic</SelectItem>
                <SelectItem value="medplus">MedPlus</SelectItem>
                <SelectItem value="doctoralia">Doctoralia</SelectItem>
                <SelectItem value="clinicweb">ClinicWeb</SelectItem>
                <SelectItem value="outro">Outro</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {provedor === "sem_integracao" ? (
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Mail className="h-5 w-5" />
                  <p className="text-sm">
                    Enquanto não houver integração configurada, a Dora enviará um e-mail com as ações do usuário para o endereço cadastrado nas configurações da clínica.
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="space-y-2">
                <Label htmlFor="api-key">API Key / Token</Label>
                <div className="flex">
                  <div className="relative flex-grow">
                    <Input
                      id="api-key"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      type={showApiKey ? "text" : "password"}
                      className="pr-20"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowApiKey(!showApiKey)}
                    >
                      {showApiKey ? "Ocultar" : "Mostrar"}
                    </Button>
                  </div>
                  <Button variant="outline" size="icon" onClick={copiarApiKey} className="ml-2">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">Chave de API fornecida pelo seu provedor ERP</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="endpoint">URL do endpoint</Label>
                <Input
                  id="endpoint"
                  value={endpoint}
                  onChange={(e) => setEndpoint(e.target.value)}
                  placeholder="https://api.exemplo.com/v1"
                />
                <p className="text-sm text-muted-foreground">URL base para as requisições à API do ERP</p>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Status:</span>
                    {statusConexao === "conectado" ? (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        <Check className="h-3 w-3 mr-1" /> Conectado
                      </Badge>
                    ) : statusConexao === "erro" ? (
                      <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                        <X className="h-3 w-3 mr-1" /> Erro
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                        <AlertCircle className="h-3 w-3 mr-1" /> Desconectado
                      </Badge>
                    )}
                  </div>
                  <div className="text-sm">
                    <span className="text-muted-foreground">Último sync:</span> <span>{formatarData(ultimoSync)}</span>
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={sincronizarAgora} className="gap-1">
                  <RefreshCw className="h-4 w-4" /> Sincronizar agora
                </Button>
              </div>

              <Separator />

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium">Logs de erro</h3>
                  <p className="text-sm text-muted-foreground">
                    Histórico de erros e problemas na integração
                  </p>
                </div>

                <div className="flex items-center justify-end">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="link" size="sm" className="h-auto p-0">
                        Ver todos os logs
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-96">
                      <div className="space-y-2">
                        <h4 className="font-medium">Histórico completo de logs</h4>
                        <p className="text-sm text-muted-foreground">Últimos 30 dias de atividade</p>
                        <div className="max-h-80 overflow-y-auto">
                          {[...logs, ...logs, ...logs].map((log, index) => (
                            <div key={index} className="py-2 border-b last:border-0">
                              <div className="flex justify-between">
                                <span className="text-sm font-medium text-red-600">Erro</span>
                                <span className="text-xs text-muted-foreground">{formatarData(log.data)}</span>
                              </div>
                              <p className="text-sm mt-1">{log.mensagem}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>

                <Card>
                  <CardContent className="p-4 space-y-2">
                    {logs.length > 0 ? (
                      logs.map((log, index) => (
                        <div key={index} className="py-2 border-b last:border-0">
                          <div className="flex justify-between">
                            <span className="text-sm font-medium text-red-600">Erro</span>
                            <span className="text-xs text-muted-foreground">{formatarData(log.data)}</span>
                          </div>
                          <p className="text-sm mt-1">{log.mensagem}</p>
                        </div>
                      ))
                    ) : (
                      <div className="py-8 text-center">
                        <p className="text-muted-foreground">Nenhum erro registrado</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSubmit} disabled={isSaving}>
          {isSaving ? "Salvando..." : "Salvar alterações"}
        </Button>
      </div>
    </div>
  )
} 