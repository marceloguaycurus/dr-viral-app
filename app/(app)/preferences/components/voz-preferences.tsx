"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardAction } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Edit } from "lucide-react";

export function VozPreferences() {
  const [voiceSettings, setVoiceSettings] = useState({
    voiceDescription:
      "Profissional, empático, autoritário, informativo e tranquilizador. A comunicação deve transmitir confiança, cuidado e expertise médica, utilizando uma linguagem clara e acessível.",
    ctas: ["Agendar consulta"],
    captionEnding: "",
    copywritingInstructions: "",
    writingSamples: "",
    postLanguage: "English",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setVoiceSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setVoiceSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleCtaChange = (index: number, value: string) => {
    setVoiceSettings((prev) => ({
      ...prev,
      ctas: prev.ctas.map((cta, i) => (i === index ? value : cta)),
    }));
  };

  const addCta = () => {
    setVoiceSettings((prev) => ({
      ...prev,
      ctas: [...prev.ctas, ""],
    }));
  };

  const removeCta = (index: number) => {
    setVoiceSettings((prev) => ({
      ...prev,
      ctas: prev.ctas.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Voice</CardTitle>
          <CardDescription>Your brand's voice defines your unique writing style and personality.</CardDescription>
          <CardAction>
            <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)} className="flex items-center gap-2">
              <Edit className="h-4 w-4" />
              {isEditing ? "Save" : "Edit"}
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Voice Description */}
          <div>
            <Label className="text-sm font-medium">Voice</Label>
            {isEditing ? (
              <Textarea
                name="voiceDescription"
                value={voiceSettings.voiceDescription}
                onChange={handleInputChange}
                className="mt-2 min-h-[100px]"
                rows={4}
              />
            ) : (
              <p className="text-muted-foreground text-sm mt-2">{voiceSettings.voiceDescription}</p>
            )}
          </div>

          {/* Call to Actions (CTAs) */}
          <div>
            <Label className="text-sm font-medium">Call to Actions (CTAs)</Label>
            <div className="mt-2 space-y-2">
              {voiceSettings.ctas.map((cta, index) => (
                <div key={index} className="flex items-start gap-2">
                  <span className="text-muted-foreground text-sm mt-2">{index + 1}.</span>
                  {isEditing ? (
                    <div className="flex-1 flex gap-2">
                      <Input
                        value={cta}
                        onChange={(e) => handleCtaChange(index, e.target.value)}
                        className="flex-1"
                        placeholder="Enter call to action"
                      />
                      <Button variant="outline" size="sm" onClick={() => removeCta(index)} className="mt-0">
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-sm flex-1 mt-1">{cta}</p>
                  )}
                </div>
              ))}
              {isEditing && (
                <Button variant="outline" size="sm" onClick={addCta} className="ml-6">
                  Add CTA
                </Button>
              )}
            </div>
          </div>

          {/* Caption Ending */}
          <div>
            <Label className="text-sm font-medium">Caption Ending</Label>
            {isEditing ? (
              <Textarea
                name="captionEnding"
                value={voiceSettings.captionEnding}
                onChange={handleInputChange}
                className="mt-2 min-h-[80px]"
                rows={3}
                placeholder="Enter caption ending text"
              />
            ) : (
              <p className="text-muted-foreground text-sm mt-2">{voiceSettings.captionEnding || "-"}</p>
            )}
          </div>

          {/* Copywriting Instructions */}
          <div>
            <Label className="text-sm font-medium">Copywriting Instructions</Label>
            {isEditing ? (
              <Textarea
                name="copywritingInstructions"
                value={voiceSettings.copywritingInstructions}
                onChange={handleInputChange}
                className="mt-2 min-h-[100px]"
                rows={4}
                placeholder="Enter copywriting instructions"
              />
            ) : (
              <p className="text-muted-foreground text-sm mt-2">{voiceSettings.copywritingInstructions || "-"}</p>
            )}
          </div>

          {/* Writing Samples */}
          <div>
            <Label className="text-sm font-medium">Writing Samples</Label>
            {isEditing ? (
              <Textarea
                name="writingSamples"
                value={voiceSettings.writingSamples}
                onChange={handleInputChange}
                className="mt-2 min-h-[120px]"
                rows={5}
                placeholder="Enter writing samples"
              />
            ) : (
              <p className="text-muted-foreground text-sm mt-2">{voiceSettings.writingSamples || "-"}</p>
            )}
          </div>

          {/* Post Language */}
          <div>
            <Label className="text-sm font-medium">Post Language</Label>
            {isEditing ? (
              <Select value={voiceSettings.postLanguage} onValueChange={(value) => handleSelectChange("postLanguage", value)}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="Portuguese">Português</SelectItem>
                  <SelectItem value="Spanish">Español</SelectItem>
                  <SelectItem value="French">Français</SelectItem>
                  <SelectItem value="German">Deutsch</SelectItem>
                  <SelectItem value="Italian">Italiano</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <p className="text-muted-foreground text-sm mt-2">{voiceSettings.postLanguage}</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
