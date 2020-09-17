const createRecipe = async (recipe) => {
  try {
    let response = await fetch("/api/recipes/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recipe),
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

export { createRecipe };
