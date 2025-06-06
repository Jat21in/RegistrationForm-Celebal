import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import "./Form.css";

const countriesData = {
  India: ["Delhi", "Mumbai", "Bangalore", "Chennai", "Kolkata"],
  USA: ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix"],
  UK: ["London", "Manchester", "Birmingham", "Leeds", "Glasgow"],
};

const ErrorIcon = () => (
  <svg className="error-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="16" height="16">
    <circle cx="12" cy="12" r="10" stroke="red" strokeWidth="2" fill="none" />
    <line x1="12" y1="7" x2="12" y2="13" stroke="red" strokeWidth="2" />
    <circle cx="12" cy="17" r="1" fill="red" />
  </svg>
);

const EmailErrorTooltip = ({ message }) => (
  <div className="email-error-tooltip" role="alert">
    <div className="tooltip-arrow" />
    {message}
  </div>
);

const Form = () => {
  const navigate = useNavigate();
  const emailInputRef = useRef(null);
  const captchaRef = useRef(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    phoneCountryCode: "",
    phoneNumber: "",
    country: "",
    city: "",
    pan: "",
    aadhar: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [captchaToken, setCaptchaToken] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCaptchaVerify = (token) => {
    setCaptchaToken(token);
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.firstName)
      newErrors.firstName = (<><ErrorIcon /> First name is required</>);

    if (!formData.lastName)
      newErrors.lastName = (<><ErrorIcon /> Last name is required</>);

    if (!formData.username)
      newErrors.username = (<><ErrorIcon /> Username is required</>);

    if (!formData.email) {
      newErrors.email = (<><ErrorIcon /> Email is required</>);
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "invalid";
    }

    if (!formData.password || formData.password.length < 6)
      newErrors.password = (<><ErrorIcon /> Minimum 6 characters required</>);

    if (!formData.phoneCountryCode || !formData.phoneCountryCode.match(/^\+\d{1,3}$/))
      newErrors.phoneCountryCode = (<><ErrorIcon /> Valid country code required</>);

    if (!formData.phoneNumber || !/^\d{10}$/.test(formData.phoneNumber))
      newErrors.phoneNumber = (<><ErrorIcon /> Valid 10 digit phone number required</>);

    if (!formData.country)
      newErrors.country = (<><ErrorIcon /> Country is required</>);

    if (!formData.city)
      newErrors.city = (<><ErrorIcon /> City is required</>);

    if (!formData.pan || !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.pan))
      newErrors.pan = (<><ErrorIcon /> Invalid PAN format</>);

    if (!formData.aadhar || !/^\d{12}$/.test(formData.aadhar))
      newErrors.aadhar = (<><ErrorIcon /> Aadhar must be 12 digits</>);

    setErrors(newErrors);
    setIsFormValid(Object.keys(newErrors).length === 0);
  };

  useEffect(() => {
    validate();
  }, [formData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    validate();

    if (!captchaToken) {
      alert("Please complete the CAPTCHA.");
      return;
    }

    if (isFormValid) {
      navigate("/summary", { state: formData });
    } else {
      if (captchaRef.current) {
        captchaRef.current.resetCaptcha();
        setCaptchaToken(null);
      }
    }
  };

  return (
    <div className="form-page">
      <svg className="animated-bg" viewBox="0 0 1440 320">
        <path
          fill="#80d0c7"
          fillOpacity="1"
          d="M0,96L80,128C160,160,320,224,480,234.7C640,245,800,203,960,176C1120,149,1280,139,1360,133.3L1440,128L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
        />
      </svg>

      <div className="form-glow-wrapper">
        <form className="form-container" onSubmit={handleSubmit} noValidate>
          <h2>User Registration</h2>

          {[
            { name: "firstName", placeholder: "First Name" },
            { name: "lastName", placeholder: "Last Name" },
            { name: "username", placeholder: "Username" },
          ].map(({ name, placeholder }) => (
            <div key={name} className="form-group">
              <input
                name={name}
                type="text"
                placeholder={placeholder}
                value={formData[name]}
                onChange={handleChange}
                aria-describedby={`${name}Error`}
                aria-invalid={!!errors[name]}
              />
              {errors[name] && (
                <span id={`${name}Error`} className="error-message">
                  {errors[name]}
                </span>
              )}
            </div>
          ))}

          <div className="form-group email-group">
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              aria-describedby="emailError"
              aria-invalid={!!errors.email && errors.email !== "invalid"}
              ref={emailInputRef}
            />
            {errors.email && errors.email !== "invalid" && (
              <span id="emailError" className="error-message">{errors.email}</span>
            )}
            {errors.email === "invalid" && (
              <div className="email-tooltip-wrapper">
                <svg className="tooltip-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="18" height="18">
                  <circle cx="12" cy="12" r="10" stroke="#ff6b6b" strokeWidth="2" fill="none" />
                  <line x1="12" y1="7" x2="12" y2="13" stroke="#ff6b6b" strokeWidth="2" />
                  <circle cx="12" cy="17" r="1.2" fill="#ff6b6b" />
                </svg>
                <EmailErrorTooltip message={
                  <>
                    <strong>Invalid Email:</strong> Please include an <code>@</code> in the email address.
                    <br />
                    <span className="tooltip-highlight">‘{formData.email}’</span> is missing an <code>@</code>.
                  </>
                } />
              </div>
            )}
          </div>

          <div className="form-group">
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter Password"
                value={formData.password}
                onChange={handleChange}
                aria-describedby="passwordError"
                aria-invalid={!!errors.password}
              />
              <div
                className={`password-toggle-text ${showPassword ? "show" : "hide"}`}
                onClick={() => setShowPassword(!showPassword)}
                role="button"
                tabIndex={0}
                aria-label={showPassword ? "Hide password" : "Show password"}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setShowPassword(!showPassword);
                  }
                }}
              >
                <span>{showPassword ? "Hide" : "Show"}</span>
              </div>
            </div>
            {errors.password && (
              <span id="passwordError" className="error-message">
                {errors.password}
              </span>
            )}
          </div>

          <div className="form-group">
            <div className="phone-row">
              <input
                name="phoneCountryCode"
                type="text"
                placeholder="+91"
                value={formData.phoneCountryCode}
                onChange={handleChange}
                className="phone-code-input"
                aria-describedby="phoneCountryCodeError"
                aria-invalid={!!errors.phoneCountryCode}
              />
              <input
                name="phoneNumber"
                type="text"
                placeholder="9876543210"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="phone-number-input"
                aria-describedby="phoneNumberError"
                aria-invalid={!!errors.phoneNumber}
              />
            </div>
            {errors.phoneCountryCode && (
              <span id="phoneCountryCodeError" className="error-message">
                {errors.phoneCountryCode}
              </span>
            )}
            {errors.phoneNumber && (
              <span id="phoneNumberError" className="error-message">
                {errors.phoneNumber}
              </span>
            )}
          </div>

          <div className="form-group">
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              aria-describedby="countryError"
              aria-invalid={!!errors.country}
            >
              <option value="">Select Country</option>
              {Object.keys(countriesData).map((country) => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
            {errors.country && (
              <span id="countryError" className="error-message">{errors.country}</span>
            )}
          </div>

          <div className="form-group">
            <select
              name="city"
              value={formData.city}
              onChange={handleChange}
              aria-describedby="cityError"
              aria-invalid={!!errors.city}
              disabled={!formData.country}
            >
              <option value="">Select City</option>
              {formData.country &&
                countriesData[formData.country].map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
            </select>
            {errors.city && (
              <span id="cityError" className="error-message">{errors.city}</span>
            )}
          </div>

          {["pan", "aadhar"].map((field) => (
            <div key={field} className="form-group">
              <input
                name={field}
                type="text"
                placeholder={`${field === "pan" ? "PAN" : "Aadhar"} Number`}
                value={formData[field]}
                onChange={handleChange}
                aria-describedby={`${field}Error`}
                aria-invalid={!!errors[field]}
              />
              {errors[field] && (
                <span id={`${field}Error`} className="error-message">{errors[field]}</span>
              )}
            </div>
          ))}

          <div className="hcaptcha-wrapper">
            <HCaptcha sitekey="907c175a-87a8-40f6-bace-ecbc9af8d286" onVerify={handleCaptchaVerify} ref={captchaRef} />
          </div>

          <button type="submit" className="submit-btn" disabled={!isFormValid}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
