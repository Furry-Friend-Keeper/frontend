import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

function LandingPage() {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div>
      {/* <header>
        <h1>test</h1>
        <p>dasl;dmasl;dms</p>
        <a href="/at3/home">Get Start</a>
      </header> */}
      <section>
        <div className="content-flex">
          <div className='left-box' data-aos="fade-left">
            <h1 className='text-black'>Furry Friend Keeper</h1>
            <p className='text-black mt-5'>ในปัจจุบันมีผู้คนนิยมเลี้ยงสัตว์เลี้ยงมากขึ้น ไม่ว่าจะเป็น หมา แมว หนู ไปจนถึง สัตว์ Exotic (สัตว์แปลก) ต่างๆกันมากขึ้น ซึ่งคนที่มีสัตว์เลี้ยงก็ไม่สามารถดูแลได้ตลอดเวลา 
            จึงต้องการคนที่คอยดูแลสัตว์เลี้ยงของพวกเขาในระหว่างที่พวกเขาไม่สามารถดูแลเองได้ ซึ่ง Furry Friend Keeper จะเป็น Web Application ที่เปิดโอกาสให้เจ้าของสัตว์ 
            เลี้ยงเข้ามาค้นหาผู้ที่สามารถดูแลสัตว์เลี้ยงของพวกเขา</p>
            <a href="/at3/home" className='text-white  btn btn-primary mt-5'>Get Start</a>
          </div>
          <div className='right-box' data-aos="fade-right">
            <img src="./assets/banner_cat.jpg" />
          </div>
        </div>
      </section>

    </div>
  )
}


export default LandingPage