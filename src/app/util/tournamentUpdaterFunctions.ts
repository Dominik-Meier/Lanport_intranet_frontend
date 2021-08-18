import {Tournament} from '../models/Tournament';

export function tournamentDiffer(oldT: Tournament, newT: Tournament) {
  if (oldT.name !== newT.name) {oldT.name = newT.name; }
  if (oldT.teamRegistration !== newT.teamRegistration) {oldT.teamRegistration = newT.teamRegistration; }
  if (oldT.numberOfParticipants !== newT.numberOfParticipants) {oldT.numberOfParticipants = newT.numberOfParticipants; }
  if (oldT.published !== newT.published) {oldT.published = newT.published; }
  if (oldT.started !== newT.started) {oldT.started = newT.started; }
  if (oldT.finished !== newT.finished) {oldT.finished = newT.finished; }
  if (oldT.startDate !== newT.startDate) {oldT.startDate = newT.startDate; }

  if (oldT.gameMode !== newT.gameMode) { oldT.gameMode = newT.gameMode; }
  if (oldT.tournamentType !== newT.tournamentType) { oldT.tournamentType = newT.tournamentType; }
  if (oldT.lanparty !== newT.lanparty) { oldT.lanparty = newT.lanparty; }
}

