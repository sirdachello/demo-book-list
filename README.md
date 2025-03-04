# Demo-book-list

Basic CRUD app with fake REST API (json-server). Can add, view, edit and delete entries from a dummy DB.

## Installation: 

Clone the repo:

```bash
git clone https://github.com/sirdachello/demo-book-list.git
cd demo-book-list
```

Install dependencies:

```bash
npm install
```

Set up fake api:

1) navigate to the DB;

```bash
cd src/dummyDB
```

2) Run fake api:

```bash
npx json-server db.json
```

Navigate back to /demo-book-list and start development mode

```bash
npm run dev
```


## Building: 

```bash
npm run build
```