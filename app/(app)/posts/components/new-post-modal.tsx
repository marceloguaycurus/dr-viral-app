"use client";
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { usePostsStore } from "@/stores/posts-store";
import { createPostFromForm } from "@/lib/utils/dataFunctions/bd-management";
import { useActionState, useEffect } from "react";

type NewPostModalProps = { trigger?: React.ReactNode };

export function NewPostModal({ trigger }: NewPostModalProps) {
  const isOpen = usePostsStore((s) => s.isNewPostModalOpen);
  const closeNew = usePostsStore((s) => s.closeNewPostModal);
  const openEdit = usePostsStore((s) => s.openEditModal);
  const setGenerating = usePostsStore((s) => s.setGenerating);
  const update = usePostsStore((s) => s.updateNewPost);
  const reset = usePostsStore((s) => s.resetNewPost);
  const { postType, category, description, autoGenerateCaption, slides } = usePostsStore((s) => s.newPost);

  const [state, formAction, isPending] = useActionState(createPostFromForm, { success: false });

  useEffect(() => {
    if (!isPending && state?.success) {
      setGenerating(false);
      reset();
    }
  }, [isPending, state, setGenerating, reset]);

  return (
    <Dialog open={isOpen} modal={true} onOpenChange={(open) => !open && (reset(), closeNew())}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="max-w-screen h-screen sm:max-w-lg sm:max-h-[600px]">
        <DialogHeader>
          <DialogTitle>Novo Post</DialogTitle>
          <DialogDescription>Crie um novo post preenchendo as informações abaixo.</DialogDescription>
        </DialogHeader>

        <form
          id="new-post-form"
          action={formAction}
          onSubmit={() => {
            setGenerating(true);
            openEdit(true);
            closeNew();
          }}
          className="space-y-4"
        >
          {/* Hidden inputs to submit controlled values */}
          <input type="hidden" name="postType" value={postType} />
          <input type="hidden" name="category" value={category} />
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
                  value="reels"
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
            <div className=" space-y-2">
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
          <div className=" space-y-2">
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
        </form>

        <DialogFooter>
          <DialogClose asChild onClick={() => (reset(), closeNew())}>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button type="submit" form="new-post-form" disabled={isPending}>
            <Sparkles className="h-4 w-4 mr-2" />
            {isPending ? "Gerando..." : "Gerar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
