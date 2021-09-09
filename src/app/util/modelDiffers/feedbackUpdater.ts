import {Feedback} from '../../models/Feedback';


export function feedbackDiffer(oldFeedback: Feedback, newFeedback: Feedback) {
  if (oldFeedback.wasGood !== newFeedback.wasGood) {oldFeedback.wasGood = newFeedback.wasGood; }
  if (oldFeedback.wasBad !== newFeedback.wasBad) {oldFeedback.wasBad = newFeedback.wasBad; }
  if (oldFeedback.suggestions !== newFeedback.suggestions) {oldFeedback.suggestions = newFeedback.suggestions; }
  if (oldFeedback.isPublic !== newFeedback.isPublic) {oldFeedback.isPublic = newFeedback.isPublic; }
  if (oldFeedback.isAnonymous !== newFeedback.isAnonymous) {oldFeedback.isAnonymous = newFeedback.isAnonymous; }
  if (oldFeedback.userId !== newFeedback.userId) {oldFeedback.userId = newFeedback.userId; }
  if (oldFeedback.lanpartyId !== newFeedback.lanpartyId) {oldFeedback.lanpartyId = newFeedback.lanpartyId; }
}

