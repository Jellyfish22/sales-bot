import axios from 'axios';

const fetchDataFromHyperspace = async () => {
    const url = "https://beta.api.solanalysis.com/rest/get-market-place-status";
    const apiKey = "";
    
    const payload = {
        conditions: {
            project_ids: ["degods"]
        }
    };

    const headers = {
        'Authorization': API_KEY,
        'Content-Type': 'application/json'
    };

    try {
        const response = await axios.post(url, payload, { headers: headers });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error; 
    }
};

export default fetchDataFromHyperspace;
