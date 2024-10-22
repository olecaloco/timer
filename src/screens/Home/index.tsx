import { useEffect, useMemo, useState } from "react";
import { Unsubscribe } from "firebase/firestore";
import { differenceInSeconds } from "date-fns";
import { addEntry, startTimer, stopTimer } from "../../api";

import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Container from "react-bootstrap/Container";
import FormControl from "react-bootstrap/FormControl";
import FormLabel from "react-bootstrap/FormLabel";
import EntryTable from "./components/EntryTable";
import FormTimer from "./components/FormTimer";
import { Entry } from "../../api/models";
import {
    convertToHumanTime,
    converter,
    formatToHTMLDateValue,
} from "../../helpers";

const Home = () => {
    const today = new Date();

    const [date, setDate] = useState(today);
    const [timerDate, setTimerDate] = useState(today);
    const [entries, setEntries] = useState<Entry[]>([]);
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [started, setStarted] = useState(false);
    const [elapsedSeconds, setElapsedSeconds] = useState(0);

    const disabledToday = date.getMonth() === today.getMonth();
    const disabledLastMonth = date.getMonth() !== today.getMonth();
    const selectedValue = formatToHTMLDateValue(date);
    const maxInputMonth = formatToHTMLDateValue(today);

    const worker: Worker = useMemo(
        () => new Worker(new URL("../../worker.js", import.meta.url)),
        []
    );

    useEffect(() => {
        if (worker) {
            worker.onmessage = function (ev) {
                if (ev.data === "start" || ev.data === "stop") return;

                setElapsedSeconds((c) => {
                    const newCount = c + 1;
                    const { seconds, minutes, hours } =
                        convertToHumanTime(newCount);
                    document.title = `Timer - ${hours}:${minutes}:${seconds}`;
                    return newCount;
                });
            };
        }
    }, []);

    // Fetch server timer status
    useEffect(() => {
        const isRunning = window.localStorage.getItem("isRunning");
        const _startedAt = window.localStorage.getItem("startedAt");
        const _timerStartTime = window.localStorage.getItem("timerStartTime");
        const _description = window.localStorage.getItem("description");

        if (!isRunning || isRunning !== "true") {
            worker.postMessage("stop");
            return;
        }

        const startDate = new Date(parseInt(_timerStartTime!));
        const now = new Date();
        const e = differenceInSeconds(now, startDate);

        setTimerDate(new Date(parseInt(_startedAt!)));
        setStarted(true);
        setDescription(_description ?? "");
        setElapsedSeconds(e);

        worker.postMessage("start");
    }, []);

    // Retrieve all current entries
    useEffect(() => {
        let unsub: Unsubscribe | null = null;

        const watcher = async () => {
            const { collection, onSnapshot, orderBy, query, where } =
                await import("firebase/firestore");
            const { endOfMonth, startOfMonth } = await import("date-fns");
            const { db } = await import("../../firebase");

            const startDate = startOfMonth(date);
            const endDate = endOfMonth(date);

            const q = query(
                collection(db, "entries"),
                where("createdAt", ">=", startDate),
                where("createdAt", "<=", endDate),
                orderBy("createdAt", "desc")
            ).withConverter(converter);

            unsub = onSnapshot(q, (snapshot) => {
                if (snapshot.empty) {
                    setEntries([]);
                }

                const fetched = snapshot.docs.map((doc) => doc.data());
                setEntries(fetched);
            });
        };

        watcher();

        return () => {
            if (unsub) unsub();
        };
    }, [date]);

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
    };

    const onBlur = () => {
        window.localStorage.setItem("description", description);
    };

    const onDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newDate = event.currentTarget.valueAsDate;
        if (newDate) {
            setTimerDate(newDate);
        }
    };

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const now = new Date();
        timerDate.setHours(now.getHours());
        timerDate.setMinutes(now.getMinutes());
        timerDate.setSeconds(now.getSeconds());

        if (loading) return;

        if (!started) {
            setLoading(true);

            await startTimer(description, timerDate);
            worker.postMessage("start");

            setLoading(false);
        } else {
            worker.postMessage("stop");
            setLoading(true);

            await addEntry(description, elapsedSeconds);
            await stopTimer();

            setLoading(false);
            setElapsedSeconds(0);
            setDescription("");
        }

        setStarted((s) => !s);
    };

    const onMonthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newDate = event.target.valueAsDate;
        if (newDate) setDate(newDate);
    };

    const onTodayClick = () => {
        setDate(new Date());
    };

    const onLastMonthClick = () => {
        const date = new Date();
        date.setDate(0);
        setDate(date);
    };

    return (
        <Container fluid>
            <h2 className="mt-2">Timer</h2>
            <FormTimer
                date={timerDate}
                description={description}
                elapsedSeconds={elapsedSeconds}
                hasStarted={started}
                isLoading={loading}
                onChange={onChange}
                onDateChange={onDateChange}
                onBlur={onBlur}
                onSubmit={onSubmit}
            />

            <hr />

            <div className="mb-3">
                <div className="d-flex align-items-center justify-content-between mb-2">
                    <FormLabel className="mb-0" htmlFor="month-picker">
                        Currently viewing:
                    </FormLabel>
                    <ButtonGroup>
                        <Button
                            variant="primary"
                            size="sm"
                            onClick={onLastMonthClick}
                            disabled={disabledLastMonth}
                        >
                            Last Month
                        </Button>
                        <Button
                            variant="primary"
                            size="sm"
                            onClick={onTodayClick}
                            disabled={disabledToday}
                        >
                            Today
                        </Button>
                    </ButtonGroup>
                </div>
                <FormControl
                    type="month"
                    value={selectedValue}
                    max={maxInputMonth}
                    onChange={onMonthChange}
                    style={{ colorScheme: "dark" }}
                />
            </div>

            <EntryTable entries={entries} />
        </Container>
    );
};

export default Home;
