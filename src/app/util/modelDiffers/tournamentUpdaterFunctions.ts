import {Tournament} from '../../models/Tournament';

export function tournamentsDiffer(oldTournaments: Tournament[], newTournaments: Tournament[]){
  if (oldTournaments) {
    oldTournaments.forEach( oldTournament => {
      const foundTournament = newTournaments.find(newTournament => oldTournament.id.toString() === newTournament.id.toString());
      if (foundTournament) {
        tournamentDiffer(oldTournament, foundTournament);
      } else {
        removeTournament(oldTournaments, oldTournament);
      }
    });
    addMissingTournaments(oldTournaments, newTournaments);
  }
}

function removeTournament(oldTournaments: Tournament[], tournamentToRemove: Tournament) {
  const index = oldTournaments.indexOf(tournamentToRemove);
  if (index !== null) {
    oldTournaments.splice(index, 1);
  }
}

function addMissingTournaments(oldTournaments: Tournament[], newTournaments: Tournament[]) {
  newTournaments.forEach( newTournament => {
    const missingTournament = oldTournaments.find( oldTournament => newTournament.id.toString() === oldTournament.id.toString());
    if (!missingTournament) {
      oldTournaments.push(newTournament);
    }
  });
}

export function tournamentDiffer(oldT: Tournament, newT: Tournament) {
  if (oldT.name !== newT.name) {oldT.name = newT.name; }
  if (oldT.teamRegistration !== newT.teamRegistration) {oldT.teamRegistration = newT.teamRegistration; }
  if (oldT.numberOfParticipants !== newT.numberOfParticipants) {oldT.numberOfParticipants = newT.numberOfParticipants; }
  if (oldT.published !== newT.published) {oldT.published = newT.published; }
  if (oldT.started !== newT.started) {oldT.started = newT.started; }
  if (oldT.finished !== newT.finished) {oldT.finished = newT.finished; }
  if (oldT.startDate !== newT.startDate) {oldT.startDate = newT.startDate; }
  if (oldT.awards !== newT.awards) {oldT.awards = newT.awards; }
  if (oldT.challongeParticipantsAdded !== newT.challongeParticipantsAdded)
    { oldT.challongeParticipantsAdded = newT.challongeParticipantsAdded; }
  if (oldT.challongeTournamentStarted !== newT.challongeTournamentStarted)
  { oldT.challongeTournamentStarted = newT.challongeTournamentStarted; }

  if (oldT.gameMode !== newT.gameMode) { oldT.gameMode = newT.gameMode; }
  if (oldT.tournamentType !== newT.tournamentType) { oldT.tournamentType = newT.tournamentType; }
  if (oldT.lanparty !== newT.lanparty) { oldT.lanparty = newT.lanparty; }
}

