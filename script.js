document.getElementById("recipe-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const recipeName = document.getElementById("recipe-name").value;
    const ingredients = document.getElementById("ingredients").value;
    const preparation = document.getElementById("preparation").value;

    const recipe = {
        name: recipeName,
        ingredients: ingredients,
        preparation: preparation
    };

    // Salvar no localStorage
    const recipes = JSON.parse(localStorage.getItem("recipes")) || [];
    recipes.push(recipe);
    localStorage.setItem("recipes", JSON.stringify(recipes));

    updateTable();

    document.getElementById("recipe-form").reset();

    alert("Receita cadastrada com sucesso!");
});

if (document.getElementById("recipes-table-body")) {
    updateTable();
}

function updateTable() {
    const recipes = JSON.parse(localStorage.getItem("recipes")) || [];
    const tableBody = document.getElementById("recipes-table-body");

    // Limpa a tabela
    tableBody.innerHTML = "";

    // Adiciona cada receita na tabela
    recipes.forEach((recipe, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${recipe.name}</td>
            <td>${recipe.ingredients}</td>
            <td>${recipe.preparation}</td>
            <td><button onclick="deleteRecipe(${index})">Excluir</button></td>
        `;

        tableBody.appendChild(row);
    });
}

function deleteRecipe(index) {
    const recipes = JSON.parse(localStorage.getItem("recipes")) || [];
    
    // Remover a receita da lista
    recipes.splice(index, 1);

    // Atualizar o localStorage
    localStorage.setItem("recipes", JSON.stringify(recipes));

    // Atualizar a tabela
    updateTable();
}

updateTable();
