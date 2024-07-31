import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import clsx from "clsx";
import { UniqueIdentifier } from "@dnd-kit/core";
import { Button } from "./ui/button";

const KanbanCardContainer = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) => {
  return (
    <div
      className={clsx(
        "w-full h-full p-4 bg-gray-50 rounded-xl flex flex-col gap-y-4"
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-1">
          <h1 className="text-gray-800 text-xl">{title}</h1>
        </div>
      </div>

      {children}
      {/* <Button variant="ghost" onClick={onAddItem}>
        Add Item
      </Button> */}
    </div>
  );
};

export default KanbanCardContainer;
