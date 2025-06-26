'use client'

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

// Define types for business hours
type DaySchedule = {
  isOpen: boolean;
  open: string;
  close: string;
};

type BusinessHours = {
  sunday: DaySchedule;
  monday: DaySchedule;
  tuesday: DaySchedule;
  wednesday: DaySchedule;
  thursday: DaySchedule;
  friday: DaySchedule;
  saturday: DaySchedule;
};

interface ClinicInfoProps {
  data: {
    clinicName: string;
    address: string;
    landlinePhone: string;
    mobilePhone: string;
    email: string;
    website: string;
    businessHours: BusinessHours;
  } | null;
  error: string | null;
  onSave: (data: any) => void;
}

export function ClinicInfo({ data, error, onSave }: ClinicInfoProps) {
  const [clinicName, setClinicName] = useState("");
  const [address, setAddress] = useState("");
  const [landlinePhone, setLandlinePhone] = useState("");
  const [mobilePhone, setMobilePhone] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  
  // Business hours state
  const [businessHours, setBusinessHours] = useState<BusinessHours>({
    sunday: { isOpen: false, open: "09:00", close: "17:00" },
    monday: { isOpen: true, open: "09:00", close: "17:00" },
    tuesday: { isOpen: true, open: "09:00", close: "17:00" },
    wednesday: { isOpen: true, open: "09:00", close: "17:00" },
    thursday: { isOpen: true, open: "09:00", close: "17:00" },
    friday: { isOpen: true, open: "09:00", close: "17:00" },
    saturday: { isOpen: false, open: "09:00", close: "17:00" },
  });

  // Carregar dados quando disponíveis
  useEffect(() => {
    if (data) {
      setClinicName(data.clinicName || "");
      setAddress(data.address || "");
      setLandlinePhone(data.landlinePhone || "");
      setMobilePhone(data.mobilePhone || "");
      setEmail(data.email || "");
      setWebsite(data.website || "");
      
      if (data.businessHours) {
        setBusinessHours(data.businessHours);
      }
    }
  }, [data]);

  const handleBusinessHourChange = (
    day: keyof BusinessHours, 
    field: keyof DaySchedule, 
    value: string | boolean
  ) => {
    setBusinessHours(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value
      }
    }));
  };

  const handleSubmit = async () => {
    try {
      setIsSaving(true);
      await onSave({
        clinicName,
        address,
        landlinePhone,
        mobilePhone,
        email,
        website,
        businessHours,
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
        <h3 className="text-xl font-medium">Informações da Clínica</h3>
        <p className="text-sm text-muted-foreground">
          Configure as informações da sua clínica que serão utilizadas pela Dora
        </p>
      </div>
      <Separator />
      <div className="space-y-6">
        {/* Nome and Email row */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label htmlFor="clinicName">Nome</Label>
            <Input 
              id="clinicName" 
              placeholder="Nome da clínica" 
              value={clinicName}
              onChange={(e) => setClinicName(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Nome que será utilizado nas comunicações com pacientes.
            </p>
          </div>
          <div className="space-y-1">
            <Label htmlFor="email">E-mail</Label>
            <Input 
              id="email" 
              type="email"
              placeholder="E-mail de contato" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              E-mail para contato com a clínica.
            </p>
          </div>
        </div>
        
        {/* Telefones */}
        <div className="space-y-2">
          <Label>Telefone</Label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Input 
                id="landlinePhone" 
                placeholder="Telefone fixo" 
                value={landlinePhone}
                onChange={(e) => setLandlinePhone(e.target.value)}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Telefone fixo
              </p>
            </div>
            <div>
              <Input 
                id="mobilePhone" 
                placeholder="Celular" 
                value={mobilePhone}
                onChange={(e) => setMobilePhone(e.target.value)}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Telefone celular
              </p>
            </div>
          </div>
        </div>
        
        {/* Endereço and Website row */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label htmlFor="address">Endereço</Label>
            <Input 
              id="address" 
              placeholder="Endereço completo" 
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Endereço completo da clínica incluindo CEP.
            </p>
          </div>
          <div className="space-y-1">
            <Label htmlFor="website">Site</Label>
            <Input 
              id="website" 
              placeholder="https://www.suaclinica.com.br" 
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Site da clínica (opcional)
            </p>
          </div>
        </div>
      </div>
      
      {/* Business Hours Section */}
      <Separator />
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">Horários de Funcionamento</h3>
          <p className="text-sm text-muted-foreground">
            Configure os horários em que a clínica está aberta para atendimento
          </p>
        </div>
        
        <div className="space-y-3">
          
          {/* Monday */}
          <div className="grid grid-cols-[1fr_2fr_3fr] items-center">
            <div>
              <Label className="text-sm">Segunda</Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch 
                checked={businessHours.monday.isOpen}
                onCheckedChange={(checked: boolean) => handleBusinessHourChange('monday', 'isOpen', checked)}
              />
              <span className="text-sm text-muted-foreground">
                {businessHours.monday.isOpen ? 'Aberto' : 'Fechado'}
              </span>
            </div>
            {businessHours.monday.isOpen ? (
              <div className="flex items-center gap-2">
                <Input 
                  type="time" 
                  value={businessHours.monday.open}
                  onChange={(e) => handleBusinessHourChange('monday', 'open', e.target.value)}
                  className="w-32"
                />
                <span className="text-sm">Até</span>
                <Input 
                  type="time" 
                  value={businessHours.monday.close}
                  onChange={(e) => handleBusinessHourChange('monday', 'close', e.target.value)}
                  className="w-32"
                />
              </div>
            ) : (
              <div className="flex justify-end mr-[120px]">
              </div>
            )}
          </div>
          
          {/* Tuesday */}
          <div className="grid grid-cols-[1fr_2fr_3fr] items-center">
            <div>
              <Label className="text-sm">Terça</Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch 
                checked={businessHours.tuesday.isOpen}
                onCheckedChange={(checked: boolean) => handleBusinessHourChange('tuesday', 'isOpen', checked)}
              />
              <span className="text-sm text-muted-foreground">
                {businessHours.tuesday.isOpen ? 'Aberto' : 'Fechado'}
              </span>
            </div>
            {businessHours.tuesday.isOpen ? (
              <div className="flex items-center gap-2">
                <Input 
                  type="time" 
                  value={businessHours.tuesday.open}
                  onChange={(e) => handleBusinessHourChange('tuesday', 'open', e.target.value)}
                  className="w-32"
                />
                <span className="text-sm">Até</span>
                <Input 
                  type="time" 
                  value={businessHours.tuesday.close}
                  onChange={(e) => handleBusinessHourChange('tuesday', 'close', e.target.value)}
                  className="w-32"
                />
              </div>
            ) : (
              <div className="flex justify-end mr-[120px]">
              </div>
            )}
          </div>
          
          {/* Wednesday */}
          <div className="grid grid-cols-[1fr_2fr_3fr] items-center">
            <div>
              <Label className="text-sm">Quarta</Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch 
                checked={businessHours.wednesday.isOpen}
                onCheckedChange={(checked: boolean) => handleBusinessHourChange('wednesday', 'isOpen', checked)}
              />
              <span className="text-sm text-muted-foreground">
                {businessHours.wednesday.isOpen ? 'Aberto' : 'Fechado'}
              </span>
            </div>
            {businessHours.wednesday.isOpen ? (
              <div className="flex items-center gap-2">
                <Input 
                  type="time" 
                  value={businessHours.wednesday.open}
                  onChange={(e) => handleBusinessHourChange('wednesday', 'open', e.target.value)}
                  className="w-32"
                />
                <span className="text-sm">Até</span>
                <Input 
                  type="time" 
                  value={businessHours.wednesday.close}
                  onChange={(e) => handleBusinessHourChange('wednesday', 'close', e.target.value)}
                  className="w-32"
                />
              </div>
            ) : (
              <div className="flex justify-end mr-[120px]">
              </div>
            )}
          </div>
          
          {/* Thursday */}
          <div className="grid grid-cols-[1fr_2fr_3fr] items-center">
            <div>
              <Label className="text-sm">Quinta</Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch 
                checked={businessHours.thursday.isOpen}
                onCheckedChange={(checked: boolean) => handleBusinessHourChange('thursday', 'isOpen', checked)}
              />
              <span className="text-sm text-muted-foreground">
                {businessHours.thursday.isOpen ? 'Aberto' : 'Fechado'}
              </span>
            </div>
            {businessHours.thursday.isOpen ? (
              <div className="flex items-center gap-2">
                <Input 
                  type="time" 
                  value={businessHours.thursday.open}
                  onChange={(e) => handleBusinessHourChange('thursday', 'open', e.target.value)}
                  className="w-32"
                />
                <span className="text-sm">Até</span>
                <Input 
                  type="time" 
                  value={businessHours.thursday.close}
                  onChange={(e) => handleBusinessHourChange('thursday', 'close', e.target.value)}
                  className="w-32"
                />
              </div>
            ) : (
              <div className="flex justify-end mr-[120px]">
              </div>
            )}
          </div>
          
          {/* Friday */}
          <div className="grid grid-cols-[1fr_2fr_3fr] items-center">
            <div>
              <Label className="text-sm">Sexta</Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch 
                checked={businessHours.friday.isOpen}
                onCheckedChange={(checked: boolean) => handleBusinessHourChange('friday', 'isOpen', checked)}
              />
              <span className="text-sm text-muted-foreground">
                {businessHours.friday.isOpen ? 'Aberto' : 'Fechado'}
              </span>
            </div>
            {businessHours.friday.isOpen ? (
              <div className="flex items-center gap-2">
                <Input 
                  type="time" 
                  value={businessHours.friday.open}
                  onChange={(e) => handleBusinessHourChange('friday', 'open', e.target.value)}
                  className="w-32"
                />
                <span className="text-sm">Até</span>
                <Input 
                  type="time" 
                  value={businessHours.friday.close}
                  onChange={(e) => handleBusinessHourChange('friday', 'close', e.target.value)}
                  className="w-32"
                />
              </div>
            ) : (
              <div className="flex justify-end mr-[120px]">
              </div>
            )}
          </div>
          
          {/* Saturday */}
          <div className="grid grid-cols-[1fr_2fr_3fr] items-center">
            <div>
              <Label className="text-sm">Sábado</Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch 
                checked={businessHours.saturday.isOpen}
                onCheckedChange={(checked: boolean) => handleBusinessHourChange('saturday', 'isOpen', checked)}
              />
              <span className="text-sm text-muted-foreground">
                {businessHours.saturday.isOpen ? 'Aberto' : 'Fechado'}
              </span>
            </div>
            {businessHours.saturday.isOpen ? (
              <div className="flex items-center gap-2">
                <Input 
                  type="time" 
                  value={businessHours.saturday.open}
                  onChange={(e) => handleBusinessHourChange('saturday', 'open', e.target.value)}
                  className="w-32"
                />
                <span className="text-sm">Até</span>
                <Input 
                  type="time" 
                  value={businessHours.saturday.close}
                  onChange={(e) => handleBusinessHourChange('saturday', 'close', e.target.value)}
                  className="w-32"
                />
              </div>
            ) : (
              <div className="flex justify-end mr-[120px]">
              </div>
            )}
          </div>

            {/* Sunday */}
        <div className="grid grid-cols-[1fr_2fr_3fr] items-center">
            <div>
              <Label className="text-sm">Domingo</Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch 
                checked={businessHours.sunday.isOpen}
                onCheckedChange={(checked: boolean) => handleBusinessHourChange('sunday', 'isOpen', checked)}
              />
              <span className="text-sm text-muted-foreground">
                {businessHours.sunday.isOpen ? 'Aberto' : 'Fechado'}
              </span>
            </div>
            {businessHours.sunday.isOpen ? (
              <div className="flex items-center gap-2">
                <Input 
                  type="time" 
                  value={businessHours.sunday.open}
                  onChange={(e) => handleBusinessHourChange('sunday', 'open', e.target.value)}
                  className="w-32"
                />
                <span className="text-sm">Até</span>
                <Input 
                  type="time" 
                  value={businessHours.sunday.close}
                  onChange={(e) => handleBusinessHourChange('sunday', 'close', e.target.value)}
                  className="w-32"
                />
              </div>
            ) : (
              <div className="flex justify-end mr-[120px]">
              </div>
            )}
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