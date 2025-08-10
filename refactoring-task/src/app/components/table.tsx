"use client";

import { useState, useMemo, useCallback } from "react";
import { TableHeader } from "./table-header";
import { TableRow } from "./table-row";
import { Issue } from "../types";

type TableProps = {
  issues: Issue[];
};

/**
 * The main Table component.
 *
 * This component has been refactored to:
 * - Simplify state management by using a Set for selected issue IDs.
 * - Improve performance by memoizing calculations.
 * - Delegate rendering to sub-components (TableHeader, TableRow).
 * - Handle checkbox states declaratively.
 */
const Table = ({ issues }: TableProps) => {
  // Using a Set for selected issues is more efficient for lookups, additions, and deletions.
  const [selectedIssueIds, setSelectedIssueIds] = useState(new Set<string>());

  // Memoize the list of open issue IDs to avoid recalculating on every render.
  const openIssueIds = useMemo(() => {
    return issues
      .filter((issue) => issue.status === "open")
      .map((issue) => issue.id);
  }, [issues]);

  const numOpenIssues = openIssueIds.length;

  // Memoize the count of selected open issues to prevent recalculation.
  const numSelectedOpenIssues = useMemo(() => {
    return openIssueIds.filter((id) => selectedIssueIds.has(id)).length;
  }, [selectedIssueIds, openIssueIds]);

  /**
   * Toggles the selection state of a single issue.
   * useCallback ensures the function reference is stable across re-renders,
   * which is a performance optimization for child components.
   */
  const handleToggleIssue = useCallback((issueId: string) => {
    setSelectedIssueIds((prevSelectedIds) => {
      const newSelectedIds = new Set(prevSelectedIds);
      if (newSelectedIds.has(issueId)) {
        newSelectedIds.delete(issueId);
      } else {
        newSelectedIds.add(issueId);
      }
      return newSelectedIds;
    });
  }, []);

  /**
   * Toggles the selection of all open issues.
   */
  const handleSelectDeselectAll = useCallback(() => {
    if (numSelectedOpenIssues === numOpenIssues) {
      // If all are selected, deselect all
      setSelectedIssueIds(new Set());
    } else {
      // Otherwise, select all open issues
      setSelectedIssueIds(new Set(openIssueIds));
    }
  }, [numSelectedOpenIssues, numOpenIssues, openIssueIds]);

  // Determine the state of the "select all" checkbox.
  const isAllSelected =
    numOpenIssues > 0 && numSelectedOpenIssues === numOpenIssues;
  const isIndeterminate =
    numSelectedOpenIssues > 0 && numSelectedOpenIssues < numOpenIssues;

  return (
    <table className="w-full border-collapse shadow-lg">
      <TableHeader
        numSelected={numSelectedOpenIssues}
        isAllSelected={isAllSelected}
        isIndeterminate={isIndeterminate}
        onSelectDeselectAll={handleSelectDeselectAll}
      />
      <tbody>
        {issues.map((issue) => (
          <TableRow
            key={issue.id}
            issue={issue}
            isSelected={selectedIssueIds.has(issue.id)}
            onToggle={handleToggleIssue}
          />
        ))}
      </tbody>
    </table>
  );
};

export default Table;
