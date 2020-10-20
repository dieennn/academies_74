let loadHome = () => {
    showLoader()
    let dtMatch = getMatches();
    let dtTopScore = getTopGoal();
    let dtStanding = getStandings();
    let select = ''
    let valSelect = ''
    let match = ''
    let topScore = ''
    let standing = ''
    let html = ''
    html += `
    <div class="card hoverable">
        <div class="card-content">
            <h1 id="leagueName"></h1>
        </div>
        <div class="card-tabs">
            <ul class="tabs tabs-fixed-width">
                <li class="tab"><a href="#match">Match</a></li>
                <li class="tab"><a href="#news">News</a></li>
                <li class="tab"><a href="#topScore">Top Score</a></li>
                <li class="tab"><a class="active" href="#standing">Standing</a></li>
                <li class="tab"><a href="#test6">Test 3</a></li>
            </ul>
        </div>
    `;

    /**
     * * MATCH
     */
    dtMatch.then(data => {
        // leagueName
        document.getElementById("leagueName").innerHTML = `${data.competition.area.name}, ${data.competition.name}`;
        // select MatchDay
        match += `
            <div class="row">
                <div class="col s4 right-align" style="margin-top: 2.5%;">
                  <a id="prev" class="btn-floating btn-small waves-effect waves-light blue"><i class="material-icons">arrow_back</i></a>
                </div>
                <div class="col s3 center-align">
                    <label>Match Day</label>
                    <select id="select" >

                    </select>
                </div>
                <div class="col s4 left-align" style="margin-top: 2.5%;">
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
        document.getElementById("match").innerHTML = match;
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

    /**
     * * TOP SCORE
     */
    dtTopScore.then(data => {
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
        document.getElementById("topScore").innerHTML = topScore;
        hideLoader()
    });

    /**
     * * STANDING
     */
    dtStanding.then(data => {
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
        document.getElementById("standing").innerHTML = standing;

        var materialboxed = document.querySelectorAll('.materialboxed');
        M.Materialbox.init(materialboxed, {});
        
        hideLoader()
    });


    html += `
        <div class="card-content">
            <div id="match"></div>
            <div id="news"></div>
            <div id="topScore"></div>
            <div id="standing"></div>
            <div id="test6">Test 3</div>
        </div>
    </div>
    `;
    document.getElementById("body-content").innerHTML = html;
}

var groupBy = function (xs, key) {
    return xs.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };