"use client";

import { useMemo } from "react";
import { Download, Edit, MoreVertical, RefreshCw, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PostType } from "@prisma/client";

type PostEditContentProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  post: {
    id: string;
    caption: string | null;
    type: PostType;
    asset: {
      storagePath: string;
      publicUrl: string;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
    } | null;
  } | null;
};

export function PostEditContent({ open, onOpenChange, post }: PostEditContentProps) {
  const imageSrc = useMemo(() => post?.asset?.publicUrl ?? "", [post]);
  const caption = post?.caption;
  const postType = post?.type;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle>Editar Post</DialogTitle>
          <DialogDescription>Edite o post preenchendo as informações abaixo.</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col md:flex-row h-[500px]">
          {/* Image Section - top on mobile, left on desktop */}
          <div className="relative w-full md:w-1/2 aspect-square bg-muted md:rounded-l-lg overflow-hidden">
            <Image src={imageSrc} alt="Post edit" fill className="object-contain" />
            <Badge variant="secondary" className="absolute top-3 left-3 bg-black/50 text-white border-none backdrop-blur-sm">
              {postType}
            </Badge>
          </div>

          {/* Content Section - bottom on mobile, right on desktop */}
          <div className="flex-1 flex flex-col p-4 md:p-6">
            {/* Header with badge and back button */}
            <div className="flex items-start justify-between mb-4">
              <Badge variant="default" className="bg-blue-500">
                Gerado
              </Badge>
            </div>

            {/* Caption - scrollable */}
            <div className="flex-1 overflow-y-auto mb-4">
              <p className="text-sm whitespace-pre-wrap">{caption}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2">
              <Button className="flex-1 min-w-[120px]">
                <Send className="h-4 w-4 mr-2" />
                Agendar
              </Button>
              <Button variant="outline" className="flex-1 min-w-[120px] bg-transparent">
                <Edit className="h-4 w-4 mr-2" />
                Editar
              </Button>
              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
              </Button>
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Regenerar
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
