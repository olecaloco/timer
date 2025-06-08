import Table from "react-bootstrap/Table";
import { Entry } from "../../../api/models";
import { currencyFormatter } from "../../../helpers";
import EntryItem from "./EntryItem";

interface Props {
    entries: Entry[];
    priceAsText: boolean;
}

const EntryTable: React.FC<Props> = ({ entries, priceAsText }) => {
    const total = entries.reduce((accumulator, current) => {
        const amount = current.amount ?? 0;
        return accumulator + amount;
    }, 0);

    return (
        <Table id="table-2" striped bordered hover responsive>
            <thead className="table-light">
                <tr>
                    <th>Description</th>
                    <th className="text-end">Quantity</th>
                    <th className="text-end">Unit Price</th>
                    <th className="text-end">Amount</th>
                </tr>
            </thead>
            <tbody>
                {entries.length === 0 && (
                    <tr>
                        <td colSpan={4} className="text-center">
                            No entries for this month
                        </td>
                    </tr>
                )}
                {entries.map((entry) => (
                    <EntryItem
                        key={entry.id}
                        entry={entry}
                        priceAsText={priceAsText}
                    />
                ))}
                <tr className="table-light">
                    <td className="text-end" colSpan={3}>
                        <strong>Total Amount Due</strong>
                    </td>
                    <td className="text-end">
                        <strong>{currencyFormatter.format(total)}</strong>
                    </td>
                </tr>
            </tbody>
        </Table>
    );
};

export default EntryTable;
