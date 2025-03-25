import { saveRecipe } from "./supabase.js";

 document.getElementById("addNewRecipe").addEventListener("submit", async function(e) {       
    e.preventDefault()
    let getRecipeDifficultyData = document.getElementById("recipeDifficulty")
    let recipeDifficulty = getRecipeDifficultyData.value
    let recipeImage = document.getElementById("recipeImage")
    let recipePrepTime = document.getElementById("prepTime").value
    let recipeType = document.getElementById("recipeType").value
    let recipeName = document.getElementById("recipeName").value

    let getNewRecipeFormData = new Recipe(
        recipeName,
        recipeType,
        recipeDifficulty,
        recipePrepTime,
        recipeIngredients,
        recipeSteps,
        recipeImage,
    )

    console.log(getNewRecipeFormData)
    //Sauvegarde des données dans Supabase
    const result = await saveRecipe(getNewRecipeFormData)

    if (result){
        console.log(`Ajout d'une nouvelle recette à la bdd : ${getNewRecipeFormData.recipeName}`)
    }

    this.reset()
    recipeIngredients = [];
    recipeSteps = [];

    console.log("Formulaire réinitialisé !")
})

// Stockage des données imbriquées (Ingrédients + Steps)
let recipeIngredients = []
let recipeSteps = []

export class Recipe {
    constructor (recipeName = "Pas de nom", recipeType = "Pas de type", recipeDifficulty = "Pas de difficulté", recipePrepTime = [], recipeIngredients = [], recipeSteps = [], recipeImage = null){
        this.recipeName = recipeName;
        this.recipeType = recipeType;
        this.recipeDifficulty = recipeDifficulty;
        this.recipePrepTime = recipePrepTime || [];
        this.recipeIngredients = recipeIngredients || [];
        this.recipeSteps = recipeSteps || [];
        this.recipeImage = recipeImage;
    }
}
// Ajout des ingrédients de la recette
document.getElementById("addNewIngredient").addEventListener("click", function (e){
    
    let ingredientName = document.getElementById("ingredientName").value
    let ingredientQuantity = document.getElementById("ingredientQuantity").value
    let ingredientUnit = document.getElementById("ingredientUnit").value
    
    let ingredient = {
        name:ingredientName,
        quantity :ingredientQuantity,
        unit :ingredientUnit,
    }
    
    const ingredientsList = document.getElementById("ingredients-list")
    document.getElementById("ingredient-Content").innerHTML = "Ingrédients ajoutés ✅"
    ingredientsList.innerHTML += `
                            <div class="empty-ingredients" id="ingredient-Content">
                                <div><b>${ingredientName} :</b> ${ingredientQuantity} ${ingredientUnit}</div>
                            </div>
                        
    `
    recipeIngredients.push(ingredient)

    document.getElementById("ingredientName").value = ""
    document.getElementById("ingredientQuantity").value = ""
    document.getElementById("ingredientUnit").value = ""

    console.log("All ingredient array:",recipeIngredients)
})

// Ajout des étapes de la recette
document.getElementById("addNewStep").addEventListener("click", function (e){

    let stepName = document.getElementById("stepName").value
    let stepDesc = document.getElementById("stepDesc").value
    let completStep = `${stepName} ${stepDesc}`
    
    recipeSteps.push (completStep)
    
    //TODO : Remplacer "aucune étape ajoutée" par "Étape ajoutées ✅".Fonctionne avec les ingredients. Pourquoi pas ici ?
    const stepsList = document.getElementById("steps-list")
    document.getElementById("steps-content").innerHtml = "Étape ajoutées ✅"
    stepsList.innerHTML += `
        <div class="empty-steps" id="steps-content">
            <div> <h4>${stepName}</h4> ${stepDesc}</div>
        </div>
    `
    
    
    document.getElementById ('stepName').value = ''
    document.getElementById ('stepDesc').value = ''
    
    console.log("All steps array:",recipeSteps)
})