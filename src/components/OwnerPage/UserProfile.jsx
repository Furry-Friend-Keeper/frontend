import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { Modal, Button, Uploader, Message, Loader, useToaster } from "rsuite";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import AvatarIcon from "@rsuite/icons/legacy/Avatar";
import PhoneInput from "react-phone-input-2";
import { useSelector } from "react-redux";
import Cropper from "react-easy-crop";
import CameraRetroIcon from '@rsuite/icons/legacy/CameraRetro';

const SizedAvatar = styled(Avatar)`
  ${({ size, theme }) => `
    width: ${theme.spacing(size)}rem; 
    height: ${theme.spacing(size)}rem; 
`};
`;

function UserProfile(props) {
  const { ownerId } = props;
  const { loading, userInfo, error, success, accessToken } = useSelector(
    (state) => state.auth
  );
  const [ownerData, setOwnerData] = useState([]);
  const [open, setOpen] = useState(false);
  const [backdrop, setBackdrop] = useState("true");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const toaster = useToaster();
  const [uploading, setUploading] = useState(false);
  const [fileInfo, setFileInfo] = useState(null);

  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const handleImageChange = (fileList) => {
    if (fileList.length === 0) return;
    const file = fileList[0].blobFile;

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      setImageSrc(reader.result);
    });
    reader.readAsDataURL(file);
  };

  const handleUploadChange = (fileInfo) => {
      console.log(fileInfo)
    const file = fileInfo.file; // Get the file from fileInfo
    const url = URL.createObjectURL(file.blobFile); // Create a URL for the file
    setImageSrc(url); // Update the image source state
  };

  const handlePreviewImage = (file, event) => {
    console.log(file)
    console.log(event)
  }
  
  const fetchData = async () => {
    try {
      const apiUrl = import.meta.env.VITE_OWNER_ID + ownerId;
      await axios
        .get(apiUrl, {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        })
        .then((response) => {
          const data = response.data;
          setOwnerData(data);
          console.log(data);
        });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const previewFile = (file, callback) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      callback(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <div className="col-md-4 ps-0">
        <div className="bg-shadow rounded p-4 p-sm-3 p-lg-4 p-md-4 bg-white mt-4">
          <div className="profile-info-container">
            <div className="profile-info-title">
              <div className="row profile-info-image">
                <SizedAvatar
                  size="8"
                  alt="Remy Sharp"
                  src="/assets/banner_cat.jpg"
                />
              </div>
              <div className="profile-info-title-detail">
                <h5>
                  {ownerData.firstName} {ownerData.lastName}
                </h5>
                <div className="blue-btn">
                  <Button
                    onClick={handleOpen}
                    color="blue"
                    appearance="primary"
                  >
                    Edit Profile
                  </Button>
                </div>
              </div>
            </div>
            <div className="profile-infomation">
              <h5>Information</h5>
              <div className="profile-infomation-detail">
                <table>
                  <tbody>
                    <tr className="profile-warpper">
                      <td>
                        <p>Email</p>
                      </td>
                      <td>
                        <p className="info">{ownerData.email}</p>
                      </td>
                    </tr>
                    <tr className="profile-warpper">
                      <td>
                        <p>Phone</p>
                      </td>
                      <td>
                        <p className="info">{ownerData.phone}</p>
                      </td>
                    </tr>
                    <tr className="profile-warpper">
                      <td>
                        <p>Password</p>
                      </td>
                      <td className="info">
                        <Button color="blue" appearance="ghost">
                          Change Password
                        </Button>
                      </td>
                    </tr>
                    <tr className="profile-warpper">
                      <td>
                        <p>Pet Name</p>
                      </td>
                      <td>
                        <p className="info">{ownerData.petName}</p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        className="position-absolute top-50 start-50 translate-middle mt-0"
        backdrop={backdrop}
        keyboard={false}
        open={open}
        size="sm"
        onClose={handleClose}
      >
        <Modal.Header>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {/* <Placeholder.Paragraph /> */}
          <div className="modal-body">
            <div className="mb-3">
              {/* <Uploader
                        fileListVisible={false}
                        listType="picture"
                        // action="//jsonplaceholder.typicode.com/posts/"
                        onUpload={file => {
                            setUploading(true);
                            previewFile(file.blobFile, value => {
                            setFileInfo(value);
                            });
                        }}
                        // onSuccess={(response, file) => {
                        //     setUploading(false);
                        //     toaster.push(<Message type="success">Uploaded successfully</Message>);
                        //     console.log(response);
                        // }}
                        // onError={() => {
                        //     setFileInfo(null);
                        //     setUploading(false);
                        //     toaster.push(<Message type="error">Upload failed</Message>);
                        // }}
                        >
                        <button style={{ width: 150, height: 150 }}>
                            {uploading && <Loader backdrop center />}
                            {fileInfo ? (
                            <img src={fileInfo} width="100%" height="100%" />
                            ) : (
                            <AvatarIcon style={{ fontSize: 80 }} />
                            )}
                        </button>
                    </Uploader> */}
              <Uploader
                // fileListVisible={false}
                autoUpload={false}
                multiple={false}
                listType="picture"
                action="//jsonplaceholder.typicode.com/posts/"
                // onUpload={file => {
                //     setUploading(true);
                //     previewFile(file.blobFile, value => {
                //       setFileInfo(value);
                //     });
                //   }}    
                onPreview={handlePreviewImage}
              >
                {/* <Button>Select files...</Button> */}
                <button>
                    <CameraRetroIcon />
                </button>
                 {/* <button style={{ width: 150, height: 150 }}>
                    {uploading && <Loader backdrop center />}
                    {imageSrc  ? (
                    <img src={imageSrc} width="100%" height="100%" />
                    ) : (
                    <AvatarIcon style={{ fontSize: 80 }} />
                    )}
                </button> */}
              </Uploader>
              {/* {imageSrc && (
                <div>
                    <Cropper
                        image={imageSrc}
                        crop={crop}
                        zoom={zoom}
                        onCropChange={setCrop}
                        onZoomChange={setZoom}
                        aspect={4 / 3} // You can adjust the aspect ratio
                    />
                </div>
            )} */}
            </div>
            <div className="mb-3">
              <label htmlFor="firtName" className="form-label">
                First Name
              </label>
              <input
                type="text"
                className="form-control"
                id="firtName"
                name="firtName"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                name="lastName"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                Phone
              </label>
              <PhoneInput
                inputProps={{
                  required: true,
                  autoFocus: true,
                  className: "form-control py-2",
                }}
                masks={{ th: ".. ... ...." }}
                // inputClass={`${errors.phone ? "is-invalid" : ""} py-2`}
                inputStyle={{ width: "100%" }}
                specialLabel={""}
                country={"th"}
                countryCodeEditable={false}
                placeholder="Enter phone number"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="petName" className="form-label">
                Pet Name
              </label>
              <input
                type="text"
                className="form-control"
                id="petName"
                name="petName"
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose} appearance="primary">
            Ok
          </Button>
          <Button onClick={handleClose} appearance="subtle">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UserProfile;
