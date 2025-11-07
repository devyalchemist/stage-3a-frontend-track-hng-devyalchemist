# 🎧 Audiophile — Premium Audio E-Commerce Platform

Audiophile is a **Next.js + Convex-powered** e-commerce platform built to deliver a sleek and immersive shopping experience for premium audio products. From browsing to checkout, every step is optimized for **performance, reliability, and design precision**.

---

## 🚀 Tech Stack

| Layer                  | Technology                                                                              |
| :--------------------- | :-------------------------------------------------------------------------------------- |
| **Frontend Framework** | [Next.js 14+](https://nextjs.org/) with App Router                                      |
| **Language**           | [TypeScript](https://www.typescriptlang.org/)                                           |
| **Backend & Database** | [Convex](https://www.convex.dev/) (serverless backend + data layer)                     |
| **State Management**   | [Zustand](https://github.com/pmndrs/zustand)                                            |
| **Styling**            | [Tailwind CSS](https://tailwindcss.com/)                                                |
| **Forms & Validation** | [React Hook Form](https://react-hook-form.com/) + [Yup](https://github.com/jquense/yup) |
| **Email Service**      | [Nodemailer](https://nodemailer.com/) for order confirmations                           |
| **Linting**            | [ESLint](https://eslint.org/) for code consistency                                      |

---

## 💡 Key Features

✅ **Dynamic Product Catalog** — Browse curated categories (headphones, speakers, earphones).  
✅ **Detailed Product Pages** — High-quality images, product specs, and pricing.  
✅ **Persistent Shopping Cart** — Add, remove, and manage products across sessions.  
✅ **Streamlined Checkout** — Secure form validation and responsive order flow.  
✅ **Automated Order Emails** — Customers receive confirmation via Nodemailer.  
✅ **Convex Integration** — Real-time, serverless data storage and mutations.

---

## 🧩 Project Structure

audiophile/
├── app/ # Next.js App Router structure (pages, layouts, routes)
├── components/ # Reusable UI and layout components
├── convex/ # Convex functions, schema, and database logic
├── lib/ # Utility modules (email, helpers, etc.)
├── store/ # Zustand global state management
├── public/ # Static files and product images
└── ...

---

## ⚙️ Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/devyalchemist/stage-3a-frontend-track-hng-devyalchemist.git
cd audiophile
npm install

3️⃣ Configure Environment Variables

Create a .env.local file in the root directory and add:

NEXT_PUBLIC_CONVEX_URL="your_convex_url"

EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT=465
EMAIL_USER="your_email@gmail.com"
EMAIL_PASS="your_app_password"

NEXT_PUBLIC_BASE_URL="http://<your-hosted-domain>:3000"

💡 Note:

EMAIL_USER and EMAIL_PASS are used by Nodemailer to send confirmation emails.

For Gmail, generate an App Password (not your normal password).

On Vercel, add these values under Project → Settings → Environment Variables.

🧠 Scripts
Command	Description
npm run dev	Run in development mode
npm run build	Build for production
npm run start	Start the production server
npm run lint	Lint the project code
🧾 Deployment

The recommended deployment method is via Vercel
 — creators of Next.js.

Push your code to GitHub.

Connect the repo to Vercel.

Add environment variables in the project dashboard.

Deploy and go live 🚀

For manual setup or advanced CI/CD, see the Next.js Deployment Docs
.

🧰 Example Use Case

A customer visits your shop → adds a product → checks out → receives a confirmation email sent automatically by Nodemailer through the serverless Next.js API route /api/send-email.

This mirrors a real-world e-commerce architecture — minimal backend management, high scalability, and seamless integration.

🧑‍💻 Author

Rizzen Official
Creative Designer & Web3 Enthusiast

Passionate about merging art, design, and scalable web technology.

🪄 License

This project is open-sourced under the MIT License — feel free to use and modify it for your learning or personal projects.
```
