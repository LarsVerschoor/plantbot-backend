# plantbot-backend

## How to set up:

1. Clone repository.
```bash
git clone https://github.com/LarsVerschoor/plantbot-backend.git
```

2. Navigate to the created directory.
```bash
cd plantbot-backend
```

3. Install dependencies.
```bash
npm install
```

4. Create a new .env. file in the same format of the existing .env.example file and fill it in with the correct credentials.
```text
USERNAME_DEVELOPMENT=<your_database_username>
PASSWORD_DEVELOPMENT=<your_database_password>
DATABASE_DEVELOPMENT=<your_database_name>
HOST_DEVELOPMENT=<your_database_host>
DIALECT_DEVELOPMENT=mysql
```

5. Run the database migrations
```bash
npm run migrate:up
```

## How to run:

Run with --watch for development
```bash
npm run dev
```

Run for production
```bash
npm run start
```

## Database commands:

Migrate up
```bash
npm run migrate:up
```

Migrate undo
```bash
npm run migrate:undo
```

Migrate fresh
```bash
npm run migrate:fresh
```