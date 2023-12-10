import React from 'react'
import TitlePage from '../components/TitlePage';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PersonPinIcon from '@mui/icons-material/PersonPin';

function About() {
  return (
    <>
        <TitlePage />
        <div className="my-4">
          <div className="about-title">
            <h1 className="text-uppercase ">Devloper Team</h1>
            <div className="about-detail">
                <div>
                  <PersonPinIcon />
                  <h3>Nod</h3>
                  <p>Frontend Devloper</p>
                </div>
                <div>
                  <PersonPinIcon />
                  <h3>Arm</h3>
                  <p>Backend Devloper</p>
                </div>
                <div>
                  <PersonPinIcon />
                  <h3>Tong</h3>
                  <p>FullStack Devloper & DevOps</p>
                </div>
            </div>
          </div>
        </div>
    </>
  )
}

export default About