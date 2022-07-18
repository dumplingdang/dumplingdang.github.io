# Instahgram
## Final Project for COMP 2132 - Web Development with JavaScript
### Overview
To build an app that recreates some of the functionality from Instagram: fetching data and displaying posts with images and text, searching and filtering posts, and adding comments and likes. 
### Requirements
1. **Fetching and displaying data**
   
   Using the fetch() method to retrieve JSON from an API endpoint and use the data to construct the HTML necessary to display posts. Each post will have the following markup, where __USE_DATA__ is a value that you must extract from the fetched data:
   
   ```
    <div class="post">
      <header class="post-header">
        <img src="__USE_DATA__" alt="" class="user-icon">
        <p class="user-name">__USE_DATA__</p>
      </header>
      <div class="post-image">
        <img src="__USE_DATA__">
      </div>
      <div class="post-meta">
        <div class="post-meta-actions">
          <img src="images/heart-regular.svg" class="icon icon-like" id="post-meta-like-${post.id}">
          <img src="images/comment-regular.svg" class="icon icon-comment" id="post-meta-comment-${post.id}">
        </div>
        <div class="post-meta-likes">
          Liked by <span class="user-name">__USE_DATA__</span> and <span class="likes-count" id="post-meta-likes-${post.id}">__USE_DATA__ others</span>
        </div>
      </div>
      <div class="post-body">
        <div class="post-body-user">
          <p>
            <span class="user-name">__USE_DATA__</span>
            <span class="post-body-text" id="post-body-${post.id}">__USE_DATA__</span>
          </p>
        </div>
        <div class="post-body-hashtags">__USE_DATA__</div>
      </div>
      <div class="post-comments" id="comments-${post.id}">__USE_DATA__</div>
      <div class="post-date">__USE_DATA__ days ago</div>
      <div class="post-add-comment">
        <input type="text" placeholder="Add a comment..." class="comment-value" id="add-comment-${post.id}">
      <input type="submit" value="Post" class="comment-submit" data-target="comments-${post.id}">
      </div>
    </div>
   ```
2. **Adding functionality via event listeners**
   
   1) The ability to search by username using the text input in the header. Typing in this input should, in realtime (i.e. no page refreshes, no need to click a button or hit enter), filter the posts such that only posts with matching usernames are showing.
   2) The ability to click any of the hashtags on the page and filter the posts so that only posts with a matching hashtag are displayed.
   3) The ability to remove the hashtag filter if present.
   4) The ability to submit new comments to a post.
   5) The ability to expand excerpts, if an excerpt is present in a post.
   6) The ability to like a post and cancel the like, increasing/decreasing the total likes.
   7) The ability to focus the comment input via the comment icon.
