import Head from "next/head";
import styles from "../styles/Post.module.css";

export default function PostCreate() {
  return (
    <div>
      <Head>
        <title>Create a Post</title>

        <meta
          name="description"
          content="Share your update with the world!"
        />

        <link rel="icon" href="/public/favicon.ico" />
      </Head>

      <main className={styles.postContainer}>
        <h1>
          Create Post
        </h1>

        <form action="/api/post/CreatePost" method="post">
          <input type="hidden" name="creatorId" value="1" /> {/* this is just WIP naturally */}

          <div>
            <label htmlFor="title">Post title</label>
            <input type="text" name="title" required />
          </div>

          <div>
            <label htmlFor="content">Post content</label>
            <textarea name="content" required />
          </div>

          <button type="submit">Submit</button>
        </form>
      </main>
    </div>
  );
}
