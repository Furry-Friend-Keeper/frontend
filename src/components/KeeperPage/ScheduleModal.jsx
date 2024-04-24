import { useState, useEffect } from "react";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AddIcon from "@mui/icons-material/Add";
import { Modal, Button, Placeholder, DateRangePicker, Form } from "rsuite";
import { Button as ButtonMui } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import moment from "moment";
import axiosAuth from "../Global/AxiosService";
import axios from "axios";
import { TagPicker, SelectPicker } from "rsuite";
import PhoneInput from "react-phone-input-2";
import { Message, useToaster } from "rsuite";

function ScheduleModal(props) {
  const { keeperId, closedDays, availableStore, disableDate, categoryData } = props;
  const { loading, userInfo, error, success, accessToken } = useSelector(
    (state) => state.auth
  );
  const [show, setShow] = useState(false);
  const [backdrop, setBackdrop] = useState("static");
  const [dateRange, setDateRange] = useState([null, null]);

  const {
    register,
    setValue,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleOpen = () => setShow(true);
  const handleClose = () => {
    setShow(false)
    clearModalContent()
};

  const [petCategories, setPetCategories] = useState([]);
  const [petCategoriesRaw, setPetCategoriesRaw] = useState([]);
  const placement = "topEnd";
  const duration = 3000;
  const toaster = useToaster();

  const message = (type, errorMessage) => {
    return (
      <Message showIcon type={type} header={type == "error" ? "Failed!" : "Success!"} closable>
        {/* <h6><strong>Failed!</strong> </h6> */}
        {type == "error" ?
        <small className="text-black">{errorMessage}</small>
        :
        <small className="text-black">Booking Successfully.</small>
        }
      </Message>
    );
  }

  const Ranges = [
    {
      label: "today",
      value: [moment().startOf("day").toDate(), moment().endOf("day").toDate()],
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
  }, [categoryData]);

  const clearModalContent = () => {
    setValue("dateRange", "");
    setValue("message", "");
    setValue("petName", "");
    setValue("phone", "");
    setValue("tags", "");
    setDateRange([null, null]);
  }

  const onSubmit = async (data) => {
    const phoneNumber = data.phone.replace(/^66/, "0").trim();

    for (const category of petCategoriesRaw) {
      if (data.tags === category.name) {
        data.tags = category.id;
      }
    }

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

    await axiosAuth
      .post(import.meta.env.VITE_APPOINTMENT_CREATE, result)
      .then((res) => {
        toaster.push(message("success",""), { placement, duration })
        handleClose();
      }).catch((err) => {
        toaster.push(message("error", "Can't select a date that the store has closed. Please try again."), { placement, duration })
        console.log(err);
      })

    // SignUpForm(data);
  };

  const PetKeeperCategories = async () => {
    await axios
      .get(import.meta.env.VITE_KEEPER_CATEGORIES)
      .then((res) => {
        const response = res.data;
        const response_filter = response.filter(item => categoryData?.includes(item.name))
        const data = response_filter.map((item) => item.name);
        const rsite_data = data.map((item) => ({
          label: item,
          value: item,
        }));
        setPetCategories(rsite_data);
        setPetCategoriesRaw(response_filter);
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

  const disabledDaysArray =
    closedDays
      ?.split(",")
      ?.map((day) => day.trim())
      ?.filter((day) => day !== "") || [];

  const disableDateRangeTest =
    disableDate?.map((date) => {
      return {
        ...date,
        startDate: moment.unix(date.startDate).format(), // format as needed
        endDate: moment.unix(date.endDate).format(), // format as needed
      };
    }) || [];

  // console.log(disableDateRangeTest)
  // console.log(closedDays)
  // console.log(disabledDaysArray)

  // const disabledDaysArray = ["Sunday", "Monday", "Tuesday"];

  const handleSelect = (value) => {
    let range = dateRange;
    if (dateRange.length >= 2) range = [value];
    else range = [...dateRange, value];
    range = range.sort((a, b) => new Date(a) - new Date(b));
    setDateRange(range);
  };

  const disabledWeekdays = disabledDaysArray.map((day) =>
    [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ].indexOf(day)
  );

  const disableDays = (date) => {
    const momentDate = moment(date);
    // Get today's date at the start of the day for comparison
    const today = moment().startOf("day");

    // Disable dates before today
    if (momentDate.isBefore(today)) {
      return true;
    }
    // Enable dates if selected dates range between disabled date range
    if (dateRange[0] && dateRange[1]) {
      if (momentDate.isBetween(dateRange[0], dateRange[1], "day", "[]")) {
        return false;
      }
    }
    // Check if the date is a disabled weekday
    if (disabledWeekdays.includes(momentDate.day())) {
      return true;
    }
    // Check if the date is within the disabled date range
    for (let range of disableDateRangeTest) {
      if (momentDate.isBetween(range.startDate, range.endDate, "day", "[]")) {
        return true;
      }
    }
    return false;
  };

  return (
    <>
      <div className="bg-shadow p-2 p-sm-3 p-md-3 bg-white mt-4">
        <div className="title">
          <h4 className="mb-2">Schedule</h4>
          <p>For the purpose of reserving a pet boarding period</p>
        </div>
        {!accessToken ? (
          <div className="mt-3 d-flex justify-content-center align-items-center">
            <p>
              Please{" "}
              <a className="text-decoration-underline" href="/at3/login">
                Login
              </a>{" "}
              First
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
            <p className="fw-bold ">Schedule not available for Keeper</p>
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
                  rules={{ required: "Please enter your booking period."}}
                  render={({ field: { ref, ...field } }) => (
                    <DateRangePicker
                      {...field}
                      className={`${errors.dateRange ? "border-error" : ""}`}
                      format="dd MMMM yyyy HH:mm"
                      appearance="default"
                      placeholder="Select Booking Period"
                      block
                      showHeader={false}
                      onSelect={handleSelect}
                      shouldDisableDate={disableDays}
                      ranges={Ranges}
                      showOk
                      placement="bottomEnd"
                      preventOverflow
                      onChange={(value) => {
                        setDateRange(value);
                        field.onChange(value);
                      }}
                      onClean={(event) => setDateRange([null, null])}
                    />
                  )}
                />
                {errors.dateRange && <small className="error-message">{errors.dateRange.message}</small>}
              </div>
              <div className="mb-3">
                <label htmlFor="petCategory" className="form-label">
                  Pet Category
                </label>
                <Controller
                  name="tags"
                  control={control}
                  rules={{ required: "Please enter your pet category."}}
                  render={({ field: { ref, ...field } }) => (
                    <SelectPicker
                      {...field}
                      className={`${errors.tags ? "border-error" : ""}`}
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
                {errors.tags && <small className="error-message">{errors.tags.message}</small>}
              </div>
              <div className="mb-3">
                <label htmlFor="petName" className="form-label">
                  Pet Name (Optional)
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.petName ? "is-invalid" : ""}`}
                  id="petName"
                  name="petName"
                  // value={formData.petName}
                  // onChange={handleChange}
                  {...register("petName", {
                    required: "Please enter your pet name.",
                    maxLength: {
                      value: 200,
                      message: "Pet name must not more than 200 characters",
                    },
                  })}
                />
                {errors.petName && <small className="error-message">{errors.petName.message}</small>}
              </div>
              <div className="mb-3">
                <label htmlFor="message" className="form-label">
                  Message
                </label>
                <textarea
                  className={`form-control ${errors.message ? "is-invalid" : ""}`}
                  id="message"
                  name="message"
                  // value={formData.message}
                  // onChange={handleChange}
                  {...register("message", {
                    required: "Please enter your message.",
                    maxLength: {
                      value: 200,
                      message: "Message must not more than 200 characters",
                    },
                  })}
                ></textarea>
                {errors.message && <small className="error-message">{errors.message.message}</small>}
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
                <label htmlFor="ownerPhone" className="form-label">
                  Owner Phone
                </label>
                <Controller
                  control={control}
                  name="phone"
                  rules={{
                    required: "Please enter your phone number.",
                    maxLength: {
                      value: 11,
                      message: "Phone number must be 10 digits",
                    },
                    minLength: {
                      value: 11,
                      message: "Phone number must be 10 digits",
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
                      inputClass={`${errors.phone ? "is-invalid" : ""} py-2`}
                      inputStyle={{ width: "100%" }}
                      specialLabel={""}
                      disableDropdown={true}
                      country={"th"}
                      countryCodeEditable={false}
                      placeholder="Enter phone number"
                    />
                  )}
                />
                {errors.phone && <small className="error-message">{errors.phone.message}</small>}
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
