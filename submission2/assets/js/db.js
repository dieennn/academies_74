let dbx = idb.open('intifada-fci', 1, upgradeDb => {
  switch (upgradeDb.oldVersion) {
    case 0:
      upgradeDb.createObjectStore('matches', { 'keyPath': 'id' })
      upgradeDb.createObjectStore('teams', { 'keyPath': 'id' })
  }
});

let getSavedTeam = () => {
  return dbx.then(db => {
      var tx = db.transaction('teams', 'readonly');
      var store = tx.objectStore('teams');
      return store.getAll();
  })
}

let insertTeam = (team) => {
  dbx.then(db => {
    let tx = db.transaction('teams', 'readwrite');
    let store = tx.objectStore('teams')
    team.createdAt = new Date().getTime()
    store.put(team)
    return tx.complete;
  }).then(() => {
    M.toast({ html: `${team.name} berhasil disimpan!` });
    document.getElementsByClassName("btn_saveUnsive")[0].innerHTML = "favorite";
  }).catch(err => {
    M.toast({ html: `${team.name} gagal disimpan!` })
    console.error('Team gagal disimpan', err);
  });
}

let deleteTeam = (teamId) => {
  dbx.then(db => {
    let tx = db.transaction('teams', 'readwrite');
    let store = tx.objectStore('teams');
    store.delete(teamId);
    return tx.complete;
  }).then(() => {
    document.getElementsByClassName("btn_saveUnsive")[0].innerHTML = "favorite_border";
    M.toast({ html: 'Team berhasil dihapus!' });
    // loadFavTeams();
  }).catch(err => {
    console.error('Team gagal dihapus: ', err);
  });
}