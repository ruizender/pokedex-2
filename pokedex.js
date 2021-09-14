document.addEventListener('DOMContentLoaded', function () {

    let nextPage = "https://pokeapi.co/api/v2/pokemon/";
    document.querySelector("#next").addEventListener("click", function (e) {
        e.preventDefault();
        //$(".pokeCard").html(" ")

        fetchCharacters();
    })


    fetchCharacters();

    function fetchCharacters() {
        fetch(nextPage)
            .then(function (response) {
                return response.json();
            })
            .then(function (response) {
                nextPage = response.next;

                response.results.forEach(function (char) {
                    fetch(char.url)
                        .then(function (response) {
                            return response.json();
                        })
                        .then((pokemon) => {
                            let chars = `
                        <div class="col-4 p-3">
                            <div class="card">
                                <img src="${pokemon.sprites.front_default}" class="card-img-top" alt="...">
                                <div class="card-body ">
                                    <h5 class="card-title">${pokemon.name}</h5>
                                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.
                                    </p>
                                </div>
                                <div class="card-body">
                                    <a href="${char.url}" id ="${char.name}" class="btn btn-success">quiero saber mas de este Pokémon!</a>
                                </div>
                            </div>
                        </div>`

                            document.querySelector(".pokeCard").insertAdjacentHTML('beforeend', chars)

                            document.querySelector(`#${char.name}`).addEventListener("click", function (e) {
                                e.preventDefault();
                                let pokemon = e.target.href;
                                $("#exampleModal").modal("show");

                                getPokemonData(pokemon);
                            })

                        })
                })
            })
    }

    function getPokemonData(pokemon) {

        fetch(pokemon)
            .then(function (response) {
                return response.json();
            })

            .then(function (response) {
                $('.modal-title').html((response.name))
                $('#pokemonAbs').html(getAbilities(response))
                $('#pokemonTypes').html(getTypes(response))
                $('#pokemonMoves').html(getMoves(response))
                getGeneration(response)
                document.querySelector('#btnDano').addEventListener('click', function (e) {
                    e.preventDefault();
                    $("#exampleModal1").modal("show");
                    getDaños(response)

                })
                document.querySelector('#btnHab').addEventListener('click', function (e) {
                    e.preventDefault();
                    $("#exampleModal3").modal("show");
                    getPokeHab(response)

                })

            });
    }

    function getAbilities(pokemon) {
        let abi = 'Abilities:'
        pokemon.abilities.forEach(function (abilities) {
            abi = abi + ' ' + abilities.ability.name
        })
        return abi
    }

    function getTypes(pokemon) {
        let typ = 'types:'
        pokemon.types.forEach(function (types) {
            typ = typ + ' ' + types.type.name
        })
        return typ
    }

    function getGeneration(pokemon) {

        fetch(pokemon.types[0].type.url)
            .then(function (response) {
                return response.json();
            })
            .then(function (response) {

                gen = response.generation.name
                $('#pokemonGeneration').html("generation: " + gen)
            })
    }

    function getMoves(pokemon) {
        let mov = 'moves:'
        pokemon.moves.forEach(function (moves, index) {
            if (index < 5) {
                mov = mov + ' ' + moves.move.name
            }
        })
        return mov
    }

    function getDaños(pokemon) {
        fetch(pokemon.types[0].type.url)
            .then(function (response) {
                return response.json();
            })
            .then(function (response) {
                for (let i = 0; i < response.damage_relations.double_damage_from.length; i++) {
                    gen = gen + " " + response.damage_relations.double_damage_from[i].name


                }
                gen = gen.split(" ").splice(1)
                $('#pokemonDaños').html("Daños: " + gen)

            })
    }

    function getPokeHab(response) {
        //console.log(response.abilities[0].ability.url)
        fetch(response.abilities[0].ability.url)
            .then(function (response) {
                return response.json();
            })
            .then(function (response) {
                for (let i = 0; i < response.pokemon.length; i++) {
                    gen = gen + " " + response.pokemon[i].pokemon.name
                }
                gen = gen.split(" ").splice(1)
                $('#pokemonHab').html("Pokemones Hab: " + gen)
                console.log(gen)
            })

    }



})