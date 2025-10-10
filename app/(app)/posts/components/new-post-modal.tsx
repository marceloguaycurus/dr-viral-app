"use client"

import { useState } from "react"
import { X, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface NewPostModalProps {
  isOpen: boolean
  onClose: () => void
  onGenerate: () => void
}

export function NewPostModal({ isOpen, onClose, onGenerate }: NewPostModalProps) {
  const [category, setCategory] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [autoGenerateCaption, setAutoGenerateCaption] = useState<boolean>(true)

  const handleGenerate = () => {
    onGenerate()
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />

      {/* Modal - Full screen on mobile, centered modal on desktop */}
      <div className="fixed inset-0 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-lg z-50">
        <div className="bg-background h-full md:h-auto md:rounded-lg shadow-lg flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">Novo Post</h2>
            <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Category Dropdown */}
            <div className="space-y-2">
              <Label htmlFor="category">Categoria</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="produto">Produto</SelectItem>
                  <SelectItem value="servico">Serviço</SelectItem>
                  <SelectItem value="promocao">Promoção</SelectItem>
                  <SelectItem value="dica">Dica</SelectItem>
                  <SelectItem value="novidade">Novidade</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Description Textarea */}
            <div className="space-y-2">
              <Label htmlFor="description">Descreva seu post</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={6}
                className="resize-none"
                placeholder="Digite a descrição do seu post..."
              />
            </div>

            {/* Auto Generate Caption Checkbox */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="auto-caption"
                checked={autoGenerateCaption}
                onCheckedChange={(checked) => setAutoGenerateCaption(checked as boolean)}
              />
              <Label htmlFor="auto-caption" className="text-sm font-normal cursor-pointer">
                Gerar legenda automaticamente
              </Label>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t">
            <Button className="w-full" size="lg" onClick={handleGenerate}>
              <Sparkles className="h-4 w-4 mr-2" />
              Gerar
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
