import { Home, ScrollText, MessageSquare, Settings, Users, Code, Send, Bot, Calendar } from "lucide-react";

export const navigationItems = [
    {
      title: 'Dashboard',
      href: '/',
      icon: Home,
    },
    {
      title: 'Conversas',
      href: '/conversas',
      icon: MessageSquare,
    },
    {
      title: 'Preferências',
      href: '/preferencias',
      icon: Settings,
    },
    {
      title: 'Logs',
      href: '/logs',
      icon: ScrollText,
    },
  ];

export const adminNavigationItems = [
    {
      title: 'Membros',
      href: '/membros',
      icon: Users,
    }
];

export const PREFERENCES_TABS = [
    {
      value: "agent",
      label: "Agente",
      Icon: Bot,
      href: "/preferencias/agent",
    },
    {
      value: "clinic", 
      label: "Clínica",
      Icon: Calendar,
      href: "/preferencias/clinic",
    },
    {
      value: "schedule",
      label: "Horários", 
      Icon: Calendar,
      href: "/preferencias/schedule",
    },
    {
      value: "integration",
      label: "Integração",
      Icon: Code,
      href: "/preferencias/integration",
    },
    {
      value: "transfer",
      label: "Transferência",
      Icon: Users,
      href: "/preferencias/transfer",
    },
    {
      value: "reminders",
      label: "Lembretes",
      Icon: Send,
      href: "/preferencias/reminders",
    },
  ]

export const PREFERENCES_TABS_CLASSES = {
    trigger: "w-full justify-start px-3 py-2",
    icon: "mr-2 size-4"
}