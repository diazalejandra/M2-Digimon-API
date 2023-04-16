$(document).ready(function () {
    function show_list(){
        const url = 'https://digimon-api.vercel.app/api/digimon'
        try {
            fetch(url)
                .then(response => response.json())
                .then(digimons => {
                    const list = $('#get-digimons')
                    let digimonList = ''
                    for (let index = 0; index < digimons.length; index++) {
                        const digimon = digimons[index];
                        digimonList = digimonList + `<li class="list-group-item"><img src='${digimon.img}'>${digimon.name}</li>`
                    }
                    list.append(digimonList)
                    $("ul li img").css("height", "40px");
                })
        } catch (error) {
            console.log(error)
        }
    }

    show_list()

    $(".js-clear").click(function () {
        $('#digimon-card').hide()
        $('#all-digimons').hide()
        $('#digimon-list').show()
    })

    $("#get-digimons-list").click(function () {
        $('#all-digimons').show()
        $('#digimon-card').hide()
        $('#digimon-list').hide()
        const url = 'https://digimon-api.vercel.app/api/digimon'
        try {
            fetch(url)
                .then(response => response.json())
                .then(digimons => {
                    const list = $('#all-digimons')
                    let digimonList = ''
                    for (let index = 0; index < digimons.length; index++) {
                        const digimon = digimons[index];
                        digimonList = digimonList + `
                        <div class="card text-bg-info m-3" style="width: 18rem;">
                            <img src="${digimon.img}" class="card-img-top" alt="${digimon.name}">
                            <div class="card-body text-center">
                                <h5 class="card-title">${digimon.name}</h5>
                                <p class="card-text">${digimon.level}</p>
                            </div>
                        </div>
                        `
                    }
                    list.append(digimonList)
                    $("ul li img").css("height", "40px");
                })
        } catch (error) {
            console.log(error)
        }
    })

    $("#get-digimon-by-name").click(function () {
        $('#digimon-card').show()
        const digimonName = $("#digimon-name").val()
        const digimonCard = $('#digimon-card')
        digimonCard.empty()

        if (digimonName != '') {
            const url = 'https://digimon-api.vercel.app/api/digimon/name/' + digimonName
            try {
                fetch(url)
                    .then((response) => {
                        console.log(response.status);
                        response.json()
                            .then(json => {
                                if (response.status === 200) {
                                    digimonCard.append(`
                                    <div class="card mx-auto text-bg-info" style="width: 18rem;">
                                        <img src="${json[0].img}" class="card-img-top" alt="${json[0].name}">
                                        <div class="card-body text-center">
                                            <h5 class="card-title">${json[0].name}</h5>
                                            <p class="card-text">${json[0].level}</p>
                                        </div>
                                    </div>
                                    `)
                                } else {
                                    digimonCard.append(`
                                    <div class="card mx-auto text-bg-light" style="width: 18rem;">
                                        <div class="card-body text-center">
                                            <p class="card-text">Digimon no encontrado</p>
                                        </div>
                                    </div>
                                    `)
                                }
                            })
                    })
            } catch (error) {
                console.log(error)
            }
        }

    })




})