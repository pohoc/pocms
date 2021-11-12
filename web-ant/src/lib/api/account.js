import $http from '../http'

const login = async (data) => {
  return await $http.post('api/restful/v1/account/login',data)
} 

export {
  login
}