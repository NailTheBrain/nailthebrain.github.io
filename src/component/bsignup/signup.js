import React from "react";
import "./bstyle.css";
import { passCheck, showCall } from "./passCheck";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Alert from "../alert";
import link from "../../link/user"
import link1 from "../../link/devuser"
import linkotp from "../../link/otp"
import Loader from "../loader";
import Otp from "./Otp";

export default function Signup() {
  let navigate = useNavigate();
  let data = useLocation().state;

  //  for animation of words
  useEffect(() => {
    let input = document.querySelectorAll(".inputDes");
    input.forEach((e) => {
      e.innerHTML = e.innerText
        .split("")
        .map(
          (des, indx) =>
            `<span style="transition-delay:${indx * 40}ms" >${des}</span>`
        )
        .join("");
    });
    if (data === null) navigate("/fields");
  }, []);

  let show;
  let showmail;
  if (data === null) navigate("/fields");
  else {
    data.type === "aup" ? (show = "Academics") : (show = "Development");
    data.type === "aup"
      ? (showmail = "Please enter student mail id")
      : (showmail = "We'll never share your email with anyone.");
  }

  // Alert start
  const [showAlert, setshowAlert] = useState(false);
  const [textAlert, settextAlert] = useState("");
  const [warnAlert, setwarnAlert] = useState();
  // Alert end

  // loader start
  const [showLoader, setshowLoader] = useState(false);
  // loader end

  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");
  const [conPass, setconPass] = useState("");
  const [password, setPassword] = useState(false);
  const [confirmPassword, setconfirmPassword] = useState(false);

  //otp start
  const [showotp, setshowotp] = useState(false);
  // const [showtoggle, setshowtoggle] = useState(false);
  const [otp, setotp] = useState("");
  const [showotploading, setshowotploading] = useState(false);
  const [otptoken, setotptoken] = useState("");
  //otp end

  function chkfname(e) {
    e = e.toUpperCase();
    if (e.length >= 1) {
      if (e[e.length - 1].match(/[A-Z]/)) setFName(e);
    } else setFName(e);
  }

  function chklname(e) {
    e = e.toUpperCase();
    if (e.length >= 1) {
      if (e[e.length - 1].match(/[A-Z]/)) setLName(e);
    } else setLName(e);
  }

  function passcheckcall(e) {
    let chk = passCheck(e);
    chk
      ? (document.querySelector("#passmsg").style.display = "none")
      : (document.querySelector("#passmsg").style.display = "block");
    setPassword(chk);
    setPass(e);
  }

  function conpasscheckcall(e) {
    let x = document.getElementById("password").value;
    let y = document.getElementById("passmach");
    x === e
      ? (document.querySelector("#passmsg").style.display = "none")
      : (document.querySelector("#passmsg").style.display = "block");
    x === e ? (y.style.display = "none") : (y.style.display = "block");
    setconfirmPassword(x === e);
    setconPass(e);
  }

  async function sub() {
    if (window.confirm("Have you CHECKED your MAIL??")) {
      if (data.type === "aup" && mail.split("@")[1] !== "miet.ac.in") {
        setshowAlert(true);
        setwarnAlert(1)
        settextAlert("Please enter valid student mail id ????");
        setMail("");
      } else if (!mail.match(/[^A-z0-9]/)) {
        setshowAlert(true);
        setwarnAlert(1);
        settextAlert("Please enter valid mail id ????");
      } else if (!password) {
        setshowAlert(true);
        setwarnAlert(2);
        settextAlert("Please enter Password with right validation ????");
      } else if (!confirmPassword) {
        setshowAlert(true);
        setwarnAlert(2);
        settextAlert("Please Match the Password ????");
      } else {
        setshowLoader(true)
        linkotp.Otpreq({
          email: mail,
        }).then((req) => {
          setshowLoader(false)
          if (req.data === undefined || !req.data.success) {
            setshowAlert(true);
            setwarnAlert(2);
            settextAlert("Some server error please try later ????");
          }
          else {
            console.log("run");
            setotptoken(req.data.authtoken);
            setshowotp(true)
            // setshowtoggle(true)
          }
        })
      }
    }
  }

  // request to backend
  if (otp.length === 6) {
    lol()
  }
  async function lol() {
    console.log("otp");
    if (otptoken.length !== 0 && otp.length === 6) {
      let a
      if (data.type === "aup") {
        a = await link.Signup({
          email: mail,
          password: pass,
          name: `${fname} ${lname}`,
          otp: otp,
          auth: otptoken
        })
        setotp("")
      } else {
        a = await link1.Signup({
          email: mail,
          password: pass,
          name: `${fname} ${lname}`,
          otp: otp,
          auth: otptoken
        })
      }

      if (a.data.success) {
        setshowAlert(true);
        setwarnAlert(3);
        settextAlert("Done, Now Login ????");
        setTimeout(() => {
          navigate("/field")
        }, 4000);
      }
      else {
        setotp("")
        setshowotploading(false)
        setshowAlert(true);
        setwarnAlert(2);
        settextAlert((a.data.error) ? a.data.error : "Some Internal error Please try later", "????");
      }
    }
  }

  return (
    <>
      <div data-aos="zoom-out">
        <div className="row center">
          <center>
            <h2>{show}</h2>
            <h2>Sign UP</h2>
          </center>
          <form>
            <div className="mb-3 ">
              <div
                className="center"
                style={{ justifyContent: "space-between" }}
              >
                <div className="input1">
                  <input
                    type="text"
                    className="form-control input"
                    value={fname}
                    onChange={(e) => chkfname(e.target.value)}
                    maxLength="10"
                    style={{ width: "95%" }}
                    required
                  />
                  <div className="inputDes">First Name</div>
                </div>
                <div className="input1">
                  <input
                    type="text"
                    className="form-control input"
                    value={lname}
                    onChange={(e) => chklname(e.target.value)}
                    maxLength="10"
                    style={{ width: "95%" }}
                    required
                  />
                  <div className="inputDes">Last Name</div>
                </div>
              </div>
            </div>
            <div className="mb-3 input1">
              <input
                type="email"
                className="form-control input"
                onChange={(e) => setMail(e.target.value)}
                aria-describedby="emailHelp"
                value={mail}
                required
              />
              <div className="inputDes">Email-id</div>
            </div>
            <div id="emailHelp" className="form-text">
              {showmail}
            </div>
            <div className="mb-3 pass input1">
              <input
                type="password"
                className="form-control input"
                id="password"
                onChange={(e) => passcheckcall(e.target.value)}
                value={pass}
                required
              />
              <div className="inputDes">Password</div>
              <i
                className="far fa-eye"
                id="showpass"
                onClick={(e) => showCall(e.target)}
              ></i>
            </div>
            <div className="mb-3 pass input1">
              <input
                type="password"
                className="form-control input"
                onChange={(e) => conpasscheckcall(e.target.value)}
                value={conPass}
                required
              />
              <div className="inputDes">Re-Enter Password</div>
              <i
                className="far fa-eye"
                id="showpass"
                onClick={(e) => showCall(e.target)}
              ></i>
            </div>
            <div id="passmsg">
              <h4 className="passmsg">
                <i className="fas fa-times"></i> Enter Atleast{" "}
                <strong>8</strong> digit
              </h4>
              <h4 className="passmsg">
                <i className="fas fa-times"></i> Enter <strong>number</strong>{" "}
                also
              </h4>
              <h4 className="passmsg">
                <i className="fas fa-times"></i> Enter <strong>capital</strong>{" "}
                letter
              </h4>
              <h4 className="passmsg">
                <i className="fas fa-times"></i> Enter <strong>small</strong>{" "}
                letter
              </h4>
              <h4 className="passmsg">
                <i className="fas fa-times"></i> Use <strong>Symbol</strong>
              </h4>
              <h4 id="passmach" className="passmsg">
                <i className="fas fa-times"></i> Password not{" "}
                <strong>matched</strong>
              </h4>
            </div>
            <button type="button" className="button" onClick={() => sub()}>
              Submit
            </button>
            <p onClick={() => navigate("/field")}>
              Already have an acccount? <span>Sign IN</span>
            </p>
          </form>
        </div>
      </div>
      {/* alert */}
      <Alert
        show={showAlert}
        setShow={setshowAlert}
        text={textAlert}
        warn={warnAlert}
      />
      {/* loader */}
      <Loader show={showLoader} />
      {/* otp */}
      <Otp
        show={showotp}
        // toggle={showtoggle} 
        setshow={setshowotp}
        setotp={setotp}
        otp={otp}
        loading={showotploading}
        setloading={setshowotploading}
      />
    </>
  );

}
