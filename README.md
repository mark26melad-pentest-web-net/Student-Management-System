# Student Management System

A comprehensive Student Management System built with ASP.NET Core MVC, featuring full CRUD operations, database integration, and a modern responsive UI.

![ASP.NET Core](https://img.shields.io/badge/ASP.NET%20Core-.NET%2010-blueviolet)
![C#](https://img.shields.io/badge/C%23-239120?logo=c-sharp&logoColor=white)
![SQL Server](https://img.shields.io/badge/SQL%20Server-CC2927?logo=microsoft-sql-server&logoColor=white)
![Entity Framework Core](https://img.shields.io/badge/EF%20Core-512BD4?logo=.net&logoColor=white)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Database Schema](#database-schema)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [Author](#author)
- [License](#license)

---

## 📖 Overview

The **Student Management System** is a web application developed as part of a **Software Development Internship at Auspify Technologies**. It provides an efficient way to manage student records with a clean, modern interface and robust backend functionality.

The system leverages **ASP.NET Core MVC (.NET 10)**, **Entity Framework Core**, and **SQL Server** to deliver a scalable, maintainable, and user-friendly solution for educational institutions.

---

## ✨ Features

### Core Functionality
- ✅ **Full CRUD Operations** – Create, Read, Update, and Delete student records
- ✅ **Entity Framework Core Integration** – Seamless database operations with Code-First approach
- ✅ **Input Validation** – Server-side and client-side validation using Data Annotations
- ✅ **SQL Server Database** – Reliable data persistence and management

### UI/UX
- 🎨 **Responsive Design** – Optimized for desktop, tablet, and mobile devices
- 🎨 **Clean Color Scheme** – Blue, White, and Navy palette for a professional look
- 🎨 **Intuitive Navigation** – Easy-to-use interface for smooth user experience

### Technical Highlights
- 🏗️ **MVC Architecture** – Clean separation of concerns
- 🏗️ **Async/Await** – Non-blocking database operations
- 🏗️ **Error Handling** – Graceful handling of exceptions and validation errors

---

## 🛠 Technologies Used

| Category | Technology |
|----------|------------|
| **Framework** | ASP.NET Core MVC (.NET 10) |
| **Language** | C# |
| **Database** | SQL Server |
| **ORM** | Entity Framework Core |
| **Frontend** | Razor Views, HTML5, CSS3, Bootstrap |
| **Validation** | Data Annotations |
| **IDE** | Visual Studio 2022 |

---

## 📁 Project Structure

```
StudentManagementSystem/
│
├── Controllers/
│   └── StudentsController.cs          # Handles student CRUD operations
│
├── Models/
│   ├── Student.cs                     # Student entity model
│   └── ErrorViewModel.cs              # Error handling model
│
├── Views/
│   ├── Students/
│   │   ├── Index.cshtml               # List all students
│   │   ├── Create.cshtml              # Add new student
│   │   ├── Edit.cshtml                # Edit student
│   │   ├── Details.cshtml             # View student details
│   │   └── Delete.cshtml              # Delete confirmation
│   └── Shared/
│       └── _Layout.cshtml             # Shared layout
│
├── Data/
│   └── ApplicationDbContext.cs        # EF Core DbContext
│
├── wwwroot/
│   ├── css/                           # Custom styles (blue/navy theme)
│   ├── js/                            # Client-side scripts
│   └── lib/                           # Third-party libraries
│
├── appsettings.json                   # Configuration (connection string)
├── Program.cs                         # App entry point
└── StudentManagementSystem.csproj
```

---

## 🗄 Database Schema

### `Students` Table

| Column | Data Type | Constraints |
|--------|-----------|-------------|
| `Id` | INT | Primary Key, Identity |
| `Name` | NVARCHAR(100) | Required |
| `Email` | NVARCHAR(150) | Required, Valid Email |
| `Phone` | NVARCHAR(20) | Required |
| `Age` | INT | Required, Range 16-100 |
| `Course` | NVARCHAR(100) | Required |
| `EnrollmentDate` | DATETIME | Default: GETDATE() |

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [.NET 10 SDK](https://dotnet.microsoft.com/download)
- [SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads) (LocalDB or Express)
- [Visual Studio 2022](https://visualstudio.microsoft.com/) (with ASP.NET workload)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/StudentManagementSystem.git
   cd StudentManagementSystem
   ```

2. **Configure the database connection**

   Update the connection string in `appsettings.json`:
   ```json
   "ConnectionStrings": {
     "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=StudentManagementDB;Trusted_Connection=True;MultipleActiveResultSets=true"
   }
   ```

3. **Apply database migrations**
   ```bash
   dotnet ef database update
   ```

4. **Run the application**
   ```bash
   dotnet run
   ```

5. **Open your browser** and navigate to:
   ```
   https://localhost:5001
   ```

---

## 💻 Usage

| Action | Description |
|--------|-------------|
| **View Students** | Navigate to `/Students` to see all records |
| **Add Student** | Click "Create New" to add a new student |
| **Edit Student** | Click "Edit" on any row to modify details |
| **View Details** | Click "Details" to see full student information |
| **Delete Student** | Click "Delete" to remove a record (with confirmation) |

---

## 📸 Screenshots

> Add screenshots here to showcase your UI

| Page | Preview |
|------|---------|
| Student List | _screenshot_ |
| Add Student | _screenshot_ |
| Edit Student | _screenshot_ |

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 👨‍💻 Author

**Your Name**
- 🎓 Software Development Intern @ **Auspify Technologies**
- 💼 [LinkedIn](https://linkedin.com/in/yourprofile)
- 🐙 [GitHub](https://github.com/yourusername)
- 📧 your.email@example.com

---

## 🙏 Acknowledgements

- [Auspify Technologies](https://auspify.com) – For the internship opportunity and mentorship
- [Microsoft Docs](https://docs.microsoft.com/aspnet/core) – ASP.NET Core documentation
- [Entity Framework Core Docs](https://docs.microsoft.com/ef/core) – EF Core reference

---

## 📄 License

This project is licensed under the **MIT License** – see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**⭐ If you found this project helpful, please give it a star! ⭐**

Made with ❤️ during my internship at Auspify Technologies

</div>
