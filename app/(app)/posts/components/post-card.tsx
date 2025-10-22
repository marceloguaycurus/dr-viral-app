"use client";

import { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreVertical, Edit, Copy, Trash2, ChevronDown, Calendar, Clock } from "lucide-react";
import type { PostListItem } from "@/lib/utils/dataFunctions/bd-management";
import Image from "next/image";
import { createClient } from "@/lib/utils/supabase/client";

export function PostCard({ post }: { post: PostListItem }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const needsTruncation = post.caption && post.caption.length > 120;

  const imageUrl = useMemo(() => {
    const first = post.assets?.[0];
    if (!first?.storagePath) return null;
    if (first.storagePath.startsWith("http")) return first.storagePath;
    const supabase = createClient();
    const { data } = supabase.storage.from("posts").getPublicUrl(first.storagePath);
    return data.publicUrl ?? null;
  }, [post.assets]);

  return (
    <Card className="overflow-hidden py-0">
      <CardContent className="p-0">
        <div className="flex items-center justify-between p-3 border-b">
          <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-100">
            {post.categoryId ?? "Sem categoria"}
          </Badge>

          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Edit className="mr-2 h-4 w-4" />
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Copy className="mr-2 h-4 w-4" />
                Duplicar
              </DropdownMenuItem>
              <DropdownMenuItem variant="destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Excluir
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="aspect-square bg-muted flex items-center justify-center">
          {imageUrl ? (
            <Image src={imageUrl} alt={post.caption ?? "Post"} width={100} height={100} />
          ) : (
            <div className="text-sm text-muted-foreground">Sem imagem</div>
          )}
        </div>

        <div className="p-3">
          <p className={`text-sm text-foreground ${!isExpanded && needsTruncation ? "line-clamp-3" : ""}`}>{post.caption}</p>
          {needsTruncation && (
            <button onClick={() => setIsExpanded(!isExpanded)} className="text-sm text-blue-700 hover:text-blue-700 mt-1">
              {isExpanded ? "mostrar menos" : "mais"}
            </button>
          )}
        </div>

        <div className="p-3 pt-0 flex justify-end">
          <div className="flex">
            <Button size="sm" className="rounded-r-none">
              <Calendar className="mr-2 h-4 w-4" />
              Agendar
            </Button>
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button size="sm" className="rounded-l-none border-l px-2">
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Calendar className="mr-2 h-4 w-4" />
                  Agendar para depois
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Clock className="mr-2 h-4 w-4" />
                  Publicar agora
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
