import {Lanparty} from '../../models/Lanparty';

export function lanpartiesDiffer(oldLanparties: Lanparty[], newLanparties: Lanparty[]) {
  oldLanparties.forEach(oldLanparty => {
    const foundLanparty = newLanparties.find(x => x.getId().toString() === oldLanparty.getId().toString());
    if (foundLanparty) {
      lanpartyDiffer(oldLanparty, foundLanparty);
    } else {
      removeLanparty(oldLanparties, oldLanparty);
    }
  });
  addMissingLanparties(oldLanparties, newLanparties);
}

export function lanpartyDiffer(oldLanparty: Lanparty, newLanparty: Lanparty) {
  if (oldLanparty.name !== newLanparty.name) {oldLanparty.name = newLanparty.name; }
  if (oldLanparty.active !== newLanparty.active) {oldLanparty.active = newLanparty.active; }
  if (oldLanparty.startDate !== newLanparty.startDate) {oldLanparty.startDate = newLanparty.startDate; }
  if (oldLanparty.endDate !== newLanparty.endDate) {oldLanparty.endDate = newLanparty.endDate; }
}

function removeLanparty(oldLanparty: Lanparty[], lanpartyToRemove: Lanparty) {
  const index = oldLanparty.indexOf(lanpartyToRemove);
  if (index !== null) {
    oldLanparty.splice(index, 1);
  }
}


function addMissingLanparties(oldLanparties: Lanparty[], newLanparties: Lanparty[]) {
  newLanparties.forEach( newLanparty => {
    const missingLanparty = oldLanparties.find( x => x.getId().toString() === newLanparty.getId().toString());
    if (!missingLanparty) {
      oldLanparties.push(newLanparty);
    }
  });
}
