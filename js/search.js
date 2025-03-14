import { getRecipe,getAllRecipes } from "./supabase.js";

const submitSearch = document.getElementById("searchRecipe")

submitSearch.addEventListener("submit", (e) => {e.preventDefault()
  matchingRecipe()
})

async function matchingRecipe() {
    const userSearchText = document.getElementById("searchRecipeText");
    const recipeMatching = userSearchText.value;
    
    if (recipeMatching && recipeMatching.length > 0) {
        try {
            const matchedRecipe = await getRecipe(recipeMatching);
            if (matchedRecipe && matchedRecipe.length > 0) {
                const recipeResult = document.getElementById("recipeResultContainer")
                if (matchedRecipe.length > 0){
                document.getElementById("resultsCount").textContent = `${matchedRecipe.length} recette trouvée`
                } else {
                    document.getElementById("resultsCount").textContent = `${matchedRecipe.length} recettes trouvées`
                }
                recipeResult.innerHTML = `
        <div class="recipe-card">
          <div class="recipe-image">
              <img src="${matchedRecipe[0].recipeImage}" alt="image_placeholder150x150">
          </div>
          <div class="recipe-content">
              <div class="recipe-tags">
                  <span class="recipe-tag type">${matchedRecipe[0].recipeType}</span>
                  <span class="recipe-tag difficulty">${matchedRecipe[0].recipeDifficulty}</span>
              </div>
              <h3 class="recipe-title">${matchedRecipe[0].recipeName}</h3>
              <div class="recipe-meta">
                  <div class="recipe-time">${matchedRecipe[0].recipePrepTime} minutes
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
            } else {
                console.log("Aucune recette trouvée");
            }
        } catch (error) {
            console.error("Erreur lors de la récupération de la recette:", error);
        }
    }
}

async function renderAllRecipes(){
    const allRecipes = await getAllRecipes()
    const recipeResult = document.getElementById("recipeResultContainer")
    
   for (let i = 0; i < allRecipes.length; i++){
       recipeResult.innerHTML += `
        <div class="recipe-card">
          <div class="recipe-image">
              <img src="${allRecipes[i].recipeImage}" alt="image_placeholder150x150">
          </div>
          <div class="recipe-content">
              <div class="recipe-tags">
                  <span class="recipe-tag type">${allRecipes[i].recipeType}</span>
                  <span class="recipe-tag difficulty">${allRecipes[i].recipeDifficulty}</span>
              </div>
              <h3 class="recipe-title">${allRecipes[i].recipeName}</h3>
              <div class="recipe-meta">
                  <div class="recipe-time">${allRecipes[i].recipePrepTime} minutes
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 6V12L16 14M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                      </svg>
                      <span></span>
                  </div>
              </div>
              <button class="recipe-view button secondary">Voir la recette</button>
          </div>
      </div> `
   }
    
    
    
    
    
    
    
    
    

    console.log(allRecipes.length)
    
}
renderAllRecipes()