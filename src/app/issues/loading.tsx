import { Table } from "@radix-ui/themes";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import IssueTool from "./IssueTool";

const loadingIssuePage = () => {
  const allIssues = [1, 2, 3, 4, 5];

  return (
    <div>
      <IssueTool />
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Existing Issues</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell className="hidden md:table-cell">Status</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell className="hidden md:table-cell">Created Date</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {allIssues.map((issue) => (
          <Table.Row key={issue}>
            <Table.Cell>
              <Skeleton />
              <div className="block md:hidden">
                <Skeleton />
              </div>
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              <Skeleton />
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              <Skeleton />

            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>

    </div>
  )
}

export default loadingIssuePage;