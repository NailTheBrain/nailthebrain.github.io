import React from 'react';
import { passCheck, showCall } from "./passCheck";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./bstyle.css";
import Alert from "../alert";
import link from "../../link/user"
import link1 from "../../link/devuser"


export default function Signin() {
  const navigate = useNavigate();
  let data = useLocation().state;
  let show;
  let showmail;


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
    if (data === null) navigate("/field")
  }, []);
  data.type === "ain" ? (show = "Academics") : (show = "Development");
  data.type === "ain"
    ? (showmail = "Please enter student mail id")
    : (showmail = "We'll never share your email with anyone.");

  // Alert start
  const [showAlert, setshowAlert] = useState(false);
  const [textAlert, settextAlert] = useState("");
  const [warnAlert, setwarnAlert] = useState();
  function alrt(a, b) {
    setshowAlert(true);
    setwarnAlert(a)
    settextAlert(b);
  }
  // Alert end

  const [password, setPassword] = useState(false);
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");

  function passcheckcall(e) {
    let chk = passCheck(e);
    chk
      ? (document.querySelector("#passmsg").style.display = "none")
      : (document.querySelector("#passmsg").style.display = "block");
    setPassword(chk);
    setPass(e);
  }
  
// last submition check

  async function sub() {
    if (data.type === "ain" && mail.split("@")[1] !== "miet.ac.in") {
      alrt(1,"Please enter valid student mail id 😕");
      setMail("");
    } else if (!mail.match(/[^A-z0-9]/)) {
      alrt(1,"Please enter valid mail id 😕");
    } else if (!password) {
      alrt(2,"Please enter Password with right validation 😕");
    } else {
      let a
      if (data.type === "ain") {
        a = await link.Login({
          email: mail,
          password: pass
        })
      }else{
        a = await link1.Login({
          email: mail,
          password: pass
        })
      }

      if (a.data.success) {
        alrt(3,"Done 👌");
        setTimeout(() => {
          navigate("/academics")
        }, 2000);
      }
      else {
        alrt(2,a.data.error, "😕");
      }

    }
  }

  return (
    <>
      <div className="row center" data-aos="zoom-out">
        <center>
          <h2>{show}</h2>
          <h2> Sign IN</h2>
        </center>
        <form>
          <div className="mb-3 input1">
            <input
              type="email"
              className="form-control input"
              aria-describedby="emailHelp"
              value={mail}
              onChange={(e) => setMail(e.target.value)}
            />
            <div className="inputDes">Mail-Id</div>
          </div>
          <div id="emailHelp" className="form-text">
            {showmail}
          </div>
          <div className="mb-3 pass input1">
            <input
              type="password"
              className="form-control input"
              onChange={(e) => passcheckcall(e.target.value)}
              value={pass}
            />
            <div className="inputDes">Password</div>
            <i
              className="far fa-eye"
              id="showpass"
              onClick={(e) => showCall(e.target)}
            ></i>
          </div>
          <div id="passmsg">
            <h4 className="passmsg">
              <i className="fas fa-times"></i> Enter Atleast <strong>8</strong>{" "}
              digit
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
          <p onClick={() => navigate("/fields")}>
            Already have an acccount? <span>Sign UP</span>
          </p>
        </form>
      </div>
      <Alert
        show={showAlert}
        setShow={setshowAlert}
        text={textAlert}
        warn={warnAlert}
      />
    </>
  );
}
