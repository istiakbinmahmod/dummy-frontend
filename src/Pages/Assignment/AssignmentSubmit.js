import React, { useContext, useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import Icon from "@material-ui/core/Icon";
// import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import { Redirect, Link, useParams } from "react-router-dom";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
import { useHttpClient } from "../../Hooks/http-hook";
import Rest__img from "../../img/restaurant.jpg";
import RestCard from "../../Components/RestCard/RestCard";
import { FaArrowRight } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Styles.css";
import logo from "../../img/Moodle-Logo.wine.png";
import fileLogo from "../../img/pdf-24.png";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import FileUpload from "../../shared/components/FormElements/FileUpload";
import { useForm } from "../../shared/hooks/form-hook";

// let courseName;

const useStyles = makeStyles((theme) => ({
  root: theme.mixins.gutters({
    maxWidth: 600,
    margin: "auto",
    padding: theme.spacing(3),
    marginTop: theme.spacing(12),
  }),
  title: {
    margin: `${theme.spacing(3)}px 0 ${theme.spacing(3)}px ${theme.spacing(
      1
    )}px`,
    color: theme.palette.protectedTitle,
    fontSize: "1.2em",
  },
  addButton: {
    float: "right",
  },
  leftIcon: {
    marginRight: "8px",
  },
  avatar: {
    borderRadius: 0,
    width: 65,
    height: 40,
  },
  listText: {
    marginLeft: 16,
  },
  marginTop: {},
}));

export default function AssignmentSubmit() {
  const auth = useContext(AuthContext);
  const classes = useStyles();
  const courseID = useParams().courseID;
  const assignmentID = useParams().assignmentID;

  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedCourse, setLoadedCourse] = useState();
  const [loadedAssignment, setLoadedAssignment] = useState();
  const [loadedSubmission, setLoadedSubmissions] = useState([]);

  const navigate = useNavigate();
  const getToken = localStorage.getItem("token");

  let url = "http://localhost:5000/api/courses/" + courseID;

  const [formState, inputHandler] = useForm(
    {
      file: {
        value: null,
        isValid: false,
      },
    },
    false
  );

  const uploadAssignment = async (event) => {
    event.preventDefault();
    let assignment_name;
    let description;
    let activity_instruction;
    let assignment_file;
    let due_date;
    let cutoff_time;

    if (document.getElementById("assignment_name").value !== "") {
      assignment_name = document.getElementById("assignment_name").value;
    }
    if (document.getElementById("description").value !== "") {
      description = document.getElementById("description").value;
    }
    if (document.getElementById("activity_instruction").value !== "") {
      activity_instruction = document.getElementById(
        "activity_instruction"
      ).value;
    }
    // if (document.getElementById("assignment_file").value !== "") {
    assignment_file = document.getElementById("assignment_file").files[0];
    // assignment_file = event.target.file[0].value;
    // }
    if (document.getElementById("due_date").value !== "") {
      due_date = document.getElementById("due_date").value;
    }
    if (document.getElementById("cutoff_time").value !== "") {
      cutoff_time = document.getElementById("cutoff_time").value;
    }
    console.log("yo yo");
    alert(
      // assignment_name +
      assignment_file.value
      //   description +
      //   activity_instruction +
      //   assignment_file +
      //   due_date +
      //   cutoff_time
    );
    try {
      let url;
      url =
        "http://localhost:5000/api/teachers/upload-course-assignment/" +
        courseID;
      const formData = new FormData();

      // formData.append("file", assignment_file);
      formData.append("file", assignment_file);
      formData.append("title", assignment_name);
      formData.append("description", description);
      formData.append("activity_instruction", activity_instruction);
      formData.append("dueDate", due_date);
      formData.append("cutOffDate", cutoff_time);

      console.log(formData);
      await sendRequest(url, "POST", formData, {
        Authorization: "Bearer " + auth.token,
      });
      alert("file sent");
      // navigate("/");
    } catch (error) {
      alert("file not sent");
    }
  };

  return (
    <>
      <body class="d-flex flex-column justify-content-center">
        <section class="d-flex flex-column justify-content-between">
          <nav class="navbar navbar-dark navbar-expand-md fixed-top bg-dark py-3">
            <div class="container">
              <img id="logo" src="assets/img/Moodle-Logo.wine.png" />
              <a class="navbar-brand d-flex align-items-center" href="#">
                <span>BUET CSE</span>
              </a>
              <button
                data-bs-toggle="collapse"
                class="navbar-toggler"
                data-bs-target="#navcol-5"
              >
                <span class="visually-hidden">Toggle navigation</span>
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navcol-5">
                <ul class="navbar-nav ms-auto">
                  <li class="nav-item">
                    <a class="nav-link active" href="courses.html">
                      Courses
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="submission.html">
                      Sessions
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="login.html">
                      Log In
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          <div
            class="text-end text-sm-start text-lg-end d-flex flex-column justify-content-between"
            id="courseteacher"
          >
            <p id="ctp">My courses &gt; CSE 408</p>
            <div class="container">
              <h1 class="display-5 fw-bold" id="cth">
                CSE 408:Software Engineering
              </h1>
              <nav class="navbar navbar-light navbar-expand-md" id="ctn">
                <div class="container-fluid">
                  <button
                    data-bs-toggle="collapse"
                    class="navbar-toggler"
                    data-bs-target="#navcol-1"
                  >
                    <span class="visually-hidden">Toggle navigation</span>
                    <span class="navbar-toggler-icon"></span>
                  </button>
                  <div class="collapse navbar-collapse" id="navcol-1">
                    <ul class="navbar-nav">
                      <li class="nav-item">
                        <a class="nav-link active" href="#">
                          Course
                        </a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" href="#">
                          Settings
                        </a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" href="#">
                          Participants
                        </a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" href="#">
                          Grades
                        </a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" href="#">
                          Forum
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>
              <p id="csp">Adding a new assignment or assessment</p>
              <form encType={"multipart/form-data"}>
                <div className="form-group">
                  {/* <label htmlFor="assignment_name">Assignment Name</label> */}
                  <input
                    type="text"
                    className="form-control"
                    id="assignment_name"
                    aria-describedby="assignment_name"
                    placeholder="Assignment Name"
                    name="assignment_name"
                    // defaultValue={auction.product_name}
                  />
                </div>
                <div className="form-group">
                  {/* <label htmlFor="description">Description*</label> */}
                  <input
                    type="text"
                    className="form-control"
                    id="description"
                    aria-describedby="description"
                    placeholder="Description"
                    name="description"
                    // defaultValue={auction.product_description}
                  />
                </div>
                <div className="form-group">
                  {/* <label htmlFor="activity_instruction">
                    Activity Instruction
                  </label> */}
                  <input
                    type="text"
                    className="form-control"
                    id="activity_instruction"
                    aria-describedby="activity_instruction"
                    placeholder="activity_instruction"
                    name="activity_instruction"
                    // defaultValue={auction.minimum_price}
                  />
                </div>
                <div className="form-group">
                  {/* <label htmlFor="file">File</label> */}
                  <input
                    type="file"
                    className="form-control"
                    id="assignment_file"
                    aria-describedby="assignment_file"
                    placeholder="assignment_file"
                    name="assignment_file"
                    // defaultValue={auction.address}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="due_date">Due Date</label>
                  <input
                    type="datetime-local"
                    className="form-control"
                    id="due_date"
                    aria-describedby="due_date"
                    placeholder="due_date"
                    name="due_date"
                    // defaultValue={auction.tags}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="cutoff_time">Cutoff Time</label>
                  <input
                    type="datetime-local"
                    className="form-control"
                    id="cutoff_time"
                    aria-describedby="cutoff_time"
                    placeholder="cutoff_time"
                    name="cutoff_time"
                    // defaultValue={auction.tags}
                  />
                </div>

                <div className="d-grid gap-2 col-6 mx-auto text-container">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={uploadAssignment}
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
        <script src="assets/bootstrap/js/bootstrap.min.js"></script>
        <script src="assets/js/bs-init.js"></script>
      </body>
    </>
  );
}
