import { getRecipe } from "./supabase.js";

const submitSearch = document.getElementById("searchRecipe")

submitSearch.addEventListener("submit", (e) => {e.preventDefault()
  matchingRecipe()
  showMatchedResult()
  console.log("clicked")
})

function matchingRecipe(){
    const userSearchText = document.getElementById("searchRecipeText")
    const recipeMatching = userSearchText.value

      if (recipeMatching && recipeMatching.length > 0){
        const matchedRecipe = getRecipe(recipeMatching)
        console.log(matchedRecipe)
      }
}
//TODO get value from promise


function showMatchedResult (){
const recipeResult = document.getElementById("recipeResultContainer")

recipeResult.innerHTML = `<div class="recipe-card">
          <div class="recipe-image">
              <img src="" alt="">
          </div>
          <div class="recipe-content">
              <div class="recipe-tags">
                  <span class="recipe-tag type"></span>
                  <span class="recipe-tag difficulty"></span>
              </div>
              <h3 class="recipe-title"></h3>
              <div class="recipe-meta">
                  <div class="recipe-time">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 6V12L16 14M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                      </svg>
                      <span></span>
                  </div>
              </div>
              <button class="recipe-view button secondary">Voir la recette</button>
          </div>
      </div> `
console.log("Accès à la div ok : ",recipeResult)
}