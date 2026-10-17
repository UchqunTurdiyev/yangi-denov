// Lidni CRM'ga yuborish. CRM_LEAD_URL — CRM egasi bergan to'liq havola (?key=... bilan).

export const crmReady = () => Boolean(process.env.CRM_LEAD_URL);

export async function sendToCrm(lead: { name: string; phone: string; source: string; extra?: string }) {
  if (!crmReady()) return { skipped: true };
  const res = await fetch(process.env.CRM_LEAD_URL!, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(lead),
    signal: AbortSignal.timeout(8000),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok || json.ok === false) throw new Error(json.error || `CRM ${res.status}`);
  return json;
}
