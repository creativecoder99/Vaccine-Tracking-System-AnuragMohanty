# VacciNotify - Child Vaccination Tracking System

**VacciNotify** is a comprehensive full-stack web application designed to help parents track their children's vaccination schedules, receive automated reminders, and manage digital health records. It also provides powerful tools for schools and administrators to monitor immunization coverage and broadcast health announcements.

## 🌟 Key Features

### For Parents
- **Smart Dashboard**: View upcoming and overdue vaccines at a glance.
- **Multi-Child Management**: Add and manage profiles for multiple children.
- **Automated Schedule**: Instantly generates a government-standard vaccination timeline based on birth date.
- **review System**: Rate and review the platform.
- **Notices**: Receive important health alerts from linked schools or admins.

### For Schools
- **Student Management**: Bulk upload student data via Excel/CSV.
- **Vaccination Coverage**: Visualize status (Fully Vaccinated, Partially Vaccinated, Unvaccinated) via interactive charts.
- **Announcements**: Post notices and events for parents.

### For Admins
- **System Overview**: Analytics on user growth and vaccination stats.
- **User Management**: Manage schools and parent accounts.
- **Global Notices**: Broadcast messages to all users.

## 🛠️ Tech Stack

- **Frontend**: React.js (Vite), Tailwind CSS, Framer Motion, Recharts
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Authentication**: JWT (JSON Web Tokens)
- **Tools**: Axios, React Router, React Hook Form

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (Local or Atlas URL)

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/creativecoder99/Vaccine-Tracking-System-AnuragMohanty.git
    cd Vaccine-Tracking-System-AnuragMohanty
    ```

2.  **Backend Setup**
    ```bash
    cd backend
    npm install
    # Create a .env file with:
    # PORT=5000
    # MONGO_URI=your_mongodb_connection_string
    # JWT_SECRET=your_jwt_secret
    npm run dev
    ```

3.  **Frontend Setup**
    ```bash
    cd frontend
    npm install
    npm run dev
    ```

## 👨‍💻 Developer

Designed & Built by **Anurag Mohanty**.

---
*Helping build a healthier future, one notification at a time.*
