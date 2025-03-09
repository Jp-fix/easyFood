class recipe {
    constructor (iD = null, recipeName = "Pas de nom", recipeType = "Pas de type", difficulty = "Pas de difficulté", prepTime = [], ingredients = [], prepSteps = [], image = null, comments = null){
        this.iD = iD;
        this.recipeName = recipeName;
        this.recipeType = recipeType;
        this.difficulty = difficulty;
        this.prepTime = prepTime || [];
        this.ingredients = ingredients || [];
        this.prepSteps = prepSteps || [];
        this.image = image;
        this.comments = comments;
    }
    addIngredient(name, quantity, unit){
        this.ingredients.push({name, quantity, unit})
    }
    addPrepTime(timing, timeUnit){
        this.prepTime.push({timing, timeUnit})
    }
}

const couscous = new recipe (
    1,
    "Couscous",
    "Gourmand",
    "Facile",
)
couscous.addPrepTime(90,"minutes")
couscous.addIngredient("semoule", 500,"grammes")
couscous.addIngredient("Poulet", 350,"grammes")
couscous.addIngredient("Merguez", 6,"Unités")

console.log(`Pour faire un bon ${couscous.recipeName.toString()} il faut ${couscous.ingredients[0].quantity} ${couscous.ingredients[0].unit} de ${couscous.ingredients[0].name}. Il faut aussi avoir ${couscous.prepTime[0].timing} ${couscous.prepTime[0].timeUnit} devant soit.`)
/*
* name = Nom de la recette
* recipeType = Healthy, Gourmande
* difficulty = Facile, Moyenne, Hard
* prepTime = Temps de préparation
* ingredients = Tableau d'ingrédients nécessaires
* quantity = Quantité des ingrédients
* prepSteps = Étapes de préparation
* image = Image d'illustration de la recette
* comments = Retour d'expérience et axes d'améliorations
*/