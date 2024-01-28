import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <main className="mx-auto flex max-w-5xl flex-col items-center justify-between p-24">
      <Button>Button</Button>
      <Checkbox />
      <Input />
    </main>
  );
}
