document.getElementById("addNewRecipe").addEventListener("submit", function(e) {
    e.preventDefault()
    let recipeId = self.crypto.randomUUID()
    let getRecipeDifficultyData = document.getElementById("recipeDifficulty")
    let recipeDifficulty = getRecipeDifficultyData.value
    let recipeImage = document.getElementById("recipeImage")
    let recipePrepTime = document.getElementById("prepTime").value
    let recipeType = document.getElementById("recipeType").value
    let recipeName = document.getElementById("recipeName").value

    let getNewRecipeFormData = new Recipe(
        recipeId,
        recipeName,
        recipeType,
        recipeDifficulty,
        recipePrepTime,
        recipeAllIngredients,
        recipeAllSteps,
        recipeImage,
    )

    console.log(`Ajout d'une nouvelle recette à la bdd : ${getNewRecipeFormData.recipeName}`)
    console.log(getNewRecipeFormData)

    this.reset()
    recipeAllIngredients = [];
    recipeAllSteps = [];

    console.log("Formulaire réinitialisé !")
})


// Stockage des données imbriquées (allIngrédients + allSteps)
let recipeAllIngredients = []
let recipeAllSteps = []

export class Recipe {
    constructor (iD = null, recipeName = "Pas de nom", recipeType = "Pas de type", recipeDifficulty = "Pas de difficulté", recipePrepTime = [], recipeAllIngredients = [], recipeAllSteps = [], image = null){
        this.iD = iD;
        this.recipeName = recipeName;
        this.recipeType = recipeType;
        this.recipeDifficulty = recipeDifficulty;
        this.recipePrepTime = recipePrepTime || [];
        this.recipeAllIngredients = recipeAllIngredients || [];
        this.recipeAllSteps = recipeAllSteps || [];
        this.image = image;
    }
}
// Ajout des ingrédients de la recette
document.getElementById("addNewIngredient").addEventListener("click", function (e){

    let ingredientName = document.getElementById("ingredientName").value
    let ingredientQuantity = document.getElementById("ingredientQuantity").value
    let ingredientUnit = document.getElementById("ingredientUnit").value
    let completIngredient = `${ingredientName} ${ingredientQuantity} ${ingredientUnit}`
    recipeAllIngredients.push(completIngredient)

    document.getElementById("ingredientName").value = ""
    document.getElementById("ingredientQuantity").value = ""
    document.getElementById("ingredientUnit").value = ""

    console.log("All ingredient array:",recipeAllIngredients)
})

// Ajout des étapes de la recette
document.getElementById("addNewStep").addEventListener("click", function (e){

    let stepName = document.getElementById("stepName").value
    let stepDesc = document.getElementById("stepDesc").value
    let completStep = `${stepName} ${stepDesc}`
    recipeAllSteps.push(completStep)

    document.getElementById("stepName").value = ""
    document.getElementById("stepDesc").value = ""

    console.log("All steps array:",recipeAllSteps)
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
