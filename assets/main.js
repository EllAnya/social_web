// Низа со аплоадирани слики за нов пост
let uploadedImages = [];

// Функција за аплоадираање на слики
document.getElementById("upload-image-input").addEventListener("change", readFileImage);
function readFileImage() {
    if (this.files && this.files[0]) {
        let image = new FileReader();

        image.addEventListener("load", function(element) {
            // Base64 код (стринг) од аплоадираната слика се додава во низа
            uploadedImages.push(element.target.result);

            // Се пребришуваат претходните прикажани слики
            let imagesPreview = document.getElementById("post-images-preview");
            imagesPreview.innerHTML = "";

            // Од ново се прикажуваат слите слики од низата + новата аплоадирана слика
            uploadedImages.forEach((image, index) => {
                imagesPreview.innerHTML += `<img src="${image}" id="uploaded-image">`
            });
        });

        image.readAsDataURL(this.files[0]);
    };
};



// Низа од постови
let postList = [
    {
        authorName: "Jaylee Montes",
        authorAvatar: "https://i.ibb.co/VqWkzBR/img-avatar2.png",
        postDescription: "Front-end web development, also known as client-side development is the practice of producing HTML, CSS and JavaScript for a website or Web Application so that a user can see and interact with them directly.",
        postImage: ["https://i.ibb.co/zJr1j7P/post-4.webp", "https://i.ibb.co/nQBX35F/post-5.jpg", "https://i.ibb.co/SrQynTh/post-3.jpg", "https://i.ibb.co/bvHd7cb/post-2.jpg", "https://i.ibb.co/DW0H5vn/post-1.jpg"],
        timeAgo: "1 min ago",
        comments: [
            {
                commentAuthorName: "Quinn Harrell",
                commentAuthorAvatar: "https://i.ibb.co/25XPzNF/img-avatar4.png",
                commentContent: "I like this post.",
                commentTimeAgo: "2 mins ago",
            },
            {
                commentAuthorName: "Thomas Mcconnell",
                commentAuthorAvatar: "https://i.ibb.co/HXF4mCF/img-avatar3.png",
                commentContent: "Thank you for your post",
                commentTimeAgo: "5 mins ago"
            }
        ]
    },
    {
        authorName: "Thomas Mcconnell",
        authorAvatar: "https://i.ibb.co/HXF4mCF/img-avatar3.png",
        postDescription: "In this week post I will show you how to make parallax effect and use it to tell story in website. Parallax is must know skill for every frontend developer because it can be used for different type of cases in websites. Mostly it is used tell story with graphics… 😎 😁",
        postImage: [],
        timeAgo: "1 min ago",
        comments: []
    },
    {
        authorName: "Quinn Harrell",
        authorAvatar: "https://i.ibb.co/25XPzNF/img-avatar4.png",
        postDescription: "Everything you need to know in a simple path to get hired fast. This video is the second part of my Web Development series. In the first part, we covered 5 facts about web development.",
        postImage: ["https://i.ibb.co/DW0H5vn/post-1.jpg"],
        timeAgo: "1 min ago",
        comments: []
    }
];


// Зачувај нов пост
function savePost() {
    // Креирај нов објект, и на наполни го со податоците за нов пост
    let newPost = {
        authorName: "Dejan Veselinoski",
        authorAvatar: "https://i.ibb.co/0rBBqbZ/image.png",
        postDescription: document.getElementById("post-textarea").value,
        postImage: uploadedImages,
        timeAgo: "1 min ago",
        comments: []
    };

    // додади го новиот пост на 1-во место
    postList.unshift(newPost);

    // избриши ги претходните постови
    document.getElementById("postSection").innerHTML = "";
    // вчитај ги од ново сите постови во низата + новиот додаден пост
    loadPosts();
    // исчисти ја textarea-та откако постот е креиран
    document.getElementById("post-textarea").value = "";
    uploadedImages = [];
    // избриши ги аплоадираните слики откако постот е креиран
    document.getElementById("post-images-preview").innerHTML = "";
};


// Креирај HTML за секој пост од низата postList
function loadPosts() {
    let section = document.getElementById("postSection");

    // За секој пост во низата креирај HTML
    postList.forEach((post, index) => {
        section.innerHTML += 
        `<article class="article-block">
            <span class="post-time">${post.timeAgo}</span>

            <img class="author-avatar" src="${post.authorAvatar}">
            <p class="author-name">${post.authorName}</p>
            <p class="central-text">${post.postDescription}</p>
            <div class="post-images">
                ${dividePostImages(post.postImage, index)}
            </div>
            <br>
            <button class="article-reactions"><i class="fa-regular fa-thumbs-up"></i></button>
            <button class="article-reactions" onclick="showCommentArea(${index})"><i class="fa-solid fa-comment"></i></button>

            <textarea id="comment-area${index}" class="comment-area" placeholder="Add your comment"></textarea>
            <button id="comment-button${index}" class="send-comment" onclick="addNewComment(${index})">Send</button>

            <div class="comments-area" id="comment-holder${index}">
                <p class="comments-label">Comments</p>
                
                ${createCommentsHTML(post.comments)}
            </div>
        </article>`
    });
};

function createCommentsHTML(comments) {
    let commentList = '';
    
    comments.forEach(element => {
        commentList += 
        `<div id="comment">
                <img src="${element.commentAuthorAvatar}" class="comment-avatar">
                <div class="comment-info">
                    <p class="comment-author">${element.commentAuthorName}</p>
                    <p class="comment-content">${element.commentContent}</p>
                    <p class="comment-timeago">${element.commentTimeAgo}</p>
                </div>
         </div>
        `;
    });

    return commentList;
}


// Според бројот на слики за секој пост, креирај соодветен HTML 
// Функцијата очекува 2 влезни параметри за секој пост, првиот е низата со слики од постот, вториот е индексот на постот
function dividePostImages(niza, index) {
    let images;

    if (niza.length == 1) {
        images = `<div class="post-imagew-100 h-300" style="background-image: url(${niza[0]});" onclick="showFullSizeImage(${index}, 0)"></div>`;
    }
    else 
    if (niza.length == 2) {
        images = `<div class="post-image w-50 h-300" style="background-image: url(${niza[0]});" onclick="showFullSizeImage(${index}, 0)"></div>
                  <div class="post-image w-50 h-300" style="background-image: url(${niza[1]});" onclick="showFullSizeImage(${index}, 1)"></div>`;
    } 
    else
    if (niza.length == 3) {
        images = `<div class="post-image w-50 h-300" style="background-image: url(${niza[0]});" onclick="showFullSizeImage(${index}, 0)"></div>
                  <div class="w-50 h-300 float-l">
                    <div class="post-image w-100 h-150" style="background-image: url(${niza[1]});" onclick="showFullSizeImage(${index}, 1)"></div>
                    <div class="post-image w-100 h-150" style="background-image: url(${niza[2]});" onclick="showFullSizeImage(${index}, 2)"></div>
                  </div>`;
    }
    else
    if (niza.length == 4) {
        images = `<div class="post-image w-50 h-300" style="background-image: url(${niza[0]});" onclick="showFullSizeImage(${index}, 0)"></div>
                  <div class="w-50 h-300 float-l">
                    <div class="post-image w-100 h-150" style="background-image: url(${niza[1]});" onclick="showFullSizeImage(${index}, 1)"></div>
                    <div class="w-100 h-150">
                        <div class="post-image w-50 h-150" style="background-image: url(${niza[2]});" onclick="showFullSizeImage(${index}, 2)"></div>
                        <div class="post-image w-50 h-150" style="background-image: url(${niza[3]});" onclick="showFullSizeImage(${index}, 3)"></div>
                    </div>
                  </div>`;
    } 
    else
    if (niza.length > 4) {
        images = `<div class="post-image w-50 h-300" style="background-image: url(${niza[0]});" onclick="showFullSizeImage(${index}, 0)"></div>
                  <div class="w-50 h-300 float-l">
                    <div class="post-image w-100 h-150" style="background-image: url(${niza[1]});" onclick="showFullSizeImage(${index}, 1)"></div>
                    <div class="w-100 h-150">
                        <div class="post-image w-50 h-150" style="background-image: url(${niza[2]});" onclick="showFullSizeImage(${index}, 2)"></div>
                        <div class="post-image w-50 h-150" style="background-image: url(${niza[3]});" onclick="showFullSizeImage(${index}, 3)">
                            <div class="post-image-overlay">+ ${niza.length - 4}</div>
                        </div>
                    </div>
                  </div>`;
    }
    else {
        images = '';
    }

    return images;
};


// Прикажи слика на пост во full големина
// Функцијата очекува 2 влезни параметри, 
// Првиот е индексот на постот, вториот е индексот на кликнатата слика што треба да се прикаже прва на carousel-от
function showFullSizeImage(postIndex, imageIndex) {

    // Отвори го bootstrap modal-от
    var myModal = new bootstrap.Modal(document.getElementById("imageModal"), {});
    myModal.show();

    let carouselInner = document.getElementById("carousel-inner");

    // Доколку претходно сме прикажале други слики, избриши ги од carousel-от
    carouselInner.innerHTML = "";

    // Според индексот на постот, извлечи ги неговите слики од низата со постови, и додели ги на нова локална низа
    let postImages = postList[postIndex].postImage;

    // Креирај HTML во carousel-от за секоја слика во низата
    postImages.forEach((image, i) => {
        carouselInner.innerHTML += 
        `<div class="carousel-item ${i == imageIndex ? 'active' : ''}">
            <img src="${image}" class="d-block w-100">
        </div>`;
    });
}

// Прикажи го полето за коментар на соодветен пост ( очекува индекс на пост како влезен параметaр)
function showCommentArea(postIndex) {
    document.getElementById("comment-area"+ postIndex).style.display = "block";
    document.getElementById("comment-button"+ postIndex).style.display = "block";
    document.getElementById("comment-holder"+ postIndex).style.display = "block";
}


function addNewComment(postIndex) {

    let newCommentObj = {
        commentAuthorName : "Dejan Veselinoski",
        commentAuthorAvatar : "https://i.postimg.cc/C5GQxQJC/img-avatar.png",
        commentContent : document.getElementById("comment-area" + postIndex).value,
        commentTimeAgo : '1 min ago'
    };

    postList[postIndex].comments.unshift(newCommentObj);
    
    let commentsHolder = document.getElementById("comment-holder" + postIndex);
    commentsHolder.innerHTML = 
    `<p class="comments-label">Comments</p>
            
     ${createCommentsHTML(postList[postIndex].comments)}
    `;

    document.getElementById("comment-area" + postIndex).value = "";
}