"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreVertical, Edit, Copy, Trash2, ChevronDown, Calendar, Clock } from "lucide-react"

export function PostCard() {
  const [isExpanded, setIsExpanded] = useState(false)

  // Sample caption - replace with actual data
  const caption =
    "This is a sample caption for the post. It can be quite long and will be truncated after three lines. When the user clicks show more, they will see the full text. This is similar to how Instagram handles long captions."

  // Check if caption needs truncation (simplified - in production you'd measure actual rendered height)
  const needsTruncation = caption.length > 120

  return (
    <Card className="overflow-hidden py-0">
      <CardContent className="p-0">
        <div className="flex items-center justify-between p-3 border-b">
          <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-100">
            Gerado
          </Badge>

          <DropdownMenu>
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
              <DropdownMenuItem className="text-destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Excluir
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="aspect-square bg-muted flex items-center justify-center">
          <span className="text-muted-foreground text-sm">Post Preview</span>
        </div>

        <div className="p-3">
          <p className={`text-sm text-foreground ${!isExpanded && needsTruncation ? "line-clamp-3" : ""}`}>{caption}</p>
          {needsTruncation && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-sm text-muted-foreground hover:text-foreground mt-1"
            >
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
            <DropdownMenu>
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
  )
}
