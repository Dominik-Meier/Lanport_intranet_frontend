import {GameMode} from '../../models/GameMode';

export function gameModesDiffer(oldGameModes: GameMode[], newGameModes: GameMode[]) {
  oldGameModes.forEach(oldGameMode => {
    const foundGameMode = newGameModes.find(x => x.getId().toString() === oldGameMode.getId().toString());
    if (foundGameMode) {
      gameModeDiffer(oldGameMode, foundGameMode);
    } else {
      removeGameMode(oldGameModes, oldGameMode);
    }
  });
  addMissingGameModes(oldGameModes, newGameModes);
}

export function gameModeDiffer(oldGameMode: GameMode, newGameMode: GameMode) {
  if (oldGameMode.name !== newGameMode.name) {oldGameMode.name = newGameMode.name; }
  if (oldGameMode.game !== newGameMode.game) {oldGameMode.game = newGameMode.game; }
  if (oldGameMode.elimination !== newGameMode.elimination) {oldGameMode.elimination = newGameMode.elimination; }
  if (oldGameMode.teamSize !== newGameMode.teamSize) {oldGameMode.teamSize = newGameMode.teamSize; }
  if (oldGameMode.rules !== newGameMode.rules) {oldGameMode.rules = newGameMode.rules; }
}

function removeGameMode(oldGameMode: GameMode[], GameModeToRemove: GameMode) {
  const index = oldGameMode.indexOf(GameModeToRemove);
  if (index !== null) {
    oldGameMode.splice(index, 1);
  }
}


function addMissingGameModes(oldGameModes: GameMode[], newGameModes: GameMode[]) {
  newGameModes.forEach( newGameMode => {
    const missingGameMode = oldGameModes.find( x => x.getId().toString() === newGameMode.getId().toString());
    if (!missingGameMode) {
      oldGameModes.push(newGameMode);
    }
  });
}
