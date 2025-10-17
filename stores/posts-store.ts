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
  isNewPostModalOpen: boolean;
  isEditModalOpen: boolean;
  isGenerating: boolean;

  // New post form
  newPost: NewPostFormState;

  // Actions
  setActiveTab: (tab: TabOption) => void;
  openNewPostModal: () => void;
  closeNewPostModal: () => void;
  openEditModal: (loading?: boolean) => void;
  closeEditModal: () => void;
  setGenerating: (value: boolean) => void;

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
  isNewPostModalOpen: false,
  isEditModalOpen: false,
  isGenerating: false,

  newPost: initialNewPost,

  setActiveTab: (tab) => set({ activeTab: tab }),
  openNewPostModal: () => set({ isNewPostModalOpen: true }),
  closeNewPostModal: () => set({ isNewPostModalOpen: false }),
  openEditModal: (loading = false) => set({ isEditModalOpen: true, isGenerating: loading }),
  closeEditModal: () => set({ isEditModalOpen: false, isGenerating: false }),
  setGenerating: (value) => set({ isGenerating: value }),

  updateNewPost: (partial) => set((state) => ({ newPost: { ...state.newPost, ...partial } })),
  resetNewPost: () => set({ newPost: initialNewPost }),
}));


