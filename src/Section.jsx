import React, { useEffect, useRef, useState } from "react";
import "./index.css";
import { useNavigate } from "react-router";

const Section = () => {
  const [data, setData] = useState({ role: "", city: "" });
  const [status, setStatus] = useState("Submit");
  const [isTrue, setIsTrue] = useState(null);
  const [credit, setCredit] = useState([]);
  const [found, isFound] = useState([]);
  const [data1, setData1] = useState("");
  let x = JSON.parse(localStorage.getItem("message"));
  useEffect(() => {
    dataSubmit();
    // const completedAt = localStorage.getItem("completedAt");

    // if (completedAt) {
    //   const diff = Date.now() - parseInt(completedAt, 10);
    //   if (diff < 60 * 1000) {
    //     setStatus("sleep");
    //   } else {
    //     localStorage.removeItem("completedAt");
    //   }
    // }

    // fetchStatus();
    // setCredit(null);
  }, [data, isTrue, status, credit]);

  const button = useRef();
  const navigate = useNavigate();

  const dataHandel = (e) => {
    x = JSON.parse(localStorage.getItem("message"));
    setData({ ...data, [e.target.name]: e.target.value });
    setIsTrue(x);
    // console.log(isTrue);
    if (x == null) {
      alert("Please Login First...");
      navigate("/sign");
    }
    console.log(status);
    if (
      data.role == "Please choose role..." &&
      data.city == "Please choose city..." &&
      data.role == "" &&
      data.city == ""
    ) {
      button.current.disabled = true;
    } else {
      if (status == "Submit") {
        button.current.disabled = false;
      } else {
        button.current.disabled = true;
      }
    }
    console.log(data);
  };
  // if (isTrue == "null") {
  //   alert("Please Login First...");
  //   navigate("/sign");
  // }
  const capitalize = (str) =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  const dataSubmit = async (e) => {
    e.preventDefault();
    setIsTrue(x);
    setCredit([]);
    console.log(isTrue);
    // if (isTrue == "null") {
    //   // alert("Please Login First...");
    //   navigate("/sign");
    //   button.current.disabled = true;
    // }
    if (
      data.role != "Please choose role..." &&
      data.city != "Please choose city..." &&
      data.role != "" &&
      data.city != "" &&
      isTrue
    ) {
      button.current.disabled = false;
      setStatus("Processing...");
      button.current.disabled = true;
      try {
        let response = await fetch(
          "https://job-scapper.onrender.com/products",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              // "ngrok-skip-browser-warning": "true",
            },
            body: JSON.stringify(data),
          }
        );

        if (response.ok) {
          console.log("Data sent successfully:", await response.json());
        } else {
          console.error("Error:", response.status, await response.text());
        }
      } catch (err) {
        console.log(err.message);
      }
    } else {
      button.current.disabled = true;
    }

    // const interval1 = setInterval(async () => {
    //   const res1 = await fetch("http://localhost:3000/credit");
    //   const data1 = await res1.json();
    //   if (data1.message === true) {
    //     setStatus("Submit");
    //     setCredit(true);
    //     alert("Out of credit...");
    //     // button.current.disabled = true;
    //     clearInterval(interval1);
    //   }
    // }, 3000);

    const interval = setInterval(async () => {
      // const res1 = await fetch("http://localhost:3000/credit");
      // const data1 = await res1.json();
      // if (data1.message === true) {
      //   setStatus("Submit");
      //   setCredit(true);
      //   alert("Out of credit...");
      //   // button.current.disabled = true;
      //   clearInterval(interval);
      // }

      const res = await fetch("https://job-scapper.onrender.com/task-status");
      const data = await res.json();
      console.log(data);
      // const creditRes = await fetch("http://localhost:3000/credit");
      // const creditData = await creditRes.json();
      // console.log(creditData);
      // if (creditData.message === true) {
      //   setStatus("Out of credit");
      //   setCredit(true);
      //   button.current.disabled = true;
      //   clearInterval(interval); // stop polling
      //   return;
      // }
      // console.log(data);
      // setStatus(data.status);
      if (data.status1 === true) {
        // localStorage.setItem("completedAt", Date.now().toString());
        setStatus("Submit");
        setCredit(data.status);
        setData1(
          `My free trial has expired on the following job portals: ${data.status
            .map(capitalize)
            .join(", ")}. Please resolve this issue.`
        );
        isFound(data.notFound);
        button.current.disabled = false;
        clearInterval(interval);
        return;
      }
    }, 3000);
  };

  return (
    <>
      <div className="fs-1 fw-bold mt-4 text-center col">Job Ai Automation</div>
      <div className="text-center col fs-4">
        Job Portals:- Indeed, Naukari, LinkedIn, Glassdoor
      </div>
      <div className="col">
        <div className="container">
          <form onSubmit={dataSubmit} onChange={dataHandel}>
            <div
              className="col fs-4  d-flex flex-wrap align-content-center justify-content-center"
              style={{ height: "200px" }}
            >
              <label className="me-4 d-flex flex-wrap align-content-center">
                Role {" : "}
              </label>
              <select className="p-3 rounded-4" name="role">
                <option className="rounded-4">Please choose role...</option>
                <option className="rounded-4">Frontend Developer</option>
                <option className="rounded-4">Backend Developer</option>
                <option className="rounded-4">Java Developer</option>
                <option className="rounded-4">Python Developer</option>
              </select>
            </div>

            <div
              className="col fs-4  d-flex flex-wrap align-content-center justify-content-center"
              style={{ height: "200px" }}
            >
              <label className="me-4 d-flex flex-wrap align-content-center">
                City {" : "}
              </label>
              <select className="p-3 rounded-4" name="city">
                <option className="rounded-4">Please choose City...</option>
                <option className="rounded-4">Hyderabad</option>
                <option className="rounded-4">Bengaluru</option>
                <option className="rounded-4">Chennai</option>
                <option className="rounded-4">Mumbai</option>
              </select>
            </div>
            <div className="col text-center">
              <button
                className="btn btn-primary px-3 py-2 fs-4 mb-5"
                ref={button}
                // disabled={status === "sleep" ? true : false}
              >
                {status}
              </button>
            </div>
          </form>
        </div>

        {status == "Processing..." ? (
          <div className="text-center fs-5">
            We are hitting all the platforms and filtering. Estimated time:
            2Mins
          </div>
        ) : (
          <div></div>
        )}

        {credit.length > 0 && (
          <div className="text-center fs-4 mt-4">
            <button className="btn btn-danger disabled fs-4 mt-5">
              Out Of Credit
            </button>{" "}
            <br />
            <ul className="text-center mt-4" style={{ listStyleType: "none" }}>
              {credit.map((ele) => (
                <li className="text-center">
                  Your free trial on the {ele[0].toUpperCase() + ele.slice(1)}{" "}
                  job portal is about to expire.
                </li>
              ))}
            </ul>
            <div className="text-center fw-semibold fs-3">
              Please Contact Your Admin
            </div>
            <div className="fs-5">
              {/* <a
                href={`mailto:ravi@errortechnologies.com?subject=Inquiry&body=${encodeURIComponent(
                  data1
                )}`}
                
              >
                ravi@errortechnologies.com
              </a> */}
              <span className="text-decoration-none">Contact via Gmail:</span>{" "}
              <a
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=ravi@errortechnologies.com&su=${encodeURIComponent(
                  "Inquiry"
                )}&body=${encodeURIComponent(data1)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-decoration-none"
              >
                {" "}
                ravi@errortechnologies.com
              </a>
            </div>
            <div className="fs-5">Contact via Phone: +918179085985</div>
          </div>
        )}

        {found.length > 0 && (
          <div className="text-center fs-4 mt-4">
            Data Not Found: <br />
            <ul>
              {found.map((ele) => (
                <li>{ele}</li>
              ))}
            </ul>
          </div>
        )}

        <div
          className="fs-3 border mt-5 d-flex flex-wrap align-content-center justify-content-around py-2 rounded-4 border-secondary"
          style={{ margin: "0px 40%" }}
        >
          Google Sheet Link:{"  "}
          <a
            href="https://docs.google.com/spreadsheets/d/1kEmJDzTSCo9igWhYoN7qFWhMwv-F57wmEgvct4mYrHE/edit?usp=sharing"
            target="_blank"
            className="text-decoration-none  btn btn-info"
          >
            Click here
          </a>
        </div>

        <div className="text-center fs-5 fw-semibold mt-2">
          <span className="fs-5">© </span>Powered by Error Tech
        </div>
      </div>
    </>
  );
};

export default Section;
