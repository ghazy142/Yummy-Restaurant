document.addEventListener("DOMContentLoaded", () => {
    const areaList = document.getElementById("areaList");
    const mealList = document.getElementById("mealList");

// Function to fetch and display meals by area
function fetchAndDisplayMealsByArea(area) {
    // Clear the previous areas and meals
    areaList.innerHTML = '';
    mealList.innerHTML = '';

    // Fetch meals by area from the API
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
        .then((response) => response.json())
        .then((data) => {
            const meals = data.meals;

            if (meals) {
                meals.forEach((meal) => {
                    const mealItem = document.createElement("div");
                    mealItem.classList.add("container", "meal", "col-md-3", "col-sm-6");
                    mealItem.innerHTML = `
                        <div class="item position-relative">
                            <img src="${meal.strMealThumb}" class="w-100" alt="${meal.strMeal}" id="mealPic" />
                            <div class="meal-layer position-absolute bg-light text-center">
                                <h2 class="meal-name">${meal.strMeal}</h2>
                                <p class="meal-id">${meal.idMeal}</p>
                                <button class="btn btn-primary btn-sm mt-2">View Details</button>
                            </div>
                        </div>
                    `;

                    // Attach a click event listener to the "View Details" button
                    const viewDetailsButton = mealItem.querySelector(".btn");
                    viewDetailsButton.addEventListener("click", () => {
                        showMealDetails(meal.idMeal);
                    });

                    mealList.appendChild(mealItem);
                });
            } else {
                console.error("No meals found for the selected area.");
            }
        })
        .catch((error) => {
            console.error("Error fetching meals by area:", error);
        });
}

    // Event delegation to handle area clicks
    areaList.addEventListener("click", (event) => {
        if (event.target.tagName === "H5") {
            const selectedArea = event.target.textContent;
            fetchAndDisplayMealsByArea(selectedArea);
        }
    });

    // Initial fetch of areas
    fetchAreas();
});

// Function to fetch areas from the API
function fetchAreas() {
    fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list")
        .then((response) => response.json())
        .then((data) => {
            const areas = data.meals;

            if (areas) {
                areas.forEach((area) => {
                    const listItem = document.createElement("div");
                    listItem.classList.add("col-12", "mb-3");
                    listItem.innerHTML = `
                        <div class="card" style="cursor: pointer;">
                            <div class="card-body">
                                <h5 class="card-title">${area.strArea}</h5>
                            </div>
                        </div>
                    `;
                    areaList.appendChild(listItem);
                });
            } else {
                console.error("No areas found.");
            }
        })
        .catch((error) => {
            console.error("Error fetching areas:", error);
        });


}

// Function to show meal details in the modal
function showMealDetails(mealId) {
    const modal = $("#mealModal");
    const mealDetails = $("#mealDetails");
  
    // Fetch meal details using the mealId
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
      .then((response) => response.json())
      .then((data) => {
        const meal = data.meals[0];
  
        // Populate the modal with meal details
        mealDetails.html(`
          <img src="${meal.strMealThumb}" class="w-100 mb-3" alt="${meal.strMeal}" />
          <h2>${meal.strMeal}</h2>
          <p>Category: ${meal.strCategory}</p>
          <p>Area: ${meal.strArea}</p>
          <p>Instructions: ${meal.strInstructions}</p>
          <p>Ingredients: ${getIngredientsList(meal)}</p>
          <p>Tags: ${meal.strTags}</p>
          <a href="${meal.strSource}" class="btn btn-primary" target="_blank">Source</a>
          <a href="${meal.strYoutube}" class="btn btn-danger" target="_blank">YouTube</a>
        `);
  
        // Show the modal
        modal.modal("show");
      })
      .catch((error) => {
        console.error("Error fetching meal details:", error);
      });
  }
  
    // Function to get ingredients list
    function getIngredientsList(meal) {
        let ingredientsList = "";
        for (let i = 1; i <= 20; i++) {
          const ingredient = meal[`strIngredient${i}`];
          const measure = meal[`strMeasure${i}`];
          if (ingredient && measure) {
            ingredientsList += `${ingredient} (${measure}), `;
          } else if (ingredient) {
            ingredientsList += `${ingredient}, `;
          }
        }
        // Remove the trailing comma and space
        ingredientsList = ingredientsList.replace(/, $/, "");
        return ingredientsList;
      }
