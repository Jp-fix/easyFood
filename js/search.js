import { getRecipe, getAllRecipes } from "./supabase.js";
import { showRecipeDetails, initModal } from "./modal.js";

const submitSearch = document.getElementById("searchRecipe");

submitSearch.addEventListener("submit", (e) => {
    e.preventDefault();
    matchingRecipe();
});

// Initialiser la modale
document.addEventListener("DOMContentLoaded", function() {
    initModal();
});

async function matchingRecipe() {
    const userSearchText = document.getElementById("searchRecipeText");
    const recipeMatching = userSearchText.value;
    
    if (recipeMatching && recipeMatching.length > 0) {
        try {
            const matchedRecipe = await getRecipe(recipeMatching);
            if (matchedRecipe && matchedRecipe.length > 0) {
                const recipeResult = document.getElementById("recipeResultContainer");
                if (matchedRecipe.length === 1) {
                    document.getElementById("resultsCount").textContent = `${matchedRecipe.length} recette trouvée`;
                } else {
                    document.getElementById("resultsCount").textContent = `${matchedRecipe.length} recettes trouvées`;
                }
                
                recipeResult.innerHTML = '';
                
                matchedRecipe.forEach(recipe => {
                    recipeResult.innerHTML += `
                        <div class="recipe-card">
                            <div class="recipe-image">
                                <img src="${recipe.recipeImage}" alt="image_placeholder150x150">
                            </div>
                            <div class="recipe-content">
                                <div class="recipe-tags">
                                    <span class="recipe-tag type">${recipe.recipeType}</span>
                                    <span class="recipe-tag difficulty">${recipe.recipeDifficulty}</span>
                                </div>
                                <h3 class="recipe-title">${recipe.recipeName}</h3>
                                <div class="recipe-meta">
                                    <div class="recipe-time">${recipe.recipePrepTime} minutes
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 6V12L16 14M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                                        </svg>
                                        <span></span>
                                    </div>
                                </div>
                                <button class="recipe-view button secondary" data-recipe-id="${recipe.id}">Voir la recette</button>
                            </div>
                        </div>`;
                });
                
                // Ajouter les écouteurs d'événements aux boutons
                addViewRecipeListeners();
                
                console.log("Accès à la div ok : ", recipeResult);
            } else {
                console.log("Aucune recette trouvée");
            }
        } catch (error) {
            console.error("Erreur lors de la récupération de la recette:", error);
        }
    }
}

async function renderAllRecipes() {
    const allRecipes = await getAllRecipes();
    const recipeResult = document.getElementById("recipeResultContainer");
    
    recipeResult.innerHTML = '';
    
    if (allRecipes && allRecipes.length > 0) {
        document.getElementById("resultsCount").textContent = `${allRecipes.length} recettes disponibles`;
        
        for (let i = 0; i < allRecipes.length; i++) {
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
                        <button class="recipe-view button secondary" data-recipe-id="${allRecipes[i].id}">Voir la recette</button>
                    </div>
                </div>`;
        }
        
        // Ajouter les écouteurs d'événements aux boutons
        addViewRecipeListeners();
    } else {
        recipeResult.innerHTML = `
            <div class="empty-state">
                <svg class="empty-icon" width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 12H12M15 12H12M12 12V9M12 12V15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
                <h3 class="empty-text">Aucune recette disponible</h3>
                <p class="empty-hint">Commencez par ajouter une recette ou réessayez avec d'autres critères.</p>
            </div>`;
    }
    
    console.log("Nombre de recettes chargées:", allRecipes ? allRecipes.length : 0);
}

// Fonction pour ajouter les écouteurs d'événements aux boutons "Voir la recette"
function addViewRecipeListeners() {
    const viewButtons = document.querySelectorAll(".recipe-view");
    viewButtons.forEach(button => {
        button.addEventListener("click", function() {
            const recipeId = this.getAttribute("data-recipe-id");
            showRecipeDetails(recipeId);
        });
    });
}

// Initialiser la page avec toutes les recettes
renderAllRecipes();

// Bouton de réinitialisation des filtres
document.getElementById("resetFilters").addEventListener("click", function() {
    document.getElementById("searchRecipeText").value = "";
    
    // Réinitialiser les checkboxes
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
    
    // Réinitialiser les boutons radio
    const radioButtons = document.querySelectorAll('input[type="radio"]');
    radioButtons.forEach(radio => {
        radio.checked = false;
    });
    
    // Recharger toutes les recettes
    renderAllRecipes();
});