const commentsContainer = document.getElementById('comments-container');
const commentInp = document.getElementById('comment-inp');
const submitBtn = document.getElementById('submit-btn');



// https://stackoverflow.com/questions/105034/how-do-i-create-a-guid-uuid
function uuid() {
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
    (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
  );
}


const commentList = [
    {
        id: uuid(),
        text: 'My first comment',
        replies: ["Hey!", "How are you", "Lets connect"]
    },
    {
        id: uuid(),
        text: 'My second comment',
        replies: ["Hey!", "This is a new reply", "Lets connect"]
    },
    {
        id: uuid(),
        text: 'My third comment',
        replies: ["Hey!", "This is the third reply", "Lets connect"]
    },
];

function createCommentComponent(comment) {
    const article = document.createElement('article');
    
    const h5 = document.createElement('h5');
    h5.innerText = comment.text;

    const ul = document.createElement('ul');
    for (let reply of comment.replies) {
        const li = document.createElement('li');
        li.innerText = reply;
        ul.append(li);
    }

    // create a reply textarea
    const textarea = document.createElement('textarea');
    const replyButton = document.createElement('button');

    replyButton.innerText = 'Reply';

    replyButton.addEventListener('click', function () {
        const replyText = textarea.value;
        addReply(comment.id, replyText);
    })

    // here we are adding a comment text.
    article.append(h5);
    // adding all replies
    article.append(ul);

    // append textarea for reply
    article.append(textarea);

    // append reply button
    article.append(replyButton);

    return article;
}

function render() {
    // reset UI
    commentsContainer.innerHTML = '';

    // add all the comments again (including new comment if available)
    const fragment = document.createDocumentFragment();
    for (let comment of commentList) {
        const commentComponent = createCommentComponent(comment);
        fragment.append(commentComponent);
    }
    commentsContainer.append(fragment);
}

function addComment(newComment) {
    commentList.push(newComment);
    render();
}

function addReply(commentId, replyText) {
    const comment = commentList.find((comment) => comment.id === commentId);
    if (!comment) {
        throw new Error(`comment with id ${commentId} not found`);
    }
    comment.replies.push(replyText);
    // render the ui after adding a reply
    render();
}

function registerEventListeners() {
    submitBtn.addEventListener('click', function () {
        const newComment = {
            id: uuid(),
            text: commentInp.value,
            replies: []
        }

        addComment(newComment);
    });
}

function initializeApp() {
    render();
    registerEventListeners();
}

initializeApp();

