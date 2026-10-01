import { useState } from 'react';
import { useAuth } from '../../auth/AuthProvider';
import { AppShell } from '../../components/layout/AppShell';
import { Button, Card, Field, Input, Markdown, useToast } from '../../components/ui';
import { downloadText } from '../../lib/csv';

export function MyDataPage() {
  const { backend, profile, settings, refreshProfile } = useAuth();
  const toast = useToast();
  const [name, setName] = useState(profile?.display_name ?? '');
  return (
    <AppShell>
      <h1 className="text-2xl font-semibold mb-4">Mes données</h1>
      <div className="grid gap-5 md:grid-cols-2">
        <Card title="Mon profil">
          <Field label="Nom affiché">{(id) => <Input id={id} value={name} onChange={(e) => setName(e.target.value)} />}</Field>
          <p className="text-sm text-muted mt-1">E-mail : {profile?.email} · Rôle : {profile?.role === 'trainer' ? 'formateur' : 'participant'} (non modifiable par vous-même)</p>
          <Button
            className="mt-3"
            variant="primary"
            onClick={async () => {
              await backend.updateMyProfile({ display_name: name });
              await refreshProfile();
              toast('Profil enregistré.', 'success');
            }}
          >
            Enregistrer
          </Button>
        </Card>
        <Card title="Export et suppression">
          <p className="text-sm mb-3">Exportez l’ensemble de vos données (profil, inscriptions, productions, versions, retours, plans). La suppression des productions se demande au formateur de la session, qui la réalise de façon contrôlée.</p>
          <Button
            onClick={async () => {
              const data = await backend.exportMyData();
              downloadText(`mes-donnees-${new Date().toISOString().slice(0, 10)}.json`, JSON.stringify(data, null, 2), 'application/json');
            }}
          >
            Télécharger mes données (JSON)
          </Button>
        </Card>
        <Card title="Information de confidentialité" className="md:col-span-2">
          <Markdown text={settings?.privacy_notice || 'Non renseignée par l’organisme.'} />
          {settings?.hosting_notes && (
            <>
              <h3 className="font-semibold mt-4">Hébergement et prestataires</h3>
              <Markdown text={settings.hosting_notes} />
            </>
          )}
        </Card>
      </div>
    </AppShell>
  );
}
