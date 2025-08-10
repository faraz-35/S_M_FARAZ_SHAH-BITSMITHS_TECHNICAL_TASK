import Table from "./components/table";
import issuesData from "./constants/issues.json";
import { Issue } from "./types";

export default function Home() {
  const issues: Issue[] = issuesData as Issue[];
  return <Table issues={issues} />;
}
