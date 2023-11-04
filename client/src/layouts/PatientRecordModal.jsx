import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactDOM from "react-dom";
import "../styles/PatientRecordModal.css";

export default function PatientRecordModal({
  isOpen,
  onRequestClose,
  employeeIdFromAPI,
}) {
  const [name, setName] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [status, setStatus] = useState("");
  const [admissiondate, setadmissiondate] = useState("");
  const [error, setError] = useState("");
  const [employeeData, setEmployeeData] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/employees/profile/${employeeIdFromAPI}`)
      .then((response) => {
        const employeeData = response.data;
        setEmployeeData(employeeData);
      })
      .catch((error) => {
        console.error("Error fetching employee data", error);
      });
  }, [employeeIdFromAPI]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "name") {
      setName(value);
    } else if (name === "diagnosis") {
      setDiagnosis(value);
    } else if (name === "status") {
      setStatus(value);
    } else if (name === "admissiondate") {
      setadmissiondate(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     const response = await axios.post(`http://localhost:3000/api/patientrecords`, {
       name,
       diagnosis,
       status,
       admissiondate,
       employeeId: employeeIdFromAPI,
     });


      console.log("Patient record created:", response.data);
      onRequestClose();

    } catch (err) {
      setError("Error creating patient record");
      console.error(err);
    }
  };
  console.log("Employee Data: ", employeeData);



  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal">
      <div className="modal-content">
        <h1 className="modal-title">
          Запис на прийом до <span className="employeeName">{employeeData.name}</span>
        </h1>

        <hr />
        <button className="close-btn" onClick={onRequestClose}>
          x
        </button>
        <div className="form-container">
          <div className="form-row">
            <label>ПІБ пацієнта:</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-row talab">
            <label>Діагноз:</label>
            <textarea
              name="diagnosis"
              value={diagnosis}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-row">
            <label>Статус:</label>
            <input
              type="text"
              name="status"
              value={status}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-row">
            <label>Бажана дата:</label>
            <input
              type="date"
              name="admissiondate"
              value={admissiondate}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        {error && <p className="error-message">{error}</p>}
        <div className="btn-container">
          <button className="cancel-btn" onClick={onRequestClose}>
            Скасувати
          </button>
          <button className="save-btn" onClick={handleSubmit}>
            Записатись
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
