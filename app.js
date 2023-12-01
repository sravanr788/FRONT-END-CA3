let url = "https://www.themealdb.com/api/json/v1/1/random.php"
// fetching a random meal from the API and displaying its details

async function getRandomMeal(){
    try{
        let res = await axios.get(url)
        let data = await res.data
        console.log(data)
        // extracting details of the first meal from the response
        let meal = data.meals[0]
        console.log()
        console.log(meal.strMealThumb)
        // Creating HTML content for the random meal and displaying it in 'card' element
        let randommealdetails = `<div>
        <img src="${meal.strMealThumb}" alt="" class="randomealimg">
    </div>
    <p>${meal.strMeal}</p>`
    document.getElementById("card").innerHTML=randommealdetails
       // Function to open a modal with ingredients when the card of random meal is clicked
    function openModal() {
        document.getElementById('popup').style.display = 'flex';   
        let ingredients = `<img src="${meal.strMealThumb}" alt="" class="popupimage">
        <p class="popuptext">`;
            // Looping through ingredients and measures and adding them to the modal content
        for (let i=1;i<20;i++) {
            let ingredient = meal[`strIngredient${i}`];
            let measure = meal[`strMeasure${i}`];
            // Checking  if both strIngredient and strMeasure are not empty
            if (ingredient && measure) {
                ingredients += `${ingredient}: ${measure} <br>`;
            }
        }

        ingredients+=`</p>`
        document.getElementById("modalcontent").innerHTML = ingredients
    }
      // Attaching the 'openModal' function when  random meal is clicked
    let randomMealCard = document.getElementById("card")
    randomMealCard.onclick=()=>{
        openModal()
    }
    
    }
    catch{(err)=>{
        // handling any errors that occur during the process    
        console.error("Error:",err)
    }
}
}
getRandomMeal() 

const url1 = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
// function to get meals by search value and displaying them
async function getMealBySearch(value) {
    try {
        // making the search URL based on the user's input
        let url2 = url1 + `${value}`;
        let res = await fetch(url2);
        let data = await res.json();

        let allMeals = data.meals;
        let output = "";
// Checking if no meals are found and displaying a message
        if(allMeals === null){
            document.getElementById("categories").style.display="block"
            document.getElementById("categories").innerHTML = "No Such Results Found.Please try again with another dish";
        }
        else if(allMeals!=null){
   // generating HTML content for each search result and displaying in 'categories' element
            document.getElementById("categories").style.display="grid"
        for (let i = 0; i < allMeals.length; i++) {
            let meal = allMeals[i];
            output += `<div class="card" onclick="openSearchModal(${i})">
                <img src="${meal.strMealThumb}" alt="" class="img">
                <p>${meal.strMeal}</p>
            </div>`;

            // Appending modal content for each search result meal
            output += `<div id="searchModal${i}" class="modal">
                <div class="modal-content">
                <div class="modal-header flex">
                <h2> Ingredients </h2>
                    <span class="close" onclick="closeSearchModal(${i})">&times;</span>
                    </div>
                    <div class="flex" id="modalcontent">
                    <img src="${meal.strMealThumb}" alt="" class="popupimage">
                    <p class="popuptext">`;

       // Loop through ingredients and measures and add them to the modal content
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
        // Displaying the search results in the 'categories' element
        document.getElementById("categories").innerHTML = output;
    }

        // Focusing on 'categories' and scroll it into view smoothly on search
        document.getElementById("categories").focus()
        document.getElementById("categories").scrollIntoView({
            behavior:'smooth',
            block:'start',
        })


    } catch (err) {
       //to Handle any errors that occur during the process
        console.error("Error:", err);
    }
}

// function to open modal for a specific search result meal
function openSearchModal(index) {
    document.getElementById(`searchModal${index}`).style.display = 'flex';
}

//function to  close modal for a specific search result meal
function closeSearchModal(index) {
    document.getElementById(`searchModal${index}`).style.display = 'none';
}

document.getElementById("Searchbox").addEventListener("keypress", (e) => {
    let value = e.target.value;
      // Checking if Enter key is pressed and the input value is not empty
    if (e.key === 'Enter' && value!=='') {
        getMealBySearch(value);
        }
    else {
        document.getElementById("categories").innerHTML = "";
    }
});

// function to close the modal
function closeModal() {
    document.getElementById('popup').style.display = 'none';
}

