/*
// Async functionok használata
function getRecipe() {
    console.log(`Fake request for ids`);
    setTimeout(() => {
        const recipeID = [523, 883, 432, 974];
        console.log(`Fake response database ids: ${recipeID}\nFake request for ${recipeID[2]}`);

        setTimeout(id => {
            const recipe = {title: 'Fresh Tomato pasta', publisher: 'Johnas'};
            console.log(`Fake response: ${id}: ${recipe.title}, publisher: ${recipe.publisher}\nFake request for more recipe from ${recipe.publisher}`);
        
            setTimeout(publisher => {
                recipe2 = {title: 'Italian Pizza', publisher: 'Jonas'}
                console.log(`Fake response: more Jonas recipes:`, recipe2);
            }, 1500, recipe.publisher);
        }, 1500, recipeID[2]);
    }, 1500);
}
getRecipe();
*/

// Promise -ok gyártása

// Promise belsejében lévő executor function két paramétert (két function-t) kap ami informálja a promise-t és amiket mi is elérhetünk majd
const getIDs = new Promise((resolve, reject) => {
    console.log(`Fake request for ids`);
    setTimeout(() => {
        //Hamis async database request setTimeout-al, reject szimulálásakor reject-et hívunk meg. Resolve esetén...
        resolve([523, 883, 432, 974]);
        //reject('Error from getIDs rejection!');
    }, 1500);
});

const getRecipe = recID => {
    return new Promise((resolve, reject) => {
        setTimeout(ID => {
            const recipe = {title: 'Fresh Tomato pasta', publisher: 'Johnas'};
            resolve({id: ID, ...recipe});
        }, 1500, recID); // Give recID to setTimeout as ID
    });
}

const getRelated = publisher => {
    return new Promise((resolve, reject) => {
        setTimeout(pub => {
            const relRecipe = {title: 'Italian Pizza', publisher: 'Jonas'};
            resolve(`More recipe from ${pub}: ${relRecipe.title}`);
        }, 1500, publisher);
    });
};

/*
// Promise feldolgozása .then használattal
getIDs
.then( IDs => {
    console.log(`Fake response database ids: ${IDs}\nFake request for ${IDs[2]}`)
    return getRecipe(IDs[2]); // getRecipe hívása ami szintén promise lesz így újabb .then chain -elhető
})
.then( recipeWithID => {
    console.log(`Fake response: `, recipeWithID, `\nPublisher: ${recipeWithID.publisher}\nFake request for more recipe from ${recipeWithID.publisher}`);
    return getRelated(recipeWithID.publisher);
})
.then( relatedRecipe => {
    console.log(`Fake response: `, relatedRecipe);
})
.catch(error => {
    console.log(`Catch the error: ${error}`);
});
*/

// Promise feldolgozása async await használattal
async function getRecipesAW() {
    const IDs = await getIDs;
    console.log(`Fake response database ids: ${IDs}\nFake request for ${IDs[2]}`);
    const recipeWithID = await getRecipe(IDs[2]);
    console.log(`Fake response: `, recipeWithID, `\nPublisher: ${recipeWithID.publisher}\nFake request for more recipe from ${recipeWithID.publisher}`);
    const relatedRecipe = await getRelated(recipeWithID.publisher);
    console.log(`Fake response: `, relatedRecipe);
}
getRecipesAW()
