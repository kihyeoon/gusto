import DeleteButton from "@/components/shared/DeleteButton";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onDelete: () => void;
}

export default function TextContent({ value, onChange, onDelete }: Props) {
  return (
    <div className="relative">
      <Textarea
        className="resize-none"
        rows={1}
        value={value}
        onChange={onChange}
      />
      <DeleteButton className="absolute -right-1 -top-1" onClick={onDelete} />
    </div>
  );
}
