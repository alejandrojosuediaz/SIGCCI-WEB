export type Filial = {
  id?: number;
  documentId?: string;
  Filial?: string;
  Logo?: {
    url?: string;
    formats?: {
      thumbnail?: {
        url?: string;
      };
    };
  };
};

type FilialsResponse = {
  data?: Filial[];
};

export const getFilialLogo = (filial: Filial): string | undefined =>
  filial.Logo?.formats?.thumbnail?.url ?? filial.Logo?.url;

export const getFilials = async (): Promise<Filial[]> => {
  const strapiUrl = import.meta.env.PUBLIC_STRAPI_URL ?? "http://localhost:1337";
  const response = await fetch(`${strapiUrl}/api/filials?populate=Logo`);

  if (!response.ok) {
    return [];
  }

  const result = (await response.json()) as FilialsResponse;
  return result.data ?? [];
};

export const getFilialId = (filial: Filial): string =>
  filial.documentId ?? String(filial.id ?? "");

export const getStrapiAssetUrl = (
  url: string | undefined,
  strapiUrl: string,
): string | undefined => {
  if (!url) {
    return undefined;
  }

  return url.startsWith("http") ? url : `${strapiUrl}${url}`;
};
