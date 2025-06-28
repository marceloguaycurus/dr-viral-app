"use client";

import { useState, useEffect, useCallback } from "react";
import { Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils/utils";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/utils/supabase/client";
import Image from "next/image";
import { ConversationsLoading } from "./components";

interface User {
  name: string;
}

interface Message {
  id: number;
  conversation_id: number;
  content: string;
  role: string;
  created_at: string;
}

interface Conversation {
  id: number;
  contact_id: number;
  last_message: string;
  unread: number;
  avatar: string;
  created_at: string;
  users: User;
  is_active: boolean;
  clinic_id: string;
}

const formatConversationDate = (dateStr: string | undefined) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  const today = new Date();

  // Reset hours to compare just the dates
  const dateWithoutTime = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const todayWithoutTime = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  if (dateWithoutTime.getTime() === todayWithoutTime.getTime()) {
    // If today, show only time
    return date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  } else {
    // If before today, show dd/MM
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
    });
  }
};

const formatMessageDate = (dateStr: string | undefined) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date
    .toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    })
    .replace(",", " -");
};

interface ConversationsClientProps {
  clinicId: string;
}

export function ConversationsClient({ clinicId }: ConversationsClientProps) {
  const router = useRouter();
  const [selectedConversation, setSelectedConversation] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentClinicId, setCurrentClinicId] = useState(clinicId);
  const supabase = createClient();

  useEffect(() => {
    if (currentClinicId !== clinicId) {
      setIsLoading(true);
      setCurrentClinicId(clinicId);
      setSelectedConversation(null);
      setConversations([]);
      setMessages([]);
      router.refresh();
    }
  }, [clinicId, currentClinicId, router]);

  const fetchConversations = useCallback(async () => {
    if (!clinicId) return;

    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("conversations")
        .select(
          `
          id,
          contact_id,
          is_active,
          created_at,
          updated_at,
          last_message,
          avatar,
          unread,
          clinic_id,
          contacts:contact_id (
            name
          )
        `
        )
        .eq("clinic_id", clinicId)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching conversations:", error);
        return;
      }

      const transformedData = data?.map((conversation) => ({
        ...conversation,
        users: conversation.contacts?.[0] || { name: "Unknown" },
      }));

      setConversations(transformedData || []);
    } catch (e) {
      console.error("Error fetching conversations:", e);
    } finally {
      setIsLoading(false);
    }
  }, [supabase, clinicId]);

  const fetchMessages = useCallback(
    async (conversationId: number) => {
      try {
        const { data, error } = await supabase
          .from("messages")
          .select("*")
          .eq("conversation_id", conversationId)
          .order("created_at", { ascending: true });

        if (error) {
          console.error("Error fetching messages:", error);
          return;
        }

        setMessages(data || []);
      } catch (e) {
        console.error("Error fetching messages:", e);
      }
    },
    [supabase]
  );

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  useEffect(() => {
    if (selectedConversation) {
      fetchMessages(selectedConversation);
    }
  }, [selectedConversation, fetchMessages]);

  const filteredConversations = conversations.filter((conversation) => {
    if (!conversation.users || !conversation.users.name) {
      return true; // Include all conversations if name is not available
    }
    return conversation.users.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleSelectConversation = (id: number) => {
    setSelectedConversation(id);
  };

  const getSelectedConversation = () => {
    return conversations.find((conv) => conv.id === selectedConversation);
  };

  if (isLoading) {
    return <ConversationsLoading />;
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-80 border-r flex flex-col h-full">
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar conversa..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <ScrollArea className="flex-1">
          {filteredConversations.map((conversation) => (
            <div
              key={conversation.id}
              className={cn(
                "p-3 border-b cursor-pointer hover:bg-accent/50 transition-colors",
                selectedConversation === conversation.id && "bg-accent"
              )}
              onClick={() => handleSelectConversation(conversation.id)}
            >
              <div className="flex items-center space-x-3">
                <Avatar className="h-10 w-10 flex-shrink-0">
                  <AvatarImage src={conversation.avatar} alt={conversation.users?.name} />
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium truncate">{conversation.users?.name}</h3>
                    <span className="text-xs text-muted-foreground flex-shrink-0 ml-2">
                      {formatConversationDate(conversation.created_at)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-sm text-muted-foreground truncate max-w-[180px]">
                      {conversation.last_message}
                    </p>
                    {conversation.unread > 0 && (
                      <Badge variant="default" className="ml-2 flex-shrink-0">
                        {conversation.unread}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </ScrollArea>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col h-full">
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage
                    src={getSelectedConversation()?.avatar}
                    alt={getSelectedConversation()?.users?.name}
                  />
                </Avatar>
                <div>
                  <h2 className="font-medium">{getSelectedConversation()?.users?.name}</h2>
                  <p className="text-xs text-muted-foreground">
                    Paciente • Última atividade:{" "}
                    {formatConversationDate(getSelectedConversation()?.created_at)}
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Ver perfil
              </Button>
            </div>

            {/* Chat Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex",
                      message.role === "user" ? "justify-end" : "justify-start"
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[80%] p-3 rounded-lg",
                        message.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      <p>{message.content}</p>
                      <p
                        className={cn(
                          "text-xs mt-1",
                          message.role === "user"
                            ? "text-primary-foreground/80"
                            : "text-muted-foreground"
                        )}
                      >
                        {formatMessageDate(message.created_at)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Chat Input */}
            <div className="p-4 border-t">
              <div className="flex space-x-2">
                <Input placeholder="Digite uma mensagem..." className="flex-1" />
                <Button>Enviar</Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center p-8">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-4">
              <Image
                src="/images/logo-curto.png"
                alt="Secretaria Dora"
                className="w-20 h-20 rounded-full"
                width={80}
                height={80}
              />
            </div>
            <h2 className="text-xl font-medium mb-2">Secretaria Dora</h2>
            <p className="text-muted-foreground max-w-md mb-6">
              Selecione uma conversa para visualizar as mensagens trocadas entre a Secretaria Dora e
              os pacientes da sua clínica.
            </p>
            <Button variant="outline" onClick={() => router.push("/preferencias")}>
              Configurar Dora
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
