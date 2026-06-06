import { Suspense } from "react";
import { CommunityLayout } from "@/components/community/community-layout";
import { CreatePostForm } from "./create-post-form";

export const metadata = {
  title: "New Post, Community, StudySwedish",
  description: "Share something with the community.",
};

export default function NewPostPage() {
  return (
    <CommunityLayout>
      <div className="mx-auto max-w-2xl">
        <h1 className="font-display text-2xl font-semibold text-charcoal">
          Write a post
        </h1>
        <p className="mt-1 text-sm text-charcoal/50">
          Share a question, recommendation, recipe, or anything Sweden-related.
          No account needed, just your name.
        </p>

        <div className="mt-6">
          <Suspense>
            <CreatePostForm />
          </Suspense>
        </div>
      </div>
    </CommunityLayout>
  );
}
