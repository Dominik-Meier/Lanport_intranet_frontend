import {TournamentType} from '../../models/TournamentType';

export function tournamentTypesDiffer(oldTournamentTypes: TournamentType[], newTournamentTypes: TournamentType[]) {
  oldTournamentTypes.forEach(oldTournamentType => {
    const foundTournamentType = newTournamentTypes.find(x => x.getId().toString() === oldTournamentType.getId().toString());
    if (foundTournamentType) {
      tournamentTypeDiffer(oldTournamentType, foundTournamentType);
    } else {
      removeTournamentType(oldTournamentTypes, oldTournamentType);
    }
  });
  addMissingTournamentTypes(oldTournamentTypes, newTournamentTypes);
}

export function tournamentTypeDiffer(oldTournamentType: TournamentType, newTournamentType: TournamentType) {
  if (oldTournamentType.name !== newTournamentType.name) {oldTournamentType.name = newTournamentType.name; }
}

function removeTournamentType(oldTournamentType: TournamentType[], TournamentTypeToRemove: TournamentType) {
  const index = oldTournamentType.indexOf(TournamentTypeToRemove);
  if (index !== null) {
    oldTournamentType.splice(index, 1);
  }
}


function addMissingTournamentTypes(oldTournamentTypes: TournamentType[], newTournamentTypes: TournamentType[]) {
  newTournamentTypes.forEach( newTournamentType => {
    const missingTournamentType = oldTournamentTypes.find( x => x.getId().toString() === newTournamentType.getId().toString());
    if (!missingTournamentType) {
      oldTournamentTypes.push(newTournamentType);
    }
  });
}
