export const fetchReconciliationReport = async (payload) => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  
  const response = await fetch(`${baseUrl}/reconciliation/process`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('Network response failed during reconciliation execution.');
  }

  return response.json();
};