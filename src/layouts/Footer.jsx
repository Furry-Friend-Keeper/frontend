import React from "react";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import PhoneIcon from "@mui/icons-material/Phone";
import MailIcon from "@mui/icons-material/Mail";
import PetsIcon from "@mui/icons-material/Pets";
import { Container } from "@mui/material";

function Footer() {
  const customWidth = import.meta.env.VITE_CUSTOM_WIDTH;
  return (
    <footer className="footer-distributed mt-5">
      <div className="footer-left">
        <img src={`${import.meta.env.VITE_PROJECT_URL}logo+sub.png`} alt="" />
      </div>

      <div className="footer-center">
        <div>
          <i className="fa fa-map-marker"></i>
          <p>King Mongkut’s University of Technology Thonburi (KMUTT)</p>
        </div>

        <div>
          <i className="fa fa-phone"></i>
          <p>+66 99999 9999</p>
        </div>

        <div>
          <i className="fa fa-envelope"></i>
          <p>
            <a href="mailto:contact@mail.com">contact@mail.com</a>
          </p>
        </div>
      </div>

      <div className="footer-right">
        <p className="footer-company-about">
          <span>About the website</span>
          เป็น Web Application
          ที่สามารถค้นหาผู้รับฝากดูแลสัตว์เลี้ยงเพื่อฝากดูแลสัตว์เลี้ยงในเวลาที่ไม่ว่างหรือต้องเดินทางไกล
          ส่วนผู้รับฝากดูแลสัตว์เลี้ยงสามารถกำหนดราคา สิ่งอำนวยความสะดวกต่างๆ
          และเงื่อนไขที่สามารถรับฝากได้ตามที่ตกลงกับผู้ฝากสัตว์เลี้ยง
        </p>
        <div className="footer-icons">
            <a href="https://www.sit.kmutt.ac.th/" target="_blank" rel="noreferrer">
                <i className="bi bi-globe-americas"></i>
            </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
