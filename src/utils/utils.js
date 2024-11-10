
export function getToken(){
    return localStorage.getItem('token') || localStorage.getItem('sessionStorage')
}