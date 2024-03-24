import { useState } from "react";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import { MenuItem, InputLabel } from "@mui/material";
import Stack from "@mui/material/Stack";
import { useForm } from "react-hook-form";
import moment from "moment";
import { DateRangePicker } from "rsuite";

const DisableDate = () => {
    const days = [
        { value: "sunday", label: "Sunday" },
        { value: "monday", label: "Monday" },
        { value: "tuesday", label: "Tuesday" },
        { value: "wednesday", label: "Wednesday" },
        { value: "thursday", label: "Thursday" },
        { value: "friday", label: "Friday" },
        { value: "saturday", label: "Saturday" },
    ];

    const [selectedDays, setSelectedDays] = useState([]);

    const handleDaySelect = (event) => {
        const {
            target: { value },
        } = event;
        setSelectedDays(value);
        value.forEach((selectedDay) => {
            const selectedDate = moment().day(selectedDay).startOf("day");
            console.log(selectedDate.format("YYYY-MM-DD HH:mm:ss"));
        });
    };
    return (
        <div className="bg-shadow p-3 p-sm-3 p-md-4 p-lg-5 bg-white mt-4">
            <h3>Disable Date</h3>
            <form className="mt-3">
                <div className="row">
                    <div className="col-6">
                        <p className="pb-3">Permanently close</p>
                        <Stack spacing={2} alignItems="flex-start">
                            <Select
                                placeholder="Select days"
                                multiple
                                value={selectedDays}
                                onChange={handleDaySelect}
                                sx={{ minWidth: 200 }}
                            >
                                {days.map((day) => (
                                    <MenuItem key={day.value} value={day.label}>
                                        {day.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Stack>
                    </div>
                    <div className="col-6">
                        <div className="mt-3">
                            <p className="pb-3">Temporary Close</p>
                            <DateRangePicker format="MM/dd/yyyy HH:mm" />
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-end ">
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{ mt: 3 }}
                        
                    >
                        Submit
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default DisableDate;
