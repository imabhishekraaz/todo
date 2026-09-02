import axios from 'axios';

const baseAPI = 'https://to-do-application-poa1.onrender.com';
console.log(baseAPI)

const signupUserAPI = `${baseAPI}/api/user/signup`;
const loginUserAPI = `${baseAPI}/api/user/login`;
const verifyTokenAPI = `${baseAPI}/api/user/verify`;
const userAllTasksAPI = `${baseAPI}/api/user/tasks`;
const deleteUserTaskAPI = `${baseAPI}/api/user/task`;
const getUserTaskDetailsAPI = `${baseAPI}/api/user/task`;
const addUserTaskAPI = `${baseAPI}/api/user/task`;

const logRequestError = (label, err) => {
    if (err.response) {
        console.error(`${label} backend error:`, err.response.data);
        console.error('Status Code:', err.response.status);
    } else if (err.request) {
        console.error(`${label} no response received from backend:`, err.request);
    } else {
        console.error(`${label} request setup error:`, err.message);
    }
};

export const signupUser = async (userData) => {
    try {
        const response = await axios.post(signupUserAPI, userData);
        return response;
    } catch (err) {
        logRequestError('Signup', err);
        throw err;
    }
};

export const loginUser = async (userData) => {
    try {
        const response = await axios.post(loginUserAPI, userData);
        return response;
    } catch (err) {
        logRequestError('Login', err);
        throw err;
    }
};

export const verifyToken = async () => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        const response = await axios.get(verifyTokenAPI, {
            headers: {
                Authorization: `Bearer ${user?.token}`
            }
        });
        return response;
    } catch (err) {
        logRequestError('Token verification', err);
        throw err;
    }
};

export const handleLogoutButton = (navigate) => {
    localStorage.removeItem('user');
    navigate('/login');
};

export const getUserTasks = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    try {
        const response = await axios.get(userAllTasksAPI, {
            headers: {
                Authorization: `Bearer ${user?.token}`
            }
        });
        return response;
    } catch (err) {
        logRequestError('Fetch tasks', err);
        throw err;
    }
};

export const deleteUserTask = async (taskId) => {
    const user = JSON.parse(localStorage.getItem('user'));
    try {
        const response = await axios.delete(`${deleteUserTaskAPI}/${taskId}`, {
            headers: {
                Authorization: `Bearer ${user?.token}`
            }
        });
        return response;
    } catch (err) {
        logRequestError('Delete task', err);
        throw err;
    }
};

export const getUserTaskDetails = async (taskId) => {
    const user = JSON.parse(localStorage.getItem('user'));

    try {
        const response = await axios.get(`${getUserTaskDetailsAPI}/${taskId}`, {
            headers: {
                Authorization: `Bearer ${user?.token}`
            }
        });
        return response;
    } catch (err) {
        logRequestError('Fetch task details', err);
        throw err;
    }
};

export const addUserTask = async (taskDetails) => {
    const user = JSON.parse(localStorage.getItem('user'));

    try {
        const response = await axios.post(addUserTaskAPI, taskDetails, {
            headers: {
                Authorization: `Bearer ${user?.token}`
            }
        });
        return response;
    } catch (err) {
        logRequestError('Add task', err);
        throw err;
    }
};


