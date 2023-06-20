const input = document.getElementById('input_field');
const post_container =document.getElementById('poster_container');
const search = document.getElementById("search_icon");
const favourite_list = document.getElementById("watchlist");
const plus = document.querySelector(".plus");
const home =document.querySelector(".home");

// pre search poster id.....

const arr=['tt5971474',"tt3896198","tt12915716","tt5090568","tt1630029","tt4154796","tt10872600","tt13353462","tt1345836","tt10838180"];
const status1="+  Favourite";
const status2="Remove";
let print =1;


// favourite list ....
let fav =[];

// show movie using id....
 async function fetchdata(id,status){

    await fetch(`https://www.omdbapi.com/?i=${id}&apikey=ad538ff1`).then((res)=>{
        return res.json();
    }).then((result)=>{
        if(print ==1)
        {

            let after =document.createElement("div");
                    after.classList.add("poster_box");
                    
                    after.innerHTML=`
                    <div id="${id}" class="poster" onclick="show_details(this)">
                        <img id="poster_img" src="${result.Poster}" alt="poster not available now">
                    </div>
                    <div class="rating">
                        <i class="fa-solid fa-star"></i>
                        <span id="movie_rating">${result.imdbRating}</span>
                        <i class="fa-regular fa-star"></i>
                    </div>
                    <div class="title">${result.Title}</div>
                    <div id ="${id}" class="favourite" onclick="favourite_add(this)">${status}</div>`;
                
                    poster_container.appendChild(after);
        }else{
            post_container.innerHTML=`<div class="details">
            <img class="detail_poster" src="${result.Poster}" alt="">
            <div class="description"><h2>${result.Title}</h2><br><br>${result.Genre}<br><br>${result.Plot}<br><br>Directors :&nbsp &nbsp ${result.Director}<br><br>Actors  : &nbsp &nbsp${result.Actors}<br><br>Language : &nbsp &nbsp ${result.Language}<br><br>Released : &nbsp &nbsp ${result.Released}</div>
            <div id="back" onclick="back()">Back</div>
        </div>`

        }

    }).catch((err)=>{
        console.log(err);
    })
}

// render movie list....
function render(arr,status){
    post_container.innerHTML="";
    arr.forEach((id)=>{
        fetchdata(id,status);
    })
 }

//  initialize render list....
render(arr,status1);



// search movie id function...

function searchid(name){
    fetch(`https://www.omdbapi.com/?s=${input.value}&apikey=ad538ff1`).then((res)=>{
        return res.json();
    }).then((result)=>{
        post_container.innerHTML="";
        let length=result.Search.length;

        for( let i=0;i<length;i++)
            {
                fetchdata(result.Search[i].imdbID,status1);
            }
        
    }).catch((err)=>{
        console.log("error come..")
        console.log(err);
        post_container.innerHTML="<h1>Result not found</h1>"

    })
}
// favourite addd...
function favourite_add(element){

    let index =-1;
    for(let i=0;i<fav.length;i++)
    {
        if(fav[i]==element.id){
            if(element.textContent==status1)
            {
                alert("already added this movie...");
                return;
            }else if(element.textContent==status2)
            {
                index=i;
                fav.splice(i,1);
                if(fav.length==0)
                {
                    post_container.innerHTML='<h2>NO record found</h2>';
                }else{

                    render(fav,status2);
                }
            }
        }
    }
    if(index==-1){
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
    if(fav.length==0)
    {
        post_container.innerHTML='<h2>NO record found</h2>';
    }else{

        render(fav,status2);
    }
}
home.onclick=()=>{
    print =1;
    render(arr,status1);
}
function show_details(e){
print=2;
fetchdata(e.id);
}

function back(){
    print =1;
    render(arr,status1);
}
