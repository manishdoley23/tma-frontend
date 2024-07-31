import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { cn } from "../utils";

const Droppable = ({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) => {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      className={cn("bg-red-400", isOver && "bg-green-400")}
    >
      {children}
    </div>
  );
};

export default Droppable;
