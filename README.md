# Intelligent Learning Difficulty Prediction System

## Overview

The **Intelligent Learning Difficulty Prediction System** is a full-stack adaptive learning analytics platform designed to monitor student learning behavior and provide personalized academic guidance.
Instead of evaluating students only through examinations, the system continuously analyzes quiz performance, response time, repeated attempts, and inactivity to detect weak concepts at an early stage and recommend corrective learning actions.

The platform acts as a **smart academic assistant** for students and an **analytics dashboard** for faculty, enabling timely intervention and improved learning outcomes.

---

## Key Objectives

* Identify weak topics before examinations
* Provide personalized learning recommendations
* Track student performance continuously
* Help faculty monitor class progress
* Improve learning efficiency and engagement

---

## System Modules

### 1. Authentication Module

* Secure student and admin registration
* Login using JWT authentication
* Password hashing using bcrypt
* Role-based access control (Student / Admin)

---

### 2. Student Dashboard

Provides a complete overview of learning progress:

* Welcome panel with user details
* Total quizzes attempted
* Overall accuracy percentage
* Weak topics count
* Recent activity tracking
* Reminder alerts for inactive topics
* Learning streak and XP points

---

### 3. Skill Tracking Portal

Each subject is represented as a skill card:

* Progress bar showing completion
* Topic mastery percentage
* Levels: Beginner, Intermediate, Advanced
* Quiz completion statistics

This helps students clearly understand their academic strengths and weaknesses.

---

### 4. Quiz System

* Topic-based MCQ quizzes
* Timer-based question answering
* Automatic evaluation
* Instant result generation
* Secure submission (no answer exposure before submit)

---

### 5. Performance Analysis

After each quiz, the system records:

* Accuracy percentage
* Response time
* Number of attempts
* Last practiced date

These behavioral parameters are used for learning analytics.

---

### 6. Difficulty Prediction Engine

The system computes a **Difficulty Score** for each topic:

Difficulty Score =
(wrong answers × 3) +
(average response time × 2) +
(repeated attempts × 4) +
(inactivity days × 1)

If the score exceeds a threshold, the topic is marked as **Weak**.

---

### 7. Weak Topic Detection

Students can view:

* Weak topics list
* Difficulty level indicator
* Reason for detection (slow answering, low accuracy, inactivity)

---

### 8. Recommendation System

Based on weak topics, the platform automatically provides:

* Video tutorials (YouTube integration)
* Notes and learning resources
* Practice quizzes
* Revision suggestions

---

### 9. Smart Study Plan

The system generates a structured study plan:

* Day-wise tasks (Watch → Practice → Revise)
* Task checklist
* Completion progress tracking

---

### 10. Analytics & Visualization

Interactive charts display:

* Performance over time
* Topic-wise accuracy
* Weak vs strong subjects

Helps both students and faculty understand learning patterns.

---

### 11. Gamification Features

To improve engagement:

* XP points for learning activities
* Learning streak tracking
* Achievement levels and badges
* Leaderboard ranking

---

### 12. Discussion Forum

* Students can post doubts topic-wise
* Other students and faculty can reply
* Encourages collaborative learning

---

### 13. Admin/Faculty Panel

Faculty members can:

* Create courses and subjects
* Add topics
* Upload quiz questions
* Upload study materials (PDF/video links)
* View student analytics
* Identify weak students
* Monitor class performance

---

## Technology Stack

### Frontend

* React.js
* Tailwind CSS
* Axios
* Recharts / Chart.js

### Backend

* Node.js
* Express.js
* REST API Architecture

### Database

* MongoDB (Mongoose ODM)

### Authentication & Security

* JSON Web Token (JWT)
* Bcrypt password hashing

### Notifications

* Nodemailer email reminders

---

## How the System Works

1. Student attempts quizzes.
2. The system records behavioral learning data.
3. Difficulty score is calculated for each topic.
4. Weak topics are identified automatically.
5. Personalized study plan and resources are recommended.
6. Faculty monitor analytics and assist students.

---

## Expected Outcome

The system transforms traditional exam-based evaluation into **continuous learning analysis**, enabling early academic intervention and improving student performance.

---

## Installation (Local Setup)

### Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/intelligent-learning-platform.git
```

### Backend Setup

```bash
cd intelligent-learning-backend
npm install
npm start
```

### Frontend Setup

```bash
cd intelligent-learning-frontend
npm install
npm run dev
```

---

## Author

**Harsha Varthini S**

---

## Project Type

Academic Mini Project — Full Stack Web Application

RENDER:-
https://intelligent-learning-platform-1.onrender.com
