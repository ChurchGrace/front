/* eslint-disable @typescript-eslint/restrict-template-expressions */
import axios from 'axios';

export class DataApi {
  private baseUrl = process.env.REACT_APP_BASE_URL;

  private apiKey = process.env.REACT_APP_API_KEY;

  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = async (queryString: string) => {
    return axios.get(`${this.baseUrl}${this.endpoint}?${queryString}`);
  };

  patchOne = async (id: string, patchData: unknown) => {
    return axios.patch(`${this.baseUrl}${this.endpoint}/${id}`, patchData, {
      headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
    });
  };

  deleteOne = async (id: string) => {
    return axios.delete(`${this.baseUrl}${this.endpoint}/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
    });
  };

  createOne = async (patchData: unknown) => {
    return axios.post(`${this.baseUrl}${this.endpoint}`, patchData, {
      headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
    });
  };

  getOne = async (id?: string) => {
    const queryId = id ? `/${id}` : '';
    return axios.get(`${this.baseUrl}${this.endpoint}${queryId}`);
  };

  getVideos = async (queryStr: string) => {
    return axios.get(
      `https://youtube.googleapis.com/youtube/v3/playlistItems?${queryStr}&part=snippet&playlistId=PLX-t9u7PjaoFJixGYmIqx2RBQSJFWBB_S&key=${this.apiKey}`,
    );
  };
}

export class AuthApi {
  private static baseUrl = process.env.REACT_APP_BASE_URL;

  static login = async (postData: { email: string; password: string }) => {
    return axios.post(`${AuthApi.baseUrl}user/login`, postData, { withCredentials: true });
  };

  static resetPassword = async (postData: { password: string; passwordConfirm: string }, passwordToken: string) => {
    return axios.post(`${AuthApi.baseUrl}user/resetPassword/${passwordToken}`, postData, { withCredentials: true });
  };

  static forgetPassword = async (postData: { email: string }) => {
    return axios.post(`${AuthApi.baseUrl}user/forgetPassword`, postData);
  };
}
