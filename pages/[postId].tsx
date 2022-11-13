import Head from "next/head";
import styles from "../styles/Post.module.css";
import { Post } from "../interfaces";
import { GetServerSidePropsContext, GetStaticPropsResult } from "next";
import { AttachmentView } from "../components/Attachment";
import Image from "next/image";

export const getServerSideProps = async (
    context: GetServerSidePropsContext<{ postId: string }>
): Promise<GetStaticPropsResult<PostViewParams>> => {
    if (!context.params) {
        return { notFound: true };
    }

    const { postId } = context.params;
    const postResponse = await fetch(
        `http://localhost:3000/api/post/${postId}`
    );

    if (postResponse.status !== 200) {
        console.error(
            "Failed to fetch post",
            postResponse.status,
            postResponse.json()
        );
    }

    const post: Post = await postResponse.json();

    return { props: { post } };
};

type PostViewParams = { post: Post };
export default function PostView({ post }: PostViewParams) {
    return (
        <div>
            <Head>
                <title>{post.title}</title>
                <meta
                    name="description"
                    content={`A new post from ${post.creator.name}`}
                />
                <link rel="icon" href="/public/favicon.ico" />
            </Head>

            <main className={styles.postContainer}>
                <header className={styles.postHeader}>
                    <div className={styles.profilePicture}>
                        <Image
                            src={post.creator.profileImagePath}
                            alt="profile picture"
                            fill
                        />
                    </div>
                    <h1>{post.creator.name}</h1>
                </header>
                <div>
                    <h1>{post.title}</h1>
                    <div className={styles.postText}>{post.body}</div>
                    <div className={styles.postAttachments}>
                        {post.attachments.map((attachment, index) => (
                            <AttachmentView
                                attachment={attachment}
                                key={index}
                            />
                        ))}
                    </div>
                </div>
                <div className={styles.comments}>
                    <p>Comments:</p>
                </div>
            </main>
        </div>
    );
}
