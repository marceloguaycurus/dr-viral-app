"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils/utils";
import { Switch } from "@/components/ui/switch";
import { Calendar, Clock, XCircle, RefreshCcw, Bell } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { useClinic } from "@/context/clinic-context";

export type AgentConfigData = {
  displayName: string;
  avatarPreview: string | null;
  tone: number;
  activeScopes: Record<string, boolean>;
};

interface AgentIdFormProps {
  data: AgentConfigData;
  error?: string | null;
  isSaving?: boolean;
  onSave: (data: AgentConfigData) => Promise<void>;
}

export function AgentIdForm({
  data,
  error,
  isSaving,
  onSave,
}: AgentIdFormProps) {
  const [displayName, setDisplayName] = useState(data.displayName);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(
    data.avatarPreview
  );
  const [tone, setTone] = useState(data.tone);
  const [activeScopes, setActiveScopes] = useState(data.activeScopes);
  const [localError, setLocalError] = useState<string | null>(error || null);
  const [saving, setSaving] = useState(isSaving || false);
  const toneLabels = ["Formal", "Neutro", "Casual"];

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleScope = (key: string) => {
    setActiveScopes((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    setLocalError(null);
    try {
      await onSave({
        displayName,
        avatarPreview,
        tone,
        activeScopes,
      });
    } catch (e: any) {
      setLocalError(e.message || "Erro ao salvar configuração da agente");
    } finally {
      setSaving(false);
    }
  };

  if (localError) {
    return <div className="p-6 text-center text-destructive">{localError}</div>;
  }

  // Disable UI while loading
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-medium">Identidade da Agente</h3>
        <p className="text-sm text-muted-foreground">
          Configure como a Dora se apresenta aos seus pacientes no WhatsApp
        </p>
      </div>
      <Separator />
      <div className="grid grid-cols-[2fr_1fr] gap-6">
        {/* Left Column - Text Settings */}
        <div className="space-y-6">
          {/* Display Name Section */}
          <div className="space-y-1">
            <Label htmlFor="displayName">Nome de exibição</Label>
            <Input
              id="displayName"
              placeholder="Nome de exibição"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Este nome aparecerá nas mensagens de WhatsApp.
            </p>
          </div>

          {/* Voice Tone Section */}
          <div className="space-y-2">
            <Label>Tom de voz</Label>
            <Slider
              value={[tone]}
              onValueChange={(values) => setTone(values[0])}
              max={2}
              step={1}
              className="my-6"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              {toneLabels.map((label, index) => (
                <span
                  key={label}
                  className={tone === index ? "font-medium text-primary" : ""}
                >
                  {label}
                </span>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              Afeta emojis, contrações e grau de formalidade nas respostas.
            </p>
          </div>
        </div>

        {/* Right Column - Avatar */}
        <div className="space-y-1">
          <Label>Foto de perfil</Label>
          <div className="flex flex-col items-center gap-2">
            <div
              className={cn(
                "w-24 h-24 rounded-full flex items-center justify-center bg-muted overflow-hidden border border-input",
                !avatarPreview && "text-muted-foreground"
              )}
            >
              {avatarPreview ? (
                <Image
                  src={avatarPreview}
                  alt="Avatar preview"
                  className="w-full h-full object-cover"
                  width={96}
                  height={96}
                />
              ) : (
                <span className="text-sm">Dora</span>
              )}
            </div>
            <div className="w-full mt-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() =>
                  document.getElementById("avatar-upload")?.click()
                }
              >
                Fazer upload
              </Button>
              <Input
                id="avatar-upload"
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
            </div>
          </div>
        </div>
      </div>

      <Separator />

      {/* Agent Scope Section */}
      <div>
        <h3 className="text-xl font-medium">Escopo da Agente</h3>
        <p className="text-sm text-muted-foreground">
          Selecione as atividades que a agente estará habilitada a executar
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {/* Card 1 */}
        <Card
          className={cn(
            "border-1 transition-all duration-200 cursor-pointer",
            activeScopes.scheduling ? "border-primary" : "border-border"
          )}
          onClick={() => toggleScope("scheduling")}
        >
          <CardHeader>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-primary" />
                <CardTitle>Agendamento</CardTitle>
              </div>
              <Switch
                checked={activeScopes.scheduling}
                onCheckedChange={() => toggleScope("scheduling")}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              A Dora poderá agendar novas consultas com base na agenda dos
              médicos.
            </p>
          </CardContent>
        </Card>

        {/* Card 2 */}
        <Card
          className={cn(
            "border-1 transition-all duration-200 cursor-pointer",
            activeScopes.consultation ? "border-primary" : "border-border"
          )}
          onClick={() => toggleScope("consultation")}
        >
          <CardHeader>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-primary" />
                <CardTitle>Reagendamento</CardTitle>
              </div>
              <Switch
                checked={activeScopes.consultation}
                onCheckedChange={() => toggleScope("consultation")}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Permite que a Dora reagende consultas com base na agenda dos
              médicos.
            </p>
          </CardContent>
        </Card>

        {/* Card 3 */}
        <Card
          className={cn(
            "border-1 transition-all duration-200 cursor-pointer",
            activeScopes.reminder ? "border-primary" : "border-border"
          )}
          onClick={() => toggleScope("reminder")}
        >
          <CardHeader>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <XCircle className="h-5 w-5 text-primary" />
                <CardTitle>Cancelamento</CardTitle>
              </div>
              <Switch
                checked={activeScopes.reminder}
                onCheckedChange={() => toggleScope("reminder")}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              A Dora poderá cancelar consultas existentes na agenda dos médicos.
            </p>
          </CardContent>
        </Card>

        {/* Card 4 */}
        <Card
          className={cn(
            "border-1 transition-all duration-200 cursor-pointer",
            activeScopes.education ? "border-primary" : "border-border"
          )}
          onClick={() => toggleScope("education")}
        >
          <CardHeader>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <RefreshCcw className="h-5 w-5 text-primary" />
                <CardTitle>Reativação</CardTitle>
              </div>
              <Switch
                checked={activeScopes.education}
                onCheckedChange={() => toggleScope("education")}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              A Dora poderá reativar conversas não finalizadas.
            </p>
          </CardContent>
        </Card>

        {/* Card 5 */}
        <Card
          className={cn(
            "border-1 transition-all duration-200 cursor-pointer",
            activeScopes.prevention ? "border-primary" : "border-border"
          )}
          onClick={() => toggleScope("prevention")}
        >
          <CardHeader>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Bell className="h-5 w-5 text-primary" />
                <CardTitle>Lembretes</CardTitle>
              </div>
              <Switch
                checked={activeScopes.prevention}
                onCheckedChange={() => toggleScope("prevention")}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Envia lembretes próximos a consultas.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button disabled={saving} onClick={handleSave}>
          {saving ? "Salvando..." : "Salvar alterações"}
        </Button>
      </div>
    </div>
  );
}

export default function AgentConfigPage() {
  const { currentClinic, isLoading, error } = useClinic();

  if (isLoading && !currentClinic) {
    return <div>Carregando clínica...</div>;
  }
  if (error) {
    return <div>Erro ao carregar clínica: {error.message}</div>;
  }
  if (!currentClinic) {
    return <div>Nenhuma clínica selecionada.</div>;
  }

  // ... renderiza normalmente usando currentClinic ...
}
