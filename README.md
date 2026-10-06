# AI Placement Tracker

A full-stack web application designed to help students efficiently manage and track their job applications and placement journey. The platform provides centralized application management, status tracking, interview progress monitoring, deadlines, search, filtering, and placement analytics.

Built using **React.js, Node.js, Express.js, and MySQL**, the application follows a client-server architecture with RESTful APIs and complete CRUD functionality.

---

## 🚀 Features

### 📋 Job Application Management

- Add new job applications
- Edit existing applications
- Delete applications
- Track company name
- Track job role
- Track location
- Track package
- Track application deadline
- Track application status

### 📊 Placement Dashboard

The dashboard provides an overview of the placement journey with:

- Total Applications
- Applied Applications
- Interview Applications
- Selected Applications
- Rejected Applications

### 🔍 Search and Filtering

- Search applications by company
- Search applications by job role
- Search applications by location
- Filter applications by status
- View all applications in one place

### 🔄 RESTful API

The backend provides REST APIs for managing job applications using:

- GET
- POST
- PUT
- DELETE

### 🗄️ MySQL Database

- Relational database architecture
- Persistent application data
- User management
- Job application management
- Structured database design

---

## 🏗️ System Architecture

```text
┌─────────────────────────┐
│      React.js           │
│       Frontend          │
└────────────┬────────────┘
             │
             │ Axios / HTTP
             ▼
┌─────────────────────────┐
│    Node.js + Express.js │
│        Backend          │
└────────────┬────────────┘
             │
             │ SQL Queries
             ▼
┌─────────────────────────┐
│        MySQL            │
│        Database         │
└─────────────────────────┘
