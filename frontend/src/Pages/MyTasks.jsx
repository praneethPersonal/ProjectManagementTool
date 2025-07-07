import React, { useState } from "react";
import {
  FormContainer, Heading, Label, Input, Textarea, Select, Button,
  CommentList, CommentItem
} from "./MyTasks.styles";
import { useGetTeamAndManager } from "../hooks/GetUsers"; // Import your hook
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const statuses = [
  { value: "Todo", label: "Todo" },
  { value: "InProgress", label: "In Progress" },
  { value: "CodeReview", label: "Code Review" },
  { value: "Completed", label: "Completed" }
];

const CreateTask = () => {
  const userRole = localStorage.getItem("role")
  const userId = localStorage.getItem("userId");
  const managerId = (userRole === "employee") ? localStorage.getItem("manager") : userId;
  const { teamMembers, isLoading, error } = useGetTeamAndManager(managerId);

  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "Todo",
    assignee: userId || "",
    comments: [],
    commentInput: "",
    reporter: userId || ""
  });

  // Mutation for creating a task
  const createTaskMutation = useMutation({
    mutationFn: async (taskData) => {
      const { data } = await axios.post("http://localhost:5154/task", taskData);
      return data;
    },
    onSuccess: () => {
      setForm({
        title: "",
        description: "",
        status: "Todo",
        assignee: userId || "",
        comments: [],
        commentInput: "",
        reporter: userId || ""
      })
    },
    onError: () => {
      alert("Failed to create task.");
    }
  });

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
  };

  const handleAddComment = () => {
    if (!form.commentInput.trim()) return;
    setForm({
      ...form,
      comments: [...form.comments, form.commentInput.trim()],
      commentInput: ""
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    createTaskMutation.mutate({
      manager_id: managerId,
      reporter: userId,
      assignee: form.assignee || userId,
      status: form.status,
      description: form.description,
      title: form.title,
      comments: form.comments
    });
  };

  return (
    <FormContainer as="form" onSubmit={handleSubmit}>
      <Heading>Create New Task</Heading>
      <Label>Title</Label>
      <Input
        value={form.title}
        onChange={handleChange("title")}
        placeholder="Enter task title"
        required
      />
      <Label>Description</Label>
      <Textarea
        value={form.description}
        onChange={handleChange("description")}
        placeholder="Enter task description"
      />
      <Label>Status</Label>
      <Select value={form.status} onChange={handleChange("status")}>
        {statuses.map((s) => (
          <option key={s.value} value={s.value}>{s.label}</option>
        ))}
      </Select>
      <Label>Assignee</Label>
      <Select value={form.assignee} onChange={handleChange("assignee")} required>
        <option value="">Select assignee</option>
        {isLoading ? (
          <option disabled>Loading...</option>
        ) : error ? (
          <option disabled>Error loading users</option>
        ) : (
          teamMembers.map((a) => (
            <option key={a.id} value={a.id}>{a.name}</option>
          ))
        )}
      </Select>
      <Label>Comments</Label>
      <CommentList>
        {form.comments.map((c, idx) => (
          <CommentItem key={idx}>{c}</CommentItem>
        ))}
      </CommentList>
      <div style={{ display: "flex", gap: 8 }}>
        <Input
          style={{ flex: 1, marginBottom: 0 }}
          value={form.commentInput}
          onChange={handleChange("commentInput")}
          placeholder="Add a comment"
        />
        <Button type="button" style={{ padding: "0 18px" }} onClick={handleAddComment}>
          Add
        </Button>
      </div>
      <Button type="submit" disabled={createTaskMutation.isLoading}>
        {createTaskMutation.isLoading ? "Creating..." : "Create Task"}
      </Button>
    </FormContainer>
  );
};

export default CreateTask;
