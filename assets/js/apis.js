$(document).ready(function () {
    function show_list() {
        const url = 'https://digimon-api.vercel.app/api/digimon'
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const list = $('#get-digimons')
                let digimonList = ''
                for (let index = 0; index < data.length; index++) {
                    const digimon = data[index];
                    digimonList = digimonList + `<li class="list-group-item"><img class="me-2" src='${digimon.img}'>${digimon.name}</li>`
                }
                list.append(digimonList)
                $("ul li img").css("max-height", "40px");
            })
            .catch(error => {
                console.error("Error fetching digimon data:", error);
            })
    }

    show_list()

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

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
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const list = $('#all-digimons')
                let digimonList = ''
                for (let index = 0; index < data.length; index++) {
                    const digimon = data[index];
                    digimonList = digimonList + `
                        <div class="card text-bg-info m-3" style="width: 18rem;  display: inline-block">
                            <img src="${digimon.img}" class="card-img-top" alt="${digimon.name}">
                            <div class="card-body text-center">
                                <h5 class="card-title">${digimon.name}</h5>
                                <p class="card-text">${digimon.level}</p>
                            </div>
                        </div>
                        `
                }
                list.append(digimonList)
                $("ul li img").css("max-height", "40px");
            })
            .catch(error => {
                console.error("Error fetching digimon data:", error);
            })
    })

    $("#get-digimon-by-name").click(function () {
        const digimonName = $("#digimon-name").val()
        const digimonCard = $('#digimon-card')
        digimonCard.show()
        digimonCard.empty()

        if (digimonName != '') {
            const url = 'https://digimon-api.vercel.app/api/digimon/name/' + digimonName
            fetch(url)
                .then((response) => {
                    console.log(response.status);
                    response.json()
                        .then(data => {
                            if (response.status === 200) {
                                digimonCard.append(`
                                    <div class="card mx-auto text-bg-info" style="width: 18rem;">
                                        <img src="${data[0].img}" class="card-img-top" alt="${data[0].name}">
                                        <div class="card-body text-center">
                                            <h5 class="card-title">${data[0].name}</h5>
                                            <p class="card-text">${data[0].level}</p>
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
                .catch(error => {
                    console.error("Error fetching digimon data:", error);
                })
        }

    })

    $("#get-random-digimon").click(function () {
        const digimonCard = $('#digimon-card')
        digimonCard.show()
        digimonCard.empty()
        const url = 'https://digimon-api.vercel.app/api/digimon'

        fetch(url)
            .then(response => response.json())
            .then(data => {
                const randomIndex = getRandomInt(0, data.length - 1);

                digimonCard.append(`
                <div class="card mx-auto text-bg-info" style="width: 18rem;">
                    <img src="${data[randomIndex].img}" class="card-img-top" alt="${data[randomIndex].name}">
                    <div class="card-body text-center">
                        <h5 class="card-title">${data[randomIndex].name}</h5>
                        <p class="card-text">${data[randomIndex].level}</p>
                    </div>
                </div>
                `)
            })
            .catch(error => {
                console.error("Error fetching digimon data:", error);
            });
    })
})