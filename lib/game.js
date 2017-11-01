'use strict'

const players = require ('./players')
const log = require ('./log')
const _ = require('lodash')
const removeDiacritics = require('diacritics').remove

module.exports = {
  setIo,
  start,
  getData,
  getRevelations,
  reset,
  decisionStop,
  voteStop,
  auctionStop,
  transferMoney,
  mp,
  action
}

//var cards = []
var secretStrings = [
  "a moulé la Statue de la Liberté sur le corps de Néfertiti",
  "a modélisé sur une puce le cerveau d’Albert Einstein",
  "a lancé sur le président Kennedy des Oeufs Génétiquements Avariés",
  "a déclenché la guerre en Irak pour récupérer le sabre laser de Saddam Hussein",
  "a volé et monnayé sur Ebay le nez du Sphinx de Gizeh",
  "a inséré une molécule extra-terrestre dans l’ADN du premier bébé éprouvette",
  "a déclenché la crise de Wall Street en revendant des actions contre des images de chatons larmoyant",
  "a fait exploser le popcorn qui a provoqué l’éruption du Vésuve anéantissant Pompéi",
  "a penché la Tour de Pise pour aligner l’axe de la Terre avec le Soleil",
  "a détourné une soucoupe volante sur Google Earth",
  "a kidnappé Vadik, le petit poney du président Russe créant une crise diplomatique européenne",
  "a provoqué la fin de l’ère Secondaire en enfermant les dinosaures dans les boîtes de Dinosaurus",
  "a libéré le monstre du Loch Ness qui a provoqué le Tsunami près de Fukushima",
  "a désorienté Pluton pour la faire sortir du système solaire",
  "a largué 1 400 saucisses molotov sur la Baie des Cochons",
  "a inséré une bulle contenant le virus de la peste dans les internets de l’an 2 000",
  "a créé un automate succubien pour séduire le président du FMI",
  "a lancé de la javel oxygénée sur le visage de Michael Jackson",
  "a créé l’EspionUltraRadiochimiqueOptimisé, une monnaie unique pour les gouverner tous !",
  "a modifié la formule du Coca Cola pour asservir mentalement la population mondiale",
  "a détourné l’argent des français pour acheter une Delorean et retourner vers le futur",
  "a échangé les lettres d’Hollywood pour envoyer un message aux Martiens",
  "a détourné des four micro-ondes pour accélérer le réchauffement climatique",
  "a injecté un virus dans des réfrigérateurs connectés pour transmettre le ver solitaire dans le monde entier",
  "a retrouvé et décongelé le cerveau d'Hitler",
  "a des satellites de contrôle mental par rayon laser",
// dummy fill
  "a retrouvé et décongelé le cerveau d'Hitler",
  "a contrôlé la mafia sicilienne",
  "a la main basse sur tous les systèmes d'égout de paris",
  "a les codes de la moitié des missiles nucléaires de la Corée du Nord",
  "a des contacts avec les mormons et ont un accès à leur base de donnée",
  "a une base sur la face cachée de la lune",
  "a des satellites de contrôle mental par rayon laser",
  "a recollé les morceaux du crâne de cristal",
  "a préparé l'élection d'un zombie à la présidence russe",
  "a cloné tous les plus grands scientifiques",
  "a resynthétisé l'ADN du T-REX",
  "a maîtrisé la fusion froide",
  "a soudoyé presque tous les responsables de la CIA",
  "a mis au point une drogue d’obéissance indétectable",
  "a racheté la moitié des missiles russe",
  "a créé une émission pour enfants qui leur lave le cerveau",
  "a réussi à introduire ses messages subliminaux dans la plupart des publicités",
  "a les principaux opérateurs de TV sous leur coupe",
  "a les chanteurs pops à sa solde pour diffuser leurs messages",
  "a des nano bots près à répandre n’importe quel virus",
  "a retrouvé le saint graal et s'apprête à s’en servir",
  "a trouvé un wormhole au fond d’une cavité sous marine",
  "a des postes clés au sein des principaux ministères de l’éducation",
  "a creusé un tunnel pour accéder au Warehouse 23",
  "a téléchargé tous les documents techniques de la zone 51",
  "a synthétisé une enzyme qui rend nos arbres carnivores",
  "a des satellites qui contrôlent la météo en n’importe quel point du globe",
  "a créé un soleil miniature",
  "a implanté une puce de contrôle dans chaque opérationnel du KGB",
  "a piraté l’ensemble des drones de guerre américains",
  //add by max 01/11/17
  "a répandu dans le monde une danse alien nommée 'tecktonik'",
  "a gagné le concours de miss univers pour envouter les hommes politiques",
  "a gagné le prix nobel grace à son sabre laser",
  "a placé des caméras de vidéo surveillance dans les toilettes du Reichstag",
  "a fabriqué la Delorean pour gagner la course à l'espace",
  "a dessiné le plan d'une arme chimique dans la grotte de Lascaux",
  "a dérobé un stocke de baguettes magiques à l'école des sorciers",
  "a fait exploser une plateforme pétrolière américaine en faisant du pop-corn",
  "a retrouvé les codes nucléaires coréens dans les décimales de PI",
  "a découvert la formule d'un filtre d'amour à l'aide du nombre d'or",
  "a transformé un accélérateur de particules en rayon de la mort",
  "a moulé la statue de la liberté sur le corps de Nefertiti",
  "a créé l'euro, une monnaie unique pour les gouverner tous",
  "a kidnappé Vadik, le petit poney du président Russe",
  "a créé un automate succubien pour séduire le président du FMI",
  "a voté pour Trump",
  "a jeté une malédiction sur la tombe de Michael Jackson",
  "a financé le dernier film de Luc Besson (et n'aurait pas dû)",
  "a remplit la fontaine de Lourdes avec du Perrier",
  
]
/* var secretStrings = [
  "ils ont retrouvé et décongelé le cerveau d'Hitler",
  "ils contrôlent la mafia sicilienne",
  "ils ont la main basse sur tous les systèmes d'égout de paris",
  "ils ont les codes de la moitié des missiles nucléaires de la Corée du Nord",
  "ils sont de mèche avec les mormons et ont un accès à leur base de donnée",
  "ils ont une base sur la face cachée de la lune",
  "ils ont des satellites de contrôle mental par rayon laser",
  "ils ont recollé les morceaux du crâne de cristal",
  "ils préparent l'élection d'un zombie à la présidence russe",
  "ils ont cloné tous les plus grands scientifiques",
  "ils ont resynthétisé l'ADN du T-REX",
  "ils maîtrisent la fusion froide",
  "ils ont soudoyé presque tous les responsables de la CIA",
  "ils ont mis au point une drogue d’obéissance indétectable",
  "ils ont racheté la moitié des missiles russe",
  "ils ont créé une émission pour enfants qui leur lave le cerveau",
  "ils ont réussi à introduire leurs messages subliminaux dans la plupart des publicités",
  "ils ont les principaux opérateurs de TV sous leur coupe",
  "ils ont les chanteurs pops à leur solde pour diffuser leurs messages",
  "ils ont des nano bots près à répandre n’importe quel virus",
  "ils ont retrouvé le saint graal et s'apprêtent à s’en servir",
  "ils ont trouvé un wormhole au fond d’une cavité sous marine",
  "ils ont des postes clés au sein des principaux ministères de l’éducation",
  "ils ont creusé un tunnel pour accéder au Warehouse 23",
  "ils ont téléchargé tous les documents techniques de la zone 51",
  "ils ont synthétisé une enzyme qui rend nos arbres carnivores",
  "ils ont des satellites qui contrôlent la météo en n’importe quel point du globe",
  "ils ont créé un soleil miniature",
  "ils ont implanté une puce de contrôle dans chaque opérationnel du KGB",
  "ils ont piraté l’ensemble des drones de guerre américains",
] */

var secrets = []

var allSecrets = []

var teamStrings = ["Illuminati", "Scientolog", "UFO"]

var teams = []

var soloCounts = [0, 0, 0, 0, 0, 0, 0, 1, 2]

var bank = 0

var io

var loseCount = 2

//var id
function setIo(ioIn) {
  io = ioIn
}
// this function picks a secret and adds it to the list of cards
// it returns a secret
function pickSecret (/*, names*/) {
  var s = secrets[Math.trunc(Math.random()*secrets.length)]
  secrets = secrets.filter(v => s !== v)
  allSecrets.push(s)
  //names.forEach(name => cards.push({id:id++, name, secret:s}))
  return s
}

function addSecret (name, secret) {
  var secrets = players.getData(name, "secrets") || []
  secrets.push(secret)
  players.setData(name, "secrets", secrets)
}

function addKnowledge (name, knowledge) {
  var knowledges = players.getData(name, "knowledges") || []
  knowledges.push(knowledge)
  players.setData(name, "knowledges", knowledges)
}

/* function buildTeamSecretsShared (teams, shareCount, secretCount) {
  teams.forEach ((team, teamIndex) => {
    team.forEach ((name, nameIndex) => {
      players.setData(name, "team", teamStrings[teamIndex])
      for (let j=0; j < shareCount; j++) {
        let nextName = team[(nameIndex+1)%team.length]
        let secret = pickSecret(secrets, [name, nextName])
        addSecret(name, {secret, isShared:true})
        addSecret(nextName, {secret, isShared:true})
      }
      for (let j = 0; j < secretCount - shareCount * 2; j++) {
        let secret = pickSecret(secrets, [name])
        addSecret(name, {secret, isShared:false})
      }
    })
  })
} */

function buildSoloSecrets (names, secretCount) {
  names.forEach ((name) => {
    players.setData(name, "team", "solo")
    for (let j = 0; j < secretCount; j++) {

      let secret = pickSecret(secrets, [name])
      addSecret(name, {secret, isShared:false})
    }
  })
}

function buildTeamSecrets (teams, knowledgeCount, secretCount) {
  teams.forEach ((team, teamIndex) => {
    // add secrets
    team.forEach ((name) => {
      players.setData(name, "team", teamStrings[teamIndex])
      for (let j = 0; j < secretCount; j++) {
        let secret = pickSecret(secrets, [name])
        addSecret(name, {secret, isRevealed:false})
      }
    })

    // add knowledges
    team.forEach ((name, nameIndex) => {
      for (let j = 0; j < knowledgeCount; j++) {
        let nextName = team[(nameIndex+1+j)%team.length]
        let secrets = players.getData(name, "secrets")
        let secret = secrets[j]
        addKnowledge(nextName, secret)
      }
    })
  })
}

function shuffleSecrets () {
  var playerNames = players.listPlayerNames()
  playerNames.forEach(name => {
    var secrets = players.getData(name, "secrets")
    secrets = shuffle(secrets)
    players.setData(name, "secrets", secrets)
  })
}

// create teams
function createTeams (playerNames) {
  let teams = []
  playerNames = shuffle(playerNames)
  teams[0] = _.slice(playerNames, 0, playerNames.length/2)
  teams[1] = _.slice(playerNames, playerNames.length/2)
  return teams
}



function shuffle (array) {
  var currentIndex = array.length, temporaryValue, randomIndex

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1

    // And swap it with the current element.
    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }

  return array
}

function start () {
  console.log("game starts with ")
  players.tracePlayers()

  // create teams
  var teamNames = players.listPlayerNames()
  teamNames = shuffle(teamNames)
  var soloNames = []
  var soloCount = soloCounts[teamNames.length]
  for(let i=0;i<soloCount;i++) {
    soloNames.push(teamNames.pop())
  }
  teams = createTeams(teamNames)
  console.log(teams)

  // clone secret strings
  secrets = _.concat(secretStrings)

  // build team secrets
  // buildTeamSecrets(teams, 1, 5)
  buildTeamSecrets(teams, 2, 5)
  buildSoloSecrets(soloNames, 5)
  shuffleSecrets ()
  players.tracePlayers()

  setBank(10)
  players.listPlayerNames().forEach(p => players.setData(p, "money", 10))
  players.listPlayerNames().forEach(p => console.log(p, players.getData(p, "secrets"), players.getData(p, "team")))
}

function setBank(value) {
  bank = value
  io.emit("players-bank", bank)
}

function gameOver(winners) {
  console.log("GAME OVER #############")
  console.log(winners)
  let data = {}

  data.winnerTeams = winners.reduce((a,v) => a + ' ' + teamStrings[v], '')
  data.winners = []
  winners.forEach(i => data.winners = data.winners.concat(teams[i]))
  console.log(data.winners)
  data.messages = log.messagesAll()
  data.votes = log.votesAll()
  console.log(data)
  io.emit("gameOver", data)
}

function reset () {
  players.resetPlayers()
  log.reset()
}

function getRevelations () {
  let revelations = []
  players.listPlayerNames().forEach(name => {
    secrets = players.getData(name, "secrets")
    if(secrets) {
      secrets.forEach((secret, i) => {
        if(secret.isRevealed) {
          revelations.push({name, card:i+1, secret})
        }
      })
    }
  })
  console.log("revelations", revelations)
  return revelations
}

function getData (keys, playerName) {
  switch(keys[0]) {
  case "player": {
    let name = keys[1]
    let data = {
      team:players.getData(name, "team"),
      secrets:players.getData(name, "secrets"),
      money:players.getData(name, "money"),
      knowledges:players.getData(name, "knowledges"),
      bank:bank,
      allSecrets:allSecrets
    }
    players.pushHistory(playerName, "player", data)
    return data
  }
  case "card": {
    let name = keys[1]
    let secrets = players.getData(name, "secrets")
    let secret = "bug"
    if(secrets && secrets[Number(keys[2])]) {
      secret = secrets[Number(keys[2])]
    }
    let data = secret
    players.pushHistory(playerName, "card", {name, card:keys[2], data})
    return data
  }
  case "word": {
    let word = removeDiacritics(keys[1]).toLowerCase()
    let names = {}
    players.listPlayerNames().forEach(name => {
      let secrets = players.getData(name, "secrets")
      secrets.forEach(secret => {
        if(removeDiacritics(secret.secret).toLowerCase().search('.*'+word) !== -1) {
          names[name] = name
        }
      })
    })
    let data = word + ":"+ Object.keys(names).reduce((a, c) => a + ' ' + c, '')
    players.pushHistory(playerName, "word", {word, data:data})
    return data
  }
  }
}

function removeAllHacks() {
  var extraBank = 0
  players.listPlayerNames().forEach(player => {
    var hacks = players.getData(player, "hacks") || {}
    if(hacks.mp) {
      Object.keys(hacks.mp).forEach(type => {
        hacks.mp[type].forEach(hack => {
          extraBank += hack.cost
          players.getSocket(player).emit('hack-stop', type, hack.name)
        })
      })
    }
    players.setData(player, 'hacks', {})
  })
  setBank(bank + extraBank)
}

function activateHack(target, source, type, isTarget, cost, duration) {
  console.log(target, source, type, isTarget, cost, duration)
  if(players.getData(source, "money") < cost) {
    return false
  }
  var player = isTarget ? target : source
  var hacks = players.getData(player, "hacks") || {}
  hacks.mp = hacks.mp || {}
  hacks.mp[type] = hacks.mp[type] || []
  var hack = {origin:source, name:isTarget ? source : target, left:duration, cost}
  hacks.mp[type].push(hack)
  players.setData(player, "hacks", hacks)
  players.setData(source, "money", players.getData(source, "money") - cost)
  players.getSocket(source).emit('hack-start', type, target)
  /* var check = function() {
    if(hack.left <= 0) {
      //setBank(bank + cost)
      let index = _.findIndex(hacks.mp[type], {origin:source})
      if(index >= 0) {
        _.pullAt(hacks.mp[type], [index])
      }
    } else {
      hack.left -= 1000
      setTimeout(check, 1000)
    }
  }
  check() */
  return true
}

function action (keys, playerName) {
  switch(keys[0]) {
  case "hack-jam": {
    return activateHack(keys[1], playerName, "jammers", true, 5, 15000)
  }
  case "hack-spy": {
    return activateHack(keys[1], playerName, "spies", true, 5, 15000)
  }
  case "hack-usurp": {
    return activateHack(keys[1], playerName, "usurpators", false, 3, 5000)
  }
  }
}

function auctionStop(auctions) {
  var highestBid = auctions.reduce((highest, auction) => auction.value > highest ? auction.value : highest, 0)
  var winners = auctions.filter(auction => auction.value >= highestBid ? true : false)
  winners.forEach(winner => {
    setBank(bank + winner.value)
    winner.bids.forEach(bid => {
      players.setData(bid.player, "money", players.getData(bid.player, "money") - bid.value)
    })
  })
  removeAllHacks()
}

function voteStop(votes) {
  var targets = []
  var names = players.listPlayerNames()
  console.log("############ VOTES")
  //console.log(votes)
  Object.keys(votes).forEach(name => {

    var index = Math.trunc((votes[name].y - 45) / 50)
    targets.push({voter:name, target:names[index]})
  })
  targets.forEach(item => log.votesAdd(item.voter, item.target))
  var counts = names.map(name => {
    var count = targets.reduce((a,v) => v.target === name ? a + 1 : a, 0)
    return {name, count}
  })
  counts.sort( (a, b) => b.count - a.count )
  counts = counts.filter(v => v.count >= counts[0].count)

  counts.forEach(count => {
    let secrets = players.getData(count.name, "secrets")
    let notRevealed = secrets.filter(v => !v.isRevealed)

    if(notRevealed.length > 0){
      let index = Math.trunc(Math.random() * notRevealed.length)
      notRevealed[index].isRevealed = true
      console.log(notRevealed[index].secret)
      //notRevealed[0].isRevealed = true
    }

  })

  io.emit('revelation-update')
  checkVictory()
  // console.log(counts)
}

function checkVictory()
{
  let revealCount = []
  teams.forEach((team, i) => {
    revealCount[i] = 0
    team.forEach(name => {
      let secrets = players.getData(name, "secrets")
      revealCount[i] += secrets.filter(v => v.isRevealed).length
    })
  })

  let isGameOver = false
  revealCount.forEach((count, i) =>{
    if (count >= loseCount) {
      isGameOver = true
      console.log("team", i, "loses")
      console.log("team", teamStrings[i], "loses")
      teams[i].forEach(name => {
        console.log(name, "loses")
      })
    }
  })

  if(isGameOver) {
    let winners = []
    revealCount.forEach((count, i) =>{
      if (count < loseCount) {
        isGameOver = true
        console.log("team", i, "wins")
        console.log("team", teamStrings[i], "wins")
        teams[i].forEach(name => {
          console.log(name, "wins")
        })
        winners.push(i)
      }
    })
    gameOver(winners)
  }
}

function decisionStop(decisions) {
  /* var bankCount = Object.keys(decisions).reduce((total, name) => decisions[name].y < 75 ? total + 1 : total, 0)
  var revealCount = Object.keys(decisions).reduce((total, name) => decisions[name].y > 325 ? total + 1 : total, 0)
  var moneyUpdate = 0
  if(bankCount > 0) {
    moneyUpdate = Math.trunc(bank/bankCount)
  }
  var revealCost = revealCount */
  var checks = []
  var names = players.listPlayerNames()
  Object.keys(decisions).forEach(name => {

    /* if(decisions[name].y < 75) {
      players.setData(name, "money", players.getData(name, "money") + moneyUpdate)
    } */
    /*if(decisions[name].y > 325) {
      players.setData(name, "money", players.getData(name, "money") - revealCost)
    }*/
/*     if((decisions[name].y > 75) && (decisions[name].y < 500)) {
      var index = Math.trunc((decisions[name].y- 75) / 50)
      checks.push({checker:name, checkee:names[index]})
    }*/
    var index = Math.trunc((decisions[name].y - 45) / 50)
    checks.push({checker:name, checkee:names[index]})
  })
  checks.forEach(check => {
    var checkee = check.checkee || names[Math.trunc(Math.random() * names.length)]
    while(names.length > 1 && check.checker === checkee) {
      checkee = names[Math.trunc(Math.random() * names.length)]
    }
    players.getSocket(check.checker).emit('check', checkee)
  })
//  setBank(bank - moneyUpdate * bankCount + revealCost * revealCount)
  console.log(checks)
}

function transferMoney (source, destination, amount) {
  if(destination === "bank") {
    players.setData(source, 'money', players.getData(source, 'money') + amount)
    setBank(bank - amount)
  }
}

function mp (player, target, message) {
  log.messagesAdd(player, target, message)
  let actions = []
  let playerHacks = players.getData(player, "hacks")
  let targetHacks = players.getData(target, "hacks")
  let messageUser = player
  if(playerHacks && playerHacks.mp && playerHacks.mp.usurpators && playerHacks.mp.usurpators.length > 0) {
    messageUser = playerHacks.mp.usurpators[0].name
  }


  if(targetHacks && targetHacks.mp && targetHacks.mp.jammers && targetHacks.mp.jammers.length > 0) {
    message = message.replace(/[AEIOUYaeiouy]/g, function() {
      return message.charAt(Math.trunc(message.length * Math.random()))
    })
  }
  if(targetHacks && targetHacks.mp && targetHacks.mp.spies) {
    targetHacks.mp.spies.forEach(spy => actions.push({user:messageUser, target:spy.name, message:'=>' + target + '[' + message + ']'}))
  }
  actions.push({user:messageUser, target, message})
  return actions
}
