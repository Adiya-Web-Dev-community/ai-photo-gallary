import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "../../helpers/axios";
import "./plans.css";

const Plans = () => {
  const [plansData, setPlansData] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get("/plan/plans").then((res) => {
      console.log(res.data.data);
      setPlansData(res.data.data);
    });
  }, []);

  const handleSelectPlan = (plan) => {
    navigate("/dashboard/companyform");
  };

  return (
    <div className="plans-container">
      <div>
        <h2 className="plan-title">Choose Your Plan</h2>
      </div>
      <div className="card-container">
        {plansData.map((plan) => (
          <div key={plan._id} className="plan-card shadow">
            <div className="plan-card-content">
              <div className="plan-name">
                <span className="inline-flex px-4 py-1 text-sm font-semibold leading-5 tracking-wide uppercase rounded-full">
                  {plan.name}
                </span>
              </div>
              <div className="plan-price">
                <span className="plan-price-prefix">from</span>${plan.price}
                <span className="plan-price-suffix">/month</span>
              </div>
            </div>
            <div className="plan-card-content">
              <ul className="plan-feature">
                <li className="plan-feature-item">
                  <div className="flex-shrink-0">
                    <svg
                      className="plan-feature-icon"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <p className="plan-feature-text">{plan.description}</p>
                </li>
                <li className="plan-feature-item">
                  <div className="flex-shrink-0">
                    <svg
                      className="plan-feature-icon"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <p className="plan-feature-text">
                    Storage: {plan.storage} GB
                  </p>
                </li>
                <li className="plan-feature-item">
                  <div className="flex-shrink-0">
                    <svg
                      className="plan-feature-icon"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <p className="plan-feature-text">
                    Requests: {plan.request} per month
                  </p>
                </li>
                <li className="plan-feature-item">
                  <div className="flex-shrink-0">
                    <svg
                      className="plan-feature-icon"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <p className="plan-feature-text">
                    Expiry: {plan.expiryIn} days
                  </p>
                </li>
              </ul>
            </div>
            <div className="plan-btn">
              <button
                onClick={() => handleSelectPlan(plan)}
                className="select-plan-btn"
              >
                Select plan
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Plans;
