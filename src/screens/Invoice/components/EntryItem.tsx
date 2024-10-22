import { format } from "date-fns";
import FormControl from "react-bootstrap/FormControl";
import { updatePrice } from "../../../api";
import { Entry } from "../../../api/models";
import {
    calculateAmount,
    calculateTotalHours,
    currencyFormatter,
    hoursFormatter,
} from "../../../helpers";

interface Props {
    entry: Entry;
    priceAsText: boolean;
}

const EntryItem: React.FC<Props> = ({ entry, priceAsText }) => {
    const totalHours = calculateTotalHours(entry.elapsedSeconds);

    const formattedHours = hoursFormatter.format(totalHours);
    const formattedAmount = currencyFormatter.format(entry.amount ?? 0);

    const onAmountBlur = async (event: any) => {
        const { value } = event.target;

        let totalAmount = entry.amount;
        let newPrice = value;

        if (!value) {
            newPrice = entry.price ?? 0;
            event.target.value = entry.price ?? 0;
        } else if (isNaN(parseFloat(value))) {
            newPrice = entry.price ?? 0;
            event.target.value = entry.price ?? 0;
        } else {
            newPrice = parseFloat(newPrice);
        }

        totalAmount = calculateAmount(newPrice, totalHours);
        await updatePrice(entry.id, parseFloat(newPrice), totalAmount);
    };

    return (
        <tr>
            <td style={{ verticalAlign: "middle" }}>
                {entry.description} -&nbsp;
                {format(entry.createdAt, "MM/dd/yyyy")}
            </td>
            <td
                className="text-end"
                style={{ width: "100px", verticalAlign: "middle" }}
            >
                {formattedHours}
            </td>
            <td
                className="text-end"
                style={{ width: "150px", verticalAlign: "middle" }}
            >
                {priceAsText && currencyFormatter.format(entry.price)}
                {!priceAsText && (
                    <FormControl
                        className="text-end"
                        type="text"
                        defaultValue={entry.price ?? 0}
                        onBlur={onAmountBlur}
                    />
                )}
            </td>

            <td
                className="text-end"
                style={{ width: "150px", verticalAlign: "middle" }}
            >
                {formattedAmount}
            </td>
        </tr>
    );
};

export default EntryItem;
