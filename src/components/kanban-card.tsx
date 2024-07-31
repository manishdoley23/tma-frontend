import { TimerIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

interface KanbanCardProps {
  id: UniqueIdentifier;
  children?: React.ReactNode;
  title?: string;
  description?: string;
  urgency?: string;
  onAddItem?: () => void;
}

const KanbanCard = ({
  id,
  children,
  urgency,
  title,
  description,
  onAddItem,
}: KanbanCardProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: id,
    data: {
      type: "item",
    },
  });

  return (
    <Card
      ref={setNodeRef}
      {...attributes}
      style={{
        transition,
        transform: CSS.Translate.toString(transform),
      }}
      className={cn(
        "px-2 py-4 bg-white shadow-md rounded-xl w-full border border-transparent hover:border-gray-200 cursor-pointer",
        isDragging && "opacity-50"
      )}
    >
      <CardHeader>
        <div>
          <CardTitle>{title}</CardTitle>
          <Button {...listeners}>Drag handle</Button>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {urgency}
        <div className="flex gap-2">
          <TimerIcon />
          {/* TODO: add date added */}
          2024-5-24
        </div>
      </CardContent>
      <CardFooter>
        {/* TODO: put time elapsed */}
        1hr ago
      </CardFooter>
    </Card>
  );
};

export default KanbanCard;
