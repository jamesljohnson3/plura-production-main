import type {
  Comment,
  Follows,
  Like,
  Post,
  SavedPost,
  User,
} from "@prisma/client";

export type CommentWithExtras = Comment & { user: User } & { Authuser: User };
export type LikeWithExtras = Like & { user: User } & { Authuser: User };

export type PostWithExtras = Post & {
  comments: CommentWithExtras[];
  likes: LikeWithExtras[];
  savedBy: SavedPost[];
  author: User; // Assuming author is a User
};

export type UserWithFollows = User & {
  following: FollowingWithExtras[];
  followedBy: FollowerWithExtras[];
};

export type FollowerWithExtras = Follows & { follower: UserWithFollows };
export type FollowingWithExtras = Follows & { following: UserWithFollows };

export type UserWithExtras = User & {
  posts: PostWithExtras[];
  saved: SavedPost[];
  followedBy: FollowerWithExtras[];
  following: FollowingWithExtras[];
  mylikes: LikeWithExtras[]; // Add the missing property
};