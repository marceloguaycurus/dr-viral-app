import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { PostModalManager } from "./post-modal-manager";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export function PostModal() {
  return (
    <Dialog modal={true}>
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Novo Post
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-screen h-screen sm:max-w-4xl sm:max-h-[600px] p-0">
        <PostModalManager />
      </DialogContent>
    </Dialog>
  );
}
