## Getting Started

### Clone repository:

```bash
git clone https://github.com/gitkola/aifans && cd aifans && git checkout feature/signup-signin
```

### Install dependencies:

```bash
npm install
# or
yarn
```

### Setup MySQL database:

1. Be sure your MySQL is running
2. Add `.env` file with your credentials:

```
DB_NAME=aifans
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=3306
```

3. Run script to create database:

```bash
npm run db:create
# or
yarn db:create
```

4. Run migrations:

```bash
npm run migrate:up
# or
yarn migrate:up
```

### Run project:

1. Run the development server:

```bash
npm run dev
# or
yarn dev
```

2. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
