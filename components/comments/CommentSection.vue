<template>
  <div class="w-full pb-40">
    <div v-if="UserID" class="flex">
      <div class="w-12">
        <widgets-account-avatar />
      </div>
      <div class="flex-grow">
        <ui-textarea v-model="newComment" placeholder="Add a comment..." class="text-sm" :disabled="submittingComment" @focus="commentTextareaFocused(true)" @blur="commentTextareaFocused(false)" />
        <div v-if="commentFocused || newComment" class="flex justify-end items-center">
          <ui-btn-alt color="accent-darker" text-color="accent" :padding-y="2" :padding-x="8" small :loading="submittingComment" @click.stop="postComment">Comment</ui-btn-alt>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Log in to post a comment</p>
    </div>

    <template v-for="comment in commentsLoaded">
      <comments-comment :comment="comment" :key="comment.CommentID" @delete="commentDeleted(comment)" />
    </template>
  </div>
</template>

<script>
export default {
  props: {
    comments: {
      type: Array,
      default: () => []
    },
    contentId: String
  },
  data() {
    return {
      newComment: '',
      submittingComment: false,
      commentFocused: false,
      commentsLoaded: []
    }
  },
  computed: {
    UserID() {
      return this.$store.getters['auth/UserId']
    },
    UserDisplayName() {
      return this.$store.getters['auth/DisplayName']
    }
  },
  methods: {
    commentDeleted(comment) {
      this.commentsLoaded = this.commentsLoaded.filter((c) => c.CommentID !== comment.CommentID)
    },
    commentTextareaFocused(isFocused) {
      this.commentFocused = isFocused
    },
    /**
     * Create comment on content
     */
    async postComment() {
      this.submittingComment = true
      const payload = {
        ContentID: this.contentId,
        Text: this.newComment
      }
      const comment = await this.$axios
        .$post(`/api/comment/content/${this.contentId}/create`, payload)
        .then((response) => {
          this.commentFocused = false
          this.newComment = ''
          return response.Record
        })
        .catch((error) => {
          console.error('Failed to post comment', error)
          return null
        })
      console.log('Comment posted', comment)
      const newCommentPayload = {
        CommentID: comment.CommentID,
        CommentText: comment.Data.CommentText,
        CreatedOnUTC: comment.CreatedOnUTC,
        LikedByUser: false,
        Likes: 0,
        NumReplies: 0,
        UserDisplayName: this.UserDisplayName,
        UserID: this.UserID
      }
      this.submittingComment = false
      if (comment) {
        this.commentsLoaded = [newCommentPayload, ...this.commentsLoaded]
      }
    }
  },
  mounted() {
    if (this.comments?.length) {
      this.commentsLoaded = this.comments
    }
  }
}
</script>