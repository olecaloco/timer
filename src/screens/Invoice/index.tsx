import { useEffect, useState } from "react";
import { addDays, format } from "date-fns";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import FormControl from "react-bootstrap/FormControl";

import EntryTable from "./components/EntryTable";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {
    calculateTotalHours,
    converter,
    currencyFormatter,
    formatToHTMLDateValue,
    hoursFormatter,
} from "../../helpers";
import { Unsubscribe } from "firebase/firestore";
import { Entry } from "../../api/models";

const Invoice = () => {
    const [priceAsText, setPriceAsText] = useState(false);
    const [date, setDate] = useState(new Date());
    const [entries, setEntries] = useState<Entry[]>([]);

    const today = new Date();
    const value = formatToHTMLDateValue(date);
    const max = formatToHTMLDateValue(today);

    useEffect(() => {
        let unsub: Unsubscribe | null = null;

        async function watcher() {
            const { collection, onSnapshot, orderBy, query, where } =
                await import("firebase/firestore");
            const { endOfMonth, startOfMonth } = await import("date-fns");
            const { db } = await import("../../firebase");

            const start = startOfMonth(date);
            const end = endOfMonth(date);

            const q = query(
                collection(db, "entries"),
                where("createdAt", ">=", start),
                where("createdAt", "<=", end),
                orderBy("createdAt", "desc")
            ).withConverter(converter);

            unsub = onSnapshot(q, (snapshot) => {
                if (snapshot.empty) {
                    setEntries([]);
                }

                const fetched = snapshot.docs.map((doc) => doc.data());
                setEntries(fetched);
            });
        }

        watcher();

        return () => {
            if (unsub) unsub();
        };
    }, [date]);

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newDate = event.target.valueAsDate;
        if (newDate) setDate(newDate);
    };

    const onExport = () => {
        setPriceAsText(true);
        setTimeout(() => {
            const pdf = new jsPDF();
            const saveText = format(date, "MMMM-yyyy");

            const now = new Date();
            const dateFormat = "MM/dd/yyyy";
            const issueDate = format(now, dateFormat);
            const dueDate = format(addDays(now, 10), dateFormat);

            const total = entries.reduce((accumulator, current) => {
                const amount = current.amount ?? 0;
                return accumulator + amount;
            }, 0);

            autoTable(pdf, {
                theme: "plain",
                head: [
                    [
                        {
                            content: "Invoice",
                            styles: {
                                fontSize: 25,
                            },
                        },
                    ],
                ],
                body: [[`Issue date: ${issueDate}`], [`Due date ${dueDate}`]],
            });

            autoTable(pdf, {
                theme: "plain",
                head: [["Bill from", "Bill to"]],
                body: [
                    ["Your Name", "Client's Name"],
                    ["", ""],
                    ["Your address line 1", "Clien't address line 1"],
                    ["Your City, State, Zip", "Client's City, State, Zip"],
                    ["Your Country", "Client's Country"],
                ],
            });

            autoTable(pdf, {
                theme: "striped",
                head: [
                    [
                        {
                            content: "Description",
                            styles: {
                                halign: "left",
                            },
                        },
                        "Quantity",
                        "Unit Price",
                        "Amount",
                    ],
                ],
                styles: {
                    halign: "right",
                },
                headStyles: {
                    fillColor: [255, 255, 255],
                    textColor: [0, 0, 0],
                },
                footStyles: {
                    fillColor: [255, 255, 255],
                    textColor: [0, 0, 0],
                    halign: "right",
                },
                columnStyles: {
                    0: { cellWidth: "auto", halign: "left" },
                    1: { cellWidth: "auto", halign: "right" },
                    2: { cellWidth: 25, halign: "right" },
                    3: { cellWidth: 35, halign: "right" },
                },
                body: [
                    ...entries.map((entry) => [
                        `${entry.description} - ${format(
                            entry.createdAt,
                            "MM/dd/yyyy"
                        )}`,
                        calculateTotalHours(entry.elapsedSeconds),
                        hoursFormatter.format(entry.price),
                        currencyFormatter.format(entry.amount),
                    ]),
                    [
                        {
                            content: "Total Amount Due",
                            colSpan: 3,
                            styles: {
                                halign: "right",
                                textColor: "#000000",
                                fontStyle: "bold",
                            },
                        },
                        {
                            content: currencyFormatter.format(total),
                            styles: {
                                textColor: "#000000",
                                fontStyle: "bold",
                            },
                        },
                    ],
                ],
            });
            pdf.output("dataurlnewwindow", {
                filename: `invoice-${saveText.toLowerCase()}`,
            });

            setPriceAsText(false);
        }, 1);
    };

    return (
        <Container fluid>
            <div className="d-flex align-items-center justify-content-between mt-2">
                <h2>Invoice</h2>
                <div className="d-flex align-items-center gap-2">
                    <FormControl
                        type="month"
                        value={value}
                        onChange={onChange}
                        max={max}
                        style={{ colorScheme: "dark" }}
                    />

                    <Button variant="primary" size="sm" onClick={onExport}>
                        Export
                    </Button>
                </div>
            </div>

            <EntryTable entries={entries} priceAsText={priceAsText} />
        </Container>
    );
};

export default Invoice;
