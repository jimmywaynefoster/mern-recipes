const createRecipe = async (recipe) => {
  try {
    let response = await fetch("/api/recipes/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        credentials: "include",
      },
      body: recipe,
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const listFeed = async (signal) => {
  try {
    let response = await fetch("/api/recipes", {
      method: "GET",
      signal: signal,
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

export { createRecipe, listFeed };
