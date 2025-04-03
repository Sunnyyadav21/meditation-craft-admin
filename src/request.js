
 
import config from '@/config';
const BaseUrl = config.REACT_APP_BASE_URL;

const request = {
    create_categorie: BaseUrl + "/categorie",
    get_categorie: BaseUrl + "/categorie",
    create_product: BaseUrl + "/product",
    get_product: BaseUrl + "/product",
}

export default request;