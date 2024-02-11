import Chat from "@/components/Chat";
import VideoRecipe from "@/components/VideoRecipe";

export default async function Home() {
  return (
    <main className="mx-auto flex max-w-5xl flex-col items-center justify-between p-24">
      <VideoRecipe />
      {/* <Chat /> */}
    </main>
  );
}
