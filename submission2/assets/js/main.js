let loadHome = page => {
    let select = ''
    let valSelect = ''
    let match = ''
    let topScore = ''
    let standing = ''
    let teams = ''
    let html = ''
    {/* <li class="tab"><a href="#news">News</a></li> */}

    let dtRand = [{
            tab: '<li class="tab"><a class="active" href="#match">Match</a></li>',
            content: '<div id="match"></div>',
            function: 'match'
        },
        {
            tab: '<li class="tab"><a class="active" href="#topScore">Top Score</a></li>',
            content: '<div id="topScore"></div>',
            function: 'topScore'
        },
        {
            tab: '<li class="tab"><a href="#standing">Standing</a></li>',
            content: '<div id="standing"></div>',
            function: 'standing'
        },
        {
            tab: '<li class="tab"><a href="#teams">Teams</a></li>',
            content: '<div id="teams"></div>',
            function: 'teams'
        }
    ];

    let numRand = Math.floor(Math.random() * 4);

    if(page === "random") {
        html += `
        <div class="card hoverable">
            <div class="card-content">
                <h1 id="leagueName"></h1>
            </div>
            <div class="card-tabs">
                <ul class="tabs tabs-fixed-width">
                    ${dtRand[numRand].tab}
                </ul>
            </div>
        `;
    } else {
        html += `
        <div class="card hoverable">
            <div class="card-content">
                <h1 id="leagueName"></h1>
            </div>
            <div class="card-tabs">
                <ul class="tabs tabs-fixed-width">
                    <li class="tab"><a class="active" href="#match">Match</a></li>
                    <li class="tab"><a href="#topScore">Top Score</a></li>
                    <li class="tab"><a href="#standing">Standing</a></li>
                    <li class="tab"><a href="#teams">Teams</a></li>
                </ul>
            </div>
        `;
    }

    /**
     * * MATCH
     */
    let onOff = () => {
        return navigator.onLine ? true : false
    };
    let parsingMatch = () => {
        showLoader()
        if(onOff()) {
            let dtMatch = getMatches();
            dtMatch.then(data => {
                ctMatch(data)
                hideLoader();
            })
            dtMatch.catch(error => {
                console.log(error)
            });
        } else {
            ccMatches()
        }
    }

    /**
     * * TOP SCORE
     */
    let parsingTopScore = () => {
        showLoader()
        if(onOff()) {
            let dtTopScore = getTopGoal();
            dtTopScore.then(data => {
                ctTopScore(data);
                hideLoader()
            });
            dtTopScore.catch(error => {
                console.log(error)
            });
        } else {
            ccTopScore()
        }
    }

    /**
     * * STANDING
     */
    let parsingStanding = () => {
        showLoader()
        if(onOff()) {
            let dtStanding = getStandings();
            dtStanding.then(data => {
                ctStanding(data);
                hideLoader()
            });
            dtStanding.catch(error => {
                console.log(error)
            });
        } else {
            ccStanding()
        }
    }

    /**
     * * TEAMS
     */
    let parsingTeams = () => {
        showLoader()
        if(onOff()) {
            let dtTeams = getTeams();
            dtTeams.then(data => {
                ctTeam(data);
                hideLoader();
            });
            dtTeams.catch(error => {
                console.log(error)
            });
        } else {
            ccTeam()
        }
    }


    {/* <div id="news"><h3 class="center-align">Upcoming</h3></div> */}

    
    let dd = data => {
        // console.log(data.replace(/^#/, ''))
        let dtTab = data.replace(/^#/, '');
        switch (dtTab) {
            case "match":
                parsingMatch();
                break;
            case "topScore":
                parsingTopScore();
                break;
            case "standing":
                parsingStanding();
                break;
            case "teams":
                parsingTeams();
                break;
        
            default:
                break;
        }
    }

    if(page === "random") {
        dtRand[numRand].function
        dd(dtRand[numRand].function)
        html += `
            <div class="card-content">
                ${dtRand[numRand].content}
            </div>
        </div>
        `;
    } else {    
        parsingMatch();
        html += `
            <div class="card-content">
                <div id="match"></div>
                <div id="topScore"></div>
                <div id="standing"></div>
                <div id="teams"></div>
            </div>
        </div>
        `;
    }
    document.getElementById("body-content").innerHTML = html;
    // tabs
    var elems2 = document.querySelectorAll('.tabs');
    var instance = M.Tabs.init(elems2, {});

    let tab = document.getElementsByClassName('tab');

    for(let a of tab) {
        a.addEventListener("click", function() {
            dd(this.firstChild.hash)
        });
    }
}

/**
 * * Get all data saved
 */
let loadSaved = () => {
    let saved = ''
    let dtLoadSaved = getSavedTeam();
    dtLoadSaved.then(data => {
        // console.log(data)
        if(data.length) {
            saved += `<div class="row">`;
            for(let dt in data) {
                let {phone, website, email} = "";
                let detailTeamsCompetitions = '';
                let detailTeamsPlayers = '';
                if(data[dt].phone) {
                    phone = `<a href="tel: ${data[dt].phone}">${data[dt].phone}</a>`;
                } else {
                    phone = ` - `;
                }
                if(data[dt].website) {
                    website = `<a target="_blank" href="${data[dt].website}">${data[dt].website}</a>`;
                } else {
                    website = ` - `;
                }
                if(data[dt].email) {
                    email = `<a href="mailto: ${data[dt].email}">${data[dt].email}</a>`;
                } else {
                    email = ` - `;
                }
                saved += `
                    
                    <div class="col s12 m4">
                        <div class="card hoverable">
                            <div class="card-image blue lighten-3">
                                <img class="materialboxed" data-caption="${data[dt].name}" src="${data[dt].crestUrl}" width="267" height="267">
                                <span class="card-title blue" style="border-radius: 0 5rem 0 0;">${data[dt].name}</span>
                                <a class="btn-floating halfway-fab waves-effect waves-light red">
                                    <i class="material-icons btn_saveUnsive" id="${data[dt].id}">favorite</i>
                                </a>
                            </div>
                            <div class="card-content">
                                <div class="row">
                                    <div class="col s12 m12">
                                        Name : <b>${data[dt].name ? data[dt].name : " - "}</b>
                                    </div>
                                    <div class="col s12 m12">
                                        Phone : <b>${phone}</b>
                                    </div>
                                    <div class="col s12 m12">
                                        Website : <b>${website}</b>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col s12 m12">
                                        Shost Name : <b>${data[dt].shortName ? data[dt].shortName : " - "}</b>
                                    </div>
                                    <div class="col s12 m12">
                                        Address : <b>${data[dt].address ? data[dt].address : " - "}</b>
                                    </div>
                                    <div class="col s12 m12">
                                        Email : <b>${email}</b>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col s12 m12">
                                        Founded : <b>${data[dt].founded ? data[dt].founded : " - "}</b>
                                    </div>
                                    <div class="col s12 m12">
                                        Club Colors : <b>${data[dt].clubColors ? data[dt].clubColors : " - "}</b>
                                    </div>
                                    <div class="col s12 m12">
                                        Venue : <b>${data[dt].venue ? data[dt].venue : " - "}</b>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                            
                            `;
            };
            saved += `</div>`;
        } else {
            saved += `<div class="valign center">
                        <h3><i class="large material-icons">sentiment_dissatisfied</i> Data is empty <i class="large material-icons">sentiment_dissatisfied</i></h3>
                    </div>
            `;
        }

        let elSaved = document.getElementById('body-content').innerHTML = saved;

        let selbtn_saveUnsive = document.getElementsByClassName("btn_saveUnsive");

        // button trigger to save/unsave team
        let saveUnsive = data => {
            deleteTeam(parseInt(data));
            loadSaved();
        }

        for(let a of selbtn_saveUnsive) {
            a.addEventListener("click", function() {
                saveUnsive(this.id)
            });
        }

        var materialboxed = document.querySelectorAll('.materialboxed');
        M.Materialbox.init(materialboxed, {});
    })
}

/**
 * * Push Notif
 */
let requestPermission = () => {
    if ('Notification' in window) {
        Notification.requestPermission().then(function (result) {
            if (result === "denied") {
                console.log("Fitur notifikasi tidak diijinkan.");
                return;
            } else if (result === "default") {
                console.error("Pengguna menutup kotak dialog permintaan ijin.");
                return;
            }

            /* navigator.serviceWorker.getRegistration().then(function (reg) {
               reg.showNotification('Notifikasi diijinkan!');
            }); */

            if (('PushManager' in window)) {
                navigator.serviceWorker.getRegistration()
                    .then(function (registration) {
                        registration.pushManager.subscribe({
                                userVisibleOnly: true,
                                applicationServerKey: urlBase64ToUint8Array('BFMlSAN5YITMydnnKfidQ8l9t-A-5iTwtysQ08Pb4OtgRoeYseq__EwhWu4nxaDEPTIOLiVB5odKKD1nuQHY0kQ')
                            })
                            .then(function (subscribe) {
                                console.log('Berhasil melakukan subscribe dengan endpoint: ', subscribe.endpoint);
                                console.log('Berhasil melakukan subscribe dengan p256dh key: ', btoa(String.fromCharCode.apply(
                                    null, new Uint8Array(subscribe.getKey('p256dh'))
                                )));
                                console.log('Berhasil melakukan subscribe dengan auth key: ', btoa((String.fromCharCode.apply(
                                    null, new Uint8Array(subscribe.getKey('auth'))
                                ))));
                            })
                            .catch(function (e) {
                                console.error('Tidak dapat melakukan subscribe ', e.message);
                            });
                    });
            }
        });
    }
}

// mengubah string menjadi Uint8Array
function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

let groupBy = function (xs, key) {
    return xs.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
};