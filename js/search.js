import { getRecipe } from './supabase.js'

const btnSearch = document.getElementById("btn-search")
const inputElementSearch = document.getElementById("searchRecipeText")

btnSearch.addEventListener("click",async function (e){
    const displayRecipe = document.getElementById("recipeContainer")
    const recipeTextSearch = inputElementSearch.value
    
    let searchQuery = {
        recipeName:recipeTextSearch
    }
    
    console.log(searchQuery)
    
    const resultRecipe = await getRecipe(searchQuery)
    console.log(resultRecipe)
    
    if (resultRecipe && resultRecipe.length > 0) {
        displayRecipe.innerHTML = `
        <div class="recipe-card">
            <h2>${resultRecipe[0].recipeName}</h2>
            <div class="recipe-info">
                <img src="${resultRecipe[0].recipeImage}" alt="">
                <p><strong>Type de recette :</strong> ${resultRecipe[0].recipeType}</p>
                <p><strong>Difficulté :</strong> ${resultRecipe[0].recipeDifficulty}</p>
                <p><strong>Temps de préparation :</strong> ${resultRecipe[0].recipePrepTime} min</p>
                <p><strong>Ingrédients :</strong> ${resultRecipe[0].recipeIngredients}</p>
                <p><strong>Étape de préparation :</strong> ${resultRecipe[0].recipeSteps}</p>
                <button>Voir la recette</button>
            </div>
        </div>
    `;
    }
})