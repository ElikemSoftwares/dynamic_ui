import React, { useState } from "react";
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Select } from "./components/ui/select";
import { Textarea } from "./components/ui/textarea";

export default function DynamicUI() {
  const [templates, setTemplates] = useState([]);
  const [trackers, setTrackers] = useState([]);
  const [charts, setCharts] = useState([]);
  const [dashboards, setDashboards] = useState([]);

  // Handlers
  const addTemplate = () => {
    const newTemplate = { id: templates.length + 1, name: "New Template", code: "<div>Example</div>" };
    setTemplates([...templates, newTemplate]);
  };

  const addTracker = () => {
    const newTracker = { id: trackers.length + 1, name: "New Tracker" };
    setTrackers([...trackers, newTracker]);
  };

  const addChart = () => {
    const newChart = { id: charts.length + 1, name: "New Chart" };
    setCharts([...charts, newChart]);
  };

  const addDashboard = () => {
    const newDashboard = { id: dashboards.length + 1, name: "New Dashboard" };
    setDashboards([...dashboards, newDashboard]);
  };

  return (
    <div className="p-6 space-y-6">
      {/* HTML Template Management */}
      <Card>
        <CardContent>
          <h2 className="text-xl font-semibold mb-4">HTML Template Management</h2>
          <Input placeholder="Template Name" className="mb-2" />
          <Textarea placeholder="HTML Code" className="mb-2" />
          <Button onClick={addTemplate}>Add Template</Button>
        </CardContent>
      </Card>

      {/* Tracker Management */}
      <Card>
        <CardContent>
          <h2 className="text-xl font-semibold mb-4">Tracker Management</h2>
          <Input placeholder="Tracker Name" className="mb-2" />
          <Select className="mb-2">
            <option>Select Template</option>
            {templates.map((template) => (
              <option key={template.id}>{template.name}</option>
            ))}
          </Select>
          <Input placeholder="Script Name" className="mb-2" />
          <Input placeholder="Output Duration (days)" className="mb-2" type="number" />
          <Button onClick={addTracker}>Add Tracker</Button>
        </CardContent>
      </Card>

      {/* Chart Management */}
      <Card>
        <CardContent>
          <h2 className="text-xl font-semibold mb-4">Chart Management</h2>
          <Input placeholder="Chart Name" className="mb-2" />
          <Input placeholder="Dataset" className="mb-2" />
          <Button onClick={addChart}>Add Chart</Button>
        </CardContent>
      </Card>

      {/* Dashboard Management */}
      <Card>
        <CardContent>
          <h2 className="text-xl font-semibold mb-4">Dashboard Management</h2>
          <Input placeholder="Dashboard Name" className="mb-2" />
          <Select className="mb-2">
            <option>Select Chart</option>
            {charts.map((chart) => (
              <option key={chart.id}>{chart.name}</option>
            ))}
          </Select>
          <Button onClick={addDashboard}>Create Dashboard</Button>
        </CardContent>
      </Card>
    </div>
  );
}
