let url = "https://www.themealdb.com/api/json/v1/1/random.php"

async function getRandomMeal(){
    try{
        let res = await axios.get(url)
        let data = await res.data
        console.log(data)
        let meal = data.meals[0]
        console.log()
        console.log(meal.strMealThumb)
        let randommealdetails = `<div>
        <img src="${meal.strMealThumb}" alt="" class="randomealimg">
    </div>
    <p>${meal.strMeal}</p>`
    document.getElementById("card").innerHTML=randommealdetails

    function openModal() {
        document.getElementById('popup').style.display = 'flex';   
        let ingredients = `<img src="${meal.strMealThumb}" alt="" class="popupimage">
        <p class="popuptext">`;

        for (let i=1;i<20;i++) {
            // let ingredient = meal.strIngredient
            let ingredient = meal[`strIngredient${i}`];
            let measure = meal[`strMeasure${i}`];
            // Checining  if both strIngredient and strMeasure are not empty
            if (ingredient && measure) {
                ingredients += `${ingredient}: ${measure} <br>`;
            }
        }

        ingredients+=`</p>`
        document.getElementById("modalcontent").innerHTML = ingredients
    }

    let randomMealCard = document.getElementById("card")
    randomMealCard.onclick=()=>{
        openModal()
    }
    
    }
    catch{(err)=>{
        console.error("Error:",err)
    }
}
}
getRandomMeal() 

const url1 = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

async function getMealBySearch(value) {
    try {
        let url2 = url1 + `${value}`;
        let res = await fetch(url2);
        let data = await res.json();

        let allMeals = data.meals;
        let output = "";

        if(allMeals==null){
            document.getElementById("categories").style.display="block"
            document.getElementById("categories").innerHTML = "No Such Results Found.Please try another";
        }
        else {
        for (let i = 0; i < allMeals.length; i++) {
            let meal = allMeals[i];
            output += `<div class="card" onclick="openSearchModal(${i})">
                <img src="${meal.strMealThumb}" alt="" class="img">
                <p>${meal.strMeal}</p>
            </div>`;

            // Append modal content for each search result meal
            output += `<div id="searchModal${i}" class="modal">
                <div class="modal-content">
                <div class="modal-header flex">
                <h2> Ingredients </h2>
                    <span class="close" onclick="closeSearchModal(${i})">&times;</span>
                    </div>
                    <div class="flex" id="modalcontent">
                    <img src="${meal.strMealThumb}" alt="" class="popupimage">
                    <p class="popuptext">`;

            for (let j = 1; j < 20; j++) {
                let ingredient = meal[`strIngredient${j}`];
                let measure = meal[`strMeasure${j}`];

                if (ingredient && measure) {
                    output += `${ingredient}: ${measure} <br>`;
                }
            }

            output += `</p>
            </div>
                </div>
            </div>`;
        }
        
        document.getElementById("categories").innerHTML = output;
    }
        document.getElementById("categories").focus()
        document.getElementById("categories").scrollIntoView({
            behavior:'smooth',
            block:'start',
        })


    } catch (err) {
        console.error("Error:", err);
    }
}

// Open modal for a specific search result meal
function openSearchModal(index) {
    document.getElementById(`searchModal${index}`).style.display = 'flex';
}

// Close modal for a specific search result meal
function closeSearchModal(index) {
    document.getElementById(`searchModal${index}`).style.display = 'none';
}

document.getElementById("Searchbox").addEventListener("keypress", (e) => {
    let value = e.target.value;

    if (e.key === 'Enter' && value!=='') {
        getMealBySearch(value);
        }
    else {
        document.getElementById("categories").innerHTML = "";
    }
});


function closeModal() {
    document.getElementById('popup').style.display = 'none';
}

