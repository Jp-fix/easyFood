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
    recipeSteps.push(completStep)

    document.getElementById("stepName").value = ""
    document.getElementById("stepDesc").value = ""

    console.log("All steps array:",recipeSteps)
})

/*const couscous = new Recipe (
    1,
    "Couscous",
    "Gourmand",
    "Facile",
)
couscous.addPrepTime(90,"minutes")
couscous.addIngredient("semoule", 500,"grammes")
couscous.addIngredient("Poulet", 350,"grammes")
couscous.addIngredient("Merguez", 6,"Unités")
couscous.addPrepSteps(
    "Faire cuire la semoule",
    "Ajouter les légumes",
    "Ajouter la viande",
    "Servir chaud",
    )*/
/*

console.log(`
Pour faire un bon ${couscous.recipeName.toString()} !
Il faut ${couscous.ingredients[0].quantity} ${couscous.ingredients[0].unit} de ${couscous.ingredients[0].name}.

Liste des étapes à réaliser :

 - Étape 1 : ${couscous.prepSteps[0].step1}
 - Étape 2 : ${couscous.prepSteps[0].step2}
 - Étape 3 : ${couscous.prepSteps[0].step3}
 - Étape 4 : ${couscous.prepSteps[0].step4}

 Profitez de votre repas !
 `)
*/
