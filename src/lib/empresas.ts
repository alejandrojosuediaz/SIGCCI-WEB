export type Empresa = {
  id?: number;
  documentId?: string;
  NombreEmpresa?: string;
  NombreComercial?: string;
  Direccion?: string;
  Celular?: string;
  CorreoElectronico?: string;
  Clasificacion?: string;
  NombreRepresentante?: string;
  ActividadEmpresarial?: string;
  slug?: string;
  Logo?: {
    url?: string;
    formats?: {
      thumbnail?: {
        url?: string;
      };
    };
  };
};

type EmpresasResponse = {
  data?: Empresa[];
};

export const getEmpresaLogo = (empresa: Empresa): string | undefined =>
  empresa.Logo?.formats?.thumbnail?.url ?? empresa.Logo?.url;

export const getEmpresaId = (empresa: Empresa): string =>
  empresa.slug ?? empresa.documentId ?? String(empresa.id ?? "");

export const getEmpresas = async (): Promise<Empresa[]> => {
  const strapiUrl = import.meta.env.PUBLIC_STRAPI_URL ?? "http://localhost:1337";
  const query = new URLSearchParams({
    "filters[Activo]": "true",
    populate: "Logo",
  });
  const response = await fetch(`${strapiUrl}/api/empresas?${query.toString()}`);

  if (!response.ok) {
    return [];
  }

  const result = (await response.json()) as EmpresasResponse;
  return result.data ?? [];
};

export const getStrapiAssetUrl = (
  url: string | undefined,
  strapiUrl: string,
): string | undefined => {
  if (!url) {
    return undefined;
  }

  return url.startsWith("http") ? url : `${strapiUrl}${url}`;
};
