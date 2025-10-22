"use client";

import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useActionState, useState } from "react";
import { createPost } from "@/app/actions/create-post";

export function PostCreationForm() {
  const [postForm, setPostForm] = useState("post");
  const [category, setCategory] = useState("educativo");
  const [error, formAction, isPending] = useActionState(createPost, null);

  return (
    <>
      <form id="post-form" action={formAction} className="space-y-4">
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
          />
        </div>

        {/* Auto Generate Caption Checkbox */}
        <div className="flex items-center space-x-2">
          <Checkbox id="auto-caption" checked={true} />
          <Label htmlFor="auto-caption" className="text-sm font-normal cursor-pointer">
            Gerar legenda automaticamente
          </Label>
        </div>

        {/* Error Display */}
        {error && <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">{error}</div>}
      </form>

      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">Cancelar</Button>
        </DialogClose>
        <Button type="submit" form="post-form" disabled={isPending}>
          <Sparkles className="h-4 w-4 mr-2" />
          {isPending ? "Gerando..." : "Gerar"}
        </Button>
      </DialogFooter>
    </>
  );
}
