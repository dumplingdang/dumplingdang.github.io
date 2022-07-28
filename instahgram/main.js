let posts
const postsContainer = document.querySelector('.posts')
const currentHashtag = document.querySelector('.current-hashtag')
const currentHashtagCount = document.querySelector('.current-hashtag-count')

const displayHashtag = hashtagArray => {
    let collection = new Array()
    for (let hashtag of hashtagArray) {
        collection.push(`<span class="hashtag">#${hashtag}</span>`)
    }
    return collection.join(' ')
}

const displayComment = commentArray => {
    let collection = new Array()
    for (let comment of commentArray) {
        collection.push(`<p class="comment">
        <span class="user-name">${comment.username}</span>
        <span class="comment-text">${comment.commentText}</span>
        </p>`)
    }
    return collection.join(' ')
}

const daysOfPost = post => {
    let postDate = new Date(post.datePosted).getTime()
    let currentDate = new Date().getTime()
    let diff = Math.floor((currentDate - postDate) / (1000 * 60 * 60 * 24))
    return diff
}

const displayText = post => {
    let text
    if (post.body.text.length > 70) {
        text = `${post.body.excerpt} <span class="more">more</span>`
    } else {
        text = post.body.text
    }
    return text
}


const displayPost = postArray => {
    for (let post of postArray) {
        postsContainer.innerHTML +=
            `<div class="post">
                <header class="post-header">
                    <img src="${post.iconUrl}" alt="" class="user-icon">
                    <p class="user-name">${post.username}</p>
                </header>
                <div class="post-image">
                    <img src="${post.imageUrl}">
                </div>
                <div class="post-meta">
                    <div class="post-meta-actions">
                        <img src="images/heart-regular.svg" class="icon icon-like" id="post-meta-like-${post.id}">
                        <img src="images/comment-regular.svg" class="icon icon-comment" id="post-meta-comment-
                        ${post.id}">
                    </div>
                    <div class="post-meta-likes">
                        Liked by
                        <span class="user-name">${post.likes[0].username}</span>
                        and
                        <span class="likes-count" id="post-meta-likes-${post.id}">${post.likes.length-1} others</span>
                    </div>
                </div>
                <div class="post-body">
                    <div class="post-body-user">
                        <p>
                        <span class="user-name">${post.username}</span>
                        <span class="post-body-text" id="post-body-${post.id}">${displayText(post)}</span>
                        </p>
                    </div>
                    <div class="post-body-hashtags">${displayHashtag(post.body.hashtags)}</div>
                </div>
                <div class="post-comments" id="comments-${post.id}">${displayComment(post.comments)}</div>
                <div class="post-date">${daysOfPost(post)} days ago</div>
                <div class="post-add-comment">
                    <input type="text" placeholder="Add a comment..." class="comment-value" id="add-comment-${post.id}">
                    <input type="submit" value="Post" class="comment-submit" data-target="comments-${post.id}">
                </div>
            </div>`
    }
}

let searchBox = document.querySelector('.search')
searchBox.addEventListener('keyup', event => {
    postsContainer.innerHTML = ''
    currentHashtag.innerHTML = ''
    currentHashtagCount.innerHTML = ''

    let filteredPosts = new Array()
    for (let post of posts) {
        if (post.username.includes(event.target.value)) {
            filteredPosts.push(post)
        }
    }
    displayPost(filteredPosts);
})

if (localStorage.getItem('posts') === null) {
    fetch('https://comp2132.herokuapp.com/posts')
        .then(res => res.json())
        .then(data => {
            localStorage.setItem('posts', JSON.stringify(data))
        })
} else {
    posts = Array.from(JSON.parse(localStorage.getItem('posts')))
    displayPost(posts)
}

document.addEventListener('click', event => {
    if (event.target.classList.contains('hashtag')) {
        const selectedHashtag = event.target.innerHTML.slice(1)
        postsContainer.innerHTML = ''
        const filteredPosts = new Array()
        for (let post of posts) {
            const hashtagArray = post.body.hashtags
            for (let hashtag of hashtagArray) {
                if (hashtag === selectedHashtag) {
                    filteredPosts.push(post)
                    break
                }
            }
        }
        displayPost(filteredPosts)
        const numberOfFilteredPosts = filteredPosts => {
            const length = filteredPosts.length
            if (length > 1) {
                return length + ' posts'
            } else {
                return length + ' post'
            }
        }
        document.querySelector('.current-hashtag').innerHTML = `#${selectedHashtag} ${numberOfFilteredPosts(filteredPosts)}<img src="images/times-circle-regular.svg" class="remove icon">`
    }
})

document.addEventListener('click', event => {
    if (event.target.classList.contains('remove')) {
        currentHashtag.innerHTML = ''
        currentHashtagCount.innerHTML = ''
        postsContainer.innerHTML = ''
        displayPost(posts)
    }
})

document.addEventListener('click', event => {
    if (event.target.classList.contains('comment-submit')) {
        const commentInput = event.target.previousElementSibling.value
        const submitBtnDataTargetValue = event.target.getAttribute('data-target')
        if (commentInput.length > 0) {
            const newCommentPost = `<p class="comment">
                <span class="user-name">you</span>
                <span class="comment-text">${commentInput}</span>
                </p>`
            const commentPost = document.getElementById(`${submitBtnDataTargetValue}`)
            commentPost.innerHTML += newCommentPost
            event.target.previousElementSibling.value = ''
        }
    }
})

document.addEventListener('click', event => {
    if (event.target.classList.contains('more')) {
        const postID = event.target.parentNode.getAttribute('id').slice(-1)
        for (let post of posts) {
            if (post.id == postID) {
                event.target.parentNode.innerHTML = post.body.text
                break
            }
        }
    }
})

document.addEventListener('click', event => {
    if (event.target.classList.contains('icon-like')) {
        const postID = event.target.getAttribute('id').slice(-1)
        const selectedElement = document.getElementById(`post-meta-likes-${postID}`)
        let currentLikesCount = parseInt(selectedElement.innerHTML.slice(0, 1))
        const imageElement = document.getElementById(`post-meta-like-${postID}`)
        if (imageElement.src.includes('images/heart-regular.svg')) {
            imageElement.src = 'images/heart-red.svg'
            currentLikesCount++
        } else {
            imageElement.src = 'images/heart-regular.svg'
            currentLikesCount--
        }
        selectedElement.innerHTML = currentLikesCount + ' others'
    }
})

document.addEventListener('click', event => {
    if (event.target.classList.contains('icon-comment')) {
        const postID = event.target.getAttribute('id').slice(-1)
        const selectedElement = document.getElementById(`add-comment-${postID}`)
        selectedElement.focus()
    }
})
