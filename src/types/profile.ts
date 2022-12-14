import { CredentialImportReport } from './credential';

export type ProfileImportReport = {
  userIdImported: boolean;
  credentials: CredentialImportReport;
};

export type ProfileMetadata = {
  '@context': string[];
  id: string;
  type: 'ProfileMetadata';
  data: {
    profileName: string;
  }
}
