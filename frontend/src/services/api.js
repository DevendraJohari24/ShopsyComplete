import axios from "axios";
import { store } from "../store";
import { usersApi } from "../store/api/users/usersApi";

export const getCurrentUser = async() => {
    const users = store.dispatch(usersApi.endpoints.getCurrentUser.initiate());
    try{
        const response = await users.unwrap();
        return response;
    }catch(err){
        console.log(err);
    }finally{
        users.unsubscribe();
    }

}

export const getDocuments = async(col) => {
    let baseUrl = "http://localhost:4000/api/v1/";
    switch(col){
        case 'blogs':
            baseUrl = baseUrl + "blogs/"
            break;
        
        case 'countdowns':
            baseUrl = baseUrl + "countdowns"
            break;

        case 'features':
            baseUrl = baseUrl + "features"
            break;

        case 'feedbacks':
            baseUrl = baseUrl + "feedbacks"
            break;
        
        case 'portfolios':
            baseUrl = baseUrl + "portfolios"
            break;
        
        case 'products':
            baseUrl = baseUrl + "products"
            break;

        case 'promotions':
            baseUrl = baseUrl + "promotions"
            break;
        
        case 'questions':
            baseUrl = baseUrl + "questions"
            break;
        
        case 'services':
            baseUrl = baseUrl + "services"
            break;
        
        case 'sliders':
            baseUrl = baseUrl + "sliders"
            break;
        
        case 'teams':
            baseUrl = baseUrl + "teams"
            break;

        default:
            console.log("Default");
    }


    const response = await axios.get(baseUrl);
    return response.data;
}


export const getDocumentById = async(id, col) => {
    console.log(id);
    let baseUrl = "http://localhost:4000/api/v1/";
    var response = []
    switch(col){
        case 'products':
            baseUrl = baseUrl + `products/product/${id}`;
            response = await axios.get(baseUrl);
            break;
        default: 
            console.log("Default");
    }
    console.log(response.data);
    return response.data
}

export const getData = async() => {
    const { blogs } = await getDocuments("blogs");
    const {products} = await getDocuments('products');

	const {promotions} = await getDocuments('promotions');
	// const { galleries } = await getDocuments('blogs');

	const {  questions } = await getDocuments('questions');

	const {services} = await getDocuments('services');

	const {teams} = await getDocuments('teams');

	const {feedbacks} = await getDocuments('feedbacks');

	const {portfolio} = await getDocuments('portfolios');

	const {countdown} = await getDocuments('countdowns');

	const {slideHeader} = await getDocuments('sliders');

	const {features} = await getDocuments('features');


	
    return {
		blogs,
		products,
		promotions,
		// galleries,
		questions,
		services,
		teams,
		feedbacks,
		portfolio,
		countdown,
		slideHeader,
		features,
	};
}