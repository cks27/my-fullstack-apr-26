import { uuid } from "./utils/utils.js";

const commentsContainer = document.getElementById('comments-container');
const commentInp = document.getElementById('comment-inp');
const submitBtn = document.getElementById('submit-btn');

class CommentsApp {
    constructor() {
        this.commentList = [
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
    }

    createCommentComponent(comment) {
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

        replyButton.addEventListener('click', () => {
            const replyText = textarea.value;
            this.addReply(comment.id, replyText);
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


    render() {
        // reset UI
        commentsContainer.innerHTML = '';

        // add all the comments again (including new comment if available)
        const fragment = document.createDocumentFragment();
        for (let comment of this.commentList) {
            const commentComponent = this.createCommentComponent(comment);
            fragment.append(commentComponent);
        }
        commentsContainer.append(fragment);
    }

    addComment(newComment) {
        this.commentList.push(newComment);
        this.render();
    }

    addReply(commentId, replyText) {
      
        const comment = this.commentList.find((comment) => comment.id === commentId);
        if (!comment) {
            throw new Error(`comment with id ${commentId} not found`);
        }
        comment.replies.push(replyText);
        // render the ui after adding a reply
        this.render();
    }

    registerEventListeners() {
        submitBtn.addEventListener('click', () => {
            const newComment = {
                id: uuid(),
                text: commentInp.value,
                replies: []
            }
            this.addComment(newComment);
        });
    }

    start() {
        this.render();
        this.registerEventListeners();
    }
}

const app = new CommentsApp();

app.start();
