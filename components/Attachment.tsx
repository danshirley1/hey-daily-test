import Image from "next/image";
import { Attachment } from "../interfaces";
import styles from "../styles/Attachments.module.css";
type AttachmentViewProps = { attachment: Attachment };

export const AttachmentView = ({ attachment }: AttachmentViewProps) => {
    if (attachment.type !== "image") {
        return <p>Unsupported attachment type {attachment.type}</p>;
    }

    return (
        <Image
            className={styles.imageAttachment}
            src={attachment.src}
            alt="an image from the post"
            fill
        />
    );
};
