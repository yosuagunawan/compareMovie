const firebaseConfig = {
    apiKey: "AIzaSyA8vmRJiMnLzjLn_Y04vxMMl_6K4RE3OZs",
    authDomain: "movie-17790.firebaseapp.com",
    projectId: "movie-17790",
    storageBucket: "movie-17790.appspot.com",
    messagingSenderId: "922440736254",
    appId: "1:922440736254:web:e13b297399947e0eccb4af"
};

firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();

let template = [];
let notReviewed = [];
let thumbsUp = [];

let movieCollection = db.collection("movies");

//----------------  1  ----------------------
const initialize = () => {
    movieCollection.get().then((response) => {
        response.docs.forEach((item) => {
            if (item.data().type === "template") {
                template.push(item);
            }
            else if (item.data().type === "notReviewed") {
                notReviewed.push(item);
            }
            else if (item.data().type === "thumbsUp") {
                thumbsUp.push(item);
            }
        });
        display();
    })
}

//----------------  2  ----------------------
const display = () => {
    $(".template").empty();
    $(".notReviewed").empty();
    $(".thumbsUp").empty();
    // Buat HTMLnya
    notReviewed.forEach((movie) => {
        $(".notReviewed").append(
            $(`
                <div class="movie-thumbDown">
                    <li>
                        ${movie.data().title}
                    </li>
                    <button class="template-btn" onclick="makeCompleted('${movie.id}')">
                        <i class="fa-solid fa-fire"></i>
                    </button>
                    <button class="thumbsUp-btn" onclick="makeHalf('${movie.id}')">
                        <i class="fa-solid fa-thumbs-up"></i>
                    </button>
                    <button class="thumbsDown-btn" onclick="deleteToDo('${movie.id}')">
                        <i class="fa-solid fa-thumbs-down"></i>
                    </button>
                    <i class="fa-solid fa-notes"></i>
                </div>
            `)
        )
    });
    // Buat HTMLnya
    template.forEach((movie) => {
        $(".template").append(
            $(`
                <div class="movie-template">
                    <li>
                        ${movie.data().title}
                    </li>
                    <button class="template-btn" onclick="makeCompleted('${movie.id}')">
                        <i class="fa-solid fa-fire"></i>
                    </button>
                    <button class="thumbsUp-btn" onclick="makeHalf('${movie.id}')">
                        <i class="fa-solid fa-thumbs-up"></i>
                    </button>
                    <button class="thumbsDown-btn" onclick="deleteToDo('${movie.id}')">
                        <i class="fa-solid fa-thumbs-down"></i>
                    </button>
                </div>
            `)
        )
    });
    thumbsUp.forEach((movie) => {
        $(".thumbsUp").append(
            $(`
                <div class="movie-thumbUp">
                    <li>
                        ${movie.data().title}
                    </li>
                    <button class="template-btn" onclick="makeCompleted('${movie.id}')">
                        <i class="fa-solid fa-fire"></i>
                    </button>
                    <button class="thumbsUp-btn" onclick="makeHalf('${movie.id}')">
                        <i class="fa-solid fa-thumbs-up"></i>
                    </button>
                    <button class="thumbsDown-btn" onclick="deleteToDo('${movie.id}')">
                        <i class="fa-solid fa-thumbs-down"></i>
                    </button>
                </div>
            `)
        )
    });
};


//----------------  3  ----------------------
// AJAX
$(".addTaskBtn").click(() => {
    const inputToDo = $("input").val();
    let newToDo = {
        title: inputToDo,
        type: "notReviewed"
    };
    if (inputToDo !== "") {
        movieCollection
            .add(newToDo)
            .then((response) => {
                return response.get();
            })
            .then((response) => {
                notReviewed.push(response);
                display();
                $("input").val("");
            });
    };
});

//----------------  4  ----------------------
// gak pakai
const deleteToDo = (id) => {
    template = template.filter((movie) => {
        if (movie.id === id) {
            movie.ref.delete();
        }
        return movie.id !== id;
    });
    notReviewed = notReviewed.filter((movie) => {
        if (movie.id === id) {
            movie.ref.delete();
        }
        return movie.id !== id;
    });
    thumbsUp = thumbsUp.filter((movie) => {
        if (movie.id === id) {
            movie.ref.delete();
        }
        return movie.id !== id;
    });
    display();
}

//----------------  5  ----------------------
// buat centang
const makeCompleted = (id) => {
    let pushItem;
    notReviewed = notReviewed.filter((movie) => {
        if (movie.id === id) {
            pushItem = movie;
            movie.ref.delete();
        }
        return movie.id !== id;
    });
    thumbsUp = thumbsUp.filter((movie) => {
        if (movie.id === id) {
            pushItem = movie;
            movie.ref.delete();
        }
        return movie.id !== id;
    });
    let completedToDo = {
        title: pushItem.data().title,
        type: "template"
    };
    movieCollection
        .add(completedToDo)
        .then((response) => {
            return response.get();
        })
        .then((response) => {
            template.push(response);
            display();
        });
}

const makeHalf = (id) => {
    let pushItem;
    notReviewed = notReviewed.filter((movie) => {
        if (movie.id === id) {
            pushItem = movie;
            movie.ref.delete();
        }
        return movie.id !== id;
    });
    template = template.filter((movie) => {
        if (movie.id === id) {
            pushItem = movie;
            movie.ref.delete();
        }
        return movie.id !== id;
    });
    let halfCompletedToDo = {
        title: pushItem.data().title,
        type: "thumbsUp"
    };
    movieCollection
        .add(halfCompletedToDo)
        .then((response) => {
            return response.get();
        })
        .then((response) => {
            thumbsUp.push(response);
            display();
        });
}

$(document).ready(() => {
    initialize();
});