## Clone the repo and install the dependencies

```
git clone git@github.com:Anatidaephobist/NodeDB.git

cd nodeDB
```
```
npm install
```
## Start the express server
```
npm run dev
```

# Endpoints
Get all books
```
/books
```

Get single book
```
/books/id
```
Add new book
```
send POST request to /books with title, author, year and publisher
```

Delete single book
```
send DELETE request to /books/id
