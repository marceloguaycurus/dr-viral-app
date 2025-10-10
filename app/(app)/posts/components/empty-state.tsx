import { FileText, Calendar, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"

type TabOption = "gerados" | "agendados" | "publicados"

interface EmptyStateProps {
  tab: TabOption
}

const emptyStateConfig = {
  gerados: {
    icon: FileText,
    title: "Nenhum post gerado",
    description: "Você ainda não gerou nenhum post. Clique no botão acima para criar seu primeiro post.",
  },
  agendados: {
    icon: Calendar,
    title: "Nenhum post agendado",
    description: "Você não tem posts agendados no momento. Agende seus posts para publicação automática.",
  },
  publicados: {
    icon: CheckCircle2,
    title: "Nenhum post publicado",
    description: "Você ainda não publicou nenhum post. Seus posts publicados aparecerão aqui.",
  },
}

export function EmptyState({ tab }: EmptyStateProps) {
  const config = emptyStateConfig[tab]
  const Icon = config.icon

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="rounded-full bg-muted p-6 mb-4">
        <Icon className="h-12 w-12 text-muted-foreground" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{config.title}</h3>
      <p className="text-muted-foreground max-w-md mb-6">{config.description}</p>
      {tab === "gerados" && <Button>Criar Primeiro Post</Button>}
    </div>
  )
}
