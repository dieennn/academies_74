let ccMatches = () => {
    if ('caches' in window) {
        caches.match(`https://api.football-data.org/v2/competitions/PL/matches`)
            .then(response => {
                if (response) {
                    response.json()
                        .then(data => {
                            ctMatch(data)
                            hideLoader();
                        })
                        .catch(error => {
                            console.log(error)
                        });
                }
            })
    }
}

let ccTopScore = () => {
    if ('caches' in window) {
        caches.match(`https://api.football-data.org/v2/competitions/PL/scorers`)
            .then(response => {
                if (response) {
                    response.json()
                        .then(data => {
                            ctTopScore(data);
                            hideLoader();
                        })
                        .catch(error => {
                            console.log(error);
                        });
                }
            })
    }
}

let ccStanding = () => {
    if ('caches' in window) {
        caches.match(`https://api.football-data.org/v2/competitions/PL/standings?standingType=TOTAL`)
            .then(response => {
                if (response) {
                    response.json()
                        .then(data => {
                            ctStanding(data);
                            hideLoader();
                        })
                        .catch(error => {
                            console.log(error);
                        });
                }
            })
    }
}

let ccTeam = () => {
    if ('caches' in window) {
        caches.match(`https://api.football-data.org/v2/competitions/PL/teams`)
            .then(response => {
                if (response) {
                    response.json()
                        .then(data => {
                            ctTeam(data);
                            hideLoader();
                        })
                        .catch(error => {
                            console.log(error);
                        });
                }
            })
    }
}

let ccDetailTeam = id => {
    if ('caches' in window) {
        caches.match(`https://api.football-data.org/v2/teams/${id}`)
            .then(response => {
                if (response) {
                    response.json()
                        .then(data => {
                            ctDetailTeam(data);
                            hideLoader();
                        })
                        .catch(error => {
                            console.log(error);
                        });
                } else {
                    alert('data belum tersedia');
                    history.pushState({}, null, '/');
                }
            })
    }
}