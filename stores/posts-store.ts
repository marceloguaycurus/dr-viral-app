import { create } from "zustand";

type TabOption = "gerados" | "agendados" | "publicados";

type NewPostFormState = {
  postType: string;
  category: string;
  description: string;
  autoGenerateCaption: boolean;
  slides: number;
};

type PostsStore = {
  // UI state
  activeTab: TabOption;

  // New post form
  newPost: NewPostFormState;

  // Actions
  setActiveTab: (tab: TabOption) => void;
  updateNewPost: (partial: Partial<NewPostFormState>) => void;
  resetNewPost: () => void;
};

const initialNewPost: NewPostFormState = {
  postType: "post",
  category: "",
  description: "",
  autoGenerateCaption: true,
  slides: 1,
};

export const usePostsStore = create<PostsStore>((set) => ({
  activeTab: "gerados",

  newPost: initialNewPost,

  setActiveTab: (tab) => set({ activeTab: tab }),
  updateNewPost: (partial) => set((state) => ({ newPost: { ...state.newPost, ...partial } })),
  resetNewPost: () => set({ newPost: initialNewPost }),
}));
