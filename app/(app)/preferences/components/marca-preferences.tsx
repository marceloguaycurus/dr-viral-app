"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardAction, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, X } from "lucide-react";
import Image from "next/image";

export function MarcaPreferences() {
  const [brandSettings, setBrandSettings] = useState({
    logo: null as File | null,
    palettes: [["#6B9B7A", "#9CA3AF", "#374151"]],
    headerFont: "theme",
    bodyFont: "theme",
  });

  const [isEditMode, setIsEditMode] = useState(false);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setBrandSettings((prev) => ({ ...prev, logo: file }));
    }
  };

  const handleColorChange = (paletteIndex: number, colorIndex: number, color: string) => {
    const newPalettes = [...brandSettings.palettes];
    newPalettes[paletteIndex][colorIndex] = color;
    setBrandSettings((prev) => ({ ...prev, palettes: newPalettes }));
  };

  const addPalette = () => {
    setBrandSettings((prev) => ({
      ...prev,
      palettes: [...prev.palettes, ["#000000", "#666666", "#CCCCCC"]],
    }));
  };

  const handleEditBrand = () => {
    setIsEditMode(!isEditMode);
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
  };

  const deleteLogo = () => {
    setBrandSettings((prev) => ({ ...prev, logo: null }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setBrandSettings((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Your Brand</CardTitle>
          <p className="text-sm text-muted-foreground">
            Choose how your business presents itself. Marky uses your brand to give a unique look to the posts it generates.
          </p>
          <CardAction>
            <div className="flex gap-2">
              {isEditMode && (
                <Button variant="ghost" onClick={handleCancelEdit}>
                  Cancel
                </Button>
              )}
              <Button variant="outline" onClick={handleEditBrand}>
                {isEditMode ? "Save Brand" : "Edit Brand"}
              </Button>
            </div>
          </CardAction>
        </CardHeader>

        <CardContent className="space-y-8">
          {/* Logo Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Logo</h3>

              {/* Logo Display */}
              <div className="relative w-24 h-24 bg-gray-100 rounded-2xl flex items-center justify-center border-2 border-dashed border-gray-300">
                {brandSettings.logo ? (
                  <>
                    <Image
                      src={URL.createObjectURL(brandSettings.logo)}
                      alt="Logo"
                      className="w-full h-full object-contain rounded-2xl"
                      width={96}
                      height={96}
                    />
                    {isEditMode && (
                      <button
                        onClick={deleteLogo}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center text-white shadow-md transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </>
                ) : (
                  <div className="text-gray-400 text-xs text-center">No logo</div>
                )}
              </div>

              {/* Upload Button */}
              {isEditMode && (
                <div>
                  <input type="file" id="logo-upload" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                  <Button variant="outline" onClick={() => document.getElementById("logo-upload")?.click()} className="w-full">
                    Upload Logo
                  </Button>
                </div>
              )}
            </div>

            {/* Color Palettes Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Color Palettes</h3>

              {/* Palette List */}
              <div className="space-y-3">
                {brandSettings.palettes.map((palette, paletteIndex) => (
                  <div key={paletteIndex} className="flex items-center gap-3">
                    {palette.map((color, colorIndex) => (
                      <div key={colorIndex} className="relative">
                        <input
                          type="color"
                          value={color}
                          onChange={(e) => handleColorChange(paletteIndex, colorIndex, e.target.value)}
                          disabled={!isEditMode}
                          className="w-12 h-12 rounded-lg border-2 border-gray-200 cursor-pointer disabled:cursor-not-allowed"
                          style={{ backgroundColor: color }}
                        />
                      </div>
                    ))}
                  </div>
                ))}

                {/* Add Palette Button */}
                {isEditMode && (
                  <Button variant="outline" size="sm" onClick={addPalette} className="flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Add Palette
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Font Section */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Font</h3>
              <p className="text-sm text-muted-foreground">Choose fonts to use on all your posts.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Header Font */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Header Font</Label>
                <Select
                  value={brandSettings.headerFont}
                  onValueChange={(value) => handleSelectChange("headerFont", value)}
                  disabled={!isEditMode}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="theme">Theme Font</SelectItem>
                    <SelectItem value="inter">Inter</SelectItem>
                    <SelectItem value="roboto">Roboto</SelectItem>
                    <SelectItem value="opensans">Open Sans</SelectItem>
                    <SelectItem value="lato">Lato</SelectItem>
                    <SelectItem value="montserrat">Montserrat</SelectItem>
                    <SelectItem value="poppins">Poppins</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Body Font */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Body Font</Label>
                <Select
                  value={brandSettings.bodyFont}
                  onValueChange={(value) => handleSelectChange("bodyFont", value)}
                  disabled={!isEditMode}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="theme">Theme Font</SelectItem>
                    <SelectItem value="inter">Inter</SelectItem>
                    <SelectItem value="roboto">Roboto</SelectItem>
                    <SelectItem value="opensans">Open Sans</SelectItem>
                    <SelectItem value="lato">Lato</SelectItem>
                    <SelectItem value="montserrat">Montserrat</SelectItem>
                    <SelectItem value="poppins">Poppins</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
