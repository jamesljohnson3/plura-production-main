import type {
  Comment,
  Follows,
  Like,
  Post,
  SavedPost,
  User,
} from "@prisma/client";

export type CommentWithExtras = Comment & { user: User };
export type LikeWithExtras = Like & { user: User };

export type PostWithExtras = Post & {
  comments: CommentWithExtras[];
  likes: LikeWithExtras[];
  savedBy: SavedPost[];
  author: User;
};

export type FollowerWithExtras = Follows & { follower: User };
export type FollowingWithExtras = Follows & { following: User };

export type UserWithExtras = User & {
  posts: PostWithExtras[];
  saved: SavedPost[];
  followedBy: FollowerWithExtras[];
  following: FollowingWithExtras[];
  mylikes: LikeWithExtras[];
};
