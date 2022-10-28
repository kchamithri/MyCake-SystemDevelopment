import React from 'react';
import { NavLink } from 'react-router-dom';

const Register = () => {
    return ( 
        <div>
                <div className="container shadow my-5">
        <div className="row justify-content-end">
          <div className="col-md-5 d-flex flex-column align-items-center form text-white  justify-content-center order-2">
            <h1 className="display-4 fw-bolder"> Hello </h1>
            <p className="lead text-center">Enter Your Details To Register</p>
            <h5 className="mb-4">OR</h5>
            <NavLink
              to="/login"
              className="btn btn-outline-light rounded-pill pb-2 w-50"
            >
              Login
            </NavLink>
          </div>
          <div className="col-md-6 p-5">
            <form>
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="kc@gmail.com"
                />
                </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">
                  Password
                </label>
                <input
                  type="password"
                  class="form-control"
                  id="exampleInputPassword1"
                />
              </div>
              <NavLink to="/register" className="btn btn-outline-primary w-100 mt-4 rounded-pill pb-2 w-50">
                Register
              </NavLink>
            </form>
          </div>
        </div>
      </div>
        </div>
     );
}
 
export default Register;