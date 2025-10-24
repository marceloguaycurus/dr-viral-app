import { create } from "zustand";
import type { PostListItem, PostWithAssetDisplay } from "@/lib/types/PostTypes";

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

  // Modals and edit data
  createModalOpen: boolean;
  editModalOpen: boolean;
  errorModalOpen: boolean;
  isLoading: boolean;
  postData: PostWithAssetDisplay;

  // Optimistic UI helpers
  hiddenPostIds: string[];

  // Actions
  setActiveTab: (tab: TabOption) => void;
  updateNewPost: (partial: Partial<NewPostFormState>) => void;
  resetNewPost: () => void;

  // Modal actions
  setCreateModalOpen: (open: boolean) => void;
  setEditModalOpen: (open: boolean) => void;
  setErrorModalOpen: (open: boolean) => void;
  setIsLoading: (loading: boolean) => void;
  setPostData: (post: PostWithAssetDisplay) => void;
  openCreate: () => void;
  openEditWithPost: (post: PostListItem) => void;
  hidePost: (postId: string) => void;
  unhidePost: (postId: string) => void;
  clearHiddenPosts: () => void;
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

  createModalOpen: false,
  editModalOpen: false,
  errorModalOpen: false,
  isLoading: false,
  postData: null,
  hiddenPostIds: [],

  setActiveTab: (tab) => set({ activeTab: tab }),
  updateNewPost: (partial) => set((state) => ({ newPost: { ...state.newPost, ...partial } })),
  resetNewPost: () => set({ newPost: initialNewPost }),

  setCreateModalOpen: (open) => set({ createModalOpen: open }),
  setEditModalOpen: (open) => set({ editModalOpen: open }),
  setErrorModalOpen: (open) => set({ errorModalOpen: open }),
  setIsLoading: (loading) => set({ isLoading: loading }),
  setPostData: (post) => set({ postData: post }),
  openCreate: () => set({ createModalOpen: true }),
  openEditWithPost: (post) =>
    set(() => {
      const first = post.assets?.[0];
      const postDisplay: PostWithAssetDisplay = {
        id: post.id,
        caption: post.caption ?? null,
        type: post.type,
        asset: first
          ? {
              storagePath: first.storagePath,
              publicUrl: first.publicUrl ?? "",
              width: null,
              height: null,
              mimeType: null,
            }
          : null,
      };
      return { postData: postDisplay, editModalOpen: true };
    }),
  hidePost: (postId) =>
    set((state) => (state.hiddenPostIds.includes(postId) ? state : { hiddenPostIds: [...state.hiddenPostIds, postId] })),
  unhidePost: (postId) => set((state) => ({ hiddenPostIds: state.hiddenPostIds.filter((id) => id !== postId) })),
  clearHiddenPosts: () => set({ hiddenPostIds: [] }),
}));
