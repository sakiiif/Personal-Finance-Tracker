<div align="center">

# 💰 Personal Finance Tracker

### A full-stack financial management platform to track income, expenses, savings, and budgets — all in one place.

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![NestJS](https://img.shields.io/badge/NestJS-10-E0234E?style=for-the-badge&logo=nestjs)](https://nestjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

</div>

---

## 📌 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [User Roles & Access Control](#-user-roles-&-acces-control)
- [Conclusion](#-conclusion)

---

## 🧭 Overview

**Personal Finance Tracker** is a full-stack web application that empowers users to take complete control of their financial life. Built with a scalable **NestJS** backend and a dynamic **Next.js** frontend, the platform enables users to log transactions, visualize spending patterns, set savings goals, manage budgets, and receive timely financial notifications — all through a clean, intuitive interface.

---

## ✨ Features

### 🔐 Authentication & Security
- Secure **Sign Up / Login / Logout** with email & password validation
- Password hashing with **bcrypt** for safe credential storage
- Role-based access control (Admin, Standard User, Guest)

### 📊 Dashboard
- Real-time summary of **total income**, **expenses**, and **savings**
- Auto-updating widgets as financial records are added or modified

### 💵 Income Management
- Log income from multiple sources: *Salary, Freelancing, Side Business*
- Categorize entries (e.g., Monthly Salary, Bonus) for structured tracking

### 🧾 Expense Tracking
- Categorize expenses: *Rent, Food, Transportation, Healthcare*, and more
- **Receipt upload** support (image files) for every expense entry
- Custom user-defined expense categories for personalized tracking

### 🎯 Savings Goals
- Set monthly savings targets and monitor progress in real time
- Visual indicators to keep users motivated and on track

### 📈 Reports & Data Visualization
- **Bar Charts** for monthly expense breakdowns
- **Pie Charts** for income distribution analysis
- Powered by **Chart.js / D3.js** for smooth, interactive visuals

### 🔁 Recurring Transactions
- Schedule repeating income/expense entries (e.g., rent, subscriptions)
- Automated tracking for predictable financial flows

### 🔍 Search & Filter
- Search transactions by **keyword**
- Filter by **date**, **category**, and **amount** for precise data retrieval

### 💼 Budget Planning
- Set category-level spending limits (e.g., $200/month on dining)
- Real-time **budget exceeded** alerts to keep spending in check

### 🌍 Multi-Currency Support
- Choose from multiple currencies (USD, EUR, and more)
- **Live currency conversion** based on real-time exchange rates

### 📤 Data Export
- Export financial data as **CSV** or **PDF**
- Ideal for offline analysis, tax preparation, or sharing with advisors

### 🌗 Dark / Light Theme
- Seamless theme toggle between dark and light modes
- Persistent preference saved per user

### 🔔 Notifications
- Reminders for **upcoming bills** and **savings milestones**
- Keeps users proactive about their financial obligations

### ⚙️ Settings & Profile
- Update profile details: name, email, password
- Manage custom categories and notification preferences

---

## 🛠 Tech Stack

| Layer        | Technology                              |
|--------------|------------------------------------------|
| **Frontend** | Next.js, TypeScript, Tailwind CSS        |
| **Backend**  | NestJS, TypeScript, REST API             |
| **Database** | PostgreSQL                               |
| **Auth**     | JWT, bcrypt                              |
| **Charts**   | Chart.js / D3.js                         |
| **Export**   | CSV & PDF generation libraries           |

---

## 👥 User Roles & Access Control

The application supports three distinct user roles to ensure **data privacy, security, and controlled access**:

### 🔐 Admin
**Privileges:**
- Manage all users (add, edit, delete accounts)
- Configure categories and budgets globally
- Access all system settings and reports

**Responsibilities:**
- Monitor overall system performance
- Ensure data security and manage backups

---

### 👤 Standard User
**Privileges:**
- Add and manage personal income, expenses, and savings
- Customize categories and set savings goals
- Access dashboard with charts and reports
- Export financial data
- Set up recurring transactions

**Responsibilities:**
- Maintain and track personal financial data
- Monitor spending and achieve financial goals

---

### 👁️ Guest User
**Privileges:**
- View basic application features and sample reports
- Explore the platform before registration

**Limitations:**
- Cannot add or manage any financial data

**Purpose:**
- Helps users understand the system before committing

---

## 📌 Conclusion

The **Personal Finance Tracker** delivers a comprehensive solution for managing finances with clarity and control. The integration of **role-based access**, **dynamic features**, and **secure infrastructure** ensures a reliable and user-friendly experience for all types of users.

---
