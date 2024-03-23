import { useState } from "react";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import { Tooltip } from "@mui/material";
import { styled } from "@mui/system";
// import Stack from "@mui/material/Stack";
import { useForm } from "react-hook-form";
// import moment from "moment";
import { DateRangePicker, CheckPicker, Stack, Whisper } from "rsuite";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const DisableDate = () => {
    const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ].map((item) => ({ label: item, value: item }));

    const [selectedDays, setSelectedDays] = useState([]);

    const handleDaySelect = (value) => {
        setSelectedDays(value);
        console.log(value);
    };

    return (
        <div className="bg-shadow p-3 p-sm-3 p-md-4 p-lg-5 bg-white mt-4">
            <h3>Disable Date</h3>
            <form className="mt-3">
                <div className="row">
                    <div className="col-6">
                        <Label className="pb-3">Permanently close</Label>
                        <Tooltip title="วันที่ร้านปิดเป็นประจำ">
                            <HelpOutlineIcon fontSize="small"/>
                        </Tooltip>
                        <div className="mt-2">
                            <Stack
                                spacing={10}
                                direction="column"
                                alignItems="flex-start"
                            >
                                <CheckPicker
                                    data={days}
                                    value={selectedDays}
                                    onChange={handleDaySelect}
                                    searchable={false}
                                    style={{ width: 300 }}
                                    placeholder="Select days"
                                />
                            </Stack>
                        </div>
                    </div>
                    <div className="col-6">
                        <Label className="pb-3">Temporary Close</Label>
                        <Tooltip title="วันและเวลาปิดร้านชั่วคราว">
                            <HelpOutlineIcon fontSize="small"/>
                        </Tooltip>
                        <div className="mt-2">
                            <DateRangePicker format="MM/dd/yyyy HH:mm" />
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-end ">
                    <Button type="submit" variant="contained" sx={{ mt: 3 }}>
                        Submit
                    </Button>
                </div>
            </form>
        </div>
    );
};
const Label = styled(({ children, className }) => {
    return <label className="mb-2">{children}</label>;
})`
    font-family: "IBM Plex Sans", sans-serif;
    font-size: 0.875rem;
    margin-bottom: 4px;

    &.invalid {
        color: red;
    }
`;

export default DisableDate;
