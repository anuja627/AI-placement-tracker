import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {

  const [jobs, setJobs] = useState([]);

  const [form, setForm] = useState({
    company: "",
    role: "",
    location: "",
    package: "",
    status: "Applied",
    deadline: ""
  });

  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
const [filterStatus, setFilterStatus] = useState("All");
  // Dashboard statistics
const totalJobs = jobs.length;

const appliedJobs = jobs.filter(
  (job) => job.status === "Applied"
).length;

const interviewJobs = jobs.filter(
  (job) => job.status === "Interview"
).length;

const selectedJobs = jobs.filter(
  (job) => job.status === "Selected"
).length;

const rejectedJobs = jobs.filter(
  (job) => job.status === "Rejected"
).length;

// Search and filter jobs
const filteredJobs = jobs.filter((job) => {

  const searchText = search.toLowerCase();

  const matchesSearch =
    job.company.toLowerCase().includes(searchText) ||
    job.role.toLowerCase().includes(searchText) ||
    (job.location || "").toLowerCase().includes(searchText);

  const matchesStatus =
    filterStatus === "All" ||
    job.status === filterStatus;

  return matchesSearch && matchesStatus;

});


  // Get all jobs
  const fetchJobs = async () => {

    try {

      const response = await axios.get(
        "http://localhost:5000/api/jobs"
      );

      setJobs(response.data);

    } catch (error) {

      console.error("Error fetching jobs:", error);

    }

  };


  useEffect(() => {
    fetchJobs();
  }, []);


  // Handle form input
  const handleChange = (event) => {

    setForm({
      ...form,
      [event.target.name]: event.target.value
    });

  };


  // Add or Update job
  const handleSubmit = async (event) => {

    event.preventDefault();

    try {

      if (editingId) {

        // UPDATE
        await axios.put(
          `http://localhost:5000/api/jobs/${editingId}`,
          form
        );

        alert("Job updated successfully!");

      } else {

        // CREATE
        await axios.post(
          "http://localhost:5000/api/jobs",
          {
            ...form,
            user_id: 1
          }
        );

        alert("Job added successfully!");

      }


      // Reset form
      setForm({
        company: "",
        role: "",
        location: "",
        package: "",
        status: "Applied",
        deadline: ""
      });

      setEditingId(null);

      fetchJobs();

    } catch (error) {

      console.error("Error:", error);

      alert("Operation failed!");

    }

  };


  // Start editing
  const editJob = (job) => {

    setEditingId(job.id);

    setForm({
      company: job.company || "",
      role: job.role || "",
      location: job.location || "",
      package: job.package || "",
      status: job.status || "Applied",
      deadline: job.deadline
        ? String(job.deadline).substring(0, 10)
        : ""
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  };


  // Cancel editing
  const cancelEdit = () => {

    setEditingId(null);

    setForm({
      company: "",
      role: "",
      location: "",
      package: "",
      status: "Applied",
      deadline: ""
    });

  };


  // Delete job
  const deleteJob = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?"
    );

    if (!confirmDelete) {
      return;
    }

    try {

      await axios.delete(
        `http://localhost:5000/api/jobs/${id}`
      );

      alert("Job deleted successfully!");

      fetchJobs();

    } catch (error) {

      console.error("Error deleting job:", error);

      alert("Failed to delete job");

    }

  };


  return (

    <div className="app">

      <header>

        <h1>AI Placement Tracker</h1>

        <p>
          Manage your job applications and track your placement journey
        </p>

      </header>
      <header>

  <h1>AI Placement Tracker</h1>

  <p>
    Manage your job applications and track your placement journey
  </p>

</header>

{/* DASHBOARD */}

<section className="dashboard">

  <div className="stat-card">

    <h3>Total Applications</h3>

    <p>{totalJobs}</p>

  </div>


  <div className="stat-card">

    <h3>Applied</h3>

    <p>{appliedJobs}</p>

  </div>


  <div className="stat-card">

    <h3>Interviews</h3>

    <p>{interviewJobs}</p>

  </div>


  <div className="stat-card">

    <h3>Selected</h3>

    <p>{selectedJobs}</p>

  </div>


  <div className="stat-card">

    <h3>Rejected</h3>

    <p>{rejectedJobs}</p>

  </div>

</section>


      {/* FORM */}

      <section className="form-section">

        <h2>
          {editingId
            ? "Edit Job Application"
            : "Add Job Application"}
        </h2>


        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="company"
            placeholder="Company"
            value={form.company}
            onChange={handleChange}
            required
          />


          <input
            type="text"
            name="role"
            placeholder="Job Role"
            value={form.role}
            onChange={handleChange}
            required
          />


          <input
            type="text"
            name="location"
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
          />


          <input
            type="text"
            name="package"
            placeholder="Package"
            value={form.package}
            onChange={handleChange}
          />


          <select
            name="status"
            value={form.status}
            onChange={handleChange}
          >

            <option value="Applied">
              Applied
            </option>

            <option value="Interview">
              Interview
            </option>

            <option value="Selected">
              Selected
            </option>

            <option value="Rejected">
              Rejected
            </option>

          </select>


          <input
            type="date"
            name="deadline"
            value={form.deadline}
            onChange={handleChange}
          />


          <button type="submit">

            {editingId
              ? "Update Job"
              : "Add Job"}

          </button>


          {editingId && (

            <button
              type="button"
              className="cancel-button"
              onClick={cancelEdit}
            >
              Cancel
            </button>

          )}

        </form>

      </section>


      {/* JOB LIST */}

      <section className="jobs-section">

        <h2>My Applications</h2>

        <div className="filters">

  <input
    type="text"
    placeholder="Search company, role or location..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />

  <select
    value={filterStatus}
    onChange={(e) => setFilterStatus(e.target.value)}
  >

    <option value="All">All Status</option>
    <option value="Applied">Applied</option>
    <option value="Interview">Interview</option>
    <option value="Selected">Selected</option>
    <option value="Rejected">Rejected</option>

  </select>

</div>


        {jobs.length === 0 ? (

          <p>No job applications yet.</p>

        ) : (

          <div className="job-grid">

           {filteredJobs.map((job) => (

              <div
                className="job-card"
                key={job.id}
              >

                <h3>
                  {job.company}
                </h3>


                <p>
                  <strong>Role:</strong>{" "}
                  {job.role}
                </p>


                <p>
                  <strong>Location:</strong>{" "}
                  {job.location}
                </p>


                <p>
                  <strong>Package:</strong>{" "}
                  {job.package}
                </p>


                <p>
                  <strong>Status:</strong>{" "}
                  {job.status}
                </p>


                <p>
                  <strong>Deadline:</strong>{" "}
                  {job.deadline
                    ? String(job.deadline).substring(0, 10)
                    : "Not specified"}
                </p>


                <div className="button-group">

                  <button
                    className="edit-button"
                    onClick={() => editJob(job)}
                  >
                    Edit
                  </button>


                  <button
                    className="delete-button"
                    onClick={() => deleteJob(job.id)}
                  >
                    Delete
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </section>

    </div>

  );
}

export default App;