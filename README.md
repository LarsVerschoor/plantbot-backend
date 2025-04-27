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

4. Rename .env.example to .env and enter your credentials.

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

6. Generate Key pairs to use with JWT authentication
```bash
npm run keys:generate
```

7. Add context data for the chatbot to use when generating responses by creating the /data/plant-needs.txt file. Add relevant data to this file.

8. Split context data and insert into a vector database to do similarity searches on the data.
```bash
npm run create-data-embeddings
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