

//TODO add environnement env (security for supabase key)

const supabaseUrl = 'https://auasihwlimiprtbgifkx.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF1YXNpaHdsaW1pcHJ0YmdpZmt4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE2OTkwMzEsImV4cCI6MjA1NzI3NTAzMX0.bNVIOvA3jmdjYpHB5qFY6q1Bvf4Ge8EMPWINxUaVfWY"

const supabase = window.supabaseCreateClient(supabaseUrl, supabaseKey);

// Envoi recette à Supabase
export async function saveRecipe(getNewRecipeFormData){
    const {recipeIngredients, recipeSteps, ...mainRecipeData} = getNewRecipeFormData

    const {data: recipeInsertData, error: recipeError} = await supabase
        .from('recipes')
        .insert([mainRecipeData])
        .select()

    if (recipeError) {
        console.error('Erreur lors de l\'insertion :', recipeError)
        return null
    }

    const recipeId = recipeInsertData[0].id
    
    // Insérer les ingrédients
    if (recipeIngredients && recipeIngredients.length > 0){
        const ingredientsToInsert = recipeIngredients.map(ingredient => ({
            recipe_id: recipeId,
            name: ingredient.name,
            quantity: ingredient.quantity,
            unit: ingredient.unit
        }))

        const { error: ingredientsError } = await supabase
            .from('ingredients')
            .insert(ingredientsToInsert)

        if (ingredientsError){
            console.error('Erreur lors de l\'insertion des ingrédients :', ingredientsError)
        }
    }

    // Insérer les étapes
    if (recipeSteps && recipeSteps.length > 0) {
        const stepsToInsert = recipeSteps.map((step, index) => ({
            recipe_id: recipeId,
            step_number: index + 1,
            step_detail: step
        }))

        const { error: stepsError } = await supabase
            .from('steps')
            .insert(stepsToInsert)

        if (stepsError) {
            console.error('Erreur lors de l\'insertion des étapes :', stepsError)
        }
    }

    console.log('Recette ajoutée avec succès :', recipeInsertData)
    return recipeInsertData
}

export async function getRecipe(searchTerm) {
    try {
        // Si searchTerm est une chaîne non vide
        if (searchTerm && typeof searchTerm === 'string') {
            // Utiliser .ilike pour une recherche partielle insensible à la casse
            const { data, error } = await supabase
                .from('recipes')
                .select()
                .ilike('recipeName', `%${searchTerm}%`)
            
            if (error) throw error
            return data
        }
        // Si on passe un objet avec un champ recipeName
        else if (searchTerm && searchTerm.recipeName) {
            const { data, error } = await supabase
                .from('recipes')
                .select()
                .ilike('recipeName', `%${searchTerm.recipeName}%`)
            
            if (error) throw error
            return data
        }
        // Si aucun terme de recherche, retourner toutes les recettes
        else {
            const { data, error } = await supabase
                .from('recipes')
                .select()
            
            if (error) throw error
            return data
        }
    } catch (error) {
        console.error('Erreur de recherche:', error)
        return null
    }
}

// Fonction pour récupérer toutes les recettes
export async function getAllRecipes() {
    try {
        const { data: recipes, error } = await supabase
            .from('recipes')
            .select('*')
        
        if (error) throw error
        return recipes
    } catch (error) {
        console.error("Erreur lors de la récupération des recettes:", error)
        return null
    }
}











