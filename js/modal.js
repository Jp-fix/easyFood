// Fonction pour récupérer les détails d'une recette, y compris les ingrédients et les étapes
export async function getRecipeDetails(recipeId) {
    try {
        // Importer supabase depuis le module supabase.js
        const { supabase } = await import("./supabase.js");
        
        // Récupérer les informations de base de la recette
        const { data: recipeData, error: recipeError } = await supabase
            .from("recipes")
            .select("*")
            .eq("id", recipeId)
            .single();
        
        if (recipeError) throw recipeError;
        if (!recipeData) return null;
        
        // Récupérer les ingrédients
        const { data: ingredientsData, error: ingredientsError } = await supabase
            .from("ingredients")
            .select("*")
            .eq("recipe_id", recipeId)
            .order("id");
        
        if (ingredientsError) throw ingredientsError;
        
        // Récupérer les étapes
        const { data: stepsData, error: stepsError } = await supabase
            .from("steps")
            .select("*")
            .eq("recipe_id", recipeId)
            .order("step_number");
        
        if (stepsError) throw stepsError;
        
        // Combiner toutes les données
        const recipeWithDetails = {
            ...recipeData,
            ingredients: ingredientsData || [],
            steps: stepsData || []
        };
        
        return recipeWithDetails;
        
    } catch (error) {
        console.error("Erreur lors de la récupération des détails de la recette:", error);
        return null;
    }
}

// Fonction pour afficher la modale avec les détails d'une recette
export async function showRecipeDetails(recipeId) {
    try {
        // Afficher un état de chargement
        document.getElementById("modalRecipeTitle").textContent = "Chargement...";
        document.getElementById("modalRecipeImage").src = "";
        document.getElementById("modalRecipeType").textContent = "";
        document.getElementById("modalRecipeDifficulty").textContent = "";
        document.getElementById("modalRecipeTime").textContent = "";
        document.getElementById("modalIngredientsList").innerHTML = "<li>Chargement des ingrédients...</li>";
        document.getElementById("modalStepsList").innerHTML = "<li>Chargement des étapes...</li>";
        
        // Afficher la modale immédiatement avec l'état de chargement
        document.getElementById("recipeModal").classList.add("active");
        document.body.style.overflow = "hidden";
        
        // Récupérer les données de la recette depuis Supabase
        const recipe = await getRecipeDetails(recipeId);
        
        if (!recipe) {
            document.getElementById("modalRecipeTitle").textContent = "Recette non trouvée";
            document.getElementById("modalIngredientsList").innerHTML = "<li>Impossible de charger les détails de cette recette.</li>";
            document.getElementById("modalStepsList").innerHTML = "<li>Veuillez réessayer plus tard.</li>";
            return;
        }
        
        // Animer l'apparition du contenu
        setTimeout(() => {
            // Remplir la modale avec les données de la recette
            document.getElementById("modalRecipeTitle").textContent = recipe.recipeName;
            document.getElementById("modalRecipeImage").src = recipe.recipeImage || "/assets/images/placeholder.jpg";
            document.getElementById("modalRecipeImage").alt = recipe.recipeName;
            document.getElementById("modalRecipeType").textContent = recipe.recipeType;
            document.getElementById("modalRecipeDifficulty").textContent = recipe.recipeDifficulty;
            document.getElementById("modalRecipeTime").textContent = recipe.recipePrepTime;
            
            // Remplir les ingrédients
            const ingredientsList = document.getElementById("modalIngredientsList");
            ingredientsList.innerHTML = "";
            
            if (recipe.ingredients && recipe.ingredients.length > 0) {
                recipe.ingredients.forEach(ingredient => {
                    const li = document.createElement("li");
                    li.textContent = `${ingredient.name}: ${ingredient.quantity} ${ingredient.unit}`;
                    ingredientsList.appendChild(li);
                });
            } else {
                ingredientsList.innerHTML = "<li>Aucun ingrédient disponible</li>";
            }
            
            // Remplir les étapes
            const stepsList = document.getElementById("modalStepsList");
            stepsList.innerHTML = "";
            
            if (recipe.steps && recipe.steps.length > 0) {
                recipe.steps.forEach(step => {
                    const li = document.createElement("li");
                    
                    if (step.step_number) {
                        const titleSpan = document.createElement("div");
                        titleSpan.className = "step-title";
                        titleSpan.textContent = `Étape ${step.step_number}`;
                        li.appendChild(titleSpan);
                    }
                    
                    const descSpan = document.createElement("div");
                    descSpan.textContent = step.step_detail;
                    li.appendChild(descSpan);
                    
                    stepsList.appendChild(li);
                });
            } else {
                stepsList.innerHTML = "<li>Aucune étape disponible</li>";
            }
        }, 300); // Délai pour l'animation
        
    } catch (error) {
        console.error("Erreur lors de l'affichage des détails de la recette:", error);
        document.getElementById("modalRecipeTitle").textContent = "Erreur";
        document.getElementById("modalIngredientsList").innerHTML = "<li>Une erreur s'est produite lors du chargement de la recette.</li>";
        document.getElementById("modalStepsList").innerHTML = "<li>Veuillez réessayer plus tard.</li>";
    }
}

// Fonction pour fermer la modale
export function closeRecipeModal() {
    document.getElementById("recipeModal").classList.remove("active");
    document.body.style.overflow = "auto";
}

// Initialiser les événements de la modale
export function initModal() {
    // Fermer la modale lorsqu'on clique sur le bouton de fermeture
    document.getElementById("closeModal").addEventListener("click", closeRecipeModal);
    
    // Fermer la modale lorsqu'on clique en dehors du contenu
    document.getElementById("recipeModal").addEventListener("click", function(event) {
        if (event.target === this) {
            closeRecipeModal();
        }
    });
    
    // Fermer la modale avec la touche Echap
    document.addEventListener("keydown", function(event) {
        if (event.key === "Escape" && document.getElementById("recipeModal").classList.contains("active")) {
            closeRecipeModal();
        }
    });
}