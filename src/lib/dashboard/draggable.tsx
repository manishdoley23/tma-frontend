import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import KanbanCard from "@/components/kanban-card";
import { Button } from "@/components/ui/button";

const Draggable = ({
  id,
  title,
  description,
  urgency,
  children,
}: {
  id: string;
  title: string;
  description: string;
  urgency: string;
  children?: React.ReactNode;
}) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <Button
      className="flex flex-col"
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      <span>{title}</span>
      <span>{description}</span>
    </Button>
  );
};

export default Draggable;
