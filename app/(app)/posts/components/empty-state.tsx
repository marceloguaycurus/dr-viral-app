import { FileText, Calendar, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";

type TabOption = "gerados" | "agendados" | "publicados";

interface EmptyStateProps {
  tab: TabOption;
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
};

export function EmptyState({ tab }: EmptyStateProps) {
  const config = emptyStateConfig[tab];
  const Icon = config.icon;

  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Icon />
        </EmptyMedia>
        <EmptyTitle>{config.title}</EmptyTitle>
        <EmptyDescription>{config.description}</EmptyDescription>
      </EmptyHeader>
      {tab === "gerados" && (
        <EmptyContent>
          <Button>Criar Primeiro Post</Button>
        </EmptyContent>
      )}
    </Empty>
  );
}
