"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Pencil, Trash2, Plus } from "lucide-react"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ReminderEvent {
  id?: string
  evento: string
  gatilho: string
  antecedencia: string
  canal: string
  status: boolean
}

interface RemindersProps {
  data: ReminderEvent[];
  error: string | null;
  onSave: (data: ReminderEvent) => void;
  onDelete: (id: string) => void;
}

export function Reminders({ data, error, onSave, onDelete }: RemindersProps) {
  const [eventos, setEventos] = useState<ReminderEvent[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentReminder, setCurrentReminder] = useState<ReminderEvent | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  // Carregar dados quando disponíveis
  useEffect(() => {
    if (data && Array.isArray(data)) {
      setEventos(data);
    }
  }, [data]);

  const toggleStatus = (id: string) => {
    const reminder = eventos.find(evento => evento.id === id);
    if (reminder) {
      const updatedReminder = { ...reminder, status: !reminder.status };
      handleSaveReminder(updatedReminder);
    }
  }

  const openAddDialog = () => {
    setCurrentReminder({
      evento: "",
      gatilho: "Pré-consulta",
      antecedencia: "24 horas",
      canal: "Whatsapp",
      status: true
    });
    setIsDialogOpen(true);
  }

  const openEditDialog = (reminder: ReminderEvent) => {
    setCurrentReminder({ ...reminder });
    setIsDialogOpen(true);
  }

  const handleSaveReminder = async (reminderToSave: ReminderEvent) => {
    try {
      setIsSaving(true);
      await onSave(reminderToSave);
      
      // Atualizar localmente até a revalidação
      if (reminderToSave.id) {
        // Atualizar existente
        setEventos(eventos.map(evt => 
          evt.id === reminderToSave.id ? reminderToSave : evt
        ));
      } else {
        // Adicionar novo (simulando um ID até a revalidação)
        setEventos([...eventos, { ...reminderToSave, id: `temp-${Date.now()}` }]);
      }
      
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Erro ao salvar lembrete:', error);
    } finally {
      setIsSaving(false);
    }
  }

  const handleDeleteReminder = async (id: string) => {
    try {
      await onDelete(id);
      // Atualizar localmente até a revalidação
      setEventos(eventos.filter(evento => evento.id !== id));
    } catch (error) {
      console.error('Erro ao excluir lembrete:', error);
    }
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
        <h3 className="text-xl font-medium">Follow-ups e Lembretes</h3>
        <p className="text-sm text-muted-foreground">
          Configure mensagens automáticas enviadas antes e após as consultas
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-medium">Eventos automáticos</h4>
          <Button variant="default" onClick={openAddDialog}>
            <Plus className="h-4 w-4 mr-2" />
            Criar novo follow-up
          </Button>
        </div>

        <div className="border rounded-lg">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Evento</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Gatilho</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Antecedência</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Canal</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
                <th className="text-right p-4 text-sm font-medium text-muted-foreground">Ações</th>
              </tr>
            </thead>
            <tbody>
              {eventos.map((evento) => (
                <tr key={evento.id} className="border-b last:border-0">
                  <td className="p-4">{evento.evento}</td>
                  <td className="p-4">{evento.gatilho}</td>
                  <td className="p-4">{evento.antecedencia}</td>
                  <td className="p-4">
                    <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground">
                      {evento.canal}
                    </span>
                  </td>
                  <td className="p-4">
                    <Switch
                      checked={evento.status}
                      onCheckedChange={() => toggleStatus(evento.id!)}
                    />
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => openEditDialog(evento)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteReminder(evento.id!)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {eventos.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-muted-foreground">
                    Nenhum lembrete configurado. Clique em "Criar novo follow-up" para adicionar.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Dialog para adicionar/editar */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{currentReminder?.id ? "Editar Lembrete" : "Novo Lembrete"}</DialogTitle>
          </DialogHeader>
          {currentReminder && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="evento">Nome do evento</Label>
                <Input 
                  id="evento" 
                  value={currentReminder.evento}
                  onChange={(e) => setCurrentReminder({...currentReminder, evento: e.target.value})}
                  placeholder="Ex: Lembrete de consulta"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="gatilho">Tipo de gatilho</Label>
                <Select 
                  value={currentReminder.gatilho}
                  onValueChange={(value) => setCurrentReminder({...currentReminder, gatilho: value})}
                >
                  <SelectTrigger id="gatilho">
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pré-consulta">Pré-consulta</SelectItem>
                    <SelectItem value="Pós-consulta">Pós-consulta</SelectItem>
                    <SelectItem value="Aniversário">Aniversário</SelectItem>
                    <SelectItem value="Data específica">Data específica</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="antecedencia">Antecedência</Label>
                <Select 
                  value={currentReminder.antecedencia}
                  onValueChange={(value) => setCurrentReminder({...currentReminder, antecedencia: value})}
                >
                  <SelectTrigger id="antecedencia">
                    <SelectValue placeholder="Selecione a antecedência" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1 hora">1 hora</SelectItem>
                    <SelectItem value="3 horas">3 horas</SelectItem>
                    <SelectItem value="24 horas">24 horas</SelectItem>
                    <SelectItem value="48 horas">48 horas</SelectItem>
                    <SelectItem value="1 semana">1 semana</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="canal">Canal</Label>
                <Select 
                  value={currentReminder.canal}
                  onValueChange={(value) => setCurrentReminder({...currentReminder, canal: value})}
                >
                  <SelectTrigger id="canal">
                    <SelectValue placeholder="Selecione o canal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Whatsapp">Whatsapp</SelectItem>
                    <SelectItem value="Email">Email</SelectItem>
                    <SelectItem value="SMS">SMS</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center gap-2">
                <Switch 
                  id="status" 
                  checked={currentReminder.status}
                  onCheckedChange={(checked) => setCurrentReminder({...currentReminder, status: checked})}
                />
                <Label htmlFor="status">Ativo</Label>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancelar</Button>
            <Button onClick={() => handleSaveReminder(currentReminder!)} disabled={isSaving}>
              {isSaving ? "Salvando..." : "Salvar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
} 