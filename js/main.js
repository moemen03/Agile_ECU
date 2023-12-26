

if(localStorage.getItem("uid") == null){
    window.location.href = "./loginRegister.html";
    
}else{
    // window.location.href = "./loginRegister.html";
}


// ^^^^^^^^^^^^^^
let signOutBtn = document.getElementById("signOut-btn");
signOutBtn.addEventListener('click', ()=>{
    localStorage.removeItem("uid");
    window.location.href = "./loginRegister.html";
})



//^^^^^^^^^^^^^^^^^^^^
let mylist=[];




// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// & https://covers.openlibrary.org/b/isbn/9782267011258-M.jpg  ==>> to get cover image
// & https://openlibrary.org/search.json?q=the+lord+of+the+rings ====>> to search about book
// & https://openlibrary.org/search/authors.json?q=j%20k%20rowling ===>> to search about author


/*
    <div class="arrivals_box col-lg-4">

        <div class="arrivals_card ">

            <div class="book">
                <span>
                    Author: JD.<br>
                    Chapters: 12 <br>
                    Cost: 12$
                </span>
                <div class="cover">
                    <img src="image/arrival21.jpeg">
                </div>
            </div>



        </div>
    </div>
*/

let search_input = document.getElementById("searchInput");
let featured_book=  document.getElementById("featured_book");
let lds_roller = document.querySelector(".lds-roller");
let final = "";

async function dede(){
    // featured_book.innerHTML = `<div id="lds-roller" class="lds-roller col-md-12 d-flex h-100 align-items-center justify-content-center d-none"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>`;

    var delayInMilliseconds = 1500; //1.5 second

    await setTimeout(function() {
    //your code to be executed after 1.5 second
    }, delayInMilliseconds);

    await searchByLetter(search_input.value);

    
}



async function searchByLetter(temp){
    // console.log(temp);
    lds_roller.classList.remove("d-none");
    lds_roller.classList.add("d-block");
    let res = await fetch(`https://openlibrary.org/search.json?q=${temp}`);
    res = await res.json();
    data= res.docs.slice(0,15);
    // console.log(res);
    console.log(data);
    
    displayBook(data);
    lds_roller.classList.add("d-none");
    lds_roller.classList.remove("d-block");

}
// searchByLetter();
let cover_i = "";
// console.log(lds_roller);
async function displayBook(data){


    let res_name = "";
    let cost = "";
    let number_of_pages_median=12;
    for(let i = 0; i < data.length; i++){
        console.log("meow");
        res_name =data[i].author_name[0];
        // cover_i = data[i].cover_i?:;
        if(data[i].cover_i){
            cover_i=`https://covers.openlibrary.org/b/id/${data[i].cover_i}-M.jpg`
        }else{
            continue;
        }


        number_of_pages_median = data[i].number_of_pages_median
        cost = Math.floor(Math.random()*20) 
        final += `    
                <div class="arrivals_box col-lg-3">

                <div class="arrivals_card ">

                    <div class="book">
                        <span>
                            Author: ${res_name}<br>
                            Pages: ${number_of_pages_median} <br>
                            Cost: ${cost+20}$
                        </span>
                        <div class="cover">
                            <img src="${cover_i}">
                        </div>
                    </div>

                </div>
            </div>
            `
            featured_book.innerHTML = final;

        final!=""?lds_roller.classList.add("d-none"):lds_roller.classList.remove("d-block");
    }
    

}


// & https://covers.openlibrary.org/b/olid/OL43117054M-M.jpg

let arrivals = document.getElementById("arrivalss");

async function displayBooks(){
    let res = await fetch(`https://openlibrary.org/people/mekBot/books/already-read.json`);;
    res = await res.json();
    // console.log(res.reading_log_entries.slice(0,25));
    displayBook_arrival(res.reading_log_entries.slice(0,25));
}
displayBooks()

async function displayBook_arrival(data){

    let title = "";
    let cover_i = "";
    let author_name = "";
    let finn=``;
    // console.log(data[0].work.author_name);
    for(let i = 0; i < data.length; i++){
        // console.log("meow");
        author_name =data[i].work.author_names[0];
        // console.log(author_name);
        title =data[i].work.title;
        cover_i = data[i].work.cover_edition_key;

        finn +=`    
                <div class="arrivals_box col-lg-3">

                <div class="arrivals_card ">

                    <div class="book">
                        <span>
                            Title: ${title}<br>
                            Author: ${author_name}<br>
                        </span>
                        <div class="cover">
                            <img src="https://covers.openlibrary.org/b/olid/${cover_i}-M.jpg">
                        </div>
                    </div>

                </div>
            </div>
            `
        // cover_i = data[i].cover_i?:;
        // if(data[i].cover_i){
        //     cover_i=`https://covers.openlibrary.org/b/id/${data[i].cover_i}-M.jpg`
        // }else{
        //     continue;
        // }

        arrivals.innerHTML = finn;

}
}





document.getElementById("signOut-btn").addEventListener('click',()=>{
    localStorage.removeItem("uid");
    // window.location.href = "./index.html";
})