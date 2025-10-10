"use client"
import { X, Download, Edit, MoreVertical, RefreshCw, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface EditPostModalProps {
  isOpen: boolean
  isLoading: boolean
  onClose: () => void
}

export function EditPostModal({ isOpen, isLoading, onClose }: EditPostModalProps) {
  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />

      {/* Modal - Full screen on mobile, centered modal on desktop */}
      <div className="fixed inset-0 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-4xl z-50">
        <div className="bg-background h-full md:h-[600px] md:rounded-lg shadow-lg flex flex-col">
          {isLoading ? <LoadingSkeleton /> : <PostPreview onClose={onClose} />}
        </div>
      </div>
    </>
  )
}

function LoadingSkeleton() {
  return (
    <div className="flex flex-col md:flex-row h-full p-6 gap-6">
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
  )
}

function PostPreview({ onClose }: { onClose: () => void }) {
  const mockCaption = `🎉 Novidade incrível chegando! 

Estamos super animados em compartilhar com vocês essa novidade que vai transformar a sua experiência. Fique ligado para mais detalhes em breve!

#novidade #embreve #transformacao #inovacao #tecnologia`

  return (
    <div className="flex flex-col md:flex-row h-full">
      {/* Image Section - top on mobile, left on desktop */}
      <div className="relative w-full md:w-1/2 aspect-square md:aspect-auto bg-muted">
        <img
          src="/social-media-post.png"
          alt="Post preview"
          className="w-full h-full object-cover md:rounded-l-lg"
        />
        {/* Post type badge on image */}
        <Badge
          variant="secondary"
          className="absolute top-3 right-3 bg-black/50 text-white border-none backdrop-blur-sm"
        >
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
          <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8 -mr-2">
            <X className="h-4 w-4" />
          </Button>
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
          <DropdownMenu>
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
  )
}
