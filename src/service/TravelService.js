import axios from "axios"
const URL="http://localhost:8080/addplan";
class TravelService{
    createPlan(travel){
        return axios.post(URL,travel); //promises

    }

}
export default new TravelService();