import Chat from "@/components/Chat";
import VideoRecipe from "@/components/VideoRecipe";

export default async function Home() {
  return (
    <main className="mx-auto flex max-w-sm flex-col items-center justify-between p-4">
      <VideoRecipe />
      {/* <Chat /> */}
    </main>
  );
}
