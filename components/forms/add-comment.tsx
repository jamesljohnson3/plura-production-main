'use client';
import { toast } from '@/components/ui/use-toast';
import { api } from '@/trpc/react';
import { customToastError } from '@/lib/utils';
import { useState } from 'react';
import { Icons } from '../icons-me';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

const AddComment = ({ postId }: { postId: string }) => {
  const [comment, setComment] = useState('');
  const apiUtils = api.useUtils();

  const addCommentMutation = api.comment.addComment.useMutation({
    onSuccess: async () => {
      await apiUtils.comment.fetchCommentsOfPost.invalidate({
        postId,
      });

      toast({
        description: 'Comment added successfully',
        duration: 1200,
      });
    },
    onError: () => {
      toast({
        description: 'An error occurred while adding your comment',
        variant: 'destructive',
        duration: 800,
      });
    },
  });

  const onSubmit = async () => {
    try {
      await addCommentMutation.mutateAsync({ postId, text: comment });
      setComment('');
    } catch (err) {
    if(err instanceof Error)
      customToastError(err.message);
    }
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
     await onSubmit();
    }
  };

  return (
    <>
      <Input
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={addCommentMutation.isLoading}
        className=" px-0 focus:border-transparent !bg-transparent !border-none !outline-none focus:ring-0 placeholder-gray-500 flex-grow "
        placeholder="Add a comment..."
        style={{
          background: 'transparent !important',
          border: 'none !important',
          boxShadow: 'none !important',
          outline: 'none !important',
        }}
      />
      {comment.length > 0 ? (
        <Button
          disabled={addCommentMutation.isLoading}
          onClick={onSubmit}
          variant={'ghost'}
          className="text-blue-400"
        >
          {addCommentMutation.isLoading && (
            <Icons.spinner className="h-4 w-4 mr-2 animate-spin" />
          )}
          Post
        </Button>
      ) : null}
    </>
  );
};

export default AddComment;
