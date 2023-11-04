// Import necessary modules
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/EmployeeConstructor.css";

export default function EmployeeConstructor() {
  const [workers, setWorkers] = useState([]);
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [rank, setRank] = useState("");
  const [contactinformation, setContactInformation] = useState("");
  const [selectedWorker, setSelectedWorker] = useState(null);

  useEffect(() => {
    fetchWorkers();
  }, []);

  const fetchWorkers = () => {
    axios
      .get("http://localhost:3000/api/employees")
      .then((response) => {
        console.log(response.data);
        setWorkers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching workers: ", error);
      });
  };

  const handleAddWorker = () => {
    // Create a new worker object
    const newWorker = {
      name,
      position,
      rank,
      contactinformation,
    };

    axios
      .post("http://localhost:3000/api/employees", newWorker)
      .then(() => {
        // After adding, refresh the worker list and reset input fields
        fetchWorkers();
        setName("");
        setPosition("");
        setRank("");
        setContactInformation("");
      })
      .catch((error) => {
        console.error("Error adding worker: ", error);
      });
  };

  const handleEditWorker = async () => {
    if (selectedWorker && selectedWorker.emploeeId) {
      const updatedWorker = {
        emploeeId: selectedWorker.emploeeId,
        name,
        position,
        rank,
        contactinformation,
      };

      await axios
        .put(
          `http://localhost:3000/api/employees/${selectedWorker.emploeeId}`,
          updatedWorker
        )
        .then(() => {
          fetchWorkers();
          setSelectedWorker(null);
          setName("");
          setPosition("");
          setRank("");
          setContactInformation("");
        })
        .catch((error) => {
          console.error("Error updating worker: ", error);
        });
    } else {
      console.error(
        "Selected worker or its ID is missing. Please select a worker to edit."
      );
    }
  };

  const handleDeleteWorker = (id) => {
   console.log(id);
   if (id) {
     // Check if the ID is defined
     axios
       .delete(`http://localhost:3000/api/employees/${id}`)
       .then(() => {
         fetchWorkers();
       })
       .catch((error) => {
         console.error("Error deleting worker: ", error);
       });
   } else {
     console.error("ID is missing. Unable to delete the worker.");
   }
 };

  // Function to handle worker selection
  const selectWorker = (worker) => {
    setSelectedWorker(worker);
    setName(worker.name);
    setPosition(worker.position);
    setRank(worker.rank);
    setContactInformation(worker.contactinformation);
  };

  return (
    <div className="worker-constructor">
      <div className="worker-list">
        <h2>Workers</h2>
        <ul>
          {workers.map((worker, index) => (
            <li key={worker.emploeeId || index}>
              {worker.name} - {worker.position}
              <button onClick={() => selectWorker(worker)}>Edit</button>
              <button onClick={() => handleDeleteWorker(worker.emploeeId)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="worker-form">
        <h2>Add/Edit Worker</h2>
        <input
          type="text"
          className="input-field"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          className="input-field"
          placeholder="Position"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        />
        <input
          type="text"
          className="input-field"
          placeholder="Rank"
          value={rank}
          onChange={(e) => setRank(e.target.value)}
        />
        <input
          type="text"
          className="input-field"
          placeholder="Contact Info"
          value={contactinformation}
          onChange={(e) => setContactInformation(e.target.value)}
        />
        {selectedWorker ? (
          <button className="action-button" onClick={handleEditWorker}>
            Save
          </button>
        ) : (
          <button className="action-button" onClick={handleAddWorker}>
            Add
          </button>
        )}
      </div>
    </div>
  );
}
