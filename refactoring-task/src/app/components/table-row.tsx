"use client";

import { Issue } from "../types";

type TableRowProps = {
  issue: Issue;
  isSelected: boolean;
  onToggle: (issueId: string) => void;
};

/**
 * Renders a single row in the table.
 *
 * This component is responsible for the presentation of a single issue.
 * It handles user interactions, such as clicking the row or the checkbox,
 * and visually represents the issue's status (open/resolved) and its
 * selected state.
 */
export const TableRow = ({ issue, isSelected, onToggle }: TableRowProps) => {
  const { id, name, message, status } = issue;
  const isIssueOpen = status === "open";

  const handleRowClick = () => {
    if (isIssueOpen) {
      onToggle(id);
    }
  };

  const rowClasses = `${
    isIssueOpen
      ? "cursor-pointer hover:bg-blue-50 text-black"
      : "text-gray-600 cursor-not-allowed"
  } border-b border-gray-200 ${isSelected ? "bg-blue-50" : ""}`;

  return (
    <tr className={rowClasses} onClick={handleRowClick}>
      <td className="py-6 pl-6">
        {isIssueOpen ? (
          <input
            className="w-5 h-5 cursor-pointer"
            type="checkbox"
            id={`custom-checkbox-${id}`}
            name={name}
            value={name}
            checked={isSelected}
            // The onChange event is the standard way to handle value changes for a checkbox.
            onChange={() => onToggle(id)}
            // **FIX**: We must add an onClick handler to the checkbox itself
            // and stop the event's propagation. This prevents the click
            // from "bubbling" up to the parent <tr> and triggering its
            // onClick handler, which would cause onToggle to be called twice.
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <input className="w-5 h-5 opacity-50" type="checkbox" disabled />
        )}
      </td>
      <td className="py-6">{name}</td>
      <td className="py-6">{message}</td>
      <td className="py-6">
        <div className="flex items-center gap-2">
          {isIssueOpen ? (
            <>
              <span className="inline-block w-[15px] h-[15px] rounded-full bg-blue-600" />
              <span className="text-blue-700 font-medium">Open</span>
            </>
          ) : (
            <>
              <span className="inline-block w-[15px] h-[15px] rounded-full bg-gray-400" />
              <span className="text-gray-700 font-medium">Resolved</span>
            </>
          )}
        </div>
      </td>
    </tr>
  );
};
