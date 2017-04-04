import 'isomorphic-fetch'

export const FETCH_RECIPES_REQUEST = 'FETCH_RECIPES_REQUEST';
export const fetchRecipesRequest = () => ({
  type: FETCH_RECIPES_REQUEST
})

export const FETCH_RECIPES_SUCCESS = 'FETCH_RECIPES_SUCCESS';
export const fetchRecipesSuccess = recipes => ({
  type: FETCH_RECIPES_SUCCESS,
  recipes
})

// export const SAVE_RECIPE = 'SAVE_RECIPE';
// export const saveRecipe = recipe => ({
//   type: SAVE_RECIPE,
//   recipe
// })

export const FETCH_SAVED_RECIPES_REQUEST = 'FETCH_SAVED_RECIPES_REQUEST';
export const fetchSavedRecipesRequest = () => ({
  type: FETCH_SAVED_RECIPES_REQUEST
})

export const FETCH_SAVED_RECIPES_SUCCESS = 'FETCH_SAVED_RECIPES_SUCCESS';
export const fetchSavedRecipesSuccess = savedRecipes => ({
  type: FETCH_SAVED_RECIPES_SUCCESS,
  savedRecipes
})

export const FETCH_ERROR = 'FETCH_GOALS_ERROR';
export const fetchError = error => ({
  type: FETCH_ERROR,
  error
})

const recipesUrl = "food2fork.com/api/search?key=c3079463ea04cd06c17bb1dee6ec6862&q="

export const fetchRecipes = (ingredients) => dispatch => {
    dispatch(fetchRecipesRequest())
    fetch(recipesUrl + ingredients, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
      })
      .then(response => {
        if (!response.ok) {
            const error = new Error(response.statusText)
            error.response = response
            throw error;
        }
        return response;
    }).then(response => response.json()).then(json => dispatch(fetchRecipesSuccess(json.recipes))).catch(error => dispatch(fetchError(error)));
};

const savedRecipesUrl = `/api/`;

export const fetchSavedRecipes = () => dispatch => {
  return fetch(savedRecipesUrl)
  .then(response => {
    if (!response.ok) {
      const error = new Error(response.statusText)
      error.response = response
      throw error;
    }
    return response;
  })
  .then(response => response.json())
  .then(json => dispatch(fetchSavedRecipesSuccess(json)))
  .catch(error => dispatch(fetchError(error)))
};

export const postRecipe = (recipe) => dispatch => {
    // dispatch(saveRecipe())
    return fetch(savedRecipesUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              recipe
            })
      })
  .then(response => response.json())
  .then(json => dispatch(fetchSavedRecipesSuccess(json)))
}

export const deleteSavedRecipe = (id) => dispatch => {
    return fetch(savedRecipesUrl + id, {
    method: 'DELETE'
  })
  .then(() => dispatch(fetchSavedRecipes()))
}