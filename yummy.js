// loader and diplay meals
$(document).ready(function () {
    const loader = $("#loader");
  
    // Function to fetch and display meals
    function fetchAndDisplayMeals() {
      const apiUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
  
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          const meals = data.meals;
  
          if (meals) {
            const mealsContainer = $("#meals-container .row");
            mealsContainer.empty(); // Clear previous content
  
            meals.forEach((meal, index) => {
              if (index % 4 === 0) {
                // Create a new row container for every 4 meals
                mealsContainer.append('<div class="row gy-5"></div>');
              }
  
              const mealItem = $(`
                <div class=" container meal col-md-3 col-sm-6">
                  <div class="item position-relative">
                    <img src="${meal.strMealThumb}" class="w-100" alt="${meal.strMeal}" id="mealPic" />
                    <div class="meal-layer position-absolute bg-light text-center">
                      <h2 class="meal-name">${meal.strMeal}</h2>
                      <p class="meal-id">${meal.idMeal}</p> <!-- Add the meal ID -->
                      <button class="btn btn-primary btn-sm mt-2" onclick="showMealDetails('${meal.idMeal}')">View Details</button>
                    </div>
                  </div>
                </div>
              `);
  
              // Append the meal item to the last row container
              mealsContainer.children().last().append(mealItem);
            });
  
            // Hide the loader after 8 seconds
            setTimeout(function () {
              loader.fadeOut(500);
              $("body").css("overflow", "visible");
            }, 8000);
          } else {
            console.error("No meals found.");
          }
        })
        .catch((error) => {
          console.error("Error fetching meals:", error);
        });
    }
  
    // Call the function to fetch and display meals when the page loads
    fetchAndDisplayMeals();
  });
  
// end  loader and diplay meals


//   start nav
  // JQuery for the side-Nav
  function openSideNav() {
    $(".side-nav-menu").animate({
      left: 0
    }, 500);
  
    $(".open-close-icon").removeClass("fa-align-justify");
    $(".open-close-icon").addClass("fa-x");
  
    for (let i = 0; i < 5; i++) {
      $(".links li").eq(i).animate({
        top: 0
      }, (i + 5) * 100);
    }
  }
  
  function closeSideNav() {
    let boxWidth = $(".side-nav-menu .nav-tab").outerWidth();
    $(".side-nav-menu").animate({
      left: -boxWidth
    }, 500);
  
    $(".open-close-icon").addClass("fa-align-justify");
    $(".open-close-icon").removeClass("fa-x");
  
    $(".links li").animate({
      top: 300
    }, 500);
  }
  
  closeSideNav();
  
  $(".side-nav-menu i.open-close-icon").click(() => {
    if ($(".side-nav-menu").css("left") == "0px") {
      closeSideNav();
    } else {
      openSideNav();
    }
  });
//   end nav

// start displaying deatalis of meals

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
// end displaying deatalis of   meals