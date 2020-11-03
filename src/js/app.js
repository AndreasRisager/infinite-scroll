// var options = {
//     threshold: [0.5, 0.7, 0.9]
// }

// function callback(entries){
//     var { target, intersectionRatio } = entries[0];

//     if(intersectionRatio >= 0.5) {
//         target.querySelector(".mySection").style.opacity = "1";
//         target.querySelector(".mySection").style.transform = "translateX(0)";
//     } else {
//         target.querySelector(".mySection").style.opacity = "0";
//         target.querySelector(".mySection").style.transform = "translateX(-100%)";
//     }
//     if(intersectionRatio >= 0.7) {
//         target.querySelector(".myFigure").style.opacity = "1";
//         target.querySelector(".myFigure").style.transform = "translateX(0)";
//     } else {
//         target.querySelector(".myFigure").style.opacity = "0";
//         target.querySelector(".myFigure").style.transform = "translateX(-100%)";
//     }
//     if(intersectionRatio >= 0.9) {
//         target.querySelector(".myArticle").style.opacity = "1";
//         target.querySelector(".myArticle").style.transform = "translateX(0)";
//     } else {
//         target.querySelector(".myArticle").style.opacity = "0";
//         target.querySelector(".myArticle").style.transform = "translateX(-100%)";
//     }
// }

// var intObserver = new IntersectionObserver(callback, options)

// intObserver.observe( document.querySelector("main") );

var offset = 0;
var count;

function getPoke(offset){
    fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=10`)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        let pokeList = document.querySelector(".pokeList");
        count = data.count;

        data.results.forEach(result => {
            let pokeName = document.createElement("li");
            pokeName.innerText = result.name;
            pokeList.appendChild(pokeName);
        });
        var lastChild = document.querySelector(".pokeList li:last-child");

        observer.observe(lastChild)
    })
}

var observer = new IntersectionObserver(function(entries){
    if(entries[0].intersectionRatio <= 0) return;
        observer.unobserve(entries[0].target);
        offset = offset + 10

        if(offset > count) return;

        getPoke(offset);
}, {
    threshold: 1
})
getPoke(offset);