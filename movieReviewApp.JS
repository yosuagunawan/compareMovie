// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDs2IsK-epeju0A8Kd8JsV6NfeTarE33i8",
    authDomain: "sesi-13-22ade.firebaseapp.com",
    projectId: "sesi-13-22ade",
    storageBucket: "sesi-13-22ade.appspot.com",
    messagingSenderId: "427838627287",
    appId: "1:427838627287:web:c2749ebd080113d5b17f92"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();
let movieCollection = db.collection("movies");

let awesome = [];
let thumbsUp = [];
let bad = [];
let notReviewed = [];

const initialize = () =>{
    movieCollection.get().then((response) => {
        response.docs.forEach((item) =>{
            if(item.data().type === "awesome"){
                awesome.push(item);
            }else if(item.data().type === "notReviewed"){
                notReviewed.push(item);
            }else if(item.data().type === "thumbsUp"){
                thumbsUp.push(item);
            }else if(item.data().type === "bad"){
                bad.push(item);
            }
        });
        display();
    });
}

const display = () =>{

    $(".awesome").empty();
    $(".thumbsUp").empty();
    $(".bad").empty();
    $(".notReviewed").empty();

    notReviewed.forEach((movie) =>{
        $(".notReviewed").append(
            $(`
                <div class="movie-thumbDown">
                    <li>
                        ${movie.data().title}
                    </li>
                    <button class="awesome-btn" onclick="awesomeMovie('${movie.id}')">
                        <i class="fa-solid fa-fire">
                    </button>
                    <button class="thumbsUp-btn" onclick="goodMovie('${movie.id}')">
                        <i class="fa-solid fa-thumbs-up">
                    </button>
                    <button class="thumbsDown-btn" onclick="badMovie('${movie.id}')">
                        <i class="fa-solid fa-thumbs-down">
                    </button>
                    <button class="bad-btn" onclick="deleteMovie('${movie.id}')">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            `)
        )
    });

    awesome.forEach((movie) =>{
        $(".awesome").append(
            $(`
                <div class="movie-awesome">
                    <li>
                        ${movie.data().title}
                    </li>
                    <button class="awesome-btn" onclick="awesomeMovie('${movie.id}')">
                        <i class="fa-solid fa-fire">
                    </button>
                    <button class="thumbsUp-btn" onclick="goodMovie('${movie.id}')">
                        <i class="fa-solid fa-thumbs-up">
                    </button>
                    <button class="thumbsDown-btn" onclick="badMovie('${movie.id}')">
                        <i class="fa-solid fa-thumbs-down">
                    </button>
                    <button class="bad-btn" onclick="deleteMovie('${movie.id}')">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            `)
        )
    });

    thumbsUp.forEach((movie) =>{
        $(".thumbsUp").append(
            $(`
                <div class="movie-thumbUp">
                    <li>
                        ${movie.data().title}
                    </li>
                    <button class="awesome-btn" onclick="awesomeMovie('${movie.id}')">
                        <i class="fa-solid fa-fire">
                    </button>
                    <button class="thumbsUp-btn" onclick="goodMovie('${movie.id}')">
                        <i class="fa-solid fa-thumbs-up">
                    </button>
                    <button class="thumbsDown-btn" onclick="badMovie('${movie.id}')">
                        <i class="fa-solid fa-thumbs-down">
                    </button>
                    <button class="bad-btn" onclick="deleteMovie('${movie.id}')">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            `)
        )
    });

    bad.forEach((movie) =>{
        $(".bad").append(
            $(`
                <div class="movie-bad">
                    <li>
                        ${movie.data().title}
                    </li>
                    <button class="awesome-btn" onclick="awesomeMovie('${movie.id}')">
                        <i class="fa-solid fa-fire">
                    </button>
                    <button class="thumbsUp-btn" onclick="goodMovie('${movie.id}')">
                        <i class="fa-solid fa-thumbs-up">
                    </button>
                    <button class="thumbsDown-btn" onclick="badMovie('${movie.id}')">
                        <i class="fa-solid fa-thumbs-down">
                    </button>
                    <button class="bad-btn" onclick="deleteMovie('${movie.id}')">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            `)
        )
    });
}

$(".addMovie").click(() =>{
    const inputMovie = $("input").val();
    let newMovie = {
        title: inputMovie,
        type: "notReviewed",
    };
    if(inputMovie !== ""){
        movieCollection
            .add(newMovie)
            .then((response) =>{
                return response.get();
            })
            .then((response) =>{
                notReviewed.push(response);
                display();
                $("input").val("");
            });
    };
});

const awesomeMovie = (id) =>{
    let pushItem;
    notReviewed = notReviewed.filter((movie) =>{
        if(movie.id === id){
            pushItem = movie;
            movie.ref.delete();
        }
        return movie.id !== id;
    });
    thumbsUp = thumbsUp.filter((movie) =>{
        if(movie.id === id){
            pushItem = movie;
            movie.ref.delete();
        }
        return movie.id !== id;
    });
    bad = bad.filter((movie) =>{
        if(movie.id === id){
            pushItem = movie;
            movie.ref.delete();
        }
        return movie.id !== id;
    });
    movieCollection
        .add(awesomeAdd)
        .then((response) => {
            return response.get();
        })
        .then((response) =>{
            awesome.push(response);
            display();
        });
}

const thumbsupMovie = (id) =>{
    let pushItem;
    notReviewed = notReviewed.filter((movie) =>{
        if(movie.id === id){
            pushItem = movie;
            movie.ref.delete();
        }
        return movie.id !== id;
    });
    awesome = awesome.filter((movie) =>{
        if(movie.id === id){
            pushItem = movie;
            movie.ref.delete();
        }
        return movie.id !== id;
    });
    bad = bad.filter((movie) =>{
        if(movie.id === id){
            pushItem = movie;
            movie.ref.delete();
        }
        return movie.id !== id;
    });
    movieCollection
        .add(thumbsAdd)
        .then((response) => {
            return response.get();
        })
        .then((response) =>{
            thumbsUp.push(response);
            display();
        });
}

const badMovie = (id) =>{
    let pushItem;
    notReviewed = notReviewed.filter((movie) =>{
        if(movie.id === id){
            pushItem = movie;
            movie.ref.delete();
        }
        return movie.id !== id;
    });
    awesome = awesome.filter((movie) =>{
        if(movie.id === id){
            pushItem = movie;
            movie.ref.delete();
        }
        return movie.id !== id;
    });
    thumbsUp = thumbsUp.filter((movie) =>{
        if(movie.id === id){
            pushItem = movie;
            movie.ref.delete();
        }
        return movie.id !== id;
    });
    movieCollection
        .add(thumbsAdd)
        .then((response) => {
            return response.get();
        })
        .then((response) =>{
            bad.push(response);
            display();
        });
}

const deleteMovie = (id) =>{
    awesome = awesome.filter((movie) =>{
        if(movie.id === id){
            movie.ref.delete();
        }
        return movie.id !== id;
    });
    notReviewed = notReviewed.filter((movie) =>{
        if(movie.id === id){
            movie.ref.delete();
        }
        return movie.id !== id;
    });
    thumbsUp = thumbsUp.filter((movie) =>{
        if(movie.id === id){
            movie.ref.delete();
        }
        return movie.id !== id;
    });
    bad = bad.filter((movie) =>{
        if(movie.id === id){
            pushItem = movie;
            movie.ref.delete();
        }
        return movie.id !== id;
    });
    display();
}

$(document).ready(() => {
    initialize();
});