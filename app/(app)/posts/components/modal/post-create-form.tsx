"use client";

import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

interface PostCreationFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onGenerate: (formData: FormData) => void;
}

export function PostCreationForm({ open, onOpenChange, onGenerate }: PostCreationFormProps) {
  const [postForm, setPostForm] = useState("post");
  const [category, setCategory] = useState("educativo");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (!formData.get("description")?.toString().trim()) return;

    onOpenChange(false);
    onGenerate(formData);
    setDescription("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle>Novo Post</DialogTitle>
          <DialogDescription>Crie um novo post preenchendo as informações abaixo.</DialogDescription>
        </DialogHeader>
        <div className="p-6 pt-4">
          <form id="post-form" onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2 w-full">
              <Label htmlFor="post-type">Tipo de Post</Label>
              <Tabs value={postForm} id="post-type" onValueChange={setPostForm}>
                <TabsList className="w-full bg-gray-50 border border-gray-200 rounded-md">
                  <TabsTrigger
                    value="post"
                    className="w-full text-sm font-medium rounded-md data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  >
                    Post (1:1)
                  </TabsTrigger>
                  <TabsTrigger
                    value="carousel"
                    className="w-full text-sm font-medium rounded-md data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  >
                    Carrossel (1:9)
                  </TabsTrigger>
                  <TabsTrigger
                    value="story"
                    className="w-full text-sm font-medium rounded-md data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  >
                    Story (1:9)
                  </TabsTrigger>
                  <TabsTrigger
                    value="reel"
                    className="w-full text-sm font-medium rounded-md data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  >
                    Reels (9:1)
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              <input type="hidden" name="post-type" value={postForm} />
            </div>

            {/* Category Dropdown */}
            <div className="space-y-2 flex flex-row gap-2 w-full">
              <div className="space-y-2">
                <Label htmlFor="category">Categoria</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="educativo">Conteúdo Educativo</SelectItem>
                    <SelectItem value="servico">Serviço</SelectItem>
                    <SelectItem value="promocao">Promoção</SelectItem>
                    <SelectItem value="dica">Dica</SelectItem>
                    <SelectItem value="novidade">Novidade</SelectItem>
                  </SelectContent>
                </Select>
                <input type="hidden" name="category" value={category} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slides">Número de páginas</Label>
                <Input id="slides" name="slides" defaultValue="1" type="number" min={1} max={10} />
              </div>
            </div>

            {/* Description Textarea */}
            <div className="space-y-2">
              <Label htmlFor="description">Descreva seu post</Label>
              <Textarea
                id="description"
                name="description"
                rows={8}
                className="resize-none min-h-[12rem]"
                placeholder="Digite a descrição do seu post..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* Auto Generate Caption Checkbox */}
            <div className="flex items-center space-x-2">
              <Checkbox id="auto-caption" name="auto-caption" checked={true} />
              <Label htmlFor="auto-caption" className="text-sm font-normal cursor-pointer">
                Gerar legenda automaticamente
              </Label>
            </div>
          </form>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancelar
              </Button>
            </DialogClose>
            <Button type="submit" form="post-form" disabled={!description.trim()}>
              <Sparkles className="h-4 w-4 mr-2" />
              Gerar
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
