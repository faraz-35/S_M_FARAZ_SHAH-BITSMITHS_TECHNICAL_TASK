"use client";
import { useEffect, useRef } from "react";

type TableHeaderProps = {
  numSelected: number;
  isAllSelected: boolean;
  isIndeterminate: boolean;
  onSelectDeselectAll: () => void;
};

/**
 * Renders the header of the table.
 *
 * This component encapsulates all logic and rendering for the table's header,
 * including the "select all" checkbox and the display of the selection count.
 * It uses a ref to manage the indeterminate state of the checkbox, which is
 * the recommended approach in React for this specific property.
 */
export const TableHeader = ({
  numSelected,
  isAllSelected,
  isIndeterminate,
  onSelectDeselectAll,
}: TableHeaderProps) => {
  const checkboxRef = useRef<HTMLInputElement | null>(null);

  // The `indeterminate` property on a checkbox is a special case.
  // It must be set via a ref as it's not a standard React-controlled attribute.
  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = isIndeterminate;
    }
  }, [isIndeterminate]);

  return (
    <thead>
      <tr className="border-2 border-gray-200">
        <th className="py-6 pl-6 text-left w-[48px]">
          <input
            ref={checkboxRef}
            className="w-5 h-5 cursor-pointer"
            type="checkbox"
            id="custom-checkbox-selectDeselectAll"
            name="custom-checkbox-selectDeselectAll"
            value="custom-checkbox-selectDeselectAll"
            checked={isAllSelected}
            onChange={onSelectDeselectAll}
          />
        </th>
        <th className="py-6 min-w-[8rem] text-left text-black">
          {numSelected ? `Selected ${numSelected}` : "None selected"}
        </th>
        <th colSpan={2} />
      </tr>
      <tr className="border-2 border-gray-200">
        <th className="py-6 pl-6" />
        <th className="py-6 text-left font-medium text-black">Name</th>
        <th className="py-6 text-left font-medium text-black">Message</th>
        <th className="py-6 text-left font-medium text-black">Status</th>
      </tr>
    </thead>
  );
};
