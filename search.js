document.addEventListener("DOMContentLoaded", function () {
    const searchForm = document.getElementById("search-form");
    const resultsContainer = document.getElementById("results");
    const loader = document.getElementById("loader"); // Get the loader element

    searchForm.addEventListener("submit", function (e) {
        e.preventDefault(); // Prevent the form from submitting normally

        // Show the loader when the form is submitted
        loader.style.display = "block";

        // Get the input values
        const name = document.getElementById("name").value.trim();
        const letter = document.getElementById("letter").value.trim();

        // Perform the search based on the user's input
        fetchMeals(name, letter);
    });

    function fetchMeals(name, letter) {
        // Clear previous search results
        resultsContainer.innerHTML = "";

        // Construct the MealDB API URL to retrieve all meals
        const apiUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + name;

        // Fetch meals from the MealDB API
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                // ... Rest of your code ...

                // Hide the loader after 8 seconds
                setTimeout(function () {
                    loader.style.display = "none";
                }, 8000); // 8000 milliseconds (8 seconds)
            })
            .catch((error) => {
                console.error("Error fetching meals:", error);
            });
    }
    // Function to display meal details
  // Function to display meal details
function displayMealDetails(mealId) {
    const mealDetailsUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;

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
                modalTitle.textContent = meal.strMeal;

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

                // Display meal details content here
                mealDetailsDiv.innerHTML = `
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="img-fluid">
                    <h5>Instructions:</h5>
                    <p>${meal.strInstructions}</p>
                    <h5>Category:</h5>
                    <p>${meal.strCategory}</p>
                    <h5>Area:</h5>
                    <p>${meal.strArea}</p>
                    <h5>Tags:</h5>
                    <p>${meal.strTags}</p>
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

});
