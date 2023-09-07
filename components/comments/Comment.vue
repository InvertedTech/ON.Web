<template>
  <!-- TODO: handle hover state via CSS instead of JS for performance -->
  <div class="flex py-4">
    <div class="w-12">
      <widgets-account-avatar :UserId="comment.UserID" />
    </div>
    <div class="flex-grow max-w-[calc(100%-48px)]">
      <div class="w-full" @mouseover="mouseoverComment" @mouseleave="mouseoutComment">
        <div class="flex items-center mb-1">
          <p class="text-sm font-semibold">{{ comment.UserDisplayName || comment.UserID }}</p>
          <p class="text-xs text-grayscale-800 px-2">{{ $dateDistanceFromNow(new Date(comment.CreatedOnUTC).valueOf()) }}</p>
        </div>
        <template v-if="!isEditing">
          <p ref="commentp" class="mb-2 text-sm whitespace-pre-line" :class="{ 'line-clamp-4': !showFullComment }">{{ commentText || '' }}</p>
          <button v-if="commentClamped" type="button" class="text-sm font-semibold block -mt-1 mb-2 text-white/60 hover:underline" @click="showFullComment = !showFullComment">{{ showFullComment ? 'Show less' : 'Read more' }}</button>
          <div class="flex items-center">
            <div class="w-12">
              <button class="flex items-center rounded-full -ml-2 py-1 px-2 hover:bg-white/10" :class="LikedByUser ? 'text-accent-darker hover:text-accent' : 'text-white/80 hover:text-white'" :disabled="submittingLike || deletingComment" @click="likeClick">
                <span class="material-icons-outlined text-lg">favorite_border</span>
                <p class="pl-1.5 text-xs font-bold">{{ Likes || 'Like' }}</p>
              </button>
            </div>
            <button class="font-bold text-xs mx-4 rounded-full py-1 px-3 text-white/80 hover:text-white hover:bg-white/10" @click.stop="replyClick">Reply</button>
            <div class="flex-grow" />
            <button v-if="UserID === comment.UserID && hovering" :disabled="deletingComment" class="flex items-center rounded-full mx-1 py-1 px-1 text-white/80 hover:text-white hover:bg-white/10" @click="editClick">
              <span class="material-icons-outlined text-lg">edit</span>
            </button>
            <button v-if="UserID === comment.UserID && hovering" :disabled="deletingComment" class="flex items-center rounded-full mx-1 py-1 px-1 text-white/80 hover:text-white hover:bg-white/10" @click.stop.prevent="deleteClick">
              <span class="material-icons-outlined text-lg">delete</span>
            </button>
          </div>
        </template>
        <template v-else>
          <ui-textarea v-model="editCommentText" placeholder="Add a comment..." class="text-sm" :disabled="submittingComment" focus-on-mount />
          <div class="flex justify-end items-center">
            <button class="font-bold text-sm mx-2 rounded-full py-1 px-4 hover:bg-white/10" :disabled="submittingComment" @click.stop="cancelEditComment">Cancel</button>
            <ui-btn-alt color="accent-darker" text-color="accent" :padding-y="2" :padding-x="8" :loading="submittingComment" :disabled="!editCommentText" small @click="submitEditCommentClick">Save</ui-btn-alt>
          </div>
        </template>

        <div v-if="UserID && showReplyTextarea" class="flex pt-4">
          <div class="w-12">
            <widgets-account-avatar />
          </div>
          <div class="flex-grow">
            <ui-textarea v-model="newComment" placeholder="Add a comment..." class="text-sm" :disabled="submittingComment" focus-on-mount @focus="commentTextareaFocused(true)" @blur="commentTextareaFocused(false)" />
            <div class="flex justify-end items-center">
              <button class="font-bold text-sm mx-2 rounded-full py-1 px-4 hover:bg-white/10" @click.stop="cancelComment">Cancel</button>
              <ui-btn-alt color="accent-darker" text-color="accent" :padding-y="2" :padding-x="8" :loading="submittingComment" :disabled="!newComment" small @click="commentClick">Comment</ui-btn-alt>
            </div>
          </div>
        </div>

        <button v-if="comment.NumReplies" class="font-semibold text-xs mt-2 flex items-center text-accent-darker" @click.stop="showRepliesClick">
          <ui-loading-spinner v-if="loadingReplies" size="la-xs pl-1" />
          <span v-else class="material-icons text-sm pr-1">{{ showReplies ? 'arrow_drop_up' : 'arrow_drop_down' }}</span>

          <span v-if="loadingReplies" class="pl-2">Loading...</span>
          <span v-else-if="!showReplies">Show {{ comment.NumReplies }} Replies</span>
          <span v-else>Hide Replies</span>
        </button>
      </div>

      <!-- Comment replies -->
      <div v-if="showReplies">
        <template v-for="replyComment in repliesToShow">
          <comments-comment :comment="replyComment" :key="replyComment.CommentID" is-reply :parentCommentID="comment.CommentID" @addReply="addReply" @delete="deleteReply(replyComment)" />
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    comment: {
      type: Object,
      default: () => {}
    },
    isReply: Boolean,
    parentCommentID: String
  },
  data() {
    return {
      commentText: '',
      showFullComment: false,
      commentClamped: false,
      isEditing: false,
      editCommentText: '',
      hovering: false,
      userLikedNow: undefined,
      submittingLike: false,
      submittingComment: false,
      deletingComment: false,
      showReplyTextarea: false,
      commentFocused: false,
      showReplies: false,
      loadingReplies: false,
      newComment: '',
      replies: []
    }
  },
  computed: {
    UserID() {
      return this.$store.getters['auth/UserId']
    },
    UserDisplayName() {
      return this.$store.getters['auth/DisplayName']
    },
    numReplies() {
      return this.comment.NumReplies || 0
    },
    repliesToShow() {
      return this.replies
    },
    LikedByUser() {
      if (this.userLikedNow !== undefined) return this.userLikedNow
      return this.comment.LikedByUser
    },
    Likes() {
      if (this.LikedByUser) return this.LikesByOtherUsers + 1
      return this.LikesByOtherUsers
    },
    LikesByOtherUsers() {
      if (this.comment.LikedByUser) return Number(this.comment.Likes || 0) - 1
      return Number(this.comment.Likes || 0)
    }
  },
  methods: {
    deleteReply(comment) {
      this.replies = this.replies.filter((r) => r.CommentID !== comment.CommentID)
      this.comment.NumReplies = this.replies.length
    },
    addReply(comment) {
      this.replies.push(comment)
      this.comment.NumReplies = this.replies.length
    },
    /**
     * Edit comment
     */
    submitEditCommentClick() {
      const payload = {
        CommentID: this.comment.CommentID,
        Text: this.editCommentText
      }
      this.submittingComment = true
      this.$axios
        .$post(`/api/comment/${this.comment.CommentID}/edit`, payload)
        .then((response) => {
          console.log('Comment edited', response)
          this.commentText = this.editCommentText
          this.isEditing = false
        })
        .catch((error) => {
          console.error('Failed to edit comment', error)
        })
        .finally(() => {
          this.submittingComment = false
        })
    },
    cancelEditComment() {
      this.isEditing = false
    },
    editClick() {
      this.editCommentText = this.commentText
      this.isEditing = true
    },
    /**
     * Delete comment
     */
    async deleteClick() {
      const payload = {
        message: `Delete your comment permanently?`,
        yesButtonText: 'Delete',
        yesButtonColor: 'error',
        callback: (confirmed) => {
          if (confirmed) {
            this.deletingComment = true
            this.$axios
              .$post(`/api/comment/${this.comment.CommentID}/delete`)
              .then((response) => {
                console.log('Comment deleted', response)

                this.$emit('delete')
              })
              .catch((error) => {
                console.error('Failed to delete comment', error)
              })
              .finally(() => {
                this.deletingComment = false
              })
          }
        },
        type: 'yesNo'
      }
      this.$store.commit('globals/setConfirmPrompt', payload)
    },
    mouseoverComment() {
      this.hovering = true
    },
    mouseoutComment() {
      this.hovering = false
    },
    /**
     * Like comment
     */
    likeClick() {
      this.submittingLike = true
      const oldLikedByUser = this.LikedByUser
      this.userLikedNow = !this.LikedByUser
      const endpoint = this.LikedByUser ? 'like' : 'unlike'
      this.$axios
        .$post(`/api/comment/${this.comment.CommentID}/${endpoint}`)
        .then((response) => {
          console.log('Response', response)
        })
        .catch((error) => {
          console.error('Failed to like comment', error)
          this.userLikedNow = oldLikedByUser // Revert if failed
        })
        .finally(() => {
          this.submittingLike = false
        })
    },
    /**
     * Create comment on parent comment
     */
    commentClick() {
      this.submittingComment = true

      const ParentCommentID = this.parentCommentID || this.comment.CommentID
      const payload = {
        ParentCommentID,
        Text: this.newComment
      }
      this.$axios
        .$post(`/api/comment/${ParentCommentID}/create`, payload)
        .then((response) => {
          console.log('Comment created', response)
          this.cancelComment()
          if (this.isReply) {
            const comment = response.Record
            this.$emit('addReply', {
              CommentID: comment.CommentID,
              CommentText: comment.Data.CommentText,
              CreatedOnUTC: comment.CreatedOnUTC,
              LikedByUser: false,
              Likes: 0,
              NumReplies: 0,
              UserDisplayName: this.UserDisplayName,
              UserID: this.UserID
            })
          } else {
            this.showReplies = false
            this.showRepliesClick()
          }
        })
        .catch((error) => {
          console.error('Failed to create comment', error)
        })
        .finally(() => {
          this.submittingComment = false
        })
    },
    async showRepliesClick() {
      if (!this.showReplies) {
        await this.loadReplies()
      }
      this.showReplies = !this.showReplies
    },
    /**
     * Load comment replies
     */
    async loadReplies() {
      this.loadingReplies = true

      this.replies = await this.$axios
        .$get(`/api/comment/${this.comment.CommentID}`)
        .then((response) => {
          console.log('Loaded reply comments', response)
          return response.Records || []
        })
        .catch((error) => {
          console.error('Failed to load replies', error)
          return []
        })
        .finally(() => {
          this.loadingReplies = false
        })
      this.comment.NumReplies = this.replies.length
    },
    cancelComment() {
      this.showReplyTextarea = false
      if (this.isReply) {
        this.newComment = `@${this.comment.UserDisplayName} `
      } else {
        this.newComment = ''
      }
    },
    replyClick() {
      this.showReplyTextarea = true
    },
    commentTextareaFocused(isFocused) {
      this.commentFocused = isFocused
    },
    checkCommentClamped() {
      if (this.showFullComment) return
      if (!this.$refs.commentp) {
        this.commentClamped = false
      } else {
        this.commentClamped = this.$refs.commentp.scrollHeight > this.$refs.commentp.clientHeight
      }
    }
  },
  mounted() {
    this.commentText = this.comment.CommentText
    if (this.isReply) {
      this.newComment = `@${this.comment.UserDisplayName} `
    }
    this.$nextTick(() => this.checkCommentClamped())
  }
}
</script>

