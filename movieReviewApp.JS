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
let movieCollection = db.collection("movies");


let awesome = [];
let notReviewed = [];
let thumbsUp = [];
let bad = [];

//----------------  1  ----------------------
const initialize = () => {
    movieCollection.get().then((response) => {
        response.docs.forEach((item) => {
            if (item.data().type === "awesome") {
                awesome.push(item);
            }
            else if (item.data().type === "notReviewed") {
                notReviewed.push(item);
            }
            else if (item.data().type === "thumbsUp") {
                thumbsUp.push(item);
            }else if (item.data().type === "bad") {
                bad.push(item);
            }
        });
        display();
    })
}

//----------------  2  ----------------------
const display = () => {
    $(".awesome").empty();
    $(".notReviewed").empty();
    $(".thumbsUp").empty();
    $(".bad").empty();
    notReviewed.forEach((movie) => {
        $(".notReviewed").append(
            $(`
                <div class="movie-thumbDown">
                    <li>
                        ${movie.data().title}
                    </li>
                    <button class="awesome-btn" onclick="awesomeMovie('${movie.id}')">
                        <i class="fa-solid fa-fire"></i>
                    </button>
                    <button class="thumbsUp-btn" onclick="goodMovie('${movie.id}')">
                        <i class="fa-solid fa-thumbs-up"></i>
                    </button>
                    <button class="thumbsDown-btn" onclick="badMovie('${movie.id}')">
                        <i class="fa-solid fa-thumbs-down"></i>
                    </button>
                    <button class="bad-btn" onclick="deleteMovie('${movie.id}')">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            `)
        )
    });
    // Buat HTMLnya
    awesome.forEach((movie) => {
        $(".awesome").append(
            $(`
                <div class="movie-awesome">
                    <li>
                        ${movie.data().title}
                    </li>
                    <button class="awesome-btn" onclick="awesomeMovie('${movie.id}')">
                        <i class="fa-solid fa-fire"></i>
                    </button>
                    <button class="thumbsUp-btn" onclick="goodMovie('${movie.id}')">
                        <i class="fa-solid fa-thumbs-up"></i>
                    </button>
                    <button class="thumbsDown-btn" onclick="badMovie('${movie.id}')">
                        <i class="fa-solid fa-thumbs-down"></i>
                    </button>
                    <button class="bad-btn" onclick="deleteMovie('${movie.id}')">
                        <i class="fa-solid fa-trash"></i>
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
                    <button class="thumbsUp-btn" onclick="goodMovie('${movie.id}')">
                        <i class="fa-solid fa-thumbs-up"></i>
                    </button>
                    <button class="awesome-btn" onclick="awesomeMovie('${movie.id}')">
                        <i class="fa-solid fa-fire"></i>
                    </button>
                    <button class="thumbsDown-btn" onclick="badMovie('${movie.id}')">
                        <i class="fa-solid fa-thumbs-down"></i>
                    </button>
                    <button class="bad-btn" onclick="deleteMovie('${movie.id}')">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            `)
        )
    });
    bad.forEach((movie) => {
        $(".bad").append(
            $(`
                <div class="movie-bad">
                    <li>
                        ${movie.data().title}
                    </li>
                    <button class="thumbsDown-btn" onclick="badMovie('${movie.id}')">
                        <i class="fa-solid fa-thumbs-down"></i>
                    </button>
                    <button class="awesome-btn" onclick="awesomeMovie('${movie.id}')">
                        <i class="fa-solid fa-fire"></i>
                    </button>
                    <button class="thumbsUp-btn" onclick="goodMovie('${movie.id}')">
                        <i class="fa-solid fa-thumbs-up"></i>
                    </button>
                    <button class="bad-btn" onclick="deleteMovie('${movie.id}')">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            `)
        )
    });
};


//----------------  3  ----------------------
// AJAX
$(".addMovie").click(() => {
    const inputMovie = $("input").val();
    let newMovie = {
        title: inputMovie,
        type: "notReviewed"
    };
    if (inputMovie !== "") {
        movieCollection
            .add(newMovie)
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
const deleteMovie = (id) => {
    awesome = awesome.filter((movie) => {
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
    bad = bad.filter((movie) => {
        if (movie.id === id) {
            movie.ref.delete();
        }
        return movie.id !== id;
    });
    display();
}

//----------------  5  ----------------------
// buat centang
const awesomeMovie = (id) => {
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
    bad = bad.filter((movie) => {
        if (movie.id === id) {
            pushItem = movie;
            movie.ref.delete();
        }
        return movie.id !== id;
    });
    let awesomeAdd = {
        title: pushItem.data().title,
        type: "awesome"
    };
    movieCollection
        .add(awesomeAdd)
        .then((response) => {
            return response.get();
        })
        .then((response) => {
            awesome.push(response);
            display();
        });
}

const goodMovie = (id) => {
    let pushItem;
    notReviewed = notReviewed.filter((movie) => {
        if (movie.id === id) {
            pushItem = movie;
            movie.ref.delete();
        }
        return movie.id !== id;
    });
    awesome = awesome.filter((movie) => {
        if (movie.id === id) {
            pushItem = movie;
            movie.ref.delete();
        }
        return movie.id !== id;
    });
    bad = bad.filter((movie) => {
        if (movie.id === id) {
            pushItem = movie;
            movie.ref.delete();
        }
        return movie.id !== id;
    });
    let goodAdd = {
        title: pushItem.data().title,
        type: "thumbsUp"
    };
    movieCollection
        .add(goodAdd)
        .then((response) => {
            return response.get();
        })
        .then((response) => {
            thumbsUp.push(response);
            display();
        });
}

const badMovie = (id) => {
    let pushItem;
    notReviewed = notReviewed.filter((movie) => {
        if (movie.id === id) {
            pushItem = movie;
            movie.ref.delete();
        }
        return movie.id !== id;
    });
    awesome = awesome.filter((movie) => {
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
    let badAdd = {
        title: pushItem.data().title,
        type: "bad"
    };
    movieCollection
        .add(badAdd)
        .then((response) => {
            return response.get();
        })
        .then((response) => {
            bad.push(response);
            display();
        });
}

$(document).ready(() => {
    initialize();
});