# FarmCartLK - Direct Farm-to-Buyer Marketplace

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Stack](https://img.shields.io/badge/Stack-MERN%20%2B%20Supabase-blue)](https://github.com/Ruzan-Mohamed/FarmCartlk)

**FarmCartLK** is a web-based agriculture e-commerce marketplace designed for the Sri Lankan agricultural sector. The platform directly connects farmers with buyers, eliminating unnecessary intermediaries, improving price transparency, and streamlining agricultural trade.

---

## 📌 Project Overview

- **Project Title:** FarmCartLK: Direct Farm-to-Buyer Marketplace
- **Group Number:** 10
- **Institution:** Rajarata University of Sri Lanka - Faculty of Technology (Department of ICT)
- **Course:** Skill Development Project I - ICT 1108
- **Supervisor:** Ms. Udani Jayakodi

### Key User Roles & Features

1. **Buyer**
   - User registration and secure JWT authentication.
   - Browse and search agricultural products with filtering options.
   - View farmer and farm profiles.
   - Place orders and track order history.
   - Direct contact with farmers.

2. **Farmer**
   - Create and manage farm profile.
   - Product catalog management (Add, edit, remove products).
   - Upload and manage high-quality product images.
   - View and update customer order statuses.

3. **Administrator**
   - System-wide monitoring and user management (Buyers & Farmers).
   - Category management for product classification.
   - Order tracking and resolution.

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React.js, Tailwind CSS |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB |
| **Media Storage** | Supabase Storage (Product images) |
| **Authentication** | JWT (JSON Web Tokens), bcrypt |
| **Testing** | Postman, Node.js environment |

---

## 📁 File Structure

The project follows a modular, two-tier (Client/Server) architecture organized for scalable full-stack development:

```text
FarmCartlk/
├── client/                      # Frontend Application (React.js + Tailwind CSS)
│   ├── public/                  # Public static assets (favicon, manifest, etc.)
│   └── src/
│       ├── assets/              # Static media files (logos, banners, default images)
│       ├── components/          # Reusable UI components
│       │   ├── common/          # Generic components (Navbar, Footer, Modal, Button, Loader)
│       │   ├── buyer/           # Buyer UI components (ProductCard, CartItem, OrderCard)
│       │   ├── farmer/          # Farmer UI components (ProductForm, FarmCard, OrderStatusUpdater)
│       │   └── admin/           # Admin UI components (UserTable, CategoryModal, AnalyticsCard)
│       ├── context/             # React Context providers (AuthContext, CartContext)
│       ├── hooks/               # Custom React hooks (useAuth, useFetch)
│       ├── pages/               # Top-level page views
│       │   ├── auth/            # Login, Register, ForgotPassword
│       │   ├── buyer/           # Home, ProductCatalog, ProductDetails, Cart, Checkout, OrderHistory
│       │   ├── farmer/          # FarmerDashboard, FarmProfile, ManageProducts, FarmerOrders
│       │   └── admin/           # AdminDashboard, ManageUsers, ManageCategories, ManageOrders
│       ├── services/            # API client modules (Axios instances & REST calls)
│       │   ├── authService.js   # Auth API calls
│       │   ├── productService.js# Product management API calls
│       │   └── orderService.js  # Order processing API calls
│       ├── utils/               # Utility functions, formatters, & constants
│       ├── App.jsx              # Root App component with routes setup
│       ├── main.jsx             # React DOM entry point
│       └── index.css            # Tailwind CSS & global style definitions
│
├── server/                      # Backend Application (Node.js + Express.js)
│   ├── config/                  # Configuration & DB connection scripts
│   │   ├── db.js                # MongoDB connection setup
│   │   └── supabase.js          # Supabase storage configuration
│   ├── controllers/             # Business logic request handlers
│   │   ├── authController.js    # User authentication & token management
│   │   ├── userController.js    # User profile operations
│   │   ├── productController.js # Product CRUD & image upload handlers
│   │   ├── farmController.js    # Farm details management
│   │   ├── orderController.js   # Order creation & status updates
│   │   └── adminController.js   # Admin-level administrative actions
│   ├── middleware/              # Custom Express middlewares
│   │   ├── authMiddleware.js    # JWT authentication & authorization checks
│   │   ├── errorMiddleware.js   # Global error handling middleware
│   │   └── uploadMiddleware.js  # File upload middleware (Multer / Supabase)
│   ├── models/                  # Mongoose data schemas
│   │   ├── User.js              # User schema (Buyer, Farmer, Admin)
│   │   ├── Farm.js              # Farm details schema
│   │   ├── Product.js           # Product listing schema
│   │   ├── Category.js          # Product category schema
│   │   └── Order.js             # Order transaction schema
│   ├── routes/                  # Express RESTful route definitions
│   │   ├── authRoutes.js        # /api/auth routes
│   │   ├── userRoutes.js        # /api/users routes
│   │   ├── productRoutes.js     # /api/products routes
│   │   ├── farmRoutes.js        # /api/farms routes
│   │   ├── orderRoutes.js       # /api/orders routes
│   │   └── adminRoutes.js       # /api/admin routes
│   ├── utils/                   # Server helpers (JWT helper, password hashing utilities)
│   ├── server.js                # Server entry point & Express app initialization
│   └── package.json             # Backend dependencies & scripts
│
├── .gitignore                   # Git ignore settings
├── LICENSE                      # Project license
└── README.md                    # Project documentation
```


### 2. Commit Message Guidelines

Team members should use standard **Conventional Commits** syntax:

| Type | Purpose | Example |
| :--- | :--- | :--- |
| `feat` | A new feature | `feat(auth): add JWT login and token generation` |
| `fix` | A bug fix | `fix(cart): resolve quantity calculation bug` |
| `docs` | Documentation changes | `docs(readme): add file structure and branch strategy` |
| `style` | Formatting / UI styling without logic change | `style(nav): update mobile navbar responsiveness` |
| `refactor` | Code refactoring without functionality change | `refactor(models): optimize product schema indexes` |
| `test` | Adding or updating tests | `test(api): add postman test scripts for orders` |
| `chore` | Maintenance tasks & configuration | `chore(deps): update express and mongoose versions` |

---

### 3. Pull Request (PR) & Code Review Rules

1. **Self-Review & Testing:** Before opening a PR, test all changes locally and ensure no console or build errors exist.
2. **Target Branch:** All feature PRs must target `develop` (never merge directly to `main`).
3. **PR Description:** Include a summary of changes, screenshot/video for UI updates, and test steps.
4. **Peer Review:** At least **one team member** must review and approve the PR before merging.
5. **Clean Branch:** Delete feature branches after merging into `develop`.

---

## 📅 Project Milestones

| No. | Activity | Start Date | End Date |
| :-- | :--- | :--- | :--- |
| 1 | Requirement Gathering & UI/UX Design | 01/08/2026 | 14/08/2026 |
| 2 | Frontend Development | 15/08/2026 | 31/08/2026 |
| 3 | Backend Development | 01/09/2026 | 18/09/2026 |
| 4 | Integration & Feature Implementation | 19/09/2026 | 21/09/2026 |
| 5 | Testing, Bug Fixing, Final Deployment | 22/09/2026 | 25/09/2026 |

---

## 👥 Project Team (Group 10)

| Name | Registration ID | Index No |
| :--- | :--- | :--- |
| Ruzan M.R.M | ITT/2024/093 | 2778 |
| A.K.N Nethsara | ITT/2024/072 | 2757 |
| R.M.B.M Rathnayaka | ITT/2024/088 | 2773 |
| K.M Sadharuwan | ITT/2024/094 | 2779 |
| Sigani S. | ITT/2024/102 | 2787 |
| A.M.I.S Silva | ITT/2024/103 | 2788 |

---

## 👥 Project Team (Group 10)

| Name | Registration ID | Index No |
| :--- | :--- | :--- |
| Ruzan M.R.M | ITT/2024/093 | 2778 |
| A.K.N Nethsara | ITT/2024/072 | 2757 |
| R.M.B.M Rathnayaka | ITT/2024/088 | 2773 |
| K.M Sadharuwan | ITT/2024/094 | 2779 |
| Sigani S. | ITT/2024/102 | 2787 |
| A.M.I.S Silva | ITT/2024/103 | 2788 |

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
