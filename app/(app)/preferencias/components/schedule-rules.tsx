'use client'

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

// Define types for rescheduling options
type ReschedulingOption = {
  value: string;
  label: string;
};

interface ScheduleRulesProps {
  data: {
    minWindowHours: string;
    minWindowUnit: string;
    cancelDeadlineHours: string;
    cancelDeadlineUnit: string;
    maxReschedulingsValue: string;
    allowOverbooking: boolean;
  } | null;
  error: string | null;
  onSave: (data: any) => void;
}

// Rescheduling options array
const reschedulingOptions: ReschedulingOption[] = [
  { value: "1", label: "1 reagendamento" },
  { value: "2", label: "2 reagendamentos" },
  { value: "3", label: "3 reagendamentos" },
  { value: "unlimited", label: "Ilimitado" },
];

export function ScheduleRules({ data, error, onSave }: ScheduleRulesProps) {
  // Minimum window before appointment
  const [minWindowHours, setMinWindowHours] = useState("2");
  const [minWindowUnit, setMinWindowUnit] = useState("horas");
  
  // Cancellation deadline
  const [cancelDeadlineHours, setCancelDeadlineHours] = useState("24");
  const [cancelDeadlineUnit, setCancelDeadlineUnit] = useState("horas");
  
  // Max reschedulings
  const [maxReschedulingsOpen, setMaxReschedulingsOpen] = useState(false);
  const [maxReschedulingsValue, setMaxReschedulingsValue] = useState("2");
  
  // Overbooking allowed
  const [allowOverbooking, setAllowOverbooking] = useState(false);
  
  const [isSaving, setIsSaving] = useState(false);

  // Carregar dados quando disponíveis
  useEffect(() => {
    if (data) {
      setMinWindowHours(data.minWindowHours || "2");
      setMinWindowUnit(data.minWindowUnit || "horas");
      setCancelDeadlineHours(data.cancelDeadlineHours || "24");
      setCancelDeadlineUnit(data.cancelDeadlineUnit || "horas");
      setMaxReschedulingsValue(data.maxReschedulingsValue || "2");
      setAllowOverbooking(data.allowOverbooking || false);
    }
  }, [data]);

  const handleSubmit = async () => {
    try {
      setIsSaving(true);
      await onSave({
        minWindowHours,
        minWindowUnit,
        cancelDeadlineHours,
        cancelDeadlineUnit,
        maxReschedulingsValue,
        allowOverbooking
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
        <h3 className="text-xl font-medium">Regras de Agendamento</h3>
        <p className="text-sm text-muted-foreground">
          Defina os parâmetros para agendamento, cancelamento e reagendamento de consultas
        </p>
      </div>
      <Separator />
      
      <div className="space-y-6">
        {/* Minimum window before appointment */}
        <div className="space-y-1">
          <Label htmlFor="minWindowHours">Janela mínima antes da consulta</Label>
          <div className="flex items-center gap-3">
            <Input
              id="minWindowHours"
              type="number"
              value={minWindowHours}
              onChange={(e) => setMinWindowHours(e.target.value)}
              className="w-24"
              min="1"
            />
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  className="w-32 justify-between"
                >
                  {minWindowUnit}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-32 p-0">
                <Command>
                  <CommandInput placeholder="Buscar unidade..." />
                  <CommandList>
                    <CommandEmpty>Nenhuma opção encontrada.</CommandEmpty>
                    <CommandGroup>
                      <CommandItem
                        value="minutos"
                        onSelect={() => setMinWindowUnit("minutos")}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            minWindowUnit === "minutos" ? "opacity-100" : "opacity-0"
                          )}
                        />
                        minutos
                      </CommandItem>
                      <CommandItem
                        value="horas"
                        onSelect={() => setMinWindowUnit("horas")}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            minWindowUnit === "horas" ? "opacity-100" : "opacity-0"
                          )}
                        />
                        horas
                      </CommandItem>
                      <CommandItem
                        value="dias"
                        onSelect={() => setMinWindowUnit("dias")}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            minWindowUnit === "dias" ? "opacity-100" : "opacity-0"
                          )}
                        />
                        dias
                      </CommandItem>
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
          <p className="text-xs text-muted-foreground">
            Evita marcações de última hora
          </p>
        </div>
        
        {/* Cancellation deadline */}
        <div className="space-y-1">
          <Label htmlFor="cancelDeadlineHours">Prazo limite para cancelamento</Label>
          <div className="flex items-center gap-3">
            <Input
              id="cancelDeadlineHours"
              type="number"
              value={cancelDeadlineHours}
              onChange={(e) => setCancelDeadlineHours(e.target.value)}
              className="w-24"
              min="1"
            />
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  className="w-32 justify-between"
                >
                  {cancelDeadlineUnit}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-32 p-0">
                <Command>
                  <CommandInput placeholder="Buscar unidade..." />
                  <CommandList>
                    <CommandEmpty>Nenhuma opção encontrada.</CommandEmpty>
                    <CommandGroup>
                      <CommandItem
                        value="minutos"
                        onSelect={() => setCancelDeadlineUnit("minutos")}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            cancelDeadlineUnit === "minutos" ? "opacity-100" : "opacity-0"
                          )}
                        />
                        minutos
                      </CommandItem>
                      <CommandItem
                        value="horas"
                        onSelect={() => setCancelDeadlineUnit("horas")}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            cancelDeadlineUnit === "horas" ? "opacity-100" : "opacity-0"
                          )}
                        />
                        horas
                      </CommandItem>
                      <CommandItem
                        value="dias"
                        onSelect={() => setCancelDeadlineUnit("dias")}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            cancelDeadlineUnit === "dias" ? "opacity-100" : "opacity-0"
                          )}
                        />
                        dias
                      </CommandItem>
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
          <p className="text-xs text-muted-foreground">
            Define até quando o paciente pode cancelar sem ligar para a recepção
          </p>
        </div>
        
        {/* Maximum reschedulings */}
        <div className="space-y-1">
          <Label htmlFor="maxReschedulings">Máximo de reagendamentos por paciente</Label>
          <Popover open={maxReschedulingsOpen} onOpenChange={setMaxReschedulingsOpen}>
            <PopoverTrigger asChild>
              <Button
                id="maxReschedulings"
                variant="outline"
                role="combobox"
                aria-expanded={maxReschedulingsOpen}
                className="w-[200px] justify-between"
              >
                {reschedulingOptions.find((option) => option.value === maxReschedulingsValue)?.label || "Selecione..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Buscar opção..." />
                <CommandList>
                  <CommandEmpty>Nenhuma opção encontrada.</CommandEmpty>
                  <CommandGroup>
                    {reschedulingOptions.map((option) => (
                      <CommandItem
                        key={option.value}
                        value={option.value}
                        onSelect={(currentValue) => {
                          setMaxReschedulingsValue(currentValue === maxReschedulingsValue ? "" : currentValue);
                          setMaxReschedulingsOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            maxReschedulingsValue === option.value ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {option.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        
        {/* Overbooking option */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Switch
              id="allowOverbooking"
              checked={allowOverbooking}
              onCheckedChange={setAllowOverbooking}
            />
            <Label htmlFor="allowOverbooking" className="cursor-pointer">
              Permitir sobre-agendamento (encaixes)
            </Label>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button onClick={handleSubmit} disabled={isSaving}>
          {isSaving ? "Salvando..." : "Salvar alterações"}
        </Button>
      </div>
    </div>
  );
} 