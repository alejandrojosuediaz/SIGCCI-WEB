// Tipo para la imagen dentro de la tarjeta
export interface Imagen {
  id: number;
  documentId: string;
  name: string;
  url: string;
  width: number;
  height: number;
  mime: string;
  size: number;
}

// Tipo para el componente "tarjeta"
export interface Tarjeta {
  id: number;
  Titulo: string;
  Descripcion: string;
  Imagen: Imagen;
  __component: "componentes.tarjeta";
}

// Tipo para cada bloque dentro del componente "bloques"
export interface Bloque {
  id: number;
  Titulo: string;
  Descripcion: string;
}

// Tipo para el componente "bloques"
export interface Bloques {
  id: number;
  Titulo: string;
  Bloque: Bloque[];
  __component: "componentes.bloques";
}

// Tipo general que determina el contenido según __component
export type Seccion = Tarjeta | Bloques;

// Tipo raíz del objeto principal
export interface Data {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  Seccion: Seccion[];
}

export interface ApiResponse {
  data: Data;
  meta: Record<string, unknown>;
}

export const getSections = async (): Promise<Data | null> => {
  try {
    const strapiUrl = import.meta.env.PUBLIC_STRAPI_URL ?? "http://localhost:1337";
    const res = await fetch(`${strapiUrl}/api/perfil-organizacional/completo`);

    if (!res.ok) {
      console.error("Error fetching data:", res.status, res.statusText);
      return null;
    }

    const json = (await res.json()) as Partial<ApiResponse> | null;
    return json?.data ?? null;
  } catch (error) {
    console.error("Error fetching sections:", error);
    return null;
  }
}