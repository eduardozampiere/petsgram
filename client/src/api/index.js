import axios from 'axios';
import config from '../config/config.json';

const API = {
    image: (image) => {
		return `${config.BASE_URL}/static/${image}`;
    },

    comment: {
        get: async (post, page) => {
            return await axios.get(`${config.BASE_URL}/comment/${post}/${page}`);
        },
        create: async (post, comment) => {
            
            const con = {
                headers: {
                    auth: 'BEARER ' + localStorage.getItem("@petsgram-token")       
                }
            }

            return await axios.post(`${config.BASE_URL}/comment/create`, {post, comment}, con);
        }
    },

    post: {
        byUser: async (user, page=1) => {
            return await axios.get(`${config.BASE_URL}/post/get/${user}/${page}`);
        },

        byId: async (id) => {
            return await axios.get(`${config.BASE_URL}/post/${id}`);
        },

        create: async (form) => {
            const con = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    auth: 'BEARER ' + localStorage.getItem("@petsgram-token")       
                }
            }
            return await axios.post(`${config.BASE_URL}/post/create`, form, con);
        },

        feed: async (page=1) => {
            const con = {
                headers: {
                    auth: 'BEARER ' + localStorage.getItem("@petsgram-token")       
                }
            }
            return await axios.get(`${config.BASE_URL}/post/feed/${page}`,con);
        },

        like: async (post) => {
            const con = {
                headers: {
                    auth: 'BEARER ' + localStorage.getItem("@petsgram-token")       
                }
            }
            return await axios.post(`${config.BASE_URL}/post/like`,{post}, con);
        }
    },

    follow:{
        follows: async (user) => {
            const con = {
                headers: {
                    auth: 'BEARER ' + localStorage.getItem("@petsgram-token")
                }
            }
            return await axios.get(`${config.BASE_URL}/follow/getFollows/${user}`, con);
        },

        followers: async (user) => {
            const con = {
                headers: {
                    auth: 'BEARER ' + localStorage.getItem("@petsgram-token")
                }
            }
            return await axios.get(`${config.BASE_URL}/follow/getFollowers/${user}`, con);
        },

        followUser: async (user) => {
            const con = {
                headers: {
                    auth: 'BEARER ' + localStorage.getItem("@petsgram-token")
                }
            }
            return await axios.post(`${config.BASE_URL}/follow/`, {id: user}, con);
        },

        unfollowUser: async (user) => {
            const con = {
                headers: {
                    auth: 'BEARER ' + localStorage.getItem("@petsgram-token")
                }
            }
            return await axios.post(`${config.BASE_URL}/follow/unfollow`, {id: user}, con);
        }
    },

    user: {
        login: async (user, password) => {
            return await axios.post(`${config.BASE_URL}/user/login`, {userName: user, password});
        },

        forgotPass: async (user) => {
            return await axios.post(`${config.BASE_URL}/user/forgot-pass`, {userName: user});
        },

        signup: async (name, userName, email, password) => {
            return await axios.post(`${config.BASE_URL}/user/create`, {userName, name, email, password});
        },

        changePass: async (userName, token, password) => {
            return await axios.post(`${config.BASE_URL}/user/change-pass`, {userName, token, password});
        },

        find: async (value) => {
            return await axios.get(`${config.BASE_URL}/user/find/${value}`);
        },

        getUser: async (user) => {
            if(user) return await axios.get(`${config.BASE_URL}/user/get/${user}`);

            const con = {
                headers: {
                    auth: 'BEARER ' + localStorage.getItem("@petsgram-token")
                }
            }
            return await axios.get(`${config.BASE_URL}/user/get`, con);
        
        },

        changePhoto: async image => {
            const con = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    auth: 'BEARER ' + localStorage.getItem("@petsgram-token")       
                }
            }

            return await axios.put(`${config.BASE_URL}/user/upload-profile`, image, con);
        },

        editProfile: async (userName, name, email, bio) => {
            const con = {
                headers: {
                    auth: 'BEARER ' + localStorage.getItem("@petsgram-token")       
                }
            }
            const data = {
                userName,
                name,
                email,
                bio
            }
            return await axios.put(`${config.BASE_URL}/user/edit`, data, con);
        },

        sugestions: async () => {
            const con = {
                headers: {
                    auth: 'BEARER ' + localStorage.getItem("@petsgram-token")       
                }
            }
            return await axios.get(`${config.BASE_URL}/user/sugestions`, con);
        }
    }
}

export default API;