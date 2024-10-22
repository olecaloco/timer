import { useState } from "react";
import { FormControl } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {
    deleteEntry,
    updateDate,
    updateDescription,
    updateElapsedTime,
} from "../../../api";
import { Entry } from "../../../api/models";
import {
    calculateAmount,
    calculateNewTotalSeconds,
    calculateTotalHours,
    convertToHumanTime,
    formatToHTMLDateValue,
} from "../../../helpers";

interface Props {
    entry: Entry;
}

const EntryItem: React.FC<Props> = ({ entry }) => {
    const {
        seconds: defSec,
        minutes: defMin,
        hours: defHour,
    } = convertToHumanTime(entry.elapsedSeconds);

    const [totalSeconds, setTotalSeconds] = useState(0);
    const [seconds, setSeconds] = useState(defSec);
    const [minutes, setMinutes] = useState(defMin);
    const [hours, setHours] = useState(defHour);

    const today = new Date();
    const max = formatToHTMLDateValue(today, true);
    const value = formatToHTMLDateValue(entry.createdAt, true);

    const onDescriptionBlur = async (event: any) => {
        const { value } = event.target;
        await updateDescription(entry.id, value);
    };

    const onDateChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedDate = event.target.valueAsDate;
        if (selectedDate) await updateDate(entry.id, selectedDate);
    };

    const onDeleteEntry = async () => {
        await deleteEntry(entry.id);
    };

    const onTimeChange = async (event: any) => {
        const { name, value } = event.target;
        let total = 0;

        if (name === "hours") {
            setHours(value);
            total = calculateNewTotalSeconds(value, minutes, seconds);
        } else if (name === "minutes") {
            setMinutes(value);
            total = calculateNewTotalSeconds(hours, value, seconds);
        } else if (name === "seconds") {
            setSeconds(value);
            total = calculateNewTotalSeconds(hours, minutes, value);
        }

        setTotalSeconds(total);
    };

    const onTimeBlur = async () => {
        const { hours, minutes, seconds } = convertToHumanTime(totalSeconds);
        setHours(hours);
        setMinutes(minutes);
        setSeconds(seconds);

        const totalAmount = calculateAmount(
            entry.price,
            calculateTotalHours(totalSeconds)
        );
        await updateElapsedTime(entry.id, totalSeconds, totalAmount);
    };

    return (
        <tr>
            <td>
                <FormControl
                    defaultValue={entry.description}
                    onBlur={onDescriptionBlur}
                />
            </td>
            <td style={{ width: "200px" }}>
                <FormControl
                    value={value}
                    max={max}
                    onChange={onDateChange}
                    type="date"
                />
            </td>
            <td
                className="text-end"
                style={{ width: "200px", verticalAlign: "middle" }}
            >
                <span style={{ width: "20px" }}>
                    <FormControl
                        className="d-inline-block"
                        type="number"
                        name="hours"
                        value={hours}
                        onChange={onTimeChange}
                        onBlur={onTimeBlur}
                        style={{ width: "55px" }}
                    />
                </span>
                :
                <span style={{ width: "20px" }}>
                    <FormControl
                        className="d-inline-block"
                        type="number"
                        name="minutes"
                        value={minutes}
                        onChange={onTimeChange}
                        min={0}
                        max={59}
                        onBlur={onTimeBlur}
                        style={{ width: "46px" }}
                    />
                </span>
                :
                <span style={{ width: "20px" }}>
                    <FormControl
                        className="d-inline-block"
                        type="number"
                        name="seconds"
                        value={seconds}
                        onChange={onTimeChange}
                        min={0}
                        max={59}
                        onBlur={onTimeBlur}
                        style={{ width: "46px" }}
                    />
                </span>
            </td>
            <td className="text-center" style={{ width: "50px" }}>
                <Button
                    className="text-danger"
                    variant="link"
                    onClick={onDeleteEntry}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        style={{
                            width: "1.25rem",
                            height: "1.25rem",
                        }}
                    >
                        <path
                            fillRule="evenodd"
                            d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
                            clipRule="evenodd"
                        />
                    </svg>
                </Button>
            </td>
        </tr>
    );
};

export default EntryItem;
