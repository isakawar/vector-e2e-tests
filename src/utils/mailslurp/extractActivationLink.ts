const ACTIVATION_LINK_PATTERN =
  /https:\/\/[^\s\n]+\/uk\/accounts\/register\/activate\/[^\s\n]+/;

export function extractActivationLink(emailBody: string): string {
  const match = emailBody.match(ACTIVATION_LINK_PATTERN);
  if (!match) {
    throw new Error('Activation link not found in email body');
  }
  return match[0];
}
