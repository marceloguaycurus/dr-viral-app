"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type NewPostModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onGenerate: () => void;
  trigger?: React.ReactNode;
};

export function NewPostModal({ isOpen, onClose, onGenerate, trigger }: NewPostModalProps) {
  const [category, setCategory] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [autoGenerateCaption, setAutoGenerateCaption] = useState<boolean>(true);

  const handleGenerate = () => {
    onGenerate();
    onClose(); // Close the dialog after generating
  };

  return (
    <Dialog open={isOpen} modal={true} onOpenChange={(open) => !open && onClose()}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="max-w-screen h-screen sm:max-w-lg sm:max-h-[600px]">
        <DialogHeader>
          <DialogTitle>Novo Post</DialogTitle>
          <DialogDescription>Crie um novo post preenchendo as informações abaixo.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
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

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button onClick={handleGenerate}>
            <Sparkles className="h-4 w-4 mr-2" />
            Gerar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
