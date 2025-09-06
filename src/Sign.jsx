// import React, { useState } from "react";
// import { useNavigate } from "react-router";

// const Sign = () => {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });
//   let navigate = useNavigate();
//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // Handle form submit
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch("http://localhost:3000/signin", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       const result = await response.json();
//       console.log("Server response:", result.message);
//       localStorage.setItem("message", JSON.stringify(`${result.message}`));
//       navigate("/");
//       if (response.ok) {
//         alert("Login successful!");
//       } else {
//         alert(result.message || "Invalid credentials");
//       }
//     } catch (error) {
//       console.error("Error during login:", error);
//       alert("Something went wrong!");
//     }
//   };

//   return (
//     <div style={{ margin: "auto" }} className="col text-center">
//       <h1>Sign In</h1>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label className="m-3 me-5 fs-3">Email: </label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//             className="p-2"
//           />
//         </div>

//         <div>
//           <label className="m-3 fs-3">Password: </label>
//           <input
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//             className="p-2"
//           />
//         </div>

//         <button type="submit" className="btn btn-primary px-4 py-2 fs-4 mt-4">
//           Sign In
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Sign;
import React, { useState } from "react";
import { useNavigate } from "react-router";
import "./index.css"; // make sure to include your neon styles

const Sign = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  let navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://job-scapper.onrender.com/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log("Server response:", result.message);
      localStorage.setItem("message", JSON.stringify(`${result.message}`));
      navigate("/");
      if (response.ok) {
        alert("Login successful!");
      } else {
        alert(result.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="section-wrapper d-flex align-items-center justify-content-center">
      <div className="form-box col-10 col-md-6 col-lg-4">
        <h1 className="app-title mb-4">Welcome Back</h1>
        <p className="subtitle mb-4">
          Please <span>Sign In</span> to continue
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4 text-start">
            <label className="form-label glowing-text fs-5">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="form-control neon-input p-3 rounded-3"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-4 text-start">
            <label className="form-label glowing-text fs-5">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="form-control neon-input p-3 rounded-3"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-100 py-3 fs-5 neon-btn rounded-4 mt-3"
          >
            Sign In
          </button>
        </form>

        <p className="footer mt-4">© Powered by Error Tech</p>
      </div>
    </div>
  );
};

export default Sign;
