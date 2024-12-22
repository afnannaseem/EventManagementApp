import axios from 'axios';
async function sendRequest(url, method, body = null) {

    const token = localStorage.getItem('token');
    console.log(token);
    try {
        const response = await axios({
            method: method,
            url: url,
            headers: {
                'Content-Type': 'application/json',
                token: token,
            },
            data: body == null || body == undefined ? null : JSON.stringify(body),
        });
        console.log(response?.data);
        console.log(response?.status);
        if (response?.status !== 200) {
            if (response?.data?.message === "Invalid token") {
                return response?.data?.message;
            }
            return response;
        }
        if (response?.data?.token) {
            localStorage.setItem('token', response?.data?.token);
        }
        return response?.data;
    } catch (error) {
        console.error(error?.response?.data);
        return error?.response?.data;
    }
}
export default sendRequest;
