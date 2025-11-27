// export default async function Page() {
//     const getAllPersonas = await fetch('http://localhost:8080/api/v1/persona')
//     const getPersona = await fetch('http://localhost:8080/api/v1/persona/{name}')
//     const fusePersonas = await fetch('http://localhost:8080/api/v1/persona/fuse?name1={persona1}&name2={persona2}')
//     const data = await getAllPersonas.json()
//     const persona = await getPersona.json()
//     const fusion = await fusePersonas.json()
//     return { data, persona, fusion }
// }

const API_BASE = (process.env.NEXT_PUBLIC_API_URL || '').replace(/\/$/, '');

async function handleResponse(res) {
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Request failed with ${res.status}`);
  }
  return res.json();
}

export async function getPersona(name) {
  const res = await fetch(`${API_BASE}/persona/${encodeURIComponent(name)}`);
  return handleResponse(res);
}

export async function fusePersonas(persona1, persona2) {
  const res = await fetch(
    `${API_BASE}/persona/fuse?name1=${encodeURIComponent(
      persona1
    )}&name2=${encodeURIComponent(persona2)}`
  );
  return handleResponse(res);
}

export async function getAllPersonas() {
  const res = await fetch(`${API_BASE}/persona`);
  return handleResponse(res);
}
