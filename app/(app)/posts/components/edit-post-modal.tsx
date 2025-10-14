"use client";
import { Download, Edit, MoreVertical, RefreshCw, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";

type EditPostModalProps = {
  isOpen: boolean;
  isLoading: boolean;
  onClose: () => void;
  trigger?: React.ReactNode;
};

export function EditPostModal({ isOpen, isLoading, onClose, trigger }: EditPostModalProps) {
  return (
    <Dialog open={isOpen} modal={false} onOpenChange={(open) => !open && onClose()}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="max-w-screen h-screen sm:max-w-4xl sm:max-h-[600px] p-0">
        <DialogHeader className="sr-only">
          <DialogTitle>Editar Post</DialogTitle>
        </DialogHeader>
        {isLoading ? <LoadingSkeleton /> : <PostPreview />}
      </DialogContent>
    </Dialog>
  );
}

function LoadingSkeleton() {
  return (
    <div className="flex flex-col md:flex-row h-[500px] p-6 gap-6">
      {/* Image skeleton - top on mobile, left on desktop */}
      <div className="w-full md:w-1/2 aspect-square md:aspect-auto bg-muted animate-pulse rounded-lg" />

      {/* Content skeleton - bottom on mobile, right on desktop */}
      <div className="flex-1 flex flex-col gap-4">
        <div className="h-6 w-24 bg-muted animate-pulse rounded" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-muted animate-pulse rounded w-full" />
          <div className="h-4 bg-muted animate-pulse rounded w-5/6" />
          <div className="h-4 bg-muted animate-pulse rounded w-4/6" />
        </div>
        <div className="flex gap-2">
          <div className="h-10 flex-1 bg-muted animate-pulse rounded" />
          <div className="h-10 flex-1 bg-muted animate-pulse rounded" />
        </div>
      </div>
    </div>
  );
}

function PostPreview() {
  const mockCaption = `🎉 Novidade incrível chegando! 

Estamos super animados em compartilhar com vocês essa novidade que vai transformar a sua experiência. Fique ligado para mais detalhes em breve!

#novidade #embreve #transformacao #inovacao #tecnologia`;

  return (
    <div className="flex flex-col md:flex-row h-[500px]">
      {/* Image Section - top on mobile, left on desktop */}
      <div className="relative w-full md:w-1/2 aspect-square md:aspect-auto bg-muted">
        <Image
          src="/social-media-post.png"
          alt="Post preview"
          className="w-full h-full object-cover md:rounded-l-lg"
          width={500}
          height={500}
        />
        {/* Post type badge on image */}
        <Badge variant="secondary" className="absolute top-3 left-3 bg-black/50 text-white border-none backdrop-blur-sm">
          Reels
        </Badge>
      </div>

      {/* Content Section - bottom on mobile, right on desktop */}
      <div className="flex-1 flex flex-col p-4 md:p-6">
        {/* Header with badge and close button */}
        <div className="flex items-start justify-between mb-4">
          <Badge variant="default" className="bg-blue-500">
            Gerado
          </Badge>
        </div>

        {/* Caption - scrollable */}
        <div className="flex-1 overflow-y-auto mb-4">
          <p className="text-sm whitespace-pre-wrap">{mockCaption}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2">
          <Button className="flex-1 min-w-[120px]">
            <Send className="h-4 w-4 mr-2" />
            Publicar
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
  );
}
