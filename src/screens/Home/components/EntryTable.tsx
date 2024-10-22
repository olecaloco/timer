import Table from "react-bootstrap/Table";
import { Entry } from "../../../api/models";
import EntryItem from "./EntryItem";

interface Props {
    entries: Entry[];
}

const EntryTable: React.FC<Props> = ({ entries }) => (
    <Table className="mt-2" bordered hover responsive>
        <thead className="table-light">
            <tr>
                <th>Description</th>
                <th>Date</th>
                <th>Time</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            {entries.map((entry) => (
                <EntryItem entry={entry} key={entry.id} />
            ))}
        </tbody>
    </Table>
);

export default EntryTable;
