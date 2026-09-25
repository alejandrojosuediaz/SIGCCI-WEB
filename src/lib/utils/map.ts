import type { CollectionEntry } from "astro:content";

export type PostAuthor = {
    documentId: string;
    title: string;
    image?: string;
};

export type MappedPost = Omit<CollectionEntry<"posts">, "data"> & {
    data: Omit<CollectionEntry<"posts">["data"], "authors"> & {
        authors: PostAuthor[];
    };
};

type StrapiMedia = {
    url?: string;
    formats?: {
        thumbnail?: {
            url?: string;
        };
        medium?: {
            url?: string;
        };
    };
};

type StrapiNews = {
    slug?: number | string;
    documentId?: string;
    TituloPrincipal?: string;
    DescripcionCorta?: string;
    ImagenPrincipal?: {
        url?: string;
        formats?: {
            medium?: {
                url?: string;
            };
        };
    };
    publishedAt?: string;
    filial?: {
        documentId?: string;
        Filial?: string;
        Logo?: StrapiMedia;
    };
};

const newMap = (info: StrapiNews): MappedPost => {
    const title = info.TituloPrincipal ?? "";
    const body = info.DescripcionCorta ?? "";
    const image =
        info.ImagenPrincipal?.formats?.medium?.url ??
        info.ImagenPrincipal?.url;
    const id = String(info.slug ?? info.documentId ?? title);
    const filial = info.filial?.Filial ?? "CCI";
    const authorImage =
        info.filial?.Logo?.formats?.thumbnail?.url ?? info.filial?.Logo?.url;

    return {
        id,
        body,
        collection: "posts",
        data: {
            title,
            image,
            date: info.publishedAt ? new Date(info.publishedAt) : new Date(),
            authors: [
                {
                    documentId: info.filial?.documentId ?? filial,
                    title: filial,
                    image: authorImage,
                },
            ],
            categories: ["others"],
            tags: ["others"],
        },
    };
};

export const mapNews = (data: StrapiNews[]): MappedPost[] =>
    data.map(newMap);
