export interface IYouTubePlaylistRes {
  kind: string;
  etag: string;
  nextPageToken: string;
  prevPageToken: string;
  items: IVideos[];
  pageInfo: IPageInfo;
}

export interface IVideos {
  kind: string;
  etag: string;
  id: string;
  snippet: Snippet;
}

export interface Snippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: IThumbnails;
  channelTitle: string;
  playlistId: string;
  position: number;
  resourceId: IResourceId;
  videoOwnerChannelTitle: string;
  videoOwnerChannelId: string;
}

export interface IThumbnails {
  default: IThumbnail;
  medium: IThumbnail;
  high: IThumbnail;
  standard: IThumbnail;
  maxres: IThumbnail;
}

export interface IThumbnail {
  url: string;
  width: number;
  height: number;
}

export interface IResourceId {
  kind: string;
  videoId: string;
}

export interface IPageInfo {
  totalResults: number;
  resultsPerPage: number;
}

export const isYouTubePlaylist = (data: unknown): data is IYouTubePlaylistRes => {
  return (data as IYouTubePlaylistRes)?.etag !== undefined;
};
