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
import { usePostsStore } from "@/stores/posts-store";
type FormActionHandler = (formData: FormData) => void;

type PostCreationFormProps = {
  formAction: FormActionHandler;
  isPending: boolean;
  error?: string;
};

export function PostCreationForm({ formAction, isPending, error }: PostCreationFormProps) {
  const update = usePostsStore((s) => s.updateNewPost);
  const { postType, category, description, autoGenerateCaption, slides } = usePostsStore((s) => s.newPost);

  return (
    <>
      <form id="post-form" action={formAction} className="space-y-4">
        {/* Hidden inputs to submit controlled values */}
        <input type="hidden" name="postType" value={postType} />
        <input type="hidden" name="category" value={category} />
        <input type="hidden" name="description" value={description} />
        <input type="hidden" name="autoGenerateCaption" value={String(autoGenerateCaption)} />
        <input type="hidden" name="slides" value={String(slides)} />

        <div className="space-y-2 w-full">
          <Label htmlFor="post-type">Tipo de Post</Label>
          <Tabs defaultValue={postType || "post"} id="post-type" onValueChange={(value) => update({ postType: value })}>
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
        </div>

        {/* Category Dropdown */}
        <div className="space-y-2 flex flex-row gap-2 w-full">
          <div className="space-y-2">
            <Label htmlFor="category">Categoria</Label>
            <Select value={category} onValueChange={(v) => update({ category: v })}>
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
          <div className="space-y-2">
            <Label htmlFor="slides">Número de páginas</Label>
            <Input
              id="slides"
              value={String(slides)}
              type="number"
              min={1}
              max={10}
              onChange={(e) => update({ slides: Number(e.target.value) })}
              disabled={postType !== "carousel"}
            />
          </div>
        </div>

        {/* Description Textarea */}
        <div className="space-y-2">
          <Label htmlFor="description">Descreva seu post</Label>
          <Textarea
            id="description"
            name="description"
            value={description}
            onChange={(e) => update({ description: e.target.value })}
            rows={8}
            className="resize-none min-h-[12rem]"
            placeholder="Digite a descrição do seu post..."
          />
        </div>

        {/* Auto Generate Caption Checkbox */}
        <div className="flex items-center space-x-2">
          <Checkbox
            id="auto-caption"
            checked={autoGenerateCaption}
            onCheckedChange={(checked) => update({ autoGenerateCaption: checked as boolean })}
          />
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
