import React, { useState, useMemo } from "react";
import { Table, Form } from "react-bootstrap";
import { FaBoxOpen, FaTruck, FaCheckCircle, FaDollarSign } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "./Dashboard.css"; // Import your custom CSS

const Dashboard = () => {
  // State for leads data
  const [leads, setLeads] = useState([
    { id: 1, Firstname: "", Phone: "", Adress: "", Email: "", leadStatus: "Interested" },
    { id: 2, leadStatus: "New Lead" },
    { id: 3, leadStatus: "Interested" },
    { id: 4, leadStatus: "Interested" },
    { id: 5, leadStatus: "Interested" }
  ]);

  // Function to handle lead status change
  const handleLeadStatusChange = (id, newStatus) => {
    setLeads((prevLeads) =>
      prevLeads.map((lead) =>
        lead.id === id ? { ...lead, leadStatus: newStatus } : lead
      )
    );
  };

  // Dynamically calculate summary data
  const leadsData = useMemo(() => {
    const interested = leads.filter((lead) => lead.leadStatus === "Interested").length;
    const onHold = leads.filter((lead) => lead.leadStatus === "On Hold").length;
    const newLead = leads.filter((lead) => lead.leadStatus === "New Lead").length;
    const totalLeads = leads.length;

    return { interested, onHold, newLead, totalLeads };
  }, [leads]);

  // Get all column keys dynamically (excluding 'id')
  const columnKeys = Object.keys(leads[0]).filter((key) => key !== "id");

  // Reorder columns to ensure 'leadStatus' is always last
  const orderedColumns = [...columnKeys.filter((key) => key !== "leadStatus"), "leadStatus"];

  return (
    <div className="dashboard">
      {/* Summary Cards */}
      <div className="summary">
        <SummaryCard icon={<FaBoxOpen />} label="Interested" count={leadsData.interested} />
        <SummaryCard icon={<FaTruck />} label="On Hold" count={leadsData.onHold} />
        <SummaryCard icon={<FaCheckCircle />} label="New Lead" count={leadsData.newLead} />
        <SummaryCard icon={<FaDollarSign />} label="Total Leads" count={leadsData.totalLeads} />
      </div>

      {/* Leads Table */}
      <div className="table-container">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>SR.No</th>
              {orderedColumns.map((column) => (
                <th key={column}>{column.replace(/([A-Z])/g, " $1").trim()}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {leads.map((lead, index) => (
              <tr key={lead.id}>
                <td>{index + 1}</td>
                {orderedColumns.map((column) => {
                  if (column === "leadStatus") {
                    return (
                      <td key={column}>
                        <Form.Select
                          value={lead.leadStatus}
                          onChange={(e) => handleLeadStatusChange(lead.id, e.target.value)}
                        >
                          <option>Interested</option>
                          <option>On Hold</option>
                          <option>New Lead</option>
                        </Form.Select>
                      </td>
                    );
                  }
                  return <td key={column}>{lead[column]}</td>;
                })}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

// SummaryCard Component
const SummaryCard = ({ icon, label, count }) => (
  <div className="summary-card">
    {icon}
    <p>{label}</p>
    <h4>{count}</h4>
  </div>
);

export default Dashboard;