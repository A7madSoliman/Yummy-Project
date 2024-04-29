let rowData = document.getElementById("rowData");
let searchContainer = document.getElementById("searchContainer");
let submitBtn;

// ~ -- Display Details -->

function displayMeals(arr) {
  let cartoona = "";

  for (let i = 0; i < arr.length; i++) {
    cartoona += `
          <div class="col-md-3">
                  <div onclick="getMealDetails('${arr[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                      <img class="w-100" src="${arr[i].strMealThumb}" alt="" srcset="">
                      <div class="meal-layer position-absolute d-flex align-items-center justify-content-center  text-black p-2">
                      <h3>${arr[i].strMeal}</h3>
                      </div>
                  </div>
          </div>
          `;
  }

  rowData.innerHTML = cartoona;
}

// ! -- Display Categories -->

async function getCategories() {
  rowData.innerHTML = "";
  $(".inner-loading-screen").fadeIn(500);
  searchContainer.innerHTML = "";

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  response = await response.json();

  displayCategories(response.categories);
  $(".inner-loading-screen").fadeOut(500);
}

function displayCategories(arr) {
  let cartoona = "";

  for (let i = 0; i < arr.length; i++) {
    cartoona += `
          <div class="col-md-3">
                  <div onclick="getCategoryMeals('${
                    arr[i].strCategory
                  }')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                      <img class="w-100" src="${
                        arr[i].strCategoryThumb
                      }" alt="" srcset="">
                      <div class="meal-layer position-absolute text-center text-black p-2">
                          <h3>${arr[i].strCategory}</h3>
                          <p>${arr[i].strCategoryDescription
                            .split(" ")
                            .slice(0, 20)
                            .join(" ")}</p>
                      </div>
                  </div>
          </div>
          `;
  }

  rowData.innerHTML = cartoona;
}

// *-- Display Area -->

async function getArea() {
  rowData.innerHTML = "";
  $(".inner-loading-screen").fadeIn(500);

  searchContainer.innerHTML = "";

  let respone = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );
  respone = await respone.json();
  console.log(respone.meals);

  displayArea(respone.meals);
  $(".inner-loading-screen").fadeOut(500);
}

function displayArea(arr) {
  let cartoona = "";

  for (let i = 0; i < arr.length; i++) {
    cartoona += `
          <div class="col-md-3">
                  <div onclick="getAreaMeals('${arr[i].strArea}')" class="rounded-2 text-center cursor-pointer">
                          <i class="fa-solid fa-house-laptop fa-4x"></i>
                          <h3>${arr[i].strArea}</h3>
                  </div>
          </div>
          `;
  }

  rowData.innerHTML = cartoona;
}

// ~--Display Ingredients -->

async function getIngredients() {
  rowData.innerHTML = "";
  $(".inner-loading-screen").fadeIn(500);

  searchContainer.innerHTML = "";

  let respone = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  respone = await respone.json();
  console.log(respone.meals);

  displayIngredients(respone.meals.slice(0, 20));
  $(".inner-loading-screen").fadeOut(500);
}

function displayIngredients(arr) {
  let cartoona = "";

  for (let i = 0; i < arr.length; i++) {
    cartoona += `
          <div class="col-md-3">
                  <div onclick="getIngredientsMeals('${
                    arr[i].strIngredient
                  }')" class="rounded-2 text-center cursor-pointer">
                          <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                          <h3>${arr[i].strIngredient}</h3>
                          <p>${arr[i].strDescription
                            .split(" ")
                            .slice(0, 20)
                            .join(" ")}</p>
                  </div>
          </div>
          `;
  }

  rowData.innerHTML = cartoona;
}

// !-- DISPLAY ALL MEALS -->

function displayMealDetails(meal) {
  searchContainer.innerHTML = "";

  let ingredients = ``;

  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients += `<li class="alert alert-info m-2 p-1">${
        meal[`strMeasure${i}`]
      } ${meal[`strIngredient${i}`]}</li>`;
    }
  }

  let tags = meal.strTags?.split(",");
  if (!tags) tags = [];

  let tagsStr = "";
  for (let i = 0; i < tags.length; i++) {
    tagsStr += `
          <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`;
  }

  let cartoona = `
      <div class="col-md-4">
                  <img class="w-100 rounded-3" src="${meal.strMealThumb}"
                      alt="">
                      <h2>${meal.strMeal}</h2>
              </div>
              <div class="col-md-8">
                  <h2>Instructions</h2>
                  <p>${meal.strInstructions}</p>
                  <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                  <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
                  <h3>Recipes :</h3>
                  <ul class="list-unstyled d-flex g-3 flex-wrap">
                      ${ingredients}
                  </ul>
  
                  <h3>Tags :</h3>
                  <ul class="list-unstyled d-flex g-3 flex-wrap">
                      ${tagsStr}
                  </ul>
  
                  <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                  <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
              </div>`;

  rowData.innerHTML = cartoona;
}
