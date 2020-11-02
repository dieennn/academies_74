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
    let parsingMatch = () => {
        showLoader()
        let dtMatch = getMatches();
        dtMatch.then(data => {
            // console.log('MATCH',data)
            // leagueName
            document.getElementById("leagueName").innerHTML = `${data.competition.area.name}, ${data.competition.name}`;
            // select MatchDay
            match += `
                <div class="row">
                    <div class="col s2 m5 right-align" style="margin-top: 2.5%;">
                    <a id="prev" class="btn-floating btn-small waves-effect waves-light blue"><i class="material-icons">arrow_back</i></a>
                    </div>
                    <div class="col s8 m2 center-align">
                        <label>Match Day</label>
                        <select id="select" >

                        </select>
                    </div>
                    <div class="col s2 m5 left-align" style="margin-top: 2.5%;">
                        <a id="next" class="btn-floating btn-small waves-effect waves-light blue"><i class="material-icons">arrow_forward</i></a>
                    </div>
                </div>
            `;
            match += `
                <table class="striped responsive-table">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Home</th>
                            <th>Score</th>
                            <th>Away</th>
                            <th>Halftime</th>
                            <th>Extratime</th>
                            <th>Penalty</th>
                        </tr>
                        </thead>
                
                        <tbody>
            `;
            let groupMatchday = groupBy(data.matches, 'matchday');
            // if(groupMatchday) {
                // select MatchDay   
                for(let key in groupMatchday) {
                    select += `
                        <option value = "${key}">Match Day - ${key}</option>
                    `;
                }

                let vaTr = '';
                let dtGroupMatchday = (matchday, type = null) => {
                    valSelect = matchday;
                    let valTr = () => {
                        groupMatchday[matchday].map((data, i) => {
                            let date = new Date(data.utcDate);
                            vaTr += `
                                <tr>
                                    <td>${i+1}</td>
                                    <td>${date.toLocaleString()}</td>
                                    <td>${data.status}</td>
                                    <td>${data.homeTeam.name}</td>
                                    <td>${(data.score.fullTime.homeTeam != null) ? data.score.fullTime.homeTeam : '-'} : ${(data.score.fullTime.awayTeam != null) ? data.score.fullTime.awayTeam : '-'}</td>
                                    <td>${data.awayTeam.name}</td>
                                    <td>${(data.score.halfTime.homeTeam != null) ? data.score.halfTime.homeTeam : '-'} : ${(data.score.halfTime.awayTeam != null) ? data.score.halfTime.awayTeam : '-'}</td>
                                    <td>${(data.score.extraTime.homeTeam != null) ? data.score.extraTime.homeTeam : '-'} : ${(data.score.extraTime.awayTeam != null) ? data.score.extraTime.awayTeam : '-'}</td>
                                    <td>${(data.score.penalties.homeTeam != null) ? data.score.penalties.homeTeam : '-'} : ${(data.score.penalties.awayTeam != null) ? data.score.penalties.awayTeam : '-'}</td>
                                </tr>
                            `;
                        })
                    }

                    if(type === 'select') {
                        showLoader()
                        vaTr = ''
                        valTr()
                        document.getElementsByTagName("tbody")[0].innerHTML = '';
                        document.getElementsByTagName("tbody")[0].innerHTML = vaTr;
                        hideLoader();
                    } else if(type === 'prevnext') {
                        showLoader()
                        vaTr = ''
                        valTr()
                        document.getElementsByTagName("tbody")[0].innerHTML = '';
                        document.getElementsByTagName("tbody")[0].innerHTML = vaTr;
                        hideLoader();
                    } else {
                        valTr()
                    }
                }

                // Find data match if status schedule to find round active
                /**
                 * * hadeuh ternyata udah ada info tentang round active di endpoind standing, 
                 * * tau gitu kaga usah susah payah filter data cuman mau nyari round active -_-"
                 */
                let dt = [];
                let count = data.matches.length;
                let res = data.matches[count-1].matchday;
                for(let key in data.matches) {
                    if(data.matches[key].status === 'SCHEDULED') {
                        dt.push(data.matches[key])
                    }
                }
                
                dt.length ? dtGroupMatchday(dt[0].matchday) : dtGroupMatchday(res);
            // }
            match += `
                ${vaTr}
                </tbody>
                </table>
            `;
            let elMatch = document.getElementById("match");
            if(!elMatch.childElementCount) {
                let newElement = document.createElement('div');
                newElement.innerHTML = match;
                document.getElementById("match").appendChild(newElement);
            }
            // document.getElementById("match").innerHTML = match;
            let sel = document.getElementById('select');
            sel.innerHTML = select;
            sel.value=valSelect;

            let getSelectMatchDay = () => {
                dtGroupMatchday(sel.value, 'select');
                let getCountSelect = document.getElementById("select").children.length;
                if(parseInt(sel.value) === 1) {
                    btnPrev.classList.add('disabled');
                    btnNext.classList.remove('disabled');
                } else if(parseInt(sel.value) === getCountSelect) {
                    btnNext.classList.add('disabled');
                    btnPrev.classList.remove('disabled');
                } else {
                    dtGroupMatchday(parseInt(sel.value)-1, 'prevnext');
                    btnNext.classList.remove('disabled');
                    btnPrev.classList.remove('disabled');
                }
            }

            sel.addEventListener("change", getSelectMatchDay);        

            // select
            var select = document.querySelectorAll('select');
            M.FormSelect.init(select, {});


            // prev & next

            /**
             * * https://stackoverflow.com/a/49833959/9446622
             * * change trigger value select option in materialize
             */
            
            let changeValueSelect = () => {            
                if (typeof(Event) === 'function') {
                    var event = new Event('change');
                } else {
                    var event = document.createEvent('Event');
                    event.initEvent('change', true);
                }
                sel.dispatchEvent(event);
            }
            let btnPrev = document.getElementById('prev');
            let btnNext = document.getElementById('next');

            let prev = () => {
                sel.value=parseInt(sel.value)-1;
                changeValueSelect()
                if(parseInt(sel.value) === 1) {
                    btnPrev.classList.add('disabled');
                } else {
                    dtGroupMatchday(parseInt(sel.value), 'prevnext');
                    btnPrev.classList.remove('disabled');
                    btnNext.classList.remove('disabled');
                }
            }

            let next = () => {
                sel.value=parseInt(sel.value)+1;
                changeValueSelect()
                let getCountSelect = document.getElementById("select").children.length;
                if(parseInt(sel.value) === getCountSelect) {
                    btnNext.classList.add('disabled');
                } else {
                    dtGroupMatchday(parseInt(sel.value), 'prevnext');
                    btnPrev.classList.remove('disabled');
                    btnNext.classList.remove('disabled');
                }
            }

            btnPrev.addEventListener("click", prev);
            btnNext.addEventListener("click", next);

            hideLoader();
        })
        dtMatch.catch(error => {
            console.log(error)
        });
    }

    /**
     * * TOP SCORE
     */
    let parsingTopScore = () => {
        showLoader()
        let dtTopScore = getTopGoal();
        dtTopScore.then(data => {
            // console.log('TOP SCORE',data)
            document.getElementById("leagueName").innerHTML = `${data.competition.area.name}, ${data.competition.name}`;
            topScore += `
                <table class="striped responsive-table">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Nationality</th>
                        <th>DOB</th>
                        <th>Team</th>
                        <th>Position</th>
                        <th>Goal</th>
                    </tr>
                    </thead>
            
                    <tbody>
            `;
            if(data) {
                data.scorers.map((datas, i) => {
                    topScore += `
                        <tr>
                            <td>${i+1}</td>
                            <td>${datas.player.name}</td>
                            <td>${datas.player.nationality}</td>
                            <td>${datas.player.countryOfBirth}, ${datas.player.dateOfBirth}</td>
                            <td>${datas.team.name}</td>
                            <td>${datas.player.position}</td>
                            <td>${datas.numberOfGoals}</td>
                        </tr>
                    `;
                })
            }
            topScore += `
                </tbody>
                </table>
            `;
            let elTopScore = document.getElementById("topScore");
            if(!elTopScore.childElementCount) {
                let newElement = document.createElement('div');
                newElement.innerHTML = topScore;
                document.getElementById("topScore").appendChild(newElement);
            }
            // document.getElementById("topScore").innerHTML = topScore;
            hideLoader()
        });
        dtTopScore.catch(error => {
            console.log(error)
        });
    }

    /**
     * * STANDING
     */
    let parsingStanding = () => {
        showLoader()
        let dtStanding = getStandings();
        dtStanding.then(data => {
            document.getElementById("leagueName").innerHTML = `${data.competition.area.name}, ${data.competition.name}`;
            // console.log('STANDING', data)
            showLoader()
            standing += `
                <table class="striped responsive-table">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Team</th>
                        <th>Games</th>
                        <th>Wins</th>
                        <th>Draws</th>
                        <th>Losses</th>
                        <th>For</th>
                        <th>Against</th>
                        <th>+/-</th>
                        <th>Points</th>
                    </tr>
                    </thead>
            
                    <tbody>
            `;
            if(data) {
                data.standings[0].table.map((data, i) => {
                    standing += `
                        <tr>
                            <td>${i+1}</td>
                            <td><img class="materialboxed" width="50" src="${data.team.crestUrl}" data-caption="${data.team.name}">${data.team.name}</td>
                            <td>${data.playedGames}</td>
                            <td>${data.won}</td>
                            <td>${data.draw}</td>
                            <td>${data.lost}</td>
                            <td>${data.goalsFor}</td>
                            <td>${data.goalsAgainst}</td>
                            <td>${data.goalDifference}</td>
                            <td>${data.points}</td>
                        </tr>
                    `;
                })
            }
            standing += `
                </tbody>
                </table>
            `;
            let elStanding = document.getElementById("standing");
            if(!elStanding.childElementCount) {
                let newElement = document.createElement('div');
                newElement.innerHTML = standing;
                document.getElementById("standing").appendChild(newElement);
            }
            // document.getElementById("standing").innerHTML = standing;

            var materialboxed = document.querySelectorAll('.materialboxed');
            M.Materialbox.init(materialboxed, {});
            
            hideLoader()
        });
        dtStanding.catch(error => {
            console.log(error)
        });
    }

    /**
     * * TEAMS
     */
    let parsingTeams = () => {
        showLoader()
        let dtTeams = getTeams();
        dtTeams.then(data => {
            document.getElementById("leagueName").innerHTML = `${data.competition.area.name}, ${data.competition.name}`;
            // console.log(data)
            // console.log(data.teams)
            // console.log('TEAMS', data)
            teams += `
                <table id="tbTeams" class="striped responsive-table">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Team</th>
                        <th>Official Name</th>
                        <th>Founded</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Venue</th>
                    </tr>
                    </thead>
            
                    <tbody>
            `;
            if(data) {
                data.teams.map((data, i) => {
                    let phone = '';
                    if(data.phone) {
                        phone = `<a href="tel:${data.phone}">${data.phone}</a>`;
                    } else {
                        phone = `-`;
                    }
                    teams += `
                        <tr>
                            <td>${i+1}</td>
                            <td>
                                <img class="materialboxed" width="50" src="${data.crestUrl}" data-caption="${data.name}">
                                <a href="#detail-team?=${data.id}" class="detailTeams">${data.shortName}</a>
                            </td>
                            <td>${data.name}</td>
                            <td>${data.founded}</td>
                            <td>${phone}</td>
                            <td>${data.address}</td>
                            <td>${data.venue}</td>
                        </tr>
                    `;
                })
            }
            teams += `
                </tbody>
                </table>
                <div id="detailTeams" style="display: none"></div>
            `;

            let elTeams = document.getElementById("teams");
            if(!elTeams.childElementCount) {
                let newElement = document.createElement('div');
                newElement.innerHTML = teams;
                document.getElementById("teams").appendChild(newElement);
            }
            
            let detailTeams = (hash) => {      
                id = hash.replace(/\D/g, '');
                let dtDetailTeams = getDetailTeams(id);
                let selTeams = document.getElementById('tbTeams');
                let selDetailTeams = document.getElementById('detailTeams');
                let detailTeams = '';
                dtDetailTeams.then(data => {
                    selTeams.style.display = 'none';
                    let {phone, website, email} = "";
                    let detailTeamsCompetitions = '';
                    let detailTeamsPlayers = '';
                    if(data.phone) {
                        phone = `<a href="tel: ${data.phone}">${data.phone}</a>`;
                    } else {
                        phone = ` - `;
                    }
                    if(data.website) {
                        website = `<a target="_blank" href="${data.website}">${data.website}</a>`;
                    } else {
                        website = ` - `;
                    }
                    if(data.email) {
                        email = `<a href="mailto: ${data.email}">${data.email}</a>`;
                    } else {
                        email = ` - `;
                    }

                    detailTeamsCompetitions += `
                        <table class="striped responsive-table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Competition</th>
                                    <th>Country</th>
                                    <th>Code</th>
                                </tr>
                            </thead>
                    
                            <tbody>
                    `;

                    if(data.activeCompetitions) {
                        data.activeCompetitions.map((data, i) => {
                            detailTeamsCompetitions += `
                                <tr>
                                    <td>${i+1}</td>
                                    <td>${data.name}</td>
                                    <td>${data.area.name}</td>
                                    <td>${data.code}</td>
                                </tr>
                            `;
                        })
                    }

                    detailTeamsCompetitions += `
                            </tbody>
                        </table>
                    `;

                    detailTeamsPlayers += `
                        <table class="striped responsive-table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Position</th>
                                    <th>ShirtNumber</th>
                                    <th>Role</th>
                                    <th>Birth of Date</th>
                                    <th>Nationality</th>
                                </tr>
                            </thead>
                    
                            <tbody>
                    `;

                    if(data.squad) {
                        data.squad.map((data, i) => {
                            detailTeamsPlayers += `
                                <tr>
                                    <td>${i+1}</td>
                                    <td>${data.name ? data.name : '-'}</td>
                                    <td>${data.position ? data.position : '-'}</td>
                                    <td>${data.shirtNumber ? data.shirtNumber : '-'}</td>
                                    <td>${data.role ? data.role : '-'}</td>
                                    <td>${data.dateOfBirth ? data.dateOfBirth : '-'}</td>
                                    <td>${data.nationality ? data.nationality : '-'}</td>
                                </tr>
                            `;
                        })
                    }

                    detailTeamsPlayers += `
                            </tbody>
                        </table>
                    `;

                    detailTeams += `
                    <div class="container">
                        <div class="row">
                            <div class="col s2 left-align">
                                <a id="back" class="btn-floating btn-small waves-effect waves-light blue"><i class="material-icons">arrow_back</i></a>
                            </div>
                            <div class="col s10 left-align">
                                ${data.name}
                            </div>
                        </div>

                    </div>
                    <div class="row">
                        <div class="col s12 m4">
                            <img class="materialboxed" weight="100%" src="${data.crestUrl}" data-caption="${data.name}">
                        </div>
                        <div class="col s12 m8">
                            <div class="card hoverable">
                                <div class="card-content">
                                    <a class="btn-floating btn-large halfway-fab waves-effect waves-light red hoverable">
                                        <i class="material-icons btn_saveUnsive">favorite_border</i>
                                    </a>
                                    <div class="row">
                                        <div class="col s12 m4">
                                            Name : <b>${data.name ? data.name : " - "}</b>
                                        </div>
                                        <div class="col s12 m4">
                                            Phone : <b>${phone}</b>
                                        </div>
                                        <div class="col s12 m4">
                                            Website : <b>${website}</b>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col s12 m4">
                                            Shost Name : <b>${data.shortName ? data.shortName : " - "}</b>
                                        </div>
                                        <div class="col s12 m4">
                                            Address : <b>${data.address ? data.address : " - "}</b>
                                        </div>
                                        <div class="col s12 m4">
                                            Email : <b>${email}</b>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col s12 m4">
                                            Founded : <b>${data.founded ? data.founded : " - "}</b>
                                        </div>
                                        <div class="col s12 m4">
                                            Club Colors : <b>${data.clubColors ? data.clubColors : " - "}</b>
                                        </div>
                                        <div class="col s12 m4">
                                            Venue : <b>${data.venue ? data.venue : " - "}</b>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="card hoverable">
                            <div class="card-content">
                                <span class="card-title">Active Competitions</span>
                                ${detailTeamsCompetitions}
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="card hoverable">
                            <div class="card-content">
                                <span class="card-title">Players</span>
                                ${detailTeamsPlayers}
                            </div>
                        </div>
                    </div>
                    `;
                    
                    // console.log(data);

                    selDetailTeams.style.display = '';
                    selDetailTeams.innerHTML = detailTeams;

                    let backDetailTeams = () => {
                        selTeams.style.display = '';
                        console.log('back');
                        history.pushState({}, null, '/');
                        selDetailTeams.style.display = 'none';
                    }

                    let btnBack = document.getElementById('back')
                    btnBack.addEventListener("click", backDetailTeams);

                    let selbtn_saveUnsive = document.getElementsByClassName("btn_saveUnsive")[0];

                    // button trigger to save/unsave team
                    let saveUnsive = () => {
                        let getValSaveUnasave = selbtn_saveUnsive.innerHTML;
                        if(getValSaveUnasave === "favorite_border") {
                            insertTeam(data);
                        } else {
                            deleteTeam(data.id);
                        }
                    }

                    selbtn_saveUnsive.addEventListener("click", saveUnsive);

                    // set fav when find result in indexdb
                    let idbe = getSavedTeam();
                    idbe.then(idb => {
                        var tm = idb.filter(el => el.id == data.id)[0]
                        let selbtn_saveUnsive = document.getElementsByClassName("btn_saveUnsive")[0];
                        if(tm) {
                            selbtn_saveUnsive.innerHTML = "favorite";
                        } else {
                            selbtn_saveUnsive.innerHTML = "favorite_border";
                        }
                    })

                    var materialboxed = document.querySelectorAll('.materialboxed');
                    M.Materialbox.init(materialboxed, {});
                });
            }
            
            for(let key in data.teams) {
                let selDetailTeams = document.getElementsByClassName('detailTeams')[parseInt(key)];
                let valId = selDetailTeams.attributes.href.value;
                selDetailTeams.addEventListener("click", function(){
                    detailTeams(valId)
                });
            }

            var materialboxed = document.querySelectorAll('.materialboxed');
            M.Materialbox.init(materialboxed, {});
            
            hideLoader()
        });
        dtTeams.catch(error => {
            console.log(error)
        });
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
    // console.log(tabss)

    // parsingMatch();
    // parsingTopScore();
    // parsingStanding();
    // parsingTeams();
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