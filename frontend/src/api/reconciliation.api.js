export const fetchReconciliationReportFromFiles = async (formData) => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  
  const response = await fetch(`${baseUrl}/reconciliation/process-files`, {
    method: 'POST',
    body: formData, // Contains the multipart file fields
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Network response failed during file upload.');
  }

  return response.json();
};

// Keep your old endpoint active for the Demo button
export const fetchReconciliationReport = async (payload) => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const response = await fetch(`${baseUrl}/reconciliation/process`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error('Demo execution failed.');
  return response.json();
};