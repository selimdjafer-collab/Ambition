import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useAuth } from '../auth/AuthProvider';
import type { RealtimeTable } from '../lib/backend/types';
import type { Enrollment, Evaluation, HelpRequest, Idea, Poll, PollAnswer, Profile, Session, SessionWorkshop, SharedExample, Submission, Team, TeamMember } from '../lib/types';

export interface SessionData {
  session: Session;
  workshops: SessionWorkshop[];
  enrollments: Enrollment[];
  teams: Team[];
  members: TeamMember[];
  profiles: Profile[];
  submissions: Submission[];
  helpRequests: HelpRequest[];
  evaluations: Evaluation[];
  polls: Poll[];
  pollAnswers: PollAnswer[];
  ideas: Idea[];
  sharedExamples: SharedExample[];
}

/**
 * Charge l'état d'une session et le maintient à jour via les abonnements
 * temps réel (chaque changement de table déclenche un rechargement ciblé).
 * Un rafraîchissement de secours périodique couvre les événements perdus.
 */
export function useSessionData(sessionId: string | undefined) {
  const { backend } = useAuth();
  const [data, setData] = useState<SessionData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [connected, setConnected] = useState(true);
  const [lastSync, setLastSync] = useState<number | null>(null);
  const dataRef = useRef<SessionData | null>(null);
  dataRef.current = data;

  const loadAll = useCallback(async () => {
    if (!sessionId) return;
    try {
      const session = await backend.getSession(sessionId);
      if (!session) {
        setError('Session introuvable ou accès refusé.');
        return;
      }
      const [workshops, enrollments, teamsRes, profiles, submissions, helpRequests, polls, pollAnswers, ideas, sharedExamples] = await Promise.all([
        backend.listSessionWorkshops(sessionId),
        backend.listEnrollments(sessionId),
        backend.listTeams(sessionId),
        backend.listSessionProfiles(sessionId),
        backend.listSubmissions(sessionId),
        backend.listHelpRequests(sessionId),
        backend.listPolls(sessionId),
        backend.listPollAnswers(sessionId),
        backend.listIdeas(sessionId),
        backend.listSharedExamples(sessionId),
      ]);
      const evaluations = await backend.listEvaluations(submissions.map((s) => s.id));
      setData({ session, workshops, enrollments, teams: teamsRes.teams, members: teamsRes.members, profiles, submissions, helpRequests, evaluations, polls, pollAnswers, ideas, sharedExamples });
      setError(null);
      setLastSync(Date.now());
      setConnected(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
      setConnected(false);
    }
  }, [backend, sessionId]);

  const reloadTable = useCallback(
    async (table: RealtimeTable) => {
      if (!sessionId || !dataRef.current) return loadAll();
      try {
        const patch: Partial<SessionData> = {};
        switch (table) {
          case 'sessions': {
            const s = await backend.getSession(sessionId);
            if (s) patch.session = s;
            break;
          }
          case 'session_workshops':
            patch.workshops = await backend.listSessionWorkshops(sessionId);
            break;
          case 'enrollments':
            patch.enrollments = await backend.listEnrollments(sessionId);
            patch.profiles = await backend.listSessionProfiles(sessionId);
            break;
          case 'teams':
          case 'team_members': {
            const t = await backend.listTeams(sessionId);
            patch.teams = t.teams;
            patch.members = t.members;
            break;
          }
          case 'submissions': {
            patch.submissions = await backend.listSubmissions(sessionId);
            patch.evaluations = await backend.listEvaluations(patch.submissions.map((s) => s.id));
            break;
          }
          case 'evaluations':
            patch.evaluations = await backend.listEvaluations(dataRef.current.submissions.map((s) => s.id));
            break;
          case 'help_requests':
            patch.helpRequests = await backend.listHelpRequests(sessionId);
            break;
          case 'polls':
            patch.polls = await backend.listPolls(sessionId);
            patch.pollAnswers = await backend.listPollAnswers(sessionId);
            break;
          case 'poll_answers':
            patch.pollAnswers = await backend.listPollAnswers(sessionId);
            break;
          case 'ideas':
            patch.ideas = await backend.listIdeas(sessionId);
            break;
          case 'shared_examples':
            patch.sharedExamples = await backend.listSharedExamples(sessionId);
            break;
        }
        setData((d) => (d ? { ...d, ...patch } : d));
        setLastSync(Date.now());
        setConnected(true);
      } catch {
        setConnected(false);
      }
    },
    [backend, sessionId, loadAll],
  );

  useEffect(() => {
    setData(null);
    void loadAll();
  }, [loadAll]);

  useEffect(() => {
    if (!sessionId) return;
    const unsub = backend.subscribeSession(sessionId, (table) => void reloadTable(table));
    const fallback = setInterval(() => {
      if (document.visibilityState === 'visible') void loadAll();
    }, 45_000);
    const onVisible = () => {
      if (document.visibilityState === 'visible') void loadAll();
    };
    document.addEventListener('visibilitychange', onVisible);
    window.addEventListener('online', onVisible);
    return () => {
      unsub();
      clearInterval(fallback);
      document.removeEventListener('visibilitychange', onVisible);
      window.removeEventListener('online', onVisible);
    };
  }, [backend, sessionId, reloadTable, loadAll]);

  const helpers = useMemo(() => {
    const profileName = (id: string | null | undefined) => (id ? (data?.profiles.find((p) => p.id === id)?.display_name ?? data?.enrollments.find((e) => e.user_id === id)?.display_name ?? 'Participant') : '—');
    const teamOf = (userId: string) => {
      const m = data?.members.find((x) => x.user_id === userId);
      return m ? (data?.teams.find((t) => t.id === m.team_id) ?? null) : null;
    };
    return { profileName, teamOf };
  }, [data]);

  return { data, error, connected, lastSync, reload: loadAll, ...helpers };
}
