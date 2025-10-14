"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardAction } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Edit } from "lucide-react";

export function PerfilPreferences() {
  const [generalInfo, setGeneralInfo] = useState({
    businessName: "Dra. Luísa Kalil",
    industry: "Cardiologia Pediátrica",
    businessEmail: "",
    businessPhone: "",
    socialHandle: "",
    businessWebsite: "https://www.draluisakalil.com.br",
  });

  const [profileInfo, setProfileInfo] = useState({
    coreValues: [
      "Formação sólida e excelência médica",
      "Atendimento humanizado e personalizado",
      "Uso de tecnologia avançada para diagnóstico preciso",
    ],
    niche: [
      "Chefe do Serviço de Cardiologia Pediátrica do Hospital Santa Casa de Porto Alegre",
      "Coordenadora da residência médica de Cardiologia Pediátrica",
      "Especialização em Eletrofisiologia Clínica e Arritmias Cardíacas",
    ],
    audience: [
      "Pais de crianças e adolescentes com suspeita ou diagnóstico de problemas cardíacos",
      "Adultos com cardiopatias congênitas que necessitam de acompanhamento especializado",
      "Pacientes que buscam diagnóstico preciso e plano de tratamento individualizado para arritmias cardíacas",
    ],
    audienceObjectives: [
      "Garantir o diagnóstico precoce e o tratamento adequado de condições cardíacas em crianças e adultos",
      "Oferecer acompanhamento especializado e contínuo para pacientes com cardiopatias congênitas",
      "Proporcionar tranquilidade e segurança aos pacientes e suas famílias através de um atendimento de excelência",
    ],
    audiencePainPoints: [
      "Preocupação e ansiedade dos pais com a saúde cardíaca de seus filhos",
      "Dificuldade em encontrar especialistas altamente qualificados em cardiopatias congênitas do adulto e arritmias pediátricas",
      "Necessidade de acesso a diagnósticos precisos e tratamentos eficazes com tecnologia de ponta",
    ],
  });

  const [isEditingGeneral, setIsEditingGeneral] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  const handleGeneralInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setGeneralInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayFieldChange = (field: keyof typeof profileInfo, index: number, value: string) => {
    setProfileInfo((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item)),
    }));
  };

  const addArrayItem = (field: keyof typeof profileInfo) => {
    setProfileInfo((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
  };

  const removeArrayItem = (field: keyof typeof profileInfo, index: number) => {
    setProfileInfo((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="space-y-6">
      {/* General Information Card */}
      <Card>
        <CardHeader>
          <CardTitle>General Information</CardTitle>
          <CardDescription>The core facts about your business.</CardDescription>
          <CardAction>
            <Button variant="outline" size="sm" onClick={() => setIsEditingGeneral(!isEditingGeneral)} className="flex items-center gap-2">
              <Edit className="h-4 w-4" />
              {isEditingGeneral ? "Save" : "Edit"}
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium">Business Name</Label>
              {isEditingGeneral ? (
                <Input name="businessName" value={generalInfo.businessName} onChange={handleGeneralInfoChange} className="mt-1" />
              ) : (
                <p className="text-muted-foreground mt-1">{generalInfo.businessName}</p>
              )}
            </div>

            <div>
              <Label className="text-sm font-medium">Industry</Label>
              {isEditingGeneral ? (
                <Input name="industry" value={generalInfo.industry} onChange={handleGeneralInfoChange} className="mt-1" />
              ) : (
                <p className="text-muted-foreground mt-1">{generalInfo.industry}</p>
              )}
            </div>

            <div>
              <Label className="text-sm font-medium">Business Email</Label>
              {isEditingGeneral ? (
                <Input
                  name="businessEmail"
                  type="email"
                  value={generalInfo.businessEmail}
                  onChange={handleGeneralInfoChange}
                  className="mt-1"
                  placeholder="Enter business email"
                />
              ) : (
                <p className="text-muted-foreground mt-1">{generalInfo.businessEmail || "-"}</p>
              )}
            </div>

            <div>
              <Label className="text-sm font-medium">Business Phone</Label>
              {isEditingGeneral ? (
                <Input
                  name="businessPhone"
                  value={generalInfo.businessPhone}
                  onChange={handleGeneralInfoChange}
                  className="mt-1"
                  placeholder="Enter business phone"
                />
              ) : (
                <p className="text-muted-foreground mt-1">{generalInfo.businessPhone || "-"}</p>
              )}
            </div>

            <div>
              <Label className="text-sm font-medium">Social Handle</Label>
              {isEditingGeneral ? (
                <Input
                  name="socialHandle"
                  value={generalInfo.socialHandle}
                  onChange={handleGeneralInfoChange}
                  className="mt-1"
                  placeholder="Enter social media handle"
                />
              ) : (
                <p className="text-muted-foreground mt-1">{generalInfo.socialHandle || "-"}</p>
              )}
            </div>

            <div>
              <Label className="text-sm font-medium">Business Website</Label>
              {isEditingGeneral ? (
                <Input name="businessWebsite" value={generalInfo.businessWebsite} onChange={handleGeneralInfoChange} className="mt-1" />
              ) : (
                <p className="text-muted-foreground mt-1">{generalInfo.businessWebsite}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Profile Card */}
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Your profile gives context around your business that assists in creating content.</CardDescription>
          <CardAction>
            <Button variant="outline" size="sm" onClick={() => setIsEditingProfile(!isEditingProfile)} className="flex items-center gap-2">
              <Edit className="h-4 w-4" />
              {isEditingProfile ? "Save" : "Edit"}
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Core Values */}
          <div>
            <Label className="text-sm font-medium">Core Values</Label>
            <div className="mt-2 space-y-2">
              {profileInfo.coreValues.map((value, index) => (
                <div key={index} className="flex items-start gap-2">
                  <span className="text-muted-foreground text-sm mt-1">{index + 1}.</span>
                  {isEditingProfile ? (
                    <div className="flex-1 flex gap-2">
                      <Textarea
                        value={value}
                        onChange={(e) => handleArrayFieldChange("coreValues", index, e.target.value)}
                        className="flex-1 min-h-[60px]"
                        rows={2}
                      />
                      <Button variant="outline" size="sm" onClick={() => removeArrayItem("coreValues", index)} className="mt-1">
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-sm flex-1">{value}</p>
                  )}
                </div>
              ))}
              {isEditingProfile && (
                <Button variant="outline" size="sm" onClick={() => addArrayItem("coreValues")} className="ml-6">
                  Add Value
                </Button>
              )}
            </div>
          </div>

          {/* Niche */}
          <div>
            <Label className="text-sm font-medium">Niche</Label>
            <div className="mt-2 space-y-2">
              {profileInfo.niche.map((item, index) => (
                <div key={index} className="flex items-start gap-2">
                  <span className="text-muted-foreground text-sm mt-1">{index + 1}.</span>
                  {isEditingProfile ? (
                    <div className="flex-1 flex gap-2">
                      <Textarea
                        value={item}
                        onChange={(e) => handleArrayFieldChange("niche", index, e.target.value)}
                        className="flex-1 min-h-[60px]"
                        rows={2}
                      />
                      <Button variant="outline" size="sm" onClick={() => removeArrayItem("niche", index)} className="mt-1">
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-sm flex-1">{item}</p>
                  )}
                </div>
              ))}
              {isEditingProfile && (
                <Button variant="outline" size="sm" onClick={() => addArrayItem("niche")} className="ml-6">
                  Add Niche
                </Button>
              )}
            </div>
          </div>

          {/* Audience */}
          <div>
            <Label className="text-sm font-medium">Audience</Label>
            <div className="mt-2 space-y-2">
              {profileInfo.audience.map((item, index) => (
                <div key={index} className="flex items-start gap-2">
                  <span className="text-muted-foreground text-sm mt-1">{index + 1}.</span>
                  {isEditingProfile ? (
                    <div className="flex-1 flex gap-2">
                      <Textarea
                        value={item}
                        onChange={(e) => handleArrayFieldChange("audience", index, e.target.value)}
                        className="flex-1 min-h-[60px]"
                        rows={2}
                      />
                      <Button variant="outline" size="sm" onClick={() => removeArrayItem("audience", index)} className="mt-1">
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-sm flex-1">{item}</p>
                  )}
                </div>
              ))}
              {isEditingProfile && (
                <Button variant="outline" size="sm" onClick={() => addArrayItem("audience")} className="ml-6">
                  Add Audience
                </Button>
              )}
            </div>
          </div>

          {/* Audience Objectives */}
          <div>
            <Label className="text-sm font-medium">Audience Objectives</Label>
            <div className="mt-2 space-y-2">
              {profileInfo.audienceObjectives.map((item, index) => (
                <div key={index} className="flex items-start gap-2">
                  <span className="text-muted-foreground text-sm mt-1">{index + 1}.</span>
                  {isEditingProfile ? (
                    <div className="flex-1 flex gap-2">
                      <Textarea
                        value={item}
                        onChange={(e) => handleArrayFieldChange("audienceObjectives", index, e.target.value)}
                        className="flex-1 min-h-[60px]"
                        rows={2}
                      />
                      <Button variant="outline" size="sm" onClick={() => removeArrayItem("audienceObjectives", index)} className="mt-1">
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-sm flex-1">{item}</p>
                  )}
                </div>
              ))}
              {isEditingProfile && (
                <Button variant="outline" size="sm" onClick={() => addArrayItem("audienceObjectives")} className="ml-6">
                  Add Objective
                </Button>
              )}
            </div>
          </div>

          {/* Audience Pain Points */}
          <div>
            <Label className="text-sm font-medium">Audience Pain Points</Label>
            <div className="mt-2 space-y-2">
              {profileInfo.audiencePainPoints.map((item, index) => (
                <div key={index} className="flex items-start gap-2">
                  <span className="text-muted-foreground text-sm mt-1">{index + 1}.</span>
                  {isEditingProfile ? (
                    <div className="flex-1 flex gap-2">
                      <Textarea
                        value={item}
                        onChange={(e) => handleArrayFieldChange("audiencePainPoints", index, e.target.value)}
                        className="flex-1 min-h-[60px]"
                        rows={2}
                      />
                      <Button variant="outline" size="sm" onClick={() => removeArrayItem("audiencePainPoints", index)} className="mt-1">
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-sm flex-1">{item}</p>
                  )}
                </div>
              ))}
              {isEditingProfile && (
                <Button variant="outline" size="sm" onClick={() => addArrayItem("audiencePainPoints")} className="ml-6">
                  Add Pain Point
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
