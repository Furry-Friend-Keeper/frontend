import React from 'react'

function TitlePage() {
  return (
    <div className="container-fluid g-0">
    <div className="pages-main bg-white">
      <div className="keeper-title">
        <div className="col-md-6 col-sm-12 keeper-text mx-3">
          <h3>Furry Friend Keeper</h3>
          <h3>เว็ปไซต์สำหรับรับ-ฝากดูแลสัตว์เลี้ยง</h3>
          <p>ในปัจจุบันมีผู้คนนิยมเลี้ยงสัตว์เลี้ยงมากขึ้น ไม่ว่าจะเป็น หมา แมว หนู ไปจนถึง สัตว ์Exotic (สัตว์แปลก) ต่างๆกันมากขึ้น ซึ่งคนที่มีสัตว์เลี้ยงก็ไม่สามารถดูแลได้ตลอดเวลา 
            จึงต้องการคนที่คอยดูแลสัตว์เลี้ยงของพวกเขาในระหว่างที่พวกเขาไม่สามารถดูแลเองได้ ซึ่ง Furry Friend Keeper จะเป็น Web Application ที่เปิดโอกาสให้เจ้าของสัตว์ 
            เลี้ยงเข้ามาค้นหาผู้ที่สามารถดูแลสัตว์เลี้ยงของพวกเขา</p>
            <div>
              <a href="/login" className="btn btn-primary me-2">เริ่มต้นใช้งาน</a>
              <a href="/signup" className="btn btn-secondary">สมัครใช้งาน</a>
            </div> 
        </div>
      </div>
    </div>
  </div>
  )
}

export default TitlePage