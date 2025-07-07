import React, { useRef, useState } from 'react';
import { useGetTeamAndManager } from '../hooks/GetUsers';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import {
  Overlay, ModalBox, LeftSection, RightSection, CloseIcon,
  Comment, SidebarLabel, SidebarSelect, CommentInputRow, CommentInput, CommentButton
} from "./TaskModal.styles.js";

const TaskModal = ({ task, onClose }) => {
  const userRole = localStorage.getItem("role")
  const userId = localStorage.getItem("userId")
  const managerId = (userRole !== "manager") ? localStorage.getItem('manager') : userId;
  const { teamMembers } = useGetTeamAndManager(managerId);

  // Single state for all editable fields
  const [editTask, setEditTask] = useState({
    title: task.title,
    description: task.description,
    status: task.status,
    assignee: task.assignee,
    comments: task.comments || [],
  });
  const [newComment, setNewComment] = useState('');
  const modalRef = useRef();

  // Mutation for updating the task
  const updateTaskMutation = useMutation({
    mutationFn: async (updatedTask) => {
      const { data } = await axios.put(
        `http://localhost:5154/task/${task.id}`,
        updatedTask
      );
      return data;
    },
    onSuccess: () => {
      setNewComment('');
    }
  });

  // Handlers for inline editing
  const handleFieldChange = (field) => (e) => {
    const value = e.target.value;
    setEditTask(prev => ({ ...prev, [field]: value }));
    // Update backend immediately for status/assignee/title/description
    if (['status', 'assignee', 'title', 'description'].includes(field)) {
      updateTaskMutation.mutate({ ...editTask, [field]: value });
    }
  };

  // Add a new comment
  const handleAddComment = () => {
    if (!newComment.trim()) return;
    const updatedComments = [...editTask.comments, newComment.trim()];
    setEditTask(prev => ({ ...prev, comments: updatedComments }));
    updateTaskMutation.mutate({ ...editTask, comments: updatedComments });
    setNewComment('');
  };

  // Close when clicking outside modal
  const handleOverlayClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  return (
    <Overlay onClick={handleOverlayClick}>
      <ModalBox ref={modalRef}>
        <CloseIcon onClick={onClose} title="Close">&times;</CloseIcon>
        <LeftSection>
          <h2>Task Details</h2>
        <input
        style={{
            fontSize: '1.25rem',
            fontWeight: 600,
            border: 'none',
            background: 'transparent',
            outline: 'none',
            marginBottom: 12,
            width: '100%',
        }}
        value={editTask.title}
        onChange={handleFieldChange('title')}
        placeholder="Title"
        />
        <div style={{ margin: "18px 0 0 0", width: '100%' }}>
        <div style={{ fontWeight: 500 }}>Description:</div>
        <textarea
            style={{
            marginTop: 4,
            width: '100%',
            minHeight: 60,
            borderRadius: 6,
            border: '1px solid #eee',
            padding: 8,
            fontSize: '1rem',
            resize: 'vertical',
            outline: 'none'
            }}
            value={editTask.description}
            onChange={handleFieldChange('description')}
            placeholder="Description"
        />
        </div>
          <h4 style={{ marginTop: 28 }}>Comments</h4>
          {editTask.comments.map((c, idx) => (
            <Comment key={idx}>{c}</Comment>
          ))}
          <CommentInputRow>
            <CommentInput
              type="text"
              value={newComment}
              onChange={e => setNewComment(e.target.value)}
              placeholder="Add a comment"
            />
            <CommentButton
              onClick={handleAddComment}
              disabled={updateTaskMutation.isLoading}
            >
              Add
            </CommentButton>
          </CommentInputRow>
        </LeftSection>
        <RightSection>
          <SidebarLabel>Status</SidebarLabel>
          <SidebarSelect value={editTask.status} onChange={handleFieldChange('status')}>
            <option value="Todo">Todo</option>
            <option value="InProgress">In Progress</option>
            <option value="CodeReview">Code Review</option>
            <option value="Completed">Completed</option>
          </SidebarSelect>
          <SidebarLabel>Assignee</SidebarLabel>
          <SidebarSelect value={editTask.assignee} onChange={handleFieldChange('assignee')}>
            {teamMembers.map((emp) => (
              <option key={emp.id} value={emp.id}>{emp.name}</option>
            ))}
          </SidebarSelect>
        </RightSection>
      </ModalBox>
    </Overlay>
  );
};

export default TaskModal;