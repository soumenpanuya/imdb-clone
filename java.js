const input = document.getElementById('input_field');
const post_container =document.getElementById('poster_container');
const search = document.getElementById("search_icon");
const favourite_list = document.getElementById("watchlist");

// pre search poster id.....

const arr=['tt5971474',"tt3896198","tt12915716","tt5090568","tt1630029","tt4154796","tt10872600","tt13353462","tt1345836","tt10838180","tt0910970","tt1201607"];

// favourite list ....
let fav =[];

// show movie using id....
 async function fetchdata(id){

    await fetch(`https://www.omdbapi.com/?i=${id}&apikey=ad538ff1`).then((res)=>{
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
                <div id ="${id}" class="favourite" onclick="favourite_add(this)">+ Favourite</div>`;
            
                poster_container.appendChild(after);

    }).catch((err)=>{
        console.log(err);
    })
}

// render movie list....
function render(arr){
    post_container.innerHTML="";
    arr.forEach((id)=>{
        fetchdata(id);
    })
 }

render(arr);


// search movie id function...

function searchid(name){
    fetch(`https://www.omdbapi.com/?s=${input.value}&apikey=ad538ff1`).then((res)=>{
        return res.json();
    }).then((result)=>{
        post_container.innerHTML="";
        let length=result.Search.length;

        for( let i=0;i<length;i++)
            {
                fetchdata(result.Search[i].imdbID);
            }
        
    }).catch((err)=>{
        console.log("error come..")
        console.log(err);
        post_container.innerHTML="<h1>Result not found</h1>"

    })
}

function favourite_add(element){
    let present=false;
    fav.forEach((id)=>{
        if(id==element.id)
        {
            alert("already added this movie...");
            present=true;
            return;
        }
    })
    if(!present){
        fav.push(element.id);
    }
}

// search event....
search.onclick=()=>{
    if(input.value!="")
    {
     searchid(input.value);
    }
}
document.onkeyup= (e)=>{
    if(e.key=="Enter")
    {
        if(input.value!=""){

            searchid(input.value);
        }
    }
}

favourite_list.onclick=()=>{
    render(fav);
}