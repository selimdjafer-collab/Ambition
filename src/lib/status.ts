import type { HelpRequest, ParticipantWorkshopStatus, Submission } from './types';

/** Statut d'un participant (ou de son binôme) sur un atelier, calculé sur des actions réelles. */
export function deriveStatus(submission: Submission | undefined, openHelp: boolean): ParticipantWorkshopStatus {
  if (openHelp) return 'help_requested';
  if (!submission) return 'not_started';
  switch (submission.status) {
    case 'validated':
      return 'validated';
    case 'needs_revision':
      return 'needs_revision';
    case 'submitted':
      return 'submitted';
    default:
      return 'in_progress';
  }
}

export function statusTone(s: ParticipantWorkshopStatus): 'neutral' | 'info' | 'success' | 'warning' | 'danger' | 'brand' {
  switch (s) {
    case 'validated':
      return 'success';
    case 'submitted':
      return 'brand';
    case 'needs_revision':
      return 'warning';
    case 'help_requested':
      return 'danger';
    case 'in_progress':
      return 'info';
    default:
      return 'neutral';
  }
}

export function submissionFor(submissions: Submission[], workshopId: string, userId: string, teamId: string | null): Submission | undefined {
  return submissions.find((s) => s.session_workshop_id === workshopId && (teamId ? s.team_id === teamId : s.owner_id === userId && !s.team_id));
}

export function openHelpFor(help: HelpRequest[], workshopId: string | null, userId: string, teamId: string | null): boolean {
  return help.some((h) => h.status !== 'resolved' && (workshopId === null || h.session_workshop_id === workshopId) && (h.requester_id === userId || (teamId !== null && h.team_id === teamId)));
}
