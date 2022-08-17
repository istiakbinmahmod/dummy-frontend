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
  let url2 =
    "http://localhost:5000/api/students/get-course-assignment/" + assignmentID;

  let url3 =
    "http://localhost:5000/api/students/upload-submission/" + assignmentID;

  let url4 =
    "http://localhost:5000/api/students/get-submission/" + assignmentID;

  const [formState, inputHandler] = useForm(
    {
      file: {
        value: null,
        isValid: false,
      },
    },
    false
  );

  return (
    <>
      <div
        className="text-end text-sm-start text-lg-end d-flex flex-column justify-content-between"
        id="courseteacher"
      >
        <p id="ctp">My courses &gt; CSE 408</p>
        <div className="container">
          <h1 className="display-5 fw-bold" id="cth">
            CSE 408:Software Engineering
          </h1>
          <nav className="navbar navbar-light navbar-expand-md" id="ctn">
            <div className="container-fluid">
              <button
                data-bs-toggle="collapse"
                className="navbar-toggler"
                data-bs-target="#navcol-1"
              >
                <span className="visually-hidden">Toggle navigation</span>
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navcol-1">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <a className="nav-link active" href="#">
                      Course
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Settings
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Participants
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Grades
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Forum
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          <p id="csp">Adding a new assignment or assessment</p>
          <div className="row" id="csr">
            <div className="col" id="csr">
              <p id="csp1">Assignment Name:</p>
              <textarea id="cspt2"></textarea>
            </div>
          </div>
          <div className="row" id="cspr">
            <div className="col" id="cspr">
              <p id="csp1">Description:</p>
              <textarea id="cspt2"></textarea>
            </div>
          </div>
          <div className="row">
            <div className="col" id="csc">
              <p id="csp1">Activity Instructions:</p>
              <textarea id="cspt2"></textarea>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <p id="csp1">Upload file:</p>
              <div className="col">
                <div className="row" id="fsrow">
                  <div className="col" id="fcol">
                    <img
                      src="assets/img/add_file.svg"
                      id="fcim"
                      width="16"
                      height="16"
                    />
                  </div>
                </div>
                <div className="row" id="fsrow2">
                  <div className="col" id="fscol2">
                    <i
                      className="fas fa-file-upload"
                      data-bss-hover-animate="bounce"
                      id="fi"
                    ></i>
                  </div>
                </div>
              </div>
              <div className="row" id="tsr3">
                <div className="col">
                  <p id="tsp">Time Management:</p>
                  <div className="row ms-lg-5" id="ts">
                    <div className="col-md-2">
                      <p id="tsp2">Due Date:</p>
                    </div>
                    <div className="col" id="tsc3">
                      <input type="date" is="tsd" className="mb-lg-4 ms-lg-5" />
                    </div>
                  </div>
                  <div className="row ms-lg-5" id="ts2">
                    <div className="col-md-2" id="ts3">
                      <p id="tsp3">Cut off Date:</p>
                    </div>
                    <div className="col" id="tsc3">
                      <input type="date" id="tsd" className="mb-lg-4 ms-lg-5" />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col" id="tsc4">
                    <button className="btn btn-primary" type="button" id="tsb">
                      Save Changes
                    </button>
                    <button className="btn btn-primary" type="button" id="tsb2">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
