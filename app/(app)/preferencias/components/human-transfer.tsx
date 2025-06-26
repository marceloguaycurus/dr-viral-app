'use client'

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Plus, Trash2, User, AlertTriangle, RefreshCw, Frown, BrainCircuit, Heart, Stethoscope, WifiOff } from "lucide-react"
import { Separator } from "@/components/ui/separator"

interface Operador {
  id: string
  nome: string
  email: string
  cargo: string
  avatar: string
  ativo: boolean
}

interface HumanTransferProps {
  data: {
    triggerWords: string;
    escalationMessage: string;
    notifyByEmail: boolean;
    notifyByWhatsapp: boolean;
    businessHoursOnly: boolean;
  } | null;
  error: string | null;
  onSave: (data: any) => void;
}

const scenarios = [
  {
    id: 'confused',
    title: 'Conversa confusa',
    description: 'Quando o paciente não consegue expressar claramente o que deseja',
    icon: <AlertTriangle className="h-4 w-4 text-primary" />
  },
  {
    id: 'circular',
    title: 'Rodando em círculos',
    description: 'Quando a conversa repete os mesmos tópicos sem progresso',
    icon: <RefreshCw className="h-4 w-4 text-primary" />
  },
  {
    id: 'angry',
    title: 'Paciente irritado',
    description: 'Quando o paciente demonstra frustração ou irritação',
    icon: <Frown className="h-4 w-4 text-primary" />
  },
  {
    id: 'complex',
    title: 'Solicitação Complexa',
    description: 'Quando o paciente faz pedidos que estão além das capacidades da IA',
    icon: <BrainCircuit className="h-4 w-4 text-primary" />
  },
  {
    id: 'sensitive',
    title: 'Assunto sensível',
    description: 'Quando o paciente menciona temas que requerem atenção humana',
    icon: <Heart className="h-4 w-4 text-primary" />
  },
  {
    id: 'emergency',
    title: 'Emergência médica',
    description: 'Quando o paciente relata sintomas que podem indicar emergência',
    icon: <Stethoscope className="h-4 w-4 text-primary" />
  },
  {
    id: 'technical',
    title: 'Problema técnico',
    description: 'Quando há falhas na integração ou no sistema',
    icon: <WifiOff className="h-4 w-4 text-primary" />
  }
]

export function HumanTransfer({ data, error, onSave }: HumanTransferProps) {
  const [palavrasGatilho, setPalavrasGatilho] = useState("falar com humano, atendente, pessoa real, operador")
  const [mensagemEscalonamento, setMensagemEscalonamento] = useState(
    "Estou transferindo seu atendimento para um de nossos operadores humanos. Por favor, aguarde um momento.",
  )
  const [notificarEmail, setNotificarEmail] = useState(true);
  const [notificarWhatsapp, setNotificarWhatsapp] = useState(true);
  const [horarioComercial, setHorarioComercial] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [operadores, setOperadores] = useState<Operador[]>([
    {
      id: "1",
      nome: "Ana Silva",
      email: "ana.silva@clinica.com",
      cargo: "Recepcionista",
      avatar: "/placeholder.svg?height=40&width=40",
      ativo: true,
    },
    {
      id: "2",
      nome: "Carlos Oliveira",
      email: "carlos.oliveira@clinica.com",
      cargo: "Administrador",
      avatar: "/placeholder.svg?height=40&width=40",
      ativo: true,
    },
    {
      id: "3",
      nome: "Mariana Costa",
      email: "mariana.costa@clinica.com",
      cargo: "Atendente",
      avatar: "/placeholder.svg?height=40&width=40",
      ativo: false,
    },
  ])

  // Carregar dados quando disponíveis
  useEffect(() => {
    if (data) {
      setPalavrasGatilho(data.triggerWords || palavrasGatilho);
      setMensagemEscalonamento(data.escalationMessage || mensagemEscalonamento);
      setNotificarEmail(data.notifyByEmail);
      setNotificarWhatsapp(data.notifyByWhatsapp);
      setHorarioComercial(data.businessHoursOnly);
    }
  }, [data]);

  const toggleOperadorAtivo = (id: string) => {
    setOperadores(
      operadores.map((operador) => (operador.id === id ? { ...operador, ativo: !operador.ativo } : operador)),
    )
  }

  const adicionarOperador = () => {
    const novoId = Date.now().toString()
    setOperadores([
      ...operadores,
      {
        id: novoId,
        nome: "Novo Operador",
        email: "novo@clinica.com",
        cargo: "Atendente",
        avatar: "/placeholder.svg?height=40&width=40",
        ativo: true,
      },
    ])
  }

  const removerOperador = (id: string) => {
    setOperadores(operadores.filter((operador) => operador.id !== id))
  }

  const handleSubmit = async () => {
    try {
      setIsSaving(true);
      await onSave({
        triggerWords: palavrasGatilho,
        escalationMessage: mensagemEscalonamento,
        notifyByEmail: notificarEmail,
        notifyByWhatsapp: notificarWhatsapp,
        businessHoursOnly: horarioComercial
      });
    } catch (error) {
      console.error("Erro ao salvar:", error);
    } finally {
      setIsSaving(false);
    }
  };

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
        <h3 className="text-xl font-medium">Transferência para Humano</h3>
        <p className="text-sm text-muted-foreground">
          Configure quando e como transferir conversas para atendentes humanos
        </p>
      </div>
      <Separator />

      <div className="p-4 space-y-4">
        <h3 className="text-xl font-medium">Cenários de escalonamento</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {scenarios.map((scenario) => (
            <div key={scenario.id} className="flex items-start gap-2">
              {scenario.icon}
              <div>
                <h4 className="text-sm font-medium">{scenario.title}</h4>
                <p className="text-xs text-muted-foreground">{scenario.description}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground pt-4 border-t">
          Estes cenários são detectados automaticamente pelo sistema de inteligência artificial e não podem ser desativados para garantir a qualidade do atendimento.
        </p>
      </div>


      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="palavras-gatilho">Palavras-gatilho para `Falar com humano`</Label>
          <Textarea
            id='palavras-gatilho'
            value={palavrasGatilho}
            onChange={(e) => setPalavrasGatilho(e.target.value)}
            placeholder="Digite as palavras separadas por vírgula"
            rows={3}
          />
          <p className="text-sm text-muted-foreground">
            Quando o paciente usar estas palavras, a Dora irá transferir a conversa para um atendente humano
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="mensagem-escalonamento">Mensagem de Transferência</Label>
          <Textarea
            id='mensagem-escalonamento'
            value={mensagemEscalonamento}
            onChange={(e) => setMensagemEscalonamento(e.target.value)}
            placeholder="Digite a mensagem que será enviada ao transferir"
            rows={3}
          />
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="text-xl font-medium">Configurações avançadas</h3>
        <p className="text-sm text-muted-foreground">
          Configure opções adicionais de notificação e disponibilidade
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Switch 
              id="notificacao-email" 
              checked={notificarEmail}
              onCheckedChange={setNotificarEmail}
            />
            <Label htmlFor="notificacao-email" className="font-normal">
              Notificação por e-mail
            </Label>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Switch 
              id="notificacao-app" 
              checked={notificarWhatsapp}
              onCheckedChange={setNotificarWhatsapp}
            />
            <Label htmlFor="notificacao-app" className="font-normal">
              Notificação no WhatsApp
            </Label>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Switch 
              id="horario-comercial" 
              checked={horarioComercial}
              onCheckedChange={setHorarioComercial}
            />
            <Label htmlFor="horario-comercial" className="font-normal">
              Apenas em horário comercial
            </Label>
          </div>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="text-xl font-medium">Lista de Operadores</h3>
        <p className="text-sm text-muted-foreground">
          Gerencie os operadores que receberão as transferências
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Operadores notificados</Label>
          <Button variant="outline" size="sm" onClick={adicionarOperador}>
            <Plus className="h-4 w-4 mr-1" /> Adicionar
          </Button>
        </div>

        <Card>
          <CardContent className="p-4 space-y-4">
            {operadores.map((operador) => (
              <div
                key={operador.id}
                className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0"
              >
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 border">
                    <AvatarImage src={operador.avatar || "/placeholder.svg"} alt={operador.nome} />
                    <AvatarFallback>{operador.nome.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{operador.nome}</div>
                    <div className="text-sm text-muted-foreground flex items-center gap-2">
                      <span>{operador.email}</span>
                      <Badge variant="outline" className="text-xs">
                        {operador.cargo}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    id={`operador-${operador.id}`}
                    checked={operador.ativo}
                    onCheckedChange={() => toggleOperadorAtivo(operador.id)}
                  />
                  <Button variant="ghost" size="icon" onClick={() => removerOperador(operador.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            {operadores.length === 0 && (
              <div className="py-8 text-center">
                <User className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-muted-foreground">Nenhum operador configurado</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSubmit} disabled={isSaving}>
          {isSaving ? "Salvando..." : "Salvar alterações"}
        </Button>
      </div>
    </div>
  )
} 