export type Post = {
    id: string;
    title: string;
    body: string;
    attachments: Attachment[];
    createdAt: Date;
    creator: Creator;
    comments: Comment[];
};

export type Attachment = ImageAttachment; // More attachment types in reality

export type ImageAttachment = {
    type: "image";
    src: string;
};

export type Creator = {
    id: number,
    name: string;
    profileImagePath: string;
};

// Update this
export type Comment = {};

export type CreatePostFormFields = {
  creatorId: string;
  title: string;
  content: string;
};
