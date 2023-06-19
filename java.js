const input = document.getElementById('input_field');
const post_container =document.getElementById('post_container');

// pre search poster id.....
const arr=['tt5971474',"tt3896198","tt12915716","tt5090568","tt1630029","tt4154796","tt10872600","tt13353462","tt1345836","tt10838180","tt0910970","tt1201607"];

 function fetchdata(id){

     fetch(`https://www.omdbapi.com/?i=${id}&apikey=ad538ff1`).then((res)=>{
        return res.json();
    }).then((result)=>{
        let after =document.createElement("div");
                after.classList.add("poster_box");
                
                after.innerHTML=`
                <div class="poster">
                    <img id="poster_img" src="${result.Poster}" alt="poster not available now">
                </div>
                <div class="rating">
                    <i class="fa-solid fa-star"></i>
                    <span id="movie_rating">${result.imdbRating}</span>
                    <i class="fa-regular fa-star"></i>
                </div>
                <div class="title">${result.Title}</div>
                <div class="favourite">+ Favourite</div>`;
            
                poster_container.appendChild(after);

    })
}

 function render(){
    arr.forEach((id)=>{
        fetchdata(id);
    })
 }

render();
