import axios from 'axios'
const baseUrl = ''

function ajax(url,data={},type='GET') {
    url = baseUrl + url
    if(type === 'GET') {
        let paramStr  = ''
        Object.keys(data).forEach(key => {
            paramStr += key + '=' + data[key] + '&'
        })
        if(paramStr) {
            paramStr = paramStr.substring(0, paramStr.length-1)
        }
        return axios.get(url + '?' + paramStr)
    }
    else {
        return axios.post(url, data)
    }
}

export default ajax