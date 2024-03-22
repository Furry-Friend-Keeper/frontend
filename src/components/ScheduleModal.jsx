import { useState, useEffect } from "react";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AddIcon from "@mui/icons-material/Add";
import { Modal, Button, Placeholder, DateRangePicker } from "rsuite";
import { Button as ButtonMui } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import moment from "moment";
import axios from "axios";
import { TagPicker } from "rsuite";
import PhoneInput from "react-phone-input-2";

function ScheduleModal(keeperId) {
    const { beforeToday } = DateRangePicker;
    const { loading, userInfo, error, success, accessToken } = useSelector(
        (state) => state.auth
    );
    const [show, setShow] = useState(false);
    const [backdrop, setBackdrop] = useState("static");
    const [formData, setFormData] = useState({
        message: "",
        startdate: new Date(),
        enddate: new Date(),
        ownerPhone: "",
        petName: "",
    });

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

    const onSubmit = (data) => {
      const phoneNumber = (data.phone).replace(/^66/, "0") 
      if (data.petCategories !== "") {
        data.petCategories = JSON.parse(data.petCategories);
      }
      const result = {
        startDate: data.startDate,
        endDate: data.endDate,
        phone: phoneNumber,
        categoryId: data.petCategories,
        message: data.message,
        petName: data.petName,
        statusId: "1",
        petKeeperId: keeperId,
        petOwnerId: userInfo.id,
      };
  
      dispatch(registerKeeper(result))
      // SignUpForm(data);
    };

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
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleChange = (value, name) => {
        setFormData({ ...formData, [name]: value });
    };

    // const handleSubmit = async () => {
    //     // Here, send the formData to your backend
    //     console.log(formData);
    //     handleClose();
    // };

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

                <form onSubmit={handleSubmit(onSubmit)}>
                    <Modal.Body>
                        {/* <Placeholder.Paragraph /> */}
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="message" className="form-label">
                                    Booking Period
                                </label>
                                <DateRangePicker
                                    format="MM/dd/yyyy HH:mm"
                                    appearance="default"
                                    block
                                    shouldDisableDate={beforeToday()}
                                    ranges={Ranges}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="petName" className="form-label">
                                    Pet Category
                                </label>
                                <TagPicker
                                    data={petCategories}
                                    className="form-control"
                                    {...register("petCategories")}
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
                                    value={formData.petName}
                                    onChange={handleChange}
                                    {...register("petName", { maxLength: {
                                      value: 200,
                                      message: "Pet name must not more than 200 characters"
                                  }})}
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
                                    value={formData.message}
                                    onChange={handleChange}
                                    {...register("message", { maxLength: {
                                      value: 200,
                                      message: "Message must not more than 200 characters"
                                  }})}
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
                                rules={{ required: "Please enter your phone number.",
                                        maxLength: { value:11, message: "Phone number must be 10 digits"},
                                        minLength : { value:11, message: "Phone number must be 10 digits"}

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
                                    masks={{th: '.. ... ....', }}
                                    inputClass={`${errors.phone ? "is-invalid" : ""} py-2`}
                                    inputStyle={{ width: "100%"}}
                                    specialLabel={""}
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
                        <Button onClick={handleClose} type="submit" appearance="primary">
                            Ok
                        </Button>
                        <Button onClick={handleClose} appearance="subtle">
                            Cancel
                        </Button>
                    </Modal.Footer>
                </form>
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
