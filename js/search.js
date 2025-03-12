import { getRecipe } from './supabase.js'

const btnSearch = document.getElementById ("btn-search")
const inputElementSearch = document.getElementById ("searchRecipeText")

btnSearch.addEventListener ("click", async function () {
    
    const displayRecipe = document.getElementById ("recipeContainer")
    const recipeTextSearch = inputElementSearch.value
    
    console.log ("test")
    console.log (displayRecipe)
    
    let searchTerm = {
        recipeName: recipeTextSearch
    }
    
    console.log (searchTerm)
    
    const resultRecipe = await getRecipe (searchTerm)
    
    console.log (resultRecipe)
    
    if (resultRecipe && resultRecipe.length > 0) {
        displayRecipe.innerHTML = ``;
    }
})

//TODO comprendre pourquoi le innerHTML ne fonctionne pas ici


//TEMPLATE DE RECIPE CARD
/*    <div class="recipe-card">
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
    </div>*/