document.addEventListener("DOMContentLoaded", function () {
    const categoryList = document.getElementById("category-list");

    // Fetch meal categories from the API
    fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
        .then((response) => response.json())
        .then((data) => {
            const categories = data.categories;

            if (categories) {
                let currentRow = null;

                categories.forEach((category, index) => {
                    if (index % 4 === 0) {
                        // Create a new row container for every 4 categories
                        currentRow = document.createElement("div");
                        currentRow.classList.add("row");
                        categoryList.appendChild(currentRow);
                    }

                    // Create elements to display the category information
                    const categoryDiv = document.createElement("div");
                    categoryDiv.classList.add("container","category", "col-md-3", "col-sm-6");

                    const categoryImage = document.createElement("img");
                    categoryImage.src = category.strCategoryThumb;
                    categoryImage.alt = category.strCategory;
                    categoryImage.classList.add("w-100");

                    const categoryLayer = document.createElement("div");
                    categoryLayer.classList.add("category-layer", "position-absolute", "bg-light", "text-center");
                    categoryLayer.textContent = category.strCategory;

                    // Add hover effect to display category name
                    categoryImage.addEventListener("mouseenter", function () {
                        categoryLayer.style.display = "block";
                    });

                    categoryImage.addEventListener("mouseleave", function () {
                        categoryLayer.style.display = "none";
                    });

                    // Add click event to display meals in the category
                    categoryDiv.addEventListener("click", function () {
                        displayMealsInCategory(category.strCategory);
                    });

                    // Append the category information to the category list
                    categoryDiv.appendChild(categoryImage);
                    categoryDiv.appendChild(categoryLayer);
                    currentRow.appendChild(categoryDiv);
                });
            } else {
                categoryList.innerHTML = "No categories found.";
            }
        })
        .catch((error) => {
            console.error("Error fetching categories:", error);
        });
});


// Function to display meals in a specific category
function displayMealsInCategory(categoryName) {
    // Clear the category list
    const categoryList = document.getElementById("category-list");
    categoryList.innerHTML = "";

    // Fetch meals from the API based on the category name
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`)
        .then((response) => response.json())
        .then((data) => {
            const meals = data.meals;

            if (meals) {
                meals.forEach((meal) => {
                    // Create elements to display the meal information
                    const mealDiv = document.createElement("div");
                    mealDiv.classList.add("meal");

                    const mealName = document.createElement("h2");
                    mealName.textContent = meal.strMeal;

                    const mealImage = document.createElement("img");
                    mealImage.src = meal.strMealThumb;

                    // Create a button to show meal details
                    const viewButton = document.createElement("button");
                    viewButton.textContent = "View Details";
                    viewButton.classList.add("view-details-button");

                    viewButton.addEventListener("click", function () {
                        // Show meal details when the button is clicked
                        displayMealDetails(meal.idMeal);
                    });

                    mealDiv.appendChild(mealName);
                    mealDiv.appendChild(mealImage);
                    mealDiv.appendChild(viewButton);

                    // Append the meal information to the results container
                    categoryList.appendChild(mealDiv);
                });
            } else {
                categoryList.innerHTML = "No meals found in this category.";
            }
        })
        .catch((error) => {
            console.error("Error fetching meals:", error);
        });
}

// Function to display meal details
function displayMealDetails(mealId) {
    // Construct the MealDB API URL to retrieve meal details based on the mealId
    const mealDetailsUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;

    // Fetch meal details from the API
    fetch(mealDetailsUrl)
        .then((response) => response.json())
        .then((data) => {
            const meal = data.meals[0];

            if (meal) {
                // Create a modal to display meal details
                const modal = document.createElement("div");
                modal.classList.add("modal", "fade");
                modal.id = "mealModal";
                modal.setAttribute("tabindex", "-1");
                modal.setAttribute("aria-labelledby", "mealModalLabel");
                modal.setAttribute("aria-hidden", "true");

                const modalDialog = document.createElement("div");
                modalDialog.classList.add("modal-dialog", "modal-dialog-centered");

                const modalContent = document.createElement("div");
                modalContent.classList.add("modal-content");

                const modalHeader = document.createElement("div");
                modalHeader.classList.add("modal-header");

                const modalTitle = document.createElement("h5");
                modalTitle.classList.add("modal-title");
                modalTitle.textContent = "Meal Details";

                const closeButton = document.createElement("button");
                closeButton.type = "button";
                closeButton.classList.add("close");
                closeButton.setAttribute("data-dismiss", "modal");
                closeButton.setAttribute("aria-label", "Close");

                const closeIcon = document.createElement("span");
                closeIcon.setAttribute("aria-hidden", "true");
                closeIcon.innerHTML = "&times;";

                closeButton.appendChild(closeIcon);
                modalHeader.appendChild(modalTitle);
                modalHeader.appendChild(closeButton);

                const modalBody = document.createElement("div");
                modalBody.classList.add("modal-body");

                const mealDetailsDiv = document.createElement("div");

                // Add meal details content here as needed
                // For example, you can display meal name, instructions, ingredients, etc.

                mealDetailsDiv.innerHTML = `
                    <h2>${meal.strMeal}</h2>
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="w-100">
                    <p>Category: ${meal.strCategory}</p>
                    <p>Area: ${meal.strArea}</p>
                    <p>Instructions: ${meal.strInstructions}</p>
                    <p>Ingredients:</p>
                    <ul>
                        <li>${meal.strIngredient1}</li>
                        <li>${meal.strIngredient2}</li>
                        <!-- Add more ingredients as needed -->
                    </ul>
                `;

                modalBody.appendChild(mealDetailsDiv);

                modalContent.appendChild(modalHeader);
                modalContent.appendChild(modalBody);

                modalDialog.appendChild(modalContent);

                modal.appendChild(modalDialog);

                // Append the modal to the body and show it
                document.body.appendChild(modal);
                $("#mealModal").modal("show");
            }
        })
        .catch((error) => {
            console.error("Error fetching meal details:", error);
        });
}
