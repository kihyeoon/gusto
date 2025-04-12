import DeleteButton from "@/components/DeleteButton";
import { Input } from "@/components/ui/input";

interface Props {
  name: string;
  amount: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDelete: () => void;
}

export default function IngredientContent({
  name,
  amount,
  onChange,
  onDelete,
}: Props) {
  return (
    <div className="relative flex gap-2">
      <Input value={name} name="name" onChange={onChange} />
      <Input value={amount} name="amount" onChange={onChange} />
      <DeleteButton className="absolute -right-1 -top-1" onClick={onDelete} />
    </div>
  );
}
