import { useState } from 'react';
import Userfront from "@userfront/core";

function SignupKeeper() {
  
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
    });
  
    const { name, email, password } = formData;
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const nextStep = () => {
      setStep(step + 1);
    };
  
    const prevStep = () => {
      setStep(step - 1);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Handle form submission here
      console.log('Form submitted:', formData);
    };
  
    switch (step) {
      case 1:
        return (
          <div className="container">
            <div className="row">
              <div className="col-md-6 offset-md-3">
                <h3>Step 1</h3>
                <div className="mb-3">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={name}
                    onChange={handleChange}
                  />
                </div>
                <button className="btn btn-primary" onClick={nextStep}>
                  Next
                </button>
              </div>
            </div>
          </div>
        );
  
      case 2:
        return (
          <div className="container">
            <div className="row">
              <div className="col-md-6 offset-md-3">
                <h3>Step 2</h3>
                <div className="mb-3">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                  />
                </div>
                <button className="btn btn-secondary" onClick={prevStep}>
                  Previous
                </button>
                <button className="btn btn-primary" onClick={nextStep}>
                  Next
                </button>
              </div>
            </div>
          </div>
        );
  
      case 3:
        return (
          <div className="container">
            <div className="row">
              <div className="col-md-6 offset-md-3">
                <h3>Step 3</h3>
                <div className="mb-3">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                  />
                </div>
                <button className="btn btn-secondary" onClick={prevStep}>
                  Previous
                </button>
                <button type="submit" className="btn btn-success" onClick={handleSubmit}>
                  Submit
                </button>
              </div>
            </div>
          </div>
        );
  
      default:
        return null;
    }
  }


export default SignupKeeper