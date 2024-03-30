import { useState, useEffect } from "react";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AddIcon from "@mui/icons-material/Add";
import { Modal, Button, Placeholder, DateRangePicker, Form } from "rsuite";
import { Button as ButtonMui } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import moment from "moment";
import axios from "axios";
import { TagPicker, SelectPicker } from "rsuite";
import PhoneInput from "react-phone-input-2";

function ScheduleModal(props) {
    const { keeperId, closedDays , availableStore } = props;
    const { beforeToday } = DateRangePicker;
    const { loading, userInfo, error, success, accessToken } = useSelector(
        (state) => state.auth
    );
    const [show, setShow] = useState(false);
    const [backdrop, setBackdrop] = useState("static");
    const [selectedRange, setSelectedRange] = useState([null, null]);

    const {
        register,
        watch,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const handleOpen = () => setShow(true);
    const handleClose = () => setShow(false);

    const [petCategories, setPetCategories] = useState([]);
    const [petCategoriesRaw, setPetCategoriesRaw] = useState([]);

    const Ranges = [
        {
            label: "today",
            value: [
                moment().startOf("day").toDate(),
                moment().endOf("day").toDate(),
            ],
        },
        {
            label: "Next 7 Days",
            value: [
                moment().startOf("day").toDate(),
                moment().add(6, "days").endOf("day").toDate(),
            ],
        },
    ];

    useEffect(() => {
        PetKeeperCategories();
    }, []);

    const onSubmit = async (data) => {
        const phoneNumber = data.phone.replace(/^66/, "0").trim();

        for (const category of petCategoriesRaw) {
            if (data.tags === category.name) {
                data.tags = category.id;
            }
        }

        console.log(data);

        const result = {
            startDate: moment(data.dateRange[0]).format(),
            endDate: moment(data.dateRange[1]).format(),
            ownerPhone: phoneNumber,
            categoryId: data.tags,
            message: data.message,
            petName: data.petName,
            statusId: "1",
            petKeeperId: parseInt(keeperId),
            petOwnerId: userInfo?.id,
        };

        console.log(result);
        await axios
            .post(import.meta.env.VITE_APPOINTMENT_CREATE, result, {
                headers: { Authorization: "Bearer " + accessToken },
            })
            .then((res) => {
                handleClose();
            });

        // SignUpForm(data);
    };
    console.log(availableStore);

    const PetKeeperCategories = async () => {
        await axios
            .get(import.meta.env.VITE_KEEPER_CATEGORIES)
            .then((res) => {
                const response = res.data;
                const data = response.map((item) => item.name);
                const rsite_data = data.map((item) => ({
                    label: item,
                    value: item,
                }));
                setPetCategories(rsite_data);
                setPetCategoriesRaw(response);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    // const handleChange = (value, name) => {
    //     setFormData({ ...formData, [name]: value });
    // };

    // const handleSubmit = async () => {
    //     // Here, send the formData to your backend
    //     console.log(formData);
    //     handleClose();
    // };

    const disabledDaysArray = closedDays?.split(',')?.map(day => day.trim())?.filter(day => day !== "") || [];
    console.log(closedDays)
    console.log(disabledDaysArray)

    // const disabledDaysArray = ["Sunday", "Monday", "Tuesday"];

    const disabledWeekdays = disabledDaysArray.map(day =>
        ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].indexOf(day)
    );
    
    const disableDateRange = {
        startDate: moment("2024-04-17T12:30:00+07:00"),
        endDate: moment("2024-04-27T16:30:00+07:00")
    };

    const disableSundays = (date) => {
        const momentDate = moment(date);

        // console.log(selectedRange[0])

        // Enable date if within selected range
        if (selectedRange[0] && selectedRange[1] && momentDate.isBetween(selectedRange[0], selectedRange[1], 'day', '[]')) {
            return false;
        }
        // Check if the date is a disabled weekday
        if (disabledWeekdays.includes(momentDate.day())) {
            return true;
        }
        // Check if the date is within the disabled date range
        if (momentDate.isBetween(disableDateRange.startDate, disableDateRange.endDate, 'day', '[]')) {
            return true;
        }
        return false;
    };

    return (
        <>
            <div className="bg-shadow p-2 p-sm-3 p-md-3 bg-white mt-4">
                <div className="title">
                    <h3 className="mb-2">Schedule</h3>
                    <p>For the purpose of reserving a pet boarding period</p>
                </div>
                {!accessToken ? (
                    <div className="mt-3 d-flex justify-content-center align-items-center">
                        <p>
                            Please{" "}
                            <a
                                className="text-decoration-underline"
                                href="/at3/login"
                            >
                                Login
                            </a>{" "}
                            First
                        </p>
                    </div>
                ) : availableStore === false ? (
                    <div className="mt-3 d-flex justify-content-center align-items-center">
                        <p className="fw-bold ">
                            Store has close
                        </p>
                    </div>
                ) : userInfo.role === "Owner" ? (
                    <div className="mt-3 d-flex justify-content-between align-item-center">
                        <div>
                            <div className="icon-container">
                                <div className="circle"></div>
                                <CalendarTodayIcon className="calendar-icon" />
                            </div>
                            <span className="ms-lg-2 ms-md-0 =">Schedule</span>
                        </div>
                        <div>
                            <ButtonMui onClick={handleOpen} className="booking">
                                <AddIcon /> Booking
                            </ButtonMui>
                        </div>
                    </div>
                ) : (
                    <div className="mt-3 d-flex justify-content-center align-items-center">
                        <p className="fw-bold ">
                            Schedule not available for Keeper
                        </p>
                    </div>
                )}
            </div>
            <Modal
                className="position-absolute top-50 start-50 translate-middle"
                backdrop={backdrop}
                keyboard={false}
                open={show}
                onClose={handleClose}
            >
                <Modal.Header>
                    <Modal.Title className="fs-3 fw-bold">Schedule</Modal.Title>
                </Modal.Header>

                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Modal.Body>
                        {/* <Placeholder.Paragraph /> */}
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="message" className="form-label">
                                    Booking Period
                                </label>
                                <Controller
                                    name="dateRange"
                                    control={control}
                                    render={({ field }) => (
                                        <DateRangePicker
                                            {...field}
                                            format="dd MMMM yyyy HH:mm"
                                            appearance="default"
                                            block
                                            onSelect={(value) => {
                                                setSelectedRange(value);
                                            }}
                                            // shouldDisableDate={date}
                                            shouldDisableDate={disableSundays}
                                            ranges={Ranges}
                                            onChange={(value) => {
                                                setSelectedRange(value);
                                                field.onChange(value);
                                            }}
                                        />
                                    )}
                                />
                            </div>
                            <div className="mb-3">
                                <label
                                    htmlFor="petCategory"
                                    className="form-label"
                                >
                                    Pet Category
                                </label>
                                <Controller
                                    name="tags"
                                    control={control}
                                    render={({ field }) => (
                                        <SelectPicker
                                            {...field}
                                            data={petCategories}
                                            searchable={false}
                                            onChange={(value) => {
                                                field.onChange(value);
                                            }}
                                            placeholder="Select pet category..."
                                            block
                                        />
                                        // <TagPicker
                                        //     {...field}
                                        //     data={petCategories}
                                        //     className="form-control"
                                        //     onChange={field.onChange}
                                        // />
                                    )}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="petName" className="form-label">
                                    Pet Name (Optional)
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="petName"
                                    name="petName"
                                    // value={formData.petName}
                                    // onChange={handleChange}
                                    {...register("petName", {
                                        maxLength: {
                                            value: 200,
                                            message:
                                                "Pet name must not more than 200 characters",
                                        },
                                    })}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="message" className="form-label">
                                    Message
                                </label>
                                <textarea
                                    className="form-control"
                                    id="message"
                                    name="message"
                                    // value={formData.message}
                                    // onChange={handleChange}
                                    {...register("message", {
                                        maxLength: {
                                            value: 200,
                                            message:
                                                "Message must not more than 200 characters",
                                        },
                                    })}
                                ></textarea>
                            </div>
                            {/* <div className="mb-3">
                    <label htmlFor="startdate" className="form-label">Start Date</label>
                    <input type="date" className="form-control" id="startdate" name="startdate" value={formData.startdate} onChange={handleChange} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="enddate" className="form-label">End Date</label>
                    <input type="date" className="form-control" id="enddate" name="enddate" value={formData.enddate} onChange={handleChange} />
                  </div> */}
                            <div className="mb-3">
                                <label
                                    htmlFor="ownerPhone"
                                    className="form-label"
                                >
                                    Owner Phone
                                </label>
                                {/* <input
                                    type="text"
                                    className="form-control"
                                    id="ownerPhone"
                                    name="ownerPhone"
                                    value={formData.ownerPhone}
                                    onChange={handleChange}
                                /> */}
                                <Controller
                                    control={control}
                                    name="phone"
                                    rules={{
                                        required:
                                            "Please enter your phone number.",
                                        maxLength: {
                                            value: 11,
                                            message:
                                                "Phone number must be 10 digits",
                                        },
                                        minLength: {
                                            value: 11,
                                            message:
                                                "Phone number must be 10 digits",
                                        },
                                    }}
                                    // className="form-control"
                                    render={({ field: { ref, ...field } }) => (
                                        <PhoneInput
                                            {...field}
                                            inputProps={{
                                                ref,
                                                required: true,
                                                autoFocus: true,
                                                // className: "form-control py-2"
                                            }}
                                            masks={{ th: ".. ... ...." }}
                                            inputClass={`${
                                                errors.phone ? "is-invalid" : ""
                                            } py-2`}
                                            inputStyle={{ width: "100%" }}
                                            specialLabel={""}
                                            disableDropdown={true}
                                            country={"th"}
                                            countryCodeEditable={false}
                                            placeholder="Enter phone number"
                                        />
                                    )}
                                />
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type="submit" appearance="primary">
                            Ok
                        </Button>
                        <Button onClick={handleClose} appearance="subtle">
                            Cancel
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
            {/* <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Booking Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="message" className="form-label">Message</label>
                  <textarea className="form-control" id="message" name="message" value={formData.message} onChange={handleChange}></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="startdate" className="form-label">Start Date</label>
                  <input type="date" className="form-control" id="startdate" name="startdate" value={formData.startdate} onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="enddate" className="form-label">End Date</label>
                  <input type="date" className="form-control" id="enddate" name="enddate" value={formData.enddate} onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="ownerPhone" className="form-label">Owner Phone</label>
                  <input type="text" className="form-control" id="ownerPhone" name="ownerPhone" value={formData.ownerPhone} onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="petName" className="form-label">Pet Name</label>
                  <input type="text" className="form-control" id="petName" name="petName" value={formData.petName} onChange={handleChange} />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleClose}>Close</button>
                <button type="submit" className="btn btn-primary">Submit</button>
              </div>
            </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleSubmit} appearance="primary">
            Submit
          </Button>
          <Button onClick={handleClose} appearance="subtle">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal> */}
        </>
    );
}

export default ScheduleModal;
