# HeyDaily Take-Home test

Hello! And welcome to the HeyDaily take-home coding test.

The goal of this challenge is to assess your full-stack engineering capabilities and overall feel for product design.

## The Brief

This repo provides a partially complete skeleton for a post view. Your task is to complete the post view to the best of
your abilities within a ~3 hour time window. You may choose to focus on one or more of the following parts:
- Making the post view look beautiful
- Implementing a datastore and APIs to save and load posts
- Implementing the display of comments and/or reactions in the UI
- Implementing the backend logic and datastore for comments and/or reactions
- Anything else you think would make the post viewing experience delightful and engaging for our subscribers

Once complete please:
- Send your results to [robert@heydaily.co](mailto:robert@heydaily.co). Include:
  - a summary of the changes you made
  - a description of any further changes you'd like to make if you had time
  - and of course access to the code!
- Book a call to present your solution using [this link](https://calendly.com/robert-hd/30min)

Do reach out asap if you're having any issues getting the project to run or understanding the task!

## Getting Started

### Prerequisites

You will need the following installed on your machine:

- Node
- TypeScript (run `npm install -g typescript`)
- Docker
- An internet connection

First, install the dependencies:

```bash
yarn
```

Next, start the SQL Service in Docker:

```bash
start-db
```

Next, initialise the SQL Database:

```bash
init-db
```

Next, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the homepage and
[http://localhost:3000/postId](http://localhost:3000/postId) to view with the post with id `postId`.

To connect to the database, use these options:

```
hostname: 127.0.0.1
port: 3306
username: root
pass: foobar
```

**Note:** When making any changes to the code in `/server` make sure to transpile the TypeScript files for your changes to take effect (`yarn transpile-server`).

## Handover Notes

I focussed on the data interchange between the front end and a SQL database backend.

I spent a total of 4 hours on the project. There is of course plenty more I'd like to have done (see Next Steps section below). Also please consider that I was new to Next.js but have been studying the tutorials, and it's very cool.

### Database Back End

- I provision the database environment via Docker for cross platform consistency.
- There are some set up steps which are automated via the yarn commands in `package.json`.
- The `runQuery()` function in `/server/db-query.ts` is called by the Next API handlers.

### Front End

- I added a new view (`/pages/CreatePost.tsx`) which contains a very simple form for submitting some Post fields.
- I created the required handler functionality in `/pages/api/post/CreatePost.ts` for submitting the form and writing a new Post record to the database.
- Once the submission has completed successfully the user is redirected to the View Post view for the new Post entry.

### Considerations

- I am new to Next.js however have done a good amount of background reading in advance of starting any implementation. I deliberately chose to avoid any heroics with the framework and focus on what I knew I could achieve.
- I feel I've demonstrated a good E2E example in the time spent from a data interchange perspective but have not touched any look and feel due to time constraints. Consider that my day to day work is heavily weighted towards layout, so felt it best to demonstrate things a little further back in the stack.

### Next Steps

A list of things that spring to mind for what I'd do next, with further time:

- Tighter form validation client and server side (max length etc.).
- Comments, attachments, reactions.
- Some styling.
