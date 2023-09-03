// Define the API URL for fetching main ingredients
const apiUrlIngredients = "https://www.themealdb.com/api/json/v1/1/list.php?i=list";

// Function to fetch and display main ingredients with at least one meal
function fetchAndDisplayIngredientsWithMeals() {
    const ingredientList = document.getElementById("ingredientList");

    fetch(apiUrlIngredients)
        .then((response) => response.json())
        .then((data) => {
            const ingredients = data.meals;

            if (ingredients) {
                ingredients.forEach((ingredient) => {
                    // Create an ingredient item
                    const ingredientItem = document.createElement("div");
                    ingredientItem.classList.add("col-md-3", "col-sm-6", "ingredient-item", "clickable");

                    // Add the ingredient name to the item
                    const ingredientName = document.createElement("p");
                    ingredientName.textContent = ingredient.strIngredient;

                    // Add a click event listener to each ingredient item
                    ingredientItem.addEventListener("click", () => {
                        // When clicked, clear the page and display meals with this ingredient
                        clearPageAndDisplayMeals(ingredient.strIngredient);
                    });

                    // Append the ingredient name to the item
                    ingredientItem.appendChild(ingredientName);

                    // Append the ingredient item to the ingredientList
                    ingredientList.appendChild(ingredientItem);
                });
            } else {
                console.error("No ingredients found.");
            }
        })
        .catch((error) => {
            console.error("Error fetching ingredients:", error);
        });
}

// Call the function to fetch and display ingredients with meals when the page loads
fetchAndDisplayIngredientsWithMeals();

// Function to check if there are meals associated with an ingredient
async function hasMeals(ingredient) {
    // Fetch meals by ingredient
    const response = await fetch("https://www.themealdb.com/api/json/v1/1/filter.php?i=" + ingredient);
    const data = await response.json();
    return data.meals && data.meals.length > 0;
}

// Function to clear the page and display meals with the selected ingredient
function clearPageAndDisplayMeals(selectedIngredient) {
    const ingredientList = document.getElementById("ingredientList");
    const mealsContainer = document.getElementById("meals-container");

    // Clear the ingredient list
    ingredientList.innerHTML = "";

    // Hide the ingredient list container
    ingredientList.style.display = "none";

    // Fetch and display meals with the selected ingredient
    fetchMealsByIngredient(selectedIngredient)
        .then((meals) => {
            if (meals.length > 0) {
                meals.forEach((meal) => {
                    // Create a meal item
                    const mealItem = document.createElement("div");
                    mealItem.classList.add("col-md-3", "col-sm-6", "meal-item");

                    // Add the meal image to the item
                    const mealImage = document.createElement("img");
                    mealImage.src = meal.strMealThumb;
                    mealItem.appendChild(mealImage);

                    // Add the meal name to the item
                    const mealName = document.createElement("p");
                    mealName.textContent = meal.strMeal;
                    mealItem.appendChild(mealName);

                    // Add the meal details (you can customize this)
                    const mealDetails = document.createElement("p");
                    mealDetails.textContent = "Details: " + meal.strInstructions;
                    mealItem.appendChild(mealDetails);

                    // Append the meal item to the mealsContainer
                    mealsContainer.appendChild(mealItem);
                });
            } else {
                console.error("No meals found with this ingredient.");
            }
        })
        .catch((error) => {
            console.error("Error fetching meals:", error);
        });
}

// Function to fetch meals by ingredient
async function fetchMealsByIngredient(ingredient) {
    const response = await fetch("https://www.themealdb.com/api/json/v1/1/filter.php?i=" + ingredient);
    const data = await response.json();
    return data.meals || [];
}
